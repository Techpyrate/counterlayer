import type { ComplianceAssessment } from "@/lib/complianceAssessment";
import type { PluginDiff } from "@/lib/scanHistory";

export type StoredComplianceScan = {
  id: string;
  userId: string;
  url: string;
  assessedAt: string;
  assessment: ComplianceAssessment;
  changeNotes?: string;
  pluginDiffs?: PluginDiff[];
  fixesLines?: string[];
  shareId?: string;
  sharePublic: boolean;
  pageHashes?: Record<string, string>;
  watchEnabled?: boolean;
};

export type ComplianceScanListItem = {
  id: string;
  url: string;
  assessedAt: string;
  overall: ComplianceAssessment["overall"];
  score: number;
  shareId?: string;
  watchEnabled?: boolean;
};
