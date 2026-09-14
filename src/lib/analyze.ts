import { cases } from "@/data/cases";
import { companies } from "@/data/companies";
import { lawById } from "@/data/laws";
import { filingById } from "@/data/pathways";
import { situationById } from "@/data/situations";
import type {
  AnalysisBrief,
  CompetitionCase,
  CompanyProfile,
  ConductTag,
  Jurisdiction,
  Role,
} from "@/data/types";

const WHO_CAN_FILE: Record<Role, string> = {
  consumer:
    "Consumers can typically file agency tips and consumer-protection complaints; private antitrust suits require antitrust injury and are harder for end users alone.",
  small_business:
    "Small businesses often have clearer pathways for agency complaints and, with counsel, private actions when direct commercial injury is documented.",
  large_business:
    "Large firms may pursue agency advocacy, merger comments, and private litigation; dominance/standing analyses remain fact-specific.",
  organization:
    "Nonprofits and associations can submit complaints, amicus participation, and public comments on mergers/regulations.",
  developer:
    "Developers frequently combine platform appeals, DMA/gatekeeper complaints (EU), FTC tips, and private suits when distribution is foreclosed.",
  seller:
    "Marketplace sellers can report to FTC/state AGs/EU authorities; preserve listing, fee, and suspension evidence.",
  supplier:
    "Suppliers facing exclusivity or access denial may have vertical-restraint theories; document foreclosure and alternatives.",
  distributor:
    "Distributors may challenge RPM/exclusivity and territory restraints; contract files are critical.",
  employee:
    "Employment issues are usually labor/contract law; competition angles arise mainly in no-poach/wage-fix cartels — report to DOJ if suspected.",
  competitor:
    "Competitors often have the strongest private standing story when they can show antitrust injury from exclusionary conduct.",
};

function jurisdictionMatch(
  item: Jurisdiction,
  selected: Jurisdiction,
): boolean {
  if (selected === "Both") return true;
  if (item === "Both") return true;
  return item === selected;
}

export function findSimilarCases(
  conduct: ConductTag[],
  jurisdiction: Jurisdiction,
  limit = 100,
): CompetitionCase[] {
  const scored = cases
    .map((c) => {
      const overlap = c.conduct.filter((t) => conduct.includes(t)).length;
      const jOk = c.jurisdictions.some((j) => jurisdictionMatch(j, jurisdiction));
      return { c, score: overlap + (jOk ? 0.5 : 0) };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.c);
}

export function searchCompanies(query: string): CompanyProfile[] {
  const q = query.trim().toLowerCase();
  if (!q) return companies;
  return companies.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.id.includes(q) ||
      c.aliases.some((a) => a.toLowerCase().includes(q)) ||
      c.markets.some((m) => m.toLowerCase().includes(q)),
  );
}

export function searchCases(query: string): CompetitionCase[] {
  const q = query.trim().toLowerCase();
  if (!q) return cases;
  return cases.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.shortName.toLowerCase().includes(q) ||
      c.summary.toLowerCase().includes(q) ||
      c.markets.some((m) => m.toLowerCase().includes(q)) ||
      c.conduct.some((t) => t.replace(/_/g, " ").includes(q)),
  );
}

export function getCompanyWithCases(id: string) {
  const company = companies.find((c) => c.id === id);
  if (!company) return null;
  const companyCases = company.caseIds
    .map((cid) => cases.find((c) => c.id === cid))
    .filter(Boolean) as CompetitionCase[];
  return { company, cases: companyCases };
}

export function buildAnalysis(input: {
  situationId: string;
  role: Role;
  jurisdiction: Jurisdiction;
  freeText?: string;
  companyQuery?: string;
}): AnalysisBrief | null {
  const situation = situationById[input.situationId];
  if (!situation) return null;

  const laws = situation.lawIds
    .map((id) => lawById[id])
    .filter(Boolean)
    .filter(
      (l) =>
        input.jurisdiction === "Both" ||
        l.jurisdiction === "Both" ||
        l.jurisdiction === input.jurisdiction,
    );

  const filingPaths = situation.filingPathIds
    .map((id) => filingById[id])
    .filter(Boolean)
    .filter(
      (p) =>
        input.jurisdiction === "Both" ||
        p.jurisdiction === "Both" ||
        p.jurisdiction === input.jurisdiction,
    );

  const similarCases = findSimilarCases(
    situation.conduct,
    input.jurisdiction,
    6,
  );

  const companyMatches = input.companyQuery
    ? searchCompanies(input.companyQuery).slice(0, 3)
    : [];

  const text = (input.freeText || "").toLowerCase();
  const extraIssues: string[] = [];
  if (text.includes("payment")) {
    extraIssues.push(
      "Payment-routing or IAP mandates often map to tying / anti-steering theories seen in app-store cases.",
    );
  }
  if (text.includes("suspend") || text.includes("ban")) {
    extraIssues.push(
      "Account suspension facts should be compared carefully — competition claims need more than ordinary policy enforcement.",
    );
  }

  return {
    situationId: situation.id,
    role: input.role,
    jurisdiction: input.jurisdiction,
    freeText: input.freeText,
    potentialIssues: [...situation.potentialIssues, ...extraIssues],
    laws,
    filingPaths,
    similarCases,
    evidenceMatters: situation.evidenceMatters,
    whoCanFile: [WHO_CAN_FILE[input.role]],
    caveats: [
      "This is a guidance brief from CounterLayer — not a law firm and not a substitute for counsel. It does not determine that any company violated the law.",
      "Antitrust outcomes are highly fact-specific: market definition, market power, and competitive effects usually control.",
      "Listing a filing pathway means it may be relevant to explore — not that you have a valid claim or should file.",
      "Consumer-protection, contract, and competition issues often overlap; do not assume every unfair outcome is antitrust.",
    ],
    companyMatches,
  };
}

export function casesByStatus(status: CompetitionCase["status"]) {
  return cases.filter((c) => c.status === status);
}

export function ongoingCases() {
  return cases.filter((c) => c.status === "ongoing" || c.status === "appealed");
}

export { cases, companies };
