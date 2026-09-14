import type { CompetitionCase } from "../types";
import { classicCases } from "./classic";
import { libraryCases } from "./library";
import { batchOngoingA } from "./batch-ongoing-a";
import { batchOngoingB } from "./batch-ongoing-b";
import { batchLibraryC } from "./batch-library-c";
import { batchSme } from "./batch-sme";

function dedupeCases(list: CompetitionCase[]): CompetitionCase[] {
  const seen = new Set<string>();
  const out: CompetitionCase[] = [];
  for (const c of list) {
    if (seen.has(c.id)) continue;
    seen.add(c.id);
    out.push(c);
  }
  return out;
}

export const cases: CompetitionCase[] = dedupeCases([
  ...classicCases,
  ...libraryCases,
  ...batchOngoingA,
  ...batchOngoingB,
  ...batchLibraryC,
  ...batchSme,
]);

export const caseById = Object.fromEntries(cases.map((c) => [c.id, c])) as Record<
  string,
  CompetitionCase
>;

export function filterCases(opts: {
  query?: string;
  jurisdiction?: string;
  status?: string;
  conduct?: string;
  market?: string;
  yearFrom?: number;
  yearTo?: number;
  liveOnly?: boolean;
}): CompetitionCase[] {
  const q = opts.query?.trim().toLowerCase() ?? "";
  return cases
    .filter((c) => {
      if (opts.liveOnly && c.status !== "ongoing" && c.status !== "appealed") {
        return false;
      }
      if (opts.jurisdiction && opts.jurisdiction !== "All") {
        if (opts.jurisdiction === "Both") {
          const multi =
            c.jurisdictions.includes("Both") || c.jurisdictions.length > 1;
          if (!multi) return false;
        } else if (
          !c.jurisdictions.includes(opts.jurisdiction as never) &&
          !c.jurisdictions.includes("Both")
        ) {
          return false;
        }
      }
      if (opts.status && opts.status !== "All" && c.status !== opts.status) {
        return false;
      }
      if (
        opts.conduct &&
        opts.conduct !== "All" &&
        !c.conduct.includes(opts.conduct as never)
      ) {
        return false;
      }
      if (
        opts.market &&
        opts.market !== "All" &&
        !c.markets.some((m) =>
          m.toLowerCase().includes(opts.market!.toLowerCase()),
        )
      ) {
        return false;
      }
      if (opts.yearFrom && (c.yearEnd ?? c.yearStart) < opts.yearFrom) {
        return false;
      }
      if (opts.yearTo && c.yearStart > opts.yearTo) return false;
      if (!q) return true;
      const hay = [
        c.name,
        c.shortName,
        c.summary,
        c.outcome,
        c.plainEnglish.inOneMinute,
        c.plainEnglish.bottomLine,
        ...c.markets,
        ...c.conduct,
        ...c.companies,
        ...c.plainEnglish.theStory,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    })
    .sort((a, b) => b.yearStart - a.yearStart);
}
