import type { FilingPath } from "./types";

export const filingPaths: FilingPath[] = [
  {
    id: "ftc-complaint",
    name: "FTC consumer / competition complaint",
    jurisdiction: "US",
    agency: "Federal Trade Commission",
    whenRelevant:
      "Unfair methods of competition, deceptive practices, many consumer and small-business marketplace harms.",
    howToStart:
      "Submit a report via ReportFraud.ftc.gov or the FTC complaint assistant. Include dates, parties, screenshots, and contracts.",
    url: "https://reportfraud.ftc.gov/",
    standingNotes:
      "Anyone can report. An FTC complaint does not open a private lawsuit for you; it informs agency priorities.",
  },
  {
    id: "doj-antitrust",
    name: "DOJ Antitrust Division tip / complaint",
    jurisdiction: "US",
    agency: "U.S. Department of Justice — Antitrust Division",
    whenRelevant:
      "Cartels, bid-rigging, monopolization concerns, and major merger issues.",
    howToStart:
      "Use the Antitrust Division citizen complaint process or cartel hotline materials. Preserve contemporaneous documents.",
    url: "https://www.justice.gov/atr/citizen-complaint-center",
    standingNotes:
      "Tips can trigger investigations. Criminal cartel conduct is handled by DOJ, not private plaintiffs alone.",
  },
  {
    id: "state-ag",
    name: "State attorney general",
    jurisdiction: "US",
    agency: "State Attorney General (varies by state)",
    whenRelevant:
      "Local consumer harm, state antitrust statutes, multi-state enforcement, and marketplace practices affecting residents.",
    howToStart:
      "File via your state AG consumer complaint portal. Search “[your state] attorney general complaint”.",
    url: "https://www.naag.org/find-my-ag/",
    standingNotes:
      "Standing and remedies differ by state. Useful when harm is concentrated locally.",
  },
  {
    id: "private-suit",
    name: "Private civil action",
    jurisdiction: "US",
    agency: "Federal or state courts",
    whenRelevant:
      "When you have antitrust injury, standing, and damages or injunctive relief theories — often with counsel.",
    howToStart:
      "Consult antitrust counsel. Document injury, market definition facts, and causation before filing.",
    url: "https://www.americanbar.org/groups/antitrust_law/",
    standingNotes:
      "Private plaintiffs must show antitrust injury. Class actions and individual suits have different hurdles. This is not a recommendation to sue.",
  },
  {
    id: "ec-complaint",
    name: "European Commission competition complaint",
    jurisdiction: "EU",
    agency: "European Commission — DG Competition",
    whenRelevant:
      "Agreements restricting competition, abuse of dominance, and EU-dimension mergers affecting the internal market.",
    howToStart:
      "Use the Commission’s complaint form / eConfidence channels and attach evidence of cross-border effects where relevant.",
    url: "https://competition-policy.ec.europa.eu/index_en",
    standingNotes:
      "National competition authorities may be better for purely local matters (ECN).",
  },
  {
    id: "nca",
    name: "National competition authority",
    jurisdiction: "EU",
    agency: "Member-state NCA (e.g. CMA if UK, Bundeskartellamt, Autorité de la concurrence)",
    whenRelevant:
      "Conduct centered in one member state, or where national rules / DMA enforcement interfaces apply.",
    howToStart:
      "Identify the authority for the country where effects are felt and use its whistleblower or complaint portal.",
    url: "https://competition-policy.ec.europa.eu/european-competition-network_en",
    standingNotes:
      "Post-Brexit UK matters go primarily to the CMA, not the Commission.",
  },
  {
    id: "consumer-protection",
    name: "Consumer-protection complaint",
    jurisdiction: "Both",
    agency: "FTC / CFPB / national consumer bodies",
    whenRelevant:
      "Deceptive terms, billing, access revocation, or unfair practices that may overlap with — but are not identical to — antitrust.",
    howToStart:
      "File with the relevant consumer agency and keep order/account records.",
    url: "https://www.ftc.gov/complaint",
    standingNotes:
      "Consumer protection claims can proceed even when antitrust theories are weak.",
  },
];

export const filingById = Object.fromEntries(
  filingPaths.map((p) => [p.id, p]),
) as Record<string, FilingPath>;
