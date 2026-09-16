import { isAdminEmail } from "@/lib/adminAccess";
import { lawById } from "@/data/laws";
import { issueById, type IssueKind } from "@/lib/attorneyDesk";
import { euSearchLinks, searchUsDockets, confirmPage } from "@/lib/liveSources";
import {
  HSR_SOURCE,
  assessEu,
  assessHsr,
  hsrMarkerStillCurrent,
  type EuInput,
  type HsrInput,
} from "@/lib/thresholds";

export const runtime = "nodejs";

function adminEmail(req: Request): string {
  return (req.headers.get("x-counterlayer-email") ?? "").trim().toLowerCase();
}

export async function POST(req: Request) {
  const email = adminEmail(req);
  if (!isAdminEmail(email)) {
    return Response.json({ error: "Admin sign-in required." }, { status: 403 });
  }

  const body = (await req.json()) as {
    action?: "dockets" | "thresholds" | "citations";
    query?: string;
    forum?: "US" | "EU" | "Both";
    issue?: IssueKind;
    hsr?: HsrInput;
    eu?: EuInput;
  };

  try {
    if (body.action === "dockets") {
      const query = (body.query ?? "").trim();
      if (query.length < 2) {
        return Response.json({ error: "Enter a party or docket query." }, { status: 400 });
      }
      const forum = body.forum ?? "Both";
      const hits = [];
      const warnings: string[] = [];
      if (forum === "US" || forum === "Both") {
        try {
          hits.push(...(await searchUsDockets(query)));
        } catch (err) {
          warnings.push(
            err instanceof Error ? err.message : "US docket search failed.",
          );
          hits.push({
            id: "us-fallback",
            forum: "US" as const,
            title: `CourtListener search: ${query}`,
            court: "US federal dockets",
            filed: null,
            number: null,
            url: `https://www.courtlistener.com/?type=d&order_by=dateFiled%20desc&q=${encodeURIComponent(query)}`,
            note: "API did not return. Open the official search.",
            source: "CourtListener",
          });
        }
      }
      if (forum === "EU" || forum === "Both") {
        hits.push(...euSearchLinks(query));
      }
      return Response.json({
        retrievedAt: new Date().toISOString(),
        hits,
        warnings,
      });
    }

    if (body.action === "thresholds") {
      const raw = await fetch(HSR_SOURCE, {
        headers: { "User-Agent": "CounterLayer counsel desk" },
        next: { revalidate: 3600 },
      });
      const text = await raw.text();
      const title = text.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? null;
      const pageHasMarker = raw.ok && hsrMarkerStillCurrent(text);
      const page = {
        url: HSR_SOURCE,
        ok: raw.ok,
        status: raw.status,
        title,
        retrievedAt: new Date().toISOString(),
      };
      const hsr = body.hsr ? assessHsr(body.hsr) : null;
      const eu = body.eu ? assessEu(body.eu) : null;
      return Response.json({
        retrievedAt: page.retrievedAt,
        ftcPage: {
          url: HSR_SOURCE,
          ok: page.ok,
          status: page.status,
          title: page.title,
          stillShows2026Figures: pageHasMarker,
        },
        euSource: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32004R0139",
        hsr,
        eu,
        warning: pageHasMarker
          ? null
          : "The FTC threshold page did not confirm the stored 2026 figures. Do not file on these numbers until you re-read the page.",
      });
    }

    if (body.action === "citations") {
      const spec = issueById(body.issue ?? "dominance");
      const urls = spec.lawIds
        .map((id) => lawById[id])
        .filter((law) => law?.url)
        .map((law) => ({ name: law!.name, citation: law!.citation, url: law!.url! }));
      const checked = await Promise.all(
        urls.map(async (law) => {
          try {
            const page = await confirmPage(law.url);
            return { ...law, ...page };
          } catch (err) {
            return {
              ...law,
              ok: false,
              status: 0,
              title: null,
              retrievedAt: new Date().toISOString(),
              error: err instanceof Error ? err.message : "Fetch failed",
            };
          }
        }),
      );
      return Response.json({ retrievedAt: new Date().toISOString(), checked });
    }

    return Response.json({ error: "Unknown action." }, { status: 400 });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Live lookup failed." },
      { status: 502 },
    );
  }
}
