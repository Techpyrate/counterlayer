import type { ConductTag, Jurisdiction } from "./types";

export type CheckAudience =
  | "general_commercial"
  | "saas_b2b"
  | "ecommerce_retail"
  | "developer"
  | "small_business"
  | "professional_services"
  | "manufacturer_distributor"
  | "fintech"
  | "healthtech"
  | "media_publisher"
  | "creator_influencer"
  | "education_edtech"
  | "government_public"
  | "organization"
  | "seller"
  | "platform"
  | "data_api_provider"
  | "franchise_multi_location";

export type RiskLevel = "low" | "watch" | "elevated";

export type Answer = "yes" | "no" | "unsure";

export interface ComplianceQuestion {
  id: string;
  audience: ControlAudienceTag[] | "all";
  theme: string;
  prompt: string;
  help: string;
  yesWeight: number;
  conduct: ConductTag[];
  domains: Array<"competition" | "consumer" | "market_rules">;
  remediation: string[];
}

/** Tags used in control/question audience filters (legacy grouping). */
export type ControlAudienceTag =
  | "developer"
  | "small_business"
  | "organization"
  | "seller"
  | "platform";

export function controlTagsForAudience(
  audience: CheckAudience,
): ControlAudienceTag[] | "all" {
  if (audience === "general_commercial") return "all";
  const map: Record<Exclude<CheckAudience, "general_commercial">, ControlAudienceTag[]> = {
    saas_b2b: ["developer", "small_business", "platform"],
    ecommerce_retail: ["small_business", "seller"],
    developer: ["developer"],
    small_business: ["small_business"],
    professional_services: ["small_business", "organization"],
    manufacturer_distributor: ["small_business", "organization"],
    fintech: ["developer", "small_business", "platform"],
    healthtech: ["developer", "small_business", "organization"],
    media_publisher: ["small_business", "platform", "organization"],
    creator_influencer: ["small_business", "seller"],
    education_edtech: ["developer", "organization", "small_business"],
    government_public: ["organization"],
    organization: ["organization"],
    seller: ["seller"],
    platform: ["platform"],
    data_api_provider: ["developer", "platform"],
    franchise_multi_location: ["small_business", "organization", "seller"],
  };
  return map[audience];
}

export function getAudienceDisplayLabel(audience: CheckAudience): string {
  return checkAudiences.find((a) => a.id === audience)?.label ?? audience;
}

export const checkAudienceGroups: {
  label: string;
  items: CheckAudience[];
}[] = [
  {
    label: "Not sure / broadest scan",
    items: ["general_commercial"],
  },
  {
    label: "Software & technology",
    items: [
      "saas_b2b",
      "developer",
      "data_api_provider",
      "fintech",
      "healthtech",
      "education_edtech",
    ],
  },
  {
    label: "Commerce & operations",
    items: [
      "ecommerce_retail",
      "small_business",
      "seller",
      "manufacturer_distributor",
      "franchise_multi_location",
    ],
  },
  {
    label: "Platforms & media",
    items: ["platform", "media_publisher", "creator_influencer"],
  },
  {
    label: "Organizations & services",
    items: [
      "organization",
      "government_public",
      "professional_services",
    ],
  },
];

export const checkAudiences: { id: CheckAudience; label: string; blurb: string }[] =
  [
    {
      id: "general_commercial",
      label: "General commercial site",
      blurb:
        "Broadest plugin pack — runs every control. Use when you don’t fit a niche or want maximum coverage.",
    },
    {
      id: "saas_b2b",
      label: "SaaS / B2B software",
      blurb: "Subscription software, dashboards, team tools, and B2B online services.",
    },
    {
      id: "ecommerce_retail",
      label: "E-commerce / online retail",
      blurb: "You sell goods or services online — shop, checkout, shipping, returns.",
    },
    {
      id: "developer",
      label: "App developer",
      blurb: "Mobile/desktop apps, SDKs, plugins, and app-store distribution.",
    },
    {
      id: "small_business",
      label: "Small business (local / general)",
      blurb: "General SMB: services, trades, local sales, suppliers, and distributors.",
    },
    {
      id: "professional_services",
      label: "Professional services",
      blurb: "Agencies, consultancies, law, accounting, marketing, and advisory firms.",
    },
    {
      id: "manufacturer_distributor",
      label: "Manufacturer / wholesaler",
      blurb: "Making, importing, or distributing products — B2B or B2C supply chains.",
    },
    {
      id: "fintech",
      label: "Fintech / payments",
      blurb: "Payments, lending, wallets, crypto, banking-adjacent, or money movement.",
    },
    {
      id: "healthtech",
      label: "Health / wellness tech",
      blurb: "Health apps, telehealth, wellness products, and regulated health data.",
    },
    {
      id: "media_publisher",
      label: "Media / publisher",
      blurb: "News, blogs, streaming, UGC platforms, and ad-supported content.",
    },
    {
      id: "creator_influencer",
      label: "Creator / influencer",
      blurb: "Personal brand, affiliates, sponsorships, and digital product sales.",
    },
    {
      id: "education_edtech",
      label: "Education / EdTech",
      blurb: "Courses, LMS, tutoring, certifications, and student-facing platforms.",
    },
    {
      id: "government_public",
      label: "Government / public sector",
      blurb: "Agencies, public programs, civic services, and government contractors’ public sites.",
    },
    {
      id: "organization",
      label: "Nonprofit / membership org",
      blurb: "Charities, associations, standards bodies, and membership programs.",
    },
    {
      id: "seller",
      label: "Marketplace seller",
      blurb: "Third-party seller on Amazon, Etsy, app stores, or other marketplaces.",
    },
    {
      id: "platform",
      label: "Platform / marketplace operator",
      blurb: "You host third parties — fees, ranking, access rules, and ecosystem policy.",
    },
    {
      id: "data_api_provider",
      label: "Data / API provider",
      blurb: "APIs, datasets, developer portals, and programmatic access products.",
    },
    {
      id: "franchise_multi_location",
      label: "Franchise / multi-location",
      blurb: "Franchisors, chains, and multi-site brands with shared terms and partners.",
    },
  ];

export const complianceQuestions: ComplianceQuestion[] = [
  {
    id: "rival-price-talk",
    audience: "all",
    theme: "Agreements with rivals",
    prompt:
      "Do people at your organization discuss current or future prices, customers, or territories with competitors?",
    help: "Even informal chats at trade events can create cartel risk if they influence commercial decisions.",
    yesWeight: 5,
    conduct: ["cartel_coordination", "price_fix"],
    domains: ["competition"],
    remediation: [
      "Stop competitor discussions about prices, bids, customers, or markets.",
      "Train staff on ‘no competitor sensitive topics’ rules.",
      "If a discussion already happened, document it and seek counsel promptly.",
    ],
  },
  {
    id: "no-poach",
    audience: ["small_business", "organization", "platform", "developer"],
    theme: "Agreements with rivals",
    prompt:
      "Do you have agreements with other companies not to hire or solicit each other’s workers?",
    help: "No-poach and wage-fix agreements between competitors are a major enforcement focus.",
    yesWeight: 4,
    conduct: ["cartel_coordination"],
    domains: ["competition"],
    remediation: [
      "Review HR and partner contracts for no-poach clauses between competitors.",
      "Prefer narrowly tailored non-solicits tied to a legitimate collaboration, with counsel review.",
    ],
  },
  {
    id: "exclusivity-require",
    audience: "all",
    theme: "Exclusivity",
    prompt:
      "Do you require customers, suppliers, or partners to deal only with you (or not with your rivals)?",
    help: "Exclusivity can be lawful, but foreclosure risk rises with market power, duration, and coverage.",
    yesWeight: 3,
    conduct: ["exclusivity", "vertical_restraint"],
    domains: ["competition"],
    remediation: [
      "Shorten exclusivity terms and allow carve-outs for rivals.",
      "Track what share of the market your exclusives cover.",
      "Document procompetitive reasons (investment protection, quality).",
    ],
  },
  {
    id: "loyalty-rebates",
    audience: ["small_business", "organization", "platform"],
    theme: "Exclusivity",
    prompt:
      "Do rebates or discounts require partners to buy most or all of their needs from you?",
    help: "Loyalty rebates that condition benefits on near-exclusive purchasing can raise dominance concerns (especially EU).",
    yesWeight: 3,
    conduct: ["exclusivity", "abuse_of_dominance"],
    domains: ["competition"],
    remediation: [
      "Rework rebates to volume-based tiers not conditioned on excluding rivals.",
      "Avoid ‘all needs’ or ‘primary supplier’ conditions where you are strong.",
    ],
  },
  {
    id: "tying",
    audience: ["developer", "platform", "small_business", "seller"],
    theme: "Tying / bundling",
    prompt:
      "Must buyers take a second product, payment system, or service to get your main product?",
    help: "Forced bundles can be tying. Convenience bundles with real choice are safer.",
    yesWeight: 3,
    conduct: ["tying"],
    domains: ["competition", "consumer"],
    remediation: [
      "Offer a standalone option for the main product.",
      "If bundling, make the second product optional and transparent on price.",
    ],
  },
  {
    id: "iap-mandate",
    audience: ["developer", "platform"],
    theme: "Tying / bundling",
    prompt:
      "Do you require apps or sellers on your platform to use only your billing / payment system?",
    help: "Payment mandates and anti-steering rules are heavily scrutinized in app stores and marketplaces.",
    yesWeight: 4,
    conduct: ["tying", "self_preferencing"],
    domains: ["competition", "market_rules"],
    remediation: [
      "Allow alternative payment options or clear external links where legally required.",
      "Review DMA / state laws if you operate a gatekeeper-style store.",
    ],
  },
  {
    id: "mfn",
    audience: ["platform", "small_business", "seller", "organization"],
    theme: "Price parity / MFN",
    prompt:
      "Do you stop partners from offering lower prices or better terms on other channels?",
    help: "Wide MFNs / price-parity clauses have drawn EU and national enforcement in OTAs and e-commerce.",
    yesWeight: 3,
    conduct: ["vertical_restraint", "price_fix"],
    domains: ["competition", "market_rules"],
    remediation: [
      "Remove wide parity clauses; narrow any remaining terms with counsel.",
      "Avoid punishing partners for discounting elsewhere.",
    ],
  },
  {
    id: "self-prefer",
    audience: ["platform", "developer", "seller"],
    theme: "Platform rules",
    prompt:
      "Do you rank, feature, or price your own products more favorably than similar third-party offers on your platform?",
    help: "Self-preferencing is a major EU theme (Art. 102 / DMA) and appears in US platform cases.",
    yesWeight: 3,
    conduct: ["self_preferencing", "discrimination"],
    domains: ["competition", "market_rules"],
    remediation: [
      "Publish ranking criteria and apply them evenly.",
      "Separate teams / data walls between retail and marketplace where feasible.",
    ],
  },
  {
    id: "api-block",
    audience: ["developer", "platform"],
    theme: "Platform rules",
    prompt:
      "Do you block rivals from APIs, interoperability, or data access that you offer to others?",
    help: "Selective refusal and closed APIs can raise access / discrimination theories when you are a bottleneck.",
    yesWeight: 3,
    conduct: ["refusal_to_deal", "interoperability", "discrimination"],
    domains: ["competition", "market_rules"],
    remediation: [
      "Document objective security / capacity reasons for denials.",
      "Offer comparable access on FRAND-like terms where you are essential.",
    ],
  },
  {
    id: "suspension-rules",
    audience: ["platform"],
    theme: "Platform rules",
    prompt:
      "Do you suspend sellers/developers without clear, evenly applied rules and an appeal path?",
    help: "Opaque enforcement can become discrimination or unfairness claims—and invites regulator attention.",
    yesWeight: 2,
    conduct: ["platform_suspension", "discrimination"],
    domains: ["competition", "consumer", "market_rules"],
    remediation: [
      "Write clear policies, keep decision logs, and offer meaningful appeals.",
      "Audit whether your own stores/brands get softer enforcement.",
    ],
  },
  {
    id: "buying-rivals",
    audience: ["small_business", "organization", "platform", "developer"],
    theme: "Mergers & growth",
    prompt:
      "Are you acquiring (or planning to acquire) a competitor or a nascent rival?",
    help: "Many deals need merger filing analysis even for smaller companies in concentrated niches.",
    yesWeight: 2,
    conduct: ["merger"],
    domains: ["competition"],
    remediation: [
      "Run HSR / EU / UK threshold checks early.",
      "Preserve documents; avoid ‘gun jumping’ before clearance.",
    ],
  },
  {
    id: "dark-patterns",
    audience: "all",
    theme: "Consumer & market rules",
    prompt:
      "Is it harder to cancel, opt out, or understand the total price than it is to sign up?",
    help: "Dark patterns and negative-option billing are active FTC / EU consumer priorities.",
    yesWeight: 3,
    conduct: ["data_lockin"],
    domains: ["consumer", "market_rules"],
    remediation: [
      "Make cancel as easy as signup (same channel, few steps).",
      "Show all-in pricing before purchase; keep records of consent.",
    ],
  },
  {
    id: "misleading-ads",
    audience: "all",
    theme: "Consumer & market rules",
    prompt:
      "Do ads, trials, or ‘free’ claims sometimes not match what customers are actually charged?",
    help: "Deceptive advertising is classic consumer-protection risk separate from antitrust.",
    yesWeight: 3,
    conduct: [],
    domains: ["consumer"],
    remediation: [
      "Align creative, landing pages, and checkout terms.",
      "Audit trials for clear conversion and reminder notices.",
    ],
  },
  {
    id: "geo-price",
    audience: ["developer", "platform", "small_business", "seller"],
    theme: "Consumer & market rules",
    prompt:
      "Do you block customers in the EU/EEA from buying based on nationality/residence, or force unjustified geo-price walls?",
    help: "EU geo-blocking and single-market rules can apply alongside competition law.",
    yesWeight: 2,
    conduct: ["discrimination", "market_access"],
    domains: ["market_rules", "consumer"],
    remediation: [
      "Map geo-restrictions to lawful reasons (licensing, legal bans).",
      "Review EU geo-blocking regulation exposure with counsel.",
    ],
  },
  {
    id: "data-reuse",
    audience: ["platform", "developer"],
    theme: "Platform rules",
    prompt:
      "Do you use non-public seller/developer data to compete against them with your own products?",
    help: "Using partner data to self-preference has been a major Amazon / DMA-style concern.",
    yesWeight: 4,
    conduct: ["self_preferencing", "data_lockin", "discrimination"],
    domains: ["competition", "market_rules"],
    remediation: [
      "Firewall marketplace data from first-party retail teams.",
      "Disclose and limit data uses in partner contracts.",
    ],
  },
];

export function questionsForAudience(audience: CheckAudience) {
  const tags = controlTagsForAudience(audience);
  if (tags === "all") return complianceQuestions;
  return complianceQuestions.filter(
    (q) => q.audience === "all" || q.audience.some((a) => tags.includes(a)),
  );
}

export interface ComplianceFlag {
  questionId: string;
  theme: string;
  prompt: string;
  level: RiskLevel;
  domains: ComplianceQuestion["domains"];
  conduct: ConductTag[];
  remediation: string[];
  note: string;
  /** Plain-language explanation of why this answer matters */
  plainWhy: string;
  /** One-sentence “so what” for a founder */
  soWhat: string;
}

export interface CompliancePlainEnglish {
  headline: string;
  inSimpleTerms: string[];
  overallExplained: string;
  /** Longer executive narrative (2–4 paragraphs) */
  executiveNarrative: string[];
  howToReadThis: string[];
  methodology: string[];
  levelGuide: { level: string; meaning: string }[];
  whatWeLookedAt: string;
  topPriorities: string[];
  domainNotes: {
    domain: "competition" | "consumer" | "market_rules";
    label: string;
    count: number;
    meaning: string;
  }[];
  whatThisIsNot: string[];
  nextSteps: string[];
  ifYouDoNothing: string;
  closingNote: string;
}

export interface ComplianceResult {
  score: number;
  overall: RiskLevel;
  flags: ComplianceFlag[];
  summary: string[];
  counselCue: string;
  jurisdictionNote: string;
  plainEnglish: CompliancePlainEnglish;
  answerStats: { yes: number; no: number; unsure: number; total: number };
}

function plainWhyFor(theme: string, answer: Answer): string {
  const t = theme.toLowerCase();
  let core =
    "This theme shows up often in competition and consumer enforcement stories. Your answer means it deserves a closer look.";
  if (t.includes("rival")) {
    core =
      "Talking with rivals about prices, customers, bids, or hiring is one of the fastest ways businesses get into antitrust trouble — even in casual chats or trade groups.";
  } else if (t.includes("exclusiv")) {
    core =
      "Locking partners so they can only deal with you can be fine at small scale, but looks worse when you cover a big slice of a market or a key channel.";
  } else if (t.includes("tying") || t.includes("bundl")) {
    core =
      "Forcing customers to take an extra product or payment method to get what they want is a recurring platform and app-store enforcement theme.";
  } else if (t.includes("parity") || t.includes("mfn")) {
    core =
      "Stopping sellers or partners from offering a better price elsewhere can soften competition and has drawn heavy EU/UK scrutiny.";
  } else if (t.includes("platform")) {
    core =
      "If you set ranking, access, or fee rules for others, agencies watch whether you favor yourself or shut out rivals unfairly.";
  } else if (t.includes("merger")) {
    core =
      "Buying or combining with competitors can need filings and review — skipping that process is itself a serious risk.";
  } else if (t.includes("consumer")) {
    core =
      "Cancel friction, surprise renewals, unclear prices, or unfair ads create consumer-protection risk that often hits startups before classic monopoly cases do.";
  }
  return answer === "unsure"
    ? `${core} Because you marked “not sure,” treat this as homework: confirm the facts before you scale the practice.`
    : core;
}

function soWhatFor(level: RiskLevel, theme: string): string {
  if (level === "elevated") {
    return `Elevated: pause or tightly control “${theme}” practices until someone knowledgeable reviews them.`;
  }
  if (level === "watch") {
    return `Watch: document how “${theme}” works today and set a date to revisit before the next launch or fundraising push.`;
  }
  return `Low flag on “${theme}” — keep an eye on it as you grow.`;
}

export function scoreCompliance(input: {
  audience: CheckAudience;
  answers: Record<string, Answer>;
  jurisdiction: Jurisdiction;
}): ComplianceResult {
  const qs = questionsForAudience(input.audience);
  let score = 0;
  const flags: ComplianceFlag[] = [];
  const answerStats = { yes: 0, no: 0, unsure: 0, total: qs.length };

  for (const q of qs) {
    const a = input.answers[q.id] ?? "unsure";
    if (a === "yes") answerStats.yes += 1;
    else if (a === "no") answerStats.no += 1;
    else answerStats.unsure += 1;

    if (a === "no") continue;
    const weight = a === "yes" ? q.yesWeight : Math.max(1, Math.floor(q.yesWeight / 2));
    score += weight;
    const level: RiskLevel =
      weight >= 4 || (a === "yes" && q.yesWeight >= 3)
        ? "elevated"
        : a === "unsure"
          ? "watch"
          : q.yesWeight >= 3
            ? "elevated"
            : "watch";
    const resolvedLevel: RiskLevel =
      a === "unsure" && q.yesWeight < 4 ? "watch" : level;
    flags.push({
      questionId: q.id,
      theme: q.theme,
      prompt: q.prompt,
      level: resolvedLevel,
      domains: q.domains,
      conduct: q.conduct,
      remediation: q.remediation,
      note:
        a === "unsure"
          ? "You marked unsure — treat as a diligence item until confirmed."
          : "You answered yes — this pattern often appears in enforcement narratives.",
      plainWhy: plainWhyFor(q.theme, a),
      soWhat: soWhatFor(resolvedLevel, q.theme),
    });
  }

  const overall: RiskLevel =
    score >= 10 ? "elevated" : score >= 4 ? "watch" : "low";

  const elevated = flags.filter((f) => f.level === "elevated");
  const watch = flags.filter((f) => f.level === "watch");

  const summary =
    overall === "low"
      ? [
          "Based on your answers, we did not see many high-risk patterns. Keep training staff and reviewing contracts as you grow.",
          "Low questionnaire risk is not a legal clearance. New products, partnerships, or market power can change the picture quickly.",
          "Use this as a baseline: re-run the checklist when you add exclusivity, a marketplace, or competitor collaborations.",
        ]
      : overall === "watch"
        ? [
            "Some answers suggest practices worth reviewing with an internal checklist or counsel before they scale.",
            "Focus first on competitor contacts, exclusivity, forced payment/bundling, and consumer cancel/pricing clarity.",
            "You are not “in trouble” because of this score — you have homework items that get harder (and costlier) if ignored while you grow.",
          ]
        : [
            "Several answers map to themes agencies and courts examine closely (coordination, exclusivity, platform self-preferencing, payment mandates, or consumer dark patterns).",
            "This is a risk map — not a finding that you violated any law. Pause risky practices and get tailored advice if any ‘elevated’ flag involves competitors or dominant distribution.",
            "Elevated scores are common for ambitious startups — the win is fixing the highest flags before launch, fundraising, or a big partnership.",
          ];

  const counselCue =
    overall === "elevated"
      ? "Consider speaking with competition/consumer-protection counsel before expanding the flagged practices — especially if you have significant share, exclusive coverage, or competitor contacts."
      : "Use counsel selectively for merger filings, competitor collaborations, and any exclusivity that covers a large share of distribution.";

  const jurisdictionNote =
    input.jurisdiction === "EU"
      ? "EU focus: Articles 101/102 TFEU, Merger Regulation, and possibly DMA duties for gatekeepers / gatekeeper ecosystems. National authorities may act on local effects."
      : input.jurisdiction === "US"
        ? "US focus: Sherman Act, Clayton Act, FTC Act §5, state AG statutes, and sector rules. Consumer-protection exposure often travels with competition issues."
        : "You selected both US and EU — the stricter practical constraint often wins for global products. Map flags under each regime separately.";

  const domainCount = {
    competition: 0,
    consumer: 0,
    market_rules: 0,
  };
  for (const f of flags) {
    for (const d of f.domains) domainCount[d] += 1;
  }

  const domainNotes = (
    [
      {
        domain: "competition" as const,
        label: "Competition / antitrust",
        meaning:
          "Rules about working with competitors, locking up partners, or using market power to shut out rivals. Fines and private lawsuits can follow hard-core cartels; softer issues still create deal and PR risk.",
      },
      {
        domain: "consumer" as const,
        label: "Consumer protection",
        meaning:
          "Rules about honest pricing, easy cancel, clear trials, and fair ads. These cases often hit startups faster than classic monopolization cases — think refunds, settlements, and app-store trust.",
      },
      {
        domain: "market_rules" as const,
        label: "Market / platform rules",
        meaning:
          "Extra duties when you run a marketplace or gatekeeper-like service: fair ranking, access for sellers, and not stacking the deck for your own products.",
      },
    ] as const
  )
    .map((d) => ({ ...d, count: domainCount[d.domain] }))
    .filter((d) => d.count > 0);

  const audienceLabel = getAudienceDisplayLabel(input.audience).toLowerCase();

  const plainEnglish: CompliancePlainEnglish = {
    headline:
      overall === "low"
        ? "Your checklist looks mostly clear — keep good habits as you grow."
        : overall === "watch"
          ? "You have some yellow flags: fixable now, painful if ignored later."
          : "You have several elevated themes — treat them as launch blockers until reviewed.",
    inSimpleTerms: [
      `You answered ${answerStats.total} questions as a ${audienceLabel}. ${answerStats.yes} “yes,” ${answerStats.no} “no,” and ${answerStats.unsure} “not sure.”`,
      `We turned those answers into a risk score of ${score}. Rough guide: under 4 is low, 4–9 is watch, 10+ is elevated.`,
      elevated.length > 0
        ? `${elevated.length} item${elevated.length === 1 ? "" : "s"} landed in Elevated — start there.`
        : watch.length > 0
          ? `No elevated items, but ${watch.length} watch item${watch.length === 1 ? "" : "s"} still need a plan.`
          : "No elevated or watch flags from “yes/unsure” answers — nice baseline.",
      "This tool compares your answers to patterns that show up in real agency cases. It does not know your contracts, market share, or private chats.",
    ],
    overallExplained:
      overall === "low"
        ? "Low means your answers did not light up many classic danger themes. It is still not a legal stamp of approval — it means “nothing loud jumped out from this checklist.”"
        : overall === "watch"
          ? "Watch means one or more practices could become a problem if you scale them, especially exclusivity, competitor talk, or hard-to-cancel subscriptions. Act now while you are small — cheaper than cleaning up after growth."
          : "Elevated means several answers match themes that enforcers and courts scrutinize closely. Do not panic: many growing companies see this. Do prioritize: stop or contain the hottest practices and get advice before a big launch or partnership.",
    executiveNarrative:
      overall === "low"
        ? [
            `This report summarizes a structured owner checklist for your ${audienceLabel}. Most answers did not map to the patterns that most often appear in competition and consumer enforcement stories. That is encouraging — especially early, when habits are easier to set.`,
            "Still treat this as a snapshot, not clearance. The checklist cannot see private emails, side deals, or how much power you will have after you grow. A clean result today can change when you add exclusivity, a marketplace, or competitor collaborations.",
            "Best use of a low result: write down two or three standing rules (no price talk with rivals; cancel as easy as signup; no fake reviews) and re-run this checklist at each major launch.",
          ]
        : overall === "watch"
          ? [
              `This report summarizes a structured owner checklist for your ${audienceLabel}. Some answers suggest practices that are common in growing companies and also common in later diligence, complaints, or agency interest if left unchecked.`,
              "Watch does not mean “you broke the law.” It means “this pattern has bitten others.” The practical move is to assign an owner, write how the practice works today, and decide whether to keep, narrow, or drop it before the next fundraising or partnership cycle.",
              pePriorityParagraph(elevated, watch),
              "Consumer-facing issues (cancel, renewals, pricing clarity) usually deserve first attention because users feel them immediately and regulators hear about them quickly. Competition issues (rival talks, exclusivity) deserve first attention when they involve other companies — those can become criminal or civil cases if they harden into agreements.",
            ]
          : [
              `This report summarizes a structured owner checklist for your ${audienceLabel}. Several answers map to themes that agencies, courts, and sophisticated counterparties examine closely: coordination with rivals, locking distribution, payment or product tying, marketplace self-preferencing, and consumer dark patterns.`,
              "Elevated is a prioritization signal, not a verdict. Many ambitious products score elevated because they are building leverage. The difference between a durable company and a messy one is whether you contain those practices before they become standard operating procedure.",
              pePriorityParagraph(elevated, watch),
              "Act in this order when unsure: (1) stop competitor price/customer/hiring talks, (2) make cancel and pricing honest and easy, (3) narrow exclusivity and self-preferencing, (4) get counsel before a big launch or exclusive deal. That sequence reduces both legal and customer-trust risk.",
            ],
    howToReadThis: [
      "Start with the executive summary and overall rating — that is the plain-English verdict of this checklist.",
      "Use the compact charts only as a snapshot of how many answers fell into yes / no / unsure and how flags split by severity.",
      "Then read each finding in order. Elevated findings first: each one explains why the theme matters, what your answer implies, and concrete next steps.",
      "Finish with the action plan and “what this is not” so you leave with both homework and the right boundaries.",
    ],
    methodology: [
      "Questions are tailored to your selected business type (developer, small business, organization, seller, or platform).",
      "“No” answers usually clear a theme. “Yes” adds weighted risk points. “Not sure” adds partial points and creates a watch item so unknowns do not hide.",
      "Weights are higher for themes that historically attract hard enforcement (rival coordination, exclusivity at scale, payment mandates, cancel traps).",
      "Overall band: score under 4 → low; 4–9 → watch; 10+ → elevated. Bands are product heuristics, not legal thresholds.",
      "Public site findings (if attached) are separate page checks and do not change this questionnaire score, but they should be read together.",
    ],
    levelGuide: [
      {
        level: "Elevated",
        meaning:
          "Strong match to a pattern that often appears in enforcement or high-stakes diligence. Pause scaling that practice until you have a written plan or advice.",
      },
      {
        level: "Watch",
        meaning:
          "Possible issue or incomplete information. Document how it works, set a review date, and avoid making it default company policy.",
      },
      {
        level: "Low / clear",
        meaning:
          "This checklist did not flag the theme based on your answers. Revisit when the product, market share, or partner terms change.",
      },
    ],
    whatWeLookedAt: `We asked about how your ${audienceLabel} deals with competitors, partners, pricing, cancel flows, and (if relevant) marketplace power — then scored “yes” and “not sure” more heavily than “no.”`,
    topPriorities: [
      ...elevated.slice(0, 3).map((f) => `Elevated — ${f.theme}: ${f.remediation[0] ?? f.soWhat}`),
      ...watch.slice(0, Math.max(0, 3 - elevated.length)).map(
        (f) => `Watch — ${f.theme}: ${f.remediation[0] ?? f.soWhat}`,
      ),
      ...(elevated.length + watch.length === 0
        ? [
            "Keep a short written rule: no price or customer talks with competitors.",
            "Re-check cancel and pricing pages before every launch.",
            "Re-run this checklist after any exclusivity or marketplace feature ships.",
          ]
        : []),
    ].slice(0, 5),
    domainNotes,
    whatThisIsNot: [
      "Not a court ruling, fine, or finding that you broke the law.",
      "Not a substitute for a lawyer who knows your contracts and market.",
      "Not a review of private Slack, emails, or unpublished deal terms.",
      "Not a certified compliance audit or “safe to launch” certificate.",
      "Not permission to ignore consumer or competition rules because your score is low.",
    ],
    nextSteps: [
      "Read every Elevated finding below in plain language, then assign an owner on your team.",
      "Fix consumer cancel / pricing clarity first if those flagged — users feel those immediately.",
      "If any flag involves talking to competitors, stop that channel until counsel says otherwise.",
      "Write a one-page “how we compete” note: pricing independence, exclusivity policy, cancel standard.",
      "Save this report, fix what you can this week, then re-run the checklist.",
      counselCue,
    ],
    ifYouDoNothing:
      overall === "low"
        ? "If you do nothing: risk stays low only while your practices stay the same. Growth, exclusivity, or a marketplace feature can move you to Watch overnight."
        : overall === "watch"
          ? "If you do nothing: small frictions become standard operating procedure, then show up in due diligence, partner negotiations, or a complaint when you are larger and more visible."
          : "If you do nothing: elevated patterns tend to scale with revenue — making later fixes, refunds, or investigations far more expensive than a pre-launch cleanup.",
    closingNote:
      "CounterLayer is a diligence and guidance platform. Share this report with your team as a worklist. We are not a law firm and not a substitute for counsel on your specific facts.",
  };

  return {
    score,
    overall,
    flags,
    summary,
    counselCue,
    jurisdictionNote,
    plainEnglish,
    answerStats,
  };
}

function pePriorityParagraph(
  elevated: ComplianceFlag[],
  watch: ComplianceFlag[],
): string {
  if (elevated.length > 0) {
    const names = elevated
      .slice(0, 4)
      .map((f) => f.theme)
      .join("; ");
    return `Your elevated themes include: ${names}. Those are the sections to read carefully first — each finding below explains the “why” in everyday language and lists concrete fixes.`;
  }
  if (watch.length > 0) {
    const names = watch
      .slice(0, 4)
      .map((f) => f.theme)
      .join("; ");
    return `Your watch themes include: ${names}. None rose to elevated on this pass, but leaving them undocumented is how watch items become elevated after growth.`;
  }
  return "No elevated or watch flags were generated from yes/unsure answers on this pass.";
}
