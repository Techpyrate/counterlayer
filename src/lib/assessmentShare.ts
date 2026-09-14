import type { ComplianceAssessment } from "@/lib/complianceAssessment";

export function assessmentHost(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export function overallBandLabel(
  overall: ComplianceAssessment["overall"],
): string {
  if (overall === "elevated") return "Elevated attention";
  if (overall === "watch") return "Watch — remediate soon";
  return "Low open risk (public scan)";
}

export function overallBandExplanation(
  overall: ComplianceAssessment["overall"],
): string {
  if (overall === "elevated") {
    return "Multiple gaps or risk signals appeared on the public surface. Prioritize launch-critical controls, publish fixes, then re-scan. This is not a finding that you violated the law.";
  }
  if (overall === "watch") {
    return "One or more controls need attention before routine launch or diligence review. Fix gaps on the live site, then re-scan to confirm.";
  }
  return "Automated public checks did not surface many control failures. That is not a legal clearance, SOC 2 / ISO certification, or substitute for counsel review.";
}

/** Plain-text summary suitable for clipboard / Web Share. */
export function buildAssessmentShareText(
  assessment: ComplianceAssessment,
): string {
  const host = assessmentHost(assessment.url);
  const open =
    assessment.stats.gap +
    assessment.stats.risk_signal +
    assessment.stats.partial;
  const lines = [
    `CounterLayer Compliance Scan — ${host}`,
    `URL: ${assessment.url}`,
    `Band: ${overallBandLabel(assessment.overall)} (score ${assessment.score})`,
    `Plugins: ${assessment.stats.pluginsRun} · Pass ${assessment.stats.pass} · Open/partial ${open} · Launch-critical open ${assessment.stats.launchCriticalGaps}`,
    `Generated: ${new Date(assessment.assessedAt).toLocaleString()}`,
    "",
    "Executive summary:",
    ...assessment.executiveSummary.map((p) => `• ${p}`),
    "",
    "Priority remediation:",
    ...assessment.nextSteps.slice(0, 5).map((s, i) => `${i + 1}. ${s}`),
    "",
    "Open this tool to re-run or download the full PDF: /assess",
    "Not a law firm. Not a substitute for counsel. Not a certification.",
  ];
  return lines.join("\n");
}

export function buildAssessmentMarkdown(
  assessment: ComplianceAssessment,
): string {
  const host = assessmentHost(assessment.url);
  const parts: string[] = [
    `# Compliance scan report — ${host}`,
    "",
    `**URL:** ${assessment.url}  `,
    `**Band:** ${overallBandLabel(assessment.overall)} (score ${assessment.score})  `,
    `**Generated:** ${new Date(assessment.assessedAt).toLocaleString()}  `,
    `**Packs:** ${assessment.packsApplied.join(", ")}  `,
    "",
    "## Executive summary",
    "",
    ...assessment.executiveSummary.map((p) => `- ${p}`),
    "",
    "## Priority remediation",
    "",
    ...assessment.nextSteps.map((s, i) => `${i + 1}. ${s}`),
    "",
    "## Plugin results",
    "",
  ];

  for (const c of assessment.controls) {
    parts.push(
      `### ${c.pluginId} — ${c.title} (\`${c.status}\`)`,
      "",
      c.requirement,
      "",
      `**Why it matters:** ${c.whyItMatters}`,
      "",
      "**Evidence:**",
      ...c.evidence.map((e) => `- ${e}`),
      "",
    );
    if (c.status !== "pass" && c.status !== "not_assessed") {
      parts.push("**Remediation:**", ...c.remediation.map((r) => `- ${r}`), "");
    }
  }

  parts.push(
    "## Methodology",
    "",
    ...assessment.methodology.map((m) => `- ${m}`),
    "",
    "## Limits",
    "",
    ...assessment.limitations.map((m) => `- ${m}`),
    "",
    "_Not a law firm. Not a substitute for counsel. Not a certification._",
    "",
  );

  return parts.join("\n");
}

export function downloadAssessmentMarkdown(assessment: ComplianceAssessment) {
  const host = assessmentHost(assessment.url).replace(/[^\w.-]+/g, "-");
  const blob = new Blob([buildAssessmentMarkdown(assessment)], {
    type: "text/markdown;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `counterlayer-compliance-${host}-${assessment.overall}.md`;
  a.click();
  URL.revokeObjectURL(url);
}
