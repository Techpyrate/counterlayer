export type DocketHit = {
  id: string;
  forum: "US" | "EU";
  title: string;
  court: string;
  filed: string | null;
  number: string | null;
  url: string;
  note: string;
  source: string;
};

type CourtListenerHit = {
  caseName?: string;
  court?: string;
  dateFiled?: string | null;
  docketNumber?: string | null;
  docket_absolute_url?: string;
  cause?: string | null;
  party?: string[];
};

export async function searchUsDockets(query: string): Promise<DocketHit[]> {
  const url = new URL("https://www.courtlistener.com/api/rest/v4/search/");
  url.searchParams.set("q", query);
  url.searchParams.set("type", "d");
  url.searchParams.set("order_by", "dateFiled desc");
  const res = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": "CounterLayer counsel desk" },
    next: { revalidate: 1800 },
  });
  if (!res.ok) {
    throw new Error(`CourtListener returned ${res.status}`);
  }
  const data = (await res.json()) as { results?: CourtListenerHit[] };
  return (data.results ?? []).slice(0, 12).map((hit, i) => ({
    id: `us-${hit.docketNumber ?? i}`,
    forum: "US" as const,
    title: hit.caseName || "Untitled docket",
    court: hit.court || "US court",
    filed: hit.dateFiled ?? null,
    number: hit.docketNumber ?? null,
    url: hit.docket_absolute_url
      ? `https://www.courtlistener.com${hit.docket_absolute_url}`
      : `https://www.courtlistener.com/?type=d&q=${encodeURIComponent(query)}`,
    note: [hit.cause, (hit.party ?? []).slice(0, 4).join(", ")].filter(Boolean).join(" · "),
    source: "CourtListener / RECAP federal dockets",
  }));
}

export function euSearchLinks(query: string): DocketHit[] {
  const q = encodeURIComponent(query);
  return [
    {
      id: "eu-comp",
      forum: "EU",
      title: `Commission case search: ${query}`,
      court: "European Commission — DG Competition",
      filed: null,
      number: null,
      url: `https://competition-cases.ec.europa.eu/search?caseTitleOrCompanyName=${q}`,
      note: "Opens the official case register. Filter to ongoing if you do not want closed files.",
      source: "competition-cases.ec.europa.eu",
    },
    {
      id: "eu-dma",
      forum: "EU",
      title: `DMA case search: ${query}`,
      court: "European Commission — Digital Markets Act",
      filed: null,
      number: null,
      url: `https://digital-markets-act-cases.ec.europa.eu/search?searchText=${q}`,
      note: "Gatekeeper and DMA obligation files, separate from Article 101/102.",
      source: "digital-markets-act-cases.ec.europa.eu",
    },
    {
      id: "eu-curia",
      forum: "EU",
      title: `Curia search: ${query}`,
      court: "Court of Justice of the European Union",
      filed: null,
      number: null,
      url: `https://curia.europa.eu/juris/recherche.jsf?language=en&jur=C%2CT%2CF&nomUsuel=${q}`,
      note: "Judgments and pending references. Confirm the case number on the judgment page.",
      source: "curia.europa.eu",
    },
  ];
}

export async function confirmPage(url: string): Promise<{
  url: string;
  ok: boolean;
  status: number;
  title: string | null;
  retrievedAt: string;
}> {
  const retrievedAt = new Date().toISOString();
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "CounterLayer counsel desk" },
    next: { revalidate: 3600 },
  });
  const html = await res.text();
  const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? null;
  return { url: res.url || url, ok: res.ok, status: res.status, title, retrievedAt };
}
