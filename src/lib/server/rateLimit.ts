import { adminDb } from "@/lib/server/firebaseAdmin";
import type { PlanTier } from "@/lib/plans";
import { PLAN_LIMITS } from "@/lib/plans";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
const RATE_FILE = path.join(DATA_DIR, "scan-rate-limits.json");

type RateEntry = { count: number; day: string };

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function readFileRates(): Record<string, RateEntry> {
  try {
    if (!fs.existsSync(RATE_FILE)) return {};
    return JSON.parse(fs.readFileSync(RATE_FILE, "utf8")) as Record<
      string,
      RateEntry
    >;
  } catch {
    return {};
  }
}

function writeFileRates(data: Record<string, RateEntry>) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(RATE_FILE, JSON.stringify(data, null, 2));
}

export async function checkAndIncrementScanRate(
  userId: string,
  plan: PlanTier = "pro",
): Promise<{ allowed: boolean; remaining: number; limit: number }> {
  const limit = PLAN_LIMITS[plan];
  const day = todayKey();
  const db = adminDb();

  if (db) {
    const ref = db.collection("scanRateLimits").doc(`${userId}_${day}`);
    const result = await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const count = (snap.data()?.count as number | undefined) ?? 0;
      if (count >= limit) {
        return { allowed: false, count };
      }
      tx.set(ref, { count: count + 1, day, userId }, { merge: true });
      return { allowed: true, count: count + 1 };
    });
    return {
      allowed: result.allowed,
      remaining: Math.max(0, limit - result.count),
      limit,
    };
  }

  const all = readFileRates();
  const key = `${userId}:${day}`;
  const entry = all[key] ?? { count: 0, day };
  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, limit };
  }
  entry.count += 1;
  all[key] = entry;
  writeFileRates(all);
  return {
    allowed: true,
    remaining: limit - entry.count,
    limit,
  };
}
