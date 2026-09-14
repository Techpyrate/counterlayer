import type { ComplianceAssessment } from "@/lib/complianceAssessment";
import type { PluginDiff } from "@/lib/scanHistory";

const KEY = "counterlayer:local-scans";

export type LocalStoredScan = {
  id: string;
  userId: string;
  url: string;
  assessedAt: string;
  assessment: ComplianceAssessment;
  pluginDiffs?: PluginDiff[];
  fixesLines?: string[];
  changeNotes?: string;
};

function readAll(): Record<string, LocalStoredScan[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record<string, LocalStoredScan[]>) : {};
  } catch {
    return {};
  }
}

function writeAll(data: Record<string, LocalStoredScan[]>) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function saveLocalComplianceScan(
  userId: string,
  input: {
    id?: string;
    assessment: ComplianceAssessment;
    pluginDiffs?: PluginDiff[];
    fixesLines?: string[];
    changeNotes?: string;
  },
): LocalStoredScan {
  const record: LocalStoredScan = {
    id:
      input.id ??
      `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    userId,
    url: input.assessment.url,
    assessedAt: input.assessment.assessedAt,
    assessment: input.assessment,
    pluginDiffs: input.pluginDiffs,
    fixesLines: input.fixesLines,
    changeNotes: input.changeNotes,
  };

  const all = readAll();
  const list = all[userId] ?? [];
  const withoutDup = list.filter((s) => s.id !== record.id);
  all[userId] = [record, ...withoutDup].slice(0, 50);
  writeAll(all);
  return record;
}

export function listLocalComplianceScans(userId: string): LocalStoredScan[] {
  return readAll()[userId] ?? [];
}

export function getLocalComplianceScan(
  userId: string,
  id: string,
): LocalStoredScan | null {
  return (readAll()[userId] ?? []).find((s) => s.id === id) ?? null;
}

export function toScanListItem(scan: LocalStoredScan) {
  return {
    id: scan.id,
    url: scan.url,
    assessedAt: scan.assessedAt,
    overall: scan.assessment.overall,
    score: scan.assessment.score,
  };
}
