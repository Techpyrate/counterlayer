import { verifyProFromRequest } from "@/lib/server/proAuth";
import { listComplianceScans } from "@/lib/server/complianceScanStore";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const authResult = await verifyProFromRequest(req);
  if (!authResult.ok) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  const scans = await listComplianceScans(authResult.auth.uid, 30);
  return Response.json({
    scans: scans.map((s) => ({
      id: s.id,
      url: s.url,
      assessedAt: s.assessedAt,
      overall: s.assessment.overall,
      score: s.assessment.score,
      shareId: s.sharePublic ? s.shareId : undefined,
      watchEnabled: s.watchEnabled,
    })),
  });
}
