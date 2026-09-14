"use client";

import { PageWrap } from "@/components/PageWrap";
import { useMemo, useState } from "react";
import Link from "next/link";
import { companies } from "@/data/companies";
import type { ConductTag } from "@/data/types";
import { ChoiceChip, SectionLabel } from "@/components/Ui";

const CONDUCT: Array<"All" | ConductTag> = [
  "All",
  "tying",
  "exclusivity",
  "self_preferencing",
  "merger",
  "cartel_coordination",
  "abuse_of_dominance",
  "platform_suspension",
  "discrimination",
  "vertical_restraint",
  "interoperability",
  "data_lockin",
  "refusal_to_deal",
  "price_fix",
  "market_access",
];

export function CompanyDirectory() {
  const [query, setQuery] = useState("");
  const [conduct, setConduct] = useState<string>("All");
  const [market, setMarket] = useState("All");
  const [onlyWithCases, setOnlyWithCases] = useState(false);

  const markets = useMemo(() => {
    const set = new Set<string>();
    companies.forEach((c) => c.markets.forEach((m) => set.add(m)));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return companies.filter((c) => {
      if (onlyWithCases && c.caseIds.length === 0) return false;
      if (
        conduct !== "All" &&
        !c.conductThemes.includes(conduct as ConductTag)
      ) {
        return false;
      }
      if (
        market !== "All" &&
        !c.markets.some((m) => m.toLowerCase().includes(market.toLowerCase()))
      ) {
        return false;
      }
      if (!q) return true;
      const hay = [c.name, c.id, c.blurb, ...c.aliases, ...c.markets]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, conduct, market, onlyWithCases]);

  return (
    <PageWrap className="py-10 sm:py-14">
      <SectionLabel>Company antitrust history</SectionLabel>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold text-ink md:text-5xl">
        Competition record
      </h1>
      <p className="mt-4 max-w-2xl text-ink-soft/80">
        {companies.length} company profiles with linked matters from the case
        library. Allegations are not findings of liability unless a case outcome
        says so.
      </p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search companies, aliases, markets…"
        className="mt-8 w-full rounded-2xl border border-[var(--line)] bg-paper/90 px-5 py-4 text-base outline-none ring-signal/30 focus:ring-2"
      />

      <div className="mt-6 space-y-4 rounded-2xl border border-[var(--line)] bg-paper/60 p-5">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-mute">
            Conduct theme
          </p>
          <div className="flex flex-wrap gap-2">
            {CONDUCT.map((c) => (
              <ChoiceChip
                key={c}
                active={conduct === c}
                onClick={() => setConduct(c)}
              >
                {c.replace(/_/g, " ")}
              </ChoiceChip>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-mute">
              Market
            </p>
            <select
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              className="w-full rounded-xl border border-[var(--line)] bg-paper px-3 py-2 text-sm"
            >
              {markets.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <ChoiceChip
              active={onlyWithCases}
              onClick={() => setOnlyWithCases((v) => !v)}
            >
              Only companies with linked cases in library
            </ChoiceChip>
          </div>
        </div>
        <p className="text-sm text-mute">
          Showing {filtered.length} of {companies.length}
        </p>
      </div>

      <div className="mt-10 divide-y divide-[var(--line)] border-t border-[var(--line)]">
        {filtered.map((c) => (
          <Link
            key={c.id}
            href={`/companies/${c.id}`}
            className="block py-6 transition hover:bg-fog/40"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
                {c.name}
              </h2>
              <span className="text-xs text-mute">
                {c.caseIds.length} linked matter
                {c.caseIds.length === 1 ? "" : "s"}
              </span>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft line-clamp-4">
              {c.blurb}
            </p>
            {c.overview?.[0] && (
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-mute line-clamp-3">
                {c.overview[0]}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {c.conductThemes.slice(0, 6).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-ink/5 px-2.5 py-0.5 text-xs text-ink-soft"
                >
                  {t.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-ink-soft">No companies match.</p>
        )}
      </div>
    </PageWrap>
  );
}
