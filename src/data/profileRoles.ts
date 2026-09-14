export type ProfileRole =
  | "consumer"
  | "small_business"
  | "large_business"
  | "organization"
  | "developer"
  | "seller"
  | "supplier"
  | "distributor"
  | "contractor"
  | "owner"
  | "employee_worker"
  | "competitor";

export type RoleToolLink = {
  label: string;
  href: string;
  description: string;
};

export type ProfileRoleGuide = {
  id: ProfileRole;
  label: string;
  shortLabel: string;
  summary: string;
  watchFor: string[];
  yourLeverage: string[];
  commonIssues: string[];
  firstSteps: string[];
  escalationPaths: string[];
  documentChecklist: string[];
  tools: RoleToolLink[];
};

type ProfileRoleBase = Omit<
  ProfileRoleGuide,
  "firstSteps" | "escalationPaths" | "documentChecklist"
>;

export const profileRoles: ProfileRoleBase[] = [
  {
    id: "consumer",
    label: "Consumer",
    shortLabel: "Consumer",
    summary:
      "You buy goods or services for personal use. Competition law protects you from misleading terms, hidden fees, lock-in, and unfair market power — even when a company is much larger than you.",
    watchFor: [
      "Auto-renewals, cancellation friction, and refund policies buried in Terms",
      "Price parity or exclusivity clauses in subscriptions you did not negotiate",
      "Dark patterns at checkout (pre-checked add-ons, confusing pricing)",
    ],
    yourLeverage: [
      "Document what you agreed to: screenshots, emails, checkout pages",
      "Use My Rights to map consumer-protection pathways in your jurisdiction",
      "Report conduct that looks anti-competitive or deceptive — patterns matter",
    ],
    commonIssues: [
      "Subscription traps and hard-to-cancel billing",
      "Misleading advertising vs. actual product",
      "Platform delisting or account bans without clear process",
    ],
    tools: [
      { label: "My Rights", href: "/rights", description: "Consumer protection pathways" },
      { label: "Report a problem", href: "/report", description: "Flag conduct you experienced" },
      { label: "Case library", href: "/cases", description: "See how similar disputes resolved" },
      { label: "Power map", href: "/power", description: "Understand who holds leverage" },
    ],
  },
  {
    id: "small_business",
    label: "Small business",
    shortLabel: "Small bus.",
    summary:
      "You run a smaller commercial operation — often dependent on platforms, payment processors, or larger partners. You face both compliance obligations on your own site and asymmetric power in B2B relationships.",
    watchFor: [
      "Platform fees, ranking changes, and sudden policy enforcement",
      "MFN / most-favoured-nation clauses in marketplace or SaaS contracts",
      "Missing public Terms, Privacy, and cancel/refund paths on your own site",
    ],
    yourLeverage: [
      "Scan your public site before launch or fundraising",
      "Compare contract terms against case library precedents",
      "Keep a paper trail when a platform changes rules mid-relationship",
    ],
    commonIssues: [
      "App store / marketplace dependency risk",
      "One-sided B2B terms from larger vendors",
      "Consumer-facing compliance gaps on a lean team",
    ],
    tools: [
      { label: "Business Scan", href: "/check", description: "Site review + owner checklist" },
      { label: "Compliance Scan", href: "/assess", description: "Automated control plugins" },
      { label: "Similar cases", href: "/similar", description: "Find analogous disputes" },
      { label: "File pathway", href: "/file", description: "Explore formal filing options" },
    ],
  },
  {
    id: "large_business",
    label: "Large business",
    shortLabel: "Large bus.",
    summary:
      "You operate at scale with broader regulatory exposure, partner diligence expectations, and higher scrutiny on competition conduct, consumer protection, and public disclosures.",
    watchFor: [
      "Exclusivity, tying, and self-preferencing in partner or product terms",
      "Inconsistent public policies vs. actual commercial practice",
      "Cross-border US/EU compliance gaps on privacy and consumer rights",
    ],
    yourLeverage: [
      "Run diligence-ready compliance scans before M&A or partner onboarding",
      "Maintain re-scan discipline after policy or product changes",
      "Use structured exports for investors and enterprise buyers",
    ],
    commonIssues: [
      "Antitrust scrutiny on distribution and pricing rules",
      "Enterprise customer security & compliance questionnaires",
      "Public website vs. internal contract mismatch",
    ],
    tools: [
      { label: "Compliance Scan", href: "/assess", description: "Plugin-based public surface scan" },
      { label: "Business Scan", href: "/check", description: "Deep site review + practice checklist" },
      { label: "Companies", href: "/companies", description: "Benchmark peer conduct" },
      { label: "Live cases", href: "/ongoing", description: "Track active enforcement trends" },
    ],
  },
  {
    id: "organization",
    label: "Organisation",
    shortLabel: "Organisation",
    summary:
      "You represent a nonprofit, association, cooperative, or institutional body. Transparency, governance, and fair dealing with members or the public are central — plus clear policies on how you use data and set rules.",
    watchFor: [
      "Governance documents not aligned with public-facing Terms",
      "Member/participant exclusion rules without due process",
      "Grant, sponsorship, or partnership conflicts that affect competition",
    ],
    yourLeverage: [
      "Publish clear, findable policies for members and the public",
      "Scan before major program launches or grant cycles",
      "Document decision criteria when setting marketplace or membership rules",
    ],
    commonIssues: [
      "Unclear membership termination or appeal process",
      "Data use beyond what privacy policy describes",
      "Preferential treatment of sponsors or insiders",
    ],
    tools: [
      { label: "Compliance Scan", href: "/assess", description: "Public policy surface check" },
      { label: "Business Scan", href: "/check", description: "Questionnaire + site review" },
      { label: "My Rights", href: "/rights", description: "Member-facing rights framing" },
      { label: "Report", href: "/report", description: "Escalation pathways" },
    ],
  },
  {
    id: "developer",
    label: "Developer",
    shortLabel: "Developer",
    summary:
      "You build software, APIs, or integrations — often subject to platform rules, store policies, and open-source or commercial licence obligations alongside your own product Terms.",
    watchFor: [
      "App store / API Terms changes that break your integration overnight",
      "SDK or API licence restrictions on competition or data use",
      "Missing Privacy, Security, and Acceptable Use pages for your product",
    ],
    yourLeverage: [
      "Scan store listing text + public docs together",
      "Track platform policy versions when you ship updates",
      "Use compliance scan for staging URLs before production launch",
    ],
    commonIssues: [
      "Platform gatekeeping and arbitrary enforcement",
      "Open-source licence contamination in commercial products",
      "GDPR/CCPA gaps in developer-facing analytics",
    ],
    tools: [
      { label: "Compliance Scan", href: "/assess", description: "Terms, privacy, platform plugins" },
      { label: "Business Scan", href: "/check", description: "Full practice + site review report" },
      { label: "Similar cases", href: "/similar", description: "Platform dispute precedents" },
      { label: "File", href: "/file", description: "Formal complaint pathways" },
    ],
  },
  {
    id: "seller",
    label: "Seller",
    shortLabel: "Seller",
    summary:
      "You sell goods or services — online, in marketplaces, or direct. You must meet consumer protection rules on your listings while managing platform fees, ranking, and chargeback/dispute policies.",
    watchFor: [
      "Marketplace MFN clauses and price parity rules",
      "Refund/return policies that differ by channel",
      "Listing claims vs. actual product compliance (safety, labels)",
    ],
    yourLeverage: [
      "Keep listing text aligned with your own Terms and refund policy",
      "Export diligence packs when onboarding to new marketplaces",
      "Document platform delisting or account holds immediately",
    ],
    commonIssues: [
      "Sudden account suspension on Amazon/Shopify/Etsy-class platforms",
      "Chargeback abuse and unclear buyer remedies",
      "Cross-border consumer law when selling internationally",
    ],
    tools: [
      { label: "Business Scan", href: "/check", description: "Commerce + consumer checklist" },
      { label: "Compliance Scan", href: "/assess", description: "Listing + policy scan" },
      { label: "Report", href: "/report", description: "Report platform conduct" },
      { label: "Case library", href: "/cases", description: "Seller dispute examples" },
    ],
  },
  {
    id: "supplier",
    label: "Supplier",
    shortLabel: "Supplier",
    summary:
      "You supply inputs, components, or services upstream. Buyers may impose exclusivity, volume tiers, or audit rights — and your own contracts with sub-suppliers can create competition risk.",
    watchFor: [
      "Exclusive supply or single-source clauses imposed on you or by you",
      "Retroactive price changes and unilateral specification shifts",
      "Audit rights that expose competitively sensitive information",
    ],
    yourLeverage: [
      "Negotiate termination and change-of-control terms explicitly",
      "Compare buyer terms against similar cases in the library",
      "Ensure your public commitments match B2B contract reality",
    ],
    commonIssues: [
      "Buyer concentration — one customer dominates revenue",
      "Forced bundling of unrelated services",
      "IP or data sharing beyond what contract states",
    ],
    tools: [
      { label: "Similar cases", href: "/similar", description: "Supply-chain dispute patterns" },
      { label: "Business Scan", href: "/check", description: "Contract practice checklist" },
      { label: "Companies", href: "/companies", description: "Research buyer conduct history" },
      { label: "File", href: "/file", description: "Formal escalation options" },
    ],
  },
  {
    id: "distributor",
    label: "Distributor",
    shortLabel: "Distributor",
    summary:
      "You move products between manufacturers and retailers. Territory restrictions, minimum advertised price policies, and online/offline channel rules are frequent competition flashpoints.",
    watchFor: [
      "Territory exclusivity and passive sales restrictions",
      "MAP/RP policies enforced unevenly across channels",
      "Dual distribution conflicts when suppliers sell direct",
    ],
    yourLeverage: [
      "Document selective enforcement — who gets punished vs. ignored",
      "Scan public pricing and policy pages for MAP visibility",
      "Use case library for vertical restraint precedents",
    ],
    commonIssues: [
      "Grey market parallel imports",
      "Supplier direct-to-consumer undercutting",
      "Platform resale restrictions in distribution agreements",
    ],
    tools: [
      { label: "Case library", href: "/cases", description: "Vertical restraint cases" },
      { label: "Similar cases", href: "/similar", description: "Match your fact pattern" },
      { label: "Power map", href: "/power", description: "Map channel leverage" },
      { label: "Report", href: "/report", description: "Flag anti-competitive conduct" },
    ],
  },
  {
    id: "contractor",
    label: "Contractor",
    shortLabel: "Contractor",
    summary:
      "You perform work under contract — freelance, agency, or subcontract. Classification, non-compete clauses, IP assignment, and payment terms are where power imbalances show up fastest.",
    watchFor: [
      "Overbroad non-compete or non-solicit clauses",
      "IP assignment beyond the scope of the project",
      "Payment net-60/90 terms with unilateral scope creep",
    ],
    yourLeverage: [
      "Use My Rights to understand worker/contractor protections locally",
      "Keep written change orders when scope expands",
      "Compare restrictive covenants against case outcomes",
    ],
    commonIssues: [
      "Misclassification as contractor vs. employee",
      "Clients demanding exclusivity without premium pay",
      "Late payment and chargeback of expenses",
    ],
    tools: [
      { label: "My Rights", href: "/rights", description: "Worker & contractor pathways" },
      { label: "Similar cases", href: "/similar", description: "Contract dispute precedents" },
      { label: "Report", href: "/report", description: "Document harmful conduct" },
      { label: "File", href: "/file", description: "Formal complaint routes" },
    ],
  },
  {
    id: "owner",
    label: "Owner",
    shortLabel: "Owner",
    summary:
      "You own or control a business entity. You carry ultimate responsibility for public compliance, partner diligence, and how commercial terms affect customers, workers, and competitors.",
    watchFor: [
      "Personal liability exposure from missing corporate policies",
      "Exit/diligence gaps — website does not match contract stack",
      "Owner-level deals (handshakes) that contradict published Terms",
    ],
    yourLeverage: [
      "Baseline compliance scan before fundraising or sale",
      "Re-scan after every material website or pricing change",
      "Export investor/acquirer diligence packs from profile activity",
    ],
    commonIssues: [
      "Due diligence surprises on public compliance surface",
      "Informal side agreements with key customers",
      "Founder-led sales promises not reflected in legal docs",
    ],
    tools: [
      { label: "Compliance Scan", href: "/assess", description: "Automated diligence baseline" },
      { label: "Business Scan", href: "/check", description: "Owner practice checklist" },
      { label: "Power map", href: "/power", description: "Strategic leverage view" },
      { label: "Companies", href: "/companies", description: "Peer benchmarking" },
    ],
  },
  {
    id: "employee_worker",
    label: "Employee / worker",
    shortLabel: "Employee",
    summary:
      "You work for an employer. Workplace conduct, non-competes, wage theft, retaliation, and market power of your employer in labour markets may all intersect with competition and consumer protection themes.",
    watchFor: [
      "Non-compete or NDAs that block lawful job mobility",
      "Wage-fixing or no-poach signals in your industry",
      "Retaliation when raising safety, fraud, or antitrust concerns",
    ],
    yourLeverage: [
      "Document incidents with dates, witnesses, and written records",
      "Use My Rights for jurisdiction-specific worker pathways",
      "Whistleblower and agency reporting routes where applicable",
    ],
    commonIssues: [
      "Restrictive covenants beyond what law allows",
      "Misclassification as exempt or contractor",
      "Employer market dominance affecting wages locally",
    ],
    tools: [
      { label: "My Rights", href: "/rights", description: "Worker protection map" },
      { label: "Report", href: "/report", description: "Report employer conduct" },
      { label: "Case library", href: "/cases", description: "Labour + competition overlap" },
      { label: "Similar cases", href: "/similar", description: "Find analogous situations" },
    ],
  },
  {
    id: "competitor",
    label: "Competitor",
    shortLabel: "Competitor",
    summary:
      "You compete in the same market as another firm. Predatory pricing, exclusionary contracts, refusals to deal, and information exchange can be competition issues — whether you are harmed or considering a complaint.",
    watchFor: [
      "Below-cost pricing targeted at driving rivals out",
      "Exclusive deals that foreclose your access to channels",
      "Coordinated behaviour among ostensible competitors",
    ],
    yourLeverage: [
      "Build a timeline with pricing, contracts, and communications",
      "Use Similar cases and Live cases to frame the theory of harm",
      "Report patterns — agencies look for market-wide conduct",
    ],
    commonIssues: [
      "Platform self-preferencing harming rivals",
      "Loss-leading tied to unrelated products",
      "Data portability barriers locking in customers",
    ],
    tools: [
      { label: "Similar cases", href: "/similar", description: "Match competitor harm theories" },
      { label: "Live cases", href: "/ongoing", description: "Active enforcement trends" },
      { label: "Report", href: "/report", description: "Submit conduct for review" },
      { label: "File", href: "/file", description: "Formal complaint pathways" },
    ],
  },
];

const roleGuideExtra: Record<
  ProfileRole,
  Pick<
    ProfileRoleGuide,
    "firstSteps" | "escalationPaths" | "documentChecklist"
  >
> = {
  consumer: {
    firstSteps: [
      "Gather screenshots of checkout, confirmation emails, and Terms you agreed to",
      "Run My Rights wizard for your jurisdiction and issue type",
      "Check whether the business has a public cancel/refund path before disputing with your bank",
    ],
    escalationPaths: [
      "State attorney general or consumer protection office",
      "FTC / national consumer authority for deceptive practices",
      "Small claims or chargeback if contractual remedies fail",
    ],
    documentChecklist: [
      "Order confirmation and receipt",
      "Subscription renewal notices",
      "Support tickets about cancellation or refunds",
    ],
  },
  small_business: {
    firstSteps: [
      "Run Business Scan on your public website before launch or fundraising",
      "Inventory platform/marketplace contracts for MFN and termination clauses",
      "Save copies of partner policy change emails and enforcement notices",
    ],
    escalationPaths: [
      "Platform appeal or arbitration per marketplace Terms",
      "Report anti-competitive platform conduct to competition authority",
      "Counsel review before signing revised partner agreements",
    ],
    documentChecklist: [
      "Live Terms, Privacy, and refund/cancel pages",
      "Marketplace seller agreements",
      "Payment processor acceptable-use notices",
    ],
  },
  large_business: {
    firstSteps: [
      "Baseline Compliance Scan on production and staging URLs",
      "Align public policies with enterprise customer DPAs and MSAs",
      "Schedule re-scan after every material website or pricing change",
    ],
    escalationPaths: [
      "Internal legal/compliance committee before public response",
      "Regulator inquiry response with documented scan evidence",
      "Partner diligence Q&A with exported compliance packs",
    ],
    documentChecklist: [
      "Public policy set vs. contract stack gap analysis",
      "Prior diligence scan exports with dates",
      "Partner onboarding compliance attestations",
    ],
  },
  organization: {
    firstSteps: [
      "Publish governance rules and member policies in one findable location",
      "Scan public site before membership drives or grant cycles",
      "Document criteria for exclusion, ranking, or sponsorship benefits",
    ],
    escalationPaths: [
      "Member appeal process defined in bylaws or Terms",
      "Regulator or charity commission for governance failures",
      "Mediation before litigation between members and leadership",
    ],
    documentChecklist: [
      "Bylaws / constitution and public Terms",
      "Member handbook and appeal procedure",
      "Sponsor and partnership agreements",
    ],
  },
  developer: {
    firstSteps: [
      "Compliance Scan with app store URL + staging site before release",
      "Archive API/platform Terms version at each major integration",
      "Publish Privacy, Security, and Acceptable Use pages for your product",
    ],
    escalationPaths: [
      "Platform developer support and formal appeal channels",
      "Competition complaint if gatekeeping lacks objective criteria",
      "Counsel on open-source licence and commercial distribution conflicts",
    ],
    documentChecklist: [
      "App store listing text and review rejection emails",
      "API Terms and changelog history",
      "Security / privacy policy for your SDK or SaaS",
    ],
  },
  seller: {
    firstSteps: [
      "Match listing claims to your own refund/Terms on every channel",
      "Export diligence pack when onboarding to a new marketplace",
      "Document delisting or account holds the day they occur",
    ],
    escalationPaths: [
      "Marketplace seller support and arbitration clause",
      "Consumer authority if buyer-facing claims are unfairly enforced against you",
      "Chargeback evidence packet with policy links",
    ],
    documentChecklist: [
      "Listing text on each sales channel",
      "Return/refund policy URLs",
      "Platform enforcement or suspension notices",
    ],
  },
  supplier: {
    firstSteps: [
      "Map buyer concentration — revenue % from top customers",
      "Flag exclusivity and audit clauses in supply agreements",
      "Compare buyer demands against similar cases in the library",
    ],
    escalationPaths: [
      "Commercial negotiation with documented change requests",
      "Formal notice of breach before supply disruption",
      "Competition authority where buyer power forecloses market access",
    ],
    documentChecklist: [
      "Master supply agreements and amendments",
      "Purchase orders with retroactive price changes",
      "Quality audit reports shared with other buyers",
    ],
  },
  distributor: {
    firstSteps: [
      "Document MAP/territory rules and who is enforced vs. ignored",
      "Scan public pricing pages for policy visibility",
      "Build timeline of supplier direct-to-consumer undercutting",
    ],
    escalationPaths: [
      "Contractual dispute resolution under distribution agreement",
      "Competition complaint on vertical restraints",
      "Industry association mediation where available",
    ],
    documentChecklist: [
      "Distribution agreement and territory maps",
      "MAP policy communications",
      "Evidence of selective enforcement",
    ],
  },
  contractor: {
    firstSteps: [
      "Review non-compete, IP assignment, and payment terms before signing",
      "Use My Rights for worker/contractor protections in your jurisdiction",
      "Log scope changes in writing — email or change order",
    ],
    escalationPaths: [
      "Labour department or contractor misclassification inquiry",
      "Demand letter for unpaid invoices",
      "Arbitration or small claims per contract",
    ],
    documentChecklist: [
      "Signed contract and SOW amendments",
      "Timesheets and deliverable acceptance emails",
      "Payment records and scope-change threads",
    ],
  },
  owner: {
    firstSteps: [
      "Run baseline Compliance Scan before investor or acquirer diligence",
      "Ensure handshake deals are reflected in published Terms",
      "Re-scan within 48 hours of any public policy or pricing update",
    ],
    escalationPaths: [
      "Counsel review before responding to regulator or partner inquiries",
      "Board approval for material compliance gaps flagged by scan",
      "Diligence export to investors with dated attestation",
    ],
    documentChecklist: [
      "Corporate policy stack vs. live website",
      "Side letters or verbal promises not on the site",
      "Prior scan PDFs and fix attestations",
    ],
  },
  employee_worker: {
    firstSteps: [
      "Save employment contract, handbook, and restrictive covenant clauses",
      "Document incidents with dates, witnesses, and written records",
      "Run My Rights for local worker protection pathways",
    ],
    escalationPaths: [
      "HR internal complaint with written follow-up",
      "Labour board or employment standards agency",
      "Whistleblower channels for fraud or antitrust concerns",
    ],
    documentChecklist: [
      "Offer letter and employment agreement",
      "Pay stubs and classification communications",
      "Retaliation or termination documentation",
    ],
  },
  competitor: {
    firstSteps: [
      "Build harm timeline: pricing, contracts, product changes, comms",
      "Use Similar cases to match your theory of harm",
      "Preserve evidence of exclusionary contracts or refusals to deal",
    ],
    escalationPaths: [
      "Report to competition authority with structured fact pattern",
      "Private counsel on standing and complaint format",
      "Industry complaint where trade association rules apply",
    ],
    documentChecklist: [
      "Pricing history and promotional calendars",
      "Lost deal evidence tied to exclusivity",
      "Communications suggesting coordination among rivals",
    ],
  },
};

export function getProfileRoleGuide(role: ProfileRole): ProfileRoleGuide {
  const base = profileRoles.find((r) => r.id === role) ?? profileRoles[0]!;
  return { ...base, ...roleGuideExtra[base.id] };
}

export function getProfileRoleLabel(role: ProfileRole): string {
  return getProfileRoleGuide(role).label;
}
