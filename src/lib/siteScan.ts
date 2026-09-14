export type SiteFinding = {
  id: string;
  title: string;
  severity: "info" | "watch" | "elevated";
  domain: "competition" | "consumer" | "market_rules" | "transparency";
  detail: string;
  evidence: string;
  whatToDo: string;
  pages: string[];
};

export type DocumentStatus = "found" | "weak" | "missing";

export type RequiredDocument = {
  id: string;
  label: string;
  category: "legal" | "consumer" | "privacy" | "commerce" | "trust";
  requiredForLaunch: boolean;
  missingSeverity: "info" | "watch" | "elevated";
  status: DocumentStatus;
  url?: string;
  evidence: string;
  whyItMatters: string;
  whatToDo: string;
};

export type ScanProgressEvent =
  | { type: "status"; message: string }
  | { type: "progress"; current: number; total: number; url: string }
  | { type: "page"; url: string; ok: boolean }
  | { type: "finding"; finding: SiteFinding }
  | { type: "done"; result: SiteScanResult };

export type SiteScanResult = {
  url: string;
  fetchedOk: boolean;
  error?: string;
  pagesScanned: string[];
  pagesFailed: string[];
  findings: SiteFinding[];
  documents: RequiredDocument[];
  summary: string[];
  executiveSummary: string[];
  checklist: string[];
  stats: {
    pagesOk: number;
    pagesFailed: number;
    elevated: number;
    watch: number;
    info: number;
    charsScanned: number;
    docsFound: number;
    docsWeak: number;
    docsMissing: number;
    pdfPages: number;
    jsRendered: number;
    offsitePages: number;
    sitemapUrls: number;
    cmsPlatform?: string | null;
  };
  scannedAt: string;
  disclaimer: string;
  /** Combined public text from crawled pages — used by compliance scanner plugins */
  aggregatedPublicText?: string;
};

type Pattern = {
  id: string;
  title: string;
  severity: SiteFinding["severity"];
  domain: SiteFinding["domain"];
  patterns: RegExp[];
  detail: string;
  whatToDo: string;
};

const MAX_PAGES = 50;
const MAX_JS_RENDERS = 10;
const MAX_PDF_PAGES = 12;
const MAX_SITEMAP_FILES = 14;
const MAX_SITEMAP_DEPTH = 3;
const MAX_SITEMAP_URLS = 500;
const THIN_TEXT_CHARS = 480;

/** Hosts that commonly host privacy/terms for other brands (allow when linked). */
const POLICY_HOST_ALLOWLIST = [
  "iubenda.com",
  "termly.io",
  "termly.com",
  "getterms.io",
  "privacypolicies.com",
  "cookiebot.com",
  "onetrust.com",
  "cookielaw.org",
  "trustarc.com",
  "osano.com",
  "cookiefirst.com",
  "privacymanager.io",
  "policies.google.com",
  "legal.yahoo.com",
];

const POLICY_PATH_RE =
  /terms|privacy|legal|eula|policy|refund|cookie|gdpr|ccpa|dpa|tos|conditions|cancel|billing|imprint|impressum|disclosure|compliance|aup|license|notice|consent|do-not-sell|donotsell|children-privacy|coppa|shipping|return|subscription/;

const COMMON_PATHS = [
  "/",
  "/terms",
  "/terms-of-service",
  "/terms-of-use",
  "/tos",
  "/legal",
  "/legal/terms",
  "/legal/privacy",
  "/privacy",
  "/privacy-policy",
  "/privacy-notice",
  "/privacypolicy",
  "/cookie-policy",
  "/cookies",
  "/cookie-notice",
  "/gdpr",
  "/ccpa",
  "/do-not-sell",
  "/donotsell",
  "/your-privacy-choices",
  "/pricing",
  "/plans",
  "/refund",
  "/refund-policy",
  "/returns",
  "/return-policy",
  "/cancellation",
  "/cancel",
  "/cancel-subscription",
  "/billing",
  "/subscriptions",
  "/shipping",
  "/shipping-policy",
  "/delivery",
  "/contact",
  "/contact-us",
  "/support",
  "/help",
  "/help-center",
  "/faq",
  "/about",
  "/about-us",
  "/company",
  "/imprint",
  "/impressum",
  "/legal-notice",
  "/company-information",
  "/accessibility",
  "/accessibility-statement",
  "/partners",
  "/affiliate",
  "/affiliates",
  "/affiliate-disclosure",
  "/disclosures",
  "/developers",
  "/docs",
  "/api",
  "/sellers",
  "/marketplace",
  "/merchant",
  "/vendors",
  "/enterprise",
  "/checkout",
  "/cart",
  "/shop",
  "/store",
  "/eula",
  "/license",
  "/acceptable-use",
  "/aup",
  "/community-guidelines",
  "/content-policy",
  "/dmca",
  "/copyright",
  "/trust",
  "/security",
  "/compliance",
  "/children-privacy",
  "/coppa",
];

type DocDef = {
  id: string;
  label: string;
  category: RequiredDocument["category"];
  requiredForLaunch: boolean;
  missingSeverity: RequiredDocument["missingSeverity"];
  urlHints: RegExp[];
  contentHints: RegExp[];
  minChars: number;
  whyItMatters: string;
  whatToDo: string;
};

const REQUIRED_DOCS: DocDef[] = [
  {
    id: "terms",
    label: "Terms of Service / Terms of Use",
    category: "legal",
    requiredForLaunch: true,
    missingSeverity: "elevated",
    urlHints: [/terms/, /tos\b/, /conditions/, /user-agreement/, /eula/],
    contentHints: [
      /terms\s+of\s+(service|use)/i,
      /user\s+agreement/i,
      /these\s+terms/i,
      /governing\s+law/i,
      /limitation\s+of\s+liability/i,
    ],
    minChars: 800,
    whyItMatters:
      "Sets the contract between you and users — liability, acceptable use, disputes. Almost every commercial site needs this before launch.",
    whatToDo:
      "Publish clear Terms linked from the footer and signup/checkout flows.",
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    category: "privacy",
    requiredForLaunch: true,
    missingSeverity: "elevated",
    urlHints: [/privacy/, /privacypolicy/, /data-protection/, /gdpr/],
    contentHints: [
      /privacy\s+policy/i,
      /personal\s+data/i,
      /we\s+collect/i,
      /data\s+controller/i,
      /cookies?\s+and/i,
      /your\s+rights/i,
    ],
    minChars: 800,
    whyItMatters:
      "Expected whenever you collect personal data (accounts, analytics, forms). Critical under GDPR/CCPA-style regimes.",
    whatToDo:
      "Publish a Privacy Policy covering collection, use, sharing, retention, and user rights; link it sitewide.",
  },
  {
    id: "cookies",
    label: "Cookie Policy / Cookie notice",
    category: "privacy",
    requiredForLaunch: true,
    missingSeverity: "watch",
    urlHints: [/cookie/],
    contentHints: [
      /cookie\s+policy/i,
      /cookie\s+notice/i,
      /we\s+use\s+cookies/i,
      /essential\s+cookies/i,
      /analytics\s+cookies/i,
    ],
    minChars: 300,
    whyItMatters:
      "Especially important for EU/UK users — cookie consent and transparency are common go-live blockers.",
    whatToDo:
      "Add a Cookie Policy (or clear cookie section in Privacy) plus a real consent mechanism where required.",
  },
  {
    id: "refund",
    label: "Refund / Return / Cancellation policy",
    category: "consumer",
    requiredForLaunch: true,
    missingSeverity: "elevated",
    urlHints: [/refund/, /return/, /cancellation/, /cancel/],
    contentHints: [
      /refund\s+policy/i,
      /return\s+policy/i,
      /cancellation\s+policy/i,
      /how\s+to\s+cancel/i,
      /money[-\s]?back/i,
    ],
    minChars: 250,
    whyItMatters:
      "Consumer-protection hotspot for paid products and subscriptions. Missing cancel/refund rules create complaints fast.",
    whatToDo:
      "Publish refund/cancel rules and make self-serve cancel as easy as signup.",
  },
  {
    id: "billing",
    label: "Billing / Subscription terms",
    category: "commerce",
    requiredForLaunch: false,
    missingSeverity: "watch",
    urlHints: [/billing/, /subscription/, /pricing/, /plans/],
    contentHints: [
      /auto[-\s]?renew/i,
      /subscription\s+terms/i,
      /billing\s+cycle/i,
      /recurring\s+(charge|payment)/i,
      /price\s+changes?/i,
    ],
    minChars: 200,
    whyItMatters:
      "Needed if you sell subscriptions — users must understand renewals, charges, and price changes.",
    whatToDo:
      "Disclose renewal timing, price, and cancel steps on pricing and checkout pages.",
  },
  {
    id: "contact",
    label: "Contact / Support page",
    category: "trust",
    requiredForLaunch: true,
    missingSeverity: "elevated",
    urlHints: [/contact/, /support/, /help/],
    contentHints: [
      /contact\s+us/i,
      /customer\s+support/i,
      /email\s+us/i,
      /@\w+\.\w+/,
      /phone/i,
    ],
    minChars: 80,
    whyItMatters:
      "Consumers and regulators expect a way to reach the business. Missing contact details undermines trust and complaint handling.",
    whatToDo:
      "Add a Contact/Support page with email and, where required, a physical address.",
  },
  {
    id: "imprint",
    label: "Company / Legal notice (Imprint)",
    category: "legal",
    requiredForLaunch: true,
    missingSeverity: "watch",
    urlHints: [/imprint/, /impressum/, /legal-notice/, /company-information/, /about/],
    contentHints: [
      /impressum/i,
      /legal\s+notice/i,
      /registered\s+(office|address|company)/i,
      /company\s+(number|registration)/i,
      /vat\s+(id|number)/i,
    ],
    minChars: 120,
    whyItMatters:
      "EU/EEA trader identity rules (Impressum-style) often require clear company identification on the site.",
    whatToDo:
      "Publish legal entity name, address, and contact in an About/Imprint/Legal notice page linked from the footer.",
  },
  {
    id: "pricing",
    label: "Pricing page",
    category: "commerce",
    requiredForLaunch: false,
    missingSeverity: "watch",
    urlHints: [/pricing/, /plans/, /shop/, /store/],
    contentHints: [
      /pricing/i,
      /per\s+month/i,
      /\$|€|£/,
      /plan/i,
      /fees?/i,
    ],
    minChars: 100,
    whyItMatters:
      "If you sell, transparent pricing reduces deceptive-fee risk and support burden.",
    whatToDo:
      "Show clear plan prices and any mandatory fees before checkout.",
  },
  {
    id: "shipping",
    label: "Shipping / Delivery policy",
    category: "consumer",
    requiredForLaunch: false,
    missingSeverity: "info",
    urlHints: [/shipping/, /delivery/],
    contentHints: [
      /shipping\s+policy/i,
      /delivery\s+(times?|policy)/i,
      /shipping\s+costs?/i,
    ],
    minChars: 120,
    whyItMatters:
      "Required in practice for physical goods sellers under many consumer distance-selling rules.",
    whatToDo:
      "If you ship products, publish delivery times, costs, and regions served.",
  },
  {
    id: "aup",
    label: "Acceptable Use / Community guidelines",
    category: "legal",
    requiredForLaunch: false,
    missingSeverity: "info",
    urlHints: [/acceptable-use/, /\baup\b/, /community/, /content-policy/, /guidelines/],
    contentHints: [
      /acceptable\s+use/i,
      /community\s+guidelines/i,
      /prohibited\s+(content|conduct)/i,
    ],
    minChars: 200,
    whyItMatters:
      "Important for platforms, marketplaces, and UGC products before opening to the public.",
    whatToDo:
      "Publish clear prohibited-conduct rules and enforcement process.",
  },
  {
    id: "ccpa",
    label: "Do Not Sell / Privacy choices (US)",
    category: "privacy",
    requiredForLaunch: false,
    missingSeverity: "info",
    urlHints: [/do-not-sell/, /donotsell/, /privacy-choices/, /ccpa/, /your-privacy/],
    contentHints: [
      /do\s+not\s+sell/i,
      /share\s+my\s+personal\s+information/i,
      /california\s+privacy/i,
      /privacy\s+choices/i,
    ],
    minChars: 100,
    whyItMatters:
      "Relevant if you have California (or similar state) consumers and sell/share personal information.",
    whatToDo:
      "Add a privacy choices / Do Not Sell or Share mechanism if those laws apply to you.",
  },
  {
    id: "accessibility",
    label: "Accessibility statement",
    category: "trust",
    requiredForLaunch: false,
    missingSeverity: "info",
    urlHints: [/accessibility/],
    contentHints: [
      /accessibility\s+statement/i,
      /wcag/i,
      /web\s+content\s+accessibility/i,
    ],
    minChars: 120,
    whyItMatters:
      "Increasingly expected; mandatory in some public-sector / EU contexts.",
    whatToDo:
      "Publish an accessibility statement and remediation contact.",
  },
  {
    id: "affiliate",
    label: "Affiliate / advertising disclosure",
    category: "trust",
    requiredForLaunch: false,
    missingSeverity: "info",
    urlHints: [/affiliate/, /disclosure/, /disclosures/],
    contentHints: [
      /affiliate\s+disclosure/i,
      /may\s+earn\s+a\s+commission/i,
      /material\s+connection/i,
      /sponsored/i,
    ],
    minChars: 80,
    whyItMatters:
      "Needed if you monetize via affiliates or sponsored content — transparency rules apply.",
    whatToDo:
      "Disclose affiliate/ad relationships clearly near recommendations.",
  },
  {
    id: "dmca",
    label: "DMCA / IP complaint page",
    category: "legal",
    requiredForLaunch: false,
    missingSeverity: "info",
    urlHints: [/dmca/, /copyright/],
    contentHints: [
      /dmca/i,
      /copyright\s+(complaint|agent|infringement)/i,
      /takedown/i,
    ],
    minChars: 120,
    whyItMatters:
      "Useful for content platforms seeking safer handling of IP notices.",
    whatToDo:
      "If users upload content, publish a copyright complaint process and designated agent details.",
  },
  {
    id: "security",
    label: "Security / Trust page",
    category: "trust",
    requiredForLaunch: false,
    missingSeverity: "info",
    urlHints: [/security/, /trust/, /compliance/],
    contentHints: [
      /security\s+(overview|practices)/i,
      /encryption/i,
      /soc\s*2/i,
      /trust\s+center/i,
    ],
    minChars: 150,
    whyItMatters:
      "Not always legally required, but helps B2B/SaaS buyers and reduces diligence friction.",
    whatToDo:
      "Add a short security/trust page summarizing protections and contact for incidents.",
  },
];

const PATTERNS: Pattern[] = [
  {
    id: "exclusive",
    title: "Exclusivity / sole dealing language",
    severity: "elevated",
    domain: "competition",
    patterns: [
      /exclusive\s+(partner|dealer|distributor|supplier|right|agreement)/i,
      /sole\s+(distributor|supplier|partner)/i,
      /shall\s+not\s+(sell|offer|deal|distribute).{0,40}competitor/i,
      /only\s+authorized\s+(reseller|dealer)/i,
      /must\s+not\s+(carry|sell|offer).{0,30}(competing|rival)/i,
    ],
    detail:
      "Public pages mention exclusivity or sole-dealing style terms. That can be lawful, but exclusivity covering a large share of distribution is a recurring competition theme.",
    whatToDo:
      "Review partner contracts for duration, market coverage, and carve-outs. Document why exclusivity is needed.",
  },
  {
    id: "mfn",
    title: "Price parity / most-favored terms",
    severity: "elevated",
    domain: "competition",
    patterns: [
      /most[-\s]?favou?red/i,
      /price\s+parity/i,
      /best\s+price\s+guarantee/i,
      /not\s+(offer|sell).{0,30}(lower|cheaper).{0,30}(elsewhere|other\s+(site|channel|platform))/i,
      /equal\s+or\s+better\s+price/i,
      /lowest\s+price\s+(online|guarantee)/i,
    ],
    detail:
      "Language suggests parity / MFN-style constraints on pricing across channels — heavily scrutinized in EU OTA and platform cases.",
    whatToDo:
      "Remove wide MFNs if present; check national rules before using narrow parity clauses.",
  },
  {
    id: "tying",
    title: "Forced bundle / must-take language",
    severity: "watch",
    domain: "competition",
    patterns: [
      /must\s+(also\s+)?(purchase|buy|subscribe|accept)/i,
      /required\s+to\s+(use|purchase|buy)\s+our/i,
      /cannot\s+be\s+(purchased|sold)\s+separately/i,
      /mandatory\s+(add[-\s]?on|bundle|package)/i,
      /only\s+available\s+(as|with)\s+(a\s+)?bundle/i,
    ],
    detail:
      "Copy suggests buyers may be forced into an extra product or service. Forced bundling can raise tying concerns when alternatives are limited.",
    whatToDo:
      "Offer a clear standalone option where feasible and show à-la-carte pricing.",
  },
  {
    id: "iap",
    title: "Payment / billing mandate signals",
    severity: "watch",
    domain: "competition",
    patterns: [
      /in[-\s]?app\s+purchase/i,
      /must\s+use\s+(our|the)\s+(payment|billing|checkout)/i,
      /no\s+external\s+(payment|link|billing)/i,
      /anti[-\s]?steering/i,
      /payment\s+processing\s+(is\s+)?(mandatory|required)/i,
    ],
    detail:
      "Payment routing / IAP style constraints appear — a hot area for app stores and platform rules (including DMA-style duties).",
    whatToDo:
      "Check whether alternative payments or external links are required in your markets.",
  },
  {
    id: "auto-renew",
    title: "Auto-renew / cancellation friction signals",
    severity: "elevated",
    domain: "consumer",
    patterns: [
      /auto[-\s]?renew/i,
      /automatically\s+renew/i,
      /negative\s+option/i,
      /cancel.{0,40}(call|phone|mail|difficult|hard)/i,
      /subscription.{0,30}(cannot|can't|may not)\s+be\s+cancelled/i,
      /renewals?\s+unless\s+(you\s+)?cancel/i,
    ],
    detail:
      "Auto-renew or hard-cancel language is a major consumer-protection focus (FTC / EU unfair practices).",
    whatToDo:
      "Make cancel as easy as signup; send clear renewal reminders; keep consent records.",
  },
  {
    id: "free-trial",
    title: "Free / trial claims that may need clarity",
    severity: "watch",
    domain: "consumer",
    patterns: [
      /\bfree\s+trial\b/i,
      /\bfree\s+forever\b/i,
      /no\s+credit\s+card\s+required/i,
      /risk[-\s]?free/i,
      /100%\s+free/i,
    ],
    detail:
      "‘Free’ and trial claims need crystal-clear conversion terms. Mismatch between ads and billing is a classic deceptive-practice issue.",
    whatToDo:
      "Show when charges start, price after trial, and how to cancel before first charge.",
  },
  {
    id: "resale",
    title: "Resale / transfer restrictions",
    severity: "watch",
    domain: "competition",
    patterns: [
      /non[-\s]?transferable/i,
      /may\s+not\s+resell/i,
      /no\s+resale/i,
      /license.{0,40}not.{0,20}(ownership|own)/i,
    ],
    detail:
      "Resale or transfer bans can be contractually common for software, but they also raise consumer expectations and occasional vertical-restraint questions.",
    whatToDo:
      "Be clear at purchase whether the customer owns a product or a limited license.",
  },
  {
    id: "geo",
    title: "Geo-blocking / region restrictions",
    severity: "watch",
    domain: "market_rules",
    patterns: [
      /not\s+available\s+in\s+your\s+(country|region)/i,
      /geo[-\s]?block/i,
      /restricted\s+(by|to)\s+(region|country|territory)/i,
      /eea\s+only|eu\s+only|us\s+customers\s+only/i,
    ],
    detail:
      "Region locks can be lawful (licensing) but EU geo-blocking / single-market rules may apply depending on facts.",
    whatToDo:
      "Document lawful reasons for any geo restriction; review EU geo-blocking exposure if you sell into the EEA.",
  },
  {
    id: "self-prefer",
    title: "Self-preferencing / own-brand promotion",
    severity: "watch",
    domain: "competition",
    patterns: [
      /featured\s+(only\s+)?(our|own)\s+(brand|product|seller)/i,
      /preferred\s+(partner|seller|listing)/i,
      /buy\s+box/i,
      /promoted\s+listing/i,
    ],
    detail:
      "Promoting your own offers above others on a marketplace can raise self-preferencing themes if you host rivals.",
    whatToDo:
      "Publish ranking criteria and apply them evenly to first-party and third-party listings.",
  },
  {
    id: "noncompete",
    title: "Non-compete / no-poach style language",
    severity: "elevated",
    domain: "competition",
    patterns: [
      /non[-\s]?compete/i,
      /non[-\s]?solicitation/i,
      /no[-\s]?poach/i,
      /shall\s+not\s+hire/i,
      /agree\s+not\s+to\s+(solicit|recruit)\s+(each\s+other.?s\s+)?(employees|staff|workers)/i,
    ],
    detail:
      "Non-competes and no-poach language between companies can create serious competition risk, especially among rivals.",
    whatToDo:
      "Have counsel review any no-poach or competitor non-solicit terms immediately.",
  },
  {
    id: "dark-pattern",
    title: "Hard-to-cancel / retention dark-pattern signals",
    severity: "elevated",
    domain: "consumer",
    patterns: [
      /contact\s+support\s+to\s+cancel/i,
      /cancellation\s+fee/i,
      /early\s+termination\s+fee/i,
      /retain\s+your\s+(data|content).{0,40}(unless|until)/i,
    ],
    detail:
      "Retention tactics that make exit costly or opaque are frequent consumer-protection targets before launch.",
    whatToDo:
      "Offer online self-serve cancel, disclose fees upfront, and export data on request.",
  },
  {
    id: "pricing-clarity",
    title: "Pricing / fee transparency concerns",
    severity: "watch",
    domain: "consumer",
    patterns: [
      /fees?\s+may\s+apply/i,
      /additional\s+charges?\s+may/i,
      /taxes?\s+and\s+fees\s+extra/i,
      /starting\s+at\b/i,
      /\+\s*fees/i,
    ],
    detail:
      "Vague fee language can become deceptive-pricing risk if the total price is not clear at checkout.",
    whatToDo:
      "Show all-in price before purchase and keep fee schedules easy to find.",
  },
];

type ProgressCb = (event: ScanProgressEvent) => void;

type PageRecord = {
  url: string;
  text: string;
  html: string;
  source: "html" | "pdf" | "js";
};

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeUrl(input: string): string | null {
  let raw = input.trim();
  if (!raw) return null;
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  try {
    const u = new URL(raw);
    if (!["http:", "https:"].includes(u.protocol)) return null;
    u.hash = "";
    return u.toString();
  } catch {
    return null;
  }
}

function sameOrigin(a: string, b: string): boolean {
  try {
    return new URL(a).origin === new URL(b).origin;
  } catch {
    return false;
  }
}

function canonicalize(url: string): string {
  try {
    const u = new URL(url);
    u.hash = "";
    if (u.pathname.length > 1 && u.pathname.endsWith("/")) {
      u.pathname = u.pathname.slice(0, -1);
    }
    return u.toString();
  } catch {
    return url;
  }
}

/** Naive registrable domain (handles co.uk-style triples). */
function registrableDomain(host: string): string {
  const h = host.toLowerCase().replace(/^www\./, "");
  const parts = h.split(".").filter(Boolean);
  if (parts.length <= 2) return h;
  const multi = new Set(["co", "com", "org", "net", "gov", "ac", "edu"]);
  if (parts.length >= 3 && multi.has(parts[parts.length - 2]!)) {
    return parts.slice(-3).join(".");
  }
  return parts.slice(-2).join(".");
}

function isPdfUrl(url: string): boolean {
  return /\.pdf(\?|$)/i.test(url);
}

function isStaticAsset(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|svg|webp|zip|mp4|mp3|css|js|woff2?|ico|xml|json)(\?|$)/i.test(
    url,
  );
}

function isPolicyishUrl(url: string): boolean {
  try {
    const u = new URL(url);
    const blob = `${u.hostname}${u.pathname}`.toLowerCase();
    return POLICY_PATH_RE.test(blob);
  } catch {
    return false;
  }
}

function hostMatchesAllowlist(host: string): boolean {
  const h = host.toLowerCase();
  return POLICY_HOST_ALLOWLIST.some(
    (allowed) => h === allowed || h.endsWith(`.${allowed}`),
  );
}

function isAllowedOffsite(url: string, origin: string): boolean {
  try {
    const target = new URL(url);
    const base = new URL(origin);
    if (target.origin === base.origin) return true;

    const sameBrand =
      registrableDomain(target.hostname) === registrableDomain(base.hostname);
    if (sameBrand && isPolicyishUrl(url)) return true;

    if (hostMatchesAllowlist(target.hostname) && isPolicyishUrl(url)) {
      return true;
    }

    // Brand policy subdomains even without path keywords
    if (
      sameBrand &&
      /^(privacy|legal|terms|trust|policy|policies|compliance|gdpr|consent)\./i.test(
        target.hostname,
      )
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

function isCrawlableUrl(url: string, origin: string): boolean {
  if (isPdfUrl(url)) return isPolicyishUrl(url);
  if (isStaticAsset(url)) return false;
  return sameOrigin(url, origin) || isAllowedOffsite(url, origin);
}

function priorityScore(url: string): number {
  const u = url.toLowerCase();
  let score = 0;
  if (
    /terms|privacy|legal|eula|policy|refund|cancel|billing|pricing|partner|seller|affiliate|merchant|compliance|cookie|gdpr|ccpa|imprint|impressum/.test(
      u,
    )
  ) {
    score += 50;
  }
  if (isPdfUrl(u)) score += 25;
  if (/checkout|cart|subscribe|plan/.test(u)) score += 30;
  if (/faq|help|support|about|docs|developer/.test(u)) score += 15;
  if (u.split("/").length <= 4) score += 5;
  return score;
}

function priorityScoreFor(url: string, origin: string): number {
  let score = priorityScore(url);
  if (!sameOrigin(url, origin) && isAllowedOffsite(url, origin)) score += 35;
  if (isPdfUrl(url)) score += 20;
  return score;
}

function extractAllLinks(html: string, base: string, origin: string): string[] {
  const hrefs = Array.from(html.matchAll(/href=["']([^"']+)["']/gi)).map(
    (m) => m[1],
  );
  const out: string[] = [];
  for (const href of hrefs) {
    if (
      !href ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    ) {
      continue;
    }
    try {
      const abs = canonicalize(new URL(href, base).toString());
      if (!isCrawlableUrl(abs, origin)) continue;
      out.push(abs);
    } catch {
      /* skip */
    }
  }
  return out;
}

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "CounterLayerSiteScan/3.0 (+compliance scan; JS+PDF)",
        Accept: "text/html,application/xhtml+xml,text/plain,application/xml",
      },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return null;
    const ctype = res.headers.get("content-type") || "";
    if (
      ctype &&
      !ctype.includes("text") &&
      !ctype.includes("html") &&
      !ctype.includes("xml") &&
      !ctype.includes("json")
    ) {
      return null;
    }
    return (await res.text()).slice(0, 600_000);
  } catch {
    return null;
  }
}

async function fetchPdfText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "CounterLayerSiteScan/3.0 (+compliance scan; PDF)",
        Accept: "application/pdf,*/*",
      },
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) return null;
    const ctype = res.headers.get("content-type") || "";
    if (ctype && !ctype.includes("pdf") && !isPdfUrl(url)) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 100 || buf.length > 12_000_000) return null;
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: new Uint8Array(buf) });
    try {
      const data = await parser.getText();
      const text = (data.text || "").replace(/\s+/g, " ").trim();
      return text ? text.slice(0, 400_000) : null;
    } finally {
      await parser.destroy().catch(() => undefined);
    }
  } catch {
    return null;
  }
}

function looksLikeSpaShell(html: string, text: string): boolean {
  if (text.length < THIN_TEXT_CHARS) return true;
  if (
    /id=["'](__next|root|app|__nuxt)["']/i.test(html) &&
    text.length < 1400
  ) {
    return true;
  }
  if (/<div id=["']__next["']>\s*<\/div>/i.test(html)) return true;
  if (/You need to enable JavaScript/i.test(html) && text.length < 2000) {
    return true;
  }
  return false;
}

type BrowserHandle = {
  close: () => Promise<void>;
  render: (url: string) => Promise<string | null>;
};

async function openBrowser(): Promise<BrowserHandle | null> {
  try {
    // Load Playwright without depending on its heavy ambient types in the
    // Next typecheck path; runtime still uses the real Chromium package.
    const pw = (await import("playwright")) as {
      chromium: {
        launch: (opts: {
          headless?: boolean;
          args?: string[];
        }) => Promise<{
          close: () => Promise<void>;
          newPage: (opts?: { userAgent?: string }) => Promise<{
            goto: (
              url: string,
              opts?: { waitUntil?: string; timeout?: number },
            ) => Promise<unknown>;
            content: () => Promise<string>;
            close: () => Promise<void>;
          }>;
        }>;
      };
    };
    const pwBrowser = await pw.chromium.launch({
      headless: true,
      args: ["--disable-dev-shm-usage", "--no-sandbox"],
    });
    const handle: BrowserHandle = {
      close: async () => {
        await pwBrowser.close().catch(() => undefined);
      },
      render: async (url: string) => {
        const page = await pwBrowser.newPage({
          userAgent:
            "CounterLayerSiteScan/3.0 (+compliance scan; Chromium)",
        });
        try {
          await page.goto(url, {
            waitUntil: "networkidle",
            timeout: 20000,
          });
          await new Promise((r) => setTimeout(r, 600));
          const html = await page.content();
          return html.slice(0, 800_000);
        } catch {
          return null;
        } finally {
          await page.close().catch(() => undefined);
        }
      },
    };
    return handle;
  } catch {
    return null;
  }
}

async function discoverFromSitemap(
  origin: string,
  onStatus?: (msg: string) => void,
): Promise<{ urls: string[]; filesRead: number }> {
  const pageUrls: string[] = [];
  const seenFiles = new Set<string>();
  const queue: { url: string; depth: number }[] = [];

  const robots = await fetchHtml(new URL("/robots.txt", origin).toString());
  if (robots) {
    for (const m of robots.matchAll(/sitemap:\s*(\S+)/gi)) {
      queue.push({ url: m[1]!.trim(), depth: 0 });
    }
  }
  queue.push({ url: new URL("/sitemap.xml", origin).toString(), depth: 0 });
  queue.push({
    url: new URL("/sitemap_index.xml", origin).toString(),
    depth: 0,
  });
  queue.push({
    url: new URL("/sitemap-index.xml", origin).toString(),
    depth: 0,
  });
  // Common CMS / Shopify / WP patterns
  for (const path of [
    "/sitemap-0.xml",
    "/page-sitemap.xml",
    "/post-sitemap.xml",
    "/legal-sitemap.xml",
    "/sitemap/sitemap.xml",
  ]) {
    queue.push({ url: new URL(path, origin).toString(), depth: 0 });
  }

  let filesRead = 0;
  while (queue.length > 0 && filesRead < MAX_SITEMAP_FILES) {
    const next = queue.shift()!;
    const key = canonicalize(next.url);
    if (seenFiles.has(key)) continue;
    seenFiles.add(key);
    filesRead += 1;
    onStatus?.(
      `Reading sitemap ${filesRead}/${MAX_SITEMAP_FILES}: ${next.url}`,
    );

    const xml = await fetchHtml(next.url);
    if (!xml) continue;

    const isIndex =
      /<sitemapindex[\s>]/i.test(xml) ||
      (/<sitemap[\s>]/i.test(xml) && /<\/sitemap>/i.test(xml));

    if (isIndex && next.depth < MAX_SITEMAP_DEPTH) {
      for (const m of xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)) {
        const loc = m[1]!.trim();
        if (!loc) continue;
        queue.push({ url: loc, depth: next.depth + 1 });
      }
      continue;
    }

    for (const m of xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)) {
      const loc = canonicalize(m[1]!.trim());
      if (!isCrawlableUrl(loc, origin)) continue;
      pageUrls.push(loc);
      if (pageUrls.length >= MAX_SITEMAP_URLS) break;
    }
    if (pageUrls.length >= MAX_SITEMAP_URLS) break;
  }

  // Prefer policy / legal URLs first when we overflow into the crawl budget
  const unique = Array.from(new Set(pageUrls));
  unique.sort(
    (a, b) => priorityScoreFor(b, origin) - priorityScoreFor(a, origin),
  );
  return { urls: unique, filesRead };
}

function matchPatterns(text: string, sourceUrl: string): SiteFinding[] {
  const findings: SiteFinding[] = [];
  for (const p of PATTERNS) {
    for (const re of p.patterns) {
      const m = text.match(re);
      if (m) {
        const start = Math.max(0, (m.index ?? 0) - 50);
        const snippet = text.slice(start, start + 140).trim();
        findings.push({
          id: `${p.id}-${sourceUrl}`,
          title: p.title,
          severity: p.severity,
          domain: p.domain,
          detail: p.detail,
          evidence: `Found near: “${snippet}…”`,
          whatToDo: p.whatToDo,
          pages: [sourceUrl],
        });
        break;
      }
    }
  }
  return findings;
}

function evaluateDocuments(
  pages: { url: string; text: string; html: string }[],
): RequiredDocument[] {
  return REQUIRED_DOCS.map((def) => {
    let best:
      | {
          url: string;
          score: number;
          chars: number;
          via: string;
        }
      | undefined;

    for (const page of pages) {
      const path = page.url.toLowerCase();
      const urlHit = def.urlHints.some((re) => re.test(path));
      const contentHits = def.contentHints.filter((re) =>
        re.test(page.text),
      ).length;
      if (!urlHit && contentHits === 0) continue;

      const score =
        (urlHit ? 40 : 0) +
        contentHits * 18 +
        Math.min(20, Math.floor(page.text.length / 400));
      if (!best || score > best.score) {
        best = {
          url: page.url,
          score,
          chars: page.text.length,
          via: urlHit
            ? `URL match + ${contentHits} content signal${contentHits === 1 ? "" : "s"}`
            : `${contentHits} content signal${contentHits === 1 ? "" : "s"} on page`,
        };
      }
    }

    if (!best) {
      for (const page of pages) {
        const hrefBlob = page.html.toLowerCase();
        const linkHit = def.urlHints.some((re) => {
          const source = re.source.replace(/\\b/g, "").replace(/^\^|\$$/g, "");
          return new RegExp(`href=["'][^"']*${source}[^"']*["']`, "i").test(
            hrefBlob,
          );
        });
        if (linkHit) {
          best = {
            url: page.url,
            score: 15,
            chars: 0,
            via: "Footer/nav link detected, but destination page was thin or not fetched",
          };
          break;
        }
      }
    }

    if (!best) {
      return {
        id: def.id,
        label: def.label,
        category: def.category,
        requiredForLaunch: def.requiredForLaunch,
        missingSeverity: def.missingSeverity,
        status: "missing" as const,
        evidence:
          "Not found in reviewed URLs, page content, PDFs, or obvious footer links.",
        whyItMatters: def.whyItMatters,
        whatToDo: def.whatToDo,
      };
    }

    const status: DocumentStatus =
      best.chars > 0 && best.chars < def.minChars
        ? "weak"
        : best.chars === 0
          ? "weak"
          : "found";

    return {
      id: def.id,
      label: def.label,
      category: def.category,
      requiredForLaunch: def.requiredForLaunch,
      missingSeverity: def.missingSeverity,
      status,
      url: best.url,
      evidence:
        status === "weak"
          ? `${best.via}. Page looks thin (${best.chars} chars) — expand before launch.`
          : `${best.via}. Confirmed on ${best.url} (~${best.chars} chars).`,
      whyItMatters: def.whyItMatters,
      whatToDo: def.whatToDo,
    };
  });
}

function documentsToFindings(docs: RequiredDocument[]): SiteFinding[] {
  const out: SiteFinding[] = [];
  for (const d of docs) {
    if (d.status === "found") continue;
    const severity =
      d.status === "missing" ? d.missingSeverity : ("watch" as const);
    out.push({
      id: `doc-${d.id}-${d.status}`,
      title:
        d.status === "missing"
          ? `Missing: ${d.label}`
          : `Weak / incomplete: ${d.label}`,
      severity,
      domain: "transparency",
      detail: d.whyItMatters,
      evidence: d.evidence,
      whatToDo: d.whatToDo,
      pages: d.url ? [d.url] : [],
    });
  }
  return out;
}

function mergeFindings(all: SiteFinding[]): SiteFinding[] {
  const map = new Map<string, SiteFinding>();
  for (const f of all) {
    const key = f.title;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, { ...f, pages: [...f.pages] });
    } else {
      for (const p of f.pages) {
        if (!existing.pages.includes(p)) existing.pages.push(p);
      }
      if (f.evidence.length > existing.evidence.length) {
        existing.evidence = f.evidence;
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => {
    const rank = { elevated: 0, watch: 1, info: 2 };
    return rank[a.severity] - rank[b.severity];
  });
}

function emptyResult(
  url: string,
  error: string,
  summary: string[],
): SiteScanResult {
  const documents = evaluateDocuments([]);
  return {
    url,
    fetchedOk: false,
    error,
    pagesScanned: [],
    pagesFailed: [],
    findings: [],
    documents,
    summary,
    executiveSummary: summary,
    checklist: [
      "Re-check the URL and that the site is publicly reachable.",
      "Complete the questionnaire below for practice-based risk flags.",
      "Have counsel review contracts that never appear on public pages.",
    ],
    stats: {
      pagesOk: 0,
      pagesFailed: 0,
      elevated: 0,
      watch: 0,
      info: 0,
      charsScanned: 0,
      docsFound: 0,
      docsWeak: documents.filter((d) => d.status === "weak").length,
      docsMissing: documents.filter((d) => d.status === "missing").length,
      pdfPages: 0,
      jsRendered: 0,
      offsitePages: 0,
      sitemapUrls: 0,
    },
    scannedAt: new Date().toISOString(),
    disclaimer:
      "Public-site diligence review — not a law firm, not a substitute for counsel, and not a determination of liability.",
  };
}

export async function scanWebsite(
  rawUrl: string,
  onProgress?: ProgressCb,
): Promise<SiteScanResult> {
  const send = (e: ScanProgressEvent) => onProgress?.(e);
  const disclaimer =
    "Public-site diligence review (HTML + selective JS render + policy PDFs + allowlisted off-site policy hosts). CounterLayer is a guide and help platform — not a law firm and not a substitute for counsel. Not a legal audit, penetration test, or determination of liability. Private admin areas, paywalled apps, and unpublished contracts remain out of scope.";

  const url = normalizeUrl(rawUrl);
  if (!url) {
    const result = emptyResult(rawUrl, "Enter a valid http(s) website URL.", [
      "Could not parse that URL.",
    ]);
    send({ type: "done", result });
    return result;
  }

  const origin = new URL(url).origin;
  send({ type: "status", message: "Discovering site map and entry points…" });

  const queue: string[] = [];
  const seen = new Set<string>();
  const enqueue = (u: string) => {
    const c = canonicalize(u);
    if (seen.has(c) || !isCrawlableUrl(c, origin)) return;
    seen.add(c);
    queue.push(c);
  };

  enqueue(url);
  for (const path of COMMON_PATHS) {
    enqueue(new URL(path, origin).toString());
  }

  send({
    type: "status",
    message: "Reading nested sitemaps / robots.txt…",
  });
  const sitemap = await discoverFromSitemap(origin, (msg) =>
    send({ type: "status", message: msg }),
  );
  for (const s of sitemap.urls) enqueue(s);

  queue.sort((a, b) => priorityScoreFor(b, origin) - priorityScoreFor(a, origin));

  const planned = Math.min(queue.length, MAX_PAGES);
  send({
    type: "status",
    message: `Reviewing up to ${planned} public pages…`,
  });

  const pagesScanned: string[] = [];
  const pagesFailed: string[] = [];
  const pageRecords: PageRecord[] = [];
  const rawFindings: SiteFinding[] = [];
  let charsScanned = 0;
  let pdfPages = 0;
  let jsRendered = 0;
  let offsitePages = 0;

  const browserCleanups: Array<() => Promise<void>> = [];
  let browserSession: BrowserHandle | null = null;
  const ensureBrowser = async (): Promise<BrowserHandle | null> => {
    if (browserSession) return browserSession;
    send({
      type: "status",
      message: "Starting headless browser for JS-rendered pages…",
    });
    const launched = await openBrowser();
    if (!launched) {
      send({
        type: "status",
        message:
          "JS rendering unavailable — continuing with static HTML only.",
      });
      return null;
    }
    browserSession = launched;
    browserCleanups.push(async () => {
      await launched.close();
    });
    return launched;
  };

  try {
    while (queue.length > 0 && pagesScanned.length < MAX_PAGES) {
      const next = queue.shift()!;
      const totalEstimate = Math.min(
        MAX_PAGES,
        Math.max(planned, pagesScanned.length + queue.length + 1),
      );
      send({
        type: "progress",
        current: pagesScanned.length + 1,
        total: Math.min(MAX_PAGES, totalEstimate),
        url: next,
      });

      const offsite = !sameOrigin(next, origin);
      let record: PageRecord | null = null;

      if (isPdfUrl(next)) {
        if (pdfPages >= MAX_PDF_PAGES) {
          pagesFailed.push(next);
          send({ type: "page", url: next, ok: false });
          continue;
        }
        send({ type: "status", message: `Extracting PDF text: ${next}` });
        const text = await fetchPdfText(next);
        if (!text) {
          pagesFailed.push(next);
          send({ type: "page", url: next, ok: false });
          continue;
        }
        pdfPages += 1;
        record = {
          url: next,
          text,
          html: "",
          source: "pdf",
        };
      } else {
        let html = await fetchHtml(next);
        if (!html) {
          pagesFailed.push(next);
          send({ type: "page", url: next, ok: false });
          continue;
        }
        let text = stripHtml(html);
        let source: PageRecord["source"] = "html";

        const shouldRender =
          jsRendered < MAX_JS_RENDERS &&
          (looksLikeSpaShell(html, text) ||
            (isPolicyishUrl(next) && text.length < 1200));

        if (shouldRender) {
          const b = await ensureBrowser();
          if (b) {
            send({
              type: "status",
              message: `JS-rendering thin/SPA page: ${next}`,
            });
            const rendered = await b.render(next);
            if (rendered) {
              const renderedText = stripHtml(rendered);
              if (renderedText.length > text.length + 80) {
                html = rendered;
                text = renderedText;
                source = "js";
                jsRendered += 1;
              }
            }
          }
        }

        record = { url: next, text, html, source };
      }

      pagesScanned.push(next);
      if (offsite) offsitePages += 1;
      send({ type: "page", url: next, ok: true });

      charsScanned += record.text.length;
      pageRecords.push(record);

      const pageFindings = matchPatterns(record.text, next);
      for (const f of pageFindings) {
        rawFindings.push(f);
        send({ type: "finding", finding: f });
      }

      if (pagesScanned.length < MAX_PAGES && record.html) {
        const links = extractAllLinks(record.html, next, origin);
        const ranked = links.sort(
          (a, b) => priorityScoreFor(b, origin) - priorityScoreFor(a, origin),
        );
        for (const link of ranked.slice(0, 40)) {
          if (seen.size >= MAX_PAGES * 4) break;
          enqueue(link);
        }
        queue.sort(
          (a, b) => priorityScoreFor(b, origin) - priorityScoreFor(a, origin),
        );
      }
    }
  } finally {
    for (const cleanup of browserCleanups) {
      await cleanup().catch(() => undefined);
    }
    browserSession = null;
  }

  if (pagesScanned.length === 0) {
    const result = emptyResult(
      url,
      "Could not fetch any public pages (blocked, timeout, or offline).",
      ["Site review failed — questionnaire answers still apply."],
    );
    result.disclaimer = disclaimer;
    send({ type: "done", result });
    return result;
  }

  send({
    type: "status",
    message: "Checking required legal & trust documents…",
  });
  const documents = evaluateDocuments(pageRecords);
  const docFindings = documentsToFindings(documents);
  for (const f of docFindings) {
    rawFindings.push(f);
    send({ type: "finding", finding: f });
  }

  const findings = mergeFindings(rawFindings);
  const elevated = findings.filter((f) => f.severity === "elevated").length;
  const watch = findings.filter((f) => f.severity === "watch").length;
  const info = findings.filter((f) => f.severity === "info").length;
  const docsFound = documents.filter((d) => d.status === "found").length;
  const docsWeak = documents.filter((d) => d.status === "weak").length;
  const docsMissing = documents.filter((d) => d.status === "missing").length;
  const requiredMissing = documents.filter(
    (d) => d.requiredForLaunch && d.status !== "found",
  );

  const executiveSummary = [
    `Public-site review of ${origin}: ${pagesScanned.length} pages reviewed (${pdfPages} PDF, ${jsRendered} JS-rendered, ${offsitePages} allowlisted off-site), ${pagesFailed.length} failed, ${charsScanned.toLocaleString()} characters analyzed. Sitemap files contributed ${sitemap.urls.length} candidate URLs (${sitemap.filesRead} sitemap files).`,
    `Required website documents: ${docsFound} found, ${docsWeak} weak/thin, ${docsMissing} missing (${requiredMissing.length} launch-critical gaps).`,
    findings.length === 0
      ? "No strong keyword hits on reviewed public pages. That is not a clean bill of health — contracts and checkout flows may still need review."
      : `Detected ${findings.length} issue theme${findings.length === 1 ? "" : "s"} (${elevated} elevated, ${watch} watch, ${info} info). Prioritize elevated items and missing legal pages before going public.`,
    "Authenticated app areas, mobile binaries, and private partner contracts were not scanned.",
  ];

  const checklist = [
    ...requiredMissing.map((d) => `Add or strengthen: ${d.label}`),
    "Fix or clarify every Elevated finding before public launch.",
    "Confirm cancel / refund / pricing paths work in one session as a real customer.",
    "Review exclusivity, MFN, and payment-mandate clauses in live contracts (not just the website).",
    "If you operate a marketplace/platform, document ranking and enforcement rules.",
    "Complete the business questionnaire for practice-based risks a public review cannot see.",
    "Have qualified counsel review elevated competition and consumer-protection flags.",
  ];

  const summary = [
    ...executiveSummary,
    `Coverage: nested sitemap discovery (depth ${MAX_SITEMAP_DEPTH}), common legal/commerce paths, internal + allowlisted off-site policy hosts, policy PDFs, selective Chromium render for thin/SPA pages (cap ${MAX_PAGES} pages).`,
  ];

  const aggregatedPublicText = pageRecords
    .map((p) => p.text)
    .join("\n")
    .slice(0, 500_000);

  let cmsPlatform: string | null = null;
  for (const p of pageRecords) {
    if (p.html.length > 200) {
      const { detectSitePlatform } = await import("@/lib/supplementalScan");
      cmsPlatform = detectSitePlatform(p.html);
      if (cmsPlatform) break;
    }
  }

  const result: SiteScanResult = {
    url,
    fetchedOk: true,
    pagesScanned,
    pagesFailed: pagesFailed.slice(0, 30),
    findings,
    documents,
    summary,
    executiveSummary,
    checklist,
    stats: {
      pagesOk: pagesScanned.length,
      pagesFailed: pagesFailed.length,
      elevated,
      watch,
      info,
      charsScanned,
      docsFound,
      docsWeak,
      docsMissing,
      pdfPages,
      jsRendered,
      offsitePages,
      sitemapUrls: sitemap.urls.length,
      cmsPlatform,
    },
    scannedAt: new Date().toISOString(),
    disclaimer,
    aggregatedPublicText,
  };

  send({ type: "done", result });
  return result;
}
