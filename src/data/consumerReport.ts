import type { FilingPath, Jurisdiction } from "./types";
import { filingById } from "./pathways";

export type ConsumerIssueId =
  | "price-hike"
  | "cant-cancel"
  | "refund-denied"
  | "hidden-fees"
  | "auto-renew-sneak"
  | "gift-card-lost"
  | "loyalty-forfeited"
  | "license-revoked"
  | "forced-bundle"
  | "no-alternatives"
  | "deceptive-offer"
  | "bait-and-switch"
  | "hard-switch"
  | "resale-blocked"
  | "repair-lockout"
  | "geo-block"
  | "platform-ban-consumer"
  | "delivery-failed"
  | "defective-product"
  | "warranty-denied"
  | "unauthorized-charges"
  | "privacy-data-misuse"
  | "robocalls-spam"
  | "insurance-denied"
  | "medical-bill-surprise"
  | "merger-hurt-choice"
  | "predatory-fees"
  | "contract-trap"
  | "other"
  | "custom";

export type ReportLane = "consumer_protection" | "competition_tip" | "both";

export type ConsumerIssueCategory =
  | "billing"
  | "digital"
  | "marketplace"
  | "pricing"
  | "deceptive"
  | "privacy"
  | "other";

export interface ConsumerIssue {
  id: ConsumerIssueId;
  label: string;
  description: string;
  category: ConsumerIssueCategory;
  primaryLane: ReportLane;
  evidence: string[];
  pathwayIds: string[];
  whyCompetitionMayMatter: string;
  whyConsumerProtectionMayMatter: string;
}

export const consumerIssueCategories: {
  id: ConsumerIssueCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "billing",
    label: "Billing & subscriptions",
    description: "Charges, renewals, refunds, and cancel flows",
  },
  {
    id: "digital",
    label: "Digital goods & access",
    description: "Licenses, downloads, switching, and ownership",
  },
  {
    id: "marketplace",
    label: "Marketplace & delivery",
    description: "Platforms, shipping, product quality, warranties",
  },
  {
    id: "pricing",
    label: "Prices & fees",
    description: "Unexpected price jumps, junk fees, forced add-ons, geo price blocks",
  },
  {
    id: "deceptive",
    label: "Deceptive practices",
    description: "Misleading ads, bait-and-switch, spam",
  },
  {
    id: "privacy",
    label: "Privacy & unauthorized use",
    description: "Data misuse, mystery charges, identity issues",
  },
  {
    id: "other",
    label: "Other / describe your own",
    description: "Custom situation — tell us in your words",
  },
];

export const consumerIssues: ConsumerIssue[] = [
  {
    id: "cant-cancel",
    label: "Hard to cancel / auto-renew trap",
    description:
      "Subscription or membership is difficult to cancel, or renews without clear consent.",
    category: "billing",
    primaryLane: "consumer_protection",
    evidence: [
      "Screenshots of cancel flow",
      "Emails/receipts showing renewal",
      "Terms shown at signup vs now",
      "Time spent / dead ends in cancel process",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Usually not classic antitrust — unless lock-in is used industry-wide to block switching between rivals.",
    whyConsumerProtectionMayMatter:
      "Dark patterns, negative option billing, and unfair cancellation practices are core consumer-protection concerns.",
  },
  {
    id: "refund-denied",
    label: "Refund denied or delayed unfairly",
    description:
      "You returned a product, canceled within the stated window, or were charged in error — refund refused or stalled.",
    category: "billing",
    primaryLane: "consumer_protection",
    evidence: [
      "Return confirmation or tracking",
      "Refund policy at time of purchase",
      "Support chat/email threads",
      "Bank/card statements",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Rare unless refund policies are enforced to protect a dominant platform over rivals.",
    whyConsumerProtectionMayMatter:
      "Refund rights under distance-selling rules and unfair practice laws are a primary consumer-protection topic.",
  },
  {
    id: "hidden-fees",
    label: "Hidden fees at checkout",
    description:
      "Final price was much higher than advertised because of fees added late in checkout.",
    category: "billing",
    primaryLane: "consumer_protection",
    evidence: [
      "Screenshots of ad price vs checkout total",
      "Itemized fee breakdown",
      "Terms mentioning fees (if any)",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Generally a consumer-protection issue unless fees are industry-wide and raise barriers to switching.",
    whyConsumerProtectionMayMatter:
      "Drip pricing and junk fees are active enforcement priorities in the US and EU.",
  },
  {
    id: "auto-renew-sneak",
    label: "Free trial converted without clear warning",
    description:
      "A trial ended and you were charged without a clear, timely reminder or easy opt-out.",
    category: "billing",
    primaryLane: "consumer_protection",
    evidence: [
      "Trial signup page screenshots",
      "Renewal charge on statement",
      "Emails (or lack of reminder emails)",
      "Cancel flow after charge",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Negative-option billing is usually consumer law, not antitrust.",
    whyConsumerProtectionMayMatter:
      "FTC and EU authorities have repeatedly targeted trial-to-paid conversions with dark patterns.",
  },
  {
    id: "gift-card-lost",
    label: "Gift card balance lost or expired unfairly",
    description:
      "Gift card value disappeared, expired early, or fees ate the balance unexpectedly.",
    category: "billing",
    primaryLane: "consumer_protection",
    evidence: [
      "Gift card terms",
      "Purchase receipt",
      "Balance history screenshots",
      "State where card was bought/redeemed",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Not typically a competition issue.",
    whyConsumerProtectionMayMatter:
      "Many states restrict gift-card expiry and fees; unfair balance forfeiture may be reportable.",
  },
  {
    id: "loyalty-forfeited",
    label: "Loyalty points or credits forfeited",
    description:
      "Points, miles, or store credit vanished after a policy change, account closure, or merger.",
    category: "billing",
    primaryLane: "consumer_protection",
    evidence: [
      "Points balance before/after",
      "Program terms at enrollment",
      "Notice of change (if any)",
      "Account statements",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Program changes after a merger can intersect with reduced choice — competition tip possible.",
    whyConsumerProtectionMayMatter:
      "Unilateral changes to earned benefits may be unfair if consumers had no meaningful notice.",
  },
  {
    id: "license-revoked",
    label: "Digital purchase or license revoked",
    description:
      "Access to a game, book, movie, cloud file, or software you paid for was removed.",
    category: "digital",
    primaryLane: "consumer_protection",
    evidence: [
      "Purchase receipt / order number",
      "License terms at time of purchase",
      "Revocation notice",
      "Whether you can export the content",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Competition angles appear if revocation cements lock-in across a dominant store or catalog.",
    whyConsumerProtectionMayMatter:
      "Often a contract / unfair practices story: what you were told you ‘bought’ vs a revocable license.",
  },
  {
    id: "hard-switch",
    label: "Can’t switch / can’t take my data",
    description:
      "Leaving the service is hard: data stuck, purchases non-transferable, high exit costs.",
    category: "digital",
    primaryLane: "both",
    evidence: [
      "Export attempts and error messages",
      "List of locked purchases",
      "Switching cost estimates",
      "Policy pages on portability",
    ],
    pathwayIds: ["ftc-complaint", "ec-complaint", "nca", "consumer-protection"],
    whyCompetitionMayMatter:
      "Lock-in and blocked portability can weaken competition if customers cannot move to rivals.",
    whyConsumerProtectionMayMatter:
      "Unfair retention tactics and opaque data practices may still be reportable as consumer harm.",
  },
  {
    id: "resale-blocked",
    label: "Told I can’t resell what I bought",
    description:
      "Tickets, devices, software, or goods come with resale bans or punishment for reselling.",
    category: "digital",
    primaryLane: "both",
    evidence: [
      "Contract / packaging terms",
      "Account warnings",
      "Proof of purchase",
      "How the ban is enforced",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "ec-complaint", "consumer-protection"],
    whyCompetitionMayMatter:
      "Resale restrictions can raise vertical-restraint questions in some markets.",
    whyConsumerProtectionMayMatter:
      "Consumers may have been misled about ‘ownership’ versus restricted license rights.",
  },
  {
    id: "repair-lockout",
    label: "Blocked from repairing my device",
    description:
      "Manufacturer or software blocks third-party repair, parts, or diagnostics (right-to-repair angle).",
    category: "digital",
    primaryLane: "both",
    evidence: [
      "Error messages when using independent repair",
      "Warranty void warnings",
      "Parts pairing / software lock messages",
      "Repair quotes from authorized vs independent shops",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Repair restrictions can foreclose independent service markets and extend manufacturer power.",
    whyConsumerProtectionMayMatter:
      "Consumers may pay more and wait longer when repair is artificially restricted.",
  },
  {
    id: "platform-ban-consumer",
    label: "Account banned or purchases frozen",
    description:
      "Your user account was suspended and you lost access to paid content or funds.",
    category: "marketplace",
    primaryLane: "consumer_protection",
    evidence: [
      "Ban notice and policy cited",
      "Purchase history",
      "Appeal attempts",
      "Whether similarly situated accounts stay active (if known)",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Competition theories are weaker unless bans systematically favor the platform’s own products.",
    whyConsumerProtectionMayMatter:
      "Access to paid digital goods, refunds, and fair process are frequently consumer-protection matters.",
  },
  {
    id: "delivery-failed",
    label: "Order never arrived or was substituted",
    description:
      "Paid for goods that never showed up, arrived damaged, or were replaced without consent.",
    category: "marketplace",
    primaryLane: "consumer_protection",
    evidence: [
      "Order confirmation and tracking",
      "Photos of damage or wrong item",
      "Seller/platform responses",
      "Chargeback outcome (if any)",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Not usually antitrust unless marketplace rules systematically favor certain sellers.",
    whyConsumerProtectionMayMatter:
      "Distance-selling and marketplace liability rules often protect buyers in these scenarios.",
  },
  {
    id: "defective-product",
    label: "Defective or unsafe product",
    description:
      "Product broke quickly, doesn’t work as advertised, or poses a safety concern.",
    category: "marketplace",
    primaryLane: "consumer_protection",
    evidence: [
      "Photos/video of defect",
      "Purchase date and warranty",
      "Recall notices (if any)",
      "Injury or property damage records",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Safety failures across an industry may involve standards-setting — rarely pure antitrust.",
    whyConsumerProtectionMayMatter:
      "Product safety, warranty, and misrepresentation claims are core consumer-protection paths.",
  },
  {
    id: "warranty-denied",
    label: "Warranty or guarantee refused",
    description:
      "Manufacturer or seller refused honor a written warranty without a valid reason.",
    category: "marketplace",
    primaryLane: "consumer_protection",
    evidence: [
      "Warranty document",
      "Proof of purchase",
      "Denial letter or support transcript",
      "Independent repair assessment",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Unlikely unless warranty policies are used to block independent repair markets.",
    whyConsumerProtectionMayMatter:
      "Magnuson-Moss (US) and EU consumer guarantee rules create enforceable warranty expectations.",
  },
  {
    id: "price-hike",
    label: "Sudden or unexplained price increase",
    description:
      "Prices jumped sharply, especially after a merger or across several brands at once.",
    category: "pricing",
    primaryLane: "both",
    evidence: [
      "Before/after screenshots or statements",
      "Dates of the increase",
      "Whether rivals moved at the same time",
      "Any notice or “cost” explanation you received",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection", "doj-antitrust"],
    whyCompetitionMayMatter:
      "Parallel unexplained increases or post-merger price jumps can raise coordination or reduced-competition questions.",
    whyConsumerProtectionMayMatter:
      "Misleading ‘sale’ claims, bait pricing, or unfair billing changes may be consumer-protection issues even without antitrust.",
  },
  {
    id: "no-alternatives",
    label: "Nowhere else to go for this product",
    description:
      "You feel stuck — rivals closed, were acquired, or stopped serving where you shop — and prices or service got worse.",
    category: "pricing",
    primaryLane: "consumer_protection",
    evidence: [
      "List of former alternatives",
      "Timeline of exits or acquisitions",
      "Price/quality changes after exits",
      "Geography (local vs national)",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Loss of rivals can also raise competition questions — usually handled outside this consumer report flow.",
    whyConsumerProtectionMayMatter:
      "Fewer choices often show up as higher prices, worse service, or unfair terms — report the consumer harm you actually felt.",
  },
  {
    id: "merger-hurt-choice",
    label: "Service got worse after companies combined",
    description:
      "After two companies combined, prices rose, quality fell, or a product you used was killed.",
    category: "pricing",
    primaryLane: "consumer_protection",
    evidence: [
      "Before/after product availability",
      "Price and quality notes",
      "Deal announcement dates",
      "Your location / market",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Mergers are reviewed under competition law separately — this consumer flow focuses on the harm to you as a buyer.",
    whyConsumerProtectionMayMatter:
      "Document the practical harm: higher bills, canceled products, worse support, or deceptive claims that 'nothing will change.'",
  },
  {
    id: "geo-block",
    label: "Blocked by country / region",
    description:
      "Service or pricing differs or is refused based on where you live (especially in the EU/EEA).",
    category: "pricing",
    primaryLane: "both",
    evidence: [
      "VPN-off screenshots of the block",
      "Account country settings",
      "Price comparisons across countries",
      "Customer-service replies",
    ],
    pathwayIds: ["ec-complaint", "nca", "consumer-protection", "ftc-complaint"],
    whyCompetitionMayMatter:
      "Geo-blocking and market partitioning can intersect with EU competition and single-market rules.",
    whyConsumerProtectionMayMatter:
      "EU consumers also have dedicated geo-blocking / consumer rights frameworks beyond classic antitrust.",
  },
  {
    id: "forced-bundle",
    label: "Forced to take an unwanted add-on",
    description:
      "You must accept a second product, payment rail, or add-on to use what you want.",
    category: "pricing",
    primaryLane: "both",
    evidence: [
      "Screens showing the forced step",
      "Fee schedules",
      "Whether an alternative was offered",
      "What happens if you refuse",
    ],
    pathwayIds: [
      "ftc-complaint",
      "doj-antitrust",
      "ec-complaint",
      "state-ag",
      "consumer-protection",
    ],
    whyCompetitionMayMatter:
      "Forced bundling / tying is a classic competition theme when a firm has power in one product and uses it to win another market.",
    whyConsumerProtectionMayMatter:
      "Hidden fees and forced add-ons can also be unfair or deceptive even without market power proof.",
  },
  {
    id: "predatory-fees",
    label: "Predatory late fees or overdraft charges",
    description:
      "Repeated penalty fees, overdrafts, or interest that feel designed to trap you in debt.",
    category: "pricing",
    primaryLane: "consumer_protection",
    evidence: [
      "Statement history showing fee pattern",
      "Account terms at signup",
      "Attempts to opt out of overdraft",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Banking concentration can amplify harm but complaints usually start as consumer protection.",
    whyConsumerProtectionMayMatter:
      "CFPB and state AGs actively pursue unfair fee practices and junk fees.",
  },
  {
    id: "deceptive-offer",
    label: "Misleading offer, fee, or ‘free’ claim",
    description:
      "Advertising, trial, or checkout did not match what you were charged or received.",
    category: "deceptive",
    primaryLane: "consumer_protection",
    evidence: [
      "Ad or landing-page screenshots",
      "Checkout pages",
      "Bank/card statements",
      "Chat or email with support",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Usually consumer protection first; competition rarely unless deception props up a dominant position.",
    whyConsumerProtectionMayMatter:
      "Deceptive acts and unfair practices are the heart of FTC Act §5 / national consumer rules.",
  },
  {
    id: "bait-and-switch",
    label: "Bait-and-switch pricing or product",
    description:
      "Advertised price or product was unavailable; you were pushed to a worse or pricier option.",
    category: "deceptive",
    primaryLane: "consumer_protection",
    evidence: [
      "Ad with price/offer",
      "In-store or online redirect message",
      "Final price paid",
      "Employee/chat scripts (if available)",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Not typically antitrust unless used to drive out rivals with loss-leading then switch.",
    whyConsumerProtectionMayMatter:
      "Classic unfair/deceptive practice — agencies and state AGs regularly pursue bait-and-switch.",
  },
  {
    id: "robocalls-spam",
    label: "Robocalls, spam texts, or harassment",
    description:
      "Unwanted calls/texts continue after opt-out, or spoofed contacts harass you.",
    category: "deceptive",
    primaryLane: "consumer_protection",
    evidence: [
      "Call/text logs with dates",
      "Opt-out requests",
      "Screenshots of caller ID",
      "Any payment demanded",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Not a competition issue in most cases.",
    whyConsumerProtectionMayMatter:
      "FTC Do Not Call, TCPA, and national spam rules — report to FTC and state AG.",
  },
  {
    id: "contract-trap",
    label: "Trapped in a long contract",
    description:
      "Early termination fees or auto-extensions make exit prohibitively expensive.",
    category: "deceptive",
    primaryLane: "consumer_protection",
    evidence: [
      "Contract with termination clause highlighted",
      "Fee quote to cancel",
      "Sales materials vs contract terms",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Long lock-in across an industry can reduce switching — weak competition angle.",
    whyConsumerProtectionMayMatter:
      "Unfair contract terms and surprise extensions are common consumer-protection targets.",
  },
  {
    id: "privacy-data-misuse",
    label: "Data used or shared without consent",
    description:
      "Personal data was sold, leaked, or used in ways you did not agree to.",
    category: "privacy",
    primaryLane: "consumer_protection",
    evidence: [
      "Privacy policy at signup vs now",
      "Breach notification (if any)",
      "Opt-out attempts",
      "Evidence of unauthorized sharing",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection", "ec-complaint"],
    whyCompetitionMayMatter:
      "Data advantages can reinforce market power — competition tip if a dominant platform misuses data to exclude rivals.",
    whyConsumerProtectionMayMatter:
      "GDPR, CCPA/CPRA, and FTC privacy enforcement — consumer harm from unauthorized use.",
  },
  {
    id: "unauthorized-charges",
    label: "Unauthorized or mystery charges",
    description:
      "Charges on your card or account that you did not approve or cannot identify.",
    category: "privacy",
    primaryLane: "consumer_protection",
    evidence: [
      "Bank/card statements",
      "Dispute records with bank",
      "Merchant descriptors",
      "Account access logs (if available)",
    ],
    pathwayIds: ["ftc-complaint", "state-ag", "consumer-protection"],
    whyCompetitionMayMatter:
      "Not typically antitrust.",
    whyConsumerProtectionMayMatter:
      "Billing fraud and cramming are classic consumer-protection and payment-dispute issues.",
  },
  {
    id: "insurance-denied",
    label: "Insurance claim unfairly denied",
    description:
      "Health, auto, home, or travel insurer denied a claim you believe was covered.",
    category: "privacy",
    primaryLane: "consumer_protection",
    evidence: [
      "Policy document",
      "Claim submission and denial letter",
      "Medical/repair estimates",
      "Internal appeal steps taken",
    ],
    pathwayIds: ["state-ag", "consumer-protection", "ftc-complaint"],
    whyCompetitionMayMatter:
      "Insurance market concentration can affect choice — usually regulated at state level first.",
    whyConsumerProtectionMayMatter:
      "State insurance commissioners and AG consumer divisions handle unfair claim practices.",
  },
  {
    id: "medical-bill-surprise",
    label: "Surprise medical bill",
    description:
      "Out-of-network charges, balance billing, or costs far above what you were quoted.",
    category: "privacy",
    primaryLane: "consumer_protection",
    evidence: [
      "EOB statements",
      "Provider estimates vs final bill",
      "Network status of providers",
      "No Surprises Act protections (US) if applicable",
    ],
    pathwayIds: ["state-ag", "consumer-protection", "ftc-complaint"],
    whyCompetitionMayMatter:
      "Healthcare market power is complex — competition tips are rare for individual bills.",
    whyConsumerProtectionMayMatter:
      "Surprise billing laws and state AG health-care consumer units address these harms.",
  },
  {
    id: "other",
    label: "Something else (pick + describe below)",
    description:
      "Your situation doesn’t fit the list — describe it in your own words below.",
    category: "other",
    primaryLane: "both",
    evidence: [
      "Timeline of what happened",
      "Names of companies involved",
      "Documents, screenshots, receipts",
      "What outcome you want (refund, access, investigation tip)",
    ],
    pathwayIds: [
      "ftc-complaint",
      "state-ag",
      "consumer-protection",
      "doj-antitrust",
      "ec-complaint",
    ],
    whyCompetitionMayMatter:
      "If a powerful firm blocked rivals or coordinated with competitors, competition tips may still be relevant.",
    whyConsumerProtectionMayMatter:
      "Many everyday harms are best framed first as unfair or deceptive practices.",
  },
  {
    id: "custom",
    label: "Fully custom — I’ll describe everything",
    description:
      "Skip presets — write your own issue title and full description below.",
    category: "other",
    primaryLane: "both",
    evidence: [
      "Timeline of what happened",
      "Names of companies involved",
      "Documents, screenshots, receipts",
      "What outcome you want",
    ],
    pathwayIds: [
      "ftc-complaint",
      "state-ag",
      "consumer-protection",
      "doj-antitrust",
      "ec-complaint",
    ],
    whyCompetitionMayMatter:
      "Describe any market power, lost rivals, or coordinated industry behavior in your narrative.",
    whyConsumerProtectionMayMatter:
      "Describe any deception, unfair fees, or access problems in your narrative.",
  },
];

export function getConsumerIssue(id: ConsumerIssueId) {
  return consumerIssues.find((i) => i.id === id);
}

export function consumerIssuesForCategory(category: ConsumerIssueCategory) {
  return consumerIssues.filter((i) => i.category === category);
}

/** Consumer report flow: consumer-protection portals only (not DOJ / NCA tips). */
const CONSUMER_PATH_IDS = new Set([
  "ftc-complaint",
  "state-ag",
  "consumer-protection",
]);

const CONSUMER_PATH_PRIORITY = [
  "consumer-protection",
  "ftc-complaint",
  "state-ag",
];

export function pathwaysForIssue(
  issue: ConsumerIssue,
  jurisdiction: Jurisdiction,
  opts?: { includeCompetitionTips?: boolean },
): FilingPath[] {
  const includeCompetition = opts?.includeCompetitionTips ?? false;
  const paths = issue.pathwayIds
    .map((id) => filingById[id])
    .filter(Boolean)
    .filter(
      (p) =>
        jurisdiction === "Both" ||
        p.jurisdiction === "Both" ||
        p.jurisdiction === jurisdiction,
    )
    .filter((p) => includeCompetition || CONSUMER_PATH_IDS.has(p.id));

  return paths.sort((a, b) => {
    const ai = CONSUMER_PATH_PRIORITY.indexOf(a.id);
    const bi = CONSUMER_PATH_PRIORITY.indexOf(b.id);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

export function buildComplaintDraft(input: {
  issue: ConsumerIssue;
  customIssueLabel?: string;
  company: string;
  product: string;
  location: string;
  detail: string;
  dates: string;
}): string {
  const company = input.company.trim() || "[Company name]";
  const product = input.product.trim() || "[Product / service]";
  const location = input.location.trim() || "[City / state or country]";
  const dates = input.dates.trim() || "[Approximate dates]";
  const detail = input.detail.trim() || "[Describe what happened in your own words]";
  const issueLabel =
    input.customIssueLabel?.trim() ||
    (input.issue.id === "custom" ? "[Your issue title]" : input.issue.label);

  return `CONSUMER COMPLAINT DRAFT (edit before sending — CounterLayer is a guide, not a law firm)

Who I am: Individual consumer / buyer
Where I am: ${location}
Company involved: ${company}
Product / service: ${product}
Issue type: ${issueLabel}
Approximate dates: ${dates}

What happened:
${detail}

Why this matters for consumer protection:
${input.issue.whyConsumerProtectionMayMatter}

Evidence I can provide:
${input.issue.evidence.map((e) => `- ${e}`).join("\n")}

What I am asking the agency to do:
- Review whether this conduct raises unfair, deceptive, or other consumer-protection concerns
- Contact me if more information is needed

IMPORTANT:
This draft is not a formal legal filing and does not prove that ${company} broke the law.
An agency complaint informs priorities; it does not automatically open a private lawsuit or award me damages.
`;
}
