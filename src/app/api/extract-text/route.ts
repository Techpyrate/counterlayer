import { PDFParse } from "pdf-parse";
import { verifyProFromRequest } from "@/lib/server/proAuth";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const authResult = await verifyProFromRequest(req);
    if (!authResult.ok) {
      return Response.json({ error: authResult.error }, { status: authResult.status });
    }

    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return Response.json({ error: "file is required" }, { status: 400 });
    }
    if (file.size > 8_000_000) {
      return Response.json({ error: "File too large (max 8MB)." }, { status: 400 });
    }

    const name = file.name || "upload";
    const mime = file.type || "application/octet-stream";
    const buf = Buffer.from(await file.arrayBuffer());

    let text = "";
    const lower = name.toLowerCase();
    const isPdf =
      mime.includes("pdf") || lower.endsWith(".pdf");
    const isText =
      mime.startsWith("text/") ||
      /\.(txt|md|markdown|html?|csv|json)$/i.test(lower);

    if (isPdf) {
      const parser = new PDFParse({ data: new Uint8Array(buf) });
      try {
        const data = await parser.getText();
        text = (data.text || "").replace(/\s+/g, " ").trim();
      } finally {
        await parser.destroy().catch(() => undefined);
      }
    } else if (isText) {
      text = buf.toString("utf8").replace(/\s+/g, " ").trim();
    } else {
      // Best-effort: treat as utf-8 text
      text = buf.toString("utf8").replace(/\s+/g, " ").trim();
      if (text.length < 40 || /[\u0000-\u0008]/.test(text.slice(0, 200))) {
        return Response.json(
          {
            error:
              "Could not extract text. Upload PDF, TXT, MD, or HTML policy files.",
          },
          { status: 400 },
        );
      }
    }

    if (text.length < 40) {
      return Response.json(
        { error: "Extracted text is too short to assess." },
        { status: 400 },
      );
    }

    return Response.json({
      id: `up-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      mime,
      chars: text.length,
      text: text.slice(0, 400_000),
    });
  } catch {
    return Response.json(
      { error: "Text extraction failed." },
      { status: 500 },
    );
  }
}
