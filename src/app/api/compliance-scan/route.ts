import {
  runComplianceScan,
  type ComplianceScanOptions,
  type ComplianceScanProgressEvent,
} from "@/lib/complianceAssessment";
import type { CheckAudience } from "@/data/complianceCheck";
import type { Jurisdiction } from "@/data/types";
import { verifyProFromRequest } from "@/lib/server/proAuth";
import { checkAndIncrementScanRate } from "@/lib/server/rateLimit";
import {
  getLatestScanForUrl,
  saveComplianceScan,
} from "@/lib/server/complianceScanStore";
import { hashPolicyPages } from "@/lib/server/pageWatch";
import {
  diffPluginResults,
  fixesSummary,
  type ScanSnapshot,
} from "@/lib/scanHistory";

export const runtime = "nodejs";
export const maxDuration = 180;

function storedToSnapshot(scan: {
  url: string;
  assessedAt: string;
  assessment: {
    overall: string;
    score: number;
    controls: { pluginId: string; status: string }[];
  };
  changeNotes?: string;
}): ScanSnapshot {
  return {
    url: scan.url,
    assessedAt: scan.assessedAt,
    overall: scan.assessment.overall as ScanSnapshot["overall"],
    score: scan.assessment.score,
    changeNotes: scan.changeNotes,
    plugins: Object.fromEntries(
      scan.assessment.controls.map((c) => [
        c.pluginId,
        c.status as ScanSnapshot["plugins"][string],
      ]),
    ),
  };
}

export async function POST(req: Request) {
  try {
    const authResult = await verifyProFromRequest(req);
    if (!authResult.ok) {
      return Response.json({ error: authResult.error }, { status: authResult.status });
    }

    const rate = await checkAndIncrementScanRate(
      authResult.auth.uid,
      authResult.auth.plan,
    );
    if (!rate.allowed) {
      return Response.json(
        {
          error: `Daily scan limit reached (${rate.limit}/day). Try again tomorrow or contact support.`,
        },
        { status: 429 },
      );
    }

    const body = (await req.json()) as {
      url?: string;
      audience?: CheckAudience;
      jurisdiction?: Jurisdiction;
      stagingUrl?: string;
      authCookie?: string;
      appStoreUrls?: string[];
      uploadTexts?: { name: string; text: string }[];
      changeNotes?: string;
    };
    const url = body.url?.trim();
    const audience = body.audience;
    const jurisdiction = body.jurisdiction ?? "Both";

    if (!url) {
      return Response.json({ error: "Website URL is required." }, { status: 400 });
    }
    if (!audience) {
      return Response.json({ error: "Business type is required." }, { status: 400 });
    }

    const options: ComplianceScanOptions = {
      stagingUrl: body.stagingUrl?.trim() || undefined,
      authCookie: body.authCookie?.trim() || undefined,
      appStoreUrls: body.appStoreUrls?.filter(Boolean),
      uploadTexts: body.uploadTexts?.filter((u) => u.text?.trim()),
      changeNotes: body.changeNotes?.trim() || undefined,
    };

    const priorCloud = await getLatestScanForUrl(authResult.auth.uid, url);
    const isRescan = Boolean(body.changeNotes?.trim());

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const send = (event: ComplianceScanProgressEvent) => {
          if (event.type === "done") return;
          controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
        };
        try {
          const result = await runComplianceScan(
            url,
            audience,
            jurisdiction,
            send,
            options,
          );

          let pluginDiffs;
          let fixesLines;
          if (priorCloud) {
            const before = storedToSnapshot(priorCloud);
            pluginDiffs = diffPluginResults(before, result.assessment);
            fixesLines = fixesSummary(before, result.assessment);
            if (isRescan && body.changeNotes?.trim()) {
              fixesLines.unshift(`You attested: ${body.changeNotes.trim()}`);
            }
          }

          const pageHashes = await hashPolicyPages(url);

          const stored = await saveComplianceScan({
            userId: authResult.auth.uid,
            assessment: result.assessment,
            changeNotes: body.changeNotes?.trim(),
            pluginDiffs,
            fixesLines,
            pageHashes,
          });

          const doneEvent: ComplianceScanProgressEvent = {
            type: "done",
            result: {
              scan: result.scan,
              assessment: result.assessment,
              storedScanId: stored.id,
              pluginDiffs,
              fixesLines,
              pageHashes,
              rateRemaining: rate.remaining,
            },
          };
          controller.enqueue(encoder.encode(`${JSON.stringify(doneEvent)}\n`));
        } catch {
          send({ type: "status", message: "Compliance scan aborted unexpectedly." });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-RateLimit-Remaining": String(rate.remaining),
      },
    });
  } catch {
    return Response.json({ error: "Compliance scan failed." }, { status: 500 });
  }
}
