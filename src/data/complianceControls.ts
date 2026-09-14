import type { CheckAudience } from "@/data/complianceCheck";
import { controlTagsForAudience, type ControlAudienceTag } from "@/data/complianceCheck";
import type { Jurisdiction } from "@/data/types";

export type ControlPack =
  | "transparency"
  | "consumer"
  | "competition"
  | "platform"
  | "privacy";

export type ControlStatus =
  | "pass"
  | "partial"
  | "gap"
  | "risk_signal"
  | "not_assessed";

export type Confidence = "low" | "medium" | "high";

export type ComplianceControl = {
  /** Stable control check id (e.g. CW-CP-001) */
  pluginId: string;
  id: string;
  pack: ControlPack;
  title: string;
  requirement: string;
  whyItMatters: string;
  howWeTest: string;
  remediation: string[];
  /** Mapping to common regulatory / standards references (informational) */
  frameworkRefs: string[];
  launchCritical?: boolean;
  audiences: ControlAudienceTag[] | "all";
  jurisdictions: Array<"US" | "EU" | "Both">;
  scanFindingHints?: string[];
  scanDocIds?: string[];
  /** Regex against combined crawled public text → risk */
  scanContentRiskHints?: RegExp[];
  /** Regex against crawled text → supportive pass (e.g. cancel instructions present) */
  scanContentPassHints?: RegExp[];
};

export const CONTROL_PACK_LABEL: Record<ControlPack, string> = {
  transparency: "Transparency & launch docs",
  consumer: "Consumer protection",
  competition: "Competition / antitrust",
  platform: "Platform & marketplace rules",
  privacy: "Privacy & cookies",
};

export const complianceControls: ComplianceControl[] = [
  {
    pluginId: "CW-TR-001",
    id: "ctrl-terms",
    pack: "transparency",
    title: "Terms of Service published",
    requirement:
      "Publish clear Terms of Service / Terms of Use linked from signup and footer.",
    whyItMatters:
      "Sets the contract with users — liability, acceptable use, disputes. Expected before commercial launch.",
    howWeTest:
      "Automated check: document inventory + footer links + Terms page content signals.",
    remediation: [
      "Publish Terms linked from footer and checkout/signup.",
      "Keep a dated version history of material changes.",
    ],
    frameworkRefs: ["EU Consumer Rights Directive (2011/83/EU)", "Common commercial practice"],
    launchCritical: true,
    audiences: "all",
    jurisdictions: ["US", "EU", "Both"],
    scanDocIds: ["terms"],
    scanContentPassHints: [
      /terms\s+of\s+(service|use)/i,
      /governing\s+law/i,
      /limitation\s+of\s+liability/i,
    ],
  },
  {
    pluginId: "CW-PR-001",
    id: "ctrl-privacy",
    pack: "privacy",
    title: "Privacy Policy published",
    requirement:
      "Publish a Privacy Policy covering collection, use, sharing, retention, and user rights.",
    whyItMatters:
      "Required whenever personal data is collected; critical under GDPR/CCPA-style regimes.",
    howWeTest:
      "Automated check: Privacy page detection + content signals (collect, rights, controller).",
    remediation: [
      "Publish Privacy Policy sitewide.",
      "Map what you collect and why; name sharing categories.",
    ],
    frameworkRefs: ["GDPR Art. 13–14", "CCPA/CPRA", "UK GDPR"],
    launchCritical: true,
    audiences: "all",
    jurisdictions: ["US", "EU", "Both"],
    scanDocIds: ["privacy"],
    scanContentPassHints: [
      /privacy\s+policy/i,
      /personal\s+data/i,
      /we\s+collect/i,
      /your\s+rights/i,
    ],
  },
  {
    pluginId: "CW-PR-002",
    id: "ctrl-cookies",
    pack: "privacy",
    title: "Cookie / tracking notice",
    requirement:
      "Disclose cookies and non-essential tracking; provide consent where required (esp. EU/UK).",
    whyItMatters:
      "Cookie consent and transparency are common go-live blockers for EU/UK users.",
    howWeTest:
      "Automated check: Cookie policy page + cookie-banner / notice language on public pages.",
    remediation: [
      "Add Cookie Policy or clear Privacy section on cookies.",
      "Use a real consent mechanism for non-essential cookies in the EEA/UK.",
    ],
    frameworkRefs: ["ePrivacy Directive", "GDPR Art. 7", "UK PECR"],
    launchCritical: true,
    audiences: "all",
    jurisdictions: ["EU", "Both"],
    scanDocIds: ["cookies"],
    scanContentPassHints: [
      /cookie\s+policy/i,
      /we\s+use\s+cookies/i,
      /essential\s+cookies/i,
      /cookie\s+consent/i,
    ],
    scanContentRiskHints: [
      /we\s+use\s+cookies.{0,80}without\s+consent/i,
    ],
  },
  {
    pluginId: "CW-CO-001",
    id: "ctrl-cancel-refund",
    pack: "consumer",
    title: "Cancel / refund path is clear",
    requirement:
      "Users can understand and complete cancel/refund without undue friction; rules are published.",
    whyItMatters:
      "Auto-renew and hard-cancel flows are a top consumer-protection enforcement theme.",
    howWeTest:
      "Automated check: refund/cancel pages, billing terms, dark-pattern keyword plugins on public copy.",
    remediation: [
      "Publish refund/cancel rules.",
      "Make online cancel as easy as signup.",
      "Send clear renewal reminders before charges.",
    ],
    frameworkRefs: ["FTC ROSCA / Negative Option Rule", "EU Consumer Rights Directive", "UK CMA dark patterns"],
    launchCritical: true,
    audiences: "all",
    jurisdictions: ["US", "EU", "Both"],
    scanDocIds: ["refund", "billing"],
    scanFindingHints: [
      "Auto-renew",
      "Hard-to-cancel",
      "cancellation friction",
      "Free / trial",
    ],
    scanContentPassHints: [
      /how\s+to\s+cancel/i,
      /refund\s+policy/i,
      /cancellation\s+policy/i,
      /cancel\s+subscription/i,
    ],
    scanContentRiskHints: [
      /contact\s+support\s+to\s+cancel/i,
      /cannot\s+be\s+cancelled/i,
      /early\s+termination\s+fee/i,
      /automatically\s+renew/i,
    ],
  },
  {
    pluginId: "CW-CO-002",
    id: "ctrl-pricing-clarity",
    pack: "consumer",
    title: "Pricing & fee transparency",
    requirement:
      "Show total price and mandatory fees clearly before purchase; avoid vague fee-only disclosure.",
    whyItMatters:
      "Deceptive-fee and drip-pricing theories are active in the US and EU.",
    howWeTest:
      "Automated check: pricing pages + vague-fee / drip-pricing keyword plugins.",
    remediation: [
      "Show all-in price before checkout.",
      "Align ads, landing pages, and checkout terms.",
    ],
    frameworkRefs: ["FTC pricing guidance", "EU Omnibus Directive (price transparency)", "UK CMA drip pricing"],
    launchCritical: false,
    audiences: ["developer", "small_business", "seller", "platform"],
    jurisdictions: ["US", "EU", "Both"],
    scanFindingHints: ["Pricing / fee", "fee transparency"],
    scanContentRiskHints: [
      /fees?\s+may\s+apply/i,
      /starting\s+at\b/i,
      /\+\s*fees/i,
      /additional\s+charges?\s+may/i,
    ],
    scanContentPassHints: [
      /all[-\s]?in\s+price/i,
      /total\s+price/i,
      /including\s+(taxes|fees)/i,
    ],
  },
  {
    pluginId: "CW-TR-002",
    id: "ctrl-contact",
    pack: "transparency",
    title: "Contact / trader identity",
    requirement:
      "Provide a working contact path and, where required, legal entity / imprint details.",
    whyItMatters:
      "Consumers and regulators expect a way to reach the business; EU trader-identity rules are strict.",
    howWeTest:
      "Automated check: contact/imprint pages + email/address signals in public HTML.",
    remediation: [
      "Add Contact/Support with email (and address where required).",
      "Publish legal entity name on About/Imprint.",
    ],
    frameworkRefs: ["EU E-Commerce Directive (trader info)", "Impressum (DE/AT)", "FTC contact expectations"],
    launchCritical: true,
    audiences: "all",
    jurisdictions: ["US", "EU", "Both"],
    scanDocIds: ["contact", "imprint"],
    scanContentPassHints: [
      /contact\s+us/i,
      /customer\s+support/i,
      /registered\s+(office|address|company)/i,
      /company\s+(number|registration)/i,
      /@[a-z0-9.-]+\.[a-z]{2,}/i,
    ],
  },
  {
    pluginId: "CW-CP-001",
    id: "ctrl-rival-talk",
    pack: "competition",
    title: "Public copy: competitor coordination language",
    requirement:
      "Public materials must not describe price/customer coordination with competitors.",
    whyItMatters:
      "Cartel and information-exchange enforcement treats competitor pricing talks as high severity.",
    howWeTest:
      "Automated check: cartel / price-fix / bid-rig keyword plugins on all public pages.",
    remediation: [
      "Remove any public language suggesting competitor coordination.",
      "Train staff; escalate any past discussion to counsel.",
    ],
    frameworkRefs: ["Sherman Act §1 (US)", "EU Art. 101 TFEU", "UK Chapter I CA98"],
    launchCritical: true,
    audiences: "all",
    jurisdictions: ["US", "EU", "Both"],
    scanContentRiskHints: [
      /agree(?:d|ment)?\s+.*(price|pricing|bid)/i,
      /coordinate\s+.*(price|bid)/i,
      /discuss.{0,40}(price|customer|territor).{0,40}competitor/i,
    ],
  },
  {
    pluginId: "CW-CP-002",
    id: "ctrl-no-poach",
    pack: "competition",
    title: "No-poach / non-solicit language (public)",
    requirement:
      "Public terms must not contain competitor no-poach or wage-fix style clauses.",
    whyItMatters:
      "No-poach agreements between competitors are a major US/EU enforcement focus.",
    howWeTest:
      "Automated check: no-poach / non-solicit keyword plugins on Terms and partner pages.",
    remediation: [
      "Remove competitor no-poach clauses from public terms.",
      "Limit non-solicits to legitimate collaborations with counsel review.",
    ],
    frameworkRefs: ["DOJ/FTC antitrust guidance (no-poach)", "EU national competition authority practice"],
    launchCritical: true,
    audiences: ["small_business", "organization", "platform", "developer"],
    jurisdictions: ["US", "EU", "Both"],
    scanFindingHints: ["Non-compete", "no-poach"],
    scanContentRiskHints: [
      /no[-\s]?poach/i,
      /shall\s+not\s+hire/i,
      /non[-\s]?solicit/i,
      /agree\s+not\s+to\s+(solicit|recruit)/i,
    ],
  },
  {
    pluginId: "CW-CP-003",
    id: "ctrl-exclusivity",
    pack: "competition",
    title: "Exclusivity / sole-dealing language",
    requirement:
      "Public exclusivity terms should be narrow; wide foreclosure language needs review.",
    whyItMatters:
      "Wide exclusivity can foreclose rivals — recurring theme in vertical and dominance cases.",
    howWeTest:
      "Automated check: exclusivity / sole-dealer keyword plugins on partner and legal pages.",
    remediation: [
      "Shorten exclusivity; add carve-outs.",
      "Track share of distribution covered.",
    ],
    frameworkRefs: ["EU vertical block exemption guidance", "US vertical restraint case law"],
    launchCritical: false,
    audiences: "all",
    jurisdictions: ["US", "EU", "Both"],
    scanFindingHints: ["Exclusivity", "sole dealing"],
    scanContentRiskHints: [
      /exclusive\s+(partner|dealer|distributor|right|agreement)/i,
      /sole\s+(distributor|supplier|partner)/i,
      /shall\s+not\s+(sell|offer|deal).{0,40}competitor/i,
    ],
  },
  {
    pluginId: "CW-CP-004",
    id: "ctrl-mfn",
    pack: "competition",
    title: "Price parity / MFN language",
    requirement:
      "Avoid wide most-favoured-nation / price-parity clauses in public partner terms.",
    whyItMatters:
      "MFNs and parity clauses have been heavily scrutinized (especially EU platform/OTA cases).",
    howWeTest:
      "Automated check: MFN / price-parity keyword plugins.",
    remediation: [
      "Remove wide MFNs from public terms.",
      "Check national rules before any narrow parity term.",
    ],
    frameworkRefs: ["EU Booking.com MFN cases", "US platform parity scrutiny"],
    launchCritical: false,
    audiences: ["platform", "seller", "small_business", "developer"],
    jurisdictions: ["US", "EU", "Both"],
    scanFindingHints: ["Price parity", "most-favored", "MFN"],
    scanContentRiskHints: [
      /most[-\s]?favou?red/i,
      /price\s+parity/i,
      /best\s+price\s+guarantee/i,
      /not\s+(offer|sell).{0,30}(lower|cheaper).{0,30}(elsewhere|other)/i,
    ],
  },
  {
    pluginId: "CW-CP-005",
    id: "ctrl-tying",
    pack: "competition",
    title: "Forced bundle / must-take language",
    requirement:
      "Do not publicly require purchase of a second product without a standalone option.",
    whyItMatters:
      "Tying and forced bundling raise concerns when alternatives are limited.",
    howWeTest:
      "Automated check: must-purchase / cannot-buy-separately keyword plugins.",
    remediation: [
      "Offer a standalone option where feasible.",
      "Show à-la-carte pricing.",
    ],
    frameworkRefs: ["EU Art. 102(d) tying", "US Sherman Act tying jurisprudence"],
    launchCritical: false,
    audiences: ["developer", "platform", "small_business", "seller"],
    jurisdictions: ["US", "EU", "Both"],
    scanFindingHints: ["Forced bundle", "must-take"],
    scanContentRiskHints: [
      /must\s+(also\s+)?(purchase|buy|subscribe|accept)/i,
      /cannot\s+be\s+(purchased|sold)\s+separately/i,
      /mandatory\s+(add[-\s]?on|bundle)/i,
    ],
  },
  {
    pluginId: "CW-PL-001",
    id: "ctrl-iap",
    pack: "platform",
    title: "Payment routing / anti-steering signals",
    requirement:
      "If you mandate platform payments, check local rules on alternative payments and external links.",
    whyItMatters:
      "App-store and platform payment mandates are a live DMA / antitrust / consumer topic.",
    howWeTest:
      "Automated check: IAP / anti-steering / mandatory-checkout keyword plugins.",
    remediation: [
      "Document why payment routing is required.",
      "Offer compliant alternative paths where law requires.",
    ],
    frameworkRefs: ["EU DMA Art. 5(4) / 6(4)", "Apple/Google payment cases", "Epic v. Apple"],
    launchCritical: false,
    audiences: ["developer", "platform"],
    jurisdictions: ["US", "EU", "Both"],
    scanFindingHints: ["Payment / billing mandate", "in-app purchase", "anti-steering"],
    scanContentRiskHints: [
      /must\s+use\s+(our|the)\s+(payment|billing|checkout)/i,
      /no\s+external\s+(payment|link|billing)/i,
      /in[-\s]?app\s+purchase/i,
    ],
  },
  {
    pluginId: "CW-PL-002",
    id: "ctrl-self-prefer",
    pack: "platform",
    title: "Self-preferencing / ranking disclosure",
    requirement:
      "If you host rivals, publish ranking criteria and avoid unjustified own-brand preference.",
    whyItMatters:
      "Self-preferencing is central to platform and DMA-style duties.",
    howWeTest:
      "Automated check: buy-box / preferred-listing / own-brand promotion keyword plugins.",
    remediation: [
      "Publish ranking and enforcement rules.",
      "Apply criteria evenly to first- and third-party listings.",
    ],
    frameworkRefs: ["EU DMA Art. 6(5)", "EU P2B Regulation ranking transparency"],
    launchCritical: false,
    audiences: ["platform"],
    jurisdictions: ["US", "EU", "Both"],
    scanFindingHints: ["Self-preferencing", "own-brand", "Buy box", "preferred"],
    scanContentRiskHints: [
      /featured\s+(only\s+)?(our|own)\s+(brand|product|seller)/i,
      /preferred\s+(partner|seller|listing)/i,
    ],
    scanContentPassHints: [
      /ranking\s+(criteria|algorithm|factors)/i,
      /how\s+search\s+results\s+are\s+ranked/i,
    ],
  },
  {
    pluginId: "CW-PL-003",
    id: "ctrl-api-access",
    pack: "platform",
    title: "Developer / API terms published",
    requirement:
      "Publish developer or API terms with access criteria and acceptable use rules.",
    whyItMatters:
      "Refusal-to-deal and interoperability themes arise when platforms gate APIs without rules.",
    howWeTest:
      "Automated check: developer/API/AUP page detection + content signals.",
    remediation: [
      "Publish access criteria and appeal path.",
      "Separate security limits from competitive foreclosure.",
    ],
    frameworkRefs: ["EU DMA gatekeeper interoperability duties", "EU P2B Regulation"],
    launchCritical: false,
    audiences: ["platform", "developer"],
    jurisdictions: ["US", "EU", "Both"],
    scanContentPassHints: [
      /developer\s+(terms|agreement|policy)/i,
      /api\s+(terms|access|policy|documentation)/i,
      /acceptable\s+use/i,
    ],
    scanContentRiskHints: [
      /api\s+access.{0,60}(revoked|terminated).{0,40}without\s+(notice|reason)/i,
    ],
  },
  {
    pluginId: "CW-CO-003",
    id: "ctrl-geo",
    pack: "consumer",
    title: "Geo-blocking / region restrictions",
    requirement:
      "Document lawful reasons for geo-blocks; review EU geo-blocking exposure if selling into EEA.",
    whyItMatters:
      "Unjustified geo-discrimination can clash with EU single-market / geo-blocking rules.",
    howWeTest:
      "Automated check: geo-block / region-restriction keyword plugins.",
    remediation: [
      "Document licensing or legal bases for region locks.",
      "Review EEA sales paths for unjustified discrimination.",
    ],
    frameworkRefs: ["EU Geo-blocking Regulation (2018/302)", "EU Services Directive"],
    launchCritical: false,
    audiences: ["developer", "seller", "platform", "small_business"],
    jurisdictions: ["EU", "Both"],
    scanFindingHints: ["Geo-blocking", "region restrictions"],
    scanContentRiskHints: [
      /not\s+available\s+in\s+your\s+(country|region)/i,
      /geo[-\s]?block/i,
      /restricted\s+(by|to)\s+(region|country)/i,
    ],
  },
  {
    pluginId: "CW-PR-003",
    id: "ctrl-ccpa",
    pack: "privacy",
    title: "US privacy choices / Do Not Sell",
    requirement:
      "If you sell or share personal information of California consumers, provide required opt-out choices.",
    whyItMatters:
      "State privacy laws expect clear privacy choices beyond a generic Privacy Policy.",
    howWeTest:
      "Automated check: Do Not Sell / privacy-choices page detection.",
    remediation: [
      "Add a privacy choices / Do Not Sell or Share mechanism if those laws apply.",
      "Link it from the footer and Privacy Policy.",
    ],
    frameworkRefs: ["CCPA/CPRA", "Colorado CPA", "Virginia VCDPA"],
    launchCritical: false,
    audiences: "all",
    jurisdictions: ["US", "Both"],
    scanDocIds: ["ccpa"],
    scanContentPassHints: [
      /do\s+not\s+sell/i,
      /do\s+not\s+share/i,
      /california\s+privacy/i,
      /privacy\s+choices/i,
    ],
  },
  {
    pluginId: "CW-TR-003",
    id: "ctrl-accessibility",
    pack: "transparency",
    title: "Accessibility statement",
    requirement:
      "Publish an accessibility statement where required or expected (public sector / EU).",
    whyItMatters:
      "Increasingly expected; mandatory in some public-sector and EU contexts.",
    howWeTest:
      "Automated check: accessibility statement page detection.",
    remediation: [
      "Publish an accessibility statement and remediation contact.",
    ],
    frameworkRefs: ["WCAG 2.1", "EU Web Accessibility Directive", "ADA Title III (US)"],
    launchCritical: false,
    audiences: "all",
    jurisdictions: ["US", "EU", "Both"],
    scanDocIds: ["accessibility"],
    scanContentPassHints: [
      /accessibility\s+statement/i,
      /wcag/i,
    ],
  },
  {
    pluginId: "CW-TR-004",
    id: "ctrl-shipping",
    pack: "consumer",
    title: "Shipping / delivery policy (physical goods)",
    requirement:
      "If you ship physical products, publish delivery times, costs, and regions.",
    whyItMatters:
      "Required in practice for distance selling under many consumer rules.",
    howWeTest:
      "Automated check: shipping/delivery policy page detection.",
    remediation: [
      "Publish delivery times, costs, and regions served.",
    ],
    frameworkRefs: ["EU Consumer Rights Directive (delivery info)", "FTC Mail/Internet Order Rule"],
    launchCritical: false,
    audiences: ["small_business", "seller"],
    jurisdictions: ["US", "EU", "Both"],
    scanDocIds: ["shipping"],
    scanContentPassHints: [
      /shipping\s+policy/i,
      /delivery\s+(times?|policy)/i,
    ],
  },
];

export function controlsForContext(input: {
  audience: CheckAudience;
  jurisdiction: Jurisdiction;
}): ComplianceControl[] {
  const j =
    input.jurisdiction === "Other" ? "Both" : (input.jurisdiction as "US" | "EU" | "Both");
  const tags = controlTagsForAudience(input.audience);

  return complianceControls.filter((c) => {
    const audienceOk =
      tags === "all" ||
      c.audiences === "all" ||
      c.audiences.some((a) => tags.includes(a));
    const jurOk =
      c.jurisdictions.includes("Both") ||
      c.jurisdictions.includes(j) ||
      (j === "Both" && (c.jurisdictions.includes("US") || c.jurisdictions.includes("EU")));
    return audienceOk && jurOk;
  });
}
