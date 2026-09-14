export type PlanTier = "free" | "pro" | "business" | "admin";

export type PlanStatus = "active" | "cancelled";

export type BillingInterval = "monthly" | "yearly";

export const PLAN_PRICES = {
  pro: 20,
  business: 100,
} as const;

/** Billed annually — 2 months free vs monthly. */
export const PLAN_PRICES_YEARLY = {
  pro: PLAN_PRICES.pro * 10,
  business: PLAN_PRICES.business * 10,
} as const;

export const PLAN_LIMITS = {
  free: 0,
  pro: 20,
  business: 100,
  admin: 9999,
} as const;

export function planDisplayPrice(
  tier: "pro" | "business",
  interval: BillingInterval,
): number {
  return interval === "yearly"
    ? PLAN_PRICES_YEARLY[tier]
    : PLAN_PRICES[tier];
}

export function yearlySavings(tier: "pro" | "business"): number {
  return PLAN_PRICES[tier] * 12 - PLAN_PRICES_YEARLY[tier];
}

export function formatPlanPrice(
  tier: "pro" | "business",
  interval: BillingInterval,
): { amount: number; suffix: string; sub?: string } {
  if (interval === "yearly") {
    const amount = PLAN_PRICES_YEARLY[tier];
    const perMonth = Math.round(amount / 12);
    return {
      amount,
      suffix: "/yr",
      sub: `$${perMonth}/mo · save $${yearlySavings(tier)}/yr`,
    };
  }
  return {
    amount: PLAN_PRICES[tier],
    suffix: "/mo",
    sub: `$${PLAN_PRICES_YEARLY[tier]}/yr billed annually`,
  };
}

export function hasProAccess(plan: PlanTier): boolean {
  return plan === "pro" || plan === "business" || plan === "admin";
}

export function hasBusinessAccess(plan: PlanTier): boolean {
  return plan === "business" || plan === "admin";
}

export function planLabel(plan: PlanTier): string {
  if (plan === "admin") return "Admin";
  if (plan === "business") return "Business";
  if (plan === "pro") return "Pro";
  return "Free";
}

export function planPrice(plan: PlanTier): number | null {
  if (plan === "pro") return PLAN_PRICES.pro;
  if (plan === "business") return PLAN_PRICES.business;
  return null;
}
