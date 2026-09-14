import type { ComplianceAssessment } from "@/lib/complianceAssessment";
import type { CheckAudience } from "@/data/complianceCheck";
import { getAudienceDisplayLabel } from "@/data/complianceCheck";
import type { Jurisdiction } from "@/data/types";
import type { SiteScanResult } from "@/lib/siteScan";
import type { DiligenceExportKind } from "@/lib/diligenceExport";

const KEY = "counterweight:account-activity";
const MAX_PER_USER = 100;

export type ActivityKind =
  | "business_scan"
  | "compliance_scan"
  | "report_export";

export type AccountActivity = {
  id: string;
  userId: string;
  kind: ActivityKind;
  createdAt: string;
  url: string;
  title: string;
  summary: string;
  meta: {
    overall?: ComplianceAssessment["overall"];
    score?: number;
    pagesOk?: number;
    pluginsRun?: number;
    openIssues?: number;
    elevated?: number;
    watch?: number;
    audience?: string;
    jurisdiction?: string;
    exportKind?: string;
    isRescan?: boolean;
    changeNotes?: string;
    scanId?: string;
  };
};

function readAll(): Record<string, AccountActivity[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record<string, AccountActivity[]>) : {};
  } catch {
    return {};
  }
}

function writeAll(data: Record<string, AccountActivity[]>) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function saveAccountActivity(
  userId: string,
  activity: Omit<AccountActivity, "id" | "userId" | "createdAt"> & {
    id?: string;
    createdAt?: string;
  },
): AccountActivity {
  const record: AccountActivity = {
    id: activity.id ?? `act-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    userId,
    createdAt: activity.createdAt ?? new Date().toISOString(),
    kind: activity.kind,
    url: activity.url,
    title: activity.title,
    summary: activity.summary,
    meta: activity.meta,
  };

  const all = readAll();
  const list = all[userId] ?? [];
  all[userId] = [record, ...list].slice(0, MAX_PER_USER);
  writeAll(all);
  return record;
}

export function listAccountActivity(
  userId: string,
  kind?: ActivityKind | "all",
): AccountActivity[] {
  const list = readAll()[userId] ?? [];
  if (!kind || kind === "all") return list;
  return list.filter((a) => a.kind === kind);
}

export function getAccountStats(userId: string) {
  const list = readAll()[userId] ?? [];
  return {
    total: list.length,
    businessScans: list.filter((a) => a.kind === "business_scan").length,
    complianceScans: list.filter((a) => a.kind === "compliance_scan").length,
    reports: list.filter((a) => a.kind === "report_export").length,
    lastActivity: list[0]?.createdAt ?? null,
  };
}

export function recordBusinessScan(
  userId: string,
  input: {
    url: string;
    audience: CheckAudience;
    jurisdiction: Jurisdiction;
    scan: SiteScanResult | null;
    hasQuestionnaire?: boolean;
  },
) {
  const host = safeHost(input.url);
  const elevated = input.scan?.stats.elevated ?? 0;
  const watch = input.scan?.stats.watch ?? 0;
  return saveAccountActivity(userId, {
    kind: "business_scan",
    url: input.url,
    title: `Business Scan · ${host}`,
    summary: `${getAudienceDisplayLabel(input.audience)} · ${input.jurisdiction} · ${input.scan?.stats.pagesOk ?? 0} pages · ${elevated + watch} flags`,
    meta: {
      pagesOk: input.scan?.stats.pagesOk,
      elevated,
      watch,
      audience: getAudienceDisplayLabel(input.audience),
      jurisdiction: input.jurisdiction,
      openIssues: elevated + watch,
    },
  });
}

export function recordComplianceScan(
  userId: string,
  input: {
    assessment: ComplianceAssessment;
    isRescan?: boolean;
    changeNotes?: string;
    storedScanId?: string;
  },
) {
  const { assessment } = input;
  const host = safeHost(assessment.url);
  return saveAccountActivity(userId, {
    kind: "compliance_scan",
    url: assessment.url,
    title: `Compliance Scan · ${host}`,
    summary: `${assessment.overall.toUpperCase()} · score ${assessment.score} · ${assessment.stats.pluginsRun} plugins · ${assessment.stats.gap + assessment.stats.risk_signal} open`,
    meta: {
      overall: assessment.overall,
      score: assessment.score,
      pagesOk: assessment.scanStats.pagesOk,
      pluginsRun: assessment.stats.pluginsRun,
      openIssues: assessment.stats.gap + assessment.stats.risk_signal,
      audience: getAudienceDisplayLabel(assessment.audience),
      jurisdiction: assessment.jurisdiction,
      isRescan: input.isRescan,
      changeNotes: input.changeNotes,
      scanId: input.storedScanId,
    },
  });
}

export function recordReportExport(
  userId: string,
  input: {
    url: string;
    exportKind:
      | DiligenceExportKind
      | "business_scan_pdf"
      | "business_full_pdf"
      | "compliance_pdf"
      | "compliance_markdown"
      | "compliance_share";
    title?: string;
  },
) {
  const labels: Record<string, string> = {
    investor: "Investor / acquirer pack",
    app_store: "App store / marketplace pack",
    partner: "Partner onboarding pack",
    business_scan_pdf: "Business Scan (site review only)",
    business_full_pdf: "Business Scan (full report)",
    compliance_pdf: "Compliance scan PDF",
    compliance_markdown: "Compliance scan Markdown",
    compliance_share: "Compliance scan shared",
  };
  const label = labels[input.exportKind] ?? input.exportKind;
  const host = safeHost(input.url);
  return saveAccountActivity(userId, {
    kind: "report_export",
    url: input.url,
    title: input.title ?? `Report · ${label}`,
    summary: `${label} · ${host}`,
    meta: { exportKind: input.exportKind },
  });
}

function safeHost(url: string) {
  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
  } catch {
    return url || "unknown site";
  }
}

export function exportKindLabel(kind?: string) {
  const labels: Record<string, string> = {
    investor: "Investor pack",
    app_store: "App store pack",
    partner: "Partner pack",
    business_scan_pdf: "Business site review PDF",
    business_full_pdf: "Full business PDF",
    compliance_pdf: "Compliance PDF",
    compliance_markdown: "Compliance Markdown",
    compliance_share: "Compliance share",
  };
  return kind ? labels[kind] ?? kind : "Report";
}

export function overallColor(overall?: string) {
  if (overall === "elevated") return "#b42318";
  if (overall === "watch") return "#9a6b12";
  if (overall === "low") return "#1a7a45";
  return "#5c6b66";
}
