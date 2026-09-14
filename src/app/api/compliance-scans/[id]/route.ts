import { verifyProFromRequest } from "@/lib/server/proAuth";
import {
  enableShareLink,
  getComplianceScanById,
  getComplianceScanByShareId,
} from "@/lib/server/complianceScanStore";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const share = new URL(req.url).searchParams.get("share") === "1";

  if (share) {
    const scan = await getComplianceScanByShareId(id);
    if (!scan) {
      return Response.json({ error: "Report not found or not shared." }, { status: 404 });
    }
    return Response.json({ scan, readOnly: true });
  }

  const authResult = await verifyProFromRequest(req);
  if (!authResult.ok) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  const scan = await getComplianceScanById(id);
  if (!scan || scan.userId !== authResult.auth.uid) {
    return Response.json({ error: "Scan not found." }, { status: 404 });
  }

  return Response.json({ scan, readOnly: false });
}

export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const authResult = await verifyProFromRequest(req);
  if (!authResult.ok) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  const { id } = await ctx.params;
  const body = (await req.json()) as { action?: string };

  if (body.action === "share") {
    const result = await enableShareLink(id, authResult.auth.uid);
    if (!result) {
      return Response.json({ error: "Scan not found." }, { status: 404 });
    }
    return Response.json({ shareId: result.shareId });
  }

  return Response.json({ error: "Unknown action." }, { status: 400 });
}
