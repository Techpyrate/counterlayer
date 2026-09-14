import { jsPDF } from "jspdf";
import type { ComplianceResult, CheckAudience } from "@/data/complianceCheck";
import { getAudienceDisplayLabel } from "@/data/complianceCheck";
import type { Jurisdiction } from "@/data/types";
import type { ComplianceAssessment } from "@/lib/complianceAssessment";
import type { SiteScanResult } from "@/lib/siteScan";

const audienceLabel = (a: CheckAudience) => getAudienceDisplayLabel(a);

const C = {
  ink: [12, 46, 44] as [number, number, number],
  inkDeep: [6, 26, 26] as [number, number, number],
  paper: [244, 250, 247] as [number, number, number],
  signal: [47, 214, 123] as [number, number, number],
  elevated: [232, 93, 76] as [number, number, number],
  watch: [227, 178, 60] as [number, number, number],
  info: [91, 141, 239] as [number, number, number],
  found: [47, 214, 123] as [number, number, number],
  weak: [227, 178, 60] as [number, number, number],
  missing: [232, 93, 76] as [number, number, number],
  mute: [92, 117, 112] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  line: [200, 220, 214] as [number, number, number],
};

function wrap(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineH = 5,
) {
  const lines = doc.splitTextToSize(text, maxWidth) as string[];
  doc.text(lines, x, y);
  return y + lines.length * lineH;
}

function rgb(doc: jsPDF, c: [number, number, number]) {
  doc.setTextColor(c[0], c[1], c[2]);
}

function fill(doc: jsPDF, c: [number, number, number]) {
  doc.setFillColor(c[0], c[1], c[2]);
}

function stroke(doc: jsPDF, c: [number, number, number]) {
  doc.setDrawColor(c[0], c[1], c[2]);
}

function pill(
  doc: jsPDF,
  label: string,
  x: number,
  y: number,
  color: [number, number, number],
) {
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  const w = doc.getTextWidth(label) + 6;
  fill(doc, color);
  doc.roundedRect(x, y - 3.5, w, 5.5, 1.5, 1.5, "F");
  rgb(doc, C.white);
  doc.text(label, x + 3, y);
  rgb(doc, C.inkDeep);
  return w + 3;
}

function sectionBar(doc: jsPDF, title: string, y: number, margin: number, width: number) {
  fill(doc, C.ink);
  doc.roundedRect(margin, y, width, 9, 2, 2, "F");
  rgb(doc, C.signal);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(title, margin + 4, y + 6);
  rgb(doc, C.inkDeep);
  return y + 14;
}

function statBox(
  doc: jsPDF,
  label: string,
  value: string,
  x: number,
  y: number,
  w: number,
  accent: [number, number, number],
) {
  fill(doc, C.paper);
  stroke(doc, C.line);
  doc.roundedRect(x, y, w, 18, 2, 2, "FD");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  rgb(doc, C.mute);
  doc.text(label.toUpperCase(), x + 3, y + 5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  rgb(doc, accent);
  doc.text(value, x + 3, y + 13);
  rgb(doc, C.inkDeep);
}

export function downloadBusinessPdfReport(input: {
  website?: string;
  audience?: CheckAudience | null;
  jurisdiction: Jurisdiction;
  scan: SiteScanResult | null;
  questionnaire: ComplianceResult | null;
  assessment?: ComplianceAssessment | null;
}) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 14;
  const width = 210 - margin * 2;
  let y = 0;

  const addPageIfNeeded = (need = 28) => {
    if (y > 297 - need) {
      doc.addPage();
      // subtle top band
      fill(doc, C.ink);
      doc.rect(0, 0, 210, 6, "F");
      y = 14;
    }
  };

  // —— Cover / hero band ——
  fill(doc, C.ink);
  doc.rect(0, 0, 210, 48, "F");
  rgb(doc, C.signal);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("COUNTERWEIGHT  ·  BUSINESS RISK REPORT", margin, 12);
  rgb(doc, C.white);
  doc.setFontSize(20);
  let host = "Business diligence";
  try {
    if (input.scan?.url) host = new URL(input.scan.url).hostname;
  } catch {
    /* keep default */
  }
  doc.text(host, margin, 24);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  rgb(doc, [180, 200, 195]);
  doc.text(
    `Generated ${new Date().toLocaleString()}  ·  Jurisdiction: ${input.jurisdiction}${
      input.audience ? `  ·  ${audienceLabel(input.audience)}` : ""
    }`,
    margin,
    32,
  );
  doc.text(
    input.assessment
      ? "Structured compliance assessment (+ evidence layers)"
      : input.questionnaire
        ? "Full report (scan + owner checklist)"
        : "Website review report",
    margin,
    39,
  );
  y = 56;

  // Disclaimer card
  fill(doc, C.paper);
  stroke(doc, C.line);
  doc.roundedRect(margin, y, width, 22, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  rgb(doc, C.ink);
  doc.text("Diligence aid — not a law firm / not a substitute for counsel", margin + 4, y + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  rgb(doc, C.mute);
  y = wrap(
    doc,
    "Not an audit opinion or finding of liability. Public reviews miss private contracts and authenticated areas. Have qualified counsel review elevated items before launch.",
    margin + 4,
    y + 11,
    width - 8,
    3.8,
  );
  y += 10;
  rgb(doc, C.inkDeep);

  if (input.scan) {
    addPageIfNeeded(50);
    y = sectionBar(doc, "1. Public site summary", y, margin, width);

    const boxW = (width - 9) / 4;
    const docsFound = input.scan.stats.docsFound ?? 0;
    const docsMissing = input.scan.stats.docsMissing ?? 0;
    const riskScore = Math.min(
      100,
      input.scan.stats.elevated * 28 +
        input.scan.stats.watch * 12 +
        input.scan.stats.info * 4 +
        docsMissing * 8 +
        (input.scan.stats.docsWeak ?? 0) * 4,
    );
    statBox(doc, "Pages fetched", String(input.scan.stats.pagesOk), margin, y, boxW, C.found);
    statBox(
      doc,
      "Elevated",
      String(input.scan.stats.elevated),
      margin + boxW + 3,
      y,
      boxW,
      C.elevated,
    );
    statBox(
      doc,
      "Docs missing",
      String(docsMissing),
      margin + (boxW + 3) * 2,
      y,
      boxW,
      C.missing,
    );
    statBox(
      doc,
      "Risk score",
      String(riskScore),
      margin + (boxW + 3) * 3,
      y,
      boxW,
      riskScore >= 60 ? C.elevated : riskScore >= 30 ? C.watch : C.found,
    );
    y += 24;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    rgb(doc, C.mute);
    y = wrap(
      doc,
      `Failed pages: ${input.scan.stats.pagesFailed}  ·  Text: ${input.scan.stats.charsScanned.toLocaleString()} chars  ·  Docs found: ${docsFound}  ·  Weak: ${input.scan.stats.docsWeak ?? 0}  ·  Watch: ${input.scan.stats.watch}  ·  Info: ${input.scan.stats.info}`,
      margin,
      y,
      width,
      4,
    );
    y += 6;
    rgb(doc, C.inkDeep);

    // Executive summary
    addPageIfNeeded(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Executive summary", margin, y);
    y += 5;
    for (let i = 0; i < input.scan.executiveSummary.length; i++) {
      addPageIfNeeded(20);
      fill(doc, C.ink);
      doc.roundedRect(margin, y, width, 4.5, 1, 1, "F");
      rgb(doc, C.signal);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text(`INSIGHT ${i + 1}`, margin + 2, y + 3.2);
      y += 7;
      rgb(doc, C.inkDeep);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      y = wrap(doc, input.scan.executiveSummary[i], margin + 2, y, width - 4, 4.5);
      y += 4;
    }

    // Documents
    if (input.scan.documents?.length) {
      addPageIfNeeded(30);
      y = sectionBar(doc, "Required website documents", y, margin, width);
      for (const d of input.scan.documents) {
        addPageIfNeeded(32);
        const accent =
          d.status === "found" ? C.found : d.status === "weak" ? C.weak : C.missing;
        fill(doc, C.paper);
        stroke(doc, C.line);
        const cardTop = y;
        fill(doc, accent);
        doc.rect(margin, cardTop, 1.5, 1, "F"); // placeholder height fixed below

        let cy = cardTop + 5;
        let px = margin + 4;
        px +=
          pill(
            doc,
            d.status === "found" ? "FOUND" : d.status === "weak" ? "WEAK" : "MISSING",
            px,
            cy,
            accent,
          ) + 1;
        if (d.requiredForLaunch) {
          fill(doc, C.ink);
          doc.roundedRect(px, cy - 3.5, 28, 5.5, 1.5, 1.5, "F");
          rgb(doc, C.white);
          doc.setFontSize(7);
          doc.setFont("helvetica", "bold");
          doc.text("LAUNCH CRITICAL", px + 2, cy);
          rgb(doc, C.inkDeep);
        }
        cy += 6;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        cy = wrap(doc, d.label, margin + 4, cy, width - 8, 4.5);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        rgb(doc, C.mute);
        cy = wrap(doc, d.evidence, margin + 4, cy + 1, width - 8, 3.8);
        if (d.url) {
          cy = wrap(doc, `URL: ${d.url}`, margin + 4, cy + 1, width - 8, 3.8);
        }
        if (d.status !== "found") {
          rgb(doc, C.inkDeep);
          cy = wrap(doc, `Why: ${d.whyItMatters}`, margin + 4, cy + 1, width - 8, 3.8);
          rgb(doc, [20, 120, 80]);
          cy = wrap(doc, `Next: ${d.whatToDo}`, margin + 4, cy + 1, width - 8, 3.8);
        }
        cy += 3;
        const h = cy - cardTop;
        fill(doc, accent);
        doc.rect(margin, cardTop, 1.8, h, "F");
        stroke(doc, C.line);
        doc.roundedRect(margin, cardTop, width, h, 2, 2, "S");
        y = cy + 3;
        rgb(doc, C.inkDeep);
      }
    }

    // Findings
    addPageIfNeeded(30);
    y = sectionBar(doc, "Findings gallery", y, margin, width);
    if (input.scan.findings.length === 0) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      rgb(doc, C.mute);
      y = wrap(doc, "No strong keyword hits on reviewed public pages.", margin, y, width);
      y += 4;
      rgb(doc, C.inkDeep);
    }
    for (const f of input.scan.findings) {
      addPageIfNeeded(36);
      const accent =
        f.severity === "elevated"
          ? C.elevated
          : f.severity === "watch"
            ? C.watch
            : C.info;
      const cardTop = y;
      let cy = cardTop + 5;
      pill(doc, f.severity.toUpperCase(), margin + 4, cy, accent);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      rgb(doc, C.mute);
      doc.text(f.domain.replace(/_/g, " "), margin + 32, cy);
      cy += 6;
      rgb(doc, C.inkDeep);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      cy = wrap(doc, f.title, margin + 4, cy, width - 8, 4.5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      cy = wrap(doc, f.detail, margin + 4, cy + 1, width - 8, 3.8);
      rgb(doc, C.mute);
      cy = wrap(doc, `Evidence: ${f.evidence}`, margin + 4, cy + 1, width - 8, 3.8);
      cy = wrap(
        doc,
        `Pages: ${f.pages.slice(0, 5).join(" | ")}${f.pages.length > 5 ? " …" : ""}`,
        margin + 4,
        cy + 1,
        width - 8,
        3.8,
      );
      rgb(doc, [20, 120, 80]);
      cy = wrap(doc, `Next: ${f.whatToDo}`, margin + 4, cy + 1, width - 8, 3.8);
      cy += 3;
      const h = cy - cardTop;
      fill(doc, accent);
      doc.rect(margin, cardTop, 1.8, h, "F");
      stroke(doc, C.line);
      doc.roundedRect(margin, cardTop, width, h, 2, 2, "S");
      y = cy + 3;
      rgb(doc, C.inkDeep);
    }

    // Checklist
    addPageIfNeeded(28);
    y = sectionBar(doc, "Pre-launch checklist", y, margin, width);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    for (const item of input.scan.checklist) {
      addPageIfNeeded(12);
      fill(doc, C.paper);
      doc.roundedRect(margin, y, width, 7, 1.5, 1.5, "F");
      rgb(doc, C.inkDeep);
      y = wrap(doc, `☐  ${item}`, margin + 3, y + 4.5, width - 6, 4);
      y += 4;
    }
    y += 4;
  }

  if (input.questionnaire && input.audience) {
    addPageIfNeeded(40);
    y = sectionBar(doc, "2. Owner checklist / risk report", y, margin, width);

    const boxW = (width - 6) / 3;
    const oc =
      input.questionnaire.overall === "elevated"
        ? C.elevated
        : input.questionnaire.overall === "watch"
          ? C.watch
          : C.found;
    statBox(doc, "Overall", input.questionnaire.overall.toUpperCase(), margin, y, boxW, oc);
    statBox(
      doc,
      "Score",
      String(input.questionnaire.score),
      margin + boxW + 3,
      y,
      boxW,
      C.ink,
    );
    statBox(
      doc,
      "Flags",
      String(input.questionnaire.flags.length),
      margin + (boxW + 3) * 2,
      y,
      boxW,
      C.info,
    );
    y += 24;

    const pe = input.questionnaire.plainEnglish;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    rgb(doc, C.inkDeep);
    y = wrap(doc, pe.headline, margin, y, width, 5);
    y += 3;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    y = wrap(doc, pe.overallExplained, margin, y, width, 4.2);
    y += 4;
    for (const para of pe.executiveNarrative) {
      addPageIfNeeded(22);
      y = wrap(doc, para, margin, y, width, 4.2);
      y += 3;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("In simple language", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    for (const line of pe.inSimpleTerms) {
      addPageIfNeeded(14);
      y = wrap(doc, `• ${line}`, margin, y, width, 4.2);
      y += 2;
    }
    y += 3;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("How to read this report", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    pe.howToReadThis.forEach((h, i) => {
      addPageIfNeeded(12);
      y = wrap(doc, `${i + 1}. ${h}`, margin, y, width, 4.2);
      y += 2;
    });
    y += 3;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Top priorities", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    pe.topPriorities.forEach((p, i) => {
      addPageIfNeeded(14);
      y = wrap(doc, `${i + 1}. ${p}`, margin, y, width, 4.2);
      y += 2;
    });
    y += 2;
    rgb(doc, C.mute);
    y = wrap(doc, pe.ifYouDoNothing, margin, y, width, 4);
    y += 4;
    rgb(doc, C.inkDeep);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Methodology", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    for (const m of pe.methodology) {
      addPageIfNeeded(12);
      y = wrap(doc, `• ${m}`, margin, y, width, 3.8);
      y += 1;
    }
    y += 3;

    if (pe.domainNotes.length) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Rulebooks these flags touch", margin, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      for (const d of pe.domainNotes) {
        addPageIfNeeded(16);
        doc.setFont("helvetica", "bold");
        y = wrap(doc, `${d.label} (${d.count})`, margin, y, width, 4);
        doc.setFont("helvetica", "normal");
        y = wrap(doc, d.meaning, margin, y, width, 3.8);
        y += 2;
      }
      y += 2;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("What this report is not", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    for (const w of pe.whatThisIsNot) {
      addPageIfNeeded(10);
      y = wrap(doc, `• ${w}`, margin, y, width, 3.8);
      y += 1;
    }
    y += 3;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Suggested next steps", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    pe.nextSteps.forEach((n, i) => {
      addPageIfNeeded(12);
      y = wrap(doc, `${i + 1}. ${n}`, margin, y, width, 4.2);
      y += 2;
    });
    y += 2;
    rgb(doc, C.mute);
    doc.setFontSize(8);
    y = wrap(doc, pe.closingNote, margin, y, width, 3.8);
    y += 4;

    rgb(doc, C.mute);
    doc.setFontSize(8);
    y = wrap(doc, input.questionnaire.jurisdictionNote, margin, y, width, 3.8);
    y += 2;
    y = wrap(doc, input.questionnaire.counselCue, margin, y, width, 3.8);
    y += 6;
    rgb(doc, C.inkDeep);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Flag-by-flag explanation", margin, y);
    y += 6;

    if (input.questionnaire.flags.length === 0) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      rgb(doc, C.mute);
      y = wrap(doc, "No elevated questionnaire flags.", margin, y, width);
      rgb(doc, C.inkDeep);
    }

    const sorted = [...input.questionnaire.flags].sort((a, b) => {
      const rank = { elevated: 0, watch: 1, low: 2 };
      return rank[a.level] - rank[b.level];
    });

    for (const f of sorted) {
      addPageIfNeeded(42);
      const accent =
        f.level === "elevated" ? C.elevated : f.level === "watch" ? C.watch : C.found;
      const cardTop = y;
      let cy = cardTop + 5;
      pill(doc, f.level.toUpperCase(), margin + 4, cy, accent);
      doc.setFontSize(8);
      rgb(doc, C.mute);
      doc.text(f.theme, margin + 30, cy);
      cy += 6;
      rgb(doc, C.inkDeep);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      cy = wrap(doc, f.prompt, margin + 4, cy, width - 8, 4.2);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      cy = wrap(doc, `Why it matters: ${f.plainWhy}`, margin + 4, cy + 1, width - 8, 3.8);
      cy = wrap(doc, `So what: ${f.soWhat}`, margin + 4, cy + 1, width - 8, 3.8);
      rgb(doc, C.mute);
      cy = wrap(doc, f.note, margin + 4, cy + 1, width - 8, 3.8);
      rgb(doc, C.inkDeep);
      for (const r of f.remediation) {
        cy = wrap(doc, `→ ${r}`, margin + 4, cy + 1, width - 8, 3.8);
      }
      cy += 3;
      const h = cy - cardTop;
      fill(doc, accent);
      doc.rect(margin, cardTop, 1.8, h, "F");
      stroke(doc, C.line);
      doc.roundedRect(margin, cardTop, width, h, 2, 2, "S");
      y = cy + 3;
    }
  } else if (input.scan) {
    addPageIfNeeded(18);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    rgb(doc, C.mute);
    y = wrap(
      doc,
      "Owner checklist not completed. Re-export after answering all business questions for a combined report.",
      margin,
      y,
      width,
    );
  }

  // Structured compliance assessment
  if (input.assessment) {
    const a = input.assessment;
    addPageIfNeeded(40);
    y = sectionBar(doc, "3. Structured compliance assessment", y, margin, width);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    rgb(doc, C.inkDeep);
    doc.text(`Overall: ${a.overall.toUpperCase()}  ·  Score ${a.score}`, margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    rgb(doc, C.mute);
    doc.text(
      `Pass ${a.stats.pass} · Partial ${a.stats.partial} · Gap ${a.stats.gap} · Risk ${a.stats.risk_signal} · N/A ${a.stats.not_assessed} · Launch-critical open ${a.stats.launchCriticalGaps}`,
      margin,
      y,
    );
    y += 5;
    rgb(doc, C.inkDeep);
    doc.setFontSize(9);
    for (const para of a.executiveSummary) {
      addPageIfNeeded(16);
      y = wrap(doc, para, margin, y, width, 4);
      y += 2;
    }
    y += 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Control results", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    const sorted = [...a.controls].sort((x, y2) => {
      const rank = {
        risk_signal: 0,
        gap: 1,
        partial: 2,
        not_assessed: 3,
        pass: 4,
      };
      return rank[x.status] - rank[y2.status];
    });

    for (const c of sorted) {
      addPageIfNeeded(28);
      const accent =
        c.status === "risk_signal" || c.status === "gap"
          ? C.elevated
          : c.status === "partial"
            ? C.watch
            : c.status === "pass"
              ? C.found
              : C.info;
      pill(doc, c.status.replace("_", " ").toUpperCase(), margin, y, accent);
      rgb(doc, C.mute);
      doc.setFontSize(7);
      doc.text(c.packLabel, margin + 42, y);
      y += 5;
      rgb(doc, C.inkDeep);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      y = wrap(doc, c.title, margin, y, width, 4);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      y = wrap(doc, c.requirement, margin, y, width, 3.6);
      y += 1;
      for (const e of c.evidence.slice(0, 2)) {
        rgb(doc, C.mute);
        y = wrap(doc, `• ${e}`, margin, y, width, 3.5);
      }
      rgb(doc, C.inkDeep);
      if (c.remediation[0]) {
        y = wrap(doc, `Next: ${c.remediation[0]}`, margin, y, width, 3.5);
      }
      y += 4;
    }

    addPageIfNeeded(24);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Assessment limits", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    for (const lim of a.limitations) {
      addPageIfNeeded(10);
      y = wrap(doc, `• ${lim}`, margin, y, width, 3.6);
      y += 1;
    }
    y += 4;
  }

  // Pages appendix
  if (input.scan?.pagesScanned.length) {
    addPageIfNeeded(30);
    y = sectionBar(doc, "Pages reviewed", y, margin, width);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    rgb(doc, C.mute);
    for (const p of input.scan.pagesScanned) {
      addPageIfNeeded(8);
      y = wrap(doc, p, margin, y, width, 3.5);
      y += 0.5;
    }
  }

  addPageIfNeeded(16);
  y += 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  rgb(doc, C.mute);
  y = wrap(
    doc,
    input.scan?.disclaimer ||
      "CounterLayer diligence report — not a law firm, not a substitute for counsel. Verify with primary sources.",
    margin,
    y,
    width,
    3.5,
  );

  const safeHost = host.replace(/\W+/g, "-");
  const mode = input.assessment
    ? input.questionnaire || input.scan
      ? "compliance"
      : "assessment"
    : input.questionnaire
      ? "full"
      : "scan";
  doc.save(`counterlayer-${mode}-report-${safeHost}.pdf`);
}
