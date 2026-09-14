import type { ComplianceAssessment } from "@/lib/complianceAssessment";
import type { ControlStatus } from "@/data/complianceControls";

const KEY = "counterweight:compliance-scan-history";

export type ScanSnapshot = {
  url: string;
  assessedAt: string;
  overall: ComplianceAssessment["overall"];
  score: number;
  changeNotes?: string;
  plugins: Record<string, ControlStatus>;
};

export type PluginDiff = {
  pluginId: string;
  title: string;
  before: ControlStatus;
  after: ControlStatus;
  improved: boolean;
};

export function saveScanSnapshot(
  assessment: ComplianceAssessment,
  changeNotes?: string,
): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(KEY);
    const all = raw ? (JSON.parse(raw) as Record<string, ScanSnapshot[]>) : {};
    const key = assessment.url.toLowerCase();
    const snap: ScanSnapshot = {
      url: assessment.url,
      assessedAt: assessment.assessedAt,
      overall: assessment.overall,
      score: assessment.score,
      changeNotes,
      plugins: Object.fromEntries(
        assessment.controls.map((c) => [c.pluginId, c.status]),
      ),
    };
    const prev = all[key] ?? [];
    all[key] = [snap, ...prev].slice(0, 5);
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    /* ignore quota */
  }
}

export function getPreviousSnapshot(url: string): ScanSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const all = JSON.parse(raw) as Record<string, ScanSnapshot[]>;
    const list = all[url.toLowerCase()];
    return list?.[0] ?? null;
  } catch {
    return null;
  }
}

const rank: Record<ControlStatus, number> = {
  risk_signal: 0,
  gap: 1,
  partial: 2,
  not_assessed: 3,
  pass: 4,
};

export function diffPluginResults(
  before: ScanSnapshot,
  after: ComplianceAssessment,
): PluginDiff[] {
  const diffs: PluginDiff[] = [];
  for (const c of after.controls) {
    const prev = before.plugins[c.pluginId];
    if (!prev || prev === c.status) continue;
    diffs.push({
      pluginId: c.pluginId,
      title: c.title,
      before: prev,
      after: c.status,
      improved: rank[c.status] > rank[prev],
    });
  }
  return diffs.sort((a, b) => {
    if (a.improved !== b.improved) return a.improved ? -1 : 1;
    return rank[a.after] - rank[b.after];
  });
}

export function fixesSummary(
  before: ScanSnapshot,
  after: ComplianceAssessment,
): string[] {
  const diffs = diffPluginResults(before, after);
  const improved = diffs.filter((d) => d.improved);
  const regressed = diffs.filter((d) => !d.improved);
  const lines: string[] = [];
  if (before.changeNotes) {
    lines.push(`Owner attestation: ${before.changeNotes}`);
  }
  for (const d of improved) {
    lines.push(
      `Fixed: ${d.pluginId} ${d.title} (${d.before} → ${d.after})`,
    );
  }
  for (const d of regressed) {
    lines.push(
      `Regressed: ${d.pluginId} ${d.title} (${d.before} → ${d.after})`,
    );
  }
  if (improved.length === 0 && regressed.length === 0) {
    lines.push("No plugin status changes vs prior scan.");
  }
  return lines;
}
