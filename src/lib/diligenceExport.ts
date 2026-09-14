import { jsPDF } from "jspdf";
import type { ComplianceAssessment } from "@/lib/complianceAssessment";
import type { PluginDiff } from "@/lib/scanHistory";
import { getAudienceDisplayLabel } from "@/data/complianceCheck";

export type DiligenceExportKind =
  | "investor"
  | "app_store"
  | "partner";

const EXPORT_META: Record<
  DiligenceExportKind,
  { title: string; subtitle: string; focusPacks: string[] }
> = {
  investor: {
    title: "Diligence export — investor / acquirer",
    subtitle:
      "Public compliance surface summary with control evidence. Not a legal opinion or certification.",
    focusPacks: [
      "Transparency & launch docs",
      "Consumer protection",
      "Privacy & cookies",
      "Competition / antitrust",
    ],
  },
  app_store: {
    title: "Diligence export — app store / marketplace prep",
    subtitle:
      "Consumer, privacy, and platform-facing controls for store review and marketplace onboarding.",
    focusPacks: [
      "Consumer protection",
      "Privacy & cookies",
      "Platform & marketplace rules",
    ],
  },
  partner: {
    title: "Diligence export — partner onboarding",
    subtitle:
      "Public compliance surface as of scan date for partners, vendors, or enterprise buyers.",
    focusPacks: [
      "Transparency & launch docs",
      "Privacy & cookies",
      "Platform & marketplace rules",
    ],
  },
};

function rgb(doc: jsPDF, c: [number, number, number]) {
  doc.setTextColor(c[0], c[1], c[2]);
}

function wrap(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lh = 5,
): number {
  const lines = doc.splitTextToSize(text, maxW) as string[];
  doc.text(lines, x, y);
  return y + lines.length * lh;
}

export function downloadDiligenceExport(input: {
  assessment: ComplianceAssessment;
  kind: DiligenceExportKind;
  fixesSinceLastScan?: string[];
  pluginDiffs?: PluginDiff[];
  coverageNotes?: string[];
  whiteLabelOrg?: string;
}) {
  const meta = EXPORT_META[input.kind];
  const brand = input.whiteLabelOrg?.trim() || "CounterLayer";
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 16;
  const width = 210 - margin * 2;
  let y = 18;
  const ink: [number, number, number] = [18, 28, 26];
  const mute: [number, number, number] = [100, 110, 106];

  const addPageIfNeeded = (need: number) => {
    if (y + need > 280) {
      doc.addPage();
      y = 18;
    }
  };

  doc.setFillColor(18, 28, 26);
  doc.rect(0, 0, 210, 42, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`${brand} — Diligence export`, margin, 16);
  doc.setFontSize(10);
  doc.text(meta.title.replace("Diligence export — ", ""), margin, 24);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(input.assessment.url, margin, 32);
  doc.text(
    `As of ${new Date(input.assessment.assessedAt).toLocaleString()} · ${getAudienceDisplayLabel(input.assessment.audience)} · ${input.assessment.jurisdiction}`,
    margin,
    38,
  );

  y = 50;
  rgb(doc, mute);
  doc.setFontSize(8);
  y = wrap(doc, meta.subtitle, margin, y, width, 3.8);
  y += 4;
  rgb(doc, ink);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Executive summary", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  for (const p of input.assessment.executiveSummary.slice(0, 4)) {
    addPageIfNeeded(14);
    y = wrap(doc, p, margin, y, width, 4.2);
    y += 2;
  }

  if (input.fixesSinceLastScan?.length) {
    addPageIfNeeded(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("What we fixed since last scan", margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    for (const line of input.fixesSinceLastScan) {
      addPageIfNeeded(12);
      y = wrap(doc, `• ${line}`, margin, y, width, 4.2);
      y += 2;
    }
  }

  if (input.pluginDiffs?.length) {
    addPageIfNeeded(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Plugin changes vs prior scan", margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    for (const d of input.pluginDiffs.slice(0, 12)) {
      addPageIfNeeded(10);
      y = wrap(
        doc,
        `${d.improved ? "↑" : "↓"} ${d.pluginId} ${d.title}: ${d.before} → ${d.after}`,
        margin,
        y,
        width,
        4.2,
      );
      y += 2;
    }
  }

  addPageIfNeeded(24);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Focused controls", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  const focused = input.assessment.controls.filter((c) =>
    meta.focusPacks.includes(c.packLabel),
  );

  for (const c of focused) {
    addPageIfNeeded(28);
    doc.setFont("helvetica", "bold");
    y = wrap(
      doc,
      `${c.pluginId} · ${c.status.toUpperCase()} — ${c.title}`,
      margin,
      y,
      width,
      4.2,
    );
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    for (const e of c.evidence.slice(0, 2)) {
      y = wrap(doc, `• ${e}`, margin, y + 1, width, 3.6);
    }
    y += 4;
    doc.setFontSize(9);
  }

  if (input.coverageNotes?.length) {
    addPageIfNeeded(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Additional sources", margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    rgb(doc, mute);
    for (const n of input.coverageNotes) {
      y = wrap(doc, `• ${n}`, margin, y, width, 3.6);
      y += 1;
    }
  }

  addPageIfNeeded(16);
  rgb(doc, mute);
  y += 4;
  wrap(
    doc,
    "Diligence export — not a law firm, not a substitute for counsel, and not a certification or determination of compliance.",
    margin,
    y,
    width,
    3.6,
  );

  doc.save(
    `counterlayer-diligence-${input.kind}-${Date.now()}.pdf`,
  );
}
