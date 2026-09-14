"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import {
  type ProfileRoleGuide,
  getProfileRoleGuide,
} from "@/data/profileRoles";

export function RoleGuideModal({
  open,
  roleId,
  onClose,
}: {
  open: boolean;
  roleId: string | null | undefined;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !mounted || !roleId) return null;

  const guide = getProfileRoleGuide(roleId as ProfileRoleGuide["id"]);

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/70 p-3 backdrop-blur-[8px] sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="flex h-[min(94vh,920px)] w-[min(96vw,1180px)] flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-paper shadow-[0_32px_100px_-16px_rgba(18,28,26,0.45)]"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="relative shrink-0 border-b border-[var(--line)] bg-ink px-6 py-6 text-fog sm:px-10 sm:py-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg text-fog hover:bg-white/20 sm:right-6 sm:top-6"
          >
            ×
          </button>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-signal">
            CounterLayer · Field guide
          </p>
          <h2
            id={titleId}
            className="mt-2 max-w-4xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {guide.label}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-fog/80 sm:text-lg">
            {guide.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              `${guide.watchFor.length} watch points`,
              `${guide.commonIssues.length} common issues`,
              `${guide.tools.length} tools`,
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-fog/70"
              >
                {chip}
              </span>
            ))}
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto bg-[#f7faf8] px-4 py-6 sm:px-8 sm:py-8">
          <div className="grid gap-5 lg:grid-cols-3">
            <GuideCard
              index="01"
              title="What to watch for"
              items={guide.watchFor}
              accent="#b42318"
            />
            <GuideCard
              index="02"
              title="Your leverage"
              items={guide.yourLeverage}
              accent="#1a7a45"
            />
            <GuideCard
              index="03"
              title="Common issues"
              items={guide.commonIssues}
              accent="#9a6b12"
            />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <GuideCard
              index="04"
              title="First steps"
              items={guide.firstSteps}
              accent="#1a5a9a"
            />
            <GuideCard
              index="05"
              title="When to escalate"
              items={guide.escalationPaths}
              accent="#6b4fa0"
            />
            <GuideCard
              index="06"
              title="Documents to keep"
              items={guide.documentChecklist}
              accent="#5c6b66"
            />
          </div>

          <section className="mt-6 overflow-hidden rounded-xl border border-[var(--line)] bg-white">
            <div className="border-b border-[var(--line)] px-5 py-4 sm:px-6">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
                Recommended CounterLayer tools
              </h3>
              <p className="mt-1 text-sm text-mute">
                Start here based on your role — a practical guide for your
                situation.
              </p>
            </div>
            <div className="grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
              {guide.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={onClose}
                  className="group flex min-h-[120px] flex-col justify-between bg-white p-5 transition hover:bg-[#f7faf8]"
                >
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-lg font-bold text-ink group-hover:text-signal-dim">
                      {tool.label}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {tool.description}
                    </p>
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-mute group-hover:text-ink">
                    Open tool →
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <p className="mt-6 text-center text-xs leading-relaxed text-mute">
            CounterLayer is a diligence and guidance tool — not a law firm, and
            not a substitute for counsel on your specific facts.
          </p>
        </div>

        <footer className="shrink-0 border-t border-[var(--line)] bg-white px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-ink py-3.5 text-sm font-semibold text-fog sm:w-auto sm:px-10"
          >
            Close guide
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}

function GuideCard({
  index,
  title,
  items,
  accent,
}: {
  index: string;
  title: string;
  items: string[];
  accent: string;
}) {
  return (
    <article className="rounded-xl border border-[var(--line)] bg-white p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 font-mono text-xs font-bold"
          style={{ color: accent }}
        >
          {index}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
            {title}
          </h3>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li
                key={item.slice(0, 48)}
                className="flex gap-3 text-[15px] leading-relaxed text-ink-soft"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
