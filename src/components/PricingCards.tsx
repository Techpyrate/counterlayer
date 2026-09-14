"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { usePlan } from "@/components/ProGate";
import {
  formatPlanPrice,
  planLabel,
  type BillingInterval,
} from "@/lib/plans";
import type { PlanTier } from "@/lib/plans";

const proFeatures = [
  "Full Compliance Scan — automated control checks on public Terms, Privacy, cancel, and policy paths",
  "Cloud scan history with control diffs after attested re-scans",
  "Shareable diligence report links for investors, app stores, and partners",
  "Investor / app-store / partner PDF packs + counsel attestation + control matrix CSV",
  "Deeper coverage: staging URL, auth cookie, document vault, checkout-path probe",
  "Policy-page change detection",
  "20 scans per day included",
];

const businessFeatures = [
  "Everything in Pro",
  "Seller onboarding bulk URL check (up to 25 URLs per run)",
  "White-label diligence exports with your firm name",
  "100 scans per day included",
  "Priority support",
];

export function PricingCards() {
  const { user, getAccessToken } = useAuth();
  const { plan, isPro, isBusiness, isAdmin, refresh, loading } = usePlan();
  const router = useRouter();
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const [busy, setBusy] = useState<"pro" | "business" | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const proPrice = formatPlanPrice("pro", interval);
  const businessPrice = formatPlanPrice("business", interval);

  async function subscribe(tier: "pro" | "business") {
    if (!user) {
      router.push("/?auth=signup");
      return;
    }
    setBusy(tier);
    setMsg(null);
    setErr(null);
    try {
      const token = await getAccessToken();
      const res = await fetch("/api/me/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ action: "subscribe", tier, interval }),
      });
      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        setErr(data.error ?? "Could not activate plan.");
        return;
      }
      setMsg(data.message ?? "Plan activated.");
      await refresh();
    } catch {
      setErr("Could not activate plan.");
    } finally {
      setBusy(null);
    }
  }

  function tierButton(tier: "pro" | "business", label: string) {
    if (loading) {
      return (
        <span className="mt-8 inline-block rounded-full bg-fog px-6 py-3 text-sm font-semibold text-mute">
          Loading…
        </span>
      );
    }
    if (isAdmin) {
      return (
        <span className="mt-8 inline-block rounded-full bg-fog px-6 py-3 text-sm font-semibold text-ink">
          Included with admin access
        </span>
      );
    }
    if (plan === tier) {
      return (
        <Link
          href="/profile"
          className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-fog"
        >
          Current plan · Manage
        </Link>
      );
    }
    if (tier === "pro" && isBusiness) {
      return (
        <span className="mt-8 inline-block rounded-full bg-fog px-6 py-3 text-sm font-semibold text-mute">
          Included in Business
        </span>
      );
    }
    return (
      <button
        type="button"
        disabled={busy !== null}
        onClick={() => void subscribe(tier)}
        className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-fog disabled:opacity-50"
      >
        {busy === tier ? "Activating…" : label}
      </button>
    );
  }

  return (
    <>
      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <div
          className="inline-flex rounded-full border border-[var(--line)] bg-white p-1"
          role="group"
          aria-label="Billing interval"
        >
          <button
            type="button"
            onClick={() => setInterval("monthly")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              interval === "monthly"
                ? "bg-ink text-fog"
                : "text-mute hover:text-ink"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setInterval("yearly")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              interval === "yearly"
                ? "bg-ink text-fog"
                : "text-mute hover:text-ink"
            }`}
          >
            Yearly
          </button>
        </div>
        {interval === "yearly" && (
          <span className="rounded-full bg-signal/20 px-3 py-1 text-xs font-semibold text-signal-dim">
            2 months free on annual billing
          </span>
        )}
      </div>

      {(msg || err) && (
        <p
          className={`mt-6 text-sm ${err ? "text-danger" : "text-signal-dim"}`}
        >
          {err ?? msg}
        </p>
      )}

      {!loading && user && plan !== "free" && (
        <p className="mt-6 text-sm text-ink-soft">
          Signed in as {user.email} · Current plan:{" "}
          <strong>{planLabel(plan as PlanTier)}</strong>
          {!isAdmin && (
            <>
              {" "}
              ·{" "}
              <Link href="/profile" className="underline">
                Cancel anytime in profile
              </Link>
            </>
          )}
        </p>
      )}

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-[var(--line)] bg-white p-8">
          <p className="text-sm font-semibold text-mute">Free</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold text-ink">
            $0
          </p>
          <p className="mt-1 text-sm text-mute">Forever</p>
          <ul className="mt-6 space-y-2 text-sm text-ink-soft">
            <li>· Consumer hub, rights, case library</li>
            <li>· Business Scan owner checklist + site review</li>
            <li>· Case research &amp; library</li>
          </ul>
          <Link
            href="/check"
            className="mt-8 inline-block rounded-full border border-[var(--line)] px-6 py-3 text-sm font-semibold text-ink hover:bg-fog"
          >
            Start free
          </Link>
        </div>

        <div className="rounded-2xl border-2 border-signal/50 bg-signal/5 p-8">
          <p className="text-sm font-semibold text-signal-dim">Pro</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold text-ink">
            ${proPrice.amount}
            <span className="text-lg font-semibold text-mute">{proPrice.suffix}</span>
          </p>
          <p className="mt-1 text-sm text-mute">
            For startups &amp; individuals
            {proPrice.sub && (
              <>
                <br />
                {proPrice.sub}
              </>
            )}
          </p>
          <ul className="mt-6 space-y-2 text-sm text-ink-soft">
            {proFeatures.map((f) => (
              <li key={f}>· {f}</li>
            ))}
          </ul>
          {tierButton(
            "pro",
            interval === "yearly"
              ? `Get Pro — $${proPrice.amount}/yr`
              : `Get Pro — $${proPrice.amount}/mo`,
          )}
        </div>

        <div className="rounded-2xl border border-[var(--line)] bg-white p-8">
          <p className="text-sm font-semibold text-mute">Business</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold text-ink">
            ${businessPrice.amount}
            <span className="text-lg font-semibold text-mute">
              {businessPrice.suffix}
            </span>
          </p>
          <p className="mt-1 text-sm text-mute">
            For teams &amp; marketplaces
            {businessPrice.sub && (
              <>
                <br />
                {businessPrice.sub}
              </>
            )}
          </p>
          <ul className="mt-6 space-y-2 text-sm text-ink-soft">
            {businessFeatures.map((f) => (
              <li key={f}>· {f}</li>
            ))}
          </ul>
          {tierButton(
            "business",
            interval === "yearly"
              ? `Get Business — $${businessPrice.amount}/yr`
              : `Get Business — $${businessPrice.amount}/mo`,
          )}
        </div>
      </div>
    </>
  );
}
