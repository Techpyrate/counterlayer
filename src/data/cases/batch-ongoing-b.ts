import type { CompetitionCase } from "../types";

/** Ongoing competition matters — batch B (live inquiries, reviews, and active litigation) */
export const batchOngoingB: CompetitionCase[] = [
  {
    id: "live-eu-gatekeeper-digital-markets",
    name: "EU Digital Markets Act Gatekeeper Compliance",
    shortName: "EU DMA Gatekeepers",
    companies: ["apple", "google", "meta", "amazon", "microsoft"],
    jurisdictions: ["EU"],
    conduct: ["self_preferencing", "interoperability", "market_access", "data_lockin"],
    yearStart: 2022,
    status: "ongoing",
    summary:
      "The EU is rolling out Digital Markets Act obligations for designated gatekeeper platforms, with ongoing compliance reviews, market investigations, and disputes over interoperability, choice screens, and data access.",
    regulatorArgument:
      "Gatekeepers must not favor their own services, must open key interfaces to rivals, and must give business users fair access—ongoing supervision ensures rules are effective in practice, not only on paper.",
    outcome:
      "Designations and core obligations are in force; compliance dialogues, DMA Article 29 market investigations, and potential fines remain active. No final closure of oversight.",
    laws: ["dma", "tfeu-102"],
    markets: ["digital platforms", "app stores", "search", "social networks", "cloud"],
    sources: [
      {
        label: "EU Digital Markets Act overview",
        url: "https://digital-markets-act.ec.europa.eu/",
      },
      {
        label: "EC gatekeeper designations",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_23_4328",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "DMA entered into force", date: "November 1, 2022" },
      { label: "First gatekeeper designations", date: "September 6, 2023" },
      { label: "Core obligations applied", date: "March 7, 2024" },
      { label: "First compliance workshops and probes reported", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2022",
        title: "DMA becomes EU law",
        detail:
          "Parliament and Council adopted ex ante rules for the largest digital platforms, shifting part of EU digital enforcement from case-by-case abuse findings to upfront duties.",
      },
      {
        date: "2023",
        title: "Gatekeepers designated",
        detail:
          "The Commission named Apple, Google, Meta, Amazon, Microsoft, and ByteDance as gatekeepers for specified core platform services such as app stores, search, and messaging.",
      },
      {
        date: "2024",
        title: "Obligations take effect",
        detail:
          "Companies began implementing choice screens, link-outs, data portability tools, and interoperability steps. Third parties and regulators flagged gaps between announcements and real-world access.",
      },
      {
        date: "2024–ongoing",
        title: "Compliance reviews and investigations",
        detail:
          "The Commission opened structured dialogues and signaled possible non-compliance proceedings. Market tests continue on whether remedies actually restore competition.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Europe's Digital Markets Act treats the biggest tech platforms like regulated utilities: they must open doors they used to lock. Apple, Google, Meta, Amazon, Microsoft, and others must offer more choice in app stores, messaging, search defaults, and data sharing. Regulators are still checking whether the changes work—or whether companies comply only on the surface.",
      theStory: [
        "For years, EU competition cases against big tech moved slowly: one product, one theory, one fine at a time. The Digital Markets Act (DMA) flipped part of that script by listing upfront rules for platforms that act as gatekeepers—companies so large and entrenched that business users and consumers depend on them to reach markets.",
        "In 2022 the law entered into force. It covers core services like app stores, search engines, social networks, messaging, and certain advertising systems. Gatekeepers must not self-preference their own products, must allow sideloading or alternative app stores in defined ways, must provide interoperability for messaging in phases, and must give business users access to data they generate on the platform.",
        "By late 2023 the European Commission designated six companies for multiple services each. That designation is not a finding of wrongdoing by itself—it triggers a calendar of obligations and reporting duties. From March 2024, many of those duties became legally binding.",
        "What followed was a messy implementation phase familiar from other regulated industries: companies published compliance plans, critics said the plans were narrow or easy to bypass, and regulators began testing real-world behavior. App developers, rival search engines, and messaging services reported mixed results—some new options appeared, but friction, fees, and technical barriers remained.",
        "The Commission can open market investigations under Article 29 if it suspects systematic circumvention. It can also launch formal non-compliance cases with heavy fines. Several gatekeepers have challenged designations or the scope of obligations in court, arguing the DMA is vague or conflicts with privacy and security goals.",
        "Because the DMA is new and ongoing, describing outcomes as settled would be misleading. The law is live supervision: regulators, competitors, and gatekeepers are still negotiating what 'fair access' means in code, contracts, and user interfaces.",
        "For ordinary users, the DMA is the reason you may see choice screens on your phone, alternative app marketplaces in Europe, or new prompts about default apps. Whether that translates into lasting competition depends on enforcement still unfolding.",
      ],
      whyItMatters: [
        "Gatekeeper rules decide whether small apps, shops, and services can reach customers without paying a platform tax or accepting hidden ranking penalties.",
        "The DMA is Europe's biggest bet that ex ante regulation can work where slow antitrust cases arrived too late.",
        "Implementation details—fees for link-outs, security warnings, API quality—can defeat the purpose of choice on paper.",
        "US and UK policymakers watch DMA results when debating their own digital competition bills.",
      ],
      whatWasClaimed: [
        "Designated gatekeepers still restrict business users and consumers in ways that fall short of DMA duties.",
        "Self-preferencing and default settings continue to steer users to gatekeeper-owned services.",
        "Interoperability and data-access offers are technically inadequate or commercially unusable.",
        "Gatekeepers may be designing compliance to minimize real competitive pressure.",
      ],
      theOtherSide: [
        "Gatekeepers say they are investing heavily to meet complex obligations on tight timelines.",
        "They argue some DMA requests conflict with user privacy, malware risks, or product coherence.",
        "Companies contend rivals and regulators demand more than the law requires.",
        "They warn heavy fines could chill innovation in European digital services.",
      ],
      whatItMeansForYou: [
        "If you live in or buy from the EU, you may see more prompts to pick browsers, search engines, or app sources—read them; defaults still matter.",
        "Businesses selling online in Europe should track DMA timelines for the platforms they rely on; new fees or APIs may appear with little notice.",
        "Do not assume a press release equals full access—verify whether alternative stores, payment links, or messaging connections actually work for your use case.",
        "Enforcement is ongoing; rights and options may expand or get narrowed as courts and regulators respond to complaints.",
      ],
      bottomLine:
        "The DMA is active regulation, not a finished court case. Gatekeepers must change how they operate in Europe, and regulators are still testing whether those changes restore real competition.",
    },
  },
  {
    id: "live-ftc-pbm-insulin",
    name: "FTC Inquiry into Pharmacy Benefit Managers and Drug Pricing",
    shortName: "FTC PBM Inquiry",
    companies: ["cvs", "express-scripts", "optum"],
    jurisdictions: ["US"],
    conduct: ["vertical_restraint", "discrimination", "abuse_of_dominance", "refusal_to_deal"],
    yearStart: 2022,
    status: "ongoing",
    summary:
      "The Federal Trade Commission is investigating how pharmacy benefit managers (PBMs) influence list prices, rebates, formulary placement, and independent pharmacies—especially for insulin and other high-cost drugs.",
    regulatorArgument:
      "PBMs sit between drugmakers, insurers, employers, and pharmacies with opaque contracts; concentrated market power may distort pricing, steer patients to affiliated pharmacies, and raise costs.",
    outcome:
      "Staff reports, public hearings, and enforcement referrals are active; no final agency order or court judgment has concluded the matter.",
    laws: ["ftc-5", "clayton-7"],
    markets: ["pharmacy benefit management", "prescription drugs", "retail pharmacy"],
    sources: [
      {
        label: "FTC PBM inquiry announcement",
        url: "https://www.ftc.gov/news-events/news/press-releases/2022/06/ftc-launches-inquiry-prescription-drug-middlemen",
      },
      {
        label: "FTC interim staff report on PBMs",
        url: "https://www.ftc.gov/reports/ftc-staff-report-pbms",
      },
    ],
    readingMinutes: 11,
    keyDates: [
      { label: "FTC launched PBM inquiry", date: "June 7, 2022" },
      { label: "Six largest PBMs ordered to produce records", date: "2022" },
      { label: "Public workshop on PBM practices", date: "2023–2024" },
      { label: "Interim staff report published", date: "2024" },
    ],
    timeline: [
      {
        date: "2022",
        title: "FTC opens wide-ranging study",
        detail:
          "The Commission used its 6(b) authority to compel CVS Caremark, Express Scripts, Optum Rx, and other major PBMs to produce data on rebates, fees, and formulary decisions.",
      },
      {
        date: "2023",
        title: "Congressional and state pressure builds",
        detail:
          "Bipartisan lawmakers and state attorneys general highlighted insulin affordability and independent pharmacy closures, often pointing to PBM reimbursement formulas.",
      },
      {
        date: "2024",
        title: "Staff report sketches harm theories",
        detail:
          "An interim FTC report described concentration among PBMs, conflicts from vertical integration with insurers and pharmacies, and practices that may leave patients and small pharmacies worse off.",
      },
      {
        date: "Ongoing",
        title: "Enforcement and rulemaking tracks",
        detail:
          "The FTC continues analyzing documents, coordinating with state probes, and evaluating whether specific conduct warrants cases. Outcomes remain uncertain.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Pharmacy benefit managers—PBMs—negotiate drug prices for insurers and employers, but their contracts are secret. The FTC is investigating whether a handful of PBMs use that opacity to inflate costs, favor their own pharmacies, and squeeze independents. The probe is active; it is not a final finding that PBMs broke the law.",
      theStory: [
        "When you pick up a prescription, the price on your card reflects a chain of middlemen: drug manufacturer, wholesaler, pharmacy, insurer, and often a pharmacy benefit manager. PBMs create formularies—the lists that say which drugs are covered and at what copay tier.",
        "Three PBMs handle a large share of US prescriptions. Several are owned by or tied to major insurers and retail pharmacy chains. That vertical stack means the same corporate family may negotiate drug prices, run the mail-order pharmacy, and set reimbursement for competing drugstores.",
        "Independent pharmacists have complained for years that PBM 'take-it-or-leave-it' contracts include clawbacks, low reimbursement, and steering to affiliated mail-order or specialty pharmacies. Patients have complained about surprise costs, especially for insulin and specialty drugs.",
        "In June 2022 the FTC launched a formal inquiry using compulsory orders—a rare deep dive. The agency sought data on rebates, spread pricing, fees charged to pharmacies, and practices that might exclude smaller competitors.",
        "PBMs respond that they save payers billions through negotiation, that rebates lower premiums, and that formulary design encourages use of safe, effective, lower-cost medicines. They caution against blaming middlemen for complex drug pricing rooted in patent exclusivity and manufacturer list prices.",
        "An interim staff report in 2024 described heavy concentration, vertical conflicts, and business practices that warrant further scrutiny. The report is investigative, not a court verdict. It fueled calls for transparency rules and possible enforcement.",
        "Because the matter is ongoing, treat headlines as allegations and policy debate. The FTC may pursue company-specific cases, recommend legislation, or both. No single 'PBM trial' has ended the industry practices in question.",
      ],
      whyItMatters: [
        "PBM rules can determine whether your local pharmacy survives and whether you pay cash price or copay at the counter.",
        "Insulin and specialty drug affordability debates often lead back to formulary design and rebate mechanics few patients see.",
        "Vertical integration in health care mirrors tech platform conflicts—middlemen who also compete with their customers.",
        "FTC attention may change disclosure rules even before any lawsuit succeeds.",
      ],
      whatWasClaimed: [
        "PBMs possess market power in negotiating drug benefits for major payers.",
        "Opaque rebate and fee structures may inflate list prices and harm independent pharmacies.",
        "Vertical ties to insurers and pharmacies create incentives to self-preference affiliated services.",
        "Formulary and reimbursement rules may restrict patient choice and raise out-of-pocket costs.",
      ],
      theOtherSide: [
        "PBMs say they deliver savings through bulk negotiation and generic encouragement.",
        "They argue manufacturers set list prices and patent strategies drive high costs more than PBM fees.",
        "They maintain pharmacies remain free to contract and patients can appeal coverage decisions.",
        "Industry groups warn structural remedies could reduce plan flexibility.",
      ],
      whatItMeansForYou: [
        "Ask your pharmacist if a PBM fee or 'DIR clawback' affects your price—many patients never hear those terms until bills spike.",
        "Employers and unions can demand PBM transparency in plan renewals even while the FTC probe continues.",
        "Watch state bills on PBM licensing and spread pricing; federal and state efforts may overlap.",
        "Until cases conclude, no assumption that all PBM practices are illegal—only that regulators are actively scrutinizing them.",
      ],
      bottomLine:
        "The FTC is digging into whether PBM concentration and secrecy harm drug pricing and pharmacy competition. Findings so far are investigative; major legal outcomes are still ahead.",
    },
  },
  {
    id: "live-ftc-kroger-albertsons",
    name: "Kroger / Albertsons Grocery Merger Review",
    shortName: "Kroger / Albertsons",
    companies: ["kroger", "albertsons"],
    jurisdictions: ["US"],
    conduct: ["merger"],
    yearStart: 2022,
    status: "ongoing",
    summary:
      "Kroger proposed acquiring Albertsons in a deal that would combine two of the largest US supermarket chains; the FTC challenged the merger, alleging substantial lessening of competition in local grocery markets and worker bargaining power.",
    regulatorArgument:
      "Overlapping store footprints in many cities mean fewer choices for grocery shoppers and pharmacy customers; divestiture plans may not restore lost head-to-head rivalry.",
    outcome:
      "Litigation and appeals continue; courts have not issued a final ruling permitting the merger without remedies. Transaction remains uncertain.",
    laws: ["clayton-7", "hart-scott"],
    markets: ["supermarkets", "grocery retail", "pharmacy retail"],
    sources: [
      {
        label: "FTC complaint (Kroger / Albertsons)",
        url: "https://www.ftc.gov/legal-library/browse/cases-proceedings/231-0076-kroger-albertsons",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Merger agreement announced", date: "October 14, 2022" },
      { label: "FTC filed to block merger", date: "February 26, 2024" },
      { label: "State AG suits consolidated", date: "2024" },
      { label: "District court hearing (scheduled/reported)", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2022",
        title: "Megamerger announced",
        detail:
          "Kroger agreed to buy Albertsons for roughly $24.6 billion, promising efficiencies and lower prices while critics warned of local market concentration.",
      },
      {
        date: "2023",
        title: "Divestiture package unveiled",
        detail:
          "The companies proposed selling hundreds of stores to C&S Wholesale Grocers to address overlap concerns. Enforcers questioned whether the buyer could operate a viable rival network.",
      },
      {
        date: "2024",
        title: "FTC and states sue to stop deal",
        detail:
          "The FTC and several attorneys general filed complaints alleging the merger would raise grocery prices and weaken union leverage in overlapping labor markets.",
      },
      {
        date: "Ongoing",
        title: "Court fight and appeals path",
        detail:
          "A federal district court heard arguments on whether to preliminarily block closing. Whichever side loses may appeal; no final merger clearance yet.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Kroger wants to buy Albertsons, creating a grocery giant rivaled mainly by Walmart and Costco. The FTC says shoppers in many towns would lose a direct supermarket competitor and that planned store sales to another operator may not fix the problem. Courts are still deciding.",
      theStory: [
        "Grocery is a low-margin business where local store density matters. When two big chains overlap on the same street or neighborhood, they often compete on weekly ads, fresh food, and pharmacy services.",
        "Kroger and Albertsons each operate familiar banners—Fred Meyer, Ralphs, Safeway, Vons, and others. Together they employ hundreds of thousands of workers, many under union contracts.",
        "Their 2022 merger plan promised $500 million in price cuts and $1 billion in higher wages. Economists debate whether merged grocers pass savings to consumers or keep margins when local rivalry fades.",
        "To win approval, the companies offered to divest more than 400 stores to C&S, a wholesale supplier with limited retail experience. The FTC argued C&S could not replicate Albertsons' scale, buying power, or fresh-food logistics quickly enough.",
        "In early 2024 the FTC and state enforcers sued in Oregon federal court, seeking to block closing until a full trial on competitive effects. Grocery unions supported the challenge, fearing weaker bargaining power.",
        "The companies counter that Amazon, Walmart, Costco, Aldi, and dollar stores discipline prices nationally even if one local banner disappears. They say blocking the deal helps non-union online rivals more than workers.",
        "Because the case is live, describe claims as contested. A judge may block, allow with divestitures, or send parties back to negotiate. Shoppers may not know the outcome for years if appeals follow.",
      ],
      whyItMatters: [
        "Supermarket mergers hit your wallet directly—prices, sale cycles, and pharmacy copays can shift when a local rival vanishes.",
        "The case tests whether divestiture buyers like C&S can really replace lost competition.",
        "Labor markets matter in merger law; unions are arguing competitive harm includes weaker wage bargaining.",
        "Outcomes may guide future retail consolidation in pharmacies and convenience stores too.",
      ],
      whatWasClaimed: [
        "The merger would substantially lessen competition in numerous local grocery markets.",
        "Planned divestitures are inadequate and may produce a weaker, less effective rival.",
        "Combined buyer power over suppliers could harm consumers and independent grocers.",
        "Union workers would face a less competitive employer market in overlapping regions.",
      ],
      theOtherSide: [
        "Kroger and Albertsons say national competition from Walmart, Costco, and e-commerce keeps prices in check.",
        "They argue the deal enables investment in technology, supply chain, and lower prices.",
        "They maintain C&S can operate divested stores successfully with transition support.",
        "They warn blocking the merger could force Albertsons into a weaker financial position.",
      ],
      whatItMeansForYou: [
        "If you shop at Kroger- or Albertsons-owned banners, watch for store sales or banner changes during litigation—they may occur only if courts allow remedies.",
        "Compare weekly ad prices before and after any local consolidation; lost rivalry sometimes shows up in slower discount cycles.",
        "Pharmacy customers should check whether in-store clinic and prescription programs change ownership.",
        "Until courts rule, both chains continue competing in most markets as separate companies.",
      ],
      bottomLine:
        "A landmark US grocery merger is tied up in court. Regulators say local competition would suffer; the companies say national rivals and divestitures protect shoppers. No final answer yet.",
    },
  },
  {
    id: "live-ftc-aws-cloud-lockin",
    name: "FTC Cloud Computing Competition Inquiry",
    shortName: "FTC Cloud Inquiry",
    companies: ["amazon", "microsoft", "google"],
    jurisdictions: ["US"],
    conduct: ["data_lockin", "refusal_to_deal", "tying", "discrimination"],
    yearStart: 2023,
    status: "ongoing",
    summary:
      "The FTC is studying competition in public cloud infrastructure, examining egress fees, licensing terms for software on rival clouds, and practices that may lock customers into hyperscale providers.",
    regulatorArgument:
      "Dominant cloud platforms may use pricing, technical, and contractual frictions to raise switching costs and disadvantage multi-cloud or alternative providers.",
    outcome:
      "Information gathering and staff analysis continue; no public enforcement decision or court ruling has concluded the inquiry.",
    laws: ["ftc-5", "sherman-2"],
    markets: ["cloud infrastructure", "enterprise software", "SaaS"],
    sources: [
      {
        label: "FTC cloud computing inquiry (reported)",
        url: "https://www.ftc.gov/news-events/news/press-releases",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "FTC cloud inquiry reported", date: "2023" },
      { label: "Civil investigative demands issued (reported)", date: "2023–2024" },
      { label: "Industry comments and hearings", date: "2024" },
      { label: "Coordination with EU cloud probes (reported)", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2023",
        title: "FTC begins cloud market study",
        detail:
          "The agency reportedly sent compulsory orders to major cloud providers and customers about licensing, egress fees, and interoperability.",
      },
      {
        date: "2024",
        title: "Debate over switching costs intensifies",
        detail:
          "Enterprise users testified that moving data out of a cloud can be expensive and slow, while providers argued fees reflect real network costs and security investments.",
      },
      {
        date: "2024",
        title: "Parallel scrutiny abroad",
        detail:
          "UK and EU authorities examined Microsoft's licensing of products like Office and Windows Server when run on rival clouds, influencing US talking points.",
      },
      {
        date: "Ongoing",
        title: "Enforcement decisions pending",
        detail:
          "The FTC has not announced a cloud monopolization suit. Staff may recommend case-specific actions or further rulemaking.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Most companies rent computing power from a few giant clouds—Amazon AWS, Microsoft Azure, and Google Cloud. The FTC is asking whether those providers make it artificially hard to leave or to run popular software on a competitor's servers. The review is ongoing; no final US case has concluded.",
      theStory: [
        "Cloud computing replaced many on-site data centers. Businesses store data, run websites, and train AI models on shared infrastructure billed by usage.",
        "AWS, Azure, and Google Cloud dominate enterprise infrastructure outside China. Once a company builds on one provider's proprietary tools, migration can mean rewriting applications and paying data transfer ('egress') fees.",
        "Critics say egress fees and bundled discounts discourage multi-cloud strategies. Microsoft faced separate complaints in Europe that licensing terms for SQL Server and Office made running Microsoft software on AWS or Google artificially expensive.",
        "The FTC inquiry reportedly uses 6(b) orders to collect contracts, pricing schedules, and customer communications. It mirrors concerns raised by UK communications regulator Ofcom and the European Commission's cloud competition discussions.",
        "Cloud providers respond that switching is always possible with planning, that egress fees fund network investment, and that security and integration benefits justify bundled offerings.",
        "Startups and open-source groups argue lock-in chokes rival platforms and raises prices for the whole economy because every app ultimately pays cloud bills.",
        "Because this is an inquiry—not a finished lawsuit—treat claims as hypotheses under study. The FTC may later sue individual companies or publish guidance short of litigation.",
      ],
      whyItMatters: [
        "Cloud bills are a hidden cost in many services you use; less competition can mean higher SaaS prices.",
        "Small startups may pick AWS by default and never realistically switch, shaping which apps survive.",
        "Government agencies and hospitals depend on cloud uptime; lock-in affects public procurement too.",
        "US and EU moves together could change licensing and data-transfer pricing globally.",
      ],
      whatWasClaimed: [
        "Hyperscalers possess durable market power in infrastructure-as-a-service.",
        "Egress fees and technical barriers raise rivals' costs and customer switching costs.",
        "Software licensing may tie enterprise products to the vendor's own cloud.",
        "Discount structures and committed spend contracts foreclose smaller cloud entrants.",
      ],
      theOtherSide: [
        "Providers say competition among three US hyperscalers is vigorous and prices have fallen over time.",
        "They argue egress fees prevent free-riding on network capacity.",
        "They maintain customers negotiate enterprise agreements with exit options.",
        "They caution regulation could slow innovation in AI infrastructure.",
      ],
      whatItMeansForYou: [
        "If you run a business, document cloud spend and exit costs before signing long commitments—the inquiry may eventually affect standard contract terms.",
        "Employees at SaaS vendors feel cloud lock-in when their employer cannot cheaply test rival infrastructure.",
        "Consumers rarely see cloud bills directly, but higher infrastructure costs can flow into subscription prices.",
        "No US order yet requires fee cuts or forced interoperability—watch FTC announcements.",
      ],
      bottomLine:
        "US enforcers are studying whether cloud giants use fees and licenses to trap customers. The work is preliminary; major court fights, if any, lie ahead.",
    },
  },
  {
    id: "live-ftc-auto-dealer-franchise",
    name: "FTC Review of Auto Dealer Franchise Rules",
    shortName: "Auto Dealer Franchise",
    companies: ["ford", "gm", "stellantis", "toyota"],
    jurisdictions: ["US"],
    conduct: ["vertical_restraint", "resale_restriction", "refusal_to_deal", "exclusivity"],
    yearStart: 2023,
    status: "ongoing",
    summary:
      "The FTC and state enforcers are examining manufacturer-imposed dealer franchise rules, including direct-sales bans, warranty repair restrictions, and allocation practices affecting EV sales.",
    regulatorArgument:
      "State franchise laws and OEM policies may protect dealers at consumers' expense, block new retail models, and limit price competition—especially as electric vehicles change service needs.",
    outcome:
      "Policy workshops, state legislative battles, and selective enforcement continue; no comprehensive federal order has restructured auto retail.",
    laws: ["ftc-5", "sherman-1"],
    markets: ["automobile retail", "EV sales", "auto repair"],
    sources: [
      {
        label: "FTC auto retail workshop",
        url: "https://www.ftc.gov/news-events/events/2023/01/auto-retail-workshop",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "FTC auto retail workshop", date: "January 2023" },
      { label: "State direct-sales legislative fights", date: "2023–2025" },
      { label: "EV allocation disputes (industry reports)", date: "2024" },
      { label: "Ongoing FTC monitoring (reported)", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2023",
        title: "FTC highlights franchise friction",
        detail:
          "Commission staff discussed how state laws limit manufacturer-owned stores and online pricing transparency.",
      },
      {
        date: "2023–2024",
        title: "EV transition strains dealer model",
        detail:
          "Manufacturers experimented with agency sales and fixed pricing; dealers sued in several states, arguing franchise protections were breached.",
      },
      {
        date: "2024",
        title: "Repair and warranty access debates",
        detail:
          "Right-to-repair advocates linked auto competition to who can service EV batteries and access diagnostic software.",
      },
      {
        date: "Ongoing",
        title: "Patchwork of state outcomes",
        detail:
          "Some states expanded direct sales for EV-only brands while preserving dealer protections for legacy OEMs. Federal unified rulemaking has not concluded.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "In most US states you must buy a new car through a franchised dealer, not directly from Ford or Toyota. The FTC is examining whether those rules reduce price competition and block new ways of selling electric vehicles. Fights play out in state capitals and courts; there is no single national verdict yet.",
      theStory: [
        "Automobile retail in America runs on franchise law: manufacturers sell to independent dealers, and dealers sell to you. State laws often ban manufacturer-owned stores except in limited cases.",
        "Dealers argue franchises create local jobs, invest in showrooms, and advocate for customers during warranty fights. They have political clout through state dealer associations.",
        "Critics—including some EV startups and consumer groups—say the system adds markup, blocks transparent online pricing, and forces buyers through haggling many dislike.",
        "The FTC held workshops examining whether franchise restrictions violate competition principles when manufacturers want agency models—where the dealer earns a fee but the factory sets the price.",
        "Electric vehicles sharpen the fight: they need less routine service, threatening dealer profits from maintenance bays. OEMs tried allocating fewer EVs to dealers who refused new sales programs, triggering lawsuits alleging coercion.",
        "Right-to-repair and data access overlap with antitrust: if only authorized dealers get diagnostic tools, independents cannot compete on service.",
        "Enforcement remains fragmented. The FTC may bring targeted cases; states may rewrite franchise statutes. No ongoing matter has abolished dealer franchises nationwide.",
      ],
      whyItMatters: [
        "Franchise rules can add thousands of dollars to the price you pay and limit how you shop online.",
        "EV policy intersects with competition—service-heavy dealer income affects how fast legacy brands push electric models.",
        "Independent repair shops depend on access to parts and software; restrictions look like vertical restraints.",
        "State-by-state variation means your rights depend heavily on where you buy.",
      ],
      whatWasClaimed: [
        "Franchise laws and OEM policies restrict intrabrand and interbrand competition.",
        "Dealers use political protection to block direct sales and transparent pricing.",
        "Allocation and warranty reimbursement rules coerce dealers accepting disadvantageous EV terms.",
        "Repair restrictions raise consumer costs and limit independent service competition.",
      ],
      theOtherSide: [
        "Dealers say franchises prevent manufacturer monopoly over retail and preserve local accountability.",
        "They argue state legislatures legitimately chose the model for consumer protection.",
        "OEMs rely on dealers for capital-intensive inventory and test drives.",
        "They warn direct-only sales could reduce rural access.",
      ],
      whatItMeansForYou: [
        "Compare total price—including doc fees—across dealers; franchise rules do not eliminate shopping around within a brand.",
        "If you want a direct-sales EV brand, check whether your state allows it; laws differ sharply.",
        "For repairs, ask whether independent shops can access software needed for your model.",
        "FTC action, if it comes, may target specific OEM-dealer policies—not your existing warranty overnight.",
      ],
      bottomLine:
        "Auto retail competition is being re-litigated as EVs change the economics. Federal and state reviews continue; franchise laws still govern most new-car purchases today.",
    },
  },
  {
    id: "live-doj-live-sports-streaming",
    name: "DOJ Sports Streaming and Regional Sports Networks Review",
    shortName: "Sports Streaming Review",
    companies: ["disney", "warner", "comcast"],
    jurisdictions: ["US"],
    conduct: ["exclusivity", "refusal_to_deal", "vertical_restraint", "market_access"],
    yearStart: 2023,
    status: "ongoing",
    summary:
      "The Justice Department is scrutinizing how live sports rights are packaged across cable, streaming, and regional sports networks, with concerns that exclusivity and bankrupt RSNs limit consumer choice and raise prices.",
    regulatorArgument:
      "Concentrated ownership of national and regional sports rights, plus long-term exclusive contracts, may foreclose cheaper streaming options and harm rival platforms.",
    outcome:
      "Investigations, consent discussions, and bankruptcy court proceedings continue; no final structural remedy has reorganized sports media nationwide.",
    laws: ["sherman-1", "clayton-7", "ftc-5"],
    markets: ["live sports broadcasting", "streaming video", "regional sports networks"],
    sources: [
      {
        label: "DOJ antitrust division (sports media reports)",
        url: "https://www.justice.gov/atr",
      },
    ],
    readingMinutes: 11,
    keyDates: [
      { label: "RSN bankruptcy wave (Diamond Sports)", date: "2023" },
      { label: "DOJ interest in sports rights (reported)", date: "2023–2024" },
      { label: "League streaming joint ventures announced", date: "2024" },
      { label: "Ongoing review of exclusivity terms", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2023",
        title: "Regional sports networks falter",
        detail:
          "Diamond Sports and other RSNs entered bankruptcy as cord-cutting reduced cable subscriber fees that subsidized local team broadcasts.",
      },
      {
        date: "2023–2024",
        title: "DOJ examines licensing practices",
        detail:
          "Enforcers reportedly questioned how leagues slice national vs local rights and whether exclusivity blocks new streaming entrants.",
      },
      {
        date: "2024",
        title: "Leagues pursue direct streaming",
        detail:
          "Major leagues announced or expanded direct-to-consumer apps, sometimes conflicting with existing RSN contracts and blackout rules.",
      },
      {
        date: "Ongoing",
        title: "Rights renegotiation and fan access",
        detail:
          "Teams, leagues, and platforms negotiate amid antitrust scrutiny. Fans in some markets still cannot legally stream home games.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Watching your local team can require cable, a league app, and luck with blackout rules. The Justice Department is reviewing whether sports leagues and media giants use exclusive contracts to keep games off affordable streaming services. Bankruptcy of regional sports networks made the problem visible; legal outcomes are not settled.",
      theStory: [
        "Live sports drive TV economics: fans pay premiums, advertisers follow, and leagues auction exclusive rights to the highest bidders.",
        "Regional sports networks (RSNs) bought local NBA, MLB, and NHL rights for decades, beaming games to cable subscribers in home markets. Cord-cutting drained RSN revenue, pushing several into bankruptcy.",
        "When RSNs fail, fans lose access mid-season or face blackouts on league streaming apps because another company still holds exclusive local rights.",
        "The DOJ has long monitored sports broadcasting—from the Paramount consent decrees to satellite disputes. Renewed interest focuses on whether exclusivity and bundling violate antitrust law in the streaming era.",
        "Streaming services like Apple, Amazon, and YouTube have bought national packages (Friday NFL, some MLB), but local games often remain locked behind RSN or cable deals.",
        "Leagues argue exclusivity funds player salaries and stadium investments; without guaranteed rights fees, smaller markets suffer. Consumer advocates say exclusivity is a synonym for monopoly on live local games.",
        "Investigations and bankruptcy courts are untangling contracts written for the cable era. Until cases conclude, describe blackouts and price spikes as symptoms under review, not proven illegal acts.",
      ],
      whyItMatters: [
        "Sports blackouts are competition issues—not just annoying bugs—when exclusive contracts block rival distributors.",
        "RSN collapse shows how legacy bundling can leave fans with no legal way to watch.",
        "Streaming joint ventures by leagues may help or hurt depending on whether they exclude independent platforms.",
        "Antitrust outcomes could reshape how much you pay to follow one team.",
      ],
      whatWasClaimed: [
        "Exclusive territorial licenses foreclose alternative streaming distribution.",
        "Vertical integration between leagues, RSNs, and national networks raises rival costs.",
        "Long-term contracts survive market shifts and harm consumers denied a la carte access.",
        "Joint selling arrangements may coordinate pricing across teams or regions.",
      ],
      theOtherSide: [
        "Leagues say exclusivity maximizes revenue that supports athletes and grassroots programs.",
        "Networks argue they invested in RSN infrastructure and deserve contract enforcement.",
        "They contend new apps complement—not replace—traditional bundles.",
        "Some teams prefer local ownership of media rights for community ties.",
      ],
      whatItMeansForYou: [
        "Before cutting cable, verify whether your team's games stream in your zip code—blackout maps change during bankruptcies.",
        "Free trials of league apps may not include local games; read fine print.",
        "Public comments to FCC and DOJ sports inquiries can mention fan harm in your market.",
        "Legal resolutions may take years; interim packages may be messy.",
      ],
      bottomLine:
        "Sports streaming sits at the intersection of bankruptcy, media consolidation, and antitrust. DOJ review is active, but fans still navigate blackout puzzles without a final fix.",
    },
  },
  {
    id: "live-eu-chip-foundry-subsidies",
    name: "EU Review of Advanced Chip Foundry Subsidies and Market Access",
    shortName: "EU Chip Foundry Review",
    companies: ["intel", "tsmc", "samsung"],
    jurisdictions: ["EU"],
    conduct: ["market_access", "exclusivity", "abuse_of_dominance", "merger"],
    yearStart: 2023,
    status: "ongoing",
    summary:
      "The European Commission is reviewing state aid and market-access conditions for semiconductor fabs under the EU Chips Act, while continuing antitrust scrutiny of dominant foundry and equipment players.",
    regulatorArgument:
      "Public subsidies must not entrench exclusivity for a single foundry customer or foreclose fabless chip designers; dominant input suppliers must not leverage positions in equipment or IP.",
    outcome:
      "Aid approvals with conditions, ongoing monitoring, and separate abuse probes continue; no final closure of EU chip competition policy.",
    laws: ["tfeu-101", "tfeu-102", "eu-merger"],
    markets: ["semiconductor manufacturing", "chip foundries", "fab equipment"],
    sources: [
      {
        label: "EU Chips Act",
        url: "https://digital-strategy.ec.europa.eu/en/policies/european-chips-act",
      },
      {
        label: "EC state aid semiconductor overview",
        url: "https://competition-policy.ec.europa.eu/state-aid/legislation/semiconductor-industry_en",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "EU Chips Act adopted", date: "September 21, 2023" },
      { label: "Major fab aid notifications (Intel, others)", date: "2023–2024" },
      { label: "Commission market dialogues on access", date: "2024" },
      { label: "Ongoing compliance monitoring", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2023",
        title: "Chips Act framework launches",
        detail:
          "The EU authorized large subsidies to attract cutting-edge fabs after pandemic shortages exposed dependence on Asian foundries.",
      },
      {
        date: "2023–2024",
        title: "Aid packages scrutinized",
        detail:
          "Intel, TSMC, and others proposed European plants. The Commission examined whether aid distorts competition or includes adequate openness commitments.",
      },
      {
        date: "2024",
        title: "Competition and industrial policy overlap",
        detail:
          "Regulators debated whether supporting one mega-fab helps or hurts smaller European chip designers needing foundry capacity.",
      },
      {
        date: "Ongoing",
        title: "Monitoring and antitrust parallel tracks",
        detail:
          "State aid decisions include reporting duties; separate TFEU 102 theories may target dominant equipment or IP holders. Outcomes remain open.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Europe wants its own advanced chip factories and is spending public money to get them. Regulators must ensure subsidies do not create a new monopoly gatekeeper for who can manufacture silicon. Reviews of Intel, TSMC, and Samsung projects continue alongside normal antitrust rules.",
      theStory: [
        "Semiconductor foundries etch billions of transistors onto silicon wafers. Only a few companies—TSMC, Samsung, Intel—can produce the most advanced chips at scale.",
        "COVID-era shortages of chips for cars, phones, and medical gear pushed the EU to launch the Chips Act: faster permits, coordinated investment, and allowed state aid for 'first-of-a-kind' fabs.",
        "Intel announced mega-factories in Germany and Poland with billions in government support. TSMC explored a plant in Dresden. Each application triggers competition review: Will subsidized capacity be open to European fabless firms on fair terms?",
        "The Commission also watches upstream markets—equipment from ASML and others, and IP licensing—where dominance can block new entrants even if fabs exist.",
        "US and Asian industrial policies run in parallel, raising fears of subsidy races that still leave one foundry holding critical nodes.",
        "Companies argue subsidies level a playing field against regions that already host leading fabs. Critics warn taxpayers may fund plants that primarily serve one anchor customer.",
        "Because aid decisions and abuse probes are ongoing, avoid stating that any approved fab is illegal. The question is whether conditions preserve access and rivalry as production starts.",
      ],
      whyItMatters: [
        "Chips power phones, cars, and AI; foundry bottlenecks become price hikes and empty shelves.",
        "Subsidies without access rules could recreate dependence on one manufacturer.",
        "Small European chip designers need fair wafer allocation—not just factories on the map.",
        "Global tech sovereignty debates intersect with ordinary antitrust tools.",
      ],
      whatWasClaimed: [
        "State aid must include commitments that subsidized fabs serve third parties on non-discriminatory terms.",
        "Dominant foundry or equipment firms may leverage positions to exclude rivals.",
        "Exclusive anchor-customer deals tied to public money distort the internal market.",
        "Merger and joint-venture structures in chip alliances need ongoing scrutiny.",
      ],
      theOtherSide: [
        "Recipients say fabs are capital-intensive and require anchor customers to be viable.",
        "Governments argue subsidies reduce strategic vulnerability after shortages.",
        "Firms maintain open foundry models already serve diverse clients globally.",
        "They warn over-regulation could delay projects past market windows.",
      ],
      whatItMeansForYou: [
        "Car prices and gadget availability still tie back to fab capacity—even if you never see a cleanroom.",
        "European jobs from new plants depend on projects clearing aid conditions still under review.",
        "Developers of IoT or automotive chips should watch Commission conditions on third-party access.",
        "No final EU ruling declares the Chips Act failed; implementation is the live fight.",
      ],
      bottomLine:
        "Europe is paying to reshore chipmaking while competition enforcers watch for new bottlenecks. Aid approvals and antitrust oversight continue together.",
    },
  },
  {
    id: "live-eu-mobile-wallets",
    name: "EU Investigation into Mobile Wallets and Tap-to-Pay Access",
    shortName: "EU Mobile Wallets",
    companies: ["apple", "google"],
    jurisdictions: ["EU"],
    conduct: ["refusal_to_deal", "market_access", "tying", "abuse_of_dominance"],
    yearStart: 2022,
    status: "ongoing",
    summary:
      "The European Commission is investigating whether Apple and others restrict rival mobile wallets from accessing NFC tap-to-pay hardware on smartphones, limiting competition in in-store payments.",
    regulatorArgument:
      "Dominant device platforms may illegally exclude third-party payment apps from essential NFC interfaces while steering users to proprietary wallets.",
    outcome:
      "Formal investigation continues under Article 102 TFEU and overlaps with DMA payment obligations; no final infringement decision yet.",
    laws: ["tfeu-102", "dma"],
    markets: ["mobile payments", "digital wallets", "contactless NFC"],
    sources: [
      {
        label: "EC Apple Pay investigation press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_22_6116",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Commission opened Apple Pay probe", date: "June 2022" },
      { label: "Statement of Objections reported", date: "2024" },
      { label: "DMA payment service obligations applied", date: "March 2024" },
      { label: "Ongoing technical compliance tests", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2022",
        title: "EU opens NFC access investigation",
        detail:
          "Regulators examined whether Apple blocked banks and fintechs from offering tap-to-pay on iPhones except through Apple Pay.",
      },
      {
        date: "2023–2024",
        title: "DMA adds parallel duties",
        detail:
          "Gatekeeper rules required opening payment interfaces to rivals, but implementation details and security exceptions remain contested.",
      },
      {
        date: "2024",
        title: "Charges move toward formal stage",
        detail:
          "Media reported the Commission neared a Statement of Objections alleging abuse of dominance in mobile wallets on iOS.",
      },
      {
        date: "Ongoing",
        title: "Remedies and appeals path open",
        detail:
          "Apple may offer commitments or fight charges. Banks test new wallet integrations in the EU while US cases proceed separately.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Tap your phone to pay and Apple Pay may be the only wallet that uses the iPhone's NFC chip in some regions. Europe investigates whether that blocks banks and PayPal from competing on equal hardware access. The case is not finished—DMA rules also push Apple to open interfaces.",
      theStory: [
        "Contactless payments moved from plastic cards to phones and watches. Near-field communication (NFC) chips let you tap at transit gates and checkout terminals.",
        "On iPhones, Apple historically restricted NFC payment credentials for third parties, routing banks through Apple Pay with fees and branding rules.",
        "European banks and fintechs complained they could not offer competing tap-to-pay apps with their own loyalty features, hurting payment competition and data innovation.",
        "The Commission opened an abuse-of-dominance investigation in 2022, parallel to UK and US scrutiny and later DMA obligations on gatekeepers for payment services.",
        "Apple cites security and user experience, saying opening NFC risks fraud and fragmentation. Rivals argue Android already allows multiple wallets with strong security.",
        "DMA compliance added technical steps—APIs, default wallet settings—but developers report testing whether access is truly equivalent to Apple Pay.",
        "Until a final decision or settled commitments, describe restrictions as allegations under review, not established illegal acts.",
      ],
      whyItMatters: [
        "Payment apps compete on rewards, budgeting tools, and fees invisible at the tap.",
        "Hardware access cases recur across NFC, Bluetooth, and secure enclaves—templates for other locked features.",
        "European outcomes may influence US wallet competition on iPhones.",
        "Merchants indirectly feel payment competition through interchange and wallet incentives.",
      ],
      whatWasClaimed: [
        "Apple dominates mobile wallets on iOS devices in the EEA.",
        "NFC access rules exclude rival wallet apps from equivalent tap-to-pay functionality.",
        "Tying Apple Pay to device security features forecloses bank-branded wallets.",
        "Developers face unclear criteria for approval of alternative payment apps.",
      ],
      theOtherSide: [
        "Apple says Apple Pay protects card tokens and reduces fraud.",
        "It argues users can still pay with cards and many online alternatives.",
        "It maintains DMA and iOS updates provide new access pathways.",
        "It warns forced openness could weaken device integrity.",
      ],
      whatItMeansForYou: [
        "EU residents may see more bank apps offer tap-to-pay as DMA and investigations progress—try updates if your bank announces support.",
        "Compare wallet rewards; more competition may change cashback offers.",
        "Security settings matter when enabling new payment apps—verify official bank releases.",
        "US iPhone users should not assume EU remedies apply locally yet.",
      ],
      bottomLine:
        "Europe is testing whether smartphone makers must share tap-to-pay hardware with rival wallets. Investigations and DMA compliance run in parallel without a final fine or judgment.",
    },
  },
  {
    id: "live-ftc-marketplace-sellers",
    name: "FTC Investigation of E-Commerce Marketplace Seller Treatment",
    shortName: "Marketplace Sellers FTC",
    companies: ["amazon", "ebay", "walmart"],
    jurisdictions: ["US"],
    conduct: ["discrimination", "self_preferencing", "vertical_restraint", "data_lockin"],
    yearStart: 2023,
    status: "ongoing",
    summary:
      "The FTC is examining how major online marketplaces treat third-party sellers, including account suspensions, fee structures, advertising auctions, and use of seller data to launch competing products.",
    regulatorArgument:
      "Marketplace operators with gatekeeper power may discriminate against sellers, copy their offerings, or impose unfair terms that raise consumer prices and reduce choice.",
    outcome:
      "Investigations overlap with the separate Amazon monopolization case but focus on seller-facing practices; no standalone final order yet.",
    laws: ["ftc-5", "sherman-2"],
    markets: ["online marketplaces", "third-party seller services", "e-commerce"],
    sources: [
      {
        label: "FTC Amazon complaint (related)",
        url: "https://www.ftc.gov/legal-library/browse/cases-proceedings/191-0133-amazoncom-inc",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Seller outreach and orders (reported)", date: "2023" },
      { label: "FTC Amazon suit emphasizing seller policies", date: "September 2023" },
      { label: "Small Business Committee hearings", date: "2024" },
      { label: "Ongoing discovery in related litigation", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2023",
        title: "Seller complaints centralize",
        detail:
          "Thousands of merchants reported sudden suspensions, reserve holds, and Buy Box losses; the FTC gathered evidence through the Amazon case and broader marketplace study.",
      },
      {
        date: "2023–2024",
        title: "Policy vs antitrust theories",
        detail:
          "Congress debated marketplace fairness bills while enforcers tested whether platform rules violate monopolization or unfair methods of competition.",
      },
      {
        date: "2024",
        title: "Advertising and fee complexity",
        detail:
          "Sellers testified that mandatory ads to remain visible functioned like hidden fee hikes, a theory enforcers continue to evaluate.",
      },
      {
        date: "Ongoing",
        title: "Case development",
        detail:
          "No separate FTC-only seller settlement has concluded. Outcomes may emerge from Amazon litigation or additional complaints.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Small businesses often depend on Amazon, eBay, or Walmart.com for discovery and shipping. The FTC is studying whether those platforms suspend sellers unfairly, copy their products, or force them to buy ads to stay visible. Related Amazon litigation is active; nothing is finally decided for all marketplaces.",
      theStory: [
        "Marketplaces connect millions of sellers to shoppers, handling payments, reviews, and sometimes fulfillment. Platform rules feel like law for small businesses.",
        "Sellers report arbitrary suspensions with limited appeals, reserve accounts that freeze cash flow, and sudden policy changes affecting inventory.",
        "A recurring fear is that platforms use non-public sales data to launch private-label versions of successful products—a self-preferencing and data-access story.",
        "The FTC's broader Amazon complaint includes seller-centric theories: anti-discounting policies, Buy Box algorithms, and Prime eligibility tied to Fulfillment by Amazon.",
        "eBay and Walmart face overlapping reputational and regulatory pressure though enforcers focus most resources on Amazon's scale.",
        "Platforms respond that rules fight counterfeits and protect customer experience; suspensions follow documented violations.",
        "Because probes continue, distinguish documented seller pain from legal findings. Courts have not ruled that all marketplace advertising requirements are illegal.",
      ],
      whyItMatters: [
        "Seller fees and visibility rules flow into retail prices you pay.",
        "Independent brands may disappear from search if algorithms demote them.",
        "Account suspensions can wipe out a family's livelihood overnight.",
        "Marketplace cases define how much power platforms have over small business.",
      ],
      whatWasClaimed: [
        "Marketplaces possess gatekeeper power over online discovery and fulfillment.",
        "Seller data is used to benefit the platform's retail or private-label arm.",
        "Advertising mandates and fee stacks raise costs and mimic monopoly pricing.",
        "Suspension and appeal processes are unfair and exclusionary.",
      ],
      theOtherSide: [
        "Platforms say policies protect buyers from fraud and unsafe goods.",
        "They argue sellers freely choose to list and can multi-home on other sites.",
        "They maintain data firewalls exist between marketplace and retail units where required.",
        "They warn heavy regulation could reduce consumer trust features.",
      ],
      whatItMeansForYou: [
        "If you sell online, keep records of policy changes and performance metrics—disputes may hinge on documentation.",
        "Shoppers can compare prices on brand websites; marketplace rank is not the only path.",
        "Watch FTC v. Amazon developments for remedies affecting Buy Box and Prime rules.",
        "Until courts rule, platforms may continue enforcing advertising and pricing policies.",
      ],
      bottomLine:
        "Seller treatment on big marketplaces is under active FTC scrutiny tied to the Amazon case and broader studies. Allegations are serious; final legal outcomes are not in.",
    },
  },
  {
    id: "live-ftc-ai-model-partnerships",
    name: "FTC Inquiry into AI Foundation Model Partnerships and Investments",
    shortName: "FTC AI Partnerships",
    companies: ["microsoft", "google", "amazon", "meta"],
    jurisdictions: ["US"],
    conduct: ["merger", "exclusivity", "refusal_to_deal", "data_lockin"],
    yearStart: 2024,
    status: "ongoing",
    summary:
      "The FTC opened a inquiry into generative AI partnerships and investments—such as cloud ties with model developers—examining whether deals dampen competition for talent, data, and compute.",
    regulatorArgument:
      "Large tech incumbents may use investments and licensing rather than full mergers to influence startups, secure exclusive compute, and limit independent model development.",
    outcome:
      "Mandatory orders to major players are pending analysis; no enforcement action or court judgment has concluded the inquiry.",
    laws: ["ftc-5", "hart-scott", "clayton-7"],
    markets: ["generative AI", "cloud compute", "foundation models"],
    sources: [
      {
        label: "FTC AI partnerships inquiry announcement",
        url: "https://www.ftc.gov/news-events/news/press-releases/2024/01/ftc-launches-inquiry-generative-ai-investments-partnerships",
      },
    ],
    readingMinutes: 11,
    keyDates: [
      { label: "FTC announced AI partnership inquiry", date: "January 25, 2024" },
      { label: "Orders to Microsoft, Amazon, Google, Anthropic, OpenAI (reported)", date: "2024" },
      { label: "Staff listening sessions", date: "2024" },
      { label: "Ongoing analysis of responses", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2023–2024",
        title: "Wave of AI deals",
        detail:
          "Cloud giants invested billions in model developers, pairing capital with exclusive compute and distribution on Azure, AWS, or Google Cloud.",
      },
      {
        date: "January 2024",
        title: "FTC launches multi-company study",
        detail:
          "The Commission ordered documents on governance rights, board observers, chip access, and product roadmaps—short of challenging every deal in court immediately.",
      },
      {
        date: "2024",
        title: "Parallel UK CMA review",
        detail:
          "British enforcers examined Microsoft–OpenAI ties, influencing US framing of partnership vs acquisition risk.",
      },
      {
        date: "Ongoing",
        title: "Enforcement decisions pending",
        detail:
          "Staff may refer specific deals for Clayton Act review or challenge exclusivity provisions. No public final order yet.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Big Tech funded AI startups through partnerships instead of classic mergers. The FTC wants to know whether those deals secretly block competition for chips, data, and engineers. This is an inquiry—a fact-finding step—not a ruling that AI partnerships are illegal.",
      theStory: [
        "Generative AI burst into public view with chatbots and image tools powered by massive foundation models trained on huge compute clusters.",
        "Training cutting-edge models costs hundreds of millions. Startups paired with cloud providers: investment cash plus preferred access to GPUs and enterprise sales channels.",
        "Microsoft's alliance with OpenAI is the most visible, but Amazon backed Anthropic and Google integrated its own models with cloud services.",
        "Antitrust enforcers worry these structures evade Hart-Scott-Rodino merger review while giving incumbents influence over pricing, safety releases, and which apps reach customers.",
        "In January 2024 the FTC ordered five companies to produce information on decision rights, exclusivity, and competitive impact. Chair Khan framed it as early intervention before markets tip.",
        "Companies respond that partnerships accelerate safe innovation and that the AI ecosystem remains crowded with open-weight models and new entrants.",
        "Careful wording matters: regulators are studying whether some deals harm competition—not declaring AI illegal or banning investment outright.",
      ],
      whyItMatters: [
        "AI will shape search, coding, customer service, and pricing tools you interact with daily.",
        "Exclusive compute can starve rivals even when models stay nominally independent.",
        "How enforcers treat AI deals may define competition policy for other deep-tech sectors.",
        "Workers and startups feel pressure when talent and GPUs concentrate under a few clouds.",
      ],
      whatWasClaimed: [
        "Partnerships may confer de facto control without merger review.",
        "Exclusive cloud and chip arrangements foreclose independent model developers.",
        "Board observers and governance rights let incumbents steer product direction anti-competitively.",
        "Data licensing ties may lock training resources away from rivals.",
      ],
      theOtherSide: [
        "Partners say deals fund safety research and widen access via APIs.",
        "They argue models remain substitutable and open-source alternatives exist.",
        "They maintain investments are pro-competitive capital injections.",
        "They caution premature enforcement could slow beneficial innovation.",
      ],
      whatItMeansForYou: [
        "Businesses choosing AI vendors should ask about cloud lock-in and data use terms—regulatory scrutiny may later reshape contracts.",
        "Developers benefit from monitoring whether API pricing stays competitive as inquiries proceed.",
        "Treat media claims that 'AI deals are monopolies' as hypotheses until agencies act in court.",
        "Public comments to the FTC can highlight small AI firms' access barriers without asserting final illegality.",
      ],
      bottomLine:
        "The FTC is mapping AI partnerships before markets harden. The review is cautious fact-finding; no final condemnation of specific deals has landed.",
    },
  },
  {
    id: "live-ftc-pharmacy-chain-merger",
    name: "FTC Review of Pharmacy Chain Consolidation",
    shortName: "Pharmacy Chain Review",
    companies: ["cvs", "walgreens", "rite-aid"],
    jurisdictions: ["US"],
    conduct: ["merger", "vertical_restraint", "discrimination"],
    yearStart: 2023,
    status: "ongoing",
    summary:
      "The FTC is scrutinizing consolidation among retail pharmacy chains and vertical ties to PBMs and insurers, including store closures and acquisitions that may reduce prescription competition locally.",
    regulatorArgument:
      "Fewer independent and chain pharmacies in a market can raise prices, worsen service, and strengthen PBM bargaining power against patients and pharmacists.",
    outcome:
      "Investigations into specific transactions and industry studies continue; Rite Aid bankruptcy-related sales face ongoing review without a single nationwide remedy order.",
    laws: ["clayton-7", "ftc-5", "hart-scott"],
    markets: ["retail pharmacy", "specialty pharmacy", "PBM integration"],
    sources: [
      {
        label: "FTC pharmacy competition efforts",
        url: "https://www.ftc.gov/news-events/news/press-releases",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "FTC PBM and pharmacy focus announced", date: "2022–2023" },
      { label: "Rite Aid bankruptcy and asset sales", date: "2023–2024" },
      { label: "State challenges to chain closures (reported)", date: "2024" },
      { label: "Ongoing merger reviews", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2023",
        title: "Pharmacy deserts gain attention",
        detail:
          "Closures of CVS, Walgreens, and Rite Aid locations prompted questions about whether consolidation and PBM reimbursement drove exits.",
      },
      {
        date: "2023–2024",
        title: "Bankruptcy sales scrutinized",
        detail:
          "Rite Aid's restructuring led to store sell-offs; enforcers examined whether buyers would preserve competitive pharmacy options.",
      },
      {
        date: "2024",
        title: "Vertical integration in spotlight",
        detail:
          "CVS owns a major PBM and insurer; the FTC linked retail pharmacy trends to broader PBM inquiry theories.",
      },
      {
        date: "Ongoing",
        title: "Case-by-case enforcement",
        detail:
          "No global breakup ordered; individual market reviews and state actions continue.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Pharmacy chains are closing stores while CVS and others also run insurance and PBM businesses. The FTC is reviewing whether consolidation and vertical ties reduce prescription competition in your neighborhood. Reviews continue store-by-store; there is no final national breakup order.",
      theStory: [
        "Retail pharmacies fill most short-term prescriptions and give vaccines and basic care. Three national chains operate thousands of US locations, increasingly alongside mail-order and specialty pharmacies.",
        "Rite Aid's bankruptcy removed a competitor in many towns. When assets sell, the buyer may be a rival chain or a private equity group—each scenario raises different competition questions.",
        "CVS vertically integrates Caremark (PBM) and Aetna (insurance). Critics say that stack steers patients to CVS stores and squeezes independents on reimbursement.",
        "Walgreens faced shareholder pressure and announced closures, citing theft and reimbursement rates. Communities labeled some areas 'pharmacy deserts' when the last chain left.",
        "The FTC connects pharmacy consolidation to its PBM study: if middlemen pay stores below cost, chains exit even when customers need local access.",
        "States sued or legislated on clinic closures independently while federal enforcers evaluate mergers crossing HSR thresholds.",
        "Ongoing reviews mean describing harm as a live concern, not a completed finding that every chain closure violated antitrust law.",
      ],
      whyItMatters: [
        "Losing the last pharmacy in town affects seniors and rural families most.",
        "Insurance-PBM-pharmacy vertical stacks mirror tech platform self-preferencing.",
        "Merger reviews on bankrupt chains can lock in local monopolies for decades.",
        "Specialty drug access may concentrate in mail-order arms tied to PBMs.",
      ],
      whatWasClaimed: [
        "Store acquisitions may substantially lessen pharmacy competition locally.",
        "Vertical integration encourages steering and discriminatory reimbursement.",
        "Coordinated closures reduce choice even without a formal merger.",
        "Private equity roll-ups may strip assets and raise prices post-sale.",
      ],
      theOtherSide: [
        "Chains cite low generic reimbursement and crime as closure drivers.",
        "They argue mail-order improves convenience for maintenance drugs.",
        "Buyers of bankrupt stores say they preserve jobs and access.",
        "They maintain local markets still include grocers and independents.",
      ],
      whatItMeansForYou: [
        "If your pharmacy closes, ask insurers about in-network alternatives before auto-enrollment in mail-order.",
        "Independent pharmacies may negotiate outside PBM-owned networks—compare cash prices.",
        "Comment on local merger reviews when FTC or state AGs seek public input.",
        "Until orders issue, chains may continue closing under business judgment.",
      ],
      bottomLine:
        "Pharmacy chain consolidation and PBM ties are under active FTC scrutiny. Local access problems are real for many communities; legal outcomes remain case-specific and unfinished.",
    },
  },
  {
    id: "live-doj-wireless-spectrum-merger",
    name: "DOJ Review of Wireless Carrier Spectrum and Market Consolidation",
    shortName: "Wireless Spectrum Merger",
    companies: ["t-mobile", "verizon", "att"],
    jurisdictions: ["US"],
    conduct: ["merger", "exclusivity", "market_access"],
    yearStart: 2023,
    status: "ongoing",
    summary:
      "The Justice Department continues monitoring US mobile wireless competition after prior mergers, reviewing new spectrum acquisitions, joint ventures, and marketing alliances for effects on prices and rural coverage.",
    regulatorArgument:
      "Further consolidation of spectrum holdings or network sharing may reduce head-to-head competition among national carriers, raising prices and slowing innovation.",
    outcome:
      "Compliance under prior consent decrees, new transaction reviews, and industry studies proceed; no new breakup order has issued.",
    laws: ["clayton-7", "sherman-1", "hart-scott"],
    markets: ["mobile wireless", "spectrum licenses", "5G networks"],
    sources: [
      {
        label: "DOJ Antitrust Division telecommunications",
        url: "https://www.justice.gov/atr/telecommunications-and-media-enforcement",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "T-Mobile Sprint remedies monitoring", date: "2020–ongoing" },
      { label: "New spectrum auction outcomes", date: "2023–2024" },
      { label: "DOJ reviews of regional MVNO deals (reported)", date: "2024" },
      { label: "Ongoing competition workshops", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2020–2023",
        title: "Post-Sprint merger oversight",
        detail:
          "DOJ and states required divestitures and supported Dish as a fourth nationwide player; monitors tracked compliance.",
      },
      {
        date: "2023–2024",
        title: "Spectrum concentration debates",
        detail:
          "Auctions and secondary-market trades shifted low-band and mid-band assets; enforcers asked whether three nationals hoard capacity.",
      },
      {
        date: "2024",
        title: "Fixed wireless and cable MVNO growth",
        detail:
          "Cable companies resell wireless service, complicating market definition in ongoing reviews.",
      },
      {
        date: "Ongoing",
        title: "Future deal scrutiny",
        detail:
          "Any new carrier merger or joint network sharing would face HSR review; current probes are preventive and monitoring-focused.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Most Americans choose among three big cell carriers. The Justice Department still watches that market after approving T-Mobile's Sprint deal with conditions. New spectrum sales and network-sharing talks stay on the antitrust radar, but no fresh megamerger trial is finished.",
      theStory: [
        "Mobile wireless is capital-intensive: carriers buy spectrum at auction, build towers, and market nationwide plans.",
        "The T-Mobile–Sprint merger reduced national players from four to three, but DOJ allowed it with divestitures and help launching Dish as a new competitor.",
        "Compliance monitors track whether T-Mobile met commitments. Critics argue Dish remains small and cable MVNOs are not full substitutes for facilities-based rivalry.",
        "Spectrum secondary markets let carriers buy capacity from one another; enforcers review large trades for foreclosure effects on rural buildout.",
        "Fixed wireless home broadband blurs lines between phone and internet competition, changing how regulators define the market in ongoing analysis.",
        "Rural advocates say consolidation reduces buildout incentives where towers are sparse.",
        "DOJ activity today is largely forward-looking—no concluded 2024 case broke up a carrier, but reviews remain live for new proposals.",
      ],
      whyItMatters: [
        "Your monthly phone bill tracks how many real competitors cover your area.",
        "Spectrum hoarding can block new entrants even if brands look plentiful via MVNO resellers.",
        "Prior merger remedies show enforcement does not end at closing—monitoring continues for years.",
        "5G and fixed wireless depend on competitive pressure to invest.",
      ],
      whatWasClaimed: [
        "Further spectrum concentration may strengthen oligopoly pricing.",
        "Network-sharing deals could reduce independent network differentiation.",
        "Prior remedies may prove inadequate to preserve a fourth facilities-based rival.",
        "Marketing alliances might coordinate pricing without full merger review.",
      ],
      theOtherSide: [
        "Carriers say scale enables nationwide 5G and rural investment.",
        "They argue MVNOs and cable resellers add competitive discipline.",
        "They maintain spectrum trades improve efficient use of limited airwaves.",
        "They warn blocking deals could leave weaker carriers unable to invest.",
      ],
      whatItMeansForYou: [
        "Compare total plan cost including phone installments—oligopoly markets still compete on promotions.",
        "Check coverage maps if you rely on a new fixed wireless home product.",
        "If a carrier merger is announced, expect long DOJ review before changes affect your contract.",
        "Existing three-carrier structure continues while monitoring persists.",
      ],
      bottomLine:
        "US wireless remains a heavily scrutinized oligopoly. DOJ oversight after Sprint/T-Mobile continues, and new spectrum or sharing deals face review without a fresh concluded breakup case.",
    },
  },
  {
    id: "live-ftc-ocean-shipping-alliance",
    name: "FTC and DOJ Scrutiny of Ocean Shipping Alliances",
    shortName: "Ocean Shipping Alliances",
    companies: ["maersk", "msc", "cma-cgm"],
    jurisdictions: ["US"],
    conduct: ["cartel_coordination", "market_access", "price_fix", "merger"],
    yearStart: 2022,
    status: "ongoing",
    summary:
      "US enforcers are reviewing global ocean carrier alliances and concentration after pandemic freight spikes, examining whether cooperation agreements reduce competition on major trade lanes.",
    regulatorArgument:
      "Alliances let carriers share vessels and coordinate capacity; if taken too far, they may function as tacit coordination on price and sailings, harming shippers and consumers.",
    outcome:
      "Congress adjusted FMC authority; antitrust agencies monitor alliance filings; no US court has dismantled a major alliance yet.",
    laws: ["sherman-1", "ftc-5", "clayton-7"],
    markets: ["container shipping", "ocean freight", "logistics"],
    sources: [
      {
        label: "FMC alliance oversight",
        url: "https://www.fmc.gov/",
      },
      {
        label: "DOJ shipping competition statements",
        url: "https://www.justice.gov/atr",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Ocean Shipping Reform Act signed", date: "June 16, 2022" },
      { label: "DOJ-FMC memorandum of understanding renewed focus", date: "2022–2023" },
      { label: "Alliance capacity reviews (industry reports)", date: "2023–2024" },
      { label: "Ongoing monitoring of trans-Pacific rates", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2020–2022",
        title: "Freight rates surge",
        detail:
          "Container spot prices soared during supply-chain disruptions, prompting congressional hearings on carrier power and alliance behavior.",
      },
      {
        date: "2022",
        title: "US reforms shipping oversight",
        detail:
          "The Ocean Shipping Reform Act expanded Federal Maritime Commission tools; DOJ reaffirmed antitrust applies to carriers despite limited exemptions.",
      },
      {
        date: "2023–2024",
        title: "Enforcers study alliances",
        detail:
          "Agencies reviewed vessel-sharing agreements on Asia–US routes, asking whether blank sailings coordinated capacity cuts.",
      },
      {
        date: "Ongoing",
        title: "Rates normalize but scrutiny continues",
        detail:
          "Spot prices fell from peaks, yet shippers push for structural remedies. No major US antitrust trial against an alliance has concluded.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Most imported goods ride in containers on ships operated by a handful of global carriers that legally cooperate in alliances. After pandemic price spikes, US agencies asked whether those alliances act too much like cartels. Investigations and FMC oversight continue; alliances still operate.",
      theStory: [
        "Container shipping moves furniture, clothes, electronics—most physical goods in global trade. A few carriers dominate: Maersk, MSC, CMA CGM, and others.",
        "Carriers form alliances to share ships and slots on big routes, saving fuel and ensuring port coverage. US law grants limited antitrust immunity for certain agreements filed with the FMC.",
        "When COVID disrupted ports, spot freight rates from Asia to the US West Coast multiplied, angering retailers and households facing delays and higher shelf prices.",
        "Congress passed the Ocean Shipping Reform Act in 2022, boosting FMC authority to challenge unreasonable refusal to deal and excessive charges.",
        "The DOJ warned immunity is narrow—hard-core price fixing remains illegal. Enforcers reviewed whether blank sailings (canceled trips) synchronized capacity in anticompetitive ways.",
        "Carriers blame port congestion, equipment shortages, and demand swings—not collusion—for high rates.",
        "Scrutiny is ongoing; describing alliances as illegal cartels would overstate current US court findings.",
      ],
      whyItMatters: [
        "Import prices feed into inflation at stores you shop.",
        "Small importers lack leverage against giant carriers and alliance schedules.",
        "Alliance immunity is a policy choice Congress may revisit.",
        "Shipping concentration affects defense supply chains and drug imports.",
      ],
      whatWasClaimed: [
        "Alliances facilitate coordinated capacity reductions affecting price.",
        "Carrier concentration lets firms impose unfair detention and demurrage fees.",
        "Immunity filings may shield behavior that exceeds lawful vessel sharing.",
        "Merged carrier assets strengthen oligopoly on key lanes.",
      ],
      theOtherSide: [
        "Carriers say alliances improve service frequency and environmental efficiency.",
        "They argue rates fell as congestion eased.",
        "They maintain FMC filing regimes provide transparency.",
        "They warn punishing alliances could reduce sailings and raise costs.",
      ],
      whatItMeansForYou: [
        "Businesses importing goods should document freight quotes during disputes—FMC complaint processes expanded.",
        "Consumers see shipping costs indirectly; sustained rate drops followed 2022 peaks.",
        "Watch bipartisan bills on alliance immunity for potential legislative change.",
        "No court order currently bans major alliances.",
      ],
      bottomLine:
        "Ocean shipping alliances face heightened US oversight after pandemic turmoil. Antitrust and maritime regulators are active, but structural breakups have not been ordered.",
    },
  },
  {
    id: "live-eu-hotel-ota-parity",
    name: "EU Hotel Booking Platform Parity Rules Review",
    shortName: "EU Hotel OTA Parity",
    companies: ["booking", "expedia"],
    jurisdictions: ["EU"],
    conduct: ["vertical_restraint", "price_fix", "resale_restriction", "abuse_of_dominance"],
    yearStart: 2022,
    status: "ongoing",
    summary:
      "European regulators continue reviewing online travel agencies' parity clauses and ranking practices after national bans, assessing whether Booking.com and Expedia still restrict hotels from offering lower direct rates.",
    regulatorArgument:
      "Wide or narrow parity clauses and search ranking opacity may prevent hotels from competing on price and innovation on their own websites.",
    outcome:
      "National parity bans and EU-wide dialogues continue; Commission and NCAs monitor compliance without a single EU-wide fine closing the matter.",
    laws: ["tfeu-101", "tfeu-102", "dma"],
    markets: ["online travel agencies", "hotel distribution", "metasearch"],
    sources: [
      {
        label: "EU competition policy OTAs",
        url: "https://competition-policy.ec.europa.eu/sectors/tourism_en",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Wide parity clauses banned in several member states", date: "2015–2020" },
      { label: "EU monitoring of revised OTA contracts", date: "2022–2023" },
      { label: "DMA gatekeeper duties for large platforms (overlap)", date: "2024" },
      { label: "Ongoing national enforcement actions", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2010s",
        title: "Parity clause investigations spread",
        detail:
          "France, Germany, Italy, and others prohibited clauses requiring hotels to offer OTAs their best price.",
      },
      {
        date: "2022–2023",
        title: "Commission coordinates follow-up",
        detail:
          "Hotels alleged OTAs shifted to ranking penalties and marketing fees instead of explicit parity.",
      },
      {
        date: "2024",
        title: "DMA intersection",
        detail:
          "Large OTAs designated or near gatekeeper thresholds face transparency duties on ranking and data use.",
      },
      {
        date: "Ongoing",
        title: "Compliance testing",
        detail:
          "National authorities review whether hotels can freely discount on direct channels without hidden demotion.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Hotels often sell rooms through Booking.com and Expedia, which once forbade lower prices on hotel websites. Europe banned the worst parity clauses, but regulators still check whether platforms punish hotels that offer cheaper direct deals. Reviews continue country by country.",
      theStory: [
        "Online travel agencies (OTAs) aggregate hotel rooms for travelers, taking commissions that can reach 15–25% or more.",
        "Old 'rate parity' contracts required hotels never list a lower price on their own sites—a resale restriction hotels hated during high-commission years.",
        "European competition authorities in France, Germany, and elsewhere outlawed wide parity clauses. OTAs revised contracts but kept narrow clauses and complex ranking algorithms.",
        "Hotels claim invisible penalties: fewer photos, worse search placement, or withheld 'genius' badges if they discount directly.",
        "The European Commission coordinates national cases rather than one giant fine, though DMA gatekeeper rules may add duties for the largest platforms.",
        "Expedia and Booking argue parity protected consumers from confusing price fragmentation and that ranking reflects quality and conversion data.",
        "Because enforcement is ongoing, hotels' grievances are documented; not every ranking complaint has been proven illegal in court.",
      ],
      whyItMatters: [
        "Hotel room prices on OTAs affect vacation and business trip costs.",
        "Independent hotels depend on OTAs for discovery—ranking power is gatekeeper power.",
        "Parity fights preview DMA battles over self-preferencing and transparency.",
        "Direct booking saves hotels commissions that could fund better amenities.",
      ],
      whatWasClaimed: [
        "Residual parity and best-price guarantees restrict hotel pricing freedom.",
        "Ranking algorithms retaliate against direct discounts.",
        "OTAs abuse dominance in hotel intermediation in several member states.",
        "Meta-search and sponsored placements obscure organic competition.",
      ],
      theOtherSide: [
        "OTAs say they invest in marketing that fills hotel beds.",
        "They argue ranking protects users from low-quality or misleading listings.",
        "They maintain parity reforms already increased hotel pricing flexibility.",
        "They warn further rules could reduce consumer comparison shopping.",
      ],
      whatItMeansForYou: [
        "Compare hotel direct sites with OTA prices—parity bans mean direct deals may exist legally in the EU.",
        "Loyalty programs may offer perks OTAs cannot match.",
        "Check cancellation terms separately; cheapest room is not always best value.",
        "Regulatory outcomes may shift ranking rules over time.",
      ],
      bottomLine:
        "EU hotel OTA parity is a long-running vertical restraint saga. Explicit bans succeeded, but regulators still test whether platforms circumvent them.",
    },
  },
  {
    id: "live-eu-music-streaming-fairness",
    name: "EU Music Streaming Fair Competition Inquiry",
    shortName: "EU Music Streaming",
    companies: ["spotify", "apple", "amazon"],
    jurisdictions: ["EU"],
    conduct: ["self_preferencing", "vertical_restraint", "discrimination", "abuse_of_dominance"],
    yearStart: 2023,
    status: "ongoing",
    summary:
      "The European Commission is investigating music streaming competition, including app store fees, Apple’s anti-steering rules, and platform ranking of rival streaming apps.",
    regulatorArgument:
      "Gatekeeper platforms and dominant app stores may distort streaming rivalry through commissions, default settings, and communication restrictions to artists and subscribers.",
    outcome:
      "Investigation under Article 102 and DMA overlaps continue; Apple Music streaming case precedent exists separately; no final streaming-specific decision closed the sector review.",
    laws: ["tfeu-102", "dma"],
    markets: ["music streaming", "app stores", "digital entertainment"],
    sources: [
      {
        label: "EC music streaming competition inquiry",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_23_4771",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Commission opened streaming sector inquiry", date: "April 2023" },
      { label: "Apple DMA music app obligations", date: "March 2024" },
      { label: "Spotify DMA complaint activities (reported)", date: "2024" },
      { label: "Ongoing Commission analysis", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2023",
        title: "Sector inquiry announced",
        detail:
          "The EU examined Apple, Amazon, Spotify, and others on app store rules, licensing, and recommendation algorithms.",
      },
      {
        date: "2023–2024",
        title: "Spotify public campaign",
        detail:
          "Spotify highlighted Apple Music’s lack of 30% commission and alleged anti-steering limits on iOS.",
      },
      {
        date: "2024",
        title: "DMA compliance for music apps",
        detail:
          "Apple introduced link-outs and alternative payment options in the EU for streaming apps under gatekeeper duties.",
      },
      {
        date: "Ongoing",
        title: "Commission assessment",
        detail:
          "Regulators evaluate whether changes restore competitive balance; abuse proceedings may continue separately from DMA.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Spotify says Apple Music competes on iPhones while Apple’s App Store rules tax and silence rival streamers. The EU opened a sector-wide review of music streaming fairness, overlapping with DMA duties and an earlier Apple Music antitrust case. Outcomes are not final.",
      theStory: [
        "Music streaming replaced downloads for most listeners. Spotify leads globally, but Apple Music, Amazon Music, and YouTube Music bundle with hardware and Prime memberships.",
        "On iPhones, Spotify must use Apple’s in-app payment system for subscriptions unless it directs users outside the app under new EU rules—subject to fees and friction.",
        "Apple Music pays no commission to the App Store because Apple owns both the platform and the rival service—a classic self-preferencing complaint.",
        "In April 2023 the Commission launched a sector inquiry, sending questionnaires on licensing, algorithms, and device defaults like Siri integration.",
        "A prior EU case fined Apple over anti-steering for music streaming, influencing DMA drafting. Implementation details in 2024 still draw Spotify criticism.",
        "Artists and labels watch separately: streaming royalties are contractual, but platform competition affects subscriber prices and feature investment.",
        "Regulators have not issued a final streaming-sector decision; describe Spotify–Apple conflict as active review, not settled illegality.",
      ],
      whyItMatters: [
        "Your subscription price and app experience depend on platform fees and defaults.",
        "Self-preferencing in apps affects any service competing with a platform owner's product.",
        "EU outcomes may spread to other regions via global app store policy changes.",
        "Independent artists benefit if streamers compete on features, not gatekeeper taxes.",
      ],
      whatWasClaimed: [
        "Apple abused dominance in music streaming app distribution on iOS.",
        "Commission structures and anti-steering raised rival costs and limited consumer information.",
        "Default Siri and HomePod integration favored Apple Music.",
        "Amazon may cross-subsidize Amazon Music via Prime bundling in anticompetitive ways.",
      ],
      theOtherSide: [
        "Apple says it built a secure ecosystem benefiting all developers.",
        "It argues Spotify benefits enormously from iOS without paying fairly for infrastructure.",
        "Amazon says Prime bundling improves consumer welfare.",
        "Platforms contend competition among streamers remains strong on multiple devices.",
      ],
      whatItMeansForYou: [
        "EU users may see external payment links in Spotify—compare total price including any platform fees.",
        "Try voice assistant music defaults; they may still favor platform-owned apps pending enforcement.",
        "Family plan pricing differs by store; shop before subscribing on a new phone.",
        "Legal fights continue; app rules may change with new Commission decisions.",
      ],
      bottomLine:
        "EU regulators are actively reviewing music streaming fairness on gatekeeper platforms. DMA steps began; comprehensive sector findings remain outstanding.",
    },
  },
  {
    id: "live-eu-cloud-gaming-access",
    name: "EU Cloud Gaming and App Store Access Review",
    shortName: "EU Cloud Gaming",
    companies: ["microsoft", "apple", "nvidia"],
    jurisdictions: ["EU"],
    conduct: ["refusal_to_deal", "market_access", "platform_suspension", "vertical_restraint"],
    yearStart: 2023,
    status: "ongoing",
    summary:
      "European regulators are examining whether mobile app store rules block cloud gaming services such as Xbox Cloud Gaming and GeForce NOW from reaching iOS users on fair terms.",
    regulatorArgument:
      "Cloud gaming streams full games without local installs; app store rejections or onerous rules may foreclose a competing distribution channel for games and subscriptions.",
    outcome:
      "DMA browser and app distribution duties apply; cloud gaming-specific abuse probes and developer disputes continue without final EU-wide remedy.",
    laws: ["tfeu-102", "dma"],
    markets: ["cloud gaming", "mobile app distribution", "game subscriptions"],
    sources: [
      {
        label: "EC digital markets and gaming access discussions",
        url: "https://digital-markets-act.ec.europa.eu/",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Microsoft xCloud App Store disputes publicized", date: "2020–2023" },
      { label: "EU DMA browser and alternative app store duties", date: "March 2024" },
      { label: "Cloud gaming developer complaints to Commission (reported)", date: "2024" },
      { label: "Ongoing compliance testing in EU", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2020–2022",
        title: "App Store blocks cloud gaming apps",
        detail:
          "Apple rejected all-in-one cloud gaming catalog apps, citing review difficulties for individual titles; Microsoft and others protested.",
      },
      {
        date: "2023",
        title: "Policy shifts and EU pressure",
        detail:
          "Apple allowed cloud gaming via individual game pages in some regions while EU DMA negotiations pressed broader distribution reform.",
      },
      {
        date: "2024",
        title: "DMA opens alternative paths",
        detail:
          "EU users gained browser-based and alternative store options intended to reduce gatekeeper control over game streaming apps.",
      },
      {
        date: "Ongoing",
        title: "Effectiveness reviews",
        detail:
          "Developers test whether cloud gaming works equivalently on iOS; Commission may pursue non-compliance if access remains degraded.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Cloud gaming lets you play console-quality games on a phone by streaming from remote servers. Apple historically kept cloud gaming apps off iPhones or forced cumbersome workarounds. Europe's DMA and antitrust reviews ask whether that blocked competition. Access is improving in the EU, but enforcement is not finished.",
      theStory: [
        "Cloud gaming services like Xbox Cloud Gaming and NVIDIA GeForce NOW run games on remote hardware, streaming video to your device like Netflix for games.",
        "Apple's App Store rules treated each streamed game as a separate app needing individual review— impractical for large catalogs.",
        "Microsoft argued Apple protected its mobile gaming revenue and Arcade subscription by blocking competing cloud libraries.",
        "Epic and others linked cloud gaming to broader app store antitrust fights; EU DMA later required gatekeepers to allow alternative app marketplaces and browser engines.",
        "Apple modified policies to permit cloud gaming with per-game listings and updated streaming rules in some markets.",
        "EU enforcers watch whether practical access matches policy text—developers report testing PWA and alternative store routes in 2024.",
        "No final Commission decision exclusively on cloud gaming has closed the book; ongoing reviews treat access as a live compliance question.",
      ],
      whyItMatters: [
        "Cloud gaming could reduce need for expensive consoles—if platforms allow it.",
        "Game subscription competition affects prices for Xbox Game Pass and rivals.",
        "Mobile gatekeeping shapes entire creative markets beyond games.",
        "DMA tests whether alternative stores truly work for heavy streaming apps.",
      ],
      whatWasClaimed: [
        "App Store rules refused access to cloud gaming catalog apps.",
        "Gatekeepers self-preference native downloads and own subscription services.",
        "Security rationales do not justify excluding streaming competitors.",
        "DMA compliance offerings may still impose fees blocking viable cloud gaming.",
      ],
      theOtherSide: [
        "Apple says it updated rules to support cloud gaming with appropriate review.",
        "It argues parental controls and age ratings require per-title accountability.",
        "Microsoft expanded Xbox streaming via browsers and Windows.",
        "Apple warns sideloading increases malware risk for games handling payments.",
      ],
      whatItMeansForYou: [
        "EU iPhone users can try cloud gaming through Safari or alternative stores as options expand—check service compatibility lists.",
        "Latency and data caps still matter; competition policy does not fix home broadband.",
        "Console buyers might delay purchases if cloud catalogs grow—watch platform support in your region.",
        "US access may differ until separate cases or policies change.",
      ],
      bottomLine:
        "Cloud gaming on iPhones is a front in EU gatekeeper enforcement. Access has opened partially under DMA, but regulators still evaluate whether competition is real.",
    },
  },
  {
    id: "live-doj-publisher-adtech",
    name: "DOJ Publisher Ad-Tech Antitrust Litigation",
    shortName: "Publisher Adtech (US)",
    companies: ["google"],
    jurisdictions: ["US"],
    conduct: ["self_preferencing", "abuse_of_dominance", "discrimination", "refusal_to_deal"],
    yearStart: 2023,
    status: "ongoing",
    summary:
      "The Justice Department and state publishers sued Google over alleged monopolization of tools publishers use to sell ad space, complementing separate advertiser-side ad-tech claims.",
    regulatorArgument:
      "Google's publisher ad server and exchange allegedly tied products together, manipulated auctions, and kept publishers from routing inventory to rival ad-tech stacks.",
    outcome:
      "Consolidated litigation proceeds toward trial; courts have not entered final judgment or structural breakup of publisher tools.",
    laws: ["sherman-1", "sherman-2", "ftc-5"],
    markets: ["publisher ad servers", "ad exchanges", "programmatic advertising"],
    sources: [
      {
        label: "DOJ publisher ad tech complaint (reported consolidation)",
        url: "https://www.justice.gov/opa/pr/justice-department-sues-google-monopolizing-digital-advertising-technologies",
      },
    ],
    readingMinutes: 12,
    keyDates: [
      { label: "Publisher state suits filed", date: "2023" },
      { label: "DOJ ad tech case expanded", date: "2024" },
      { label: "Trial scheduling and motions", date: "2024–2025" },
      { label: "Ongoing discovery on Header Bidding", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2023",
        title: "Publishers join antitrust push",
        detail:
          "State enforcers and publisher groups alleged Google’s DoubleClick legacy and Ad Manager rules locked news sites into its ad stack.",
      },
      {
        date: "2024",
        title: "DOJ unifies ad-tech theories",
        detail:
          "The Department’s civil suit covered advertiser and publisher tools, describing a vertical chain where Google allegedly rigged auctions on both sides.",
      },
      {
        date: "2024–2025",
        title: "Pretrial fights",
        detail:
          "Google moved to dismiss portions; judges narrowed some claims while allowing publisher harm theories to advance pending trial.",
      },
      {
        date: "Ongoing",
        title: "Trial preparation",
        detail:
          "No jury verdict yet. Remedies like divesting Google Ad Manager remain speculative until liability is proven.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "News sites sell ad space through automated auctions. Publishers say Google controls the server that runs those auctions and steers revenue to itself. The DOJ and states sued alongside a broader ad-tech case. Trials are ahead; courts have not ruled Google liable.",
      theStory: [
        "When you read a free article, programmatic advertising often picks the banner in milliseconds. Publishers use ad servers to manage slots; exchanges match buyers.",
        "Google acquired DoubleClick years ago, becoming the default ad server for many large publishers. Rivals offered 'header bidding' to let publishers query multiple exchanges simultaneously.",
        "Publishers allege Google designed products like Open Bidding to route auctions through its tools first, reducing revenue passed to newsrooms.",
        "Emails and experiments cited in complaints suggest Google worried header bidding would bypass its exchange; prosecutors call subsequent product changes exclusionary.",
        "Google responds that publishers choose its tools freely, that competition from Amazon and others grew, and that unified auctions improve latency and fraud protection.",
        "The DOJ consolidated publisher and advertiser theories, seeking possible divestitures of ad server and exchange assets if it wins.",
        "Litigation is active—describe publisher harm as alleged until a court rules. EU parallel probes exist separately under different procedures.",
      ],
      whyItMatters: [
        "Publisher revenue funds local journalism; ad-tech fees affect newsroom jobs.",
        "Auction design is invisible but sets prices for billions of daily impressions.",
        "Remedies could reshape the open web's business model if Google must divest tools.",
        "Smaller sites lack engineering teams to bypass dominant ad stacks.",
      ],
      whatWasClaimed: [
        "Google monopolizes publisher ad servers and related exchange tools.",
        "Open Bidding and Unified Pricing rules degraded rival header bidding.",
        "Tying ad server usage to Google exchange harms publishers and advertisers.",
        "Conduct increased Google's take rate at expense of content creators.",
      ],
      theOtherSide: [
        "Google says publishers migrate away if tools underperform.",
        "It argues programmatic markets remain dynamic with many SSPs and DSPs.",
        "It maintains product changes improved security and user experience.",
        "It contends breakups would harm small publishers relying on integrated tools.",
      ],
      whatItMeansForYou: [
        "Support journalism directly if you can—ad-tech outcomes affect news budgets indirectly.",
        "Privacy changes and cookie deprecation interact with ad-tech cases; outcomes are uncertain.",
        "Businesses buying ads should not assume rate changes until remedies exist.",
        "Follow trial dates for the DOJ ad-tech case—publisher claims are part of the bundle.",
      ],
      bottomLine:
        "Publisher-side ad-tech claims are live in US courts alongside DOJ's broader Google advertising suit. Allegations are serious; liability and remedies undecided.",
    },
  },
  {
    id: "live-eu-food-delivery-fees",
    name: "EU Food Delivery Platform Fee and Ranking Investigations",
    shortName: "EU Food Delivery",
    companies: ["deliveroo", "uber", "just-eat"],
    jurisdictions: ["EU"],
    conduct: ["abuse_of_dominance", "discrimination", "vertical_restraint", "self_preferencing"],
    yearStart: 2022,
    status: "ongoing",
    summary:
      "National EU authorities and the Commission coordinate scrutiny of food delivery platforms' commission caps, worker classification aside, focusing on restaurant parity, ranking, and dual-role marketplace conduct.",
    regulatorArgument:
      "Dominant delivery apps may impose excessive commissions, tie delivery to advertising products, and self-preference owned dark kitchens over independent restaurants.",
    outcome:
      "Spanish and other national measures capped fees temporarily; abuse investigations and DMA-style transparency debates continue without EU-wide final penalties.",
    laws: ["tfeu-102", "tfeu-101"],
    markets: ["food delivery platforms", "restaurant marketplaces", "quick commerce"],
    sources: [
      {
        label: "EU platform workers and delivery policy context",
        url: "https://commission.europa.eu/strategy-and-policy/policies/economic-and-monetary-affairs/digital-economy_en",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Spanish delivery fee caps during COVID recovery", date: "2021–2023" },
      { label: "Italian AGCM Deliveroo investigation (reported)", date: "2022–2023" },
      { label: "Restaurant association EU complaints", date: "2023–2024" },
      { label: "Ongoing national probes", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2020–2022",
        title: "Restaurants depend on delivery apps",
        detail:
          "Lockdowns pushed eateries onto Deliveroo, Uber Eats, and Just Eat; commissions up to 30% sparked political backlash.",
      },
      {
        date: "2022–2023",
        title: "National interventions multiply",
        detail:
          "Spain capped fees; France and others debated transparency on tips and rankings.",
      },
      {
        date: "2023–2024",
        title: "Antitrust theories develop",
        detail:
          "Authorities examined exclusivity clauses, preferential placement for ghost kitchens, and bundled ads packages.",
      },
      {
        date: "Ongoing",
        title: "Sector monitoring",
        detail:
          "No EU-wide fine closed the sector; restaurants push for permanent caps and ranking transparency.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Restaurants pay delivery apps hefty commissions on every order. European regulators are checking whether platforms abuse power by pushing ads, hiding ranking rules, or favoring their own ghost kitchens. National fee caps appeared; EU antitrust cases continue without a final continent-wide verdict.",
      theStory: [
        "Food delivery apps connect restaurants, couriers, and hungry customers. During COVID, many eateries survived only through app orders.",
        "Commissions often ran 20–30%, plus fees for appearing higher in search. Restaurants said they barely broke even on app sales.",
        "Spain capped delivery fees in crisis periods; other countries considered similar rules while antitrust agencies opened abuse probes.",
        "Italian and other authorities investigated exclusivity—clauses requiring restaurants not list cheaper on rival apps—and alleged opacity in ranking.",
        "Platforms expanded 'dark kitchens' they partly control, worrying regulators about self-preferencing similar to Amazon retail conflicts.",
        "Uber Eats, Deliveroo, and Just Eat argue commissions fund marketing, courier networks, and fraud prevention; caps reduce service quality.",
        "Investigations remain open—restaurant anger is well documented, but not every fee level has been declared illegal abuse of dominance.",
      ],
      whyItMatters: [
        "Menu prices rise when restaurants pass commission costs to you.",
        "Local eateries may disappear if apps are their only channel at unsustainable fees.",
        "Ranking transparency affects which restaurants you even see.",
        "Delivery platform power parallels broader gig and marketplace debates.",
      ],
      whatWasClaimed: [
        "Platforms dominate local food delivery intermediation in many EU cities.",
        "Excessive or discriminatory commissions abuse dominance.",
        "Bundled ads and premium placement resemble tied selling harming independents.",
        "Self-preferencing of owned kitchens distorts restaurant competition.",
      ],
      theOtherSide: [
        "Platforms say they provide demand restaurants cannot reach alone.",
        "They argue couriers and insurance costs justify commissions.",
        "They maintain restaurants can use multiple apps and direct ordering.",
        "They warn price caps reduce delivery availability in suburbs.",
      ],
      whatItMeansForYou: [
        "Ordering direct from a restaurant website may save them commission—many offer pickup discounts.",
        "Compare total price with fees and minimums across apps.",
        "Tips policies vary; read whether tips reach couriers in your city.",
        "Regulatory changes may alter fee structures gradually—not overnight.",
      ],
      bottomLine:
        "EU food delivery platforms face national caps and antitrust scrutiny over fees and ranking. Cases are ongoing; restaurants still negotiate app dependence daily.",
    },
  },
];
