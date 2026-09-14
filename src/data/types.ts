export type Jurisdiction = "US" | "EU" | "Both" | "Other";

export type Role =
  | "consumer"
  | "small_business"
  | "large_business"
  | "organization"
  | "developer"
  | "seller"
  | "supplier"
  | "distributor"
  | "employee"
  | "competitor";

export type ConductTag =
  | "tying"
  | "exclusivity"
  | "self_preferencing"
  | "refusal_to_deal"
  | "price_fix"
  | "predatory_pricing"
  | "merger"
  | "cartel_coordination"
  | "resale_restriction"
  | "interoperability"
  | "platform_suspension"
  | "market_access"
  | "vertical_restraint"
  | "discrimination"
  | "data_lockin"
  | "abuse_of_dominance";

export type CaseStatus =
  | "ongoing"
  | "settled"
  | "fined"
  | "remedy"
  | "dismissed"
  | "won_by_plaintiff"
  | "won_by_defendant"
  | "appealed";

export interface LawRef {
  id: string;
  name: string;
  jurisdiction: Jurisdiction;
  summary: string;
  citation: string;
  url?: string;
}

export interface FilingPath {
  id: string;
  name: string;
  jurisdiction: Jurisdiction;
  agency: string;
  whenRelevant: string;
  howToStart: string;
  url: string;
  standingNotes: string;
}

export interface CaseTimelineEvent {
  date: string;
  title: string;
  detail: string;
}

export interface CasePlainEnglish {
  /** Short hook for cards and skimmers */
  inOneMinute: string;
  /** Multi-paragraph story of the dispute */
  theStory: string[];
  /** Why an ordinary person / small business should care */
  whyItMatters: string[];
  /** What the government or plaintiff claimed, in plain words */
  whatWasClaimed: string[];
  /** Defense / company position when useful */
  theOtherSide: string[];
  /** What the decision or settlement means day-to-day */
  whatItMeansForYou: string[];
  /** Honest bottom line without legal jargon */
  bottomLine: string;
}

export interface CompetitionCase {
  id: string;
  name: string;
  shortName: string;
  companies: string[];
  jurisdictions: Jurisdiction[];
  conduct: ConductTag[];
  yearStart: number;
  yearEnd?: number;
  status: CaseStatus;
  summary: string;
  regulatorArgument: string;
  outcome: string;
  remedies?: string;
  laws: string[];
  markets: string[];
  sources: { label: string; url: string }[];
  /** Plain-language deep dive for general readers */
  plainEnglish: CasePlainEnglish;
  /** Chronology ordinary readers can follow */
  timeline: CaseTimelineEvent[];
  /** Highlight dates for the sidebar */
  keyDates: { label: string; date: string }[];
  /** Estimated read time */
  readingMinutes: number;
}

export interface CompanyProfile {
  id: string;
  name: string;
  aliases: string[];
  markets: string[];
  caseIds: string[];
  conductThemes: ConductTag[];
  blurb: string;
  /** Multi-paragraph plain-English company background */
  overview?: string[];
  /** Competition and antitrust exposure themes */
  competitionFootprint?: string[];
  /** Impact on consumers and businesses */
  consumerAndBusinessAngle?: string[];
  /** Short forward-looking watch items */
  whatToWatch?: string[];
}

export interface SituationTemplate {
  id: string;
  label: string;
  description: string;
  conduct: ConductTag[];
  roles: Role[];
  potentialIssues: string[];
  evidenceMatters: string[];
  lawIds: string[];
  filingPathIds: string[];
}

export interface AnalysisBrief {
  situationId: string;
  role: Role;
  jurisdiction: Jurisdiction;
  freeText?: string;
  potentialIssues: string[];
  laws: LawRef[];
  filingPaths: FilingPath[];
  similarCases: CompetitionCase[];
  evidenceMatters: string[];
  whoCanFile: string[];
  caveats: string[];
  companyMatches: CompanyProfile[];
}
