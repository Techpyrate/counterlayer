import { verifyAuthFromRequest } from "@/lib/server/proAuth";
import {
  cancelUserPlan,
  getUserPlan,
  subscribeUserPlan,
} from "@/lib/server/userPlan";
import {
  PLAN_PRICES,
  PLAN_PRICES_YEARLY,
  planDisplayPrice,
  planLabel,
} from "@/lib/plans";
import type { BillingInterval } from "@/lib/plans";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const authResult = await verifyAuthFromRequest(req);
  if (!authResult.ok) {
    return Response.json(
      {
        plan: "free",
        isPro: false,
        isBusiness: false,
        isAdmin: false,
        error: authResult.error,
      },
      { status: 200 },
    );
  }

  const record = await getUserPlan(authResult.auth.uid, authResult.auth.email);

  return Response.json({
    plan: record.plan,
    planStatus: record.planStatus,
    isPro: authResult.auth.isPro,
    isBusiness: authResult.auth.isBusiness,
    isAdmin: authResult.auth.isAdmin,
    planLabel: planLabel(record.plan),
    billingInterval: record.billingInterval ?? "monthly",
    price:
      record.plan === "pro" || record.plan === "business"
        ? planDisplayPrice(
            record.plan,
            record.billingInterval ?? "monthly",
          )
        : null,
    prices: {
      monthly: PLAN_PRICES,
      yearly: PLAN_PRICES_YEARLY,
    },
    subscribedAt: record.subscribedAt ?? null,
    cancelledAt: record.cancelledAt ?? null,
    canCancel:
      record.plan === "pro" || record.plan === "business",
    canSubscribe: record.plan === "free",
  });
}

export async function POST(req: Request) {
  const authResult = await verifyAuthFromRequest(req);
  if (!authResult.ok) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  const body = (await req.json()) as {
    action?: "subscribe" | "cancel";
    tier?: "pro" | "business";
    interval?: BillingInterval;
  };

  if (body.action === "cancel") {
    const record = await cancelUserPlan(
      authResult.auth.uid,
      authResult.auth.email,
    );
    return Response.json({
      ok: true,
      plan: record.plan,
      planStatus: record.planStatus,
      message: "Your plan has been cancelled. You will not be charged again.",
    });
  }

  if (body.action === "subscribe") {
    if (authResult.auth.isAdmin) {
      return Response.json({
        ok: true,
        plan: "admin",
        message: "Admin accounts have full access.",
      });
    }

    const tier = body.tier;
    if (tier !== "pro" && tier !== "business") {
      return Response.json(
        { error: "Choose Pro or Business." },
        { status: 400 },
      );
    }

    const interval =
      body.interval === "yearly" ? "yearly" : "monthly";

    const record = await subscribeUserPlan(
      authResult.auth.uid,
      authResult.auth.email,
      tier,
      interval,
    );
    return Response.json({
      ok: true,
      plan: record.plan,
      planStatus: record.planStatus,
      billingInterval: record.billingInterval,
      price: planDisplayPrice(tier, interval),
      message: `${planLabel(tier)} plan activated (${interval}).`,
    });
  }

  return Response.json({ error: "Unknown action." }, { status: 400 });
}
