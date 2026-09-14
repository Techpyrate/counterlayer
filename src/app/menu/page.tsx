"use client";

import Link from "next/link";
import { AuthNavControls } from "@/components/AuthNavControls";
import { PageWrap } from "@/components/PageWrap";

const groups = [
  {
    title: "Scan",
    items: [
      { href: "/check", label: "Scan My Business" },
      { href: "/assess", label: "Compliance scan" },
      { href: "/seller-check", label: "Seller check" },
    ],
  },
  {
    title: "For you",
    items: [
      { href: "/consumers", label: "Consumer hub" },
      { href: "/report", label: "Report a problem" },
      { href: "/rights", label: "My rights" },
      { href: "/file", label: "What can I file?" },
      { href: "/power", label: "Consumer power" },
    ],
  },
  {
    title: "Library",
    items: [
      { href: "/cases", label: "Case library" },
      { href: "/companies", label: "Companies" },
      { href: "/ongoing", label: "Live cases" },
      { href: "/similar", label: "Similar cases" },
    ],
  },
  {
    title: "Account",
    items: [
      { href: "/profile", label: "Profile" },
      { href: "/pricing", label: "Pricing" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export default function MenuPage() {
  return (
    <PageWrap className="py-6 pb-28">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-signal-dim">
            CounterLayer
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-bold text-ink">
            Menu
          </h1>
        </div>
        <Link
          href="/"
          className="rounded-xl border border-[var(--line)] bg-fog px-3 py-2 text-sm font-semibold text-ink"
        >
          Close
        </Link>
      </div>

      <div className="mb-6 rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--signal)_14%,var(--paper))] p-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-mute">
          Account
        </p>
        <AuthNavControls />
        <p className="mt-3 text-xs text-mute">
          Or open{" "}
          <Link href="/profile" className="font-semibold text-ink underline">
            Profile
          </Link>
          .
        </p>
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <section key={group.title}>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-mute">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between rounded-xl bg-fog px-4 py-3.5 text-sm font-semibold text-ink active:bg-fog-deep"
                  >
                    {item.label}
                    <span aria-hidden className="text-mute">
                      ›
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageWrap>
  );
}
