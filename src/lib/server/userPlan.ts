import { adminDb } from "@/lib/server/firebaseAdmin";
import type { PlanStatus, PlanTier, BillingInterval } from "@/lib/plans";
import {
  PLAN_LIMITS,
  hasBusinessAccess,
  hasProAccess,
} from "@/lib/plans";
import fs from "fs";
import path from "path";

export type UserPlanRecord = {
  uid: string;
  email: string;
  plan: PlanTier;
  planStatus: PlanStatus;
  billingInterval?: BillingInterval;
  subscribedAt?: string;
  cancelledAt?: string;
  updatedAt: string;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const USERS_FILE = path.join(DATA_DIR, "user-plans.json");

type FileStore = {
  byUid: Record<string, UserPlanRecord>;
  byEmail: Record<string, UserPlanRecord>;
};

function readFileStore(): FileStore {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      return { byUid: {}, byEmail: {} };
    }
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf8")) as FileStore;
  } catch {
    return { byUid: {}, byEmail: {} };
  }
}

function writeFileStore(data: FileStore) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}

function normalizeRecord(
  uid: string,
  email: string,
  raw: Partial<UserPlanRecord> | undefined,
): UserPlanRecord {
  const plan = (raw?.plan ?? "free") as PlanTier;
  const planStatus = (raw?.planStatus ?? "active") as PlanStatus;
  const effectivePlan =
    planStatus === "cancelled" && plan !== "admin" ? "free" : plan;

  return {
    uid,
    email: email.toLowerCase(),
    plan: effectivePlan,
    planStatus: effectivePlan === "free" ? "cancelled" : planStatus,
    billingInterval: raw?.billingInterval,
    subscribedAt: raw?.subscribedAt,
    cancelledAt: raw?.cancelledAt,
    updatedAt: raw?.updatedAt ?? new Date().toISOString(),
  };
}

export async function getUserPlan(
  uid: string,
  email: string,
): Promise<UserPlanRecord> {
  const normalizedEmail = email.toLowerCase();
  const db = adminDb();

  if (db) {
    const snap = await db.collection("users").doc(uid).get();
    if (snap.exists) {
      return normalizeRecord(uid, normalizedEmail, {
        ...(snap.data() as Partial<UserPlanRecord>),
        uid,
        email: normalizedEmail,
      });
    }

    const emailSnap = await db
      .collection("users")
      .where("email", "==", normalizedEmail)
      .limit(1)
      .get();
    if (!emailSnap.empty) {
      const data = emailSnap.docs[0]!.data() as Partial<UserPlanRecord>;
      const merged = normalizeRecord(uid, normalizedEmail, {
        ...data,
        uid,
        email: normalizedEmail,
      });
      await db.collection("users").doc(uid).set(merged, { merge: true });
      return merged;
    }
  }

  const file = readFileStore();
  const byUid = file.byUid[uid];
  if (byUid) return normalizeRecord(uid, normalizedEmail, byUid);

  const byEmail = file.byEmail[normalizedEmail];
  if (byEmail) {
    const merged = normalizeRecord(uid, normalizedEmail, { ...byEmail, uid });
    if (byEmail.uid !== uid) {
      await saveUserPlan(merged);
    }
    return merged;
  }

  return normalizeRecord(uid, normalizedEmail, undefined);
}

export async function saveUserPlan(record: UserPlanRecord): Promise<void> {
  const db = adminDb();
  const payload = {
    ...record,
    email: record.email.toLowerCase(),
    updatedAt: new Date().toISOString(),
  };

  if (db) {
    await db.collection("users").doc(record.uid).set(payload, { merge: true });
  }

  const file = readFileStore();
  file.byUid[record.uid] = payload;
  file.byEmail[payload.email] = payload;
  writeFileStore(file);
}

export async function subscribeUserPlan(
  uid: string,
  email: string,
  tier: "pro" | "business",
  billingInterval: BillingInterval = "monthly",
): Promise<UserPlanRecord> {
  const current = await getUserPlan(uid, email);
  if (current.plan === "admin") {
    return current;
  }

  const next: UserPlanRecord = {
    uid,
    email: email.toLowerCase(),
    plan: tier,
    planStatus: "active",
    billingInterval,
    subscribedAt: new Date().toISOString(),
    cancelledAt: undefined,
    updatedAt: new Date().toISOString(),
  };
  await saveUserPlan(next);
  return next;
}

export async function cancelUserPlan(
  uid: string,
  email: string,
): Promise<UserPlanRecord> {
  const current = await getUserPlan(uid, email);
  if (current.plan === "admin") {
    return current;
  }

  const next: UserPlanRecord = {
    uid,
    email: email.toLowerCase(),
    plan: "free",
    planStatus: "cancelled",
    subscribedAt: current.subscribedAt,
    cancelledAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await saveUserPlan(next);
  return next;
}

export async function setAdminPlan(
  uid: string,
  email: string,
): Promise<UserPlanRecord> {
  const next: UserPlanRecord = {
    uid,
    email: email.toLowerCase(),
    plan: "admin",
    planStatus: "active",
    updatedAt: new Date().toISOString(),
  };
  await saveUserPlan(next);
  return next;
}

export function scanLimitForPlan(plan: PlanTier): number {
  return PLAN_LIMITS[plan];
}

export function planAccessFlags(plan: PlanTier) {
  return {
    plan,
    isPro: hasProAccess(plan),
    isBusiness: hasBusinessAccess(plan),
    isAdmin: plan === "admin",
  };
}
