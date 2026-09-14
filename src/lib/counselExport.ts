import type { ComplianceAssessment } from "@/lib/complianceAssessment";
import { jsPDF } from "jspdf";
import { assessmentHost } from "@/lib/assessmentShare";

export function downloadControlMatrixCsv(assessment: ComplianceAssessment) {
  const headers = [
    "control_id",
    "title",
    "status",
    "pack",
    "launch_critical",
    "confidence",
    "framework_refs",
    "requirement",
    "evidence_summary",
    "remediation_primary",
  ];
  const rows = assessment.controls.map((c) =>
    [
      c.pluginId,
      c.title,
      c.status,
      c.packLabel,
      c.launchCritical ? "yes" : "no",
      c.confidence,
      c.frameworkRefs.join("; "),
      csvEscape(c.requirement),
      csvEscape(c.evidence.slice(0, 3).join(" | ")),
      csvEscape(c.remediation[0] ?? ""),
    ].join(","),
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const host = assessmentHost(assessment.url).replace(/[^\w.-]+/g, "-");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `counterlayer-control-matrix-${host}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function csvEscape(s: string) {
  const t = s.replace(/"/g, '""');
  return `"${t}"`;
}

export function downloadCounselAttestationPdf(input: {
  assessment: ComplianceAssessment;
  attestedBy?: string;
  scanId?: string;
}) {
  const { assessment } = input;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 18;
  const width = 210 - margin * 2;
  let y = 22;
  const host = assessmentHost(assessment.url);

  doc.setFillColor(18, 28, 26);
  doc.rect(0, 0, 210, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("CounterLayer — Scan attestation", margin, 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Counsel-ready evidence summary — not a law firm / not a substitute for counsel", margin, 26);
  doc.text(host, margin, 33);

  y = 50;
  doc.setTextColor(18, 28, 26);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Attestation record", margin, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const lines = [
    `URL scanned: ${assessment.url}`,
    `Scan timestamp (UTC): ${assessment.assessedAt}`,
    `Report ID: ${input.scanId ?? "—"}`,
    `Overall band: ${assessment.overall.toUpperCase()} · score ${assessment.score}`,
    `Controls evaluated: ${assessment.stats.pluginsRun}`,
    `Pass ${assessment.stats.pass} · Partial ${assessment.stats.partial} · Gap ${assessment.stats.gap} · Risk ${assessment.stats.risk_signal}`,
    `Pages analyzed: ${assessment.scanStats.pagesOk} · Characters: ${assessment.scanStats.charsScanned.toLocaleString()}`,
    `Attested by (account): ${input.attestedBy ?? "—"}`,
  ];
  for (const line of lines) {
    doc.text(line, margin, y);
    y += 5;
  }

  y += 6;
  doc.setFont("helvetica", "bold");
  doc.text("Scope & limits", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  const scope = doc.splitTextToSize(
    "This attestation documents an automated review of publicly reachable pages and uploaded policy text at the scan timestamp. It does not certify legal compliance, SOC 2, ISO 27001, or PCI DSS. Private contracts, authenticated areas, and intent are out of scope. Recipient should rely on qualified counsel for binding conclusions.",
    width,
  ) as string[];
  doc.text(scope, margin, y);
  y += scope.length * 4.5 + 8;

  doc.setFont("helvetica", "bold");
  doc.text("Open controls (summary)", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  const open = assessment.controls.filter(
    (c) =>
      c.status === "gap" ||
      c.status === "risk_signal" ||
      c.status === "partial",
  );
  for (const c of open.slice(0, 12)) {
    const row = doc.splitTextToSize(
      `• ${c.pluginId} [${c.status}] ${c.title}`,
      width,
    ) as string[];
    doc.text(row, margin, y);
    y += row.length * 4.2 + 1;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  }

  doc.save(`counterlayer-attestation-${host.replace(/[^\w.-]+/g, "-")}.pdf`);
}
