import type { CompetitionCase } from "../types";

export const batchLibraryC: CompetitionCase[] = [
  {
    id: "eu-trucks-cartel",
    name: "EU Trucks Cartel",
    shortName: "EU Trucks Cartel",
    companies: ["volvo", "daimler", "man", "iveco", "scania"],
    jurisdictions: ["EU"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 1997,
    yearEnd: 2017,
    status: "fined",
    summary:
      "The European Commission fined major truck manufacturers a record €3.8 billion for a long-running cartel coordinating prices, passing on emission-compliance costs, and delaying cleaner technology.",
    regulatorArgument:
      "Rivals met at senior levels and through trade-association gatherings to fix gross list prices and align surcharges, harming fleet buyers and taxpayers who fund road freight.",
    outcome:
      "Commission infringement decision and fines; Scania settled separately after initial non-participation in the settlement; follow-on damages litigation across Europe.",
    remedies:
      "Fines; cartel participants barred from repeating conduct; private damages actions encouraged by EU directive.",
    laws: ["tfeu-101"],
    markets: ["heavy-duty trucks", "commercial vehicle pricing"],
    sources: [
      {
        label: "EC trucks cartel press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_16_2582",
      },
      {
        label: "EC trucks cartel case page",
        url: "https://competition-policy.ec.europa.eu/antitrust/cases/decisions/39824_en",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Commission dawn raids", date: "2011" },
      { label: "Settlement procedure with five makers", date: "July 2016" },
      { label: "Scania infringement decision", date: "September 2017" },
      { label: "Total fines announced", date: "2016–2017" },
    ],
    timeline: [
      {
        date: "1997–2011",
        title: "Secret coordination on truck pricing",
        detail:
          "Senior managers allegedly exchanged pricing information and aligned list-price increases and emission surcharges across Europe.",
      },
      {
        date: "2011",
        title: "Investigation begins",
        detail:
          "Commission raids offices after a leniency applicant revealed the cartel's scope.",
      },
      {
        date: "2016",
        title: "Settlement fines for five manufacturers",
        detail:
          "Daimler, Volvo/Renault, Iveco, MAN, and DAF accepted settlement decisions with reduced fines for cooperation.",
      },
      {
        date: "2017",
        title: "Scania fined after contesting",
        detail:
          "Scania, which did not settle, received a separate infringement decision and full fine.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "For nearly two decades, Europe's biggest truck makers allegedly ran a price-fixing club. They coordinated list prices and how much extra to charge for meeting emissions rules—costs that ripple through everything moved by road. The EU fined them billions, and fleet owners later sued for damages.",
      theStory: [
        "Heavy trucks move most of the physical economy. When a handful of manufacturers control most European sales, even small price tweaks on a €100,000 vehicle multiply into enormous overcharges for logistics companies, grocers, and ultimately consumers.",
        "According to the European Commission, managers at Daimler, Volvo, MAN, Iveco, DAF, and later Scania treated competition as a shared spreadsheet. They allegedly met in hotels, at trade shows, and through industry circles to align gross list prices and surcharges tied to new pollution rules.",
        "The cartel did not necessarily fix the price on every invoice a buyer saw. List prices anchor negotiations, leasing deals, and resale values. If rivals move list prices together, fleet purchasers lose the benefit of real competition even when dealers haggle.",
        "Investigators learned of the arrangement through Europe's leniency program, which rewards the first company that blows the whistle. Dawn raids in 2011 triggered years of document review and witness interviews across multiple countries.",
        "Five manufacturers settled in 2016, accepting fines with a discount for cooperating. Scania chose to fight and received its own decision in 2017. Total fines exceeded €3.8 billion—among the largest cartel penalties in EU history.",
        "The case also raised environmental questions. Regulators said participants discussed delaying or passing through the cost of emissions technology in ways that slowed cleaner trucks reaching the market.",
        "Truck buyers across Europe later filed follow-on damages claims. The saga shows how industrial cartels can hide in plain sight behind trade associations and 'market intelligence' meetings.",
      ],
      whyItMatters: [
        "Road freight costs feed into food, medicine, and construction prices—cartels here tax the whole economy.",
        "Leniency rewards whistleblowers but still leaves massive fines for participants.",
        "Long-running cartels remind businesses that 'industry meetings' can become evidence.",
      ],
      whatWasClaimed: [
        "Manufacturers coordinated gross list prices and timing of increases.",
        "They aligned surcharges for meeting emissions standards.",
        "Meetings and exchanges lasted from 1997 through at least 2011.",
      ],
      theOtherSide: [
        "Settling firms admitted participation to reduce penalties.",
        "Scania disputed aspects of the Commission's analysis before its separate fine.",
        "Defendants in damages suits argue passing-on and individual pricing complexity.",
      ],
      whatItMeansForYou: [
        "If your business buys or leases trucks, cartel overcharges may be recoverable in national courts.",
        "Compliance training should treat competitor pricing talks as high-risk.",
        "Emissions rules became a cartel talking point—regulation and collusion can intersect.",
      ],
      bottomLine:
        "Europe's truck cartel was a textbook hard-core price-fixing case spanning decades and the continent's largest manufacturers, ending in multibillion-euro fines and waves of private litigation.",
    },
  },
  {
    id: "eu-elevators-cartel",
    name: "EU Elevators and Escalators Cartel",
    shortName: "EU Elevators Cartel",
    companies: ["otis", "kone", "schindler", "thyssenkrupp"],
    jurisdictions: ["EU"],
    conduct: ["cartel_coordination", "market_access", "price_fix"],
    yearStart: 1995,
    yearEnd: 2004,
    status: "fined",
    summary:
      "The Commission fined the four dominant elevator and escalator makers €992 million for dividing national markets, rigging bids, and exchanging sensitive pricing information across Europe and beyond.",
    regulatorArgument:
      "The cartel allocated territories and customers, coordinated bids on large projects, and suppressed competition in installation and maintenance—markets where switching suppliers is costly.",
    outcome:
      "2007 infringement decision and fines; Kone received leniency reduction as first applicant; multiple national damages actions followed.",
    remedies: "Fines; compliance programs; private damages claims.",
    laws: ["tfeu-101"],
    markets: ["elevators", "escalators", "lift maintenance"],
    sources: [
      {
        label: "EC elevators cartel press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_07_359",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Commission raids", date: "2004" },
      { label: "Infringement decision and fines", date: "February 21, 2007" },
      { label: "General Court largely upholds", date: "2011–2012" },
    ],
    timeline: [
      {
        date: "1995–2004",
        title: "Market sharing and bid rigging",
        detail:
          "Executives allegedly met in hotels and restaurants to allocate countries and coordinate tenders for lifts in buildings and infrastructure.",
      },
      {
        date: "2004",
        title: "Investigation launched",
        detail: "Surprise inspections followed a leniency application from Kone.",
      },
      {
        date: "2007",
        title: "Nearly €1 billion in fines",
        detail:
          "Otis, Schindler, ThyssenKrupp, and Kone were fined for one of the EU's largest bid-rigging cartels.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Four companies that install almost every elevator in Europe ran a secret club for years. They split countries, rigged bids on big building projects, and swapped pricing secrets. The EU fined them nearly a billion euros—and building owners later sued.",
      theStory: [
        "Elevators are not a product you shop for on impulse. A skyscraper or hospital picks a supplier for decades of installation, service, and spare parts. That makes bid rigging especially harmful: one crooked tender can lock in overpayments for twenty years.",
        "Otis, Kone, Schindler, and ThyssenKrupp together dominated European lift markets. The Commission said senior managers held regular 'summits' in hotels across Europe, sometimes using code names and separate meetings by country to hide the pattern.",
        "Cartel members allegedly agreed who would win which national market, who would submit a cover bid to fake competition, and how to price maintenance contracts after installation. Even multinational customers negotiating across borders could not escape if all local bids were choreographed.",
        "Kone broke ranks first under the EU leniency program, triggering raids in 2004 and a fast-moving investigation. Internal calendars, travel records, and meeting notes helped reconstruct a cartel the companies had hidden behind legitimate trade association activity.",
        "In 2007 the Commission imposed fines totaling €992 million. Kone's penalty was reduced for cooperation; others faced full fines reflecting the gravity and duration of conduct.",
        "Courts largely upheld the decision on appeal, though companies continued fighting damages arithmetic in national litigation. Property developers, public housing authorities, and airports pursued compensation.",
        "The elevators cartel became a teaching example of how bid-rigging works in project-based industries—and why whistleblower programs matter.",
      ],
      whyItMatters: [
        "Infrastructure cartels inflate construction costs for decades-long contracts.",
        "Bid rigging is among the most serious antitrust violations worldwide.",
        "Maintenance lock-in magnifies harm after the initial collusive win.",
      ],
      whatWasClaimed: [
        "Territorial market allocation across EU member states.",
        "Coordinated bidding on new installations and modernization projects.",
        "Exchange of pricing and strategic information at senior level.",
      ],
      theOtherSide: [
        "Companies disputed fine calculations and procedural points on appeal.",
        "In damages cases, defendants argue individual tenders were competitively priced.",
        "Some meetings were framed as industry benchmarking—not collusion.",
      ],
      whatItMeansForYou: [
        "Public procurement offices should audit suspicious bid patterns—identical margins, rotating winners, or loser bonuses.",
        "Facilities managers locked into service contracts may have recovery options where cartel conduct is proven.",
        "Competitors must refuse 'summit' invitations that discuss live bids.",
      ],
      bottomLine:
        "The EU elevators cartel showed that even sophisticated multinationals will carve up continents if enforcement looks away—and that leniency can unravel the whole scheme.",
    },
  },
  {
    id: "us-lysine-cartel",
    name: "United States v. Archer Daniels Midland (Lysine Cartel)",
    shortName: "US Lysine Cartel",
    companies: ["adm", "ajinomoto", "kyowa-hakko"],
    jurisdictions: ["US"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 1992,
    yearEnd: 1995,
    status: "fined",
    summary:
      "ADM and Asian rivals pleaded guilty to fixing prices and allocating volumes in the global lysine feed-additive market, with executives imprisoned and the FBI's secretly recorded meetings becoming antitrust legend.",
    regulatorArgument:
      "Competitors met in hotel rooms to set target prices and production volumes for lysine sold to animal feed makers, raising costs for poultry and livestock producers.",
    outcome:
      "Corporate fines exceeding $100 million; prison sentences for ADM and foreign executives; landmark criminal enforcement and documentary fame.",
    remedies: "Criminal fines; individual imprisonment; corporate compliance undertakings.",
    laws: ["sherman-1"],
    markets: ["lysine feed additives", "animal nutrition"],
    sources: [
      {
        label: "DOJ ADM lysine plea materials",
        url: "https://www.justice.gov/atr/archived-press-releases",
      },
      {
        label: "FBI historical lysine investigation",
        url: "https://www.fbi.gov/history/famous-cases",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "FBI undercover recordings", date: "1992–1995" },
      { label: "ADM corporate guilty plea", date: "1996" },
      { label: "Executive prison sentences", date: "1997–1999" },
    ],
    timeline: [
      {
        date: "1992",
        title: "Cartel meetings begin",
        detail:
          "ADM and Japanese producers allegedly agreed price and volume targets at covert gatherings in the US and Asia.",
      },
      {
        date: "1995",
        title: "Investigation surfaces",
        detail:
          "Federal agents had recorded executives discussing 'the competition' while fixing prices.",
      },
      {
        date: "1996–1999",
        title: "Guilty pleas and jail time",
        detail:
          "Companies paid large fines; ADM executives including vice chairman Mark Whitacre cooperated and were prosecuted.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Executives from ADM and Japanese chemical companies met in hotel rooms to fix the price of lysine—a feed additive that helps chickens grow. The FBI secretly recorded them. The case put American executives in prison and became the famous 'ADM cartel' story told in books and film.",
      theStory: [
        "Lysine is an amino acid mixed into animal feed so chickens and pigs gain weight efficiently. When a few global producers control supply, farmers and meat processors depend on honest competition to keep feed costs down.",
        "In the early 1990s, Archer Daniels Midland dominated US production while Ajinomoto and Kyowa Hakko led in Japan. Instead of competing, executives allegedly held regular meetings—sometimes literally whispering about competitors while the FBI listened from the next table.",
        "The cartel set target prices by region, allocated sales volumes, and monitored whether each company 'cheated' on the deal. Emails and travel schedules later showed how ordinary business trips masked criminal coordination.",
        "Mark Whitacre, an ADM executive, became an FBI informant and wore a wire. His tapes captured phrases that antitrust students still quote—moments where executives joked that competing was the 'enemy' while dividing markets.",
        "The investigation expanded internationally. US prosecutors charged both corporations and individuals, reflecting a policy that prison time deters cartels better than fines alone.",
        "ADM pleaded guilty and paid a $100 million criminal fine— enormous for the 1990s. Several executives received federal prison sentences, a rarity in white-collar enforcement even today.",
        "The lysine case remains the pop-culture face of cartel crime: it showed collusion is not abstract economics but people choosing to break the law in plain language on tape.",
      ],
      whyItMatters: [
        "Criminal antitrust targets individuals—not just corporate checkbooks.",
        "Agricultural input cartels raise food prices upstream of the grocery aisle.",
        "Whistleblowers and wiretaps can destroy long-hidden conspiracies.",
      ],
      whatWasClaimed: [
        "Price fixing and volume allocation in lysine worldwide.",
        "Meetings among ADM and Japanese rivals to enforce targets.",
        "Harm to feed buyers and ultimately meat producers.",
      ],
      theOtherSide: [
        "Some defendants argued entrapment or disputed meeting characterizations.",
        "ADM later portrayed itself as reformed with stronger compliance.",
        "Civil plaintiffs pursued follow-on damages separately.",
      ],
      whatItMeansForYou: [
        "If you buy commodities from a tight oligopoly, sudden parallel price moves may warrant scrutiny.",
        "Employees asked to join 'industry coordination' meetings should escalate to counsel.",
        "The case is still used to train executives on antitrust criminal exposure.",
      ],
      bottomLine:
        "The lysine cartel is America's most famous criminal price-fixing bust—corporate guilt, executive jail time, and FBI tapes that made antitrust visceral.",
    },
  },
  {
    id: "eu-forex-benchmark-rigging",
    name: "EU Forex Benchmark Manipulation (Yen/London Fix)",
    shortName: "EU Forex Benchmark",
    companies: ["jpmorgan", "citigroup", "barclays", "rbs", "ubs"],
    jurisdictions: ["EU", "Both"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 2007,
    yearEnd: 2013,
    status: "fined",
    summary:
      "EU and UK authorities fined major banks for colluding in chat rooms to manipulate spot foreign-exchange benchmarks tied to the WM/Reuters 'fix,' alongside separate interest-rate benchmark cases—without equating the conduct to the LIBOR scandal itself.",
    regulatorArgument:
      "Traders shared confidential client order information and coordinated trading around the fix window to move published reference rates benefiting their desks, distorting a benchmark used in contracts and funds.",
    outcome:
      "European Commission and national fines totaling over €1 billion combined with US and UK penalties; individual trader bans; compliance overhauls.",
    remedies: "Fines; benchmark methodology reforms; trader messaging surveillance.",
    laws: ["tfeu-101", "tfeu-102"],
    markets: ["foreign exchange spot", "currency benchmarks"],
    sources: [
      {
        label: "EC forex cartel press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_19_3146",
      },
      {
        label: "FCA forex enforcement summary",
        url: "https://www.fca.org.uk/news/press-releases",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Regulatory investigations open", date: "2013" },
      { label: "EC settlement decisions (Three-way Banana)", date: "May 2019" },
      { label: "EC Esoteric cartel decision", date: "2019–2020" },
    ],
    timeline: [
      {
        date: "2007–2013",
        title: "Chat-room coordination",
        detail:
          "Currency traders in multibank chat groups allegedly exchanged customer order flow and timed trades around the daily fix.",
      },
      {
        date: "2013",
        title: "Global probes after LIBOR-era scrutiny",
        detail:
          "Authorities expanded benchmark investigations from interest rates into FX markets, uncovering separate cartel threads.",
      },
      {
        date: "2019",
        title: "EU fines on FX cartels",
        detail:
          "Commission fined banks for two cartel arrangements affecting yen and other currency fixes.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Currency traders at giant banks used private chat rooms with names like 'Three-way Banana' to swap client secrets and push exchange-rate benchmarks at the daily 'fix.' Europe fined banks heavily. This was part of the broader benchmark-rigging era alongside—but distinct from—the LIBOR interest-rate cases.",
      theStory: [
        "Every day at set times, banks publish reference exchange rates used to value pensions, corporate invoices, and tourism hedges. The WM/Reuters fix aggregates actual trades in a short window. If traders know big client orders are coming, they can front-run or nudge the published rate.",
        "After regulators exposed interest-rate benchmark manipulation, investigators asked whether other 'fixes' were rigged too. Forex desks turned out to have their own culture of semi-public chat rooms where rivals traded information like teammates.",
        "EU investigators described cartels with colorful names—'Three-way Banana' for one yen-focused group, 'Esoteric' for another—where traders allegedly shared confidential customer positions and coordinated trades seconds before the fix.",
        "The harm is subtle but real: a few basis points on a trillion-dollar daily market shifts wealth from pension funds and exporters to bank trading desks. Benchmark users assumed rates reflected fair market activity, not collusion.",
        "The European Commission treated the most egregious chat-room conduct as hard-core cartels under Article 101, fining banks including Barclays, RBS, JPMorgan, Citigroup, and UBS in staged settlement decisions.",
        "This file describes forex benchmark manipulation carefully: it related to the same era of trading-desk scandals as LIBOR but involved different instruments, traders, and benchmark mechanics. Conflating them oversimplifies two parallel enforcement waves.",
        "Reforms followed: tighter chat surveillance, benchmark design changes, and criminal cases against individual traders in some countries. Banks paid billions globally across FX and rates matters combined.",
      ],
      whyItMatters: [
        "Benchmarks silently price mortgages, swaps, and cross-border contracts.",
        "Chat-room culture turned competitors into co-conspirators.",
        "Financial cartels can harm institutions ordinary people never see.",
      ],
      whatWasClaimed: [
        "Traders exchanged confidential client information.",
        "Coordinated trading around the fix manipulated published rates.",
        "Separate cartel groups operated in yen and other currency pairs.",
      ],
      theOtherSide: [
        "Some banks settled without admitting all facts in every jurisdiction.",
        "Institutions argued reforms and dismissals of rogue traders addressed root causes.",
        "Defendants in civil suits dispute class-wide impact calculations.",
      ],
      whatItMeansForYou: [
        "If your business hedges currency at the fix, historical rates may have been distorted.",
        "Compliance teams now monitor trader messaging aggressively.",
        "Benchmark users should understand how reference rates are constructed.",
      ],
      bottomLine:
        "Forex benchmark cartels showed that after LIBOR, regulators kept digging—and found traders rigging the daily currency fix in group chats, not isolated bad apples.",
    },
  },
  {
    id: "eu-crt-cartel",
    name: "EU Cathode Ray Tube Cartel",
    shortName: "EU CRT Cartel",
    companies: ["lg", "samsung", "philips", "panasonic"],
    jurisdictions: ["EU"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 1996,
    yearEnd: 2006,
    status: "fined",
    summary:
      "The Commission fined TV and monitor tube makers €1.47 billion for fixing prices and sharing markets in cathode ray tubes as flat screens began replacing bulky sets.",
    regulatorArgument:
      "Executives held 'green meetings' in Asia and Europe to coordinate pricing for color display tubes used in televisions and computer monitors, squeezing OEM buyers.",
    outcome: "2012 decision with record cartel fines at the time; appeals largely unsuccessful.",
    remedies: "Fines; compliance monitoring; damages actions.",
    laws: ["tfeu-101"],
    markets: ["cathode ray tubes", "television components"],
    sources: [
      {
        label: "EC CRT cartel press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_12_1318",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Commission raids", date: "2007" },
      { label: "Infringement decision", date: "December 5, 2012" },
      { label: "Fines total", date: "€1.47 billion" },
    ],
    timeline: [
      {
        date: "1996–2006",
        title: "Green meetings",
        detail:
          "Competitors allegedly met in golf clubs and hotels—called 'green' because they discussed sensitive topics—to fix CRT prices.",
      },
      {
        date: "2012",
        title: "Record EU cartel fine",
        detail: "LG, Samsung, Philips, Panasonic, and others fined for a decade-long conspiracy.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Before flat screens took over, a handful of companies made the glass tubes inside TVs and monitors. They allegedly met in secret—calling them 'green meetings'—to fix prices for ten years. The EU fined them €1.47 billion.",
      theStory: [
        "Cathode ray tubes powered televisions and desktop monitors for generations. A small group of Asian and European manufacturers supplied tubes to brands like Sony and Dell, giving them leverage over entire product lines.",
        "Investigators said executives held recurring meetings labeled 'green' when sensitive pricing topics were on the agenda. Participants allegedly exchanged target prices, allocated customers, and monitored compliance with cartel quotas.",
        "The cartel persisted even as LCD technology threatened CRT's future—incumbents squeezed last profits from a dying market rather than compete aggressively.",
        "Raids in 2007 followed leniency applications. Email traffic and meeting minutes reconstructed a conspiracy spanning continents.",
        "The 2012 fines totaled €1.47 billion—then a record for a single cartel case—reflecting duration, geographic scope, and the size of affected electronics markets.",
        "TV and PC buyers indirectly paid through higher component costs passed into retail prices.",
        "The CRT cartel remains a cautionary tale about sunset industries colluding while technology shifts beneath them.",
      ],
      whyItMatters: [
        "Component cartels tax every device downstream.",
        "Codenames and golf outings do not hide conduct from modern investigators.",
        "Even declining markets attract collusion to extract final rents.",
      ],
      whatWasClaimed: [
        "Price fixing on color display tubes.",
        "Customer allocation among major CRT suppliers.",
        "Regular covert meetings over a decade.",
      ],
      theOtherSide: [
        "Companies appealed fine calculations and parental liability theories.",
        "Some argued market decline independently raised prices.",
      ],
      whatItMeansForYou: [
        "Electronics procurement teams should watch oligopoly pricing patterns.",
        "Legacy product lines still face cartel risk—complacency is dangerous.",
      ],
      bottomLine:
        "The CRT cartel punished consumers at the dawn of the flat-screen era with one of Europe's largest-ever collusion fines.",
    },
  },
  {
    id: "eu-dram-memory-cartel",
    name: "EU DRAM Memory Cartel",
    shortName: "EU DRAM Cartel",
    companies: ["samsung", "infineon", "hynix", "micron"],
    jurisdictions: ["EU", "US"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 1998,
    yearEnd: 2002,
    status: "fined",
    summary:
      "DRAM makers faced parallel EU and US enforcement for exchanging price information and coordinating increases in dynamic random-access memory sold to PC and server manufacturers.",
    regulatorArgument:
      "Suppliers with global reach colluded on pricing for a essential computer input, raising costs for device makers and consumers during the dot-com hardware boom.",
    outcome:
      "EU fines over €331 million; US criminal pleas and fines; Infineon executives imprisoned in the US.",
    remedies: "Fines; criminal sentences; compliance programs.",
    laws: ["tfeu-101", "sherman-1"],
    markets: ["DRAM semiconductors", "computer memory"],
    sources: [
      {
        label: "EC DRAM cartel decision summary",
        url: "https://competition-policy.ec.europa.eu/antitrust/cases/decisions/36966_en",
      },
      {
        label: "DOJ DRAM investigation",
        url: "https://www.justice.gov/atr/archived-press-releases",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "US criminal charges", date: "2004–2005" },
      { label: "EU infringement decision", date: "May 2010" },
      { label: "Infineon executive sentences", date: "2004–2005" },
    ],
    timeline: [
      {
        date: "1998–2002",
        title: "Global memory pricing collusion",
        detail: "Phone calls and meetings allegedly coordinated DRAM price levels among top suppliers.",
      },
      {
        date: "2004",
        title: "US prosecutions begin",
        detail: "Infineon pleaded guilty; executives received jail terms—a warning to the industry.",
      },
      {
        date: "2010",
        title: "EU fines issued",
        detail: "Commission penalized Samsung, Infineon, Hynix, and others for Article 101 violations.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Computer memory chips were briefly a cartel product. Samsung, Infineon, Hynix, and others allegedly swapped pricing plans during the late 1990s tech boom. Europe fined them hundreds of millions; America sent executives to prison.",
      theStory: [
        "DRAM chips are the short-term memory in every PC and server. When only a few fabs worldwide can supply leading-edge memory, OEMs like Dell and HP depend on genuine price competition.",
        "Investigators found evidence of phone calls and meetings where sales executives discussed upcoming price increases and volume plans—not innocent market chatter, but coordinated action.",
        "The cartel coincided with volatile memory prices during the internet buildout. Collusion allegedly dampened competition precisely when buyers needed relief from spikes.",
        "The US moved first criminally. Infineon's guilty plea and executive prison terms signaled that semiconductor cartels face personal accountability.",
        "The EU decision years later added hundreds of millions in fines, with Samsung receiving leniency reductions for cooperation.",
        "Downstream, PC buyers may have paid slightly more per machine—a small per-unit markup multiplied across hundreds of millions of units.",
        "DRAM enforcement previewed later flash-memory and LCD panel cartel cases in the same tight-knit industry culture.",
      ],
      whyItMatters: [
        "Tech components are global cartel targets with huge volume effects.",
        "Parallel US criminal and EU administrative enforcement complement each other.",
        "Even fast-moving commodity markets can be rigged.",
      ],
      whatWasClaimed: [
        "Price coordination on DRAM sold globally.",
        "Information exchanges enabling parallel pricing.",
        "Harm to computer manufacturers and consumers.",
      ],
      theOtherSide: [
        "Market volatility independent of collusion was cited in defenses.",
        "Fine allocation disputes among corporate groups on appeal.",
      ],
      whatItMeansForYou: [
        "Oligopoly component markets warrant competitive bidding and audit trails.",
        "Sales staff must not discuss future pricing with rivals.",
      ],
      bottomLine:
        "The DRAM cartel bridged Silicon Valley supply chains and European enforcement, putting both companies and executives on the hook.",
    },
  },
  {
    id: "us-sprint-tmobile-merger",
    name: "Sprint / T-Mobile Merger (US)",
    shortName: "Sprint / T-Mobile",
    companies: ["tmobile", "sprint", "softbank"],
    jurisdictions: ["US"],
    conduct: ["merger"],
    yearStart: 2018,
    yearEnd: 2020,
    status: "remedy",
    summary:
      "After state-led opposition, federal courts cleared T-Mobile's acquisition of Sprint subject to divestitures to Dish Network and extensive 5G buildout commitments, reshaping US wireless from four national carriers to three.",
    regulatorArgument:
      "States argued eliminating Sprint would reduce competition, raise prices, and harm prepaid and rural customers; DOJ conditioned approval on creating a new fourth competitor via Dish.",
    outcome:
      "Merger closed April 2020; behavioral and structural remedies including spectrum and customer transfers to Dish; ongoing compliance reporting.",
    remedies:
      "Divestiture of prepaid brands and spectrum; Dish as MVNO then facilities-based competitor; 5G coverage deadlines.",
    laws: ["clayton-7", "hart-scott"],
    markets: ["mobile wireless", "prepaid cellular", "5G networks"],
    sources: [
      {
        label: "DOJ merger settlement",
        url: "https://www.justice.gov/opa/pr/justice-department-settles-sprint-t-mobile-transaction",
      },
      {
        label: "FCC merger order",
        url: "https://www.fcc.gov/sprint-t-mobile",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Merger announced", date: "April 29, 2018" },
      { label: "DOJ settlement", date: "July 26, 2019" },
      { label: "Merger closed", date: "April 1, 2020" },
    ],
    timeline: [
      {
        date: "2018",
        title: "Merger announced",
        detail:
          "T-Mobile and Sprint pitched the deal as necessary to build a nationwide 5G network rivaling Verizon and AT&T.",
      },
      {
        date: "2019",
        title: "States sue to block",
        detail:
          "A bipartisan group of state attorneys general argued three-carrier competition would harm consumers.",
      },
      {
        date: "2020",
        title: "Courts approve with remedies",
        detail:
          "Federal judge rejected the state challenge after DOJ/FCC settlements; Dish received assets to become a fourth carrier.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "T-Mobile buying Sprint cut America's national wireless carriers from four to three. The government allowed it only if Dish got customer accounts and spectrum to eventually become a new competitor. States sued to stop the deal but lost in court.",
      theStory: [
        "Sprint and T-Mobile were the smaller national carriers behind Verizon and AT&T. Together they argued scale was needed to deploy 5G fast and challenge the duopoly at the top.",
        "Antitrust enforcers split. The FCC and DOJ negotiated remedies; state attorneys general from both parties sued, saying history shows wireless mergers raise prices and hurt prepaid users.",
        "The DOJ's creative fix: transfer Boost Mobile and spectrum to Dish Network—a satellite TV company—with milestones forcing Dish to build a real cellular network over time instead of remaining a permanent reseller.",
        "T-Mobile also committed to deploy 5G covering most Americans within deadlines, with federal monitoring. These behavioral promises tried to offset lost competition from Sprint's exit.",
        "After a multi-week trial, a federal judge sided with the companies and federal government, finding the Dish remedy sufficient. The merger closed as COVID-19 began.",
        "Post-merger, T-Mobile absorbed Sprint's customer base, shuttered overlapping networks, and marketed aggressive 'Un-carrier' pricing—outcomes states warned might be temporary promotions.",
        "The case is debated endlessly: success story of faster 5G versus cautionary tale of trusting behavioral remedies to replace a lost competitor.",
      ],
      whyItMatters: [
        "Wireless mergers directly affect monthly phone bills for most households.",
        "Remedy design can matter more than block-or-allow headlines.",
        "State-federal splits on merger enforcement are increasingly common.",
      ],
      whatWasClaimed: [
        "Four-to-three merger would reduce competition and raise prices.",
        "Sprint was a maverick discount competitor worth preserving.",
        "Dish was not a credible replacement for Sprint's facilities.",
      ],
      theOtherSide: [
        "Companies said Sprint was financially weak and could not build 5G alone.",
        "DOJ argued Dish plus buildout commitments restored competitive dynamics.",
        "T-Mobile pointed to pro-consumer pricing post-close.",
      ],
      whatItMeansForYou: [
        "Your carrier choices and prepaid plans were reshaped by this deal.",
        "Remedy compliance affects whether Dish truly becomes a fourth network.",
        "Future telecom mergers will cite this precedent.",
      ],
      bottomLine:
        "Sprint/T-Mobile cleared with heavy remedies—a landmark test of fixing four-to-three wireless mergers instead of blocking them outright.",
    },
  },
  {
    id: "eu-bayer-monsanto-merger",
    name: "Bayer / Monsanto Merger (EU)",
    shortName: "Bayer / Monsanto",
    companies: ["bayer", "monsanto"],
    jurisdictions: ["EU", "US"],
    conduct: ["merger"],
    yearStart: 2016,
    yearEnd: 2018,
    status: "remedy",
    summary:
      "The European Commission cleared Bayer's $63 billion acquisition of Monsanto only after divestitures in seeds, herbicides, and digital agriculture to BASF, addressing overlaps in crop science markets.",
    regulatorArgument:
      "Combining two of the largest seed and agrochemical suppliers would reduce innovation and raise prices for farmers in herbicides, seeds, and trait licensing without extensive remedies.",
    outcome:
      "Conditional clearance June 2018; massive asset sales to BASF; merger closed after global remedy package.",
    remedies:
      "Divestiture of cotton, canola, soybean seeds, glufosinate business, vegetable seeds, and digital platforms to BASF.",
    laws: ["eu-merger", "hart-scott", "clayton-7"],
    markets: ["crop seeds", "herbicides", "agricultural biotechnology"],
    sources: [
      {
        label: "EC Bayer/Monsanto decision",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_18_3692",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Merger agreement", date: "September 2016" },
      { label: "EC conditional clearance", date: "March 21, 2018" },
      { label: "Deal closed", date: "June 2018" },
    ],
    timeline: [
      {
        date: "2016",
        title: "Mega-merger announced",
        detail:
          "Bayer's crop-science unit sought Monsanto's seed genetics and Roundup franchise, triggering global reviews.",
      },
      {
        date: "2018",
        title: "EU demands BASF divestiture buyer",
        detail:
          "Commission required sale of overlapping herbicide, seed, and R&D assets to preserve competition.",
      },
      {
        date: "2018",
        title: "Closing after remedies",
        detail: "BASF acquired billions in assets; Bayer retired the Monsanto name in branding.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "When Bayer bought Monsanto, Europe feared too much power over seeds and weed-killers in farmers' hands. Regulators said yes only if Bayer sold large chunks of the combined business to rival BASF—including seed lines and herbicide products.",
      theStory: [
        "Farmers depend on a few global companies for seeds engineered to resist pests and herbicides designed to match. Bayer's crop-science division and Monsanto were two of the biggest players worldwide.",
        "The merger would combine Monsanto's seed genetics and Roundup-linked traits with Bayer's crop protection chemicals and research pipeline—vertical and horizontal overlap regulators could not ignore.",
        "The European Commission opened an in-depth investigation, focusing on herbicide-seed bundles, trait licensing, and innovation in digital farming tools that recommend planting and spraying decisions.",
        "Clearance came with one of the largest remedy packages in agribusiness history: BASF bought businesses spanning cotton, canola, soybean seeds, vegetable seeds, glufosinate herbicides, and digital assets.",
        "US and other jurisdictions imposed additional conditions, but the EU process drove much of the structural relief.",
        "Bayer later faced separate litigation over Roundup product liability—not part of the merger case but shaping public perception of the combined firm.",
        "For competition analysts, Bayer/Monsanto shows how 'big ag' consolidation is managed through surgical divestitures rather than outright prohibition.",
      ],
      whyItMatters: [
        "Seed and chemical mergers affect global food supply chains.",
        "Structural remedies try to recreate a rival overnight via asset sales.",
        "Farmers face fewer independent suppliers after the wave of ag mergers.",
      ],
      whatWasClaimed: [
        "Merger would reduce competition in seeds and non-selective herbicides.",
        "Innovation in traits and digital ag would slow.",
        "Farmers would face higher prices and worse licensing terms.",
      ],
      theOtherSide: [
        "Bayer argued the deal improved R&D scale and sustainable farming tools.",
        "It said remedies preserved competition while enabling needed investment.",
      ],
      whatItMeansForYou: [
        "Agricultural input prices ripple into food costs—even urban consumers feel indirect effects.",
        "Remedy buyers like BASF must actually compete, not just hold assets passively.",
      ],
      bottomLine:
        "Bayer/Monsanto closed only after selling the equivalent of a full competitor to BASF—Europe's template for policing agribusiness concentration.",
    },
  },
  {
    id: "eu-dow-dupont-merger",
    name: "Dow / DuPont Merger (EU)",
    shortName: "Dow / DuPont",
    companies: ["dow", "dupont", "fmc"],
    jurisdictions: ["EU", "US"],
    conduct: ["merger"],
    yearStart: 2015,
    yearEnd: 2019,
    status: "remedy",
    summary:
      "The EU cleared Dow and DuPont's merger conditional on divestitures in crop protection and petrochemicals, followed by a planned three-way split into separate agriculture, materials, and specialty companies.",
    regulatorArgument:
      "Overlaps in herbicides, insecticides, and petrochemical co-products would reduce competition and innovation without divestitures to buyers like FMC.",
    outcome:
      "2017 conditional clearance; FMC acquired major crop protection assets; DowDuPont later split into Corteva, Dow, and DuPont.",
    remedies: "Crop protection divestitures; R&D organization separation; petrochemical asset sales.",
    laws: ["eu-merger", "hart-scott"],
    markets: ["crop protection", "petrochemicals", "specialty materials"],
    sources: [
      {
        label: "EC Dow/DuPont decision",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_17_2562",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Merger announced", date: "December 2015" },
      { label: "EC conditional approval", date: "March 27, 2017" },
      { label: "Three-way split completed", date: "2019" },
    ],
    timeline: [
      {
        date: "2015–2016",
        title: "Merger of equals proposed",
        detail: "Dow and DuPont pitched combination then separation into focused companies.",
      },
      {
        date: "2017",
        title: "EU remedies to FMC",
        detail: "Commission required sale of herbicide and insecticide portfolios to preserve rivalry.",
      },
      {
        date: "2019",
        title: "Corteva, Dow, DuPont born",
        detail: "Post-merger split created three independent listed firms.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Dow and DuPont merged into a giant, then split into three companies—but only after selling crop-science products to FMC because Europe worried about herbicide and insecticide concentration.",
      theStory: [
        "Dow and DuPont were century-old American industrial icons. Their 'merger of equals' planned to combine, cut costs, then spin out three focused firms: agriculture, materials, and specialty products.",
        "European regulators focused on the agriculture overlap. Both firms sold herbicides and insecticides where combined share would dominate niche markets like certain fungicides and insect control tools.",
        "The Commission demanded divestitures to FMC Corporation—including research pipelines and production facilities—not merely brand licenses. Remedies had to transfer real competitive capability.",
        "Petrochemical overlaps in acid copolymers also required asset sales. EU conditions ran in parallel with US merger review.",
        "After closing, the integrated DowDuPont entity worked through integration then executed the three-way split, creating Corteva for seeds and crop chemicals, a new Dow for materials, and a slimmed DuPont for specialties.",
        "The arc—merge, remedy, split—illustrates how conglomerates use mergers to reshape portfolios while antitrust police individual market overlaps.",
        "Farmers and chemical buyers gained a strengthened FMC as partial compensation for lost standalone rivalry between Dow and DuPont crop units.",
      ],
      whyItMatters: [
        "Merger remedies can reshape entire industry structures.",
        "Conglomerate strategies do not bypass narrow product market analysis.",
        "Buyers of divested assets must receive R&D—not just trademarks.",
      ],
      whatWasClaimed: [
        "Herbicide and insecticide overlaps harmed farmers.",
        "Petrochemical co-product markets would concentrate.",
        "Innovation competition would decline post-merger.",
      ],
      theOtherSide: [
        "Companies said the split plan itself preserved competition long term.",
        "DowDuPont argued remedies were sufficient and pro-innovation.",
      ],
      whatItMeansForYou: [
        "Crop protection prices affect agricultural commodities and food.",
        "Industrial customers saw supplier lists change after the split.",
      ],
      bottomLine:
        "Dow/DuPont shows EU merger control forcing asset sales even when companies plan to break themselves up later.",
    },
  },
  {
    id: "eu-ge-honeywell-blocked",
    name: "GE / Honeywell Merger (Blocked, EU)",
    shortName: "GE / Honeywell (EU block)",
    companies: ["ge", "honeywell"],
    jurisdictions: ["EU", "US"],
    conduct: ["merger"],
    yearStart: 2000,
    yearEnd: 2001,
    status: "won_by_plaintiff",
    summary:
      "The European Commission prohibited General Electric's acquisition of Honeywell—the first time a merger cleared by US authorities was blocked in Brussels—citing conglomerate effects in aircraft engines and avionics.",
    regulatorArgument:
      "GE's dominance in jet engines plus Honeywell's strength in avionics and aftermarket services would create bundling and foreclosure harming Airbus and competing suppliers.",
    outcome:
      "Commission prohibition July 2001; deal abandoned; transatlantic regulatory divergence became a policy flashpoint.",
    remedies: "N/A—outright block.",
    laws: ["eu-merger", "hart-scott"],
    markets: ["aircraft engines", "avionics", "aerospace aftermarket"],
    sources: [
      {
        label: "EC GE/Honeywell prohibition",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_01_939",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Merger announced", date: "October 2000" },
      { label: "DOJ clearance (US)", date: "May 2001" },
      { label: "EC prohibition", date: "July 3, 2001" },
    ],
    timeline: [
      {
        date: "2000",
        title: "$45 billion deal announced",
        detail: "GE sought Honeywell to expand aerospace and industrial controls.",
      },
      {
        date: "2001",
        title: "US approves, EU blocks",
        detail:
          "DOJ cleared with conditions mindset; Commission found conglomerate bundling risks unique to EU analysis.",
      },
      {
        date: "2001",
        title: "Deal collapses",
        detail: "GE abandoned the transaction after the EU veto.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "America said GE could buy Honeywell. Europe said no—worried GE would bundle jet engines with Honeywell avionics and crush rivals. The deal died, becoming the classic example of US and EU merger regulators disagreeing.",
      theStory: [
        "In 2000, GE proposed buying Honeywell for roughly $45 billion—the largest industrial merger attempted at the time. GE led in aircraft engines; Honeywell was strong in avionics, APUs, and aftermarket repair.",
        "US antitrust officials focused on horizontal overlaps and concluded remedies or market facts did not justify blocking. The DOJ cleared the deal after a lengthy review.",
        "The European Commission took a different lens: conglomerate effects. Even without classic horizontal overlap, GE might bundle engines with Honeywell components, offer loyalty rebates to airlines, and foreclose competitors like Rolls-Royce or Thales.",
        "Commissioners also feared GE Capital's financial muscle could cross-subsidize aerospace products—an argument rooted in Europe's holistic market-power story.",
        "GE offered concessions, but Brussels deemed them inadequate. In July 2001 the Commission prohibited the merger outright—a rare veto of two US companies.",
        "GE walked away. Honeywell later struggled independently; GE eventually retreated from much of its industrial portfolio in later decades.",
        "Policy scholars still cite GE/Honeywell when discussing transatlantic divergence, extraterritorial merger review, and whether 'conglomerate effects' justify blocking.",
      ],
      whyItMatters: [
        "Global deals need clearance in multiple jurisdictions—not just the home country.",
        "EU merger law sometimes blocks deals US enforcers accept.",
        "Aerospace supply affects airline ticket prices and defense procurement.",
      ],
      whatWasClaimed: [
        "Bundling engines and avionics would foreclose rivals.",
        "Financial strength would amplify exclusionary strategies.",
        "Airbus and suppliers would face weakened bargaining power.",
      ],
      theOtherSide: [
        "GE argued US clearance proved no competitive harm.",
        "Companies said EU theory was speculative and protectionist.",
        "US officials publicly criticized the prohibition.",
      ],
      whatItMeansForYou: [
        "Multinationals must design remedies for the strictest reviewer.",
        "Air travelers indirectly depend on competitive aircraft supply chains.",
      ],
      bottomLine:
        "GE/Honeywell is the poster child for an EU merger block that stunned American enforcers and killed a landmark industrial combination.",
    },
  },
  {
    id: "eu-ups-tnt-blocked",
    name: "UPS / TNT Express Merger (Blocked, EU)",
    shortName: "UPS / TNT (EU block)",
    companies: ["ups", "tnt"],
    jurisdictions: ["EU"],
    conduct: ["merger"],
    yearStart: 2012,
    yearEnd: 2013,
    status: "won_by_plaintiff",
    summary:
      "The Commission blocked UPS's €5.2 billion bid for TNT Express, finding the combined entity would dominate integrated express delivery in Europe; procedural errors later led to a rare damages claim against the Commission.",
    regulatorArgument:
      "UPS and TNT were two of only a few integrators offering pan-European express air-ground networks; merger would leave DHL with a weakened rival set and higher prices for business shippers.",
    outcome:
      "Prohibition January 2013; UPS paid break fee; TNT later acquired by FedEx; UPS won damages for Commission procedural mishandling on a separate track.",
    remedies: "N/A—outright block.",
    laws: ["eu-merger"],
    markets: ["express parcel delivery", "integrated logistics"],
    sources: [
      {
        label: "EC UPS/TNT prohibition",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_13_69",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Deal announced", date: "March 2012" },
      { label: "Commission prohibition", date: "January 30, 2013" },
      { label: "FedEx acquired TNT", date: "2016" },
    ],
    timeline: [
      {
        date: "2012",
        title: "UPS bids for TNT",
        detail: "UPS sought TNT's European road network to challenge DHL.",
      },
      {
        date: "2013",
        title: "EU blocks merger",
        detail: "Commission found insufficient remedies to preserve integrator competition.",
      },
      {
        date: "2016",
        title: "FedEx buys TNT instead",
        detail: "FedEx succeeded where UPS failed, with its own remedy package.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "UPS wanted to buy TNT Express to compete with DHL in Europe. EU regulators said the merger would leave too few express-delivery networks and blocked it. TNT later sold to FedEx instead.",
      theStory: [
        "Express parcel delivery in Europe relies on integrated air-and-ground networks—UPS, TNT, DHL, and FedEx operating at continental scale. Business shippers depend on competition for overnight and time-definite delivery.",
        "UPS's 2012 offer for TNT Express aimed to bolt on TNT's strong European road operations, creating a closer rival to Deutsche Post's DHL.",
        "The Commission's in-depth review concluded that removing TNT as an independent integrator would significantly lessen competition, especially for intra-European express freight.",
        "UPS proposed divestitures, but regulators judged them insufficient to recreate a standalone integrator with TNT's reach.",
        "In January 2013 the deal was prohibited. UPS paid a termination fee; TNT remained independent briefly before financial struggles.",
        "FedEx later acquired TNT with its own remedy commitments—showing similar deals can pass with different packaging and timing.",
        "Separately, courts found the Commission mishandled disclosure to UPS during the review, leading to damages—a rare institutional rebuke aside from the competition merits.",
      ],
      whyItMatters: [
        "Express delivery competition affects e-commerce shipping costs.",
        "Merger fixes must recreate lost competitors, not paper them over.",
        "Even blocked deals can leave procedural legacy litigation.",
      ],
      whatWasClaimed: [
        "Four-to-three integrator merger harms business senders.",
        "DHL would face a weaker competitive set.",
        "Proposed divestitures were not viable.",
      ],
      theOtherSide: [
        "UPS argued DHL's strength made the deal necessary to compete.",
        "It said remedies would preserve rivalry on routes.",
      ],
      whatItMeansForYou: [
        "Online sellers' shipping options depend on integrator mergers.",
        "EU blocks remain a live risk for global logistics deals.",
      ],
      bottomLine:
        "UPS/TNT was a clean EU merger prohibition in express delivery—followed years later by FedEx's alternate path to TNT's assets.",
    },
  },
  {
    id: "eu-microsoft-server-protocols",
    name: "Microsoft Server Protocols (EU)",
    shortName: "Microsoft Server (EU)",
    companies: ["microsoft"],
    jurisdictions: ["EU"],
    conduct: ["refusal_to_deal", "interoperability", "abuse_of_dominance"],
    yearStart: 1998,
    yearEnd: 2008,
    status: "fined",
    summary:
      "Building on the Windows Media Player case, the Commission fined Microsoft €899 million for failing to comply with earlier orders to disclose server interoperability information and offer a browser ballot remedy era predecessor obligations.",
    regulatorArgument:
      "Microsoft abused dominance in work-group server OS by withholding protocol documentation rivals needed to interoperate, and later dragged feet on compliance with the 2004 decision.",
    outcome:
      "2004 decision fines and disclosure duties; additional €899 million penalty for non-compliance in 2008; later interoperability commitments.",
    remedies:
      "Mandated protocol licensing on reasonable terms; compliance monitoring; periodic penalty payments.",
    laws: ["tfeu-102"],
    markets: ["work group server operating systems", "server interoperability"],
    sources: [
      {
        label: "EC Microsoft server decision 2004",
        url: "https://competition-policy.ec.europa.eu/antitrust/cases/decisions/37792_en",
      },
      {
        label: "EC compliance fine 2008",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_08_318",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "2004 infringement decision", date: "March 24, 2004" },
      { label: "General Court largely upholds", date: "2007" },
      { label: "Non-compliance fine", date: "February 27, 2008" },
    ],
    timeline: [
      {
        date: "1998–2003",
        title: "Sun complaint and investigation",
        detail:
          "Rivals argued Microsoft kept server protocols secret to protect Windows server dominance.",
      },
      {
        date: "2004",
        title: "Abuse finding and remedies",
        detail:
          "Commission ordered disclosure and fined Microsoft for tying Media Player and server conduct.",
      },
      {
        date: "2008",
        title: "Record compliance fine",
        detail:
          "Microsoft penalized for delayed protocol documentation—then the largest ever EU antitrust fine.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Europe said Microsoft hoarded the technical secrets that let other companies' servers talk to Windows networks—abusing its dominance. Microsoft fought for years, paid massive fines, and was penalized again for dragging its feet on fixes.",
      theStory: [
        "Businesses run on networks where desktop Windows talks to server Windows. If rival server software cannot interoperate smoothly, IT departments stick with Microsoft end-to-end—locking in dominance beyond the desktop.",
        "Sun Microsystems and others complained that Microsoft withheld protocols needed for authentication, file sharing, and directory services—making alternative servers second-class citizens.",
        "The 2004 Commission decision combined two abuses: tying Windows Media Player (a separate case strand) and refusing to supply interoperability information on reasonable terms for work-group servers.",
        "Microsoft appealed but courts largely upheld the core theory: dominant platforms must not sabotage rivals through technical secrecy when interoperability is essential for competition.",
        "Compliance became its own battle. Regulators said Microsoft delayed, priced, and documented protocols in ways that frustrated effective access. In 2008 the Commission imposed an €899 million penalty—then a record—for non-compliance.",
        "The saga influenced later EU cases against Google, Qualcomm, and gatekeeper rules in the Digital Markets Act requiring active interoperability.",
        "For IT buyers, the case mattered because real server choice—not just desktop apps—determines decades of licensing and support costs.",
      ],
      whyItMatters: [
        "Platform dominance can extend through hidden technical barriers.",
        "Remedy compliance is enforceable—and expensive if ignored.",
        "Server markets underpin enterprise software competition.",
      ],
      whatWasClaimed: [
        "Microsoft dominated work-group server operating systems.",
        "Protocol withholding foreclosed rival server products.",
        "Non-compliance justified additional periodic penalties.",
      ],
      theOtherSide: [
        "Microsoft argued protocols were trade secrets and innovation incentives mattered.",
        "It said later compliance met legal requirements.",
        "Courts trimmed some fine calculations on appeal.",
      ],
      whatItMeansForYou: [
        "Vendor lock-in often lives in networking protocols, not just user habit.",
        "DMA-style interoperability duties have roots in this Microsoft era.",
      ],
      bottomLine:
        "Microsoft's EU server-protocol fight established that refusing interoperability can be an abuse—and that ignoring remedies triggers billion-euro penalties.",
    },
  },
  {
    id: "eu-aspen-pharma-pricing",
    name: "Aspen Pharma (EU Excessive Pricing)",
    shortName: "Aspen Pharma (EU)",
    companies: ["aspen-pharma"],
    jurisdictions: ["EU"],
    conduct: ["abuse_of_dominance", "discrimination"],
    yearStart: 2012,
    yearEnd: 2018,
    status: "fined",
    summary:
      "The Commission fined Aspen Pharma €5.2 million for imposing sudden price increases and threatening supply withdrawal on essential off-patent cancer medicines in Europe.",
    regulatorArgument:
      "Aspen abused dominance in niche oncology generics by raising prices up to several hundred percent and leveraging threats to pull medicines from countries that resisted.",
    outcome:
      "2018 infringement decision and fine; commitments on pricing and supply stability in some markets.",
    remedies: "Fine; price and supply commitments in settlement discussions in parallel national cases.",
    laws: ["tfeu-102"],
    markets: ["off-patent oncology medicines", "hospital pharmaceuticals"],
    sources: [
      {
        label: "EC Aspen decision press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_18_6681",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Italian authority investigation influence", date: "2016" },
      { label: "Commission decision", date: "December 12, 2018" },
      { label: "Fine imposed", date: "€5.2 million" },
    ],
    timeline: [
      {
        date: "2012–2017",
        title: "Price spikes on legacy cancer drugs",
        detail:
          "Aspen acquired old oncology products and sharply raised prices across the EU.",
      },
      {
        date: "2018",
        title: "EU abuse finding",
        detail:
          "Commission concluded threats to delist medicines coerced health systems into accepting excessive prices.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Aspen Pharma bought old cancer drugs that few companies still made—then jacked up prices and threatened to stop supplying countries that complained. Europe called that abuse of dominance and fined the company.",
      theStory: [
        "When patents expire on life-saving drugs, generics usually cut prices. But if only one supplier remains for a niche oncology product, hospitals may have no alternative—creating dominance out of scarcity.",
        "Aspen acquired portfolios of classic cancer medicines and allegedly imposed sudden, massive price increases across Europe, sometimes multiplying prices several-fold overnight.",
        "National health systems pushed back. According to the Commission, Aspen threatened to withdraw supplies from countries that would not accept the new price lists—using medicine access as leverage.",
        "Italian and other national authorities investigated first, feeding EU-level scrutiny of whether this was lawful pricing or exploitative abuse by a dominant supplier.",
        "The 2018 decision found Article 102 violations for excessive pricing combined with abusive threats. The fine was modest in euro terms but symbolically important for pharma enforcement.",
        "Patients and hospitals faced budget shocks; doctors treated with essential drugs where monopoly power met moral outrage.",
        "Aspen illustrates EU willingness to police exploitative pricing in concentrated generic niches—not only cartels and mergers.",
      ],
      whyItMatters: [
        "Off-patent does not always mean competitive pricing.",
        "Healthcare systems depend on antitrust when markets fail patients.",
        "Dominance can arise from sole-supplier legacy drugs.",
      ],
      whatWasClaimed: [
        "Aspen held dominant positions in specific oncology generics.",
        "Price increases were excessive and unfair.",
        "Supply threats coerced public payers.",
      ],
      theOtherSide: [
        "Aspen cited manufacturing costs and low historical prices.",
        "It argued commercial negotiation, not abuse, explained outcomes.",
      ],
      whatItMeansForYou: [
        "Drug budgets affect insurance premiums and tax-funded healthcare.",
        "Hospitals should document supplier threats when prices spike.",
      ],
      bottomLine:
        "Aspen Pharma showed EU abuse rules reach naked price hikes on essential medicines when a company becomes the only source.",
    },
  },
  {
    id: "eu-gazprom-gas-supply",
    name: "Gazprom Gas Supply (EU)",
    shortName: "Gazprom (EU)",
    companies: ["gazprom"],
    jurisdictions: ["EU"],
    conduct: ["abuse_of_dominance", "market_access", "discrimination"],
    yearStart: 2011,
    yearEnd: 2018,
    status: "remedy",
    summary:
      "The Commission accepted binding commitments from Gazprom resolving charges it abused dominance in Central and Eastern European gas markets through pricing, territorial restrictions, and infrastructure bottlenecks.",
    regulatorArgument:
      "Gazprom segmented gas markets, linked prices unfairly to oil benchmarks, and blocked cross-border flows—harming EU energy security and downstream competition.",
    outcome:
      "2018 commitments decision; Gazprom avoided a fine by offering pricing reforms and free-flow obligations; monitored compliance.",
    remedies:
      "Market-based pricing mechanisms; enable cross-border gas resale; lift territorial restrictions in contracts.",
    laws: ["tfeu-102"],
    markets: ["natural gas supply", "Central and Eastern Europe energy"],
    sources: [
      {
        label: "EC Gazprom commitments decision",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_18_3340",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Formal investigation opened", date: "April 2015" },
      { label: "Statement of Objections", date: "April 2015" },
      { label: "Commitments decision", date: "May 24, 2018" },
    ],
    timeline: [
      {
        date: "2011–2015",
        title: "Complaints from CEE member states",
        detail:
          "Poland, Lithuania, and others alleged Gazprom divided markets and overcharged relative to Western Europe.",
      },
      {
        date: "2015",
        title: "EU charges Gazprom",
        detail: "Commission outlined abuse theories on pricing and territorial clauses.",
      },
      {
        date: "2018",
        title: "Commitments accepted",
        detail:
          "Gazprom avoided fines with binding market-opening concessions—politically sensitive given EU-Russia relations.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Russia's Gazprom supplies much of Eastern Europe's gas. The EU accused it of splitting markets and charging unfair prices. Gazprom avoided a fine by promising to let gas flow more freely across borders and adjust pricing formulas.",
      theStory: [
        "Energy is geopolitics. For Central and Eastern Europe, Gazprom long dominated pipeline gas imports, giving it leverage over heating bills and industrial competitiveness.",
        "Member states complained that Gazprom's contracts trapped buyers: prices indexed to oil when hub prices fell, bans on reselling gas to neighbors, and infrastructure terms that kept markets fragmented.",
        "The Commission's 2015 Statement of Objections framed classic dominance abuse in network industries—using contracts and pipelines to partition the Single Market.",
        "A full infringement fight with Russia's state exporter risked retaliation and supply disruptions. Negotiations leaned toward commitments—a negotiated fix without admitting guilt or paying fines.",
        "2018 commitments required Gazprom to revise pricing toward competitive benchmarks, remove destination clauses blocking cross-border resale, and address infrastructure access in the Baltic and other regions.",
        "Compliance monitoring continued for years amid Ukraine conflict and EU diversification push toward LNG and renewables.",
        "The case sits at the intersection of antitrust and energy security—law as tool to integrate gas markets, not only punish cartels.",
      ],
      whyItMatters: [
        "Household heating costs tie to gas market structure.",
        "Dominance in networks enables geographic price discrimination.",
        "Commitments trade fines for monitored behavior change.",
      ],
      whatWasClaimed: [
        "Gazprom abused dominance in several CEE markets.",
        "Territorial restrictions blocked gas flows.",
        "Pricing was unfair relative to Western hubs.",
      ],
      theOtherSide: [
        "Gazprom denied wrongdoing while offering commitments.",
        "Russia framed the probe as political targeting.",
      ],
      whatItMeansForYou: [
        "Cross-border energy competition affects bills and industrial policy.",
        "Commitments require vigilance—paper promises need monitoring.",
      ],
      bottomLine:
        "Gazprom's EU case used antitrust to pry open gas markets in Eastern Europe—via commitments, not fines, in a politically charged sector.",
    },
  },
  {
    id: "eu-broadcom-exclusivity",
    name: "Broadcom Exclusivity (EU)",
    shortName: "Broadcom (EU)",
    companies: ["broadcom"],
    jurisdictions: ["EU"],
    conduct: ["exclusivity", "abuse_of_dominance"],
    yearStart: 2019,
    yearEnd: 2020,
    status: "remedy",
    summary:
      "The Commission imposed interim measures and accepted commitments from Broadcom stopping exclusivity and near-exclusive arrangements for TV set-top box and modem chipsets pending a fuller investigation.",
    regulatorArgument:
      "Broadcom leveraged dominance in front-end chipset components to lock customers into exclusive or de facto exclusive deals, foreclosing rivals like MediaTek and Qualcomm in adjacent chips.",
    outcome:
      "2019 interim measures—rare in EU abuse cases; 2020 commitments decision; investigation closed without fine after compliance.",
    remedies:
      "Stop exclusivity and loyalty rebates; non-discrimination for competing customers during interim period.",
    laws: ["tfeu-102"],
    markets: ["TV set-top box chips", "modem chipsets", "semiconductor components"],
    sources: [
      {
        label: "EC Broadcom interim measures",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_19_6106",
      },
      {
        label: "EC Broadcom commitments",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_20_1867",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Investigation opened", date: "June 2019" },
      { label: "Interim measures ordered", date: "October 16, 2019" },
      { label: "Commitments accepted", date: "October 2020" },
    ],
    timeline: [
      {
        date: "2019",
        title: "EU opens probe",
        detail:
          "Commission targeted Broadcom's exclusivity in SoCs for set-top boxes and modems.",
      },
      {
        date: "2019",
        title: "Interim measures imposed",
        detail:
          "Rare 'stop now' order required Broadcom to halt contested clauses immediately.",
      },
      {
        date: "2020",
        title: "Commitments close case",
        detail: "Broadcom offered behavioral remedies; formal investigation ended.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Broadcom dominates chips inside cable boxes and modems. Europe feared it was signing exclusive deals that shut out rival chipmakers. Regulators ordered Broadcom to stop those practices immediately—then accepted long-term commitments.",
      theStory: [
        "Set-top boxes and broadband modems need system-on-a-chip components where Broadcom held strong share. Device makers like Apple and Samsung depend on multiple suppliers to negotiate price and innovation.",
        "The Commission alleged Broadcom used exclusive supply agreements, single-source clauses, and incentives that made customers buy front-end chips only from Broadcom—even when rivals offered alternatives.",
        "EU abuse probes usually take years. Here regulators deployed interim measures—a temporary 'halt' order—because they feared irreversible foreclosure while the investigation continued.",
        "Interim measures in dominance cases are rare and legally demanding. The Commission's willingness to use them signaled tougher enforcement against chip bottlenecks.",
        "Broadcom negotiated commitments: stop exclusivity, offer non-discriminatory terms, and allow competitors fair access during the remedy period.",
        "By 2020 the formal probe closed with commitments rather than a fine—speedy relief prioritized over punitive payment.",
        "The case previews ongoing global scrutiny of semiconductor supply concentration and customer lock-in.",
      ],
      whyItMatters: [
        "Chip exclusivity affects broadband gear and streaming device costs.",
        "Interim measures can change market behavior before final decisions.",
        "Semiconductor dominance is a top enforcement priority.",
      ],
      whatWasClaimed: [
        "Broadcom dominated certain front-end chipset niches.",
        "Exclusive deals foreclosed MediaTek and others.",
        "Immediate harm justified interim relief.",
      ],
      theOtherSide: [
        "Broadcom said its contracts reflected efficient bundling.",
        "It cooperated to resolve concerns via commitments.",
      ],
      whatItMeansForYou: [
        "Router and TV box prices indirectly reflect chipset competition.",
        "OEMs benefit when exclusivity clauses are banned early.",
      ],
      bottomLine:
        "Broadcom's EU case combined fast interim measures with commitments—targeting exclusivity in critical chip markets.",
    },
  },
  {
    id: "eu-enel-energy-abuse",
    name: "Enel / Endesa Energy Markets (EU)",
    shortName: "Enel / Endesa (EU)",
    companies: ["enel", "endesa"],
    jurisdictions: ["EU"],
    conduct: ["abuse_of_dominance", "market_access", "discrimination"],
    yearStart: 2004,
    yearEnd: 2010,
    status: "fined",
    summary:
      "The Commission fined Enel €14 million for obstructing competitors' access to electricity transmission infrastructure in Italy through its control of Terna and legacy Endesa integration issues in Spanish-Italian cross-border context—part of broader EU energy liberalization enforcement.",
    regulatorArgument:
      "Enel leveraged grid control and incumbent advantages to delay third-party access and maintain dominance in liberalizing power markets harming new entrants.",
    outcome:
      "2009–2010 fining decisions in energy sector series; structural unbundling trends accelerated separately.",
    remedies: "Fines; reinforced third-party access obligations under sector regulation.",
    laws: ["tfeu-102"],
    markets: ["electricity transmission", "Italian power markets"],
    sources: [
      {
        label: "EC Enel decision summary",
        url: "https://competition-policy.ec.europa.eu/antitrust/cases_en",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Investigation period", date: "2004–2008" },
      { label: "Commission fining decision", date: "2009" },
      { label: "Energy market liberalization push", date: "2000s" },
    ],
    timeline: [
      {
        date: "2000s",
        title: "EU pushes power market opening",
        detail:
          "Brussels targeted incumbent utilities using grid control to block retail and generation rivals.",
      },
      {
        date: "2009",
        title: "Enel fined",
        detail:
          "Commission penalized obstructive access practices in Italian electricity infrastructure.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "When Europe opened electricity markets, old monopolies still owned the wires. The EU fined Enel for using control over grids to make life hard for competing power sellers in Italy.",
      theStory: [
        "For decades, utilities like Enel generated, transmitted, and sold electricity under state-backed monopolies. EU liberalization aimed to split those functions so new suppliers could compete for household and business customers.",
        "Owning the grid gives incents to favor your own generation and retail arms—delaying connections, hoarding data, or making interconnection cumbersome for independents.",
        "The Commission investigated Enel alongside other European incumbents—E.ON, RWE, and others faced similar probes—creating a wave of energy abuse cases in the 2000s.",
        "Enel's fine reflected specific access obstructions in Italy where Terna operated transmission and Enel remained dominant in retail and generation.",
        "Parallel Endesa assets in Spain added cross-border complexity when Enel acquired Endesa, raising questions about market power across Southern Europe.",
        "Fines were modest compared with telecom or tech cases, but they reinforced legally binding open-access duties already in sector regulation.",
        "The episode accelerated political momentum for ownership unbundling—forcing grid operators structurally separate from generation and supply.",
      ],
      whyItMatters: [
        "Electricity bills depend on whether retail markets are truly open.",
        "Grid owners must not sabotage competitors using infrastructure control.",
        "Energy cases blend antitrust with sector-specific regulators.",
      ],
      whatWasClaimed: [
        "Enel obstructed third-party access to essential infrastructure.",
        "Dominance in liberalizing markets was abused.",
        "Competitors faced discriminatory conditions.",
      ],
      theOtherSide: [
        "Enel cited technical and safety constraints on grid access.",
        "Incumbents argued liberalization timelines were unrealistic.",
      ],
      whatItMeansForYou: [
        "Power market choice on your bill requires fair grid access.",
        "Antitrust supports switching suppliers in open markets.",
      ],
      bottomLine:
        "Enel's EU fine was part of a continent-wide push to stop incumbent utilities blocking electricity competition through the wires they control.",
    },
  },
  {
    id: "us-apple-ebooks",
    name: "United States v. Apple (E-Books)",
    shortName: "Apple E-Books",
    companies: ["apple"],
    jurisdictions: ["US"],
    conduct: ["cartel_coordination", "vertical_restraint"],
    yearStart: 2009,
    yearEnd: 2016,
    status: "won_by_plaintiff",
    summary:
      "DOJ and states proved Apple orchestrated a publisher conspiracy to raise e-book prices above Amazon's $9.99 norm by shifting to agency pricing with retail price maintenance—Apple lost at trial and the Supreme Court denied cert.",
    regulatorArgument:
      "Apple acted as hub in a horizontal price-fixing conspiracy among major publishers; agency model and most-favored-nation clauses raised consumer e-book prices.",
    outcome:
      "2013 liability finding after bench trial; injunctions; publisher settlements earlier; Apple paid $450 million consumer settlement after losing appeals.",
    remedies:
      "Injunction on certain MFN and agency terms; monitoring; consumer refunds via settlement.",
    laws: ["sherman-1"],
    markets: ["e-books", "digital publishing"],
    sources: [
      {
        label: "DOJ Apple e-books case",
        url: "https://www.justice.gov/atr/case/united-states-v-apple-inc-et-al",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Agency model launch with iPad", date: "January 2010" },
      { label: "DOJ suit filed", date: "April 11, 2012" },
      { label: "Liability finding", date: "July 10, 2013" },
    ],
    timeline: [
      {
        date: "2009–2010",
        title: "Publishers meet Apple",
        detail:
          "Major publishers allegedly coordinated shift from wholesale to agency pricing before iBookstore launch.",
      },
      {
        date: "2012",
        title: "Government sues",
        detail:
          "DOJ and 33 states sued Apple and publishers; most publishers settled quickly.",
      },
      {
        date: "2013–2016",
        title: "Apple loses appeals",
        detail:
          "Courts upheld that Apple knowingly joined a per se illegal price-fixing conspiracy.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Apple wanted to sell e-books on the iPad but didn't like Amazon's low $9.99 bestsellers. Publishers wanted higher prices too. Together they switched to 'agency' pricing where publishers set retail prices—and e-book prices jumped. Courts said that was illegal price fixing.",
      theStory: [
        "Amazon's Kindle dominated early e-books, often discounting new releases at $9.99. Publishers feared Amazon was devaluing books and training readers to expect cheap digital prices.",
        "Apple prepared to launch the iPad and iBookstore in 2010. Steve Jobs and executives met major publishers—Penguin, HarperCollins, Hachette, Macmillan, Simon & Schuster—to propose agency pricing: publishers set consumer prices, Apple takes 30%, and Amazon must match.",
        "Prosecutors said those publisher meetings were horizontal price fixing—rivals agreeing on pricing models to raise retail levels. Apple was the 'hub' that converted separate vertical deals into a unified conspiracy.",
        "Emails and testimony—including Jobs's famous 'trounce Amazon' motivation—showed Apple knew publishers wanted collective leverage against Amazon's wholesale model.",
        "After the iBookstore launch, bestseller e-book prices rose from $9.99 to $12.99 or $14.99 almost overnight. Consumers noticed immediately.",
        "Publishers settled with DOJ; Apple fought a bench trial and lost. Appeals courts rejected Apple's argument that it only signed individual agency contracts, not a conspiracy.",
        "Apple paid $450 million to consumers under a settlement triggered by its appellate losses—closing one of the defining digital publishing antitrust cases.",
      ],
      whyItMatters: [
        "Digital storefronts can orchestrate supplier cartels if not policed.",
        "Agency pricing is not automatically illegal—but hub-and-spoke conspiracies are.",
        "Consumers feel antitrust outcomes directly in app and e-book prices.",
      ],
      whatWasClaimed: [
        "Publishers conspired to raise e-book prices.",
        "Apple facilitated and joined the conspiracy knowingly.",
        "Retail prices increased harming Kindle and iBook buyers.",
      ],
      theOtherSide: [
        "Apple argued it innovated e-book retail and competed with Amazon.",
        "It said each publisher deal was independent vertical contracting.",
      ],
      whatItMeansForYou: [
        "E-book price spikes in 2010–2012 were partly remedied via settlements.",
        "Platforms negotiating supplier terms must avoid coordinating rivals.",
      ],
      bottomLine:
        "Apple E-Books is the landmark hub-and-spoke price-fixing case of the digital retail era—proving orchestrated agency models can be Sherman Act violations.",
    },
  },
  {
    id: "us-ftc-endo-pharma",
    name: "FTC v. Endo Pharmaceuticals (Pay-for-Delay)",
    shortName: "FTC Endo Pharma",
    companies: ["endo", "watson", "tevapharm"],
    jurisdictions: ["US"],
    conduct: ["exclusivity", "vertical_restraint"],
    yearStart: 2009,
    yearEnd: 2016,
    status: "settled",
    summary:
      "The FTC challenged Endo's reverse-payment settlements delaying generic Lidoderm patches; the case settled with Endo agreeing not to use certain pay-for-delay tactics, part of broader FTC war on branded pharma blocking generics.",
    regulatorArgument:
      "Brand-name Endo paid generic firms to delay cheaper Lidoderm copies, sharing monopoly profits instead of competing—raising costs for pain patients and insurers.",
    outcome:
      "2016 settlement with Endo; related cases against other pharma firms; Supreme Court Actavis framework applied in lower courts.",
    remedies: "Behavioral settlement; FTC monitoring of settlement practices.",
    laws: ["ftc-5"],
    markets: ["prescription pharmaceuticals", "topical pain patches"],
    sources: [
      {
        label: "FTC Endo settlement",
        url: "https://www.ftc.gov/news-events/news/press-releases",
      },
      {
        label: "FTC pay-for-delay enforcement",
        url: "https://www.ftc.gov/legal-library/browse/cases-proceedings",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "FTC complaint filed", date: "March 2014" },
      { label: "Supreme Court Actavis (framework)", date: "2013" },
      { label: "Endo settlement", date: "March 2016" },
    ],
    timeline: [
      {
        date: "2009–2012",
        title: "Patent settlements delay generics",
        detail:
          "Endo allegedly paid generic challengers to stay off market for Lidoderm.",
      },
      {
        date: "2014",
        title: "FTC sues",
        detail: "Commission challenged reverse payments as unfair competition.",
      },
      {
        date: "2016",
        title: "Settlement",
        detail: "Endo agreed to restrictions without admitting liability.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Drug companies sometimes pay generic rivals to stay off the market—splitting the monopoly profit instead of competing. The FTC sued Endo over delayed generic versions of its Lidoderm pain patch and settled for reforms.",
      theStory: [
        "Lidoderm patches treat localized pain. When patents neared expiry, generic drug makers filed FDA applications to sell cheaper copies—potentially saving patients and insurers millions.",
        "Instead of fighting in court to a finish, brand manufacturer Endo allegedly struck 'reverse payment' settlements: paying generic firms to delay launch years in exchange for sharing profits.",
        "The FTC calls these 'pay-for-delay' deals unfair methods of competition under Section 5 and antitrust law. Consumers keep paying brand prices while generics wait in the wings.",
        "The Supreme Court's 2013 Actavis decision said such settlements can violate antitrust law when large cash payments suggest anti-competitive purpose—not every settlement, but suspicious ones face scrutiny.",
        "FTC's Endo complaint targeted Lidoderm agreements with Watson/Teva affiliates as exemplifying the practice across pharma.",
        "Endo settled in 2016, agreeing to avoid certain settlement structures—adding to a string of FTC pharma enforcement actions.",
        "The case matters for anyone filling prescriptions: delayed generics translate directly into higher copays and insurance premiums.",
      ],
      whyItMatters: [
        "Generic delay keeps drug bills high after patents should expire.",
        "FTC uses Section 5 alongside Sherman Act theories.",
        "Settlements can reform industry practices without trial.",
      ],
      whatWasClaimed: [
        "Reverse payments protected Endo's monopoly unlawfully.",
        "Generic entry was delayed without pro-competitive justification.",
        "Consumers and payers overpaid for patches.",
      ],
      theOtherSide: [
        "Pharma argued settlements avoid costly litigation uncertainty.",
        "Endo settled without admitting wrongdoing.",
      ],
      whatItMeansForYou: [
        "Ask pharmacists about generic availability—delays may be legal fights, not science.",
        "Employer health plans bear pay-for-delay costs too.",
      ],
      bottomLine:
        "FTC v. Endo is a core pay-for-delay settlement—part of the agency's push to stop brand drug makers buying off generic competition.",
    },
  },
  {
    id: "hist-us-cigarette-trust",
    name: "United States v. American Tobacco (1911)",
    shortName: "US Tobacco Trust",
    companies: ["american-tobacco"],
    jurisdictions: ["US"],
    conduct: ["merger", "exclusivity", "abuse_of_dominance"],
    yearStart: 1907,
    yearEnd: 1911,
    status: "remedy",
    summary:
      "The Supreme Court ordered dissolution of the American Tobacco trust after finding unlawful monopolization of domestic cigarette manufacturing—parallel to Standard Oil and a early template for structural relief.",
    regulatorArgument:
      "American Tobacco acquired rivals and used exclusive dealing to control leaf tobacco and cigarette distribution, suppressing competition in a rapidly growing consumer market.",
    outcome:
      "1911 divestiture into independent cigarette companies including predecessors of today's major brands.",
    remedies: "Structural breakup into multiple competing cigarette manufacturers.",
    laws: ["sherman-1", "sherman-2"],
    markets: ["cigarettes", "tobacco products"],
    sources: [
      {
        label: "Supreme Court American Tobacco decision",
        url: "https://www.loc.gov/collections/united-states-reports/",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Federal suit filed", date: "1907" },
      { label: "Supreme Court decision", date: "May 29, 1911" },
      { label: "Divestiture implemented", date: "1911–1912" },
    ],
    timeline: [
      {
        date: "1890s–1900s",
        title: "Trust consolidates cigarette makers",
        detail: "James B. Duke's American Tobacco absorbed rivals as machine-rolled cigarettes spread.",
      },
      {
        date: "1911",
        title: "Court orders breakup",
        detail: "Same Supreme Court term as Standard Oil; tobacco trust split into competing firms.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Before health warnings dominated tobacco politics, antitrust broke up the cigarette trust. American Tobacco had swallowed competitors to control the new mass-market cigarette industry. The Supreme Court ordered it split—like Standard Oil in the same era.",
      theStory: [
        "Machine-made cigarettes transformed tobacco from cigars and chew into a mass consumer product. James B. Duke built American Tobacco by acquiring brands and controlling distribution.",
        "The trust secured leaf tobacco supplies, exclusive dealer arrangements, and predatory pricing against independents. Competitors sold out or failed.",
        "Federal prosecutors included American Tobacco in the trust-busting wave alongside Standard Oil. The legal question was familiar: when does aggressive consolidation become illegal monopolization?",
        "The Supreme Court applied developing 'rule of reason' doctrine and concluded American Tobacco's combination unreasonably restrained trade.",
        "Structural relief followed: the company divided into Liggett & Myers, Lorillard, R.J. Reynolds, and other successors that competed for decades.",
        "Public health regulation later overshadowed competition policy in tobacco, but the 1911 case remains a foundational monopolization precedent.",
        "Modern debates about breakups cite tobacco alongside oil as early examples of courts choosing structural remedies over behavioral promises.",
      ],
      whyItMatters: [
        "Shows antitrust once targeted consumer product monopolies, not only industrial giants.",
        "Structural divestiture can create durable competitors from a trust.",
        "Historical context for later tobacco regulation and litigation.",
      ],
      whatWasClaimed: [
        "American Tobacco monopolized cigarette manufacturing.",
        "Acquisitions and exclusives foreclosed rivals.",
        "Breakup was necessary to restore competition.",
      ],
      theOtherSide: [
        "Trust argued scale lowered prices and modernized production.",
        "Defendants said competition from new brands persisted regionally.",
      ],
      whatItMeansForYou: [
        "Brand competition in cigarettes partly traces to this mandated split.",
        "Antitrust history includes sin products—not only tech.",
      ],
      bottomLine:
        "The 1911 American Tobacco breakup is a lighter-touch historical cousin to Standard Oil—early proof that courts would dismantle consumer monopolies.",
    },
  },
  {
    id: "hist-us-alcoa-monopoly",
    name: "United States v. Aluminum Co. of America (Alcoa)",
    shortName: "US Alcoa (1945)",
    companies: ["alcoa"],
    jurisdictions: ["US"],
    conduct: ["predatory_pricing", "refusal_to_deal", "abuse_of_dominance"],
    yearStart: 1937,
    yearEnd: 1945,
    status: "won_by_defendant",
    summary:
      "After decades of litigation, the Second Circuit famously held Alcoa illegally monopolized virgin ingot aluminum by maintaining market share and expanding capacity ahead of demand—though later proceedings did not break up the company.",
    regulatorArgument:
      "Alcoa controlled most US aluminum production, excluded rivals through exclusive contracts and strategic capacity, and kept prices high while suppressing competition.",
    outcome:
      "1945 liability finding for monopolization; subsequent remedy phase did not dismantle Alcoa; Reynolds and Kaiser emerged as competitors over time.",
    remedies: "Limited structural relief; later divestitures of certain foreign interests ordered.",
    laws: ["sherman-2"],
    markets: ["virgin aluminum ingot", "aluminum fabrication inputs"],
    sources: [
      {
        label: "Second Circuit Alcoa opinion (1945)",
        url: "https://www.leagle.com/decision/1945115148f2d41611129",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Original suit filed", date: "1937" },
      { label: "Second Circuit decision (Judge Learned Hand)", date: "March 12, 1945" },
      { label: "Remedy proceedings", date: "1945–1950s" },
    ],
    timeline: [
      {
        date: "1888–1937",
        title: "Alcoa dominates new industry",
        detail:
          "Pioneer aluminum producer grew with patents and scale, supplying aircraft and packaging.",
      },
      {
        date: "1945",
        title: "Learned Hand's monopolization ruling",
        detail:
          "Court held 90% share and preemptive capacity expansion could violate Sherman Section 2 even without 'bad' intent.",
      },
      {
        date: "1950s",
        title: "Competitors grow post-war",
        detail: "Reynolds and Kaiser expanded; Alcoa remained major but not sole player.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Alcoa invented the American aluminum industry—and controlled almost all of it for decades. Judge Learned Hand's famous 1945 opinion said keeping 90% market share by expanding faster than demand could be illegal monopolization, even if you never did anything 'evil.'",
      theStory: [
        "Aluminum went from exotic metal to aircraft and kitchen staple in the early 1900s. Alcoa held key patents and built smelters nationwide, becoming synonymous with the product.",
        "The government sued twice. The first case failed; the second, after World War II, produced Judge Learned Hand's intellectually towering opinion on monopolization law.",
        "Hand agreed Alcoa was an excellent competitor—perhaps too excellent. By expanding capacity to meet all rising demand and maintaining ~90% share for years, Alcoa left no room for rivals to gain footholds.",
        "The opinion controversially suggested monopolization can occur without classic predatory intent: 'Thirty-four years of constantly expanding capacity' can itself exclude competition.",
        "Liability did not immediately break Alcoa apart. Remedy proceedings ordered some divestitures abroad but allowed the integrated firm to continue domestically as competitors finally scaled.",
        "Alcoa became required reading in law schools for Section 2 doctrine—balancing praise for efficiency against fear of perpetual dominance.",
        "Modern tech monopolization cases cite Alcoa when arguing growth investments can foreclose rivals even absent secret cartels.",
      ],
      whyItMatters: [
        "Defines US monopolization law beyond cartels and fraud.",
        "Capacity expansion can be exclusionary—not only price cuts.",
        "Remedy shortfall shows liability does not always mean breakup.",
      ],
      whatWasClaimed: [
        "Alcoa monopolized virgin ingot aluminum.",
        "Exclusive contracts and control of bauxite sources excluded rivals.",
        "Preemptive expansion maintained unlawful dominance.",
      ],
      theOtherSide: [
        "Alcoa argued superior efficiency and lower consumer prices.",
        "Hand acknowledged no 'evil' intent but still found violation.",
      ],
      whatItMeansForYou: [
        "Industrial input monopolies affect planes, cars, and packaging costs.",
        "Section 2 remains about market structure, not only bad behavior.",
      ],
      bottomLine:
        "Alcoa is the intellectual cornerstone of American monopolization law—famous for Hand's ruling that great competition can still be illegal monopoly.",
    },
  },
  {
    id: "us-eastman-kodak",
    name: "Eastman Kodak v. Image Technical Services",
    shortName: "US Kodak (1992)",
    companies: ["kodak"],
    jurisdictions: ["US"],
    conduct: ["refusal_to_deal", "abuse_of_dominance"],
    yearStart: 1987,
    yearEnd: 1992,
    status: "won_by_plaintiff",
    summary:
      "The Supreme Court allowed independent service organizations to sue Kodak for monopolizing aftermarket repair and parts for copiers and equipment by tying OEM parts to service and switching between competitive equipment and aftermarket markets.",
    regulatorArgument:
      "Kodak leveraged control over proprietary parts to exclude independent servicers and raise aftermarket prices despite competition in initial equipment sales.",
    outcome:
      "1992 Supreme Court ruling revived ISO antitrust claims; Kodak later settled; influential market-definition precedent.",
    remedies: "Private litigation settlement; access reforms in some lines.",
    laws: ["sherman-2"],
    markets: ["copier equipment", "aftermarket service and parts"],
    sources: [
      {
        label: "Supreme Court Kodak opinion",
        url: "https://supreme.justia.com/cases/federal/us/504/451/",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "ISO suit filed", date: "1987" },
      { label: "Supreme Court decision", date: "June 8, 1992" },
      { label: "Settlement", date: "1990s" },
    ],
    timeline: [
      {
        date: "1980s",
        title: "Independent servicers blocked",
        detail:
          "ISOs alleged Kodak refused parts and changed policies to monopolize repair after selling equipment competitively.",
      },
      {
        date: "1992",
        title: "Supreme Court allows case",
        detail:
          "Court rejected Kodak's single-brand market argument; customers could experience aftermarket lock-in.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Kodak sold copiers in a competitive market but controlled repair parts and service. Independent repair shops sued, saying Kodak monopolized the aftermarket. The Supreme Court agreed customers could be trapped after buying equipment—and allowed the case to proceed.",
      theStory: [
        "Businesses buy copiers and microfilm equipment from several brands. Initial purchase prices look competitive. But years of maintenance and proprietary parts may matter more over the machine's life.",
        "Independent service organizations (ISOs) repaired Kodak machines for customers seeking lower labor rates. Kodak allegedly restricted parts access and changed policies to drive ISOs out.",
        "Kodak argued there is only one 'Kodak equipment' market—if equipment sales face rivalry, aftermarket cannot be separate monopoly. The Supreme Court disagreed in a practical way.",
        "Customers who already owned Kodak gear faced switching costs. Even if Kodak competed on first sale, it could exploit locked-in users on service—classic aftermarket monopolization theory.",
        "The 1992 decision revived ISO claims and influenced how courts define product markets when primary and secondary markets interact.",
        "Kodak eventually settled rather than risk trial damages. The case foreshadowed modern repair-rights debates in cars, phones, and farm equipment.",
        "For small repair businesses, Kodak stands for the idea that dominance in parts and service can be unlawful even when the original product seemed competitive.",
      ],
      whyItMatters: [
        "Aftermarket lock-in affects total cost of ownership.",
        "Market definition can split equipment from service.",
        "Repair competition protects small businesses and consumers.",
      ],
      whatWasClaimed: [
        "Kodak monopolized aftermarket for its equipment.",
        "Parts refusals excluded ISOs.",
        "Customers lacked effective alternatives post-purchase.",
      ],
      theOtherSide: [
        "Kodak cited quality and safety of authorized service.",
        "It argued integrated equipment-service pricing benefited buyers initially.",
      ],
      whatItMeansForYou: [
        "Right-to-repair fights echo Kodak's aftermarket logic.",
        "Check service and parts costs—not just sticker price.",
      ],
      bottomLine:
        "Kodak (1992) is the classic aftermarket monopolization case—where competitive equipment sales hide expensive repair lock-in.",
    },
  },
  {
    id: "us-syufy-cinemas",
    name: "United States v. Syufy Enterprises",
    shortName: "US Syufy Cinemas",
    companies: ["syufy"],
    jurisdictions: ["US"],
    conduct: ["merger", "exclusivity"],
    yearStart: 1982,
    yearEnd: 1990,
    status: "won_by_plaintiff",
    summary:
      "Courts blocked Syufy's acquisition of competing first-run theaters in Las Vegas and later condemned circuit-wide film clearance practices that allocated movies geographically among Syufy theaters.",
    regulatorArgument:
      "Syufy acquisitions and clearances reduced first-run movie competition in local markets, raising ticket prices and limiting consumer choice.",
    outcome:
      "Merger blocked in Las Vegas; later consent addressing clearances; influential local market theater cases.",
    remedies: "Injunction against acquisition; limits on film licensing exclusivity.",
    laws: ["clayton-7", "sherman-1"],
    markets: ["first-run movie theaters", "local cinema exhibition"],
    sources: [
      {
        label: "Ninth Circuit Syufy decision",
        url: "https://openjurist.org/",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Las Vegas acquisition challenge", date: "1982–1986" },
      { label: "Clearance practices suit", date: "1988–1990" },
    ],
    timeline: [
      {
        date: "1980s",
        title: "Syufy expands western circuits",
        detail: "Family-owned chain bought rivals in multiple cities.",
      },
      {
        date: "1986",
        title: "Las Vegas deal blocked",
        detail: "Courts found undue concentration in local first-run exhibition.",
      },
      {
        date: "1990",
        title: "Clearance remedies",
        detail: "Government challenged agreements dividing films among Syufy theaters by territory.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Syufy ran movie theaters across the West and tried to buy competitors in Las Vegas. The government blocked the deal and later challenged 'clearances'—deals with studios that kept hit movies out of nearby rival theaters.",
      theStory: [
        "Movie exhibition is intensely local: consumers choose among theaters within driving distance. Owning multiple first-run sites in one city can give leverage over studios and rival independents.",
        "Syufy Enterprises grew through acquisitions in California, Nevada, and beyond. When it sought Las Vegas rivals, DOJ argued the market would tip to effective monopoly for first-run films.",
        "Courts agreed local geographic markets matter—even national chains face antitrust locally. The Las Vegas acquisition was stopped.",
        "Separately, Syufy used 'clearances': agreements with distributors preventing the same film from playing at another Syufy theater too close to the first—also blocking competitors from getting prints.",
        "Antitrust enforcers said clearances allocated films like cartel territories, softening competition for blockbuster openings.",
        "Consent decrees and litigation reshaped how circuits negotiate film access—precursor to later studio-exhibition vertical restraints cases.",
        "Syufy shows merger and conduct enforcement intersect in fragmented local retail markets.",
      ],
      whyItMatters: [
        "Local market definition decides theater merger outcomes.",
        "Film clearances can harm independent cinema operators.",
        "Entertainment antitrust is not only Hollywood studios.",
      ],
      whatWasClaimed: [
        "Las Vegas merger lessened first-run competition.",
        "Clearances unreasonably restrained film distribution.",
        "Consumers faced fewer choices and higher prices.",
      ],
      theOtherSide: [
        "Syufy argued new screens benefited consumers.",
        "Clearances protected investments in luxury venues.",
      ],
      whatItMeansForYou: [
        "Ticket prices depend on local theater competition.",
        "Independent cinemas rely on antitrust to access films.",
      ],
      bottomLine:
        "Syufy is the textbook local-market cinema case—blocking concentration and challenging film clearance tactics.",
    },
  },
  {
    id: "hist-leegin-rpm",
    name: "Leegin Creative Leather Products v. PSKS (2007)",
    shortName: "Leegin RPM",
    companies: ["leegin"],
    jurisdictions: ["US"],
    conduct: ["resale_restriction", "vertical_restraint"],
    yearStart: 1997,
    yearEnd: 2007,
    status: "won_by_defendant",
    summary:
      "The Supreme Court overruled Dr. Miles and held vertical minimum resale price maintenance should be judged under rule of reason—not per se illegal—allowing manufacturers more freedom to set floor prices for retailers.",
    regulatorArgument:
      "PSKS argued Leegin's minimum price policies for Brighton brand accessories were per se unlawful vertical price fixing harming discount retailers.",
    outcome:
      "2007 Supreme Court 5–4 decision for Leegin; rule-of-reason analysis required; states could still ban RPM under state law.",
    remedies: "N/A—liability framework change.",
    laws: ["sherman-1"],
    markets: ["retail leather goods", "vertical distribution"],
    sources: [
      {
        label: "Supreme Court Leegin opinion",
        url: "https://supreme.justia.com/cases/federal/us/551/877/",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "PSKS loses discount line", date: "1997–2002" },
      { label: "Fifth Circuit rule-of-reason trial", date: "2004" },
      { label: "Supreme Court reverses per se rule", date: "June 28, 2007" },
    ],
    timeline: [
      {
        date: "1990s",
        title: "Minimum price policy enforced",
        detail: "Leegin cut off Kay's Kloset for discounting Brighton leather goods.",
      },
      {
        date: "2007",
        title: "Per se ban overturned",
        detail: "Court said RPM can promote interbrand competition and service.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Can a manufacturer require stores not to discount its products below a set price? For a century Dr. Miles said no—automatically illegal. Leegin changed that: minimum resale prices are judged case-by-case, not banned outright.",
      theStory: [
        "Vertical minimum resale price maintenance (RPM) happens when a brand tells retailers the lowest price they may advertise or charge—protecting brand image and store services.",
        "Kay's Kloset discounted Brighton belts and purses; Leegin dropped them as a dealer. PSKS sued claiming illegal price fixing between manufacturer and retailer.",
        "Lower courts applied the old Dr. Miles per se rule: RPM was automatically a Sherman Act violation, full stop.",
        "The Supreme Court's 5–4 Leegin decision said economics had evolved. Minimum prices might help brands compete against rivals by ensuring dealers invest in service and showroom experience.",
        "Instead of automatic illegality, courts must apply rule of reason—weighing pro-competitive benefits against harm in each market.",
        "Justice Kennedy's majority sparked fierce dissent fearing higher consumer prices; some states enacted statutes keeping RPM per se illegal locally.",
        "Leegin remains controversial—manufacturers gained flexibility, consumer advocates warn of higher retail prices, and online discounting battles continue.",
      ],
      whyItMatters: [
        "Changes default legality of MAP policies and dealer terminations.",
        "Small retailers may gain service protection or face higher floors.",
        "State and federal law can diverge on RPM.",
      ],
      whatWasClaimed: [
        "Leegin's minimum prices were unlawful vertical price fixing.",
        "Discount retailers were harmed anticompetitively.",
        "Per se rule should persist.",
      ],
      theOtherSide: [
        "Leegin argued RPM promoted brand competition and quality service.",
        "Court agreed not all RPM is anticompetitive.",
      ],
      whatItMeansForYou: [
        "Manufacturer MAP policies post-Leegin need rule-of-reason defense.",
        "Discount shoppers may see fewer deep cuts on premium brands.",
      ],
      bottomLine:
        "Leegin overturned a 96-year-old ban on minimum resale prices—one of the most pro-business vertical restraint shifts in modern antitrust.",
    },
  },
  {
    id: "hist-dr-miles-rpm",
    name: "Dr. Miles Medical Co. v. John D. Park & Sons (1911)",
    shortName: "Dr. Miles RPM",
    companies: ["dr-miles"],
    jurisdictions: ["US"],
    conduct: ["resale_restriction", "vertical_restraint"],
    yearStart: 1908,
    yearEnd: 1911,
    status: "won_by_plaintiff",
    summary:
      "The Supreme Court held vertical agreements fixing minimum resale prices were per se illegal under the Sherman Act—establishing the rule Leegin later overturned in 2007.",
    regulatorArgument:
      "Dr. Miles's agency contracts fixing retail prices for proprietary medicines unlawfully restrained trade by controlling downstream prices.",
    outcome:
      "1911 per se ban on vertical minimum RPM; dominated US law for nearly a century.",
    remedies: "N/A—doctrinal precedent.",
    laws: ["sherman-1"],
    markets: ["patent medicines", "wholesale distribution"],
    sources: [
      {
        label: "Supreme Court Dr. Miles opinion",
        url: "https://supreme.justia.com/cases/federal/us/220/373/",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Distribution dispute arises", date: "1908" },
      { label: "Supreme Court decision", date: "January 3, 1911" },
      { label: "Rule overturned by Leegin", date: "2007" },
    ],
    timeline: [
      {
        date: "1900s",
        title: "Patent medicine distribution",
        detail: "Dr. Miles used agency contracts to control retail pricing of remedies.",
      },
      {
        date: "1911",
        title: "Per se vertical RPM ban",
        detail: "Court separated vertical price restraints from patent rights to fix prices.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "A drug company tried to control what pharmacies charged for its medicines. The Supreme Court said manufacturers cannot agree with stores to set minimum prices—that was automatic illegal price fixing until Leegin changed the rule in 2007.",
      theStory: [
        "Dr. Miles sold proprietary medicines through distributors bound by agency contracts requiring set retail prices—common today as MAP policies, revolutionary then legally.",
        "When wholesaler John D. Park sold below required prices, Dr. Miles sued to enforce the contract terms.",
        "The Supreme Court rejected the strategy: vertical agreements fixing minimum resale prices were per se unreasonable restraints of trade, even if the manufacturer held patents.",
        "The opinion drew a bright line—horizontal price fixing among competitors is illegal; vertical price maintenance got the same per se treatment, unlike other vertical restraints judged case-by-case.",
        "For ninety-six years Dr. Miles blocked most minimum RPM programs unless hidden in subtler policies.",
        "Economists later argued the rule harmed interbrand competition and consumer service; Leegin finally abandoned per se treatment in 2007.",
        "Reading Dr. Miles today shows how antitrust doctrine swings between bright-line bans and economic rule-of-reason analysis.",
      ],
      whyItMatters: [
        "Historical foundation for vertical price restraint law.",
        "Explains why Leegin was a seismic shift.",
        "Distribution contracts still cite Dr. Miles history in briefing.",
      ],
      whatWasClaimed: [
        "Vertical minimum price contracts restrain trade per se.",
        "Patent rights do not authorize price fixing downstream.",
        "Dr. Miles could not enforce fixed retail prices.",
      ],
      theOtherSide: [
        "Dr. Miles argued agency status avoided restraint characterization.",
        "Later commentators said the economics were underdeveloped.",
      ],
      whatItMeansForYou: [
        "Modern MAP policies exist in Leegin's shadow, not Dr. Miles's ban.",
        "Historical cases shape today's dealer termination disputes.",
      ],
      bottomLine:
        "Dr. Miles created America's century-long automatic ban on minimum resale price maintenance—until Leegin retired it.",
    },
  },
  {
    id: "us-continental-tv-cable",
    name: "United States v. Topco (Continental TV)",
    shortName: "Continental TV",
    companies: ["topco"],
    jurisdictions: ["US"],
    conduct: ["cartel_coordination", "market_access"],
    yearStart: 1966,
    yearEnd: 1972,
    status: "won_by_plaintiff",
    summary:
      "The Supreme Court held Topco's cooperative of small grocers could not allocate exclusive geographic territories among members—horizontal market division among competitors is per se illegal even for buying cooperatives.",
    regulatorArgument:
      "Topco members fixed territories for private-label sales, eliminating competition among cooperative members in branded and Topco-label products.",
    outcome:
      "1972 Supreme Court affirmed per se rule against horizontal territorial allocation; cooperatives must compete where they overlap.",
    remedies: "Injunction against territorial exclusivity among members.",
    laws: ["sherman-1"],
    markets: ["grocery private labels", "supermarket cooperatives"],
    sources: [
      {
        label: "Supreme Court Topco opinion",
        url: "https://supreme.justia.com/cases/federal/us/405/596/",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "DOJ suit filed", date: "1966" },
      { label: "Supreme Court decision", date: "March 29, 1972" },
      { label: "Per se territorial allocation condemned", date: "1972" },
    ],
    timeline: [
      {
        date: "1960s",
        title: "Topco cooperative expands",
        detail:
          "Small grocers jointly sourced Topco brand goods with territorial exclusivity.",
      },
      {
        date: "1972",
        title: "Court rejects immunity claim",
        detail:
          "Cooperative members treated as horizontal competitors for market division.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Small grocery chains banded together to buy store-brand products—but also agreed not to compete in each other's territories. The Supreme Court said that geographic split among competitors is classic illegal cartel behavior, cooperative or not.",
      theStory: [
        "Topco was a cooperative helping independent supermarkets compete against national chains via private-label products and joint purchasing.",
        "Members received exclusive territories for Topco-branded goods—if one grocer had a region, another member would not sell Topco labels there.",
        "DOJ sued, calling the arrangement horizontal market allocation: competitors dividing turf instead of competing for customers.",
        "Topco argued cooperatives need territorial peace to invest in private labels and challenge big chains—pro-competitive justification under rule of reason.",
        "The Supreme Court disagreed 6–3: horizontal territorial restrictions among economically independent members are per se illegal, regardless of cooperative label.",
        "The case is often taught alongside Continental TV v. GTE Sylvania (vertical non-price restraints get rule of reason)—hence the 'Continental TV' shorthand in antitrust courses.",
        "Buying cooperatives still exist, but they cannot carve exclusive sales territories among members competing for shoppers.",
      ],
      whyItMatters: [
        "Cooperative form does not shield horizontal market division.",
        "Small business joint ventures still face cartel rules.",
        "Pairs with Sylvania for vertical/horizontal contrast.",
      ],
      whatWasClaimed: [
        "Topco members illegally allocated territories.",
        "Horizontal restraints were per se unlawful.",
        "Consumers lost benefits of member-vs-member competition.",
      ],
      theOtherSide: [
        "Topco said exclusivity enabled brand investment against national chains.",
        "Dissent favored rule-of-reason for cooperatives.",
      ],
      whatItMeansForYou: [
        "Local grocers' co-ops must compete where footprints overlap.",
        "Joint ventures need antitrust counsel on territory clauses.",
      ],
      bottomLine:
        "Topco (Continental TV) confirms that dividing markets among cooperative members is still a cartel—per se illegal.",
    },
  },
  {
    id: "us-brunswick-bowling",
    name: "Brunswick Corp. v. Pueblo Bowl-O-Mat (1977)",
    shortName: "Brunswick Bowling",
    companies: ["brunswick"],
    jurisdictions: ["US"],
    conduct: ["merger", "predatory_pricing"],
    yearStart: 1964,
    yearEnd: 1977,
    status: "won_by_defendant",
    summary:
      "The Supreme Court held antitrust plaintiffs must show antitrust injury—not merely that a merger injured a competitor—when challenging acquisitions that may have benefited consumers through lower prices.",
    regulatorArgument:
      "Independent bowling alley operators claimed Brunswick's acquisition of failing centers and competitive pricing harmed them as rivals.",
    outcome:
      "1977 Supreme Court reversed damages award; clarified antitrust injury requires harm to competition, not competitors alone.",
    remedies: "N/A—doctrinal standing/injury precedent.",
    laws: ["clayton-7", "sherman-2"],
    markets: ["bowling alleys", "recreational entertainment"],
    sources: [
      {
        label: "Supreme Court Brunswick opinion",
        url: "https://supreme.justia.com/cases/federal/us/429/477/",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Brunswick acquisitions", date: "1960s" },
      { label: "Competitor suit filed", date: "1960s–1970s" },
      { label: "Supreme Court decision", date: "June 13, 1977" },
    ],
    timeline: [
      {
        date: "1960s",
        title: "Brunswick buys distressed alleys",
        detail:
          "Equipment supplier expanded into operating bowling centers, sometimes cutting prices.",
      },
      {
        date: "1977",
        title: "Antitrust injury doctrine clarified",
        detail:
          "Court said lower prices from acquisitions do not automatically give rivals antitrust damages.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Brunswick bought struggling bowling alleys and charged lower prices. Rival alley owners sued, saying the merger hurt them. The Supreme Court said antitrust protects competition, not competitors—lower prices for bowlers aren't an antitrust injury to rivals.",
      theStory: [
        "Brunswick sold bowling equipment and operated alleys. It acquired failing centers at low prices and ran them aggressively, sometimes undercutting independent operators.",
        "Pueblo Bowl-O-Mat and others sued under Clayton Act Section 7 and Sherman Act, claiming the acquisitions created unfair competition and price pressure harming them as rivals.",
        "The case reached the Supreme Court on whether lost profits from vigorous competition after a merger count as 'antitrust injury.'",
        "The Court distinguished injury to competitors from injury to competition. If consumers enjoy lower prices and output remains robust, rivals' lost profits alone do not establish antitrust harm.",
        "Plaintiffs must show the merger hurt the competitive process—not merely that a tougher rival emerged.",
        "Brunswick became a staple citation in merger defense and damages briefing—especially when plaintiffs are displaced competitors crying foul over price cuts.",
        "The bowling facts are quirky, but the principle governs modern retail and tech merger damages fights.",
      ],
      whyItMatters: [
        "Clarifies who can recover antitrust damages post-merger.",
        "Protects pro-consumer price competition from rival lawsuits.",
        "Merger challengers need theory beyond 'they cut prices.'",
      ],
      whatWasClaimed: [
        "Brunswick acquisitions lessened competition locally.",
        "Predatory or unfair pricing injured rival operators.",
        "Damages should compensate lost profits.",
      ],
      theOtherSide: [
        "Brunswick said rescuing failing alleys helped consumers.",
        "Court agreed lower prices aren't antitrust injury per se.",
      ],
      whatItMeansForYou: [
        "Antitrust isn't a shield for competitors losing to better prices.",
        "Merger cases need consumer/competition harm theories.",
      ],
      bottomLine:
        "Brunswick v. Pueblo Bowl-O-Mat teaches that antitrust injury means harm to competition—not just a competitor's bruised margins.",
    },
  },
  {
    id: "hist-illinois-brick-doctrine",
    name: "Illinois Brick Co. v. Illinois (1977)",
    shortName: "Illinois Brick",
    companies: ["illinois-brick"],
    jurisdictions: ["US"],
    conduct: ["price_fix"],
    yearStart: 1975,
    yearEnd: 1977,
    status: "won_by_defendant",
    summary:
      "The Supreme Court held indirect purchasers cannot sue for overcharges passed through the distribution chain—only direct purchasers have federal antitrust standing—creating the Illinois Brick doctrine with limited exceptions.",
    regulatorArgument:
      "State and indirect purchasers sought damages from concrete block price fixing, arguing overcharges rippled to end users.",
    outcome:
      "1977 doctrine bars most indirect purchaser federal damages suits; states may authorize pass-on claims under state law.",
    remedies: "N/A—standing doctrine.",
    laws: ["sherman-1", "clayton-4"],
    markets: ["concrete blocks", "construction materials"],
    sources: [
      {
        label: "Supreme Court Illinois Brick opinion",
        url: "https://supreme.justia.com/cases/federal/us/431/720/",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Concrete block cartel litigation", date: "1970s" },
      { label: "Supreme Court decision", date: "June 14, 1977" },
      { label: "Repeal efforts in Congress", date: "Various" },
    ],
    timeline: [
      {
        date: "1970s",
        title: "Price fixing in concrete blocks",
        detail: "Manufacturers allegedly fixed block prices sold through intermediaries.",
      },
      {
        date: "1977",
        title: "Indirect purchaser bar announced",
        detail:
          "Court feared duplicate recovery and complex pass-on calculations.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "If a manufacturer price-fixes and a wholesaler passes the overcharge to a retailer who passes it to you, can you sue? Illinois Brick says usually no—only the direct buyer can sue in federal court. It's one of antitrust's most debated procedural rules.",
      theStory: [
        "Antitrust damages aim to deter cartels and compensate victims. But supply chains have many layers—manufacturer, distributor, retailer, end customer. Who counts as the injured party?",
        "Illinois sued concrete block makers on behalf of indirect purchasers who paid inflated prices embedded in construction costs. Defendants argued only direct purchasers should sue to avoid chaos.",
        "The Supreme Court agreed: federal antitrust law generally allows only direct purchasers to recover overcharges. Indirect purchasers must rely on state laws or hope direct buyers sue and share recovery.",
        "The rationale: preventing double recovery (manufacturer paying both distributor and consumer) and avoiding impossibly complex 'pass-on' math in every case.",
        "Critics say cartel members prefer Illinois Brick because direct buyers may be few, friendly, or slow to sue while consumers overpay silently.",
        "Some states enacted 'Illinois Brick repealer' statutes letting end users sue under state antitrust law. California's Cartwright Act is a famous example.",
        "The doctrine appears in every consumer class action debate—from smartphones to payment fees—when plaintiffs try to aggregate indirect purchaser claims.",
      ],
      whyItMatters: [
        "Shapes who can bring private antitrust class actions.",
        "Explains why some consumer overcharge cases fail procedurally.",
        "State/federal divergence creates complex litigation strategy.",
      ],
      whatWasClaimed: [
        "Indirect purchasers suffered overcharges from block cartel.",
        "Pass-on should not bar end-user standing.",
        "Federal law should allow full compensation.",
      ],
      theOtherSide: [
        "Defendants feared duplicative damages and complexity.",
        "Court prioritized direct purchaser suits as clean remedy.",
      ],
      whatItMeansForYou: [
        "You may lack federal standing even if prices rose downstream.",
        "State antitrust laws may offer alternate paths.",
      ],
      bottomLine:
        "Illinois Brick is the competition-law doctrine case—defining who can sue when overcharges pass through middlemen.",
    },
  },
  {
    id: "hist-verizon-trinko",
    name: "Verizon Communications v. Law Offices of Curtis V. Trinko (2004)",
    shortName: "Trinko",
    companies: ["verizon"],
    jurisdictions: ["US"],
    conduct: ["refusal_to_deal"],
    yearStart: 1997,
    yearEnd: 2004,
    status: "won_by_defendant",
    summary:
      "The Supreme Court sharply limited antitrust duties to deal with rivals, holding Verizon's alleged failure to share network access with competitors did not state a standalone Sherman Act claim beyond telecom regulation.",
    regulatorArgument:
      "Trinko argued Verizon sabotaged mandatory network sharing under telecom law, harming competitive local service providers.",
    outcome:
      "2004 unanimous decision rejected broad refusal-to-deal monopolization claims; antitrust skepticism toward compelled assistance to rivals.",
    remedies: "N/A—doctrinal narrowing of Section 2.",
    laws: ["sherman-2"],
    markets: ["telecommunications", "local exchange service"],
    sources: [
      {
        label: "Supreme Court Trinko opinion",
        url: "https://supreme.justia.com/cases/federal/us/540/398/",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Telecom Act unbundling duties", date: "1996" },
      { label: "Trinko complaint", date: "1997–2001" },
      { label: "Supreme Court decision", date: "January 13, 2004" },
    ],
    timeline: [
      {
        date: "1996",
        title: "Telecom Act opens local networks",
        detail: "Incumbent phone companies must provide rivals access under FCC rules.",
      },
      {
        date: "2004",
        title: "Antitrust claim rejected",
        detail:
          "Court said regulatory regime—not antitrust—should govern network sharing disputes.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Must a dominant company help its rivals use its network? After telecom deregulation, competitors sued Verizon for foot-dragging on sharing phone lines. The Supreme Court said antitrust rarely forces companies to assist competitors—especially when sector regulators already set the rules.",
      theStory: [
        "The 1996 Telecommunications Act required incumbent local phone companies to lease network elements to rivals entering local service markets.",
        "Competitive local exchange carriers (CLECs) accused Verizon of poor cooperation—delays and quality issues that undermined mandated access.",
        "Trinko's antitrust suit claimed Verizon monopolized by refusing to deal properly—a classic Section 2 theory when a dominant firm cuts off essential inputs.",
        "The Supreme Court unanimously pushed back. Justice Scalia wrote that antitrust law generally does not impose duties to deal, with rare exceptions like Aspen Skiing.",
        "Where detailed sector regulation already governs access, adding antitrust liability risks duplicative oversight and discourages pro-competitive investment.",
        "Trinko became a shield for dominant firms facing 'refusal to deal' claims—cited in tech, pharma, and platform cases when rivals demand interoperability.",
        "Critics say Trinko weakened monopolization enforcement; defenders say it prevents courts from micromanaging business relationships.",
      ],
      whyItMatters: [
        "Narrows refusal-to-deal monopolization claims in the US.",
        "Interaction between sector regulation and antitrust.",
        "Platforms cite Trinko against forced sharing mandates.",
      ],
      whatWasClaimed: [
        "Verizon monopolized by degrading mandated network access.",
        "Antitrust should supplement telecom rules.",
        "CLECs lost competitive opportunity.",
      ],
      theOtherSide: [
        "Verizon said regulatory processes address access disputes.",
        "Court feared chilling investment if antitrust compelled sharing.",
      ],
      whatItMeansForYou: [
        "Phone and broadband competition disputes often stay at agencies, not antitrust courts.",
        "Dominant firms have stronger defenses against sharing orders under Trinko.",
      ],
      bottomLine:
        "Trinko tells rivals that antitrust rarely forces dominant companies to help competitors—especially when regulators already wrote access rules.",
    },
  },
  {
    id: "us-linkline-dsl",
    name: "Pacific Bell v. linkLine (2009)",
    shortName: "linkLine DSL",
    companies: ["att"],
    jurisdictions: ["US"],
    conduct: ["predatory_pricing", "discrimination"],
    yearStart: 2003,
    yearEnd: 2009,
    status: "won_by_defendant",
    summary:
      "The Supreme Court rejected a 'price squeeze' claim against AT&T's wholesale and retail DSL pricing, holding plaintiffs must show either unlawful wholesale refusal or predatory retail pricing—not merely unfavorable margin between the two.",
    regulatorArgument:
      "Independent DSL retailers alleged AT&T set wholesale access prices so high and retail prices so low they could not compete—a margin squeeze without duty to deal.",
    outcome:
      "2009 decision dismissed squeeze theory when no standalone wholesale or retail violation shown; companion to Trinko skepticism.",
    remedies: "N/A—doctrine limiting price squeeze claims.",
    laws: ["sherman-2"],
    markets: ["DSL broadband", "wholesale telecommunications"],
    sources: [
      {
        label: "Supreme Court linkLine opinion",
        url: "https://supreme.justia.com/cases/federal/us/555/438/",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "DSL resale competitors emerge", date: "Early 2000s" },
      { label: "Ninth Circuit allowed squeeze claim", date: "2007" },
      { label: "Supreme Court reverses", date: "February 25, 2009" },
    ],
    timeline: [
      {
        date: "2003",
        title: "linkLine sues AT&T",
        detail:
          "Independent DSL provider claimed wholesale/retail pricing trapped it between high inputs and low retail.",
      },
      {
        date: "2009",
        title: "Price squeeze theory rejected",
        detail:
          "Court required separate wholesale or retail antitrust violation.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Independent internet providers resold AT&T's DSL lines. They sued, saying AT&T charged them high wholesale rates while undercutting them on retail DSL—squeezing their margins. The Supreme Court said that's not enough unless wholesale or retail pricing alone breaks antitrust law.",
      theStory: [
        "After telecom opening, rivals could resell incumbent phone companies' DSL broadband to consumers. They depended on wholesale access to the incumbent's network.",
        "linkLine accused AT&T (Pacific Bell) of a 'price squeeze': wholesale rates so high and retail DSL prices so low independents could not profit.",
        "Lower courts split on whether a squeeze itself violates Sherman Act Section 2 without predatory retail pricing or illegal wholesale denial.",
        "The Supreme Court, building on Trinko, said no standalone squeeze claim exists when there is no antitrust duty to provide wholesale access on favorable terms.",
        "Plaintiffs must prove either predatory pricing at retail—below cost with recoupment—or an independent wholesale violation.",
        "linkLine closed a path for mid-sized telecom rivals to attack integrated incumbents via margin arithmetic alone.",
        "Broadband competition debates shifted toward net neutrality and later fiber/mobile platforms rather than DSL resale squeeze litigation.",
      ],
      whyItMatters: [
        "Limits price squeeze monopolization theories in the US.",
        "Pairs with Trinko on dominant firm leverage over rivals.",
        "Wholesale-dependent businesses face higher proof burdens.",
      ],
      whatWasClaimed: [
        "AT&T's dual pricing squeezed independent DSL rivals.",
        "Competitive harm in broadband resale markets.",
        "Margin squeeze should be unlawful monopolization.",
      ],
      theOtherSide: [
        "AT&T cited Trinko and competitive retail pricing benefits.",
        "Court said squeeze math is not standalone violation.",
      ],
      whatItMeansForYou: [
        "Independent ISPs need clear predatory pricing or refusal theories.",
        "Integrated telecom/broadband firms gained defensive precedent.",
      ],
      bottomLine:
        "linkLine killed the standalone price squeeze claim—rivals must point to concrete wholesale or retail violations, not just tight margins.",
    },
  },
  {
    id: "us-ncaa-alston",
    name: "NCAA v. Alston (2021)",
    shortName: "NCAA Alston",
    companies: ["ncaa"],
    jurisdictions: ["US"],
    conduct: ["cartel_coordination", "vertical_restraint"],
    yearStart: 2014,
    yearEnd: 2021,
    status: "won_by_plaintiff",
    summary:
      "The Supreme Court unanimously upheld lower courts finding the NCAA and member schools unlawfully restrained compensation for student-athletes by capping education-related benefits—rejecting NCAA's amateurism defense under rule of reason.",
    regulatorArgument:
      "Plaintiff class argued NCAA horizontal agreement among schools fixed athlete pay below competitive levels, harming college athletes in Division I football and basketball.",
    outcome:
      "2021 affirmance; education-related benefits uncapped; separate NIL market opened via state laws and NCAA changes; not a full pay-for-play ruling.",
    remedies: "Injunction allowing expanded education-related compensation; catalyst for NIL era.",
    laws: ["sherman-1"],
    markets: ["college sports", "student-athlete labor"],
    sources: [
      {
        label: "Supreme Court Alston opinion",
        url: "https://supreme.justia.com/cases/federal/us/594/69/",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Class action filed", date: "2014" },
      { label: "Ninth Circuit affirmance", date: "2020" },
      { label: "Supreme Court decision", date: "June 21, 2021" },
    ],
    timeline: [
      {
        date: "2014",
        title: "Athletes sue NCAA",
        detail:
          "Former players challenged caps on scholarships and education-related benefits.",
      },
      {
        date: "2020",
        title: "Courts apply rule of reason",
        detail:
          "Judges found NCAA failed to prove caps were pro-competitive on balance.",
      },
      {
        date: "2021",
        title: "Unanimous Supreme Court affirmance",
        detail:
          "Kavanaugh concurrence warned broader compensation limits also suspect.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "College sports is a huge business, but the NCAA capped what athletes could receive—even for laptops, tutoring, or study abroad. Players sued, calling it price fixing among schools. The Supreme Court agreed the caps broke antitrust law, at least for education-related benefits.",
      theStory: [
        "Division I football and basketball generate billions through media rights, yet athletes faced strict limits on compensation beyond scholarships—justified by 'amateurism.'",
        "Shawne Alston and other plaintiffs said NCAA member schools horizontally agreed to cap athlete pay—a classic Sherman Act agreement among competitors who jointly employ athletic talent.",
        "The NCAA argued amateurism preserves popularity and integrates academics; courts should defer under rule of reason because sports are unique.",
        "Trial and appellate courts found the NCAA's evidence weak: caps were broader than necessary and schools competed fiercely for recruits in every way except open cash.",
        "The Supreme Court unanimously affirmed on narrow grounds: education-related benefits (computers, internships, post-eligibility scholarships) could not be flatly capped.",
        "Justice Kavanaugh's concurrence went further, suggesting even broader compensation limits looked like illegal price fixing—a roadmap for future litigation.",
        "The decision coincided with state name-image-likeness laws transforming college sports economics—Alston cracked the door; NIL and further cases pushed it wider.",
      ],
      whyItMatters: [
        "Applies antitrust to labor markets in nonprofit-appearing cartels.",
        "Unanimity signaled bipartisan skepticism of NCAA caps.",
        "Changed economics for college athletes beyond courtroom.",
      ],
      whatWasClaimed: [
        "Schools conspired to suppress athlete compensation.",
        "Education-related benefit caps were unreasonable restraints.",
        "Amateurism did not justify broad horizontal limits.",
      ],
      theOtherSide: [
        "NCAA warned pay chaos would ruin college sports model.",
        "It sought judicial deference to amateurism tradition.",
      ],
      whatItMeansForYou: [
        "College athletes gained leverage for benefits and NIL deals.",
        "Any joint employer cap among rivals faces antitrust scrutiny.",
      ],
      bottomLine:
        "NCAA v. Alston is the landmark case that antitrust law applies to college sports cartels—and the NCAA lost on education-related pay caps.",
    },
  },
  {
    id: "us-apple-pepper-app-store",
    name: "Apple Inc. v. Pepper (2019)",
    shortName: "Apple Pepper",
    companies: ["apple"],
    jurisdictions: ["US"],
    conduct: ["vertical_restraint", "abuse_of_dominance"],
    yearStart: 2011,
    yearEnd: 2024,
    status: "ongoing",
    summary:
      "The Supreme Court held iPhone app buyers are direct purchasers who may sue Apple for alleged monopolization of the iOS app distribution market via 30% commissions—reviving consumer claims later addressed in part by Epic litigation and App Store reforms.",
    regulatorArgument:
      "Consumers alleged Apple monopolized app distribution on iOS, forcing higher app prices through commission and exclusivity rules.",
    outcome:
      "2019 standing victory for consumers at Supreme Court; merits litigation continued; Apple later adjusted policies in some regions under court and regulatory pressure.",
    remedies: "Pending/private litigation; App Store policy changes in settlement contexts elsewhere.",
    laws: ["sherman-2", "clayton-3"],
    markets: ["mobile app stores", "iOS app distribution"],
    sources: [
      {
        label: "Supreme Court Apple v. Pepper",
        url: "https://supreme.justia.com/cases/federal/us/587/365/",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Class action filed", date: "2011" },
      { label: "Supreme Court allows direct purchaser suit", date: "May 13, 2019" },
      { label: "Merits and related Epic litigation", date: "2020–2024" },
    ],
    timeline: [
      {
        date: "2011",
        title: "Consumers sue over App Store fees",
        detail:
          "Plaintiffs claimed Apple's 30% commission inflated app prices—direct overcharge theory.",
      },
      {
        date: "2019",
        title: "Illinois Brick bypass via direct purchase",
        detail:
          "Supreme Court said consumers buy apps directly from Apple, not just developers.",
      },
      {
        date: "2020s",
        title: "Merits fights and policy shifts",
        detail:
          "Parallel Epic case and global regulation pressured App Store rules; consumer class continued.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "When you buy an iPhone app, are you buying from Apple or from the app developer? The Supreme Court said from Apple—so consumers could sue Apple directly for alleged App Store monopoly markups, sidestepping the Illinois Brick indirect-purchaser problem.",
      theStory: [
        "Apple's App Store is the only official way to distribute apps on iPhones. Apple charges developers up to 30% on digital sales—a fee developers say forces higher consumer prices.",
        "Early courts dismissed consumer suits citing Illinois Brick: developers, not Apple, set app prices; consumers were indirect purchasers of Apple's distribution service.",
        "The Supreme Court flipped the analysis 5–4: Apple's direct consumer relationship through App Store billing makes buyers direct purchasers of Apple's distribution product.",
        "Standing victory revived a consumer class pursuing monopolization claims against iOS app distribution exclusivity and commission structure.",
        "Merits litigation proceeded alongside Epic Games' high-profile suit challenging Apple's anti-steering rules and commission—overlapping theories, different parties.",
        "Apple later introduced alternative payment links and lower commissions in some jurisdictions following EU DMA and court orders—not a final end to US consumer claims.",
        "Pepper is thus procedural-turned-substantive: it reopened consumer antitrust against platform fees where Illinois Brick seemed to block them.",
      ],
      whyItMatters: [
        "Platform fee cases can proceed as consumer direct-purchaser suits.",
        "Illinois Brick bypass is critical for app store economics.",
        "Connects to Epic, DMA, and global app store regulation.",
      ],
      whatWasClaimed: [
        "Apple monopolized iOS app distribution.",
        "Commissions inflate prices consumers pay.",
        "Direct purchaser standing exists via App Store billing.",
      ],
      theOtherSide: [
        "Apple argued developers set prices and competition from Android exists.",
        "It said consumers are not buying distribution from Apple directly.",
      ],
      whatItMeansForYou: [
        "App prices and in-app purchase rules remain antitrust battlegrounds.",
        "Consumer classes may sue platforms you pay directly—even for third-party goods.",
      ],
      bottomLine:
        "Apple v. Pepper cleared the path for consumers to challenge App Store monopoly claims as direct purchasers—one of few ongoing high-profile US platform fee cases.",
    },
  },
  {
    id: "eu-lcd-panel-cartel",
    name: "EU LCD Panel Cartel",
    shortName: "EU LCD Cartel",
    companies: ["lg", "samsung", "auo", "cma"],
    jurisdictions: ["EU", "US"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 2001,
    yearEnd: 2006,
    status: "fined",
    summary:
      "The Commission fined LCD panel makers €649 million for fixing prices on screens used in TVs, monitors, and laptops—parallel to US criminal enforcement against Asian manufacturers.",
    regulatorArgument:
      "Executives met in hotel rooms as 'Crystal meetings' to coordinate pricing and production for TFT-LCD panels sold to electronics brands globally.",
    outcome: "2010 EU fines; US prison sentences for executives; civil damages worldwide.",
    remedies: "Fines; leniency discounts; private follow-on litigation.",
    laws: ["tfeu-101", "sherman-1"],
    markets: ["LCD panels", "flat-panel displays"],
    sources: [
      {
        label: "EC LCD cartel press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_10_1635",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Cartel activity period", date: "2001–2006" },
      { label: "EU infringement decision", date: "December 8, 2010" },
      { label: "US criminal pleas", date: "2008–2010" },
    ],
    timeline: [
      {
        date: "2001–2006",
        title: "Crystal meetings",
        detail: "Competitors allegedly fixed LCD prices during flat-panel boom.",
      },
      {
        date: "2010",
        title: "EU fines",
        detail: "Samsung, LG, AU Optronics, Chimei, others penalized.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "The companies making LCD screens for TVs and laptops held secret 'Crystal meetings' to fix prices. Europe fined them €649 million; America jailed executives. Your flat-screen gadgets likely cost more because of it.",
      theStory: [
        "Flat-panel LCDs replaced bulky CRTs in the 2000s. A handful of Asian manufacturers supplied panels to Sony, Dell, HP, and TV brands worldwide.",
        "Executives allegedly met in Taiwan and elsewhere—internally dubbed 'Crystal meetings'—to agree price targets and production plans.",
        "Electronics OEMs had few alternatives; even small panel price increases raised device costs at massive scale.",
        "Leniency applicants triggered US criminal probes first; executives served prison time—a stark contrast to EU administrative fines only.",
        "The 2010 Commission decision added €649 million in EU penalties, coordinating with global enforcement.",
        "Consumer electronics buyers and shareholders pursued civil damages in US and European courts for years afterward.",
        "LCD stands with DRAM and CRT as part of a pattern of display/memory semiconductor cartels in the 2000s.",
      ],
      whyItMatters: [
        "Component cartels tax every device using screens.",
        "Global parallel enforcement multiplies deterrence.",
        "Hotel-room cartels persist even in fast-tech markets.",
      ],
      whatWasClaimed: [
        "Price fixing on TFT-LCD panels.",
        "Production coordination among major Asian suppliers.",
        "Harm to global electronics manufacturers and consumers.",
      ],
      theOtherSide: [
        "Some firms settled with leniency reductions.",
        "Defendants in damages suits dispute pass-on and scope.",
      ],
      whatItMeansForYou: [
        "Historical TV and monitor prices may have included cartel overcharges.",
        "Procurement teams should audit tight oligopoly components.",
      ],
      bottomLine:
        "The LCD panel cartel combined EU mega-fines with US executive prison time—one of the decade's biggest display-industry collusion cases.",
    },
  },
  {
    id: "eu-automotive-bearings-cartel",
    name: "EU Automotive Bearings Cartel",
    shortName: "EU Bearings Cartel",
    companies: ["skf", "schaeffler", "ntn", "jtekt"],
    jurisdictions: ["EU"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 2004,
    yearEnd: 2011,
    status: "fined",
    summary:
      "The Commission fined bearing manufacturers €953 million for coordinating prices and passing through steel surcharges to automotive customers including carmakers and suppliers.",
    regulatorArgument:
      "Suppliers of ball and roller bearings colluded on quotes to carmakers, exchanging sensitive pricing via emails and meetings.",
    outcome: "2014 decision; SKF received leniency reduction; damages actions across Europe.",
    remedies: "Fines; compliance programs.",
    laws: ["tfeu-101"],
    markets: ["automotive bearings", "vehicle components"],
    sources: [
      {
        label: "EC bearings cartel press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_14_576",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Commission raids", date: "2011" },
      { label: "Infringement decision", date: "March 19, 2014" },
      { label: "Total fines", date: "€953 million" },
    ],
    timeline: [
      {
        date: "2004–2011",
        title: "Collusion on carmaker quotes",
        detail: "Bearings suppliers allegedly coordinated prices and surcharges.",
      },
      {
        date: "2014",
        title: "Major fines",
        detail: "SKF, Schaeffler, JTEKT, NTN-SNR penalized.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Bearings are tiny but essential in every car wheel and engine. EU regulators said major suppliers rigged quotes to BMW, Renault, and others for years—adding hidden costs to millions of vehicles.",
      theStory: [
        "Automotive bearings are specialized components bought on long-term contracts by carmakers and tier-one suppliers. Oligopoly structure invites collusion if enforcement slackens.",
        "The Commission found SKF, Schaeffler, JTEKT, NTN-SNR, and others exchanged pricing information and coordinated responses to steel cost increases—effectively fixing surcharges passed to manufacturers.",
        "Emails and meeting records showed competitors knew each other's bids before submitting their own—a classic car-parts cartel pattern alongside wire harnesses and exhaust systems cases.",
        "SKF earned leniency for cooperation, paying a reduced fine; others faced penalties reflecting their role and duration.",
        "Carmakers initially might not see identical quotes, but alleged coordination reduced bargaining leverage on a component used in every vehicle.",
        "Follow-on damages suits by manufacturers and consumers' indirect effects rippled for years.",
        "The bearings cartel exemplifies EU focus on automotive supply-chain collusion after the trucks scandal.",
      ],
      whyItMatters: [
        "Hidden component cartels raise car prices industry-wide.",
        "Steel surcharge coordination is still price fixing.",
        "OEMs depend on whistleblowers and dawn raids to detect collusion.",
      ],
      whatWasClaimed: [
        "Coordinated bearing prices and surcharges to carmakers.",
        "Information exchanges on live negotiations.",
        "Multi-year conspiracy across Europe.",
      ],
      theOtherSide: [
        "Companies settled aspects via leniency; appealed fine math.",
        "Damages defendants dispute causal overcharge amounts.",
      ],
      whatItMeansForYou: [
        "Vehicle prices reflect countless supplier inputs—cartels inflate them.",
        "Suppliers must refuse competitor bid coordination.",
      ],
      bottomLine:
        "The automotive bearings cartel hit €953 million in fines for rigging quotes on parts found in nearly every car on the road.",
    },
  },
  {
    id: "eu-citric-acid-cartel",
    name: "EU Citric Acid Cartel",
    shortName: "EU Citric Acid Cartel",
    companies: ["archer-daniels-midland", "cargill", "hauser"],
    jurisdictions: ["EU", "US"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 1991,
    yearEnd: 1995,
    status: "fined",
    summary:
      "The Commission fined producers €135.5 million for fixing citric acid prices worldwide—a food additive used in beverages and processed foods—following US criminal enforcement against the same conspiracy.",
    regulatorArgument:
      "ADM, Cargill, and others allocated volumes and coordinated price targets for citric acid sold to Coke, Pepsi, and food manufacturers.",
    outcome: "2005 EU fines; earlier US guilty pleas including ADM from lysine-era enforcement culture.",
    remedies: "Fines; criminal US pleas; civil damages.",
    laws: ["tfeu-101", "sherman-1"],
    markets: ["citric acid", "food additives"],
    sources: [
      {
        label: "EC citric acid decision summary",
        url: "https://competition-policy.ec.europa.eu/antitrust/cases/decisions/36233_en",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Cartel period", date: "1991–1995" },
      { label: "US criminal pleas", date: "1990s" },
      { label: "EU fines", date: "December 2005" },
    ],
    timeline: [
      {
        date: "1991–1995",
        title: "Global price fixing",
        detail: "Producers allegedly met to set citric acid prices and volumes.",
      },
      {
        date: "2005",
        title: "EU decision",
        detail: "Commission fined ADM, Cargill, Jungbunzlauer, and others.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Citric acid gives sodas and candy their tang. ADM and rivals allegedly fixed its price worldwide in the early 1990s—same corporate culture that produced the lysine scandal. Europe fined them; America had already prosecuted.",
      theStory: [
        "Citric acid is a bulk food additive purchased by global beverage and food companies. A few producers dominate, creating temptation to collude on price and volume.",
        "The conspiracy allegedly ran from 1991 to 1995 with meetings in Europe and North America to set target prices and customer allocations.",
        "US enforcement preceded EU action—ADM and others already faced criminal exposure from antitrust division investigations in the 1990s wave of ag-industrial cartels.",
        "The 2005 Commission decision imposed €135.5 million in fines, emphasizing worldwide harm to food and drink manufacturers.",
        "Buyers like soft drink makers passed input costs into consumer prices—small per-unit markups across billions of servings.",
        "Citric acid sits alongside lysine as evidence ADM-era culture treated cartels as business tools until FBI intervention.",
        "Food supply collusion remains an enforcement priority because margins are thin and inputs are standardized.",
      ],
      whyItMatters: [
        "Food additive cartels affect grocery prices invisibly.",
        "Cross-border enforcement reinforces deterrence.",
        "Repeat corporate offenders face higher scrutiny.",
      ],
      whatWasClaimed: [
        "Global price and volume fixing for citric acid.",
        "Meetings among ADM, Cargill, and European producers.",
        "Higher costs for beverage and food manufacturers.",
      ],
      theOtherSide: [
        "Some firms cooperated with investigators for reductions.",
        "Market volatility arguments in civil damages phases.",
      ],
      whatItMeansForYou: [
        "Pantry prices connect to upstream chemical cartels.",
        "Food manufacturers should monitor oligopoly pricing patterns.",
      ],
      bottomLine:
        "The citric acid cartel spread the ADM lysine playbook into everyday food ingredients—fined on both sides of the Atlantic.",
    },
  },
  {
    id: "hist-us-addyston-pipe",
    name: "United States v. Addyston Pipe & Steel Co. (1899)",
    shortName: "Addyston Pipe",
    companies: ["addyston-pipe"],
    jurisdictions: ["US"],
    conduct: ["cartel_coordination", "market_access"],
    yearStart: 1894,
    yearEnd: 1899,
    status: "won_by_plaintiff",
    summary:
      "The Sixth Circuit—affirmed by the Supreme Court—held territorial division agreements among pipe manufacturers were per se illegal restraints of trade, an early foundation of US cartel doctrine predating the rule of reason.",
    regulatorArgument:
      "Six pipe foundries agreed not to bid in each other's territories, fixing who would win municipal water and gas pipe contracts regionally.",
    outcome:
      "1899 condemnation of naked market division; influenced later per se cartel categories.",
    remedies: "Injunction dissolving territorial agreement.",
    laws: ["sherman-1"],
    markets: ["cast iron pipe", "municipal utilities"],
    sources: [
      {
        label: "Addyston Pipe opinion",
        url: "https://openjurist.org/85/f3d/963",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Territorial agreement formed", date: "1894" },
      { label: "Sixth Circuit decision", date: "1898" },
      { label: "Supreme Court affirmance", date: "1899" },
    ],
    timeline: [
      {
        date: "1894",
        title: "Foundries divide territories",
        detail:
          "Pipe manufacturers agreed bidding zones for municipal contracts across the South and Midwest.",
      },
      {
        date: "1899",
        title: "Cartel condemned",
        detail:
          "Courts held naked territorial restraints unlawful regardless of reasonableness arguments.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "In the 1890s, iron pipe makers agreed not to compete in each other's cities when bidding on water and gas projects. Courts said dividing territories among competitors is illegal cartel behavior—one of America's earliest Sherman Act victories.",
      theStory: [
        "Municipal water and gas systems needed cast iron pipe; foundries competed on public bids town by town.",
        "Addyston Pipe and five other manufacturers signed an agreement assigning territories—each would refrain from bidding in zones reserved for others, with a bonus pool for 'loyal' adherence.",
        "The US government sued under the young Sherman Act, arguing the arrangement was a naked restraint of trade with no pro-competitive justification.",
        "The Sixth Circuit, later affirmed, rejected elaborate efficiency defenses. Dividing markets among horizontal competitors was unlawful on its face.",
        "Addyston Pipe predated Standard Oil's rule-of-reason framework and helped establish per se treatment for hard-core cartels like price fixing and market allocation.",
        "Infrastructure buyers—cities and utilities—paid more when bidders choreographed winners instead of competing.",
        "Modern students read Addyston alongside Topco as territorial allocation classics—one among cooperatives, one among foundries.",
      ],
      whyItMatters: [
        "Early precedent for per se illegal market division.",
        "Public procurement cartels harm taxpayers directly.",
        "Historical anchor for Sherman Act enforcement.",
      ],
      whatWasClaimed: [
        "Territorial bid rigging among pipe manufacturers.",
        "Agreement unreasonably restrained interstate commerce.",
        "Municipal purchasers faced inflated prices.",
      ],
      theOtherSide: [
        "Defendants argued stability and investment benefits.",
        "Courts found naked restraints ineligible for reasonableness.",
      ],
      whatItMeansForYou: [
        "Public works bid rigging remains criminal and civilly actionable.",
        "Territory splits among competitors are still per se illegal.",
      ],
      bottomLine:
        "Addyston Pipe is a founding US cartel case—territorial bid rigging among pipe makers condemned at the dawn of antitrust law.",
    },
  },
  {
    id: "eu-power-cables-cartel",
    name: "EU Underground and Submarine Power Cables Cartel",
    shortName: "EU Power Cables Cartel",
    companies: ["prysmian", "nexans", "nkt"],
    jurisdictions: ["EU"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 1999,
    yearEnd: 2009,
    status: "fined",
    summary:
      "The Commission fined major cable makers €302 million for colluding on high-voltage underground and submarine power cable projects critical to grid infrastructure and offshore wind.",
    regulatorArgument:
      "Prysmian, Nexans, NKT and others rigged bids for turnkey cable projects, sharing contract opportunities and prices across Europe.",
    outcome: "2014 fines; leniency applicant received reduction; grid operators pursued damages.",
    remedies: "Fines; compliance training; damages litigation.",
    laws: ["tfeu-101"],
    markets: ["power cables", "grid infrastructure", "offshore wind"],
    sources: [
      {
        label: "EC power cables cartel press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_14_1230",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Cartel period", date: "1999–2009" },
      { label: "Commission raids", date: "2009" },
      { label: "Fines imposed", date: "April 2, 2014" },
    ],
    timeline: [
      {
        date: "1999–2009",
        title: "Project bid rigging",
        detail:
          "Cable suppliers allegedly allocated contracts for underground and submarine links.",
      },
      {
        date: "2014",
        title: "€302 million fines",
        detail: "Prysmian, Nexans, NKT penalized; ABB received immunity.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "High-voltage power cables linking countries and offshore wind farms are multi-million euro projects. EU regulators said cable giants rigged bids for a decade—inflating costs for electricity grids consumers depend on.",
      theStory: [
        "Europe invests heavily in underground and submarine cables to connect national grids and bring offshore wind ashore. Few suppliers can execute turnkey projects, creating oligopoly conditions.",
        "The Commission found Prysmian, Nexans, NKT, and formerly ABB (immunity recipient) colluded on project allocation and pricing rather than competing head-to-head.",
        "Cartel conduct allegedly included knowing who would 'win' each tender and submitting complementary cover bids to simulate competition for grid operators.",
        "Raids in 2009 followed whistleblower cooperation; investigators reconstructed bid patterns across Scandinavia, the Baltic, and Mediterranean projects.",
        "2014 fines totaled €302 million—smaller than trucks or CRT but critical for energy infrastructure economics.",
        "Higher cable project costs feed into network tariffs and renewable transition budgets—socialized through electricity bills.",
        "The case underscores EU vigilance on green-transition inputs, not only legacy industries.",
      ],
      whyItMatters: [
        "Energy transition infrastructure can be cartelized too.",
        "Bid rigging on public grid projects taxes ratepayers.",
        "Immunity tools unlock submarine-project secrets.",
      ],
      whatWasClaimed: [
        "Bid rigging on high-voltage cable projects.",
        "Market sharing among top European suppliers.",
        "Harm to TSOs and offshore wind developers.",
      ],
      theOtherSide: [
        "Firms appealed fine calculations.",
        "Complex project pricing defended as independent in damages suits.",
      ],
      whatItMeansForYou: [
        "Electricity network costs reflect competitive—or collusive—cable bidding.",
        "Renewable expansion depends on honest procurement.",
      ],
      bottomLine:
        "The power cables cartel rigged bids on projects wiring Europe's grids and offshore wind—fined €302 million for a decade of collusion.",
    },
  },
  {
    id: "eu-sugar-beet-cartel",
    name: "EU Sugar Beet Processing Cartel",
    shortName: "EU Sugar Beet Cartel",
    companies: ["suedzucker", "nordzucker", "pfeifer-langen"],
    jurisdictions: ["EU"],
    conduct: ["cartel_coordination", "market_access"],
    yearStart: 1990,
    yearEnd: 2009,
    status: "fined",
    summary:
      "The Commission fined sugar beet processors for colluding on sales quotas and prices in industrial sugar markets during and after EU quota regulation—allocating customers instead of competing.",
    regulatorArgument:
      "Major processors exchanged information and divided industrial sugar customers geographically, undermining market opening reforms.",
    outcome: "2014 fines totaling over €280 million; customers included food manufacturers.",
    remedies: "Fines; compliance programs.",
    laws: ["tfeu-101"],
    markets: ["industrial sugar", "sugar beet processing"],
    sources: [
      {
        label: "EC sugar cartel press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_14_1159",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Cartel duration", date: "1990–2009" },
      { label: "Commission decision", date: "February 2014" },
      { label: "Fines", date: "Over €280 million" },
    ],
    timeline: [
      {
        date: "1990–2009",
        title: "Customer allocation in industrial sugar",
        detail:
          "Processors allegedly divided food industry customers despite EU sugar regime changes.",
      },
      {
        date: "2014",
        title: "Fines on Südzucker, Nordzucker, Pfeifer & Langen",
        detail: "Commission penalized long-running collusion in sweetener inputs.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Industrial sugar goes into chocolate, soda, and baked goods. EU regulators said major beet sugar processors split up food-company customers for nearly 20 years instead of competing—adding hidden costs to Europe's grocery supply chain.",
      theStory: [
        "European sugar was long governed by production quotas and regulated prices. Processors Südzucker, Nordzucker, and Pfeifer & Langen dominated beet sugar in Central Europe.",
        "Even as reforms moved toward market liberalization, the Commission found competitors allocated industrial customers by geography—each processor 'owned' certain food manufacturers.",
        "Collusion allegedly included exchanging price and volume information and respecting territorial customer assignments—soft collusion layered on a already regulated sector.",
        "Food companies buying sugar in bulk—confectioners, drink makers—lost leverage when processors stopped truly competing for contracts.",
        "2014 fines exceeded €280 million, with immunity or reductions for cooperation where applicable.",
        "The case intersects agricultural policy and competition law: quotas did not prevent illegal customer division among private processors.",
        "Sweetener input cartels directly touch everyday product prices on supermarket shelves.",
      ],
      whyItMatters: [
        "Regulated sectors still see illegal customer allocation.",
        "Food manufacturers depend on competitive sugar sourcing.",
        "Long duration increased fines and damages exposure.",
      ],
      whatWasClaimed: [
        "Customer and market sharing in industrial sugar.",
        "Information exchanges supporting collusion.",
        "Harm during EU sugar regime transition.",
      ],
      theOtherSide: [
        "Companies disputed characterization of routine contacts.",
        "Appeals on fine amounts and parental liability.",
      ],
      whatItMeansForYou: [
        "Grocery prices embed upstream sweetener competition—or collusion.",
        "Bulk ingredient buyers should document suspicious supplier behavior.",
      ],
      bottomLine:
        "The sugar beet cartel divided industrial sugar customers for two decades—fined over €280 million for rigging a kitchen-table input.",
    },
  },
  {
    id: "hist-us-paramount-decrees",
    name: "US Paramount Decrees (Hollywood Studio Antitrust)",
    shortName: "Paramount Decrees",
    companies: ["paramount", "mgm", "warner-bros", "fox", "rko"],
    jurisdictions: ["US"],
    conduct: ["vertical_restraint", "exclusivity", "tying"],
    yearStart: 1938,
    yearEnd: 1948,
    status: "remedy",
    summary:
      "The Supreme Court in United States v. Paramount forced major Hollywood studios to divest theater chains and ended block booking and other vertical restraints— restructuring film distribution for decades until partial termination in 2020.",
    regulatorArgument:
      "Studios illegally tied exclusive film licenses to block booking and ownership of first-run theaters, foreclosing independent exhibitors.",
    outcome:
      "1948 consent decrees; studio divestiture of exhibition; block booking banned; decrees terminated 2020 with DOJ review.",
    remedies: "Structural separation of production and exhibition; licensing reforms.",
    laws: ["sherman-1", "sherman-2"],
    markets: ["motion picture production", "theatrical exhibition"],
    sources: [
      {
        label: "DOJ Paramount decrees history",
        url: "https://www.justice.gov/atr/antitrust-case-filings",
      },
      {
        label: "Supreme Court Paramount decision (1948)",
        url: "https://supreme.justia.com/cases/federal/us/334/131/",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "DOJ suit filed", date: "1938" },
      { label: "Supreme Court decision", date: "May 3, 1948" },
      { label: "Decrees terminated", date: "August 2020" },
    ],
    timeline: [
      {
        date: "1930s–1940s",
        title: "Studio system vertical integration",
        detail:
          "Majors produced films, owned theaters, and block-booked packages to independents.",
      },
      {
        date: "1948",
        title: "Courts order separation",
        detail:
          "Studios must divest exhibition; block booking and certain licensing tied sales banned.",
      },
      {
        date: "2020",
        title: "DOJ ends decrees",
        detail:
          "Antitrust Division terminated decrees citing streaming-era market changes.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Old Hollywood studios made movies and owned theaters, forcing independents to buy bundles of films sight-unseen. The Supreme Court broke up that system in 1948—studios sold their cinemas and block booking ended. The rules lasted until 2020 when DOJ said streaming made them obsolete.",
      theStory: [
        "Golden Age Hollywood was vertically integrated: Paramount, MGM, Warner Bros., Fox, and RKO produced films, controlled distribution, and owned first-run theater chains.",
        "Independent cinema owners had to accept 'block booking'—licensing packages of films including turkeys to get hits—and compete against studio-owned premier theaters.",
        "The DOJ sued in 1938; after wartime delays, the Supreme Court in 1948 condemned the practices as illegal restraints and monopolization of exhibition.",
        "Studios divested theaters under consent decrees—the 'Paramount Decrees'— reshaping Hollywood into separate production, distribution, and exhibition businesses.",
        "Creators gained more routes to screens; indie theaters could bid for films individually; studio power shifted toward distribution deals rather than owned houses.",
        "For seventy years the decrees remained active consent orders—background law for film licensing until streaming disrupted theatrical economics.",
        "In 2020 the Antitrust Division terminated the decrees, arguing new platforms like Netflix changed competitive dynamics—debated by theater chains facing studio streaming experiments.",
      ],
      whyItMatters: [
        "Landmark vertical restraints and structural separation case.",
        "Shows antitrust reshaping an entire industry's business model.",
        "Decree termination debates mirror modern platform regulation.",
      ],
      whatWasClaimed: [
        "Block booking and tied licensing foreclosed independents.",
        "Studio theater ownership reinforced illegal leverage.",
        "Divestiture necessary to restore exhibition competition.",
      ],
      theOtherSide: [
        "Studios argued integration improved financing and quality.",
        "2020 DOJ said decrees were obsolete in streaming era.",
      ],
      whatItMeansForYou: [
        "Theater access to films traces partly to 1948 remedies.",
        "Streaming wars revived questions about studio vertical power.",
      ],
      bottomLine:
        "The Paramount Decrees broke Hollywood's studio-theater cartel—history's template for using antitrust to unwind vertical integration in entertainment.",
    },
  },
  {
    id: "eu-marine-hoses-cartel",
    name: "EU Marine Hose Cartel",
    shortName: "EU Marine Hose Cartel",
    companies: ["bridgestone", "parker-hannifin", "manuli"],
    jurisdictions: ["EU"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 1986,
    yearEnd: 2007,
    status: "fined",
    summary:
      "The Commission fined suppliers €131 million for colluding on prices and allocating customers for flexible rubber hoses used to load and unload oil and chemical tankers at ports worldwide.",
    regulatorArgument:
      "Executives met in Asia and Europe to rig quotes on marine hose packages sold to oil majors and terminal operators—a global cartel with EU effects.",
    outcome: "2009 fines; US criminal prosecutions and prison sentences for executives; civil damages.",
    remedies: "Fines; criminal enforcement abroad; compliance programs.",
    laws: ["tfeu-101", "sherman-1"],
    markets: ["marine hoses", "oil terminal equipment"],
    sources: [
      {
        label: "EC marine hoses cartel press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_09_620",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Cartel period", date: "1986–2007" },
      { label: "EU fines", date: "January 28, 2009" },
      { label: "US executive prosecutions", date: "2008–2009" },
    ],
    timeline: [
      {
        date: "1986–2007",
        title: "Global hose bid rigging",
        detail:
          "Suppliers allegedly fixed prices on tanker loading hoses sold to oil companies and port terminals.",
      },
      {
        date: "2009",
        title: "EU and US enforcement",
        detail: "Commission fines; US jailed executives caught in sting operations.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Loading oil onto tankers requires specialized rubber hoses—bought in big contracts by Shell, BP, and port operators. Suppliers allegedly ran a global cartel for over 20 years. Europe fined them; America sent executives to prison.",
      theStory: [
        "Marine hoses connect tankers to terminal pipelines when crude oil and chemicals move through ports. Projects are bespoke, expensive, and dominated by a few global suppliers.",
        "The Commission found Bridgestone, Parker ITR (later Parker Hannifin), and Manuli Rubber colluded on pricing and customer allocation across continents.",
        "Meetings in Asia and Europe allegedly set price targets and decided which firm would win each tender—classic bid rigging in industrial equipment.",
        "US criminal enforcement went further: undercover stings and guilty pleas sent executives to prison, showing personal accountability beyond EU fines.",
        "Oil majors and terminal operators passed higher equipment costs into energy logistics—small percentages on billion-dollar cargo flows.",
        "The cartel's twenty-year span illustrates how niche industrial products escape detection without whistleblowers.",
        "Marine hose enforcement paired EU administrative fines with American criminal deterrence—a model for global cartel cases.",
      ],
      whyItMatters: [
        "Energy logistics inputs affect commodity transport costs.",
        "Global cartels need coordinated US and EU enforcement.",
        "Niche B2B markets remain cartel-prone.",
      ],
      whatWasClaimed: [
        "Price fixing and customer allocation on marine hoses.",
        "Global meetings with EU market effects.",
        "Harm to oil majors and terminal operators.",
      ],
      theOtherSide: [
        "Companies paid fines and improved compliance.",
        "Civil damages defendants dispute overcharge estimates.",
      ],
      whatItMeansForYou: [
        "Energy supply chains embed countless equipment contracts—collusion adds hidden cost.",
        "Industrial sales staff must avoid global 'summit' pricing talks.",
      ],
      bottomLine:
        "The marine hose cartel rigged tanker loading equipment for two decades—fined in Europe and jailed in America.",
    },
  },
  {
    id: "eu-car-batteries-cartel",
    name: "EU Automotive Battery Cartel",
    shortName: "EU Car Batteries Cartel",
    companies: ["johnson-controls", "exide", "yucel"],
    jurisdictions: ["EU"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 2004,
    yearEnd: 2011,
    status: "fined",
    summary:
      "The Commission fined car battery manufacturers €167 million for exchanging prices and coordinating quotes to carmakers and aftermarket retailers for starter batteries.",
    regulatorArgument:
      "Johnson Controls, Exide, and others colluded on automotive and industrial battery pricing through emails and meetings during a period of rising lead costs.",
    outcome: "2017 decision and fines; leniency reductions; aftermarket and OEM buyers pursued damages.",
    remedies: "Fines; compliance monitoring.",
    laws: ["tfeu-101"],
    markets: ["automotive batteries", "aftermarket car parts"],
    sources: [
      {
        label: "EC car batteries cartel press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_17_2585",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Cartel period", date: "2004–2011" },
      { label: "Commission raids", date: "2011" },
      { label: "Fines imposed", date: "February 2017" },
    ],
    timeline: [
      {
        date: "2004–2011",
        title: "Battery price coordination",
        detail:
          "Suppliers allegedly exchanged OEM and aftermarket pricing information.",
      },
      {
        date: "2017",
        title: "€167 million fines",
        detail: "Johnson Controls, Exide, and others penalized.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Every car needs a starter battery. EU regulators said major suppliers swapped pricing information and coordinated quotes to carmakers and auto parts stores for years—adding costs to vehicles and replacements.",
      theStory: [
        "Automotive batteries are high-volume products sold to carmakers for new vehicles and to retailers like workshops for replacements. Lead price volatility created cover for synchronized price moves.",
        "The Commission found Johnson Controls, Exide, Yucel, and other producers exchanged sensitive pricing data and coordinated commercial strategies from 2004 to 2011.",
        "Collusion touched both original equipment sales—batteries installed on new cars—and lucrative aftermarket channels when drivers replace worn units.",
        "Emails and internal documents showed competitors tracking each other's quotes to major OEMs, reducing genuine bargaining.",
        "2017 fines totaled €167 million with leniency for the first cooperating firm.",
        "Drivers replacing batteries and buyers of new cars indirectly bore higher costs when competition on a commoditized part was dulled.",
        "The case fits a wave of automotive component cartels—bearings, wire harnesses, batteries—policed aggressively by Brussels.",
      ],
      whyItMatters: [
        "Aftermarket parts affect every car owner.",
        "Lead cost excuses do not legitimize competitor price talks.",
        "OEM and retail channels can be cartelized together.",
      ],
      whatWasClaimed: [
        "Price information exchanges on car batteries.",
        "Coordinated quotes to automakers and retailers.",
        "Multi-year conspiracy across Europe.",
      ],
      theOtherSide: [
        "Firms appealed fine levels.",
        "Parallel lead commodity pricing cited in defenses.",
      ],
      whatItMeansForYou: [
        "Replacement battery prices may reflect historical collusion recoverable in damages suits.",
        "Parts distributors should report suspicious supplier coordination.",
      ],
      bottomLine:
        "The automotive battery cartel inflated costs on a part every driver eventually replaces—fined €167 million after years of hidden coordination.",
    },
  },
];
