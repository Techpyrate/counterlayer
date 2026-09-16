import type { CompetitionCase } from "@/data/types";
import {
  currentCounselMatters,
  evidencePrompts,
  forumLabel,
  frameworksFor,
  issueById,
  routesFor,
  type DeskForum,
  type IssueKind,
} from "@/lib/attorneyDesk";

export type MatterStatus = "intake" | "theory" | "evidence" | "filing" | "hearing" | "monitor";

export type Representation =
  | "advise"
  | "defend"
  | "complainant"
  | "clearance"
  | "leniency";

export type MarketNotes = {
  product: string;
  geographic: string;
  shares: string;
  barriers: string;
  switching: string;
  customers: string;
};

export type CounselMatter = {
  id: string;
  updatedAt: string;
  title: string;
  client: string;
  counterparty: string;
  forum: DeskForum | "Both";
  issue: IssueKind;
  representation: Representation;
  status: MatterStatus;
  market: string;
  facts: string;
  nextAction: string;
  checked: string[];
  citedCaseIds: string[];
  marketNotes: MarketNotes;
};

export const matterStatuses: { id: MatterStatus; label: string }[] = [
  { id: "intake", label: "Intake" },
  { id: "theory", label: "Theory" },
  { id: "evidence", label: "Evidence" },
  { id: "filing", label: "Filing" },
  { id: "hearing", label: "Hearing" },
  { id: "monitor", label: "Monitor" },
];

export const representations: { id: Representation; label: string }[] = [
  { id: "advise", label: "Advice / counseling" },
  { id: "defend", label: "Defense" },
  { id: "complainant", label: "Complainant / plaintiff" },
  { id: "clearance", label: "Merger clearance" },
  { id: "leniency", label: "Leniency / marker" },
];

export type PracticeItem = {
  id: string;
  label: string;
  detail: string;
  forums: Array<DeskForum | "Both">;
  issues: IssueKind[] | "all";
  representations?: Representation[];
};

const allForums: Array<DeskForum | "Both"> = ["US", "EU", "Both"];

export const elementChecks: PracticeItem[] = [
  {
    id: "market-narrow",
    label: "Candidate market is stated narrowly enough to test, and widely enough to survive",
    detail: "Write the product and geographic market you would defend in a filing. Note the next-wider market the other side will push.",
    forums: allForums,
    issues: "all",
  },
  {
    id: "recent-change",
    label: "The conduct or deal is current, not a historical grievance",
    detail: "Date the change: signing, policy switch, price move, suspension, or rival exit. Agencies staff what is happening now.",
    forums: allForums,
    issues: "all",
  },
  {
    id: "effects-trade",
    label: "US interstate commerce or EU effect on trade is identified",
    detail: "Do not assume a local dispute is federal or an EU case. Name the cross-border or interstate effect.",
    forums: allForums,
    issues: "all",
  },
  {
    id: "us-injury",
    label: "US antitrust injury and standing are mapped if you will sue or defend a suit",
    detail: "Injury must flow from reduced competition, not just a contract loss. Illinois Brick and state-repealer issues if damages are claimed.",
    forums: ["US", "Both"],
    issues: "all",
    representations: ["advise", "defend", "complainant"],
  },
  {
    id: "hsr-reportable",
    label: "HSR reportability is checked against current size-of-transaction and size-of-person tests",
    detail: "Thresholds are adjusted annually. Confirm today's FTC figures, exemptions, and whether a filing is required before any integration.",
    forums: ["US", "Both"],
    issues: ["merger"],
  },
  {
    id: "gun-jumping",
    label: "Gun-jumping / standstill line is drawn",
    detail: "Beneficial ownership and ordinary-course planning are not the same as directing the target's competitive decisions before clearance.",
    forums: ["US", "EU", "Both"],
    issues: ["merger"],
    representations: ["advise", "clearance", "defend"],
  },
  {
    id: "overlap",
    label: "Horizontal overlap, vertical link, or conglomerate theory is specified",
    detail: "A 'concentration' label is not a theory. Name the overlap products or the input/customer foreclosure route.",
    forums: allForums,
    issues: ["merger"],
  },
  {
    id: "efficiencies",
    label: "Efficiencies are merger-specific, verifiable, and passed through — or they are not being claimed",
    detail: "Do not put efficiencies in a client letter you cannot support with documents.",
    forums: allForums,
    issues: ["merger"],
    representations: ["advise", "clearance", "defend"],
  },
  {
    id: "eu-dimension",
    label: "EU dimension versus national filing or referral is decided",
    detail: "Turnover thresholds, Article 4(5) / Article 22 paths, and one-stop-shop. Confirm against the current Merger Regulation practice.",
    forums: ["EU", "Both"],
    issues: ["merger"],
  },
  {
    id: "dominance-share",
    label: "Power is more than a share number",
    detail: "US: monopoly power or dangerous probability. EU: dominance. Add barriers, duration, and ability to act independently of customers and rivals.",
    forums: allForums,
    issues: ["dominance", "market_access", "dma"],
  },
  {
    id: "exclusionary-act",
    label: "A specific exclusionary act is identified",
    detail: "Tying, exclusive dealing, refusal, self-preferencing, or predatory price. High share without an act is not a case.",
    forums: allForums,
    issues: ["dominance", "vertical", "market_access", "ftc"],
  },
  {
    id: "objective-justification",
    label: "The other side's justification is written down before you ignore it",
    detail: "Security, quality, free-riding, or capacity. EU abuse analysis and US rule-of-reason cases both ask this.",
    forums: allForums,
    issues: ["dominance", "vertical", "market_access", "dma"],
  },
  {
    id: "agreement-plus",
    label: "Agreement or concerted practice is separated from conscious parallelism",
    detail: "Parallel prices need plus factors. Do not call a oligopoly a cartel in a filing.",
    forums: allForums,
    issues: ["cartel"],
  },
  {
    id: "leniency-race",
    label: "Leniency timing is decided before outreach",
    detail: "DOJ first-in corporate leniency and Commission immunity have different conditions. Do not contact counterparties about a confession before this call is made.",
    forums: allForums,
    issues: ["cartel"],
    representations: ["advise", "defend", "leniency"],
  },
  {
    id: "criminal-split",
    label: "US criminal exposure is split from EU administrative procedure",
    detail: "A Commission fine file and a US grand-jury risk are not the same record. Who speaks, and in which proceeding, is a counsel decision.",
    forums: ["Both"],
    issues: ["cartel", "ftc"],
  },
  {
    id: "ftc-lane",
    label: "FTC Act §5 theory is stated separately from Sherman Act counts",
    detail: "Unfair methods can be broader. After AMG Capital, do not assume §13(b) yields monetary relief. Confirm the current remedy path.",
    forums: ["US", "Both"],
    issues: ["ftc", "dominance", "vertical"],
  },
  {
    id: "dma-designation",
    label: "DMA designation status is confirmed, not assumed",
    detail: "Core platform service, gatekeeper decision, and the specific obligation (self-preferencing, data use, interoperability, sideloading).",
    forums: ["EU", "Both"],
    issues: ["dma", "market_access", "dominance"],
  },
  {
    id: "dma-plus-102",
    label: "Article 102 is kept as a parallel theory if designation is disputed",
    detail: "DMA is ex-ante regulation. It does not retire dominance cases. Say which file you are actually opening.",
    forums: ["EU", "Both"],
    issues: ["dma"],
  },
  {
    id: "foreclosure-share",
    label: "Foreclosure share and duration are estimated",
    detail: "Exclusive dealing, MFN, or tying needs a foreclosure story, not a clause quote alone.",
    forums: allForums,
    issues: ["vertical", "dominance"],
  },
  {
    id: "platform-alt",
    label: "Alternative route to users is tested for this quarter",
    detail: "If rivals can still reach customers, say so. If the platform is the market, prove that with current switching data.",
    forums: allForums,
    issues: ["market_access", "dma"],
  },
];

export const procedureSteps: PracticeItem[] = [
  {
    id: "hsr-clock",
    label: "US HSR clock",
    detail: "Both sides file. Waiting period is generally 30 days (shorter for some cash tenders) unless early termination or a second request. Pull the current filing fee and thresholds from the FTC before you calendar a closing.",
    forums: ["US", "Both"],
    issues: ["merger"],
  },
  {
    id: "second-request",
    label: "Second request posture",
    detail: "Timing agreements, custodians, and pull-and-refile are strategy choices. Do not integrate while the clock is open.",
    forums: ["US", "Both"],
    issues: ["merger"],
  },
  {
    id: "state-ag-merger",
    label: "State AG parallel review",
    detail: "A federal clearance does not bind every state AG. Identify states where customers or facilities sit.",
    forums: ["US", "Both"],
    issues: ["merger", "ftc"],
  },
  {
    id: "form-co",
    label: "EU Form CO / short form",
    detail: "Phase I is 25 working days, often extended to 35 if remedies are offered. Phase II is 90 working days with statutory extensions. Confirm the current implementing rules before you promise a date to the client.",
    forums: ["EU", "Both"],
    issues: ["merger"],
  },
  {
    id: "standstill",
    label: "Article 7 standstill",
    detail: "No implementation of a notifiable concentration before clearance, unless a derogation is granted.",
    forums: ["EU", "Both"],
    issues: ["merger"],
  },
  {
    id: "ftc-part2",
    label: "FTC investigation path",
    detail: "Complaint to ReportFraud or the Bureau of Competition is not a private case. A Part 2 investigation, CID, and compulsory process are staff tools. Track what you send — it can be discoverable later.",
    forums: ["US", "Both"],
    issues: ["ftc", "dominance", "vertical", "merger", "market_access"],
  },
  {
    id: "doj-citizen",
    label: "DOJ Antitrust Division",
    detail: "Cartel and merger tips go to the Division, not only the FTC. Criminal cartel matters stay with DOJ. Civil monopolization can sit with either agency — check clearance before you assume the forum.",
    forums: ["US", "Both"],
    issues: ["cartel", "dominance", "merger"],
  },
  {
    id: "ec-rfi",
    label: "Commission investigation",
    detail: "Complaint, request for information, statement of objections, and hearing are different stages. In-house EU privilege is narrower than US attorney-client privilege — flag that before employees write to internal counsel.",
    forums: ["EU", "Both"],
    issues: "all",
  },
  {
    id: "nca-lane",
    label: "National authority versus Commission",
    detail: "If effects are in one member state, the NCA may be the right first filing. DMA gatekeeper obligations are a Commission lane even when a national antitrust case also exists.",
    forums: ["EU", "Both"],
    issues: ["dma", "dominance", "cartel", "market_access"],
  },
  {
    id: "leniency-marker",
    label: "Marker before narrative",
    detail: "If leniency is live, get the marker mechanics from current DOJ and Commission notices. Do not draft a public complaint in parallel.",
    forums: allForums,
    issues: ["cartel"],
    representations: ["leniency", "advise", "defend"],
  },
];

export const evidenceRequests: PracticeItem[] = [
  {
    id: "hold",
    label: "Litigation hold",
    detail: "Custodians, chat tools, personal devices used for work, and deal rooms. Issue the hold before outreach to the other side.",
    forums: allForums,
    issues: "all",
  },
  {
    id: "deal-docs",
    label: "Transaction documents and board materials",
    detail: "Agreement, synergies deck, CIM, banker's book, and any document that would be an HSR Item 4(c)/(4)(d) document.",
    forums: allForums,
    issues: ["merger"],
  },
  {
    id: "win-loss",
    label: "Win/loss and pricing files for the last 24 months",
    detail: "Current diversion beats a 2014 market study. Keep the window recent unless you are dating a continuing course of conduct.",
    forums: allForums,
    issues: "all",
  },
  {
    id: "contracts",
    label: "Top customer and supplier contracts",
    detail: "Exclusivity, MFN, termination, and any change-of-control clause that becomes a gun-jumping or foreclosure fact.",
    forums: allForums,
    issues: ["merger", "vertical", "dominance", "market_access"],
  },
  {
    id: "ranking",
    label: "Ranking, defaults, and access rules",
    detail: "What changed, who decided, and what the A/B test or business review said. Needed for self-preferencing and platform-access theories.",
    forums: allForums,
    issues: ["dma", "market_access", "dominance", "ftc"],
  },
  {
    id: "comms",
    label: "Competitor communications",
    detail: "Email, chat, trade-association notes, and signal/whatsapp if used for pricing. Privilege-review before anyone reads a cartel file into a civil memo.",
    forums: allForums,
    issues: ["cartel", "ftc"],
  },
  {
    id: "privilege-log",
    label: "Privilege split: US outside counsel vs EU in-house",
    detail: "A memo that is privileged in a US court may not be privileged in a Commission file. Label audiences before circulating this workspace's export.",
    forums: ["EU", "Both"],
    issues: "all",
  },
];

export function itemsFor(
  items: PracticeItem[],
  forum: DeskForum | "Both",
  issue: IssueKind,
  representation: Representation,
): PracticeItem[] {
  return items.filter((item) => {
    const forumOk = item.forums.includes(forum) || item.forums.includes("Both") || forum === "Both";
    const issueOk = item.issues === "all" || item.issues.includes(issue);
    const sideOk = !item.representations || item.representations.includes(representation);
    return forumOk && issueOk && sideOk;
  });
}

export function blankMatter(): CounselMatter {
  const now = new Date().toISOString();
  return {
    id: `m-${Date.now().toString(36)}`,
    updatedAt: now,
    title: "New matter",
    client: "",
    counterparty: "",
    forum: "Both",
    issue: "dominance",
    representation: "advise",
    status: "intake",
    market: "",
    facts: "",
    nextAction: "",
    checked: [],
    citedCaseIds: [],
    marketNotes: {
      product: "",
      geographic: "",
      shares: "",
      barriers: "",
      switching: "",
      customers: "",
    },
  };
}

const KEY_PREFIX = "counterlayer:attorney-matters:";

export function loadMatters(email: string): CounselMatter[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY_PREFIX + email.toLowerCase());
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CounselMatter[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMatters(email: string, matters: CounselMatter[]) {
  localStorage.setItem(KEY_PREFIX + email.toLowerCase(), JSON.stringify(matters));
}

export function whyCite(c: CompetitionCase, issue: IssueKind): string {
  const spec = issueById(issue);
  const hit = c.conduct.filter((tag) => spec.conducts.includes(tag));
  const hook = hit.length
    ? `Overlaps your issue tags (${hit.join(", ")}).`
    : "Same forum and still open — use only if the market story is actually close.";
  return `${hook} Status is ${c.status.replace(/_/g, " ")}, so treat it as a live comparison, not a closed holding.`;
}

export function sevenDayPlan(matter: CounselMatter): string[] {
  const spec = issueById(matter.issue);
  const base = [
    `Confirm forum (${forumLabel(matter.forum)}) and whether a second forum must be walled off.`,
    "Issue a hold to the custodians who actually have the last 24 months of pricing, win/loss, and board materials.",
    `Write the market in one sentence: ${matter.market.trim() || "[market not stated yet]"}.`,
  ];
  if (matter.representation === "leniency") {
    return [
      "Stop outbound contacts about the conduct until marker strategy is decided.",
      "Identify who has already spoken to a competitor or an authority.",
      ...base,
    ];
  }
  if (matter.representation === "clearance" || matter.issue === "merger") {
    return [
      "Calendar HSR or Form CO against current thresholds — do not reuse last year's numbers.",
      "List integration steps that must wait for clearance.",
      ...base,
    ];
  }
  if (matter.representation === "complainant") {
    return [
      `Draft the theory in the authority's language: ${spec.label}.`,
      "Attach only documents you are willing to have in the agency file.",
      ...base,
    ];
  }
  return [
    `Pressure-test the ${spec.label} theory against the justification the other side will file.`,
    "Decide what is for the client letter and what is not ready.",
    ...base,
  ];
}

export function buildCounselMemo(matter: CounselMatter): string {
  const spec = issueById(matter.issue);
  const laws = frameworksFor(matter.forum, spec.lawIds);
  const routes = routesFor(matter.forum, spec.pathIds);
  const matches = currentCounselMatters(matter.forum, spec.conducts);
  const cited = matches.filter((c) => matter.citedCaseIds.includes(c.id));
  const shown = cited.length ? cited : matches.slice(0, 5);
  const elements = itemsFor(elementChecks, matter.forum, matter.issue, matter.representation);
  const procedure = itemsFor(procedureSteps, matter.forum, matter.issue, matter.representation);
  const evidence = itemsFor(evidenceRequests, matter.forum, matter.issue, matter.representation);
  const openElements = elements.filter((e) => !matter.checked.includes(e.id));
  const doneElements = elements.filter((e) => matter.checked.includes(e.id));
  const side = representations.find((r) => r.id === matter.representation)?.label ?? matter.representation;
  const status = matterStatuses.find((s) => s.id === matter.status)?.label ?? matter.status;

  const lines = [
    `# Counsel work memo — ${matter.title || "Untitled matter"}`,
    "",
    "Privileged and confidential — attorney work product. Prepared as a diligence aid inside CounterLayer. Confirm citations, thresholds, and deadlines against primary sources before relying on them. Not a filing.",
    "",
    `Updated: ${matter.updatedAt}`,
    `Status: ${status}`,
    `Representation: ${side}`,
    `Forum: ${forumLabel(matter.forum)}`,
    `Issue: ${spec.label}`,
    `Client: ${matter.client || "—"}`,
    `Counterparty: ${matter.counterparty || "—"}`,
    `Market label: ${matter.market || "—"}`,
    "",
    "## Assignment",
    "",
    matter.facts.trim() || "_No facts recorded yet._",
    "",
    matter.nextAction.trim() ? `Next action: ${matter.nextAction.trim()}` : "Next action: _not set._",
    "",
    "## Market worksheet",
    "",
    `- Product: ${matter.marketNotes.product || "—"}`,
    `- Geographic: ${matter.marketNotes.geographic || "—"}`,
    `- Shares / diversion: ${matter.marketNotes.shares || "—"}`,
    `- Barriers: ${matter.marketNotes.barriers || "—"}`,
    `- Switching: ${matter.marketNotes.switching || "—"}`,
    `- Customers who matter: ${matter.marketNotes.customers || "—"}`,
    "",
    "## Frameworks",
    "",
    ...laws.map((law) => `- **${law.name}** (${law.citation}). ${law.summary}`),
    "",
    "## Open elements",
    "",
    ...(openElements.length
      ? openElements.map((e) => `- [ ] ${e.label} — ${e.detail}`)
      : ["- All listed elements are checked. Re-read them before a filing."]),
    "",
    "## Checked",
    "",
    ...(doneElements.length ? doneElements.map((e) => `- [x] ${e.label}`) : ["- None checked."]),
    "",
    "## Procedure to calendar",
    "",
    ...procedure.map((p) => `- **${p.label}.** ${p.detail}`),
    "",
    "## Where a filing would go",
    "",
    ...routes.map((p) => `- ${p.agency}: ${p.name}. ${p.howToStart} (${p.url})`),
    "",
    "## Current comparable matters",
    "",
    cited.length
      ? "_Cited by counsel from the live desk._"
      : "_No matters marked for citation. Showing the closest live matches — ongoing or appealed only._",
    "",
    ...shown.map(
      (c) =>
        `- **${c.shortName || c.name}** (${c.jurisdictions.join("/")}, ${c.status}, ${c.yearStart}${c.yearEnd ? `–${c.yearEnd}` : "–"}). ${c.summary} Theory on file: ${c.regulatorArgument}`,
    ),
    "",
    "## Evidence plan",
    "",
    ...evidence.map((e) => `- **${e.label}.** ${e.detail}`),
    "",
    "## Questions still open",
    "",
    ...evidencePrompts(matter.issue, matter.forum).map((q) => `- ${q}`),
    "",
    "## Next 7 days",
    "",
    ...sevenDayPlan(matter).map((step, i) => `${i + 1}. ${step}`),
    "",
    "## Limits",
    "",
    "This memo is the matter file. Use the Live dockets and Thresholds tabs for CourtListener, the Commission registers, and the current HSR / Article 1 tests. Filing still happens in the official portal under your own login. This is not a legal opinion.",
    "",
  ];
  return lines.join("\n");
}
