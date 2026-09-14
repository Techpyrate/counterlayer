import type { CheckAudience } from "@/data/complianceCheck";
import { getAudienceDisplayLabel } from "@/data/complianceCheck";
import {
  CONTROL_PACK_LABEL,
  controlsForContext,
  type ComplianceControl,
  type Confidence,
  type ControlPack,
  type ControlStatus,
} from "@/data/complianceControls";
import type { Jurisdiction } from "@/data/types";
import type { SiteScanResult } from "@/lib/siteScan";

export type ControlAssessmentItem = {
  pluginId: string;
  controlId: string;
  pack: ControlPack;
  packLabel: string;
  title: string;
  requirement: string;
  whyItMatters: string;
  howWeTest: string;
  frameworkRefs: string[];
  status: ControlStatus;
  confidence: Confidence;
  evidence: string[];
  remediation: string[];
  launchCritical: boolean;
};

export type ComplianceAssessment = {
  url: string;
  audience: CheckAudience;
  jurisdiction: Jurisdiction;
  assessedAt: string;
  overall: "low" | "watch" | "elevated";
  score: number;
  stats: {
    total: number;
    pass: number;
    partial: number;
    gap: number;
    risk_signal: number;
    not_assessed: number;
    launchCriticalGaps: number;
    pluginsRun: number;
  };
  packsApplied: string[];
  controls: ControlAssessmentItem[];
  executiveSummary: string[];
  methodology: string[];
  limitations: string[];
  nextSteps: string[];
  scanStats: {
    pagesOk: number;
    charsScanned: number;
    crawlFindings: number;
  };
  coverageNotes: string[];
};

function rankStatus(s: ControlStatus): number {
  const order: Record<ControlStatus, number> = {
    risk_signal: 0,
    gap: 1,
    partial: 2,
    not_assessed: 3,
    pass: 4,
  };
  return order[s];
}

function snippetAround(text: string, index: number, len = 100): string {
  const start = Math.max(0, index - 40);
  return text.slice(start, start + len).trim();
}

function evaluateControl(
  control: ComplianceControl,
  scan: SiteScanResult,
): ControlAssessmentItem {
  const evidence: string[] = [];
  let status: ControlStatus = "not_assessed";
  let confidence: Confidence = "low";
  let signals = 0;
  let passSignals = 0;
  let riskSignals = 0;
  let gapSignals = 0;
  let partialSignals = 0;

  const corpus = scan.aggregatedPublicText ?? "";

  if (control.scanFindingHints?.length) {
    for (const hint of control.scanFindingHints) {
      const hits = scan.findings.filter((f) =>
        f.title.toLowerCase().includes(hint.toLowerCase()),
      );
      for (const h of hits) {
        signals += 1;
        riskSignals += 1;
        evidence.push(
          `Control match — site finding “${h.title}” (${h.severity}): ${h.evidence.slice(0, 100)}`,
        );
      }
    }
  }

  if (control.scanDocIds?.length) {
    for (const docId of control.scanDocIds) {
      const doc = scan.documents.find((d) => d.id === docId);
      if (!doc) continue;
      signals += 1;
      if (doc.status === "found") {
        passSignals += 1;
        evidence.push(`Document check — “${doc.label}” found: ${doc.evidence}`);
      } else if (doc.status === "weak") {
        partialSignals += 1;
        evidence.push(`Document check — “${doc.label}” weak/thin: ${doc.evidence}`);
      } else {
        gapSignals += 1;
        evidence.push(`Document check — “${doc.label}” missing: ${doc.evidence}`);
      }
    }
  }

  if (corpus && control.scanContentRiskHints?.length) {
    for (const re of control.scanContentRiskHints) {
      const m = corpus.match(re);
      if (m) {
        signals += 1;
        riskSignals += 1;
        const idx = m.index ?? 0;
        evidence.push(
          `Content plugin ${control.pluginId} — risk pattern /${re.source}/ near: “${snippetAround(corpus, idx)}…”`,
        );
      }
    }
  }

  if (corpus && control.scanContentPassHints?.length) {
    const hits = control.scanContentPassHints.filter((re) => re.test(corpus));
    if (hits.length > 0) {
      signals += 1;
      if (hits.length >= Math.min(2, control.scanContentPassHints.length)) {
        passSignals += 1;
        evidence.push(
          `Content plugin ${control.pluginId} — ${hits.length} supportive content signal(s) on public pages.`,
        );
      } else {
        partialSignals += 1;
        evidence.push(
          `Content plugin ${control.pluginId} — ${hits.length} weak content signal(s); expand coverage.`,
        );
      }
    }
  }

  if (signals === 0) {
    if (scan.fetchedOk && (control.scanContentRiskHints?.length || control.scanDocIds?.length)) {
      status = "pass";
      confidence = "low";
      evidence.push(
        `Plugin ${control.pluginId} ran — no matching risk or gap signals on public pages scanned (${scan.stats.pagesOk} pages). Private contracts not visible.`,
      );
    } else {
      status = "not_assessed";
      confidence = "low";
      evidence.push(
        `Control ${control.pluginId} — insufficient public data to evaluate this check.`,
      );
    }
  } else if (riskSignals > 0) {
    status = "risk_signal";
    confidence = riskSignals + gapSignals >= 2 ? "high" : "medium";
  } else if (gapSignals > 0 && passSignals === 0) {
    status = "gap";
    confidence = gapSignals >= 2 ? "high" : "medium";
  } else if (gapSignals > 0 || partialSignals > 0) {
    status = "partial";
    confidence = "medium";
  } else if (passSignals > 0) {
    status = "pass";
    confidence =
      passSignals >= 2 || (passSignals >= 1 && signals >= 2) ? "high" : "medium";
  }

  return {
    pluginId: control.pluginId,
    controlId: control.id,
    pack: control.pack,
    packLabel: CONTROL_PACK_LABEL[control.pack],
    title: control.title,
    requirement: control.requirement,
    whyItMatters: control.whyItMatters,
    howWeTest: control.howWeTest,
    frameworkRefs: control.frameworkRefs,
    status,
    confidence,
    evidence,
    remediation: control.remediation,
    launchCritical: Boolean(control.launchCritical),
  };
}

export function runComplianceAssessment(input: {
  url: string;
  audience: CheckAudience;
  jurisdiction: Jurisdiction;
  scan: SiteScanResult;
  coverageNotes?: string[];
}): ComplianceAssessment {
  const controls = controlsForContext({
    audience: input.audience,
    jurisdiction: input.jurisdiction,
  });

  const items = controls
    .map((c) => evaluateControl(c, input.scan))
    .sort((a, b) => {
      const rs = rankStatus(a.status) - rankStatus(b.status);
      if (rs !== 0) return rs;
      if (a.launchCritical !== b.launchCritical) return a.launchCritical ? -1 : 1;
      return a.pluginId.localeCompare(b.pluginId);
    });

  const stats = {
    total: items.length,
    pass: items.filter((i) => i.status === "pass").length,
    partial: items.filter((i) => i.status === "partial").length,
    gap: items.filter((i) => i.status === "gap").length,
    risk_signal: items.filter((i) => i.status === "risk_signal").length,
    not_assessed: items.filter((i) => i.status === "not_assessed").length,
    launchCriticalGaps: items.filter(
      (i) =>
        i.launchCritical &&
        (i.status === "gap" || i.status === "risk_signal" || i.status === "partial"),
    ).length,
    pluginsRun: items.length,
  };

  const score =
    stats.risk_signal * 4 +
    stats.gap * 3 +
    stats.partial * 1 +
    stats.launchCriticalGaps * 2;

  const overall: ComplianceAssessment["overall"] =
    score >= 14 || stats.risk_signal >= 3 || stats.launchCriticalGaps >= 3
      ? "elevated"
      : score >= 6 || stats.gap + stats.risk_signal >= 2
        ? "watch"
        : "low";

  const packsApplied = Array.from(new Set(items.map((i) => i.packLabel)));

  const executiveSummary = [
    `Automated compliance scan of ${input.url} (${input.scan.stats.pagesOk} public pages, ${input.scan.stats.charsScanned.toLocaleString()} chars analyzed): ${stats.pluginsRun} control plugins executed for ${getAudienceDisplayLabel(input.audience)} / ${input.jurisdiction} pack.`,
    `Plugin results: ${stats.pass} pass, ${stats.partial} partial, ${stats.gap} gap, ${stats.risk_signal} risk signal, ${stats.not_assessed} inconclusive. Launch-critical open: ${stats.launchCriticalGaps}.`,
    overall === "low"
      ? "Overall band: Low — automated public scan did not surface many control failures. Not a legal clearance or certification."
      : overall === "watch"
        ? "Overall band: Watch — one or more controls need remediation before routine launch."
        : "Overall band: Elevated — multiple gaps or risk signals. Prioritize launch-critical plugins and counsel review.",
    `${input.scan.findings.length} additional public-page flags also fired separately from the control matrix (see Business Scan for detail).`,
  ];

  const methodology = [
    "Automated compliance assessment: each control is evaluated against public HTML/PDF text, document inventory, and policy-path checks.",
    "No owner questionnaire — evidence is collected from the live public surface (plus optional staging URL, auth cookie, and uploaded policy documents).",
    "Statuses: Pass (no gap/risk signals), Partial (thin/incomplete), Gap (required public artifact missing), Risk signal (problematic public language), Not assessed (insufficient public data).",
    "Framework refs are informational mappings — not a claim of full ISO/SOC/PCI certification.",
    "Automated diligence aid — not a law firm, not a substitute for counsel, and not a court finding, penetration test, or attorney opinion.",
  ];

  const limitations = [
    "Cannot see private contracts, Slack/email, authenticated apps, or unpublished deal terms.",
    "Absence of public risk language does not prove lawful conduct in private.",
    "Control checks can false-positive on benign marketing copy and false-negative on unusual wording.",
    "Not equivalent to vulnerability scanning, SOC 2 audit, ISO 27001 certification, or PCI DSS assessment.",
    "Market power, intent, and binding legal analysis require qualified counsel.",
  ];

  const hot = items.filter(
    (i) =>
      i.status === "risk_signal" ||
      i.status === "gap" ||
      (i.launchCritical && i.status === "partial"),
  );

  const nextSteps = [
    ...hot.slice(0, 5).map(
      (i) => `[${i.pluginId}] ${i.title}: ${i.remediation[0] ?? "Remediate and re-scan."}`,
    ),
    "Fix every Gap and Risk signal on launch-critical plugins before go-live.",
    "Re-run the compliance scan after publishing missing Terms, Privacy, or Cancel pages.",
    "Use Business Scan (/check) for the owner practice checklist — separate from this automated scan.",
    "Have qualified counsel review elevated controls for your jurisdiction and facts.",
  ].slice(0, 8);

  return {
    url: input.url,
    audience: input.audience,
    jurisdiction: input.jurisdiction,
    assessedAt: new Date().toISOString(),
    overall,
    score,
    stats,
    packsApplied,
    controls: items,
    executiveSummary,
    methodology,
    limitations,
    nextSteps,
    scanStats: {
      pagesOk: input.scan.stats.pagesOk,
      charsScanned: input.scan.stats.charsScanned,
      crawlFindings: input.scan.findings.length,
    },
    coverageNotes: input.coverageNotes ?? [],
  };
}

export type ComplianceScanOptions = {
  /** Staging or preview URL (Business tier) — crawled with optional cookie */
  stagingUrl?: string;
  authCookie?: string;
  /** App Store / Play listing URLs for listing text scan */
  appStoreUrls?: string[];
  /** Extracted text from uploaded contracts/policies (document vault) */
  uploadTexts?: { name: string; text: string }[];
  /** Owner attestation notes when re-scanning after fixes */
  changeNotes?: string;
};

function appendCorpus(scan: SiteScanResult, extra: string): SiteScanResult {
  if (!extra.trim()) return scan;
  const merged = `${scan.aggregatedPublicText ?? ""}\n${extra}`.slice(0, 500_000);
  return {
    ...scan,
    aggregatedPublicText: merged,
    stats: {
      ...scan.stats,
      charsScanned: scan.stats.charsScanned + extra.length,
    },
  };
}

const CMS_POLICY_PATHS: Record<string, string[]> = {
  Shopify: ["/policies/privacy-policy", "/policies/terms-of-service", "/policies/refund-policy"],
  WordPress: ["/privacy-policy", "/terms", "/terms-of-service", "/refund-policy"],
  Webflow: ["/privacy", "/terms", "/legal"],
};

async function enrichScanCoverage(
  scan: SiteScanResult,
  options: ComplianceScanOptions,
  onStatus: (msg: string) => void,
): Promise<{ scan: SiteScanResult; notes: string[] }> {
  const notes: string[] = [];
  let enriched = scan;

  if (scan.stats.cmsPlatform) {
    const paths = CMS_POLICY_PATHS[scan.stats.cmsPlatform];
    if (paths) {
      onStatus(`Fetching ${scan.stats.cmsPlatform} policy paths…`);
      const { fetchSupplementalPage } = await import("@/lib/supplementalScan");
      const origin = new URL(scan.url).origin;
      for (const path of paths) {
        const page = await fetchSupplementalPage(
          new URL(path, origin).toString(),
          options.authCookie,
        );
        if (page?.text) {
          enriched = appendCorpus(
            enriched,
            `\n[${scan.stats.cmsPlatform} policy ${path}]\n${page.text}`,
          );
        }
      }
    }
  }

  onStatus("Checkout-path probe (signup → billing URLs)…");
  const { probeCheckoutPaths, fetchSupplementalPage, fetchAppListingText } =
    await import("@/lib/supplementalScan");
  const checkout = await probeCheckoutPaths(
    new URL(scan.url).origin,
    options.authCookie,
  );
  if (checkout.pagesChecked.length) {
    enriched = appendCorpus(
      enriched,
      `\n[checkout-path probe]\n${checkout.notes.join(" ")}`,
    );
  }

  if (options.stagingUrl?.trim()) {
    onStatus("Scanning staging / preview URL…");
    const staging = await fetchSupplementalPage(
      options.stagingUrl.trim(),
      options.authCookie,
    );
    if (staging?.text) {
      enriched = appendCorpus(
        enriched,
        `\n[staging ${options.stagingUrl}]\n${staging.text}`,
      );
      notes.push(`Staging URL included: ${options.stagingUrl.trim()}`);
    } else {
      notes.push(`Staging URL unreachable: ${options.stagingUrl.trim()}`);
    }
  }

  for (const storeUrl of options.appStoreUrls ?? []) {
    if (!storeUrl.trim()) continue;
    onStatus(`Fetching app listing: ${storeUrl}`);
    const listing = await fetchAppListingText(storeUrl.trim());
    if (listing) {
      enriched = appendCorpus(
        enriched,
        `\n[app listing ${storeUrl}]\n${listing}`,
      );
      notes.push(`App store listing scanned: ${storeUrl.trim()}`);
    } else {
      notes.push(`App listing unreachable: ${storeUrl.trim()}`);
    }
  }

  for (const doc of options.uploadTexts ?? []) {
    if (!doc.text.trim()) continue;
    enriched = appendCorpus(
      enriched,
      `\n[upload ${doc.name}]\n${doc.text}`,
    );
    notes.push(`Document vault: ${doc.name}`);
  }

  return { scan: enriched, notes };
}

export type ComplianceScanProgressEvent =
  | { type: "status"; message: string }
  | { type: "progress"; current: number; total: number; url: string }
  | { type: "plugin"; pluginId: string; title: string; status: ControlStatus }
  | {
      type: "done";
      result: {
        scan: SiteScanResult;
        assessment: ComplianceAssessment;
        storedScanId?: string;
        pluginDiffs?: import("@/lib/scanHistory").PluginDiff[];
        fixesLines?: string[];
        pageHashes?: Record<string, string>;
        rateRemaining?: number;
      };
    };

export async function runComplianceScan(
  rawUrl: string,
  audience: CheckAudience,
  jurisdiction: Jurisdiction,
  onProgress?: (e: ComplianceScanProgressEvent) => void,
  options: ComplianceScanOptions = {},
): Promise<{ scan: SiteScanResult; assessment: ComplianceAssessment }> {
  const { scanWebsite } = await import("@/lib/siteScan");

  const send = (e: ComplianceScanProgressEvent) => onProgress?.(e);

  send({ type: "status", message: "Phase 1 — reviewing public pages…" });

  const scan = await scanWebsite(rawUrl, (ev) => {
    if (ev.type === "status") {
      send({ type: "status", message: ev.message });
    } else if (ev.type === "progress") {
      send({
        type: "progress",
        current: ev.current,
        total: ev.total,
        url: ev.url,
      });
    } else if (ev.type === "finding") {
      send({
        type: "status",
        message: `Scan flag: ${ev.finding.title}`,
      });
    }
  });

  if (!scan.fetchedOk) {
    const assessment = runComplianceAssessment({
      url: rawUrl,
      audience,
      jurisdiction,
      scan,
      coverageNotes: [],
    });
    send({ type: "done", result: { scan, assessment } });
    return { scan, assessment };
  }

  send({
    type: "status",
    message: "Phase 1b — CMS policies, checkout paths, staging, uploads…",
  });

  const { scan: enrichedScan, notes: coverageNotes } = await enrichScanCoverage(
    scan,
    options,
    (msg) => send({ type: "status", message: msg }),
  );

  send({
    type: "status",
    message: "Phase 2 — running compliance controls…",
  });

  const controls = controlsForContext({ audience, jurisdiction });
  for (const c of controls) {
    const item = evaluateControl(c, enrichedScan);
    send({
      type: "plugin",
      pluginId: c.pluginId,
      title: c.title,
      status: item.status,
    });
  }

  const assessment = runComplianceAssessment({
    url: enrichedScan.url,
    audience,
    jurisdiction,
    scan: enrichedScan,
    coverageNotes,
  });

  send({ type: "done", result: { scan: enrichedScan, assessment } });
  return { scan: enrichedScan, assessment };
}
