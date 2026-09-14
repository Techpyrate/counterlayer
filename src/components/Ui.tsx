import Link from "next/link";
import type { CompetitionCase } from "@/data/types";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal-dim">
      {children}
    </p>
  );
}

export function ScoreBar({
  label,
  value,
  tone = "signal",
}: {
  label: string;
  value: number;
  tone?: "signal" | "warn" | "danger";
}) {
  const color =
    tone === "warn" ? "bg-warn" : tone === "danger" ? "bg-danger" : "bg-signal";
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-ink-soft">{label}</span>
        <span className="font-semibold tabular-nums">{value}/100</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-fog-deep">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

export function CaseCard({ c }: { c: CompetitionCase }) {
  return (
    <Link
      href={`/cases/${c.id}`}
      className="block border-t border-[var(--line)] py-5 transition hover:bg-fog/50"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink">
          {c.shortName}
        </h3>
        <span className="text-xs uppercase tracking-wider text-mute">
          {c.jurisdictions.join(" · ")} · {c.yearStart}
          {c.yearEnd ? `–${c.yearEnd}` : "–"} · {c.status}
          {c.readingMinutes ? ` · ${c.readingMinutes} min` : ""}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft/90">
        {c.plainEnglish?.inOneMinute ?? c.summary}
      </p>
      <p className="mt-2 text-sm text-mute">
        <span className="font-medium text-ink-soft">Outcome:</span> {c.outcome}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {c.conduct.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-ink/5 px-2.5 py-0.5 text-xs text-ink-soft"
          >
            {tag.replace(/_/g, " ")}
          </span>
        ))}
      </div>
    </Link>
  );
}

export function ChoiceChip({
  active,
  onClick,
  disabled,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full border px-3.5 py-2 text-left text-sm transition disabled:opacity-50 ${
        active
          ? "border-ink bg-ink text-fog"
          : "border-[var(--line)] bg-paper/70 text-ink-soft hover:border-ink/30 hover:bg-fog"
      }`}
    >
      {children}
    </button>
  );
}
