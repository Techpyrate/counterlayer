"use client";

import { useMemo, useState } from "react";
import { cases, filterCases } from "@/data/cases";
import type { ConductTag } from "@/data/types";
import { CaseCard, SectionLabel } from "@/components/Ui";
import { PageWrap } from "@/components/PageWrap";

const JURISDICTIONS = ["All", "US", "EU", "Both", "Other"] as const;
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
  "predatory_pricing",
  "resale_restriction",
  "market_access",
];

type Props = {
  mode?: "all" | "live";
  title?: string;
  subtitle?: string;
};

const selectClass =
  "w-full rounded-lg border border-[var(--line)] bg-paper px-2.5 py-1.5 text-sm";

export function CaseExplorer({
  mode = "all",
  title,
  subtitle,
}: Props) {
  const liveOnly = mode === "live";
  const pool = liveOnly
    ? cases.filter((c) => c.status === "ongoing" || c.status === "appealed")
    : cases;

  const [query, setQuery] = useState("");
  const [jurisdiction, setJurisdiction] = useState("All");
  const [status, setStatus] = useState("All");
  const [conduct, setConduct] = useState("All");
  const [market, setMarket] = useState("All");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const markets = useMemo(() => {
    const set = new Set<string>();
    pool.forEach((c) => c.markets.forEach((m) => set.add(m)));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [pool]);

  const statuses = useMemo(() => {
    if (liveOnly) return ["All", "ongoing", "appealed"] as const;
    return [
      "All",
      "ongoing",
      "settled",
      "fined",
      "remedy",
      "dismissed",
      "won_by_plaintiff",
      "won_by_defendant",
      "appealed",
    ] as const;
  }, [liveOnly]);

  const filtered = useMemo(
    () =>
      filterCases({
        query,
        jurisdiction,
        status,
        conduct,
        market,
        yearFrom: yearFrom ? Number(yearFrom) : undefined,
        yearTo: yearTo ? Number(yearTo) : undefined,
        liveOnly,
      }),
    [query, jurisdiction, status, conduct, market, yearFrom, yearTo, liveOnly],
  );

  const activeFilterCount = [
    jurisdiction !== "All",
    status !== "All",
    conduct !== "All",
    market !== "All",
    Boolean(yearFrom),
    Boolean(yearTo),
  ].filter(Boolean).length;

  function clearFilters() {
    setQuery("");
    setJurisdiction("All");
    setStatus("All");
    setConduct("All");
    setMarket("All");
    setYearFrom("");
    setYearTo("");
  }

  return (
    <PageWrap className="py-10 sm:py-14">
      {liveOnly ? (
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-danger" />
          </span>
          <SectionLabel>Ongoing antitrust cases</SectionLabel>
        </div>
      ) : (
        <SectionLabel>Case library</SectionLabel>
      )}

      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold text-ink md:text-5xl">
        {title ??
          (liveOnly ? `${pool.length} live matters` : "Precedent desk")}
      </h1>
      <p className="mt-4 max-w-2xl text-ink-soft/80">
        {subtitle ??
          (liveOnly
            ? "Search and filter active and appealed competition matters."
            : `${cases.length} plain-English case explainers. Search, filter, then read the full story.`)}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by company, market, conduct, outcome…"
          className="min-w-0 flex-1 rounded-xl border border-[var(--line)] bg-paper/90 px-4 py-3 text-base outline-none ring-signal/30 focus:ring-2"
        />
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium hover:bg-fog"
          >
            Filters{activeFilterCount ? ` (${activeFilterCount})` : ""}
          </button>
          {(activeFilterCount > 0 || query) && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-mute underline-offset-2 hover:underline"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      <p className="mt-2 text-sm text-mute">
        Showing {filtered.length} of {pool.length}
      </p>

      {showFilters && (
        <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl border border-[var(--line)] bg-paper/70 p-3 md:grid-cols-3 lg:grid-cols-6">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-mute">
            Jurisdiction
            <select
              className={`${selectClass} mt-1`}
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
            >
              {JURISDICTIONS.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-mute">
            Status
            <select
              className={`${selectClass} mt-1`}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-mute">
            Conduct
            <select
              className={`${selectClass} mt-1`}
              value={conduct}
              onChange={(e) => setConduct(e.target.value)}
            >
              {CONDUCT.map((c) => (
                <option key={c} value={c}>
                  {c.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-mute">
            Market
            <select
              className={`${selectClass} mt-1`}
              value={market}
              onChange={(e) => setMarket(e.target.value)}
            >
              {markets.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-mute">
            Year from
            <input
              type="number"
              className={`${selectClass} mt-1`}
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              placeholder="1998"
            />
          </label>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-mute">
            Year to
            <input
              type="number"
              className={`${selectClass} mt-1`}
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
              placeholder="2026"
            />
          </label>
        </div>
      )}

      <div className="mt-8 border-t border-[var(--line)]">
        {filtered.map((c) => (
          <CaseCard key={c.id} c={c} />
        ))}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-ink-soft">
            No cases match these filters.
          </p>
        )}
      </div>
    </PageWrap>
  );
}
