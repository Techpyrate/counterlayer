import { jsPDF } from "jspdf";
import type { ComplianceAssessment } from "@/lib/complianceAssessment";
import {
  assessmentHost,
  overallBandExplanation,
  overallBandLabel,
} from "@/lib/assessmentShare";

const C = {
  ink: [18, 28, 26] as [number, number, number],
  mute: [100, 110, 106] as [number, number, number],
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

export function downloadAssessmentPdf(assessment: ComplianceAssessment) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 16;
  const width = 210 - margin * 2;
  let y = 18;
  const host = assessmentHost(assessment.url);

  const addPageIfNeeded = (need: number) => {
    if (y + need > 280) {
      doc.addPage();
      y = 18;
    }
  };

  const heading = (title: string) => {
    addPageIfNeeded(14);
    rgb(doc, C.ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title, margin, y);
    y += 7;
  };

  doc.setFillColor(18, 28, 26);
  doc.rect(0, 0, 210, 42, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("CounterLayer — Compliance scan report", margin, 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(host, margin, 24);
  doc.setFontSize(8);
  doc.text(assessment.url, margin, 30);
  doc.text(
    `${overallBandLabel(assessment.overall)} · score ${assessment.score} · ${assessment.stats.pluginsRun} plugins · ${new Date(assessment.assessedAt).toLocaleString()}`,
    margin,
    36,
  );

  y = 52;
  heading("1. Overview");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  rgb(doc, C.ink);
  y = wrap(doc, overallBandExplanation(assessment.overall), margin, y, width, 4.2);
  y += 3;
  y = wrap(
    doc,
    `Pass ${assessment.stats.pass} · Partial ${assessment.stats.partial} · Gap ${assessment.stats.gap} · Risk ${assessment.stats.risk_signal} · Inconclusive ${assessment.stats.not_assessed} · Launch-critical open ${assessment.stats.launchCriticalGaps}`,
    margin,
    y,
    width,
    4,
  );
  y += 4;
  y = wrap(
    doc,
    `Packs: ${assessment.packsApplied.join(", ")} · Pages OK: ${assessment.scanStats.pagesOk} · Chars: ${assessment.scanStats.charsScanned.toLocaleString()}`,
    margin,
    y,
    width,
    4,
  );
  y += 6;

  heading("2. Executive summary");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  for (const p of assessment.executiveSummary) {
    addPageIfNeeded(16);
    y = wrap(doc, `• ${p}`, margin, y, width, 4.2);
    y += 2.5;
  }
  y += 4;

  heading("3. Priority remediation");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  assessment.nextSteps.forEach((s, i) => {
    addPageIfNeeded(14);
    y = wrap(doc, `${i + 1}. ${s}`, margin, y, width, 4.2);
    y += 2.5;
  });
  y += 4;

  heading("4. Control plugin results");
  for (const c of assessment.controls) {
    addPageIfNeeded(52);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    rgb(doc, C.ink);
    y = wrap(
      doc,
      `${c.pluginId} · ${c.status.toUpperCase()}${c.launchCritical ? " · LAUNCH-CRITICAL" : ""} — ${c.title}`,
      margin,
      y,
      width,
      4.5,
    );
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    rgb(doc, C.mute);
    if (c.frameworkRefs.length) {
      y = wrap(doc, c.frameworkRefs.join(" · "), margin, y + 1, width, 3.6);
    }
    rgb(doc, C.ink);
    y = wrap(doc, c.requirement, margin, y + 1, width, 3.8);
    y = wrap(doc, `Why it matters: ${c.whyItMatters}`, margin, y + 1, width, 3.6);
    y = wrap(doc, `How tested: ${c.howWeTest}`, margin, y + 1, width, 3.6);
    for (const e of c.evidence.slice(0, 3)) {
      y = wrap(doc, `Evidence: ${e}`, margin, y + 1, width, 3.6);
    }
    if (c.status !== "pass" && c.status !== "not_assessed") {
      for (const r of c.remediation.slice(0, 2)) {
        y = wrap(doc, `Remediate: ${r}`, margin, y + 1, width, 3.6);
      }
    }
    y += 5;
  }

  if (assessment.coverageNotes.length) {
    heading("5. Additional sources");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    rgb(doc, C.mute);
    for (const n of assessment.coverageNotes) {
      addPageIfNeeded(10);
      y = wrap(doc, `• ${n}`, margin, y, width, 3.6);
      y += 1;
    }
    y += 4;
  }

  heading("Methodology");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  rgb(doc, C.mute);
  for (const m of assessment.methodology) {
    addPageIfNeeded(10);
    y = wrap(doc, `• ${m}`, margin, y, width, 3.6);
    y += 1;
  }
  y += 4;

  heading("Limits");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  rgb(doc, C.mute);
  for (const l of assessment.limitations) {
    addPageIfNeeded(10);
    y = wrap(doc, `• ${l}`, margin, y, width, 3.6);
    y += 1;
  }

  y += 8;
  addPageIfNeeded(12);
  doc.setFontSize(8);
  y = wrap(
    doc,
    "Diligence report — not a law firm, not a substitute for counsel, and not a SOC 2 / ISO certification or penetration test.",
    margin,
    y,
    width,
    3.6,
  );

  doc.save(
    `counterlayer-compliance-${host.replace(/[^\w.-]+/g, "-")}-${assessment.overall}.pdf`,
  );
}
