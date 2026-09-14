import { scanWebsite, type ScanProgressEvent } from "@/lib/siteScan";

export const runtime = "nodejs";
export const maxDuration = 180;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { url?: string };
    const url = body.url?.trim();
    if (!url) {
      return Response.json({ error: "Website URL is required." }, { status: 400 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const send = (event: ScanProgressEvent) => {
          controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
        };
        try {
          await scanWebsite(url, send);
        } catch {
          send({
            type: "status",
            message: "Scan aborted due to an unexpected error.",
          });
          const fallback = await scanWebsite(url).catch(() => null);
          if (fallback) {
            send({ type: "done", result: fallback });
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch {
    return Response.json({ error: "Site scan failed unexpectedly." }, { status: 500 });
  }
}
