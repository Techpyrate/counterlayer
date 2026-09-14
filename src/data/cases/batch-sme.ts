import type { CompetitionCase } from "../types";

/**
 * Small businesses, local firms, startups, and growth-stage companies
 * that faced competition, cartel, market-rule, or consumer-protection enforcement.
 * CounterLayer’s library was skewed toward Big Tech / mega-mergers; this batch
 * shows that size is not a shield.
 */
export const batchSme: CompetitionCase[] = [
  {
    id: "cma-berkshire-estate-agents",
    name: "CMA Berkshire estate agents commission cartel",
    shortName: "Berkshire estate agents cartel",
    companies: [
      "romans",
      "prospect-estate-agency",
      "richard-worth",
      "michael-hardy",
    ],
    jurisdictions: ["Other"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 2008,
    yearEnd: 2019,
    status: "fined",
    summary:
      "The UK CMA found that four relatively small Berkshire estate agents fixed minimum commission rates for home sales for nearly seven years, denying local sellers the chance to shop for lower fees. Three firms were fined over £600,000; a fourth escaped fines under leniency for reporting the cartel.",
    regulatorArgument:
      "Local rivals met secretly, shared sensitive fee information, and maintained a minimum-commission floor—classic hard-core cartel conduct that competition law applies to regardless of firm size.",
    outcome:
      "December 2019 infringement decision; three agents fined £605,519 total; one leniency applicant received immunity; CMA published the case as a small-business compliance lesson.",
    remedies:
      "Fines; public case study stressing that ‘we are too small for competition law’ is not a defence.",
    laws: ["uk-ca98-ch1"],
    markets: [
      "residential estate agency",
      "local professional services",
      "small business cartels",
    ],
    sources: [
      {
        label: "CMA case study — Berkshire estate agents",
        url: "https://www.gov.uk/government/case-studies/estate-agents-fined-over-600000-for-illegal-price-fixing",
      },
      {
        label: "CMA case page — Berkshire residential estate agency",
        url: "https://www.gov.uk/cma-cases/provision-of-residential-estate-agency-services",
      },
      {
        label: "CMA news — fines over £600,000",
        url: "https://www.gov.uk/government/news/estate-agents-fined-over-half-a-million-pounds-for-price-fixing",
      },
    ],
    readingMinutes: 7,
    keyDates: [
      { label: "Cartel period (approx.)", date: "2008–2015" },
      { label: "CMA infringement decision", date: "December 2019" },
      { label: "Public case study", date: "February 2020" },
    ],
    timeline: [
      {
        date: "2008–2015",
        title: "Minimum commission floor",
        detail:
          "Agents in Wokingham, Bracknell and nearby towns allegedly agreed to keep residential sale commissions from falling below agreed floors, monitored each other, and for a time even discussed penalty payments for undercutting.",
      },
      {
        date: "2015",
        title: "Arrangement breaks down",
        detail:
          "The CMA found participation continued even after some agents worried privately that the conduct looked like a cartel.",
      },
      {
        date: "2019",
        title: "Fines and leniency",
        detail:
          "Three firms paid fines; the whistleblower received immunity under the CMA’s leniency programme.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Four local UK estate agents—not Big Tech, not banks—agreed to keep their sales commissions high. The competition watchdog fined them hundreds of thousands of pounds and used the case to warn every small business: size does not exempt you from cartel law.",
      theStory: [
        "Selling a house in Berkshire meant hiring a high-street estate agent. Competition among those agents should have pushed commission rates down. Instead, according to the CMA, four relatively small local firms spent years aligning on a minimum fee level.",
        "They met in secret, swapped sensitive commercial information, and monitored whether anyone undercut the floor. One director emailed that average fees had fallen to around 1.8% and that rivals were finally ready to ‘get this sorted.’ Another incorrectly told a peer the arrangement was ‘obviously not a cartel’ because cheaper agents still existed elsewhere.",
        "Competition law does not require a nationwide monopoly. Two or more rivals agreeing on price or fee floors in a local market is enough. Home sellers in those towns lost the chance to negotiate lower commissions while the cartel held.",
        "When the CMA finished its investigation in 2019, three agents paid over £600,000 in fines. The fourth escaped financial penalties by coming forward first under leniency—illustrating how self-reporting can save a small firm from ruin even after illegal talks begin.",
      ],
      whyItMatters: [
        "Most antitrust headlines feature tech giants; most cartel prosecutions involve ordinary local trades.",
        "Trade-association chatter and ‘we all charge the same’ peer pressure are classic SME traps.",
        "Leniency exists so the first firm to confess can avoid fines that would otherwise cripple a small balance sheet.",
      ],
      whatWasClaimed: [
        "Agreement to fix and maintain minimum commission rates for residential sales.",
        "Secret meetings and information exchanges lasting nearly seven years.",
        "Monitoring and informal enforcement of the fee floor.",
      ],
      theOtherSide: [
        "Some participants later argued they did not always stick to the floor.",
        "The CMA still found enough concerted practice to impose fines.",
        "Leniency applicant cooperated fully and received immunity.",
      ],
      whatItMeansForYou: [
        "Never discuss intended fees, prices, or ‘minimums’ with competitors—even casually.",
        "If you already joined such a talk, seek counsel and consider a leniency approach quickly.",
        "Local market power still counts; ‘plenty of agents exist elsewhere’ is not a defence.",
      ],
      bottomLine:
        "A handful of Berkshire estate agents proved that competition law reaches Main Street—and that whistleblowing can be the difference between a fine and survival.",
    },
  },
  {
    id: "cma-somerset-estate-agents",
    name: "CMA Somerset (Burnham-on-Sea) estate agents cartel",
    shortName: "Somerset estate agents cartel",
    companies: [
      "somerset-estate-agents",
      "greenslade-taylor-hunt",
      "abbott-frost",
      "gary-berryman-estate-agents",
      "west-coast-property",
    ],
    jurisdictions: ["Other"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 2014,
    yearEnd: 2017,
    status: "fined",
    summary:
      "Six Burnham-on-Sea estate agents agreed to a 1.5% minimum commission for residential sales. Five firms were fined over £370,000; one received immunity for reporting the cartel. The CMA stressed that even short-lived local cartels harm home sellers.",
    regulatorArgument:
      "Agents met to ‘have a chat about fees,’ then fixed a 1.5% floor aimed at driving profits up and denying sellers competitive offers.",
    outcome:
      "2017 settlement and infringement finding; fines totaling about £372,000 for settling parties; leniency for the first confessor.",
    remedies: "Fines; CMA sector compliance messaging to estate agents.",
    laws: ["uk-ca98-ch1"],
    markets: [
      "residential estate agency",
      "local professional services",
      "small business cartels",
    ],
    sources: [
      {
        label: "CMA news — Somerset estate agents admit price-fixing",
        url: "https://www.gov.uk/government/news/somerset-estate-agents-admit-to-price-fixing",
      },
      {
        label: "CMA case study — Somerset cartel",
        url: "https://www.gov.uk/government/case-studies/estate-agents-cartel-case-study",
      },
    ],
    readingMinutes: 6,
    keyDates: [
      { label: "Cartel formed", date: "February 2014" },
      { label: "Arrangement ended", date: "early 2015" },
      { label: "Fines announced", date: "September 2017" },
    ],
    timeline: [
      {
        date: "Feb 2014",
        title: "Fee chat becomes a floor",
        detail:
          "Local agents agreed a 1.5% minimum commission for traditional high-street residential sales in Burnham-on-Sea.",
      },
      {
        date: "2014–2015",
        title: "Sellers lose bargaining power",
        detail:
          "With rivals aligned, homeowners could not shop among those agents for a lower rate during the infringement period.",
      },
      {
        date: "2017",
        title: "Settlements and fines",
        detail:
          "Four settling firms plus related parents paid six-figure combined penalties; the whistleblower was not fined.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "In a small English seaside town, estate agents agreed not to undercut a 1.5% commission. Within about a year the arrangement collapsed—but the CMA still fined them hundreds of thousands. Local collusion is not a freebie.",
      theStory: [
        "Burnham-on-Sea is not London. Its property market depends on a short list of high-street agents. When those agents stop competing on fees, every seller in town pays more.",
        "According to the CMA, the agents sat down in early 2014 for what one described as a chat about fees, then fixed a 1.5% floor to ‘drive the fee level up.’ One participant even weighed the risk of a fine against the profit and decided to proceed.",
        "The cartel lasted a little over a year—short compared with industrial cartels, but long enough to harm local homeowners. Settling firms paid over £370,000. The first firm to confess escaped the fine under leniency.",
        "Together with the Berkshire and Three Counties cases, Somerset cemented a pattern: UK competition enforcers treat local service cartels as a priority, not a distraction from Big Tech.",
      ],
      whyItMatters: [
        "Short-lived cartels still attract serious fines.",
        "‘Everyone in town charges the same’ can be evidence, not comfort.",
        "Small markets concentrate harm—few rivals means collusion hits hard.",
      ],
      whatWasClaimed: [
        "Agreement to fix a 1.5% minimum commission.",
        "Concerted practice among multiple Burnham agents.",
        "Intent to raise profits by limiting fee competition.",
      ],
      theOtherSide: [
        "Firms settled, admitting the infringement for discounted penalties.",
        "Leniency applicant cooperated and avoided a fine.",
      ],
      whatItMeansForYou: [
        "Walk out of any competitor meeting where prices or fees are discussed.",
        "Document that you objected; silence can look like assent.",
        "Report cartels early—leniency is designed for exactly this situation.",
      ],
      bottomLine:
        "A seaside-town fee floor became a six-figure CMA case—proof that local SMEs face real cartel risk.",
    },
  },
  {
    id: "cma-three-counties-estate-agents",
    name: "CMA Three Counties estate agents advertising restrictions",
    shortName: "Three Counties agents fees ads",
    companies: [
      "three-counties-estate-agents-association",
      "castles-property",
      "waterfords-estate-agents",
      "hamptons",
      "trinity-mirror-southern",
    ],
    jurisdictions: ["Other"],
    conduct: ["cartel_coordination", "resale_restriction", "market_access"],
    yearStart: 2005,
    yearEnd: 2015,
    status: "fined",
    summary:
      "The CMA’s first Chapter I infringement decision fined a Hampshire estate-agent trade association, member agents, and a local newspaper publisher over £735,000 for rules that blocked advertising of agents’ fees and discounts in the local paper—restricting how small rivals could compete on price transparency.",
    regulatorArgument:
      "Association rules and related deals with the local paper prevented fee advertising, making it harder for consumers to compare prices and for discounting agents to win business.",
    outcome:
      "May 2015 infringement decision; combined penalties over £735,000 after settlement discounts; association itself fined a nominal amount reflecting tiny turnover.",
    remedies: "Fines; compliance commitments from some parties.",
    laws: ["uk-ca98-ch1"],
    markets: [
      "residential estate agency",
      "local advertising",
      "trade associations",
      "small business cartels",
    ],
    sources: [
      {
        label: "CMA case study — Three Counties advertising restrictions",
        url: "https://www.gov.uk/government/case-studies/advertising-of-estate-agents-fees-competition-law-lessons",
      },
      {
        label: "CMA property sales and lettings case page",
        url: "https://www.gov.uk/cma-cases/investigation-into-property-sales-and-lettings-and-their-advertising",
      },
    ],
    readingMinutes: 7,
    keyDates: [
      { label: "Conduct period", date: "2005–2014" },
      { label: "Settlements announced", date: "March 2015" },
      { label: "Infringement decision", date: "May 2015" },
    ],
    timeline: [
      {
        date: "2005–2014",
        title: "No fee ads in the local paper",
        detail:
          "Association rules barred members from advertising fees or discounts in the Surrey & Hants Star Courier; arrangements with the publisher extended limits more broadly.",
      },
      {
        date: "2013–2014",
        title: "Investigation",
        detail:
          "After a complaint, the OFT/CMA probed the association, members, and the newspaper publisher.",
      },
      {
        date: "2015",
        title: "First CMA Chapter I decision",
        detail:
          "Parties settled and paid over £735,000 in penalties—signaling that trade-association rules are fair game.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "A local agents’ club and a newspaper agreed—formally and informally—that estate agents should not advertise their fees. That kept price competition quiet. The CMA fined them as its first Chapter I case, including a tiny association that barely turned over any money.",
      theStory: [
        "Trade associations help with training and standards. They become dangerous when they police how members advertise prices. Three Counties Estate Agents Association barred members from putting fee or discount ads in the main local paper.",
        "Two members went further, arranging with the publisher so that non-members could not advertise fees either. Consumers scanning the paper for deals saw less price competition; discounting agents lost a cheap way to win listings.",
        "The CMA treated this as an anti-competitive agreement. Even the association—nearly insolvent and with almost no turnover—received a symbolic fine. Member agents and the publisher paid the bulk of the £735,000+ penalties.",
        "The lesson for startups and SMEs joining industry groups: membership rules that restrict advertising, pricing, or who you can deal with can be illegal even if framed as ‘professional standards.’",
      ],
      whyItMatters: [
        "Associations are frequent SME compliance failure points.",
        "Blocking price advertising harms comparison shopping.",
        "Tiny organisations can still be fined and named.",
      ],
      whatWasClaimed: [
        "Association rules prohibiting fee/discount advertising.",
        "Related agreements with a local newspaper publisher.",
        "Restriction of competition in Hampshire estate agency markets.",
      ],
      theOtherSide: [
        "Parties admitted the infringement and settled for discounts.",
        "Some committed to compliance programmes for further mitigation.",
      ],
      whatItMeansForYou: [
        "Review any trade-association rulebook before joining.",
        "Refuse rules that limit how you advertise prices or discounts.",
        "Publishers and platforms can be liable if they help enforce cartel-like advertising bans.",
      ],
      bottomLine:
        "A local agents’ club learned that gagging fee ads is a competition offence—even when the club itself is tiny.",
    },
  },
  {
    id: "us-michigan-asphalt-bidrigging",
    name: "U.S. v. Asphalt Specialists / Michigan asphalt paving bid-rigging",
    shortName: "Michigan asphalt bid-rigging",
    companies: ["asphalt-specialists", "als-asphalt", "f-allied-construction"],
    jurisdictions: ["US"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 2013,
    yearEnd: 2025,
    status: "fined",
    summary:
      "DOJ prosecuted Michigan asphalt paving firms—including Asphalt Specialists LLC (ASI)—for years of cover bidding that faked competition on paving contracts. ASI was sentenced to a $6.5 million criminal fine; executives faced prison. The case shows local contractors face Sherman Act felonies, not just civil risk.",
    regulatorArgument:
      "Rivals coordinated who would win paving jobs, then submitted intentionally non-competitive ‘cover’ bids so customers thought they saw real competition.",
    outcome:
      "Multiple guilty pleas; ASI fined $6.5 million (2024); executives sentenced including prison terms and personal fines; investigation yielded over $8.2 million in corporate criminal fines to date.",
    remedies:
      "Criminal fines, restitution exposure, incarceration for individuals, ongoing PCSF scrutiny of public procurement.",
    laws: ["sherman-1"],
    markets: [
      "asphalt paving",
      "local construction",
      "government contracting",
      "small business cartels",
    ],
    sources: [
      {
        label: "DOJ — asphalt executive sentenced for bid-rigging",
        url: "https://www.justice.gov/opa/pr/former-president-asphalt-paving-company-sentenced-bid-rigging",
      },
      {
        label: "DOJ case — U.S. v. Asphalt Specialists LLC",
        url: "https://www.justice.gov/atr/case/us-v-asphalt-specialists-llc",
      },
      {
        label: "DOJ case — U.S. v. F. Allied Construction",
        url: "https://www.justice.gov/atr/case/us-v-f-allied-construction-company-inc-et-al",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Conspiracy period (ASI strand)", date: "2013–2018" },
      { label: "ASI plea", date: "January 2024" },
      { label: "ASI $6.5M fine", date: "August 2024" },
      { label: "Executive prison sentence", date: "May 2025" },
    ],
    timeline: [
      {
        date: "2013–2018",
        title: "Cover bidding on paving jobs",
        detail:
          "Competitors allegedly decided winners in advance and supplied losing bids priced to lose, creating a false auction.",
      },
      {
        date: "2023–2024",
        title: "Pleas across companies",
        detail:
          "ASI, Al’s Asphalt, F. Allied Construction and multiple individuals pleaded guilty in related Michigan paving probes.",
      },
      {
        date: "2024–2025",
        title: "Fines and prison",
        detail:
          "Corporate fines topped millions; former ASI president received prison time and a large personal fine.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Michigan paving companies—not oil majors—rigged bids so the ‘losing’ contractor submitted a fake high quote. Customers thought they ran a competitive tender. Federal prosecutors treated it as a felony: multi-million-dollar fines and jail for executives.",
      theStory: [
        "Asphalt paving for roads, lots, and public sites is often bid locally. When only a few contractors can do the work, collusion is both tempting and devastating for taxpayers.",
        "According to DOJ, ASI and rivals talked through who wanted which job, then had the designated loser submit a deliberately non-competitive price. On paper it looked like rivalry; in reality the winner was pre-selected.",
        "That is textbook bid-rigging under Sherman Act §1—prosecuted criminally. ASI’s $6.5 million fine and executive prison sentences show that ‘we’re just a local paving shop’ does not shrink the statute.",
        "The Procurement Collusion Strike Force has made infrastructure cartels a priority. Small and mid-size contractors on public jobs sit squarely in the crosshairs.",
      ],
      whyItMatters: [
        "Public contracts inflate when cover bidding replaces real competition.",
        "Owners and estimators can go to prison—not only the company.",
        "Local SMEs are frequent defendants in DOJ cartel dockets.",
      ],
      whatWasClaimed: [
        "Conspiracy to rig asphalt paving bids in Michigan.",
        "Submission of intentionally non-competitive complementary bids.",
        "Multi-year coordination among named paving firms.",
      ],
      theOtherSide: [
        "Defendants pleaded guilty rather than contest liability at trial.",
        "Sentencing followed U.S. Sentencing Guidelines and cooperation factors.",
      ],
      whatItMeansForYou: [
        "Never swap intended bid prices with a competitor.",
        "Train estimators that ‘courtesy bids’ for rivals are illegal.",
        "If approached to cover-bid, refuse in writing and consider reporting.",
      ],
      bottomLine:
        "Local asphalt firms learned bid-rigging is a federal crime with prison time—size offers no exemption.",
    },
  },
  {
    id: "us-ct-insulation-bidrigging",
    name: "U.S. v. Langan Insulation / Connecticut insulation contractors cartel",
    shortName: "CT insulation bid-rigging",
    companies: [
      "langan-insulation",
      "axion-specialty-contracting",
      "bc-flynn-contracting",
    ],
    jurisdictions: ["US"],
    conduct: ["cartel_coordination", "price_fix", "market_access"],
    yearStart: 2011,
    yearEnd: 2022,
    status: "fined",
    summary:
      "Connecticut insulation contractors—including Langan Insulation LLC and Axion Specialty Contracting LLC—pleaded guilty to rigging bids and allocating customers on pipe-and-duct insulation jobs at hospitals, universities, and other sites. Companies paid criminal fines and restitution; an owner received prison time.",
    regulatorArgument:
      "Small specialty contractors shared bids, allocated customers, and inflated prices ~5%, cheating public and private project owners who believed they ran competitive procurements.",
    outcome:
      "Multiple guilty pleas (2020–2022); Langan Insulation fined $150,000 plus restitution; Axion fined about $1 million plus restitution; owner Thomas Langan sentenced to prison.",
    remedies: "Criminal fines, restitution, incarceration, PCSF deterrence messaging.",
    laws: ["sherman-1"],
    markets: [
      "mechanical insulation contracting",
      "local construction",
      "hospital and university construction",
      "small business cartels",
    ],
    sources: [
      {
        label: "DOJ — Langan Insulation sentenced",
        url: "https://www.justice.gov/archives/opa/pr/insulation-contracting-firm-and-co-owner-sentenced-rigging-bids-and-fraud",
      },
      {
        label: "DOJ case — U.S. v. Langan Insulation, LLC",
        url: "https://www.justice.gov/atr/case/us-v-langan-insulation-llc",
      },
      {
        label: "DOJ — Axion Specialty sentenced",
        url: "https://www.justice.gov/archives/opa/pr/insulation-contracting-firm-sentenced-rigging-bids",
      },
    ],
    readingMinutes: 7,
    keyDates: [
      { label: "Conspiracy period", date: "2011–2018" },
      { label: "Langan plea", date: "February 2020" },
      { label: "Langan sentencing", date: "September 2022" },
      { label: "Axion sentencing", date: "November 2022" },
    ],
    timeline: [
      {
        date: "2011–2018",
        title: "Shared bids and customer allocation",
        detail:
          "Insulation firms allegedly swapped proposed prices and decided who would win hospital, university, and other mechanical insulation packages.",
      },
      {
        date: "2020",
        title: "Guilty pleas begin",
        detail:
          "Langan Insulation and its co-owner pleaded guilty to Sherman Act bid-rigging and wire-fraud conspiracy counts.",
      },
      {
        date: "2022",
        title: "Sentences",
        detail:
          "Prison for an owner; six- and seven-figure corporate fines and restitution for participating firms.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "A few Connecticut insulation shops carved up hospital and campus jobs, shared bids, and padded prices. Federal prosecutors put an owner in prison and fined the companies. Specialty subcontractors are not ‘too small to prosecute.’",
      theStory: [
        "Mechanical insulation is a niche trade. On large construction projects, general contractors solicit multiple insulation quotes. Collusion among those specialists quietly raises the whole project cost.",
        "DOJ said Langan, Axion, BC Flynn and others exchanged bids, allocated customers, and often inflated starting prices by roughly 5%. Universities, hospitals, and other owners paid as if competition were real.",
        "Pleas and sentences followed: corporate fines, nearly half a million dollars in restitution in the Langan strand alone, and prison for a co-owner. Axion’s fine topped $1 million.",
        "For founders and family firms in trades, the case is a compliance wake-up: group chats about ‘who wants this job’ can become criminal evidence.",
      ],
      whyItMatters: [
        "Niche markets with few bidders are cartel-prone.",
        "Public institutions (hospitals, universities) are frequent victims.",
        "Individuals—not just LLCs—face incarceration.",
      ],
      whatWasClaimed: [
        "Bid-rigging, customer allocation, and price-fixing on insulation contracts.",
        "Wire-fraud conspiracy overlay in some charging documents.",
        "Multi-year coordination among named Connecticut firms.",
      ],
      theOtherSide: [
        "Defendants pleaded guilty; sentences reflected guidelines and restitution.",
        "Some plea papers noted limited employee involvement beyond a key executive.",
      ],
      whatItMeansForYou: [
        "Separate competitor contact from bid preparation completely.",
        "Use written independent cost build-ups you can defend.",
        "Report solicitation to join a cover-bid scheme.",
      ],
      bottomLine:
        "Connecticut insulation SMEs proved specialty trades face full criminal antitrust exposure.",
    },
  },
  {
    id: "us-sioux-erosion-control",
    name: "U.S. v. Sioux Erosion Control — Oklahoma infrastructure cartel",
    shortName: "Sioux Erosion Control cartel",
    companies: ["sioux-erosion-control"],
    jurisdictions: ["US"],
    conduct: ["cartel_coordination", "price_fix", "market_access"],
    yearStart: 2017,
    yearEnd: 2026,
    status: "ongoing",
    summary:
      "A federal jury convicted Oklahoma erosion-control firm Sioux Erosion Control Inc., a vice president, and an employee for a five-year conspiracy to fix prices, allocate territories, and rig bids on over $100 million in publicly funded highway-related contracts. Sentencing remained pending after the August 2026 verdict.",
    regulatorArgument:
      "Local erosion-control suppliers—including sod providers—raised and maintained prices, divided Oklahoma geographies, and submitted losing or no-bids so designated winners could overcharge public projects.",
    outcome:
      "August 20, 2026 jury convictions of the company and two individuals; four other individuals previously pleaded guilty; sentencing and final corporate fine TBD (statutory max up to $100 million for the corporation).",
    laws: ["sherman-1"],
    markets: [
      "erosion control",
      "highway construction supplies",
      "government contracting",
      "small business cartels",
    ],
    sources: [
      {
        label: "DOJ — Sioux Erosion Control jury conviction",
        url: "https://www.justice.gov/opa/pr/jury-convicts-erosion-control-company-executive-and-employee-roles-100m-price-fixing",
      },
      {
        label: "DOJ indictment announcement (archived)",
        url: "https://www.justice.gov/archives/opa/pr/company-executive-and-employee-indicted-100m-price-fixing-conspiracy-involving-publicly",
      },
    ],
    readingMinutes: 7,
    keyDates: [
      { label: "Conspiracy period", date: "2017–2023" },
      { label: "Indictment unsealed", date: "2024" },
      { label: "Jury conviction", date: "August 20, 2026" },
    ],
    timeline: [
      {
        date: "2017–2023",
        title: "Price, territory, and bid coordination",
        detail:
          "Prosecutors said conspirators fixed sod and erosion-control prices, carved up Oklahoma regions, and used cover bids or refusals to bid.",
      },
      {
        date: "2024–2025",
        title: "Charges and guilty pleas",
        detail:
          "Six individuals and one company were charged; four individuals pleaded guilty before trial.",
      },
      {
        date: "Aug 2026",
        title: "Trial conviction",
        detail:
          "Jury convicted Sioux, VP BG Dale Biscoe, and employee Randall David Shelton; sentencing to follow.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "An Oklahoma erosion-control company—not a Fortune 100 giant—was convicted of fixing prices on highway-related work worth over $100 million. Public projects paid more for sod and runoff control because rivals stopped competing.",
      theStory: [
        "Highway jobs need erosion control: sod, mats, and related services that keep soil on site. In Oklahoma, a cluster of suppliers allegedly decided that competition was optional.",
        "According to trial evidence, Sioux and others raised prices, divided the state, and either bid high on purpose or stayed out so a chosen firm could win. Taxpayers funding transportation projects absorbed the premium.",
        "Four people pleaded guilty. Sioux and two individuals went to trial and lost in August 2026. Corporate fines could be enormous relative to a mid-size contractor’s size.",
        "The case is a modern Procurement Collusion Strike Force showcase: regional SMEs on public infrastructure remain a core criminal antitrust target.",
      ],
      whyItMatters: [
        "Infrastructure cartels hit public budgets directly.",
        "Jury convictions show DOJ will try cases, not only take pleas.",
        "Territory allocation is as illegal as naked price-fixing.",
      ],
      whatWasClaimed: [
        "Price-fixing on erosion-control products and services.",
        "Geographic allocation of contracts across Oklahoma.",
        "Bid-rigging via high or non-bids.",
      ],
      theOtherSide: [
        "Defendants contested the case at trial and were convicted.",
        "Sentencing arguments and any appeals may follow.",
      ],
      whatItMeansForYou: [
        "Public-bid compliance programmes matter even for 20-person firms.",
        "Do not ‘stay out of’ a region because a rival asked you to.",
        "Preserve bid files; cover-bid patterns leave a paper trail.",
      ],
      bottomLine:
        "Sioux Erosion Control’s conviction is a 2026 reminder that regional contractors face prison and corporate felony exposure for local cartels.",
    },
  },
  {
    id: "us-amazon-sellers-dvd-pricefix",
    name: "U.S. v. Amazon Marketplace DVD/Blu-ray seller price-fixing",
    shortName: "Amazon sellers DVD cartel",
    companies: ["amazon-marketplace-dvd-sellers"],
    jurisdictions: ["US"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 2017,
    yearEnd: 2022,
    status: "settled",
    summary:
      "DOJ charged independent Amazon Marketplace sellers—not Amazon itself—with conspiring to fix prices of DVDs and Blu-ray discs sold through their storefronts. Multiple individuals pleaded guilty, showing that online micro-sellers face the same Sherman Act rules as brick-and-mortar rivals.",
    regulatorArgument:
      "Third-party sellers agreed orally and electronically to raise and maintain disc prices on Amazon Marketplace, denying consumers competitive online pricing.",
    outcome:
      "Guilty pleas beginning with David Camp (July 2021), followed by Morris Sutton, Emmanuel Hourizadeh, Raymond Nouvahian and related charging; sentences per individual dockets.",
    remedies: "Criminal convictions, fines, and incarceration exposure for individuals.",
    laws: ["sherman-1"],
    markets: [
      "online marketplaces",
      "DVD and Blu-ray retail",
      "third-party e-commerce sellers",
      "small business cartels",
    ],
    sources: [
      {
        label: "DOJ — Amazon Marketplace seller pleads guilty",
        url: "https://www.justice.gov/archives/opa/pr/amazon-marketplace-seller-pleads-guilty-price-fixing-dvds-and-blu-ray-discs",
      },
      {
        label: "DOJ case — U.S. v. Morris Sutton",
        url: "https://www.justice.gov/atr/case/us-v-morris-sutton",
      },
      {
        label: "DOJ case — U.S. v. Hourizadeh & Nouvahian",
        url: "https://www.justice.gov/atr/case/us-v-emmanuel-hourizadeh-and-raymond-nouvahian",
      },
    ],
    readingMinutes: 6,
    keyDates: [
      { label: "Conspiracy period", date: "2017–2019" },
      { label: "First guilty plea (Camp)", date: "July 23, 2021" },
      { label: "Additional pleas", date: "November 2021" },
    ],
    timeline: [
      {
        date: "2017–2019",
        title: "Seller coordination online",
        detail:
          "Marketplace sellers allegedly messaged and spoke to align DVD/Blu-ray pricing across storefronts.",
      },
      {
        date: "2021",
        title: "Criminal pleas",
        detail:
          "DOJ announced the first Amazon Marketplace seller plea, then additional individuals in the same conspiracy.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Independent people running Amazon storefronts agreed not to undercut each other on DVDs. That is still a criminal cartel. Platform size does not launder seller-to-seller price deals.",
      theStory: [
        "Amazon Marketplace lets tiny sellers reach national customers. It also makes it easy to message other sellers. When those messages turn into ‘let’s keep prices up,’ Sherman Act §1 applies exactly as it would in a strip-mall meeting.",
        "David Camp of Tennessee pleaded guilty in 2021 to fixing disc prices with co-conspirators from at least 2018 into 2019. Other sellers followed with pleas covering a conspiracy dating to 2017.",
        "Amazon was the venue, not the defendant in these counts. The lesson for ecommerce startups and side-hustle sellers: collusion with competitors on the platform is a felony risk, full stop.",
        "As online retail grows, DOJ has signaled it will police digital storefront cartels the way it polices local trade associations.",
      ],
      whyItMatters: [
        "Side-hustle and micro-SaaS-adjacent sellers assume antitrust is for giants.",
        "Chat apps and seller forums create easy collusion evidence.",
        "Consumers shopping ‘competitive’ marketplace listings may still be overcharged.",
      ],
      whatWasClaimed: [
        "Agreement to fix and maintain DVD/Blu-ray prices on Amazon Marketplace.",
        "Oral and electronic communications among sellers.",
        "Sales affecting interstate commerce nationwide.",
      ],
      theOtherSide: [
        "Defendants pleaded guilty; individual sentences varied by docket.",
      ],
      whatItMeansForYou: [
        "Never message competing sellers about aligning prices or MAP ‘enforcement’ among yourselves.",
        "Independent pricing software is fine; agreeing with a rival on the output is not.",
        "Treat seller-group chats like a recorded meeting with prosecutors present.",
      ],
      bottomLine:
        "Amazon storefront operators learned that marketplace cartels are prosecuted as ordinary price-fixing crimes.",
    },
  },
  {
    id: "us-mr-davids-flooring-bidrigging",
    name: "U.S. v. Mr. David’s Flooring — commercial flooring bid-rigging",
    shortName: "Mr. David’s Flooring cartel",
    companies: ["mr-davids-flooring"],
    jurisdictions: ["US"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 2009,
    yearEnd: 2021,
    status: "fined",
    summary:
      "Mr. David’s Flooring International, LLC—a commercial flooring contractor—pleaded guilty to rigging bids and fixing prices with rivals. The plea agreement recommended a criminal fine between $1.2 and $1.6 million, another mid-market construction SME caught in DOJ’s flooring industry probe.",
    regulatorArgument:
      "Flooring contractors met and communicated to suppress competition by rigging bids and fixing prices on commercial flooring jobs across the United States.",
    outcome:
      "August 2021 plea agreement recommending a $1.2–$1.6 million criminal fine; part of a broader Chicago flooring investigation with multiple company and individual pleas.",
    remedies: "Criminal fine within the agreed range; ongoing related prosecutions in the industry.",
    laws: ["sherman-1"],
    markets: [
      "commercial flooring",
      "local construction",
      "government contracting",
      "small business cartels",
    ],
    sources: [
      {
        label: "Plea agreement — U.S. v. Mr. David’s Flooring",
        url: "https://www.justice.gov/atr/case-document/file/1428886/dl",
      },
      {
        label: "Related DOJ flooring case — Commercial Carpet Consultants",
        url: "https://www.justice.gov/atr/case/us-v-jerry-p-watson-and-commercial-carpet-consultants-inc",
      },
    ],
    readingMinutes: 5,
    keyDates: [
      { label: "Conspiracy period (charged industry probe)", date: "2009–2017" },
      { label: "Mr. David’s plea agreement", date: "August 2021" },
    ],
    timeline: [
      {
        date: "2009–2017",
        title: "Industry bid coordination",
        detail:
          "DOJ’s flooring investigation alleged contractors exchanged complementary bids and fixed prices on commercial installation jobs.",
      },
      {
        date: "2021",
        title: "Corporate plea",
        detail:
          "Mr. David’s Flooring pleaded guilty; parties jointly recommended a $1.2–$1.6 million fine.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "A commercial flooring contractor pleaded guilty to years of fake competing bids and faced a recommended fine of $1.2–$1.6 million. Mid-market trades learn the hard way that ‘helping’ a rival with a high quote is bid-rigging.",
      theStory: [
        "Office build-outs and institutional facilities need carpet and hard flooring. Bids often look competitive on paper. DOJ’s Chicago flooring probe found contractors taking turns—and covering for each other with intentional losing quotes.",
        "Mr. David’s Flooring admitted participation and agreed to recommend a seven-figure criminal fine. Sister cases charged other installers and even a manufacturer account executive who helped orchestrate rotations.",
        "For small commercial contractors, those dollars are existential. A seven-figure fine plus reputational damage can end a family business even when the underlying jobs seemed routine.",
      ],
      whyItMatters: [
        "Complementary bidding is a common SME construction offence.",
        "Multi-year schemes accumulate huge guideline fines.",
        "Industry-wide probes mean one confession can cascade.",
      ],
      whatWasClaimed: [
        "Bid-rigging and price-fixing on commercial flooring contracts.",
        "Meetings and communications to suppress competition.",
      ],
      theOtherSide: [
        "Company pleaded guilty under a negotiated fine recommendation.",
      ],
      whatItMeansForYou: [
        "Decline any request to ‘put in a number so we look busy.’",
        "Audit historical email for cover-bid language if you inherit an old firm.",
        "Consider leniency counsel immediately if you discover past participation.",
      ],
      bottomLine:
        "Mr. David’s Flooring’s plea shows construction SMEs remain a DOJ cartel staple.",
    },
  },
  {
    id: "ftc-abcmouse-age-of-learning",
    name: "FTC v. Age of Learning (ABCmouse) — subscription / cancel practices",
    shortName: "ABCmouse FTC settlement",
    companies: ["age-of-learning"],
    jurisdictions: ["US"],
    conduct: ["market_access", "discrimination"],
    yearStart: 2017,
    yearEnd: 2020,
    status: "settled",
    summary:
      "Growth-stage edtech company Age of Learning, Inc. (ABCmouse) paid $10 million and accepted injunctive terms to settle FTC charges that it misrepresented ‘easy cancellation,’ failed to disclose key negative-option terms, and made canceling memberships unreasonably hard—classic consumer-protection risk for subscription startups.",
    regulatorArgument:
      "The company enrolled consumers in auto-renewing plans without adequate disclosures and forced parents through a maze that blocked cancellations despite advertising ease.",
    outcome:
      "September 2020 settlement: $10 million monetary relief plus order requiring clear disclosures, informed consent, and simple cancellation mechanisms under ROSCA / FTC Act theories.",
    remedies:
      "Monetary relief; mandated disclosure, consent, and click-to-cancel-style process reforms.",
    laws: ["ftc-5"],
    markets: [
      "children’s edtech",
      "subscription apps",
      "negative-option billing",
      "startups and growth companies",
    ],
    sources: [
      {
        label: "FTC — ABCmouse $10M settlement",
        url: "https://www.ftc.gov/news-events/news/press-releases/2020/09/childrens-online-learning-program-abcmouse-pay-10-million-settle-ftc-charges-illegal-marketing",
      },
    ],
    readingMinutes: 6,
    keyDates: [
      { label: "FTC complaint & proposed order", date: "September 2020" },
      { label: "$10M settlement announced", date: "September 2020" },
    ],
    timeline: [
      {
        date: "2010s",
        title: "Subscription growth",
        detail:
          "ABCmouse scaled children’s learning memberships with free trials and auto-renew plans marketed to parents.",
      },
      {
        date: "2020",
        title: "FTC settlement",
        detail:
          "Commission alleged hard-to-cancel flows and disclosure failures; company paid $10M and accepted conduct rules.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "A popular children’s learning startup settled with the FTC for $10 million over subscription traps: promising easy cancel, then making parents fight through dark-pattern mazes. Growth-stage apps face consumer-law risk long before they become Big Tech.",
      theStory: [
        "ABCmouse sold peace of mind to parents: educational content, trials, and memberships. The FTC said the marketing understated how hard it was to stop paying.",
        "According to the complaint, consumers who tried to cancel by phone, email, or forms hit a lengthy, confusing path. Many who started canceling stayed enrolled and were billed again. ‘Easy Cancellation’ claims allegedly did not match reality.",
        "The $10 million settlement and injunctive order required clearer upfront terms, express consent before billing, and a simple cancel path—principles later echoed in broader negative-option rulemaking.",
        "For founders, this is the consumer twin of antitrust SME cases: market rules bite early-stage companies when growth tactics outrun compliance.",
      ],
      whyItMatters: [
        "Subscription UX is a regulatory surface, not just a growth lever.",
        "ROSCA and FTC Act §5 apply to startups, not only cable conglomerates.",
        "Refund and cancel friction is a top complaint category for apps.",
      ],
      whatWasClaimed: [
        "Misrepresentations about cancellation ease.",
        "Inadequate negative-option disclosures.",
        "Unfair billing and obstruction of cancellation.",
      ],
      theOtherSide: [
        "Company settled without a litigated liability finding on the merits.",
        "Order focuses on forward-looking process fixes plus monetary relief.",
      ],
      whatItMeansForYou: [
        "Make cancel as easy as signup—same medium, few steps.",
        "Disclose price, renewal timing, and cancel steps before collecting a card.",
        "Audit ‘save’ flows so they do not trap users.",
      ],
      bottomLine:
        "ABCmouse’s FTC settlement is a canonical warning to subscription startups: dark-pattern cancel flows are enforcement bait.",
    },
  },
  {
    id: "ftc-sunday-riley-fake-reviews",
    name: "FTC v. Sunday Riley Modern Skincare — fake product reviews",
    shortName: "Sunday Riley fake reviews",
    companies: ["sunday-riley"],
    jurisdictions: ["US"],
    conduct: ["discrimination", "market_access"],
    yearStart: 2015,
    yearEnd: 2020,
    status: "settled",
    summary:
      "Houston-based beauty startup Sunday Riley Modern Skincare and its CEO settled FTC charges that employees posted fake five-star Sephora reviews and downvoted negatives—showing that small branded consumer companies face endorsement and deception enforcement, not only giants.",
    regulatorArgument:
      "Company-directed fake reviews misrepresented ordinary-user opinions and failed to disclose that reviewers were employees, distorting competition on a major retail platform.",
    outcome:
      "2019 proposed consent; final FTC order November 2020 prohibiting misrepresentation of reviewer independence and requiring clear disclosure of material connections.",
    remedies:
      "Conduct order (no monetary fine highlighted in final approval); training and recordkeeping obligations.",
    laws: ["ftc-5"],
    markets: [
      "cosmetics",
      "online reviews",
      "DTC beauty brands",
      "startups and growth companies",
    ],
    sources: [
      {
        label: "FTC final consent — Sunday Riley",
        url: "https://www.ftc.gov/news-events/news/press-releases/2020/11/ftc-approves-final-consent-agreement-sunday-riley-modern-skincare-llc",
      },
      {
        label: "FTC case page",
        url: "https://www.ftc.gov/legal-library/browse/cases-proceedings/192-3008-sunday-riley-modern-skincare-llc-matter",
      },
    ],
    readingMinutes: 5,
    keyDates: [
      { label: "Alleged review campaign", date: "2015–2017" },
      { label: "FTC announcement", date: "October 2019" },
      { label: "Final order", date: "November 2020" },
    ],
    timeline: [
      {
        date: "2015–2017",
        title: "Employee review scheme",
        detail:
          "FTC alleged managers—including the CEO—directed staff to create fake Sephora accounts, leave five-star reviews, and dislike negatives, sometimes via VPN.",
      },
      {
        date: "2019–2020",
        title: "Consent order",
        detail:
          "Company and CEO settled; final order banned deceptive endorsement practices and required disclosures.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "A growing skincare brand allegedly had staff write fake Sephora reviews. The FTC stepped in. For DTC startups, fake social proof is not a growth hack—it is an unfair-practice case.",
      theStory: [
        "Sunday Riley sold premium skincare through Sephora. Reviews on that site influence purchases. The FTC said company leaders told employees to invent shopper personas and post glowing write-ups while burying criticism.",
        "Emails quoted in the case allegedly instructed staff to always leave five stars and to dislike negatives until they disappeared. A VPN was allegedly used after Sephora cleaned some fakes.",
        "The settlement order forbids misrepresenting that reviewers are independent and requires clear disclosure of any employee or paid connection. Regulators treated a still-scaling beauty company like any other market participant.",
        "Honest startups competing on the same shelf are the quiet victims: fake stars steal ranking and attention.",
      ],
      whyItMatters: [
        "Review integrity is competition policy by another name.",
        "Founders’ Slack instructions become Exhibit A.",
        "Platform sellers of any size are in FTC scope.",
      ],
      whatWasClaimed: [
        "False claims that reviews reflected ordinary independent users.",
        "Deceptive failure to disclose employee endorsements.",
      ],
      theOtherSide: [
        "Respondents settled via consent order without a full trial on the merits.",
      ],
      whatItMeansForYou: [
        "Never have staff post as fake customers.",
        "Disclose employee or incentivized reviews clearly.",
        "Train marketing teams on endorsement guides before launch.",
      ],
      bottomLine:
        "Sunday Riley’s FTC order shows DTC startups get policed for fake reviews just like larger brands.",
    },
  },
  {
    id: "noom-subscription-class-settlement",
    name: "Noom automatic-renewal class settlement",
    shortName: "Noom subscription settlement",
    companies: ["noom"],
    jurisdictions: ["US"],
    conduct: ["market_access"],
    yearStart: 2016,
    yearEnd: 2022,
    status: "settled",
    summary:
      "Weight-loss app Noom—a high-growth startup at the time—agreed to a roughly $62 million class settlement over claims that ‘risk-free’ trials rolled into pricey auto-renewing plans that were hard to cancel. Private consumer enforcement can hit scaling companies as hard as agency actions.",
    regulatorArgument:
      "Plaintiffs alleged deceptive trial-to-paid conversion and cancellation friction that locked consumers into months of nonrefundable charges.",
    outcome:
      "February 2022 proposed class settlement reported at about $56 million cash plus $6 million in subscription credits; company denied wrongdoing while resolving the case.",
    remedies: "Cash and credit fund for class members; practice changes negotiated in settlement.",
    laws: ["ftc-5"],
    markets: [
      "digital health apps",
      "subscription apps",
      "startups and growth companies",
      "negative-option billing",
    ],
    sources: [
      {
        label: "Reuters — Noom $62M auto-renewal settlement",
        url: "https://www.reuters.com/legal/litigation/noom-diet-app-reaches-62-mln-settlement-over-automatic-subscription-renewals-2022-02-14/",
      },
    ],
    readingMinutes: 5,
    keyDates: [
      { label: "Class period (alleged)", date: "2016 onward" },
      { label: "Settlement announced", date: "February 2022" },
    ],
    timeline: [
      {
        date: "2016–2021",
        title: "Hypergrowth subscriptions",
        detail:
          "Noom scaled trial funnels and auto-renew Healthy Weight plans; consumer complaints about cancel difficulty mounted.",
      },
      {
        date: "2022",
        title: "Class settlement",
        detail:
          "Parties filed a preliminary settlement valued around $62 million in cash and credits.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Noom’s growth machine—free trials into auto-renew plans—sparked a class action that settled for about $62 million. Even without an FTC caption, subscription startups can face bet-the-company consumer litigation.",
      theStory: [
        "Noom marketed behavioral weight-loss coaching through an app. Trials converted into multi-month prepaid plans. Plaintiffs said the path out was far harder than the path in, and that ‘risk-free’ messaging conflicted with steep nonrefundable renewals.",
        "Rather than try the case to verdict, Noom negotiated a large settlement fund while denying liability. For a still-maturing tech brand, the cash and brand hit rivalled many agency fines.",
        "Paired with ABCmouse, Noom shows the two tracks startups face: public FTC enforcement and private class actions covering the same cancel/renew playbook.",
      ],
      whyItMatters: [
        "Private suits can exceed agency penalties for mid-stage companies.",
        "Trial-to-paid UX is a board-level compliance issue.",
        "Health and wellness apps face heightened consumer scrutiny.",
      ],
      whatWasClaimed: [
        "Deceptive trial and auto-renewal practices.",
        "Unfairly difficult cancellation.",
        "Unauthorized or unexpected recurring charges.",
      ],
      theOtherSide: [
        "Noom denied wrongdoing and said disclosures and cancel processes complied with law.",
        "Settlement is not an admission of liability.",
      ],
      whatItMeansForYou: [
        "Price cancel friction as a legal risk, not a retention feature.",
        "Budget reserves if you run aggressive trial funnels at scale.",
        "Align marketing claims with the actual cancel path before launch ads.",
      ],
      bottomLine:
        "Noom’s class settlement proves growth-stage consumer apps can face eight-figure market-conduct costs without being monopolists.",
    },
  },
  {
    id: "eu-gr-driving-schools-cartel",
    name: "Greek HCC driving schools price-fixing",
    shortName: "Greek driving schools cartel",
    companies: ["greek-driving-schools"],
    jurisdictions: ["EU"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 2010,
    yearEnd: 2013,
    status: "fined",
    summary:
      "Greece’s Hellenic Competition Commission fined professional associations and individual driving schools roughly €112,000 for coordinating prices (and sometimes limiting services) in local learner markets—an EU-member example of micro-enterprise cartel enforcement under national law paralleling Article 101.",
    regulatorArgument:
      "Driving-school associations and firms fixed prices and occasionally restricted service provision, distorting competition for ordinary consumers learning to drive.",
    outcome:
      "HCC Decision 571/2013: infringement findings and total fines of about €111,900; recommendations and threat of further sanctions for non-compliance.",
    remedies: "Fines; compliance recommendations to associations.",
    laws: ["tfeu-101"],
    markets: [
      "driving instruction",
      "local professional services",
      "small business cartels",
    ],
    sources: [
      {
        label: "Hellenic Competition Commission Decision 571/2013",
        url: "https://epant.gr/en/decisions/item/1973-decision-571-2013.html",
      },
    ],
    readingMinutes: 5,
    keyDates: [
      { label: "HCC decision", date: "2013" },
    ],
    timeline: [
      {
        date: "Pre-2013",
        title: "Association-led price coordination",
        detail:
          "Investigators found collusive practices among driving-school associations and companies across Greece.",
      },
      {
        date: "2013",
        title: "Fines imposed",
        detail:
          "HCC issued Decision 571/2013 with roughly €112k in fines and forward-looking compliance threats.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Greek driving schools—and their associations—were fined for fixing lesson prices. Learners are ordinary consumers; the firms are classic small businesses. EU-style competition law reaches them too.",
      theStory: [
        "Learning to drive is a local service market. When associations circulate ‘recommended’ prices that members actually follow, the effect is a cartel even if each school is tiny.",
        "Greece’s competition authority found price-fixing and, in some cases, limits on service provision. A cooperative bank was even treated as a cartel facilitator. Total fines were modest in absolute euros—but meaningful for micro-firms—and the precedent mattered more than the sum.",
        "Across Europe, national authorities—not only the European Commission—police SME cartels in trades, professions, and local services.",
      ],
      whyItMatters: [
        "Professional associations are high-risk for SMEs.",
        "National NCAs handle most small-firm cartels in the EU.",
        "‘Recommended price lists’ can be illegal if they coordinate actual prices.",
      ],
      whatWasClaimed: [
        "Price-fixing among driving schools and associations.",
        "Occasional restriction of services.",
        "Facilitation by a cooperative bank.",
      ],
      theOtherSide: [
        "Details of individual defences vary; the published decision records fines and findings.",
      ],
      whatItMeansForYou: [
        "Treat association price guidance as legally radioactive.",
        "Set lesson prices independently from cost and local demand.",
        "If your association circulates fee schedules, push for legal review or exit.",
      ],
      bottomLine:
        "Greek driving schools show EU competition law’s long arm into neighbourhood service SMEs.",
    },
  },
  {
    id: "eu-battery-recycling-sme-victims",
    name: "EU car battery recycling cartel (SME scrap collectors as victims)",
    shortName: "EU battery scrap cartel",
    companies: ["campine", "eco-bat", "recylex", "johnson-controls"],
    jurisdictions: ["EU"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 2009,
    yearEnd: 2017,
    status: "fined",
    summary:
      "The European Commission fined battery recyclers €68 million for fixing purchase prices of scrap car batteries. The Commission emphasised harm to mainly small and medium-sized scrap collectors and garages—illustrating how industrial cartels crush SMEs as customers/suppliers even when the fined firms are larger.",
    regulatorArgument:
      "Recyclers coordinated to push down prices paid for scrap lead-acid batteries across Belgium, France, Germany and the Netherlands, squeezing upstream SME collectors.",
    outcome:
      "February 2017 infringement decision; €68 million in fines; Johnson Controls received full leniency immunity for revealing the cartel.",
    remedies: "Fines; leniency discounts; private damages pathway for harmed collectors.",
    laws: ["tfeu-101"],
    markets: [
      "battery recycling",
      "scrap collection",
      "circular economy",
      "SME victims of cartels",
    ],
    sources: [
      {
        label: "EC press — car battery recycling cartel",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_17_200",
      },
    ],
    readingMinutes: 6,
    keyDates: [
      { label: "Cartel period", date: "2009–2012" },
      { label: "Commission decision", date: "February 8, 2017" },
    ],
    timeline: [
      {
        date: "2009–2012",
        title: "Buy-side price coordination",
        detail:
          "Four recyclers allegedly aligned target/maximum purchase prices for scrap automotive batteries.",
      },
      {
        date: "2017",
        title: "€68M fines",
        detail:
          "Campine, Eco-Bat and Recylex fined; Johnson Controls avoided a fine via leniency.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Big recyclers allegedly agreed to pay less for used car batteries. The losers were mostly small scrapyards and garages. Cartels do not only raise consumer prices—they can crush SME suppliers.",
      theStory: [
        "Garages and small collectors gather dead car batteries and sell them into the recycling chain. Their margins depend on the purchase price recyclers offer.",
        "The Commission found recyclers colluded to keep those purchase prices down across several Member States from 2009 to 2012. That is a buy-side cartel—illegal under Article 101 just like a sell-side price fix.",
        "Fines totaled €68 million. The whistleblower escaped a fine. For CounterLayer readers running scrap, repair, or collection SMEs, the case shows why documenting below-market offers and seeking damages counsel can matter after a cartel decision.",
      ],
      whyItMatters: [
        "SMEs appear as victims as often as defendants.",
        "Buy-side cartels are less famous but equally illegal.",
        "Leniency still drives detection in mid-market industries.",
      ],
      whatWasClaimed: [
        "Coordination of scrap battery purchase prices.",
        "Restriction of competition in BE/FR/DE/NL recycling inputs.",
      ],
      theOtherSide: [
        "Leniency applicant revealed the cartel; others settled or received reductions.",
      ],
      whatItMeansForYou: [
        "If you sell scrap or inputs into concentrated buyer markets, watch for synchronized price drops.",
        "Preserve invoices—follow-on damages may be available after an EC decision.",
        "Do not join buyer clubs that discuss target purchase prices with rivals.",
      ],
      bottomLine:
        "The battery-recycling cartel is the mirror image of SME guilt stories: small collectors got squeezed, large recyclers got fined.",
    },
  },
];
