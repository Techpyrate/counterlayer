"use client";

import Link from "next/link";
import { useState } from "react";
import { cases } from "@/data/cases";
import { PageWrap } from "@/components/PageWrap";
import { AuthModal } from "@/components/AuthModal";
import { AttorneyMode } from "@/components/AttorneyMode";
import { useAuth } from "@/lib/auth";
import { isAdminEmail } from "@/lib/adminAccess";

export function AdminDashboard() {
  const { user, loading } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [attorneyMode, setAttorneyMode] = useState(true);

  const liveUs = cases.filter(
    (c) =>
      (c.status === "ongoing" || c.status === "appealed") &&
      (c.jurisdictions.includes("US") || c.jurisdictions.includes("Both")),
  ).length;
  const liveEu = cases.filter(
    (c) =>
      (c.status === "ongoing" || c.status === "appealed") &&
      (c.jurisdictions.includes("EU") || c.jurisdictions.includes("Both")),
  ).length;

  if (loading) {
    return (
      <PageWrap className="py-16">
        <p className="text-sm text-mute">Checking accessâ€¦</p>
      </PageWrap>
    );
  }

  if (!user) {
    return (
      <PageWrap className="py-12 pb-28">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-ink">
          Admin
        </h1>
        <p className="mt-3 max-w-lg text-sm text-ink-soft">
          Sign in with the admin account to open the dashboard.
        </p>
        <button
          type="button"
          onClick={() => setLoginOpen(true)}
          className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-fog"
        >
          Log in
        </button>
        <AuthModal
          open={loginOpen}
          initialMode="login"
          onClose={() => setLoginOpen(false)}
        />
      </PageWrap>
    );
  }

  if (!isAdminEmail(user.email)) {
    return (
      <PageWrap className="py-12 pb-28">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-ink">
          Admin only
        </h1>
        <p className="mt-3 max-w-lg text-sm text-ink-soft">
          This dashboard is visible only when the admin account is signed in.
        </p>
        <Link href="/profile" className="mt-6 inline-block text-sm font-semibold text-signal-dim">
          Back to profile
        </Link>
      </PageWrap>
    );
  }

  return (
    <PageWrap className="py-8 pb-28">
      <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-signal-dim">
            Admin
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-bold text-ink sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 break-all text-sm text-mute">{user.email}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/profile"
            className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-ink"
          >
            Profile
          </Link>
          <Link
            href="/cases"
            className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-ink"
          >
            Case library
          </Link>
        </div>
      </div>

      <div className="sticky top-[4.5rem] z-30 -mx-4 mt-6 border-y border-[var(--line)] bg-paper/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute">
              Workspace
            </p>
            <p className="text-sm font-semibold text-ink">
              {attorneyMode
                ? "Attorney mode â€” current US and EU competition work"
                : "Operations"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAttorneyMode((v) => !v)}
            className={`rounded-full px-4 py-2.5 text-sm font-semibold ${
              attorneyMode
                ? "bg-ink text-fog"
                : "border border-[var(--line)] bg-white text-ink"
            }`}
            aria-pressed={attorneyMode}
          >
            Attorney mode {attorneyMode ? "on" : "off"}
          </button>
        </div>
      </div>

      {attorneyMode ? (
        <AttorneyMode userEmail={user.email} />
      ) : (
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Library", String(cases.length), "All explainers"],
            ["Live US", String(liveUs), "Ongoing or appealed"],
            ["Live EU", String(liveEu), "Ongoing or appealed"],
            ["Plan", "Admin", "All product features"],
          ].map(([label, value, note]) => (
            <div
              key={label}
              className="rounded-2xl border border-[var(--line)] bg-white p-5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                {label}
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-ink">
                {value}
              </p>
              <p className="mt-1 text-xs text-mute">{note}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:col-span-2 xl:col-span-4">
            <p className="text-sm font-semibold text-ink">Turn attorney mode on</p>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">
              Open a matter file: elements, market, procedure, evidence, live
              comparisons, and an exportable counsel memo.
              Closed historical matters stay out of that desk.
            </p>
          </div>
        </section>
      )}
    </PageWrap>
  );
}
