import type { CompanyProfile } from "./types";
import { expandedCompanies } from "./companies-expanded";
import { extraCompanies } from "./companies-extra";
import { cases } from "./cases";

/** Merge explicit profiles with case→company links discovered in the case library. */
function buildCompanies(): CompanyProfile[] {
  const map = new Map<string, CompanyProfile>();

  for (const c of [...expandedCompanies, ...extraCompanies]) {
    map.set(c.id, {
      ...c,
      caseIds: [...c.caseIds],
      aliases: [...c.aliases],
      markets: [...c.markets],
      conductThemes: [...c.conductThemes],
      overview: c.overview ? [...c.overview] : undefined,
      competitionFootprint: c.competitionFootprint
        ? [...c.competitionFootprint]
        : undefined,
      consumerAndBusinessAngle: c.consumerAndBusinessAngle
        ? [...c.consumerAndBusinessAngle]
        : undefined,
      whatToWatch: c.whatToWatch ? [...c.whatToWatch] : undefined,
    });
  }

  for (const matter of cases) {
    for (const companyId of matter.companies) {
      const existing = map.get(companyId);
      if (existing) {
        if (!existing.caseIds.includes(matter.id)) {
          existing.caseIds.push(matter.id);
        }
        for (const tag of matter.conduct) {
          if (!existing.conductThemes.includes(tag)) {
            existing.conductThemes.push(tag);
          }
        }
        for (const market of matter.markets) {
          if (!existing.markets.includes(market)) {
            existing.markets.push(market);
          }
        }
      } else {
        map.set(companyId, {
          id: companyId,
          name: companyId
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          aliases: [],
          markets: [...matter.markets],
          caseIds: [matter.id],
          conductThemes: [...matter.conduct],
          blurb: `Appears in the CounterLayer case library in connection with ${matter.shortName}.`,
        });
      }
    }
  }

  const known = new Set(cases.map((c) => c.id));
  for (const co of map.values()) {
    co.caseIds = co.caseIds.filter((id) => known.has(id));
  }

  return Array.from(map.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export const companies: CompanyProfile[] = buildCompanies();
