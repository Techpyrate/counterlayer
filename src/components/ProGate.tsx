"use client";

import { type ReactNode, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import type { PlanTier } from "@/lib/plans";
import { PageWrap } from "@/components/PageWrap";

export type PlanInfo = {
  plan: PlanTier;
  isPro: boolean;
  isBusiness: boolean;
  isAdmin: boolean;
  planStatus?: string;
  canCancel?: boolean;
  price?: number | null;
  billingInterval?: "monthly" | "yearly";
};

export function usePlan() {
  const { user, getAccessToken } = useAuth();
  const [info, setInfo] = useState<PlanInfo>({
    plan: "free",
    isPro: false,
    isBusiness: false,
    isAdmin: false,
    canCancel: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user) {
      setInfo({
        plan: "free",
        isPro: false,
        isBusiness: false,
        isAdmin: false,
        canCancel: false,
      });
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessToken();
      const res = await fetch("/api/me/plan", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = (await res.json()) as PlanInfo & { error?: string };
      setInfo({
        plan: data.plan ?? "free",
        isPro: Boolean(data.isPro),
        isBusiness: Boolean(data.isBusiness),
        isAdmin: Boolean(data.isAdmin),
        planStatus: data.planStatus,
        canCancel: Boolean(data.canCancel),
        price: data.price,
        billingInterval: data.billingInterval ?? "monthly",
      });
      if (!data.isPro && data.error) setError(data.error);
    } catch {
      setInfo({
        plan: "free",
        isPro: false,
        isBusiness: false,
        isAdmin: false,
        canCancel: false,
      });
      setError("Could not verify plan.");
    } finally {
      setLoading(false);
    }
  }, [user, getAccessToken]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { ...info, loading, error, refresh };
}

export function useProPlan() {
  const { isPro, loading, error, refresh } = usePlan();
  return { isPro, loading, error, refresh };
}

export function ProGate({
  children,
  feature = "Compliance Scan",
}: {
  children: ReactNode;
  feature?: string;
}) {
  const { user, loading: authLoading } = useAuth();
  const { isPro, loading: planLoading } = usePlan();

  if (authLoading || planLoading) {
    return (
      <PageWrap className="py-16 text-center text-sm text-mute">
        Checking access…
      </PageWrap>
    );
  }

  if (!user) {
    return (
      <PageWrap className="py-10">
      <div className="mx-auto max-w-xl rounded-2xl border border-[var(--line)] bg-[#f7faf8] p-6 text-center sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-signal-dim">
          Pro feature
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
          Sign in to use {feature}
        </h2>
        <p className="mt-3 text-sm text-ink-soft">
          {feature} includes cloud scan history, shareable diligence reports,
          attested re-scans, and counsel-ready exports.
        </p>
        <Link
          href="/?auth=login"
          className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-fog"
        >
          Sign in
        </Link>
        <p className="mt-4 text-xs text-mute">
          No account?{" "}
          <Link href="/?auth=signup" className="underline">
            Create one
          </Link>{" "}
          then{" "}
          <Link href="/pricing" className="underline">
            choose a plan
          </Link>
          .
        </p>
      </div>
      </PageWrap>
    );
  }

  if (!isPro) {
    return (
      <PageWrap className="py-10">
      <div className="mx-auto max-w-xl rounded-2xl border border-signal/30 bg-signal/5 p-6 text-center sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-signal-dim">
          Pro required
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
          Upgrade to run {feature}
        </h2>
        <p className="mt-3 text-sm text-ink-soft">
          Pro is $20/mo for startups and individuals. Business is $100/mo for
          teams that need bulk seller checks and white-label exports.
        </p>
        <Link
          href="/pricing"
          className="mt-6 inline-block rounded-full bg-signal px-6 py-3 text-sm font-semibold text-ink"
        >
          View pricing
        </Link>
        <p className="mt-4 text-xs text-mute">
          Business Scan on{" "}
          <Link href="/check" className="underline">
            /check
          </Link>{" "}
          remains free.
        </p>
      </div>
      </PageWrap>
    );
  }

  return <>{children}</>;
}

export function BusinessGate({
  children,
  feature = "Seller bulk check",
}: {
  children: ReactNode;
  feature?: string;
}) {
  const { user, loading: authLoading } = useAuth();
  const { isBusiness, isAdmin, loading: planLoading } = usePlan();

  if (authLoading || planLoading) {
    return (
      <PageWrap className="py-16 text-center text-sm text-mute">
        Checking access…
      </PageWrap>
    );
  }

  if (!user) {
    return (
      <PageWrap className="py-10">
      <div className="mx-auto max-w-xl rounded-2xl border border-[var(--line)] bg-white p-6 text-center sm:p-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
          Sign in for {feature}
        </h2>
        <Link
          href="/?auth=login"
          className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-fog"
        >
          Sign in
        </Link>
      </div>
      </PageWrap>
    );
  }

  if (!isBusiness && !isAdmin) {
    return (
      <PageWrap className="py-10">
      <div className="mx-auto max-w-xl rounded-2xl border border-[var(--line)] bg-white p-6 text-center sm:p-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
          Business plan required
        </h2>
        <p className="mt-3 text-sm text-ink-soft">
          {feature} is included with Business ($100/mo). Pro ($20/mo) includes
          Compliance Scan and all diligence exports.
        </p>
        <Link
          href="/pricing"
          className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-fog"
        >
          Upgrade to Business
        </Link>
      </div>
      </PageWrap>
    );
  }

  return <>{children}</>;
}
