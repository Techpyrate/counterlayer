"use client";

import { PageWrap } from "@/components/PageWrap";
import { useMemo, useState } from "react";
import type { ConductTag, Jurisdiction } from "@/data/types";
import { cases } from "@/data/cases";
import { findSimilarCasesHybrid } from "@/lib/caseSearch";
import { CaseCard, ChoiceChip, SectionLabel } from "@/components/Ui";

const TAGS: { id: ConductTag; label: string }[] = [
  { id: "tying", label: "Tying / forced bundle" },
  { id: "exclusivity", label: "Exclusivity" },
  { id: "self_preferencing", label: "Self-preferencing" },
  { id: "platform_suspension", label: "Platform suspension" },
  { id: "refusal_to_deal", label: "Refusal to deal" },
  { id: "merger", label: "Merger / acquisition" },
  { id: "cartel_coordination", label: "Coordination / cartel" },
  { id: "interoperability", label: "Interoperability blocked" },
  { id: "discrimination", label: "Discrimination" },
  { id: "resale_restriction", label: "Resale restriction" },
  { id: "market_access", label: "Market access blocked" },
  { id: "abuse_of_dominance", label: "Abuse of dominance" },
  { id: "data_lockin", label: "Data lock-in" },
  { id: "vertical_restraint", label: "Vertical restraint" },
  { id: "price_fix", label: "Price fixing" },
  { id: "predatory_pricing", label: "Predatory pricing" },
];

export default function SimilarPage() {
  const [selected, setSelected] = useState<ConductTag[]>([]);
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("Both");
  const [text, setText] = useState("");

  const results = useMemo(() => {
    const trimmed = text.trim();
    if (trimmed.length < 2 && selected.length === 0) {
      // Show full library browse when empty so users see 100+ cases
      return cases
        .filter((c) => {
          if (jurisdiction === "Both") return true;
          return (
            c.jurisdictions.includes(jurisdiction) ||
            c.jurisdictions.includes("Both")
          );
        })
        .sort((a, b) => b.yearStart - a.yearStart);
    }
    return findSimilarCasesHybrid({
      text: trimmed,
      conduct: selected,
      jurisdiction,
      limit: 150,
    });
  }, [selected, jurisdiction, text]);

  function toggle(tag: ConductTag) {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  return (
    <PageWrap className="py-10 sm:py-14">
      <SectionLabel>Has this happened before?</SectionLabel>
      <h1 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-bold text-ink md:text-5xl">
        Match conduct to prior cases
      </h1>
      <p className="mt-4 max-w-2xl text-ink-soft/80">
        Type keywords in plain English — we search all {cases.length} US and EU
        matters in the library (names, stories, markets, companies, outcomes).
        Optional conduct tags narrow the match.
      </p>

      <label className="mt-8 block text-sm font-semibold uppercase tracking-wider text-mute">
        Describe what happened
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder='Example: "Amazon suspended my seller account" or "forced to use their payment system" or "Google prefers its own shopping results"'
        className="mt-3 w-full rounded-xl border border-[var(--line)] bg-paper/80 px-4 py-3 text-base outline-none ring-signal/40 focus:ring-2"
      />
      <p className="mt-2 text-xs text-mute">
        {text.trim().length < 2
          ? "Tip: type at least 2 characters to keyword-search the full library."
          : `Searching ${cases.length} cases for your keywords…`}
      </p>

      <div className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
          Optional conduct themes
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <ChoiceChip
              key={t.id}
              active={selected.includes(t.id)}
              onClick={() => toggle(t.id)}
            >
              {t.label}
            </ChoiceChip>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
          Jurisdiction
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["US", "EU", "Both"] as Jurisdiction[]).map((j) => (
            <ChoiceChip
              key={j}
              active={jurisdiction === j}
              onClick={() => setJurisdiction(j)}
            >
              {j}
            </ChoiceChip>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-[var(--line)]">
        <p className="pt-6 text-sm text-mute">
          {results.length} case{results.length === 1 ? "" : "s"}
          {text.trim().length >= 2 ? " matched your keywords" : " in view"}
          {" · "}library size {cases.length}
        </p>
        {results.map((c) => (
          <CaseCard key={c.id} c={c} />
        ))}
        {results.length === 0 && (
          <p className="py-10 text-ink-soft">
            No cases matched. Try different keywords (company name, product,
            “merger”, “payment”, “suspension”, “cartel”…) or clear filters.
          </p>
        )}
      </div>
    </PageWrap>
  );
}
