import type { StoredComplianceScan } from "@/lib/complianceScanTypes";
import type { ComplianceAssessment } from "@/lib/complianceAssessment";
import type { PluginDiff } from "@/lib/scanHistory";
import { adminDb } from "@/lib/server/firebaseAdmin";
import fs from "fs";
import path from "path";
import { randomBytes } from "crypto";

export type { StoredComplianceScan } from "@/lib/complianceScanTypes";

const DATA_DIR = path.join(process.cwd(), ".data");
const SCANS_FILE = path.join(DATA_DIR, "compliance-scans.json");

function readFileStore(): Record<string, StoredComplianceScan> {
  try {
    if (!fs.existsSync(SCANS_FILE)) return {};
    return JSON.parse(fs.readFileSync(SCANS_FILE, "utf8")) as Record<
      string,
      StoredComplianceScan
    >;
  } catch {
    return {};
  }
}

function writeFileStore(data: Record<string, StoredComplianceScan>) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(SCANS_FILE, JSON.stringify(data, null, 2));
}

function newId() {
  return randomBytes(12).toString("hex");
}

function newShareId() {
  return randomBytes(9).toString("base64url");
}

export async function saveComplianceScan(input: {
  userId: string;
  assessment: ComplianceAssessment;
  changeNotes?: string;
  pluginDiffs?: PluginDiff[];
  fixesLines?: string[];
  pageHashes?: Record<string, string>;
}): Promise<StoredComplianceScan> {
  const record: StoredComplianceScan = {
    id: newId(),
    userId: input.userId,
    url: input.assessment.url,
    assessedAt: input.assessment.assessedAt,
    assessment: input.assessment,
    changeNotes: input.changeNotes,
    pluginDiffs: input.pluginDiffs,
    fixesLines: input.fixesLines,
    sharePublic: false,
    pageHashes: input.pageHashes,
    watchEnabled: false,
  };

  const db = adminDb();
  if (db) {
    await db.collection("complianceScans").doc(record.id).set(record);
    return record;
  }

  const all = readFileStore();
  all[record.id] = record;
  writeFileStore(all);
  return record;
}

export async function listComplianceScans(
  userId: string,
  limit = 20,
): Promise<StoredComplianceScan[]> {
  const db = adminDb();
  if (db) {
    const snap = await db
      .collection("complianceScans")
      .where("userId", "==", userId)
      .orderBy("assessedAt", "desc")
      .limit(limit)
      .get();
    return snap.docs.map((d) => d.data() as StoredComplianceScan);
  }

  return Object.values(readFileStore())
    .filter((s) => s.userId === userId)
    .sort((a, b) => b.assessedAt.localeCompare(a.assessedAt))
    .slice(0, limit);
}

export async function getLatestScanForUrl(
  userId: string,
  url: string,
): Promise<StoredComplianceScan | null> {
  const normalized = url.trim().toLowerCase();
  const list = await listComplianceScans(userId, 50);
  return list.find((s) => s.url.trim().toLowerCase() === normalized) ?? null;
}

export async function getComplianceScanById(
  id: string,
): Promise<StoredComplianceScan | null> {
  const db = adminDb();
  if (db) {
    const snap = await db.collection("complianceScans").doc(id).get();
    return snap.exists ? (snap.data() as StoredComplianceScan) : null;
  }
  return readFileStore()[id] ?? null;
}

export async function getComplianceScanByShareId(
  shareId: string,
): Promise<StoredComplianceScan | null> {
  const db = adminDb();
  if (db) {
    const snap = await db
      .collection("complianceScans")
      .where("shareId", "==", shareId)
      .where("sharePublic", "==", true)
      .limit(1)
      .get();
    return snap.docs[0]?.data() as StoredComplianceScan | undefined ?? null;
  }
  return (
    Object.values(readFileStore()).find(
      (s) => s.shareId === shareId && s.sharePublic,
    ) ?? null
  );
}

export async function enableShareLink(
  scanId: string,
  userId: string,
): Promise<{ shareId: string } | null> {
  const scan = await getComplianceScanById(scanId);
  if (!scan || scan.userId !== userId) return null;

  const shareId = scan.shareId ?? newShareId();
  const updated = { ...scan, shareId, sharePublic: true };

  const db = adminDb();
  if (db) {
    await db.collection("complianceScans").doc(scanId).set(updated, { merge: true });
  } else {
    const all = readFileStore();
    all[scanId] = updated;
    writeFileStore(all);
  }
  return { shareId };
}

export async function setPageWatch(
  scanId: string,
  userId: string,
  enabled: boolean,
  pageHashes: Record<string, string>,
): Promise<boolean> {
  const scan = await getComplianceScanById(scanId);
  if (!scan || scan.userId !== userId) return false;

  const updated = {
    ...scan,
    watchEnabled: enabled,
    pageHashes,
  };

  const db = adminDb();
  if (db) {
    await db.collection("complianceScans").doc(scanId).set(updated, { merge: true });
  } else {
    const all = readFileStore();
    all[scanId] = updated;
    writeFileStore(all);
  }
  return true;
}

export type ScanSnapshotMeta = {
  url: string;
  assessedAt: string;
  overall: ComplianceAssessment["overall"];
  score: number;
  changeNotes?: string;
  plugins: Record<string, string>;
};

export function scanToSnapshotMeta(scan: StoredComplianceScan): ScanSnapshotMeta {
  return {
    url: scan.url,
    assessedAt: scan.assessedAt,
    overall: scan.assessment.overall,
    score: scan.assessment.score,
    changeNotes: scan.changeNotes,
    plugins: Object.fromEntries(
      scan.assessment.controls.map((c) => [c.pluginId, c.status]),
    ),
  };
}
