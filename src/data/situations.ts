import type { Role, SituationTemplate } from "./types";

export const roles: { id: Role; label: string }[] = [
  { id: "consumer", label: "Consumer" },
  { id: "small_business", label: "Small business" },
  { id: "large_business", label: "Large business" },
  { id: "organization", label: "Organization" },
  { id: "developer", label: "Developer" },
  { id: "seller", label: "Seller" },
  { id: "supplier", label: "Supplier" },
  { id: "distributor", label: "Distributor" },
  { id: "employee", label: "Employee / worker" },
  { id: "competitor", label: "Competitor" },
];

export const situations: SituationTemplate[] = [
  {
    id: "price-spike",
    label: "Prices suddenly increased",
    description:
      "Prices rose sharply across rivals or after a merger, with little competitive pressure remaining.",
    conduct: ["cartel_coordination", "merger"],
    roles: ["consumer", "small_business", "organization"],
    potentialIssues: [
      "Possible coordinated pricing or reduced competitive pressure after consolidation",
      "Consumer-protection issues if price claims were deceptive",
    ],
    evidenceMatters: [
      "Before/after price records",
      "Communications suggesting coordination",
      "Number of remaining alternatives",
      "Whether increases were parallel and unexplained by costs",
    ],
    lawIds: ["sherman-1", "tfeu-101", "ftc-5", "clayton-7"],
    filingPathIds: [
      "ftc-complaint",
      "doj-antitrust",
      "state-ag",
      "ec-complaint",
      "consumer-protection",
    ],
  },
  {
    id: "acquisition",
    label: "Company acquired a competitor",
    description:
      "A merger or acquisition removed a rival or potential rival from the market.",
    conduct: ["merger"],
    roles: [
      "consumer",
      "competitor",
      "small_business",
      "large_business",
      "organization",
    ],
    potentialIssues: [
      "Horizontal or vertical merger that may substantially lessen competition",
      "Elimination of a nascent rival",
    ],
    evidenceMatters: [
      "Market shares and concentration",
      "Closeness of competition between parties",
      "Entry barriers",
      "Internal deal documents if available via counsel",
    ],
    lawIds: ["clayton-7", "hart-scott", "eu-merger"],
    filingPathIds: ["doj-antitrust", "ftc-complaint", "ec-complaint", "state-ag"],
  },
  {
    id: "exclusive-supply",
    label: "Can't use another supplier",
    description:
      "A contract or practice blocks purchasing from competing suppliers.",
    conduct: ["exclusivity", "vertical_restraint"],
    roles: ["small_business", "large_business", "distributor", "seller"],
    potentialIssues: [
      "Exclusive dealing that may foreclose rivals",
      "Vertical restraint raising rivals’ costs",
    ],
    evidenceMatters: [
      "Contract clauses",
      "Share of distribution locked up",
      "Duration and penalties for switching",
      "Available alternative suppliers",
    ],
    lawIds: ["sherman-1", "clayton-3", "tfeu-101", "tfeu-102"],
    filingPathIds: ["ftc-complaint", "doj-antitrust", "ec-complaint", "private-suit"],
  },
  {
    id: "platform-block",
    label: "Platform blocked my business",
    description:
      "A marketplace or platform suspended, delisted, or limited your access.",
    conduct: ["platform_suspension", "discrimination", "refusal_to_deal"],
    roles: ["seller", "developer", "small_business", "competitor"],
    potentialIssues: [
      "Discriminatory platform access",
      "Refusal to deal / essential facility style theories (high bar)",
      "Contract and consumer-protection overlaps",
    ],
    evidenceMatters: [
      "Suspension notices and policy citations",
      "Comparators treated differently",
      "Revenue dependence on the platform",
      "Appeals and remediation attempts",
    ],
    lawIds: ["sherman-2", "ftc-5", "tfeu-102", "dma"],
    filingPathIds: [
      "ftc-complaint",
      "state-ag",
      "ec-complaint",
      "nca",
      "private-suit",
      "consumer-protection",
    ],
  },
  {
    id: "tying",
    label: "Product tied to another product",
    description:
      "You must take product B to get product A, or payment/service is bundled forcibly.",
    conduct: ["tying"],
    roles: ["consumer", "developer", "seller", "small_business", "competitor"],
    potentialIssues: [
      "Tying / bundling that may leverage market power",
      "In digital markets: mandatory payment rails or pre-installed apps",
    ],
    evidenceMatters: [
      "Whether products are separate",
      "Coercion vs. convenience bundling",
      "Market power in the tying product",
      "Foreclosure of rivals in the tied market",
    ],
    lawIds: ["sherman-1", "sherman-2", "clayton-3", "tfeu-102", "dma"],
    filingPathIds: [
      "ftc-complaint",
      "doj-antitrust",
      "ec-complaint",
      "private-suit",
    ],
  },
  {
    id: "exclusivity-required",
    label: "Company requires exclusivity",
    description:
      "You must deal only with one firm or stop dealing with its rivals.",
    conduct: ["exclusivity", "vertical_restraint"],
    roles: [
      "supplier",
      "distributor",
      "seller",
      "small_business",
      "large_business",
    ],
    potentialIssues: [
      "Exclusive dealing / loyalty discounts with foreclosure effects",
      "Abuse of dominance if the firm is dominant (EU especially)",
    ],
    evidenceMatters: [
      "Exclusivity terms and incentives",
      "Portion of the market covered",
      "Ability of rivals to reach customers",
    ],
    lawIds: ["sherman-1", "sherman-2", "tfeu-101", "tfeu-102"],
    filingPathIds: ["ftc-complaint", "doj-antitrust", "ec-complaint", "private-suit"],
  },
  {
    id: "access-denied",
    label: "Competitor blocked from access",
    description:
      "A rival cannot reach an input, platform, data, or distribution channel.",
    conduct: ["market_access", "refusal_to_deal", "interoperability"],
    roles: ["competitor", "developer", "small_business", "organization"],
    potentialIssues: [
      "Refusal to deal / interoperability barriers",
      "Gatekeeper obligations under DMA (EU)",
    ],
    evidenceMatters: [
      "Prior course of dealing",
      "Whether access is indispensable",
      "Technical feasibility of interoperability",
      "Efficiency justifications offered",
    ],
    lawIds: ["sherman-2", "tfeu-102", "dma"],
    filingPathIds: ["doj-antitrust", "ec-complaint", "nca", "private-suit"],
  },
  {
    id: "self-preferencing",
    label: "Marketplace favors its own products",
    description:
      "A platform ranks, prices, or features its own offers above third parties.",
    conduct: ["self_preferencing", "discrimination"],
    roles: ["seller", "competitor", "consumer", "small_business"],
    potentialIssues: [
      "Self-preferencing by a dominant platform",
      "DMA self-preferencing prohibitions for gatekeepers (EU)",
    ],
    evidenceMatters: [
      "Ranking / Buy Box screenshots over time",
      "Criteria opacity",
      "Differential fees or data use",
      "Effect on rival visibility and sales",
    ],
    lawIds: ["sherman-2", "ftc-5", "tfeu-102", "dma"],
    filingPathIds: ["ftc-complaint", "ec-complaint", "nca", "state-ag"],
  },
  {
    id: "no-interop",
    label: "Won't allow interoperability",
    description:
      "A firm blocks connections, APIs, sideloading, or data portability that would enable rivals or switching.",
    conduct: ["interoperability", "data_lockin", "refusal_to_deal"],
    roles: ["developer", "consumer", "competitor", "organization"],
    potentialIssues: [
      "Interoperability / portability restrictions",
      "Lock-in that raises switching costs",
      "DMA interoperability duties for designated gatekeepers",
    ],
    evidenceMatters: [
      "API access denials",
      "Technical documentation",
      "Switching cost estimates",
      "Security justifications claimed",
    ],
    lawIds: ["sherman-2", "tfeu-102", "dma", "ftc-5"],
    filingPathIds: ["ec-complaint", "nca", "ftc-complaint", "private-suit"],
  },
  {
    id: "terminated",
    label: "Terminated from a platform",
    description:
      "Account or seller/developer access ended, possibly after complaining or competing.",
    conduct: ["platform_suspension", "discrimination"],
    roles: ["seller", "developer", "small_business"],
    potentialIssues: [
      "Retaliatory or discriminatory termination",
      "Contractual and competition overlaps",
    ],
    evidenceMatters: [
      "Timeline of disputes vs termination",
      "Policy application to similarly situated accounts",
      "Messages and enforcement history",
    ],
    lawIds: ["ftc-5", "sherman-2", "tfeu-102"],
    filingPathIds: [
      "ftc-complaint",
      "state-ag",
      "consumer-protection",
      "private-suit",
      "ec-complaint",
    ],
  },
  {
    id: "license-revoked",
    label: "Digital license revoked",
    description:
      "Access to purchased digital goods or services was removed or restricted.",
    conduct: ["data_lockin", "resale_restriction"],
    roles: ["consumer", "organization"],
    potentialIssues: [
      "Often primarily contract / consumer-protection — competition issues arise if revocation cements lock-in industry-wide",
      "Resale and ownership expectations vs. license terms",
    ],
    evidenceMatters: [
      "Purchase receipts and license terms at time of sale",
      "Revocation notices",
      "Ability to export content",
      "Alternatives and switching costs",
    ],
    lawIds: ["ftc-5"],
    filingPathIds: ["consumer-protection", "ftc-complaint", "state-ag"],
  },
  {
    id: "resale-restricted",
    label: "Resale is restricted",
    description:
      "You cannot resell a product, ticket, or license, or face punishment for doing so.",
    conduct: ["resale_restriction", "vertical_restraint"],
    roles: ["consumer", "distributor", "seller", "small_business"],
    potentialIssues: [
      "Resale price maintenance or distribution restraints (fact-specific)",
      "Aftermarket control and consumer lock-in",
    ],
    evidenceMatters: [
      "Resale bans in contracts",
      "Enforcement against discounters",
      "Market for authorized distribution",
    ],
    lawIds: ["sherman-1", "tfeu-101", "ftc-5"],
    filingPathIds: ["ftc-complaint", "state-ag", "ec-complaint", "private-suit"],
  },
  {
    id: "rivals-disappearing",
    label: "Competitors are disappearing",
    description:
      "Rivals exit, are acquired, or stop competing aggressively in your market.",
    conduct: ["merger", "predatory_pricing", "exclusivity"],
    roles: ["consumer", "competitor", "small_business", "organization"],
    potentialIssues: [
      "Creeping acquisition strategy",
      "Exclusionary conduct driving exit",
      "Coordinated effects in concentrated markets",
    ],
    evidenceMatters: [
      "Timeline of exits and acquisitions",
      "Pricing and quality changes after exits",
      "Entry barriers",
    ],
    lawIds: ["clayton-7", "sherman-2", "tfeu-102", "eu-merger"],
    filingPathIds: ["doj-antitrust", "ftc-complaint", "ec-complaint", "state-ag"],
  },
  {
    id: "coordination",
    label: "Companies appear to be coordinating",
    description:
      "Rivals move prices together, share sensitive info, or divide customers/territories.",
    conduct: ["cartel_coordination"],
    roles: ["consumer", "competitor", "small_business", "organization"],
    potentialIssues: [
      "Cartel or hub-and-spoke conspiracy risk",
      "Information exchange facilitating collusion",
    ],
    evidenceMatters: [
      "Parallel moves with plus factors",
      "Meetings, chats, trade association conduct",
      "Customer allocation signals",
    ],
    lawIds: ["sherman-1", "tfeu-101"],
    filingPathIds: ["doj-antitrust", "ec-complaint", "state-ag", "private-suit"],
  },
  {
    id: "forced-payment",
    label: "Forced to use their payment service",
    description:
      "A platform requires its own billing/payment system and blocks alternatives.",
    conduct: ["tying", "self_preferencing"],
    roles: ["developer", "seller", "small_business", "competitor"],
    potentialIssues: [
      "Tying of distribution to proprietary payments",
      "Anti-steering / fee extraction theories",
    ],
    evidenceMatters: [
      "IAP mandates and fee schedules",
      "Punishments for external links",
      "Availability of alternative processors",
    ],
    lawIds: ["sherman-1", "sherman-2", "tfeu-102", "dma"],
    filingPathIds: [
      "ftc-complaint",
      "doj-antitrust",
      "ec-complaint",
      "private-suit",
      "nca",
    ],
  },
];

export const situationById = Object.fromEntries(
  situations.map((s) => [s.id, s]),
) as Record<string, SituationTemplate>;
