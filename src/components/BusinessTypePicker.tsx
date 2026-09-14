"use client";

import { useEffect, useMemo, useState } from "react";
import {
  checkAudienceGroups,
  checkAudiences,
  type CheckAudience,
} from "@/data/complianceCheck";
import { ChoiceChip } from "@/components/Ui";

function groupIndexForAudience(id: CheckAudience | null): number {
  if (!id) return 0;
  const idx = checkAudienceGroups.findIndex((g) => g.items.includes(id));
  return idx >= 0 ? idx : 0;
}

export function BusinessTypeChipPicker({
  value,
  onChange,
  disabled,
}: {
  value: CheckAudience | null;
  onChange: (id: CheckAudience) => void;
  disabled?: boolean;
}) {
  const [groupIdx, setGroupIdx] = useState(() => groupIndexForAudience(value));

  useEffect(() => {
    if (value) setGroupIdx(groupIndexForAudience(value));
  }, [value]);

  const group = checkAudienceGroups[groupIdx] ?? checkAudienceGroups[0];
  const selected = useMemo(
    () => (value ? checkAudiences.find((a) => a.id === value) : null),
    [value],
  );

  return (
    <div className="max-w-3xl">
      <div
        role="tablist"
        aria-label="Business categories"
        className="flex flex-wrap gap-1.5"
      >
        {checkAudienceGroups.map((g, i) => {
          const active = i === groupIdx;
          const hasSelection = value ? g.items.includes(value) : false;
          return (
            <button
              key={g.label}
              type="button"
              role="tab"
              aria-selected={active}
              disabled={disabled}
              onClick={() => setGroupIdx(i)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
                active
                  ? "bg-ink text-fog"
                  : hasSelection
                    ? "border border-ink/30 bg-fog text-ink"
                    : "border border-[var(--line)] bg-paper text-mute hover:border-ink/25 hover:text-ink"
              }`}
            >
              {shortGroupLabel(g.label)}
              {hasSelection && !active ? " ·" : ""}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-mute">{group.label}</p>
      <div
        role="tabpanel"
        className="mt-2 flex flex-wrap gap-2 rounded-xl border border-[var(--line)] bg-[#f7faf8]/60 p-3"
      >
        {group.items.map((id) => {
          const a = checkAudiences.find((x) => x.id === id);
          if (!a) return null;
          return (
            <ChoiceChip
              key={id}
              active={value === id}
              disabled={disabled}
              onClick={() => onChange(id)}
            >
              {a.label}
            </ChoiceChip>
          );
        })}
      </div>

      {selected && (
        <p className="mt-3 text-sm text-ink-soft">
          <span className="font-medium text-ink">{selected.label}.</span>{" "}
          {selected.blurb}
        </p>
      )}
    </div>
  );
}

function shortGroupLabel(label: string): string {
  const map: Record<string, string> = {
    "Not sure / broadest scan": "Not sure",
    "Software & technology": "Software",
    "Commerce & operations": "Commerce",
    "Platforms & media": "Platforms",
    "Organizations & services": "Orgs & services",
  };
  return map[label] ?? label;
}

export function BusinessTypeCardPicker({
  value,
  onChange,
  disabled,
}: {
  value: CheckAudience | null;
  onChange: (id: CheckAudience) => void;
  disabled?: boolean;
}) {
  const [groupIdx, setGroupIdx] = useState(() => groupIndexForAudience(value));

  useEffect(() => {
    if (value) setGroupIdx(groupIndexForAudience(value));
  }, [value]);

  const group = checkAudienceGroups[groupIdx] ?? checkAudienceGroups[0];

  return (
    <div className="max-w-4xl">
      <div
        role="tablist"
        aria-label="Business categories"
        className="flex flex-wrap gap-1.5"
      >
        {checkAudienceGroups.map((g, i) => {
          const active = i === groupIdx;
          const hasSelection = value ? g.items.includes(value) : false;
          return (
            <button
              key={g.label}
              type="button"
              role="tab"
              aria-selected={active}
              disabled={disabled}
              onClick={() => setGroupIdx(i)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
                active
                  ? "bg-ink text-fog"
                  : hasSelection
                    ? "border border-ink/30 bg-fog text-ink"
                    : "border border-[var(--line)] bg-paper text-mute hover:border-ink/25 hover:text-ink"
              }`}
            >
              {shortGroupLabel(g.label)}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {group.items.map((id) => {
          const a = checkAudiences.find((x) => x.id === id);
          if (!a) return null;
          return (
            <button
              key={id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(id)}
              className={`rounded-2xl border p-4 text-left transition disabled:opacity-50 ${
                value === id
                  ? "border-ink bg-ink text-fog"
                  : "border-[var(--line)] bg-paper/70 hover:bg-fog"
              }`}
            >
              <span className="font-semibold">{a.label}</span>
              <p
                className={`mt-1 text-sm ${
                  value === id ? "text-fog/70" : "text-mute"
                }`}
              >
                {a.blurb}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function selectedAudienceBlurb(id: CheckAudience | null): string | null {
  if (!id) return null;
  return checkAudiences.find((a) => a.id === id)?.blurb ?? null;
}
