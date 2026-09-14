import { verifyBusinessFromRequest } from "@/lib/server/proAuth";
import { checkAndIncrementScanRate } from "@/lib/server/rateLimit";
import { runComplianceAssessment } from "@/lib/complianceAssessment";
import type { CheckAudience } from "@/data/complianceCheck";
import type { Jurisdiction } from "@/data/types";

export const runtime = "nodejs";
export const maxDuration = 120;

const SELLER_CONTROL_PREFIXES = ["CW-CP-", "CW-PR-", "CW-TR-001", "CW-TR-002"];

export async function POST(req: Request) {
  const authResult = await verifyBusinessFromRequest(req);
  if (!authResult.ok) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  const body = (await req.json()) as {
    urls?: string[];
    audience?: CheckAudience;
    jurisdiction?: Jurisdiction;
  };

  const urls = (body.urls ?? []).map((u) => u.trim()).filter(Boolean).slice(0, 25);
  if (urls.length === 0) {
    return Response.json({ error: "Provide at least one seller URL." }, { status: 400 });
  }

  const rate = await checkAndIncrementScanRate(
    `${authResult.auth.uid}:seller`,
    authResult.auth.plan,
  );
  if (!rate.allowed) {
    return Response.json({ error: "Seller check rate limit reached." }, { status: 429 });
  }

  const audience = body.audience ?? "seller";
  const jurisdiction = body.jurisdiction ?? "Both";
  const { scanWebsite } = await import("@/lib/siteScan");

  const results = [];
  for (const url of urls) {
    try {
      const scan = await scanWebsite(url);
      const assessment = runComplianceAssessment({
        url,
        audience,
        jurisdiction,
        scan,
      });
      const sellerControls = assessment.controls.filter((c) =>
        SELLER_CONTROL_PREFIXES.some((p) => c.pluginId.startsWith(p) || c.pluginId === p),
      );
      const open = sellerControls.filter(
        (c) =>
          c.status === "gap" ||
          c.status === "risk_signal" ||
          c.status === "partial",
      );
      results.push({
        url,
        overall: assessment.overall,
        score: assessment.score,
        pagesOk: scan.stats.pagesOk,
        sellerReady: open.length === 0 && scan.fetchedOk,
        openControls: open.map((c) => ({
          id: c.pluginId,
          title: c.title,
          status: c.status,
        })),
        passCount: sellerControls.filter((c) => c.status === "pass").length,
        totalChecked: sellerControls.length,
      });
    } catch {
      results.push({
        url,
        error: "Could not scan this URL.",
        sellerReady: false,
      });
    }
  }

  return Response.json({
    scannedAt: new Date().toISOString(),
    count: results.length,
    results,
    note:
      "Bulk seller onboarding check — cancel, refund, privacy, and transparency controls on public pages. Not a legal clearance.",
  });
}
