import { adminAuth } from "@/lib/server/firebaseAdmin";
import { isAdminEmail } from "@/lib/adminAccess";
import type { PlanTier } from "@/lib/plans";
import { hasBusinessAccess, hasProAccess } from "@/lib/plans";
import {
  getUserPlan,
  planAccessFlags,
  type UserPlanRecord,
} from "@/lib/server/userPlan";

export type AuthContext = {
  uid: string;
  email: string;
  plan: PlanTier;
  isPro: boolean;
  isBusiness: boolean;
  isAdmin: boolean;
};

export function devProUnlock(): boolean {
  return process.env.COMPLIANCE_SCAN_DEV_UNLOCK === "true";
}

export async function verifyAuthFromRequest(
  req: Request,
): Promise<
  | { ok: true; auth: AuthContext }
  | { ok: false; status: number; error: string }
> {
  if (devProUnlock()) {
    return {
      ok: true,
      auth: {
        uid: "dev",
        email: "dev@local",
        plan: "admin",
        isPro: true,
        isBusiness: true,
        isAdmin: true,
      },
    };
  }

  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return { ok: false, status: 401, error: "Sign in required." };
  }

  const auth = adminAuth();
  if (!auth) {
    return {
      ok: false,
      status: 503,
      error:
        "Server auth is not configured. Set Firebase Admin credentials or COMPLIANCE_SCAN_DEV_UNLOCK=true for local dev.",
    };
  }

  let uid: string;
  let email: string;
  try {
    const decoded = await auth.verifyIdToken(token);
    uid = decoded.uid;
    email = (decoded.email ?? "").toLowerCase();
  } catch {
    return { ok: false, status: 401, error: "Invalid or expired session." };
  }

  const record = await getUserPlan(uid, email);
  return { ok: true, auth: authContextFromRecord(record) };
}

function authContextFromRecord(record: UserPlanRecord): AuthContext {
  const plan = isAdminEmail(record.email) ? "admin" : record.plan;
  const flags = planAccessFlags(plan);
  return {
    uid: record.uid,
    email: record.email,
    ...flags,
  };
}

export async function verifyProFromRequest(
  req: Request,
): Promise<
  | { ok: true; auth: AuthContext }
  | { ok: false; status: number; error: string }
> {
  const result = await verifyAuthFromRequest(req);
  if (!result.ok) {
    if (result.status === 401) {
      return {
        ok: false,
        status: 401,
        error: "Sign in with a Pro account to run compliance scans.",
      };
    }
    return result;
  }

  if (!hasProAccess(result.auth.plan)) {
    return {
      ok: false,
      status: 403,
      error: "Compliance Scan is a Pro feature. Upgrade to run scans and save reports.",
    };
  }

  return result;
}

export async function verifyBusinessFromRequest(
  req: Request,
): Promise<
  | { ok: true; auth: AuthContext }
  | { ok: false; status: number; error: string }
> {
  const result = await verifyAuthFromRequest(req);
  if (!result.ok) return result;

  if (!hasBusinessAccess(result.auth.plan)) {
    return {
      ok: false,
      status: 403,
      error: "This feature requires a Business plan.",
    };
  }

  return result;
}
