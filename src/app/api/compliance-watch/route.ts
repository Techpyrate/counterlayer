import { verifyProFromRequest } from "@/lib/server/proAuth";
import { checkAndIncrementScanRate } from "@/lib/server/rateLimit";
import {
  getComplianceScanById,
  setPageWatch,
} from "@/lib/server/complianceScanStore";
import { diffPageHashes, hashPolicyPages } from "@/lib/server/pageWatch";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const authResult = await verifyProFromRequest(req);
  if (!authResult.ok) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  const body = (await req.json()) as {
    scanId?: string;
    action?: "enable" | "check";
  };

  if (!body.scanId) {
    return Response.json({ error: "scanId required." }, { status: 400 });
  }

  const scan = await getComplianceScanById(body.scanId);
  if (!scan || scan.userId !== authResult.auth.uid) {
    return Response.json({ error: "Scan not found." }, { status: 404 });
  }

  if (body.action === "enable") {
    const hashes = scan.pageHashes ?? (await hashPolicyPages(scan.url));
    await setPageWatch(body.scanId, authResult.auth.uid, true, hashes);
    return Response.json({
      ok: true,
      message:
        "Policy page watch enabled for Terms, Privacy, cancel, refund, and pricing paths. We alert when content changes — not on a calendar schedule.",
      paths: Object.keys(hashes),
    });
  }

  if (body.action === "check") {
    const rate = await checkAndIncrementScanRate(
      `${authResult.auth.uid}:watch`,
      authResult.auth.plan,
    );
    if (!rate.allowed) {
      return Response.json({ error: "Watch check rate limit reached." }, { status: 429 });
    }

    const current = await hashPolicyPages(scan.url);
    const prior = scan.pageHashes ?? {};
    const changes = diffPageHashes(prior, current);

    return Response.json({
      changed: changes.length > 0,
      changes,
      suggestion:
        changes.length > 0
          ? "Public policy pages changed. Publish fixes if needed, attest changes, then re-scan."
          : "No changes detected on watched policy paths.",
      currentHashes: current,
    });
  }

  return Response.json({ error: "Unknown action." }, { status: 400 });
}
