import { cases } from "@/data/cases";
import { lawById } from "@/data/laws";
import { filingById } from "@/data/pathways";
import type { CompetitionCase, ConductTag, Jurisdiction, LawRef, FilingPath } from "@/data/types";

export type DeskForum = "US" | "EU";

export type IssueKind =
  | "merger"
  | "dominance"
  | "cartel"
  | "ftc"
  | "dma"
  | "vertical"
  | "market_access";

export const issueOptions: {
  id: IssueKind;
  label: string;
  hint: string;
  conducts: ConductTag[];
  lawIds: string[];
  pathIds: string[];
}[] = [
  {
    id: "merger",
    label: "Merger / concentration",
    hint: "HSR, Clayton §7, EU Merger Regulation — current deals, not closed historical archive.",
    conducts: ["merger"],
    lawIds: ["clayton-7", "hart-scott", "eu-merger", "ftc-5"],
    pathIds: ["ftc-complaint", "doj-antitrust", "ec-complaint"],
  },
  {
    id: "dominance",
    label: "Dominance / monopolization",
    hint: "Sherman §2 and TFEU Article 102 — exclusion, tying, refusal, self-preferencing.",
    conducts: ["abuse_of_dominance", "self_preferencing", "tying", "refusal_to_deal"],
    lawIds: ["sherman-2", "ftc-5", "tfeu-102", "dma"],
    pathIds: ["ftc-complaint", "doj-antitrust", "ec-complaint", "nca", "private-suit"],
  },
  {
    id: "cartel",
    label: "Coordination / cartel",
    hint: "Sherman §1 and TFEU Article 101 — price, allocation, bid-rigging.",
    conducts: ["price_fix", "cartel_coordination"],
    lawIds: ["sherman-1", "ftc-5", "tfeu-101"],
    pathIds: ["doj-antitrust", "ftc-complaint", "ec-complaint", "nca"],
  },
  {
    id: "ftc",
    label: "FTC competition / unfair methods",
    hint: "FTC Act §5 standalone and unfair-methods theories in current US practice.",
    conducts: ["discrimination", "self_preferencing", "exclusivity"],
    lawIds: ["ftc-5", "sherman-1", "sherman-2"],
    pathIds: ["ftc-complaint", "state-ag", "private-suit"],
  },
  {
    id: "dma",
    label: "EU market regulation (DMA)",
    hint: "Gatekeeper obligations running beside classic EU antitrust.",
    conducts: ["self_preferencing", "interoperability", "data_lockin", "market_access"],
    lawIds: ["dma", "tfeu-102", "tfeu-101"],
    pathIds: ["ec-complaint", "nca"],
  },
  {
    id: "vertical",
    label: "Vertical restraints",
    hint: "Exclusive dealing, MFN, resale limits — US and EU.",
    conducts: ["exclusivity", "vertical_restraint", "resale_restriction", "tying"],
    lawIds: ["clayton-3", "sherman-1", "ftc-5", "tfeu-101"],
    pathIds: ["ftc-complaint", "doj-antitrust", "ec-complaint", "private-suit"],
  },
  {
    id: "market_access",
    label: "Market access / platform rules",
    hint: "Suspension, interoperability, data lock-in affecting rivals or business users.",
    conducts: ["market_access", "platform_suspension", "interoperability", "data_lockin"],
    lawIds: ["sherman-2", "ftc-5", "tfeu-102", "dma"],
    pathIds: ["ftc-complaint", "ec-complaint", "nca", "private-suit"],
  },
];

export function issueById(id: IssueKind) {
  return issueOptions.find((i) => i.id === id) ?? issueOptions[0]!;
}

function matchesForum(c: CompetitionCase, forum: DeskForum | "Both"): boolean {
  if (forum === "Both") {
    return c.jurisdictions.some((j) => j === "US" || j === "EU" || j === "Both");
  }
  return c.jurisdictions.includes(forum) || c.jurisdictions.includes("Both");
}

/** Live and appealed matters only — not settled historical archive. */
export function currentCounselMatters(
  forum: DeskForum | "Both",
  conducts: ConductTag[],
): CompetitionCase[] {
  const live = cases.filter(
    (c) =>
      (c.status === "ongoing" || c.status === "appealed") &&
      matchesForum(c, forum),
  );
  const tagged = live.filter((c) => c.conduct.some((tag) => conducts.includes(tag)));
  const pool = tagged.length > 0 ? tagged : live;
  return [...pool].sort((a, b) => b.yearStart - a.yearStart).slice(0, 8);
}

export function frameworksFor(
  forum: DeskForum | "Both",
  lawIds: string[],
): LawRef[] {
  return lawIds
    .map((id) => lawById[id])
    .filter((law): law is LawRef => Boolean(law))
    .filter((law) => {
      if (forum === "Both") return law.jurisdiction === "US" || law.jurisdiction === "EU";
      return law.jurisdiction === forum;
    });
}

export function routesFor(
  forum: DeskForum | "Both",
  pathIds: string[],
): FilingPath[] {
  return pathIds
    .map((id) => filingById[id])
    .filter((p): p is FilingPath => Boolean(p))
    .filter((p) => {
      if (forum === "Both") return p.jurisdiction === "US" || p.jurisdiction === "EU" || p.jurisdiction === "Both";
      return p.jurisdiction === forum || p.jurisdiction === "Both";
    });
}

export function evidencePrompts(issue: IssueKind, forum: DeskForum | "Both"): string[] {
  const shared = [
    "Who are the parties, and what is the narrowest market you can defend with shares or switching data?",
    "What changed recently — a deal, a policy, a price, a suspension, or a rival exit?",
    "What documents show intent, duration, and who was harmed or foreclosed?",
  ];
  const extra: Record<IssueKind, string[]> = {
    merger: [
      "Are HSR or EU Merger Regulation thresholds met, and what is the expected filing date?",
      "Overlap products, diversion, and any failing-firm or efficiency story counsel must test.",
    ],
    dominance: [
      "Market share plus barriers: data, defaults, switching costs, or must-have status.",
      "The specific exclusionary act — not just high share.",
    ],
    cartel: [
      "Communications, parallel moves, and any whistleblower or leniency timing.",
      "US criminal exposure vs EU administrative fines — keep those tracks separate.",
    ],
    ftc: [
      "Is the theory Sherman Act, standalone FTC Act §5, or both?",
      "Consumer injury facts the FTC would actually staff.",
    ],
    dma: [
      "Is the firm a designated gatekeeper, and which obligation is in play?",
      "Parallel Article 102 theory if DMA designation is disputed.",
    ],
    vertical: [
      "Intra-brand vs inter-brand effects, and any safe-harbour or block-exemption argument.",
      "Foreclosure share and duration of the exclusive or MFN term.",
    ],
    market_access: [
      "Objective justification the platform or supplier will raise.",
      "Whether rivals can reach users another way in this quarter, not years ago.",
    ],
  };
  const forumNote =
    forum === "US"
      ? "Confirm federal vs state AG lane before drafting the client letter."
      : forum === "EU"
        ? "Confirm Commission vs national authority (and whether the UK CMA is a separate mandate)."
        : "Split the memo: US authorities and EU authorities do not share one procedure.";
  return [...shared, ...extra[issue], forumNote];
}

export function forumLabel(forum: DeskForum | "Both"): string {
  if (forum === "US") return "United States";
  if (forum === "EU") return "European Union";
  return "US and EU";
}

export function jurisdictionMatch(j: Jurisdiction, forum: DeskForum | "Both"): boolean {
  if (forum === "Both") return j === "US" || j === "EU" || j === "Both";
  return j === forum || j === "Both";
}
