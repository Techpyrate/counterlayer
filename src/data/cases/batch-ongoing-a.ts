import type { CompetitionCase } from "../types";

/** Ongoing and appealed matters — batch A (20 cases) */
export const batchOngoingA: CompetitionCase[] = [
  {
    id: "us-doj-google-adtech-trial",
    name: "United States v. Google (Ad Tech) — trial phase",
    shortName: "DOJ Google ad tech trial",
    companies: ["google"],
    jurisdictions: ["US"],
    conduct: ["self_preferencing", "abuse_of_dominance", "vertical_restraint", "refusal_to_deal"],
    yearStart: 2024,
    status: "ongoing",
    summary:
      "The DOJ's civil suit alleging Google monopolized digital advertising technology entered active litigation after years of investigation, with trial proceedings examining publisher ad servers, exchanges, and advertiser tools.",
    regulatorArgument:
      "Google's vertical integration across the ad-tech stack lets it act as auction operator and participant, steering transactions to its own products and degrading interoperability for rivals and publishers.",
    outcome:
      "No final judgment yet; trial and remedy debates continue. Google denies monopolization and argues the market remains competitive.",
    laws: ["sherman-2", "ftc-5"],
    markets: ["display advertising", "ad exchanges", "publisher ad servers", "demand-side platforms"],
    sources: [
      {
        label: "DOJ ad tech complaint announcement",
        url: "https://www.justice.gov/opa/pr/justice-department-sues-google-monopolizing-digital-advertising-technologies",
      },
      {
        label: "DOJ case documents",
        url: "https://www.justice.gov/atr/case/us-and-plaintiff-states-v-google-llc",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "DOJ filed civil antitrust suit", date: "January 24, 2024" },
      { label: "States joined as co-plaintiffs", date: "January 2024" },
      { label: "Pretrial motions and discovery", date: "2024–2025" },
      { label: "Trial proceedings (reported)", date: "2025–2026" },
    ],
    timeline: [
      {
        date: "2020–2023",
        title: "Investigation builds",
        detail:
          "The Justice Department and state attorneys general examined Google's role in header bidding, ad exchanges, and tools publishers use to sell space on websites.",
      },
      {
        date: "January 24, 2024",
        title: "Landmark complaint filed",
        detail:
          "DOJ sued in the Eastern District of Virginia, alleging Google illegally monopolized key ad-tech markets through acquisitions and self-preferencing.",
      },
      {
        date: "2024",
        title: "Google pushes back",
        detail:
          "Google argued regulators misunderstand fast-moving ad markets and that rivals like Meta, Amazon, and independent exchanges compete vigorously.",
      },
      {
        date: "2025–ongoing",
        title: "Trial and remedy speculation",
        detail:
          "Courtroom fights focus on market definition and whether structural remedies—such as divestitures—might be needed if liability is found.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "When you open a news website, a hidden auction often picks the ad you see. The US government says Google sits at too many steps in that chain—as publisher tools, exchange, and buyer—and uses that position to steer business to itself. A major trial is underway, but no court has yet ruled Google guilty. The fight could reshape online advertising if regulators win.",
      theStory: [
        "Online advertising looks simple on the surface: a box on a webpage, maybe a video before a clip. Underneath, it is a chain of software connecting website owners (publishers), middlemen (exchanges), and brands (advertisers). Whoever controls those links can influence prices, speed, and which rivals get access.",
        "Google built or bought tools at multiple points in that chain—DoubleClick for publishers, AdX as an exchange, and DV360 for large advertisers. Prosecutors say that vertical stack is not just convenient integration; it is a structural advantage that lets Google favor its own pipes when auctions run.",
        "The Justice Department's theory echoes older monopolization cases: a dominant firm uses control over one layer to protect profits in another. Here, the alleged weapon is information and routing—knowing auction dynamics while also setting rules rivals must follow.",
        "Publishers and ad-tech startups have complained for years that Google's policies made it harder to use independent exchanges or header-bidding setups that bypass Google tools. Those complaints fed both this US case and parallel European probes.",
        "Google responds that ad markets are fiercely competitive, that customers choose its tools because they work, and that breaking up the stack would hurt small publishers who rely on integrated products. It also points to competition from social platforms that sell ads without open-web auctions.",
        "In 2024 the case moved from press releases to federal court. Discovery, expert battles over market share, and pretrial motions set the stage for trial—where a judge will decide whether Google's ad-tech conduct crossed the line from tough competition into illegal monopolization.",
        "Nothing is final yet. Even if the government wins on liability, remedies could range from behavioral rules to forcing Google to sell parts of its ad business—a outcome that would ripple through every major media site.",
      ],
      whyItMatters: [
        "Free news and blogs often depend on ad revenue; if one company taxies that system, journalism and small sites can pay the price.",
        "The case tests whether 'vertical integration' in tech—owning many layers of a market—is still legal when the integrator is dominant.",
        "A win for DOJ could inspire breakup talk beyond Google, affecting how platforms design acquisitions for years.",
        "Advertisers and publishers may see different fees and tool choices depending on remedies—even though outcomes remain uncertain today.",
        "This trial runs alongside EU ad-tech enforcement, so global ad rules may shift in tandem.",
      ],
      whatWasClaimed: [
        "Google monopolized publisher ad servers, ad exchanges, and/or advertiser ad networks through exclusionary conduct.",
        "Acquisitions like DoubleClick cemented control and eliminated competitive threats.",
        "Self-preferencing and interoperability restrictions raised rivals' costs and reduced publishers' revenue.",
        "Consumers and advertisers ultimately pay more and see less innovation because competition was suppressed—not because Google simply built better products.",
      ],
      theOtherSide: [
        "Google says the government uses outdated market definitions that ignore social, retail, and connected-TV advertising.",
        "It argues publishers and advertisers freely switch tools and that prices fell as digital ads grew.",
        "Google maintains its integrations improved speed, fraud prevention, and yield for publishers.",
        "It warns that forced divestitures could destabilize the open-web ad ecosystem small sites rely on.",
      ],
      whatItMeansForYou: [
        "You will not see a checkout-line price change, but the content you read for free is funded by this ad machinery.",
        "If remedies require more open auctions, you might notice slightly different ads or faster pages—or publishers might earn more per view.",
        "Businesses buying ads could see new independent tools if Google must share data or separate products.",
        "The case is ongoing; treat any 'Google lost' headlines carefully until appeals finish.",
        "Watch for settlement talks—they could produce changes before a final verdict.",
      ],
      bottomLine:
        "The DOJ's Google ad-tech trial is a live test of whether one company can own the pipes, the auction house, and a bidding desk in online ads. No final guilt finding yet—but the stakes for publishers, advertisers, and platform regulation are enormous.",
    },
  },
  {
    id: "ftc-meta-social-monopoly",
    name: "FTC v. Meta Platforms (social networking)",
    shortName: "FTC vs Meta (social)",
    companies: ["meta"],
    jurisdictions: ["US"],
    conduct: ["merger", "exclusivity", "data_lockin", "abuse_of_dominance"],
    yearStart: 2020,
    status: "ongoing",
    summary:
      "The FTC alleges Meta illegally maintained a personal social networking monopoly through the Instagram and WhatsApp acquisitions and restrictive policies that hinder rivals and user switching.",
    regulatorArgument:
      "Meta bought emerging threats before they matured, then enveloped users in a data-rich ecosystem that raises entry barriers for independent social networks.",
    outcome:
      "Litigation continues after procedural setbacks and amended complaints; no liability finding or breakup order has been finalized.",
    laws: ["sherman-2", "ftc-5", "clayton-7"],
    markets: ["personal social networking", "mobile photo sharing", "consumer messaging"],
    sources: [
      {
        label: "FTC amended complaint (2021)",
        url: "https://www.ftc.gov/news-events/news/press-releases/2021/08/ftc-alleges-facebook-illegal-monopolization",
      },
      {
        label: "FTC case page",
        url: "https://www.ftc.gov/legal-library/browse/cases-proceedings/191-0134-facebook-inc",
      },
    ],
    readingMinutes: 11,
    keyDates: [
      { label: "Initial FTC complaint", date: "December 9, 2020" },
      { label: "Complaint dismissed (procedural)", date: "June 28, 2021" },
      { label: "Amended complaint filed", date: "August 19, 2021" },
      { label: "Discovery and merits litigation", date: "2022–ongoing" },
    ],
    timeline: [
      {
        date: "2012–2014",
        title: "Instagram and WhatsApp deals close",
        detail:
          "Facebook (now Meta) acquired photo-sharing and messaging apps that regulators later called nascent competitors to its core social graph.",
      },
      {
        date: "December 2020",
        title: "FTC sues to unwind acquisitions",
        detail:
          "The agency sought divestitures and accused Meta of a buy-or-bury strategy in personal social networking.",
      },
      {
        date: "2021",
        title: "Court rejects first complaint",
        detail:
          "A federal judge dismissed the initial filing for insufficient detail, but allowed a revised case to proceed.",
      },
      {
        date: "2022–ongoing",
        title: "Merits fight continues",
        detail:
          "Parties battle over market definition, whether TikTok competes in the same market, and whether past mergers can be unwound years later.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "The FTC says Meta (Facebook) bought Instagram and WhatsApp to kill future rivals and keep a lock on how friends connect online. Regulators want those deals undone—years after they closed. Meta says it faces fierce competition from TikTok and others. Courts have not ordered a breakup; the case is still grinding through litigation.",
      theStory: [
        "Social networks live and die on network effects: a app is useful because your friends are there. Once a platform reaches critical mass, newcomers struggle even if they build a better feature set.",
        "The FTC's case centers on Meta's purchases of Instagram (2012) and WhatsApp (2014). At the time, regulators cleared both deals. Years later, the agency argued those approvals were mistakes—that Meta was buying threats before they could challenge its core 'personal social network.'",
        "Prosecutors also point to platform policies: limiting how apps can connect to Facebook data, copying popular features, and designing products that keep users inside Meta's family of apps rather than experimenting with rivals.",
        "Meta counters that the market is broader than the FTC claims. TikTok, YouTube, Snapchat, and iMessage, it says, compete for attention and communication. Unwinding decade-old mergers, Meta argues, would punish success and create chaos for billions of users.",
        "A early court decision rejected the FTC's first complaint as too vague, a reminder that monopolization cases need concrete facts, not just big numbers. The agency filed a longer amended complaint that survived initial challenges.",
        "Discovery—document requests, executive depositions, expert reports—stretched over years. The fight over whether Instagram and WhatsApp belong in the same 'personal social networking' market as Facebook is technical but decisive.",
        "No trial verdict or settlement has resolved the matter. The case remains a flagship example of 'retroactive' merger enforcement in tech, with uncertain odds of divestiture.",
      ],
      whyItMatters: [
        "If the FTC can unwind old mergers, future tech acquisitions face higher regulatory risk—even after deals close.",
        "Network-effect markets are where competition concerns peak; this case defines how US law treats them.",
        "Small social startups may gain bargaining power if courts accept that incumbents cannot buy every rising rival.",
        "Users care about messaging and photo sharing interoperability—issues tied to Meta's ecosystem control.",
        "Outcome signals how aggressively US enforcers will pursue structural remedies versus conduct rules.",
      ],
      whatWasClaimed: [
        "Meta has monopoly power in US personal social networking.",
        "Instagram and WhatsApp acquisitions were meant to neutralize competitive threats, not just expand product lines.",
        "Platform policies and data advantages maintain the monopoly by deterring user multi-homing and rival entry.",
        "Divesting Instagram and/or WhatsApp is needed to restore competition.",
      ],
      theOtherSide: [
        "Meta says consumers use many apps for social connection and entertainment; the relevant market is not limited to Facebook-style feeds.",
        "It argues Instagram and WhatsApp succeeded because Meta invested in them.",
        "Retroactive divestiture would harm users and developers integrated with those services.",
        "Meta maintains it competes on product quality daily against well-funded rivals.",
      ],
      whatItMeansForYou: [
        "Your Instagram and WhatsApp accounts are not splitting tomorrow—the case is unresolved.",
        "If divestiture ever happened, account migration and ad targeting could change—but that remains speculative.",
        "Privacy and data portability debates overlap with this case; watch policy fights about sharing contacts across apps.",
        "For entrepreneurs, the case shows regulators may scrutinize acquisitions of small apps that later explode in popularity.",
        "Treat headlines about 'breaking up Facebook' as early rounds in a long legal marathon.",
      ],
      bottomLine:
        "FTC v. Meta is an ongoing attempt to undo famous tech mergers and limit platform power in social networking. No court has ordered a breakup yet; both sides still fight over what 'competition' even means in a TikTok era.",
    },
  },
  {
    id: "eu-apple-dma-app-store",
    name: "EU Apple App Store DMA compliance investigation",
    shortName: "EU Apple DMA store",
    companies: ["apple"],
    jurisdictions: ["EU"],
    conduct: ["market_access", "tying", "discrimination", "self_preferencing"],
    yearStart: 2024,
    status: "ongoing",
    summary:
      "The European Commission opened non-compliance proceedings alleging Apple's EU App Store rules—including core technology fees and anti-steering limits—undermine Digital Markets Act goals for fair app distribution and developer choice.",
    regulatorArgument:
      "Gatekeeper Apple must allow effective sideloading and alternative marketplaces without scare tactics or fees that neutralize DMA benefits; current rules still steer developers and users toward the App Store.",
    outcome:
      "Investigation ongoing; Apple has adjusted some policies but faces potential fines up to 10% of global turnover if non-compliance is found.",
    remedies:
      "If violations confirmed: orders for effective third-party stores, link-outs, and fair fee structures; periodic penalty payments possible.",
    laws: ["dma", "tfeu-102"],
    markets: ["mobile app distribution", "in-app payments", "iOS ecosystem"],
    sources: [
      {
        label: "EC Apple DMA non-compliance investigation",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_24_1682",
      },
      {
        label: "Digital Markets Act overview",
        url: "https://digital-markets-act.ec.europa.eu/",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Apple designated gatekeeper", date: "September 2023" },
      { label: "DMA core obligations effective", date: "March 7, 2024" },
      { label: "Non-compliance investigation opened", date: "March 25, 2024" },
      { label: "Apple policy updates (reported)", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "March 2024",
        title: "EU compliance day arrives",
        detail:
          "Apple published alternative marketplace rules in Europe, enabling sideloading in theory while charging new fees.",
      },
      {
        date: "March 2024",
        title: "Commission opens probe",
        detail:
          "Regulators questioned whether scary onboarding screens and core technology fees deter real competition.",
      },
      {
        date: "2024",
        title: "Developers push back",
        detail:
          "Spotify, Epic, and trade groups argued Apple's EU changes were compliance theater that preserved App Store economics.",
      },
      {
        date: "Ongoing",
        title: "Enforcement limbo",
        detail:
          "Commission staff review Apple's updates; no final non-compliance decision or fine has been announced yet.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Europe's Digital Markets Act requires Apple to let EU users and developers use alternative app stores and payment links—not only Apple's App Store. Apple changed its rules, but regulators opened an investigation saying new fees and warning screens still block real choice. Nothing is decided yet; Apple denies breaking the law.",
      theStory: [
        "For years, iPhone apps in most countries could only reach customers through Apple's App Store, with Apple taking a cut of many purchases. Developers called it a tollbooth; Apple called it quality control and security.",
        "The EU's Digital Markets Act took a different approach: designate the biggest platforms as 'gatekeepers' and impose duties up front—before a years-long abuse-of-dominance trial.",
        "When DMA obligations kicked in March 2024, Apple allowed alternative marketplaces and external purchase links in Europe. But it also introduced a 'core technology fee' on large developers and prominent security warnings when users install outside stores.",
        "The European Commission quickly opened a formal non-compliance investigation. Regulators asked whether those design choices effectively continued App Store dominance while technically meeting the letter of the law.",
        "Rivals like Spotify and Epic—already fighting Apple in US courts—argued EU users still face friction that steers them back to Apple payments. Trade associations submitted complaints about confusing fee formulas.",
        "Apple maintains its EU program complies with the DMA while protecting users from malware and fraud. It says alternative stores are live and that developers who dislike Apple's model can use them.",
        "The probe is ongoing. Possible outcomes range from orders to simplify fees and screens to substantial fines. Either way, the case will shape how ex ante digital regulation works in practice—not just on paper.",
      ],
      whyItMatters: [
        "EU iPhone owners may get real app store choice—or paper choice—depending on enforcement.",
        "Developers worldwide watch EU fee fights because Apple often harmonizes policies globally over time.",
        "The case tests whether speedier DMA rules can succeed where traditional antitrust cases took a decade.",
        "Security versus openness is a genuine trade-off; regulators must show they can police bad faith without banning safety measures.",
        "US lawmakers cite EU Apple fights when drafting their own app store bills.",
      ],
      whatWasClaimed: [
        "Apple's EU app distribution rules fail DMA requirements for effective third-party marketplaces.",
        "Anti-steering and fee structures discourage developers from using alternative billing and stores.",
        "Onboarding warnings and technical barriers self-preference the App Store.",
        "Gatekeepers cannot use new charges to claw back competition benefits the DMA intended to create.",
      ],
      theOtherSide: [
        "Apple says sideloading increases malware risk and that warnings inform users honestly.",
        "It argues the core technology fee reflects value Apple provides even when apps distribute elsewhere.",
        "Apple maintains many developers continue voluntarily using the App Store under new EU options.",
        "It warns aggressive remedies could reduce investment in iOS security features Europeans rely on.",
      ],
      whatItMeansForYou: [
        "If you use an iPhone in the EU, you may see prompts about alternative app sources—read them, but know policies may still change.",
        "App prices could shift if developers pass through lower or higher platform fees.",
        "Nothing requires Apple to copy EU rules worldwide yet, though pressure builds.",
        "Until the Commission finishes, treat 'Apple fined under DMA' rumors as unconfirmed.",
        "Competition here is about developer economics as much as consumer menus.",
      ],
      bottomLine:
        "EU regulators are actively testing whether Apple's post-DMA App Store changes deliver genuine competition or dressed-up status quo. The investigation is open; Apple has not been found non-compliant yet.",
    },
  },
  {
    id: "eu-amazon-fba-buybox-followon",
    name: "EU Amazon Buy Box and FBA follow-on probe",
    shortName: "EU Amazon Buy Box follow-on",
    companies: ["amazon"],
    jurisdictions: ["EU"],
    conduct: ["self_preferencing", "discrimination", "market_access", "vertical_restraint"],
    yearStart: 2024,
    status: "ongoing",
    summary:
      "Following prior EU antitrust commitments on Buy Box and marketplace data, the Commission opened a fresh investigation into whether Amazon still favors its retail offers and Fulfillment by Amazon sellers in ranking and logistics.",
    regulatorArgument:
      "Amazon may continue to use marketplace data and FBA tie-ins to self-preference its own retail unit and captive logistics, disadvantaging independent merchants despite earlier remedies.",
    outcome:
      "Formal investigation ongoing; no new infringement decision or fine issued as of public reporting.",
    laws: ["tfeu-102", "dma"],
    markets: ["online marketplaces", "third-party seller services", "e-commerce logistics"],
    sources: [
      {
        label: "EC Amazon marketplace investigation (2024)",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_24_3847",
      },
      {
        label: "Prior Amazon Buy Box decision",
        url: "https://competition-policy.ec.europa.eu/antitrust/cases/decisions/40462_en",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Prior EU commitments decision", date: "December 2022" },
      { label: "New formal investigation opened", date: "July 2024" },
      { label: "DMA gatekeeper designation (Amazon)", date: "September 2023" },
      { label: "Investigation ongoing", date: "2025–2026" },
    ],
    timeline: [
      {
        date: "2020–2022",
        title: "Original Buy Box case",
        detail:
          "EU regulators challenged Amazon's use of non-public marketplace data and Buy Box criteria favoring its retail arm.",
      },
      {
        date: "December 2022",
        title: "Commitments accepted",
        detail:
          "Amazon offered behavioral remedies on data use and equal Buy Box treatment rather than fighting to a fine.",
      },
      {
        date: "July 2024",
        title: "Follow-on probe opens",
        detail:
          "The Commission reopened scrutiny amid complaints that FBA requirements and advertising still skew visibility.",
      },
      {
        date: "Ongoing",
        title: "DMA overlap",
        detail:
          "Amazon's gatekeeper duties on fair ranking and data use run parallel to classic Article 102 enforcement.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Europe already pushed Amazon to change how its Buy Box picks default sellers on its marketplace. Now regulators are investigating again, asking whether Amazon still favors its own products and fulfillment service (FBA). Sellers say ranking and shipping rules remain unfair. Amazon disputes that. The probe is active—no new fine yet.",
      theStory: [
        "Amazon's marketplace lets millions of independent sellers list products next to Amazon's own retail offers. The Buy Box—the prominent 'Add to Cart' button—can make or break a seller's day.",
        "In 2022 the European Commission accepted Amazon's commitments to stop using non-public seller data for its retail business and to apply fair Buy Box criteria. That closed one chapter without a fine.",
        "Merchants and trade groups soon argued the fixes were incomplete. Fulfillment by Amazon (FBA)—Amazon's warehousing and shipping program—still seemed tied to Prime badges, ad placement, and eligibility for certain promotions.",
        "In July 2024 the Commission opened a new formal investigation. It examines whether Amazon's marketplace and logistics practices still illegally favor Amazon-as-retailer and FBA sellers over merchants who handle their own shipping.",
        "The probe intersects with the Digital Markets Act, which designates Amazon a gatekeeper with duties on fair ranking and data access for business users.",
        "Amazon says it complies with prior commitments and DMA rules, invests heavily in seller tools, and competes with countless other retailers online.",
        "Because the investigation is ongoing, no new guilt finding or penalty has been announced. The case will signal whether behavioral remedies alone can police a hybrid retailer-marketplace.",
      ],
      whyItMatters: [
        "Small Amazon sellers depend on Buy Box visibility; ranking rules are their lifeline.",
        "Self-preferencing on marketplaces is a core DMA theme—outcomes here preview enforcement elsewhere.",
        "Consumers may pay higher marketplace prices if competition among sellers is dampened.",
        "Follow-on probes show commitments do not always end regulator attention.",
        "Logistics tie-ins (FBA) blur lines between platform services and retail strategy.",
      ],
      whatWasClaimed: [
        "Amazon still uses marketplace advantages to boost its first-party retail offers.",
        "FBA linkage discriminates against sellers who fulfill orders themselves.",
        "Prior commitments failed to restore fair competition on the marketplace.",
        "Gatekeeper duties on fair ranking may also be breached.",
      ],
      theOtherSide: [
        "Amazon says sellers choose FBA voluntarily for speed and Prime eligibility.",
        "It argues the marketplace remains highly competitive with transparent policies.",
        "Amazon maintains it implemented EU commitments and continues to refine them.",
        "It points to heavy investment in anti-counterfeit and seller education programs.",
      ],
      whatItMeansForYou: [
        "Shoppers may not notice day-to-day, but Buy Box rules affect which seller fulfills your order and at what price.",
        "If remedies tighten, you might see more non-Amazon-fulfilled offers winning the default button.",
        "Prime shipping benefits could change if FBA linkages are restricted—watch EU updates only for now.",
        "Third-party sellers worldwide track EU Amazon cases for policy hints.",
        "No new consumer refunds or fines are tied to this open probe yet.",
      ],
      bottomLine:
        "Europe is revisiting Amazon marketplace fairness after earlier Buy Box commitments. Investigators suspect lingering self-preferencing through FBA and retail ranking—Amazon disagrees, and the case remains unresolved.",
    },
  },
  {
    id: "us-doj-live-nation-monopoly",
    name: "United States v. Live Nation–Ticketmaster",
    shortName: "DOJ Live Nation suit",
    companies: ["ticketmaster"],
    jurisdictions: ["US"],
    conduct: ["merger", "exclusivity", "vertical_restraint", "abuse_of_dominance"],
    yearStart: 2024,
    status: "ongoing",
    summary:
      "The DOJ and states sued Live Nation–Ticketmaster alleging illegal monopolization and exclusionary practices across concert promotion, venues, and ticketing after the 2010 merger that combined the dominant promoter and primary ticketer.",
    regulatorArgument:
      "Vertical integration and long-term exclusive venue contracts foreclose rival ticketers and promoters, leading to higher fees, worse service, and stifled innovation in live events.",
    outcome:
      "Litigation ongoing; DOJ seeks structural and behavioral relief including possible divestiture of Ticketmaster. No court judgment yet.",
    laws: ["sherman-2", "clayton-7"],
    markets: ["primary ticketing", "concert promotion", "amphitheater venues"],
    sources: [
      {
        label: "DOJ Live Nation complaint announcement",
        url: "https://www.justice.gov/opa/pr/justice-department-sues-live-nation-ticketmaster-monopolizing-markets-across-live",
      },
      {
        label: "DOJ case filing",
        url: "https://www.justice.gov/atr/case/united-states-and-plaintiff-states-v-live-nation-entertainment-inc",
      },
    ],
    readingMinutes: 11,
    keyDates: [
      { label: "Live Nation–Ticketmaster merger cleared (DOJ)", date: "2010" },
      { label: "DOJ antitrust suit filed", date: "May 23, 2024" },
      { label: "States joined as plaintiffs", date: "May 2024" },
      { label: "Pretrial litigation", date: "2024–ongoing" },
    ],
    timeline: [
      {
        date: "2010",
        title: "Merged giant emerges",
        detail:
          "DOJ allowed the Live Nation and Ticketmaster merger with a consent decree, creating a vertically integrated live-events powerhouse.",
      },
      {
        date: "2019–2023",
        title: "Public frustration grows",
        detail:
          "Ticketmaster outages during major on-sales and high fees fueled congressional hearings and renewed enforcement interest.",
      },
      {
        date: "May 23, 2024",
        title: "DOJ sues to break up",
        detail:
          "Federal and state enforcers alleged the merger failed and asked courts to restore competition, including potential Ticketmaster divestiture.",
      },
      {
        date: "Ongoing",
        title: "Venue exclusives under microscope",
        detail:
          "Plaintiffs focus on long-term amphitheater deals and retaliation claims against venues that consider rival ticketers.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Concert tickets feel expensive and glitchy—and the US government blames Live Nation–Ticketmaster's combined power over promotion, venues, and ticketing. Regulators want to unwind parts of the 2010 merger, but courts haven't ruled yet. Live Nation says it competes fairly and that artists and venues choose Ticketmaster because it works best.",
      theStory: [
        "Buying concert tickets can feel like a high-stakes lottery: queues, dynamic pricing, service fees, and sold-out shows within minutes. Ticketmaster handles a huge share of primary sales for major acts.",
        "Live Nation promotes tours and owns or manages many venues. In 2010 it merged with Ticketmaster despite antitrust concerns; DOJ approved the deal with conditions meant to prevent abuse.",
        "Fans, artists, and rival ticketers argued those conditions failed. High-profile site crashes—like during Taylor Swift ticket sales—put political spotlight on market concentration.",
        "In May 2024 the Justice Department and dozens of states sued. They claim Live Nation uses exclusive venue contracts and threats to block competing ticketers and promoters, preserving a monopoly that hurts fans and artists.",
        "The government seeks structural relief—potentially forcing Ticketmaster to separate from Live Nation—plus rules on venue deals and retaliation.",
        "Live Nation responds that it faces competition from venues, sports teams, and secondary markets; that fees fund infrastructure artists demand; and that breakups would harm touring ecosystems.",
        "The case is in early litigation stages. No judge has found Live Nation liable or ordered a divestiture. Congressional pressure and private lawsuits add noise but do not replace the federal trial path.",
      ],
      whyItMatters: [
        "Live event prices and fees hit ordinary fans directly—rare in abstract antitrust debates.",
        "Tests whether a merger cleared with conditions can later be challenged as a failed experiment.",
        "Venue exclusives mirror app-store exclusivity fights in another industry.",
        "Artists and independent promoters may gain leverage if ticketer power is curbed.",
        "Outcome could reshape how sports and festivals sell tickets too.",
      ],
      whatWasClaimed: [
        "Live Nation–Ticketmaster monopolizes or attempts to monopolize primary ticketing and related live-event services.",
        "Exclusive venue agreements and retaliation foreclose rivals.",
        "The 2010 merger and subsequent conduct led to higher fees and reduced innovation.",
        "Structural separation of Ticketmaster is necessary to restore competition.",
      ],
      theOtherSide: [
        "Live Nation says ticketing is competitive and that artists choose partners freely.",
        "It argues service fees reflect real costs of anti-bot technology and venue investments.",
        "It maintains the 2010 consent decree worked and that breakup would disrupt touring.",
        "Live Nation points to alternative sales channels and resale markets as competitive checks.",
      ],
      whatItMeansForYou: [
        "Ticket prices won't change overnight—this case will take years unless settled.",
        "If remedies succeed, you might see more ticketer options at local venues.",
        "Fee transparency could improve with behavioral orders even without a breakup.",
        "Follow court dates, not politician sound bites, for real legal progress.",
        "Secondary market sites (resellers) are a separate issue from this primary ticketing case.",
      ],
      bottomLine:
        "DOJ's Live Nation suit is the highest-profile attempt to fix concert ticketing concentration since the 2010 merger. Fans feel the pain, but courts have not yet agreed the company broke the law—or ordered a breakup.",
    },
  },
  {
    id: "eu-booking-mfn-residual",
    name: "EU Booking.com parity clauses — residual enforcement",
    shortName: "EU Booking MFN probe",
    companies: ["booking"],
    jurisdictions: ["EU"],
    conduct: ["resale_restriction", "vertical_restraint", "price_fix", "market_access"],
    yearStart: 2023,
    status: "ongoing",
    summary:
      "After national crackdowns on hotel rate parity (MFN) clauses, EU authorities continue probing whether Booking.com still restricts hotels from offering lower prices or better terms on direct channels.",
    regulatorArgument:
      "Narrow or rebranded parity terms may still deter hotels from discounting on their own websites, softening competition among OTAs and raising consumer room rates.",
    outcome:
      "Investigations and sector inquiries ongoing across member states and at EU level; no pan-EU final decision publicly concluded.",
    laws: ["tfeu-101", "tfeu-102"],
    markets: ["online travel agencies", "hotel accommodation distribution"],
    sources: [
      {
        label: "EC sector inquiry on consumer IoT/travel (context)",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_23_4467",
      },
      {
        label: "Italian AGCM Booking proceedings (example)",
        url: "https://www.agcm.it/en/media/press-releases/2023/AGCM",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Wide EU parity commitments era", date: "2013–2015" },
      { label: "National probes renewed", date: "2022–2023" },
      { label: "DMA gatekeeper context (Booking)", date: "2024" },
      { label: "Residual investigations ongoing", date: "2024–ongoing" },
    ],
    timeline: [
      {
        date: "2010s",
        title: "Parity clauses spread",
        detail:
          "Major OTAs required hotels not to offer lower public rates on their own sites—a classic most-favored-nation (MFN) restraint.",
      },
      {
        date: "2013–2015",
        title: "Europe forces changes",
        detail:
          "Several countries banned or negotiated away wide parity clauses; Booking narrowed its contract language EU-wide.",
      },
      {
        date: "2022–2023",
        title: "Regulators revisit contracts",
        detail:
          "Italy, Sweden, and others opened fresh cases alleging 'narrow' parity and best-price guarantees still chill hotel discounting.",
      },
      {
        date: "Ongoing",
        title: "Cross-border coordination",
        detail:
          "Commission and national authorities share evidence on whether hotels can practically undercut OTA listings today.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Booking.com and other travel sites once barred hotels from offering cheaper rooms on their own websites. Europe banned the worst 'parity' clauses years ago, but regulators are investigating again—saying fine-print rules may still block discounts. Hotels want pricing freedom; Booking says it competes fairly. Probes continue with no EU-wide final ruling yet.",
      theStory: [
        "When you book a hotel online, you might check Booking.com, Expedia, or the hotel's site. In theory, competition among those channels should lower prices. Parity clauses were designed to prevent hotels from undercutting OTAs on their direct sites.",
        "European competition authorities concluded that wide MFN clauses reduced inter-brand competition and kept room rates higher. Booking and Expedia agreed to remove the broadest versions in Europe.",
        "Hotels and smaller regulators argue the problem never fully disappeared. 'Narrow' parity, rate parity for metasearch, or loyalty-rate restrictions may still discourage hotels from posting better deals on their own websites.",
        "Italy's competition authority and peers reopened proceedings in the 2020s, examining contract templates and algorithmic price display practices.",
        "Booking maintains its current terms comply with prior commitments and that hotels retain flexibility to run promotions and loyalty programs.",
        "The European Commission's broader travel and digital gatekeeper work adds context: Booking was designated under the DMA, bringing new transparency duties separate from classic parity law.",
        "Because investigations remain open, there is no fresh EU-wide fine or universal contract order yet—only an active enforcement landscape hotels and travelers should watch.",
      ],
      whyItMatters: [
        "Hotel room prices on vacation directly tie to OTA contract rules many travelers never see.",
        "Residual MFN probes show antitrust fixes need monitoring—narrowing clauses may not be enough.",
        "Independent hotels depend on OTAs for discovery but hate margin pressure from parity.",
        "DMA duties on gatekeepers may complement traditional Article 101/102 parity theories.",
        "US travelers booking EU hotels indirectly feel European enforcement outcomes.",
      ],
      whatWasClaimed: [
        "Booking's post-commitment contracts still restrict hotels' ability to offer lower direct rates.",
        "Best-price and narrow parity clauses have similar anticompetitive effects as banned wide MFNs.",
        "Hotels fear retaliation in search ranking if they discount off-platform.",
        "Consumers pay higher average room rates than they would under fully competitive distribution.",
      ],
      theOtherSide: [
        "Booking says hotels set their own prices and can run direct promotions within clear rules.",
        "It argues OTAs provide marketing value that justifies contractual consistency.",
        "Booking maintains prior EU-wide commitments resolved parity concerns.",
        "It points to hotel direct-booking campaigns and loyalty apps as proof of channel competition.",
      ],
      whatItMeansForYou: [
        "Compare hotel direct sites with OTAs—sometimes direct is cheaper, sometimes not; probes aim to widen those savings.",
        "Business travelers negotiating corporate rates may benefit if hotels gain pricing freedom.",
        "No immediate booking fee refunds stem from open investigations.",
        "Watch country-level decisions in Italy and Nordics for early signals.",
        "Parity fights are about contract law in B2B travel, not consumer class actions—yet.",
      ],
      bottomLine:
        "EU Booking parity enforcement didn't end when wide MFN clauses came off paper. Regulators still ask whether hotels can truly discount direct—and until they finish, the travel pricing debate stays open.",
    },
  },
  {
    id: "cma-google-privacy-sandbox",
    name: "CMA investigation into Google Privacy Sandbox",
    shortName: "CMA Privacy Sandbox",
    companies: ["google"],
    jurisdictions: ["Other"],
    conduct: ["self_preferencing", "market_access", "data_lockin", "abuse_of_dominance"],
    yearStart: 2021,
    status: "ongoing",
    summary:
      "The UK Competition and Markets Authority monitors Google's plan to replace third-party cookies with Privacy Sandbox tools, examining whether the shift could concentrate ad data in Google while harming publishers and ad-tech rivals.",
    regulatorArgument:
      "As gatekeeper of Chrome and major ad tools, Google must not use privacy changes to self-preference its own advertising stack or weaken independent measurement and targeting providers.",
    outcome:
      "Commitments accepted in 2022 with ongoing oversight; CMA continues testing and enforcement as Google rolls out Sandbox features—no final all-clear.",
    remedies:
      "Behavioral commitments: CMA oversight, testing periods, non-discrimination for rivals; potential further orders if harms emerge.",
    laws: ["tfeu-102"],
    markets: ["web browsers", "digital advertising", "ad measurement", "publisher monetization"],
    sources: [
      {
        label: "CMA Privacy Sandbox case page",
        url: "https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes",
      },
      {
        label: "CMA acceptance of commitments",
        url: "https://www.gov.uk/government/news/cma-accepts-commitments-from-google-on-privacy-sandbox",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "CMA opened investigation", date: "January 2021" },
      { label: "Commitments accepted", date: "February 2022" },
      { label: "Chrome cookie deprecation delays", date: "2024–2025" },
      { label: "Ongoing CMA monitoring", date: "2025–ongoing" },
    ],
    timeline: [
      {
        date: "2019–2020",
        title: "Google announces cookie phase-out",
        detail:
          "Chrome planned to end third-party cookies, proposing Privacy Sandbox APIs for interest-based ads without individual tracking.",
      },
      {
        date: "2021",
        title: "CMA intervenes",
        detail:
          "UK regulators worried the change could shift ad spending to Google tools while crushing independent ad-tech firms.",
      },
      {
        date: "2022",
        title: "Supervised commitments",
        detail:
          "Google agreed to CMA oversight, delay timelines, and engage rivals in testing—avoiding an immediate infringement finding.",
      },
      {
        date: "Ongoing",
        title: "Rollout under watch",
        detail:
          "As Google ships Topics API and related tools, CMA evaluates competitive effects; publishers and rivals remain vocal.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Google wants to replace tracking cookies in Chrome with new Privacy Sandbox tools. UK regulators opened a long-running investigation worried that the switch could hand Google more ad power while hurting news sites and ad-tech companies. Google made promises to the CMA and keeps delaying cookie removal. Oversight continues—no final verdict that the plan is safe for competition.",
      theStory: [
        "Third-party cookies—small files that follow you across websites—power much of today's open-web advertising. Privacy advocates hate them; publishers and ad companies depend on them for revenue.",
        "Google announced Chrome would phase out third-party cookies and replace them with Privacy Sandbox technologies meant to show relevant ads with less individual tracking.",
        "Competitors and media groups feared a bait-and-switch: Google would ban others' tracking while keeping rich data inside its own Ads and Analytics products, effectively self-preferencing its stack.",
        "The UK Competition and Markets Authority opened a formal investigation in 2021—one of the first major probes treating privacy engineering as a competition issue.",
        "Rather than sue immediately, the CMA accepted Google's commitments: longer timelines, transparency, and structured testing with industry participants under CMA-appointed monitoring.",
        "Rollouts slipped repeatedly. Chrome's cookie deprecation timeline moved to 2025 and beyond as regulators and developers asked for more evidence that publishers would not lose money.",
        "The matter remains active oversight, not a closed case. The CMA can reopen enforcement if Sandbox tools appear to crush rival measurement or ad buying—Google insists the project balances privacy and competition.",
      ],
      whyItMatters: [
        "Chrome's market share means cookie policy is de facto industry law for open-web ads.",
        "News sites funding journalism through ads could lose revenue if transitions are mishandled.",
        "Privacy and competition goals collide here—regulators try to police both without picking a single winner.",
        "US and EU enforcers watch the CMA model for managing platform-initiated tech transitions.",
        "Advertisers may need new tools; outcomes affect whether small sites stay ad-funded.",
      ],
      whatWasClaimed: [
        "Privacy Sandbox could concentrate ad data and spending in Google products.",
        "Independent ad-tech and measurement firms might be excluded or degraded.",
        "Publishers would face lower yields while Google captures more margin.",
        "Announcing the change without adequate rival input abuses dominance in browsers and ads.",
      ],
      theOtherSide: [
        "Google says Sandbox improves user privacy and provides open APIs anyone can implement.",
        "It argues cookies were never sustainable under privacy law trends anyway.",
        "Google maintains publishers will retain monetization with aggregated targeting tools.",
        "It cooperates with CMA testing and has delayed timelines to address concerns.",
      ],
      whatItMeansForYou: [
        "You may see fewer creepy retargeting ads—or different kinds of ads—as cookies fade.",
        "Free websites could get poorer or paywall more if ad revenue drops during transition.",
        "Nothing requires you to change settings today; timelines keep shifting.",
        "UK oversight matters globally because ad tech builds for Chrome first.",
        "Treat 'cookies are dead' headlines as phased, contested policy—not overnight fact.",
      ],
      bottomLine:
        "The CMA's Privacy Sandbox probe treats Google's cookie phase-out as a competition event, not just a privacy upgrade. Commitments bought time, but monitoring continues—and no regulator has fully signed off.",
    },
  },
  {
    id: "eu-microsoft-teams-bundling",
    name: "EU Microsoft Teams unbundling investigation",
    shortName: "EU Microsoft Teams",
    companies: ["microsoft"],
    jurisdictions: ["EU"],
    conduct: ["tying", "abuse_of_dominance", "self_preferencing", "market_access"],
    yearStart: 2023,
    status: "ongoing",
    summary:
      "The European Commission investigates whether Microsoft illegally tied Teams videoconferencing to Office 365 and Microsoft 365 suites, using suite dominance to foreclose Slack and other rivals.",
    regulatorArgument:
      "Bundling Teams with ubiquitous productivity subscriptions made it costly for business customers to choose standalone competitors, especially during pandemic remote-work shifts.",
    outcome:
      "Microsoft offered worldwide unbundling proposals; Commission formal investigation continues—no final infringement decision yet.",
    laws: ["tfeu-102", "dma"],
    markets: ["team collaboration software", "videoconferencing", "office productivity suites"],
    sources: [
      {
        label: "EC Microsoft Teams investigation",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_23_4427",
      },
      {
        label: "Microsoft Teams unbundling announcement",
        url: "https://blogs.microsoft.com/eupolicy/2024/03/25/unbundling-microsoft-teams-worldwide/",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Slack complaint to EC (reported)", date: "2020" },
      { label: "Formal investigation opened", date: "July 2023" },
      { label: "Microsoft global unbundling offer", date: "March 2024" },
      { label: "Investigation ongoing", date: "2024–ongoing" },
    ],
    timeline: [
      {
        date: "2020",
        title: "Rival complaint",
        detail:
          "Salesforce-owned Slack alleged Microsoft leveraged Office dominance to crush standalone chat tools by bundling Teams.",
      },
      {
        date: "July 2023",
        title: "EU opens case",
        detail:
          "The Commission began a formal probe into tying and possible refusal to share interoperability information.",
      },
      {
        date: "March 2024",
        title: "Microsoft unbundles globally",
        detail:
          "Microsoft separated Teams from core suites worldwide, cutting prices for Office without Teams in Europe first.",
      },
      {
        date: "Ongoing",
        title: "Commission evaluates fixes",
        detail:
          "Regulators assess whether unbundling and new pricing restore fair choice or leave competitive harm uncured.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Europe is investigating whether Microsoft illegally bundled Teams video chat into Office subscriptions, making it hard for Slack and others to compete. Microsoft now sells Office without Teams in many markets and cut prices—but the EU probe is not closed. No fine or final ruling yet.",
      theStory: [
        "During COVID-19 lockdowns, videoconferencing became essential. Microsoft Teams rode bundled distribution through Microsoft 365 subscriptions used by millions of employers and schools.",
        "Slack—now part of Salesforce—complained to EU regulators that customers effectively got Teams 'free' inside suites they already paid for, while rivals had to charge separately.",
        "The European Commission opened a formal investigation in July 2023 under abuse-of-dominance rules, echoing historic Microsoft media-player tying cases but in cloud productivity.",
        "Microsoft responded by unbundling Teams from Microsoft 365 in Europe and later worldwide, offering lower-priced suites without Teams and standalone Teams plans.",
        "Regulators must decide whether those changes fully undo alleged harm or arrived too late after rivals lost share.",
        "The case intersects with Microsoft's gatekeeper status under the DMA for Windows and LinkedIn, though Teams tying is primarily classic Article 102 territory.",
        "Investigation continues; Microsoft has not been fined or found to have abused dominance in a final decision.",
      ],
      whyItMatters: [
        "Office defaults shape which chat tool your employer uses—often without a explicit vote.",
        "Bundling cases in cloud software update 1990s PC tying fights for subscription era.",
        "Successful unbundling could embolden rivals and independent procurement teams.",
        "Shows EU willingness to probe SaaS suites, not just app stores and search.",
        "Pricing changes may affect IT budgets even when products look similar.",
      ],
      whatWasClaimed: [
        "Microsoft tied Teams to dominant office productivity suites illegally.",
        "Bundling foreclosed Slack and other standalone collaboration tools.",
        "Microsoft withheld interoperability information needed for fair competition.",
        "Remedies must restore equal footing, not just cosmetic SKU splits.",
      ],
      theOtherSide: [
        "Microsoft says Teams competes with Zoom, Google Meet, and Slack on merit.",
        "It argues unbundling and new prices address any competitive concerns.",
        "Microsoft maintains integration benefits customers who want unified workflows.",
        "It points to rapid Teams improvements during the pandemic as consumer welfare gains.",
      ],
      whatItMeansForYou: [
        "Your employer may renegotiate Microsoft contracts with optional Teams SKUs.",
        "If you prefer Slack or Zoom, IT departments gain leverage from unbundling.",
        "No refunds for past bundled years are on the table yet.",
        "Global pricing changes may appear even outside Europe.",
        "Case is ongoing—Microsoft has not been declared guilty.",
      ],
      bottomLine:
        "EU Teams tying probe pushed Microsoft to unbundle worldwide, but investigators still decide whether that fixes alleged abuse. Workplace chat competition hangs in the balance.",
    },
  },
  {
    id: "us-kroger-albertsons-merger",
    name: "FTC challenge to Kroger / Albertsons supermarket merger",
    shortName: "Kroger–Albertsons blocked",
    companies: ["kroger", "albertsons"],
    jurisdictions: ["US"],
    conduct: ["merger"],
    yearStart: 2022,
    status: "appealed",
    summary:
      "The FTC and states sued to block Kroger's proposed $24.6 billion acquisition of Albertsons, alleging the combination would raise grocery prices and harm unionized workers; a federal judge enjoined the deal and companies appealed.",
    regulatorArgument:
      "Combining the second- and fourth-largest US supermarket operators would reduce head-to-head competition in hundreds of local markets, with inadequate divestitures to C&S Wholesale.",
    outcome:
      "District court blocked the merger in December 2024; Kroger and Albertsons appealed. Albertsons later terminated the merger agreement and sought breakup fees—litigation continues on multiple fronts.",
    laws: ["clayton-7", "hart-scott"],
    markets: ["retail grocery", "supermarket pharmacy", "local food retail"],
    sources: [
      {
        label: "FTC challenge announcement",
        url: "https://www.ftc.gov/news-events/news/press-releases/2024/02/ftc-order-blocks-kroger-albertsons-merger",
      },
      {
        label: "FTC complaint",
        url: "https://www.ftc.gov/legal-library/browse/cases-proceedings/231-0076-kroger-albertsons",
      },
    ],
    readingMinutes: 11,
    keyDates: [
      { label: "Merger announced", date: "October 2022" },
      { label: "FTC and states sued to block", date: "February 26, 2024" },
      { label: "District court injunction", date: "December 2024" },
      { label: "Appeals and contract disputes", date: "2025–ongoing" },
    ],
    timeline: [
      {
        date: "October 2022",
        title: "Mega-merger unveiled",
        detail:
          "Kroger agreed to buy Albertsons, proposing store divestitures to C&S Wholesale to preserve local competition.",
      },
      {
        date: "2023–2024",
        title: "Regulators unite against deal",
        detail:
          "FTC, state AGs, and Washington state litigation argued divestitures were inadequate and workers would suffer.",
      },
      {
        date: "December 2024",
        title: "Court blocks merger",
        detail:
          "A federal judge ruled for the government, finding likely anticompetitive harm in numerous geographic markets.",
      },
      {
        date: "2025–ongoing",
        title: "Appeals and fallout",
        detail:
          "Companies appealed; Albertsons moved to exit the deal and pursue damages—outcomes still unresolved in higher courts.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Kroger wanted to buy rival Albertsons in one of the biggest US grocery deals ever. Regulators and a federal judge said it would likely raise food prices and hurt workers. The merger is blocked for now, but Kroger appealed. Albertsons later tried to walk away and sue for a breakup fee. Grocery aisles stay separate while courts keep fighting.",
      theStory: [
        "Grocery is a local business: most shoppers pick among stores near home, not national brands on a map. Antitrust enforcers look market-by-market—city by city—when supermarket mergers arise.",
        "Kroger and Albertsons overlap heavily in the West and parts of the Midwest. Together they would control an enormous share of US supermarket sales, trailing only Walmart nationally.",
        "The companies proposed selling hundreds of stores to C&S Wholesale—a buyer regulators doubted could operate them competitively, citing scale, supply chain, and management experience gaps.",
        "The FTC and a bipartisan group of states sued in early 2024, emphasizing price effects on eggs, milk, and everyday baskets, plus union concerns about bargaining power over wages.",
        "After a trial, a federal judge granted the government's request and blocked the merger in December 2024—a major win for aggressive grocery enforcement.",
        "Kroger appealed, arguing the court misunderstood divestiture viability and competitive dynamics with Walmart, Costco, and Aldi.",
        "Albertsons subsequently terminated the agreement and sought a reported billion-dollar breakup fee, spawning additional contract litigation. The antitrust story is therefore both 'appealed merger block' and 'corporate breakup fight'—neither fully settled.",
      ],
      whyItMatters: [
        "Food prices are politically explosive; grocery merger law affects household budgets directly.",
        "Case revives debate over whether divestitures to smaller buyers ever work in retail.",
        "Union and local worker groups increasingly join antitrust coalitions.",
        "Appeals will clarify how courts weigh national big-box rivals versus local supermarket overlap.",
        "Blocked deals still generate years of litigation over fees and strategy.",
      ],
      whatWasClaimed: [
        "Merger would substantially lessen competition in numerous local grocery markets.",
        "Proposed C&S divestitures were insufficient and likely to fail.",
        "Combined buyer power would harm suppliers and consumers through higher prices.",
        "Workers would face weaker bargaining conditions post-merger.",
      ],
      theOtherSide: [
        "Kroger said the deal would lower prices through efficiencies and better compete with Walmart and Amazon.",
        "It argued C&S could successfully operate divested banners.",
        "Companies claimed regulators ignored vigorous competition from club stores and discounters.",
        "Kroger maintains the injunction misapplied merger law and economic evidence.",
      ],
      whatItMeansForYou: [
        "Your local Kroger and Safeway/Albertsons stores remain separate for now in blocked markets.",
        "Prices won't automatically fall because the deal failed—competition structure stays similar to today.",
        "Watch appeals court rulings for precedent on future food retail mergers.",
        "Breakup fee litigation won't change checkout prices but shows high stakes for executives.",
        "State AG lawsuits may continue even as companies pivot strategy.",
      ],
      bottomLine:
        "Kroger–Albertsons is a blocked, appealed supermarket merger with spin-off contract wars. Regulators scored a trial victory, but courts haven't spoken finally—and no merged chain exists.",
    },
  },
  {
    id: "eu-apple-nfc-payments",
    name: "EU Apple NFC and mobile payments investigation",
    shortName: "EU Apple NFC payments",
    companies: ["apple"],
    jurisdictions: ["EU"],
    conduct: ["refusal_to_deal", "abuse_of_dominance", "market_access", "interoperability"],
    yearStart: 2022,
    status: "ongoing",
    summary:
      "The European Commission investigates whether Apple restricts rival mobile wallet developers from accessing iPhone NFC hardware, limiting competition to Apple Pay in contactless payments.",
    regulatorArgument:
      "Apple dominates mobile wallets on iOS and allegedly blocks third-party apps from using NFC tap-to-pay APIs on equal terms, foreclosing banks and fintech wallets.",
    outcome:
      "Statement of Objections reported in 2024; Apple announced some NFC access changes in EU—final decision and fines not yet public.",
    laws: ["tfeu-102", "dma"],
    markets: ["mobile wallets", "contactless payments", "iOS NFC hardware access"],
    sources: [
      {
        label: "EC Apple Pay investigation",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_22_2764",
      },
      {
        label: "EC Apple NFC access commitments (reported)",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_24_2073",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Formal investigation opened", date: "June 2022" },
      { label: "Statement of Objections (reported)", date: "2024" },
      { label: "Apple NFC API access for EU developers", date: "2024–2025" },
      { label: "Final decision pending", date: "Ongoing" },
    ],
    timeline: [
      {
        date: "2014–2020",
        title: "Apple Pay expands",
        detail:
          "Apple Pay became the default tap-to-pay experience on iPhones with NFC locked to Apple's wallet.",
      },
      {
        date: "June 2022",
        title: "EU opens NFC probe",
        detail:
          "Commission investigated whether Apple illegally restricted access to NFC chip functionality for rival payment apps.",
      },
      {
        date: "2024",
        title: "Charges and Apple response",
        detail:
          "Regulators moved toward formal objections; Apple previewed EU programs letting banks offer NFC payments outside Apple Pay.",
      },
      {
        date: "Ongoing",
        title: "Compliance vs infringement",
        detail:
          "Parties negotiate remedies; no public final decision confirming abuse or imposing a fine yet.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "When you tap your iPhone to pay, Apple Pay uses NFC wireless tech—but EU regulators say Apple blocked banks and other wallets from using that chip equally. Europe opened an abuse-of-dominance case. Apple is opening NFC access in the EU, yet investigators haven't issued a final ruling or fine.",
      theStory: [
        "Contactless payments exploded after COVID-19. On iPhones, Apple Pay became the default tap experience, integrated with Face ID, cards in Wallet, and issuer partnerships.",
        "European banks and fintechs argued Apple refused fair access to the iPhone's NFC controller, forcing them to use QR codes or inferior flows while Apple Pay enjoyed seamless tap-to-pay.",
        "The Commission opened a formal investigation in 2022 under Article 102—the same dominance toolbox used in App Store cases, but focused on payment hardware.",
        "Regulators' theory: Apple dominates mobile wallets on iOS and uses NFC restrictions to exclude rivals, harming consumers who might want bank-branded wallets with loyalty features.",
        "Apple countered that NFC restrictions protect security and fraud prevention, and that it offers APIs in line with industry standards.",
        "In 2024 Apple announced expanded NFC and secure-element access for third-party developers in Europe, potentially heading off some charges.",
        "The investigation nonetheless continues toward a possible infringement decision, fine, or commitments package—nothing final confirms Apple broke the law.",
      ],
      whyItMatters: [
        "Tap-to-pay convenience depends on hardware access rules most users never see.",
        "Bank and fintech competition on iPhones affects fees, rewards, and innovation in digital wallets.",
        "Case parallels DMA interoperability duties for gatekeepers.",
        "Android already allowed broader NFC wallet competition—a contrast EU cites.",
        "US CFPB and DOJ watchers track EU NFC outcomes for domestic policy.",
      ],
      whatWasClaimed: [
        "Apple holds dominance in mobile wallets on iOS devices.",
        "It illegally restricted NFC access for rival payment applications.",
        "Exclusion reduced consumer choice and bank investment in competing wallets.",
        "Apple Pay's default status reinforces the alleged foreclosure.",
      ],
      theOtherSide: [
        "Apple says NFC policies prevent fraud and protect secure enclave architecture.",
        "It argues it is opening access in the EU consistent with legal obligations.",
        "Apple maintains Apple Pay competes with cash, cards, and other device ecosystems.",
        "It warns rushed NFC openness could increase phishing and token theft.",
      ],
      whatItMeansForYou: [
        "EU iPhone users may soon pick bank wallets with tap-to-pay equal to Apple Pay.",
        "US users face different rules unless Apple globalizes changes.",
        "No fines yet—your Wallet app won't disappear overnight.",
        "Loyalty-linked bank apps could improve if NFC opens.",
        "Security incidents after opening NFC would influence final remedies.",
      ],
      bottomLine:
        "EU Apple NFC probe targets tap-to-pay gatekeeping on iPhones. Apple is yielding partial access in Europe, but regulators have not finished—and guilt is not yet established.",
    },
  },
  {
    id: "us-realpage-rent-algorithm",
    name: "US litigation over RealPage rent-pricing software",
    shortName: "RealPage rent algorithm suits",
    companies: ["realpage"],
    jurisdictions: ["US"],
    conduct: ["cartel_coordination", "price_fix", "data_lockin"],
    yearStart: 2022,
    status: "ongoing",
    summary:
      "The DOJ, state attorneys general, and private tenants sued RealPage and major landlords, alleging a shared algorithm coordinated apartment rents by pooling nonpublic pricing data, functioning like a horizontal price-fixing cartel.",
    regulatorArgument:
      "Landlords feeding sensitive pricing data into RealPage's YieldStar software effectively outsourced collusion to an algorithm, raising rents above competitive levels in multiple cities.",
    outcome:
      "Multiple parallel cases pending; motions to dismiss largely rejected on key theories; no trial verdict or global settlement yet.",
    laws: ["sherman-1", "ftc-5"],
    markets: ["multifamily rental housing", "property management software", "algorithmic pricing"],
    sources: [
      {
        label: "DOJ RealPage announcement",
        url: "https://www.justice.gov/opa/pr/justice-department-sues-realpage-algorithmic-pricing-scheme-harms-renters",
      },
      {
        label: "Washington AG RealPage suit",
        url: "https://www.atg.wa.gov/news/news-releases/ag-ferguson-sues-realpage-landlords-alleged-rent-price-fixing",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Private tenant class actions filed", date: "2022–2023" },
      { label: "Journal investigations published", date: "2022" },
      { label: "DOJ civil antitrust suit", date: "November 2024" },
      { label: "State AG parallel cases", date: "2023–ongoing" },
    ],
    timeline: [
      {
        date: "2010s",
        title: "Algorithmic rent tools spread",
        detail:
          "RealPage's YieldStar gained share among large multifamily landlords seeking dynamic pricing models.",
      },
      {
        date: "2022",
        title: "Media scrutiny",
        detail:
          "Investigative reports alleged landlords used shared software to push rents higher in concentrated markets.",
      },
      {
        date: "2023–2024",
        title: "Government suits arrive",
        detail:
          "State AGs and the DOJ filed cases treating algorithmic recommendations plus data sharing as antitrust violations.",
      },
      {
        date: "Ongoing",
        title: "Courts allow cases to proceed",
        detail:
          "Defendants lost early dismissal bids on core theories; discovery into data flows and pricing meetings continues.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Rent went up in many US cities—and prosecutors say one reason is software. RealPage's tool allegedly lets big landlords share secret pricing data and follow the same algorithm's suggestions, acting like a price-fixing cartel without a smoke-filled room. DOJ, states, and tenants sued. Landlords and RealPage deny wrongdoing. No court has ruled yet.",
      theStory: [
        "Apartment hunting in hot cities feels brutal: soaring rents, limited units, and opaque pricing. Most blame supply and demand—but enforcers also eye how landlords set numbers.",
        "RealPage sells property management software used by large apartment operators. Its YieldStar product recommends rents using market data—including, prosecutors allege, nonpublic information from competing landlords in the same database.",
        "Investigative journalism in 2022 highlighted markets where many buildings used RealPage, suggesting parallel price hikes followed algorithm outputs.",
        "Antitrust law traditionally bans competitors from agreeing on prices. The novel theory here: humans need not meet if they delegate pricing to a shared algorithm fed with everyone's sensitive data.",
        "Private tenant class actions began in 2022–2023. State attorneys general in Arizona, Washington, and elsewhere filed suits. In November 2024 the DOJ joined with a high-profile civil complaint.",
        "Defendants argue YieldStar is lawful pro-competitive analytics—like airlines using similar revenue management tools—and that landlords retain final pricing discretion.",
        "Courts have largely allowed cases to move forward, rejecting blanket dismissals. Trials remain distant; no finding of illegal price-fixing has been entered.",
      ],
      whyItMatters: [
        "Rent is the biggest monthly expense for many families—algorithm cases hit home literally.",
        "Tests whether Sherman Act covers AI and software intermediated 'hub-and-spoke' collusion.",
        "Multifamily consolidation plus shared vendors raises coordination risks enforcers will pursue.",
        "Outcomes could affect pricing software in hotels, car rentals, and other industries.",
        "Tenant organizing and antitrust are intersecting in urban housing politics.",
      ],
      whatWasClaimed: [
        "Landlords unlawfully exchanged competitively sensitive rent information via RealPage.",
        "The shared algorithm facilitated coordinated price increases.",
        "RealPage acted as hub enabling horizontal collusion among horizontal rivals.",
        "Renters paid supra-competitive prices in affected markets.",
      ],
      theOtherSide: [
        "RealPage says its tools analyze public and proprietary data lawfully.",
        "Landlords claim they independently decide final rents and compete for tenants.",
        "Defendants argue dynamic pricing benefits efficiency and reflects market conditions.",
        "They warn chilling analytics innovation would hurt housing supply decisions.",
      ],
      whatItMeansForYou: [
        "If you rent from large landlords, your building may use such software—you won't always know.",
        "Successful cases could mean damages for some tenant classes years from now.",
        "Rent won't drop immediately; litigation is slow even when theories are novel.",
        "City councils may pass transparency laws parallel to antitrust suits.",
        "No guilt finding yet—landlords continue using software while cases proceed.",
      ],
      bottomLine:
        "RealPage rent algorithm litigation asks whether shared AI pricing tools can be illegal cartels. Governments and tenants say yes; vendors and landlords say no. Courts haven't decided.",
    },
  },
  {
    id: "eu-qualcomm-licensing-appeal",
    name: "EU Qualcomm 5G licensing — continued enforcement",
    shortName: "EU Qualcomm licensing",
    companies: ["qualcomm"],
    jurisdictions: ["EU"],
    conduct: ["abuse_of_dominance", "refusal_to_deal", "discrimination", "tying"],
    yearStart: 2015,
    status: "appealed",
    summary:
      "After the 2018 EU fine for predatory licensing and exclusivity payments to Apple, Qualcomm continues facing Article 102 scrutiny and appeals while chip customers dispute FRAND royalties and chipset tying in 5G markets.",
    regulatorArgument:
      "Qualcomm's standard-essential patent licensing and chipset sales practices can still exclude rivals and impose excessive royalties, undermining modem competition despite prior fines.",
    outcome:
      "2018 fine partially upheld on appeal with adjustments; follow-on compliance monitoring and private disputes ongoing—no clean all-clear.",
    laws: ["tfeu-102"],
    markets: ["cellular modem chipsets", "SEP licensing", "5G baseband"],
    sources: [
      {
        label: "EC Qualcomm decision (2018)",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_18_4763",
      },
      {
        label: "General Court judgment (2022)",
        url: "https://curia.europa.eu/jcms/jcms/Jo2_7052/en/",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "EU infringement decision and fine", date: "January 24, 2018" },
      { label: "General Court appeal judgment", date: "June 2022" },
      { label: "CJEU appeal paths (reported)", date: "2023–2024" },
      { label: "5G licensing disputes ongoing", date: "2024–ongoing" },
    ],
    timeline: [
      {
        date: "2015–2017",
        title: "EU builds LTE case",
        detail:
          "Commission charged Qualcomm with paying Apple to use its modems exclusively and with below-cost licensing to foreclose rivals.",
      },
      {
        date: "January 2018",
        title: "€997 million fine",
        detail:
          "EU fined Qualcomm for abuse in LTE modem chip markets and illegal exclusivity payments.",
      },
      {
        date: "June 2022",
        title: "Partial court victory",
        detail:
          "General Court annulled parts of the decision related to some pricing theories but upheld core exclusivity findings with fine adjustments.",
      },
      {
        date: "Ongoing",
        title: "5G era fights continue",
        detail:
          "OEMs and regulators still contest FRAND terms, patent bundling, and chipset competition in next-gen networks.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Qualcomm makes modem chips and owns key patents for mobile data standards. Europe fined it in 2018 for deals that kept Apple tied to Qualcomm and hurt rivals. Courts partially upheld and partially overturned pieces on appeal. Licensing fights in the 5G era continue—Qualcomm hasn't been fully cleared, and enforcement threads remain open.",
      theStory: [
        "Your phone connects to 4G and 5G through baseband modems—often Qualcomm's. Standard-essential patents (SEPs) mean Qualcomm must license on fair, reasonable terms, but 'fair' is famously contested.",
        "The European Commission's 2018 decision targeted two strands: exclusivity payments to Apple to shut out Intel and others, and alleged predatory licensing to foreclose competing chipmakers.",
        "Qualcomm appealed. In 2022 the General Court threw out some pricing theories but left core exclusivity abuse findings standing, adjusting the fine downward in places.",
        "Appeals to the Court of Justice and parallel national patent disputes mean the legal picture stayed messy rather than binary win/loss.",
        "As 5G rolled out, phone makers and automakers negotiating modem supply again raised FRAND and tying concerns—separate from but related to the 2018 case.",
        "Qualcomm argues it innovates heavily, licenses SEPs widely, and faces competition from MediaTek, Samsung, and others.",
        "Regulators and customers continue monitoring whether Qualcomm's business model still crosses abuse lines—especially where patent royalties meet chipset sales—without a final all-clear decree.",
      ],
      whyItMatters: [
        "Modem costs and licensing feed into phone prices consumers pay.",
        "SEP holders' power affects every connected device industry entering 5G—including cars.",
        "Appeals show EU abuse cases can shrink on review yet still reshape conduct.",
        "FRAND disputes often outlast single infringement decisions by years.",
        "US and Korea also pursued Qualcomm, creating global enforcement patchwork.",
      ],
      whatWasClaimed: [
        "Qualcomm abused dominance in LTE baseband chip markets.",
        "Exclusivity payments to Apple illegally foreclosed rival modem suppliers.",
        "Licensing practices harmed competition beyond fair patent rewards.",
        "Remedies must ensure open access to essential 5G technology.",
      ],
      theOtherSide: [
        "Qualcomm says SEP royalties fund R&D that benefits the entire ecosystem.",
        "It argues courts corrected overreach in parts of the EU decision.",
        "Qualcomm maintains vibrant chipset competition exists globally.",
        "It warns excessive regulation reduces incentives to lead standards.",
      ],
      whatItMeansForYou: [
        "Phone prices indirectly reflect patent fights you rarely see.",
        "Automakers' in-car 5G may cost more or less depending on licensing outcomes.",
        "No immediate device ban stems from ongoing EU threads.",
        "Appeals mean legal headlines can reverse partial wins—stay skeptical of 'final' labels.",
        "Competition among chipmakers helps Android device variety and pricing.",
      ],
      bottomLine:
        "EU Qualcomm enforcement didn't end with one fine or one appeal. Core exclusivity findings survived partial court reversal, but 5G licensing battles continue—dominance is disputed, not definitively resolved.",
    },
  },
  {
    id: "us-airline-jv-antitrust",
    name: "US airline joint venture antitrust reviews",
    shortName: "US airline JV reviews",
    companies: ["american-airlines", "delta", "united"],
    jurisdictions: ["US"],
    conduct: ["cartel_coordination", "market_access", "exclusivity"],
    yearStart: 2020,
    status: "ongoing",
    summary:
      "The DOJ continues scrutinizing immunized joint ventures among major US and foreign carriers—such as transatlantic alliances—over whether coordinated scheduling and revenue sharing reduce competition on overlapping routes.",
    regulatorArgument:
      "Antitrust-immunized alliances may enable tacit coordination on capacity and fares beyond pro-competitive scope, especially as pandemic-era grants and consolidation reshape airline markets.",
    outcome:
      "Periodic reviews, sunset conditions, and informational demands ongoing; no blanket dissolution order publicly issued in current review cycles.",
    laws: ["sherman-1", "clayton-7", "hart-scott"],
    markets: ["passenger air travel", "transatlantic routes", "immunized alliances"],
    sources: [
      {
        label: "DOJ airline antitrust overview",
        url: "https://www.justice.gov/atr/antitrust-case-filing/air-transportation",
      },
      {
        label: "DOT- DOJ alliance review (Oneworld example)",
        url: "https://www.transportation.gov/briefing-room/dot-and-doj-open-review-american-airlines-alliance-qantas",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "NEA JV challenge (blocked)", date: "2022" },
      { label: "DOT/DOJ alliance monitoring letters", date: "2023–2024" },
      { label: "Post-pandemic capacity reviews", date: "2024" },
      { label: "Ongoing immunized JV oversight", date: "2025–ongoing" },
    ],
    timeline: [
      {
        date: "2010s",
        title: "Alliances deepen",
        detail:
          "Major carriers sought antitrust immunity to coordinate pricing and capacity on international routes within alliances like Oneworld, Star, and SkyTeam.",
      },
      {
        date: "2022",
        title: "NEA blocked",
        detail:
          "DOJ sued to stop American–JetBlue Northeast Alliance, showing willingness to challenge domestic coordination.",
      },
      {
        date: "2023–2024",
        title: "Renewed scrutiny",
        detail:
          "Enforcers reviewed transatlantic joint business agreements as travel rebounded and fares drew political attention.",
      },
      {
        date: "Ongoing",
        title: "Conditional immunity",
        detail:
          "Alliances operate under periodic reviews; carriers must show consumer benefits outweigh coordination risks.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Big airlines team up on international routes through 'joint ventures' that share money and schedules—sometimes with government permission that shields them from antitrust suits. US enforcers keep reviewing whether those deals reduce competition and raise fares. The Northeast Alliance was blocked, but many immunized alliances still fly. Reviews continue; no mass breakup order yet.",
      theStory: [
        "Airline tickets feel expensive and choices limited on some routes. Part of the story is plain consolidation; another is legal cooperation among carriers that remain separate brands.",
        "On transatlantic routes, American, British Airways, Delta, Air France-KLM, United, and Lufthansa operate immunized joint ventures that coordinate schedules, fares, and revenue splits.",
        "DOT and DOJ grant antitrust immunity when they believe consumer benefits—better connections, service—outweigh harm. Those grants often include sunset reviews and reporting duties.",
        "After COVID-19 bailouts and the blocked American–JetBlue Northeast Alliance, enforcers signaled less tolerance for coordination that looks like carving up US markets.",
        "Congressional hearings on airfare spikes renewed interest in whether immunized alliances dampen rivalry on overlapping city pairs.",
        "Carriers respond that alliances make small US cities viable for global travel and compete against Gulf carriers and low-cost entrants.",
        "Current work is oversight and targeted challenges—not a single headline trial—but it keeps alliance lawyers busy and shapes fare competition at the margins.",
      ],
      whyItMatters: [
        "International business and leisure fares reflect alliance coordination rules.",
        "NEA block shows domestic JVs can die even when international ones survive.",
        "Enforcement sets tone for future airline partnerships post-merger wave.",
        "Travelers on hub routes may face fewer independent pricing decisions than they assume.",
        "Government granted immunity can be withdrawn if conditions fail—rare but possible.",
      ],
      whatWasClaimed: [
        "Some immunized alliances reduce competition on overlapping nonstop and connecting routes.",
        "Revenue sharing facilitates coordinated capacity cuts and fare increases.",
        "Domestic feeder coordination (as in NEA) illegally divides regional markets.",
        "Consumers pay higher prices than they would under independent competition.",
      ],
      theOtherSide: [
        "Airlines say alliances expand network reach and lower costs for travelers.",
        "They argue international routes face fierce competition from many global carriers.",
        "Carriers maintain DOT conditions preserve entry and consumer choice.",
        "They point to volatile fuel and labor costs as fare drivers—not collusion.",
      ],
      whatItMeansForYou: [
        "Your New York–London ticket may be priced jointly by 'competing' brands.",
        "Watch DOT filings if your city loses alliance service—reviews sometimes follow complaints.",
        "NEA block didn't end all coordination; international JVs remain.",
        "Fares won't plummet from reviews alone—expect incremental conditions.",
        "No airline has been found guilty of a criminal cartel in these civil reviews.",
      ],
      bottomLine:
        "US airline joint venture reviews are ongoing competition hygiene for immunized alliances—less flashy than merger trials, but they decide how much legal coordination flyers live with.",
    },
  },
  {
    id: "eu-meta-ad-library-probe",
    name: "EU Meta political ads and Ad Library investigation",
    shortName: "EU Meta ads probe",
    companies: ["meta"],
    jurisdictions: ["EU"],
    conduct: ["data_lockin", "market_access", "discrimination", "abuse_of_dominance"],
    yearStart: 2023,
    status: "ongoing",
    summary:
      "EU authorities examine whether Meta's advertising tools, Ad Library transparency features, and data advantages discriminate against rivals and political advertisers under DMA and data-protection overlap.",
    regulatorArgument:
      "Meta leverages unmatched user data and platform control to dominate social advertising while Ad Library and API limits hinder researchers, rivals, and compliance monitoring.",
    outcome:
      "Investigations and DMA compliance checks ongoing; no final infringement decision solely on Ad Library issues publicly concluded.",
    laws: ["dma", "tfeu-102", "tfeu-101"],
    markets: ["social media advertising", "political ads", "ad transparency tools"],
    sources: [
      {
        label: "EC DMA Meta designation",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_23_4458",
      },
      {
        label: "EU political ads regulation (context)",
        url: "https://www.europarl.europa.eu/topics/en/article/20240216STO23004/eu-political-ads-transparency-rules",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "DMA gatekeeper duties on ads data", date: "March 2024" },
      { label: "EU political ads transparency law", date: "2024" },
      { label: "Civil society Ad Library complaints", date: "2023–2024" },
      { label: "Commission monitoring ongoing", date: "2025–ongoing" },
    ],
    timeline: [
      {
        date: "2018–2020",
        title: "Ad Library launched",
        detail:
          "Meta created transparency archives after election interference scandals, but researchers reported API gaps.",
      },
      {
        date: "2023",
        title: "DMA designation",
        detail:
          "Meta became a gatekeeper with duties on ads data portability and fair access for advertisers.",
      },
      {
        date: "2024",
        title: "EU political ads rules",
        detail:
          "New EU laws require labeling and targeting limits; Meta adjusted products while facing scrutiny on enforcement tools.",
      },
      {
        date: "Ongoing",
        title: "Competition plus democracy angle",
        detail:
          "Commission and national DPAs coordinate on whether ad systems self-preference Meta and block rivals.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Meta makes billions selling ads on Facebook and Instagram using detailed user data. Europe is probing whether its ad tools and 'Ad Library' transparency features unfairly help Meta and hinder rivals, researchers, and political advertisers. New EU political ad rules add pressure. Investigations continue—Meta has not been found guilty in a final ads-specific decision.",
      theStory: [
        "Social media ads target voters, shoppers, and causes with precision based on behavior data. Meta's scale makes its ads machine one of the most powerful marketing channels on Earth.",
        "After Cambridge Analytica and election interference fears, Meta launched an Ad Library so outsiders could study political ads. Researchers soon complained APIs were incomplete, slow, or less useful than Meta's internal tools.",
        "Competition enforcers ask whether those gaps are accidental—or whether keeping the best data inside Meta protects its ad dominance against TikTok, Google, and independent ad-tech.",
        "The Digital Markets Act adds duties for gatekeepers on fair access to ads performance data and non-discriminatory ad systems for business users.",
        "Separately, the EU passed political advertising transparency rules limiting targeting and requiring disclosures—raising compliance fights about how Meta implements filters without blocking legitimate advertisers.",
        "Meta says it invests in transparency and safety, complies with DMA obligations, and competes with Google and TikTok for ad budgets.",
        "No standalone final EU decision fining Meta purely for Ad Library conduct has landed; oversight remains active and intertwined with broader DMA compliance probes.",
      ],
      whyItMatters: [
        "Election integrity and ad market fairness overlap when platforms control both targeting and transparency.",
        "Small ad agencies depend on platform APIs to prove campaign performance against Meta's house ads team.",
        "DMA ad data portability could shift power if enforced strongly.",
        "Researchers need tools to audit disinformation—competition policy affects that access.",
        "US advertisers feel ripple effects when Meta changes global ad products for EU law.",
      ],
      whatWasClaimed: [
        "Meta abuses dominance in social advertising through data advantages and restrictive tools.",
        "Ad Library and API limitations foreclose independent monitoring and rival ad products.",
        "Gatekeeper duties on fair and transparent ads systems may be breached.",
        "Political advertisers face unequal access compared with Meta's preferred partners.",
      ],
      theOtherSide: [
        "Meta argues transparency tools exceed legal requirements in many regions.",
        "It cites privacy law limits on data sharing with third parties.",
        "Meta maintains TikTok and Google compete aggressively for ad spend.",
        "It says EU political ad rules are still being implemented in good faith.",
      ],
      whatItMeansForYou: [
        "Political ads you see may carry new EU labels; targeting could feel broader or less personalized.",
        "Small businesses buying Facebook ads should watch DMA data export tools—rollout ongoing.",
        "No fines yet specifically for Ad Library competition issues.",
        "Researchers may gain better APIs if enforcement succeeds.",
        "Treat Meta ad policy changes as evolving with EU law—not finished reform.",
      ],
      bottomLine:
        "EU Meta ads probes blend democracy transparency with competition law. Regulators question whether Ad Library openness matches Meta's internal ad power—answers remain unfinished.",
    },
  },
  {
    id: "us-states-apple-epic-followon",
    name: "US state AG follow-ons after Epic v. Apple",
    shortName: "States vs Apple (Epic follow-on)",
    companies: ["apple"],
    jurisdictions: ["US"],
    conduct: ["tying", "market_access", "exclusivity", "abuse_of_dominance"],
    yearStart: 2020,
    status: "appealed",
    summary:
      "Multiple state attorneys general sued Apple over App Store policies parallel to Epic's fight, alleging monopolization of iOS app distribution and in-app payments; cases merged with private litigation and remain on appeal after mixed Ninth Circuit rulings.",
    regulatorArgument:
      "Apple's 30% commission, anti-steering rules, and rejection practices maintain an iOS distribution monopoly that harms developers and consumers across states.",
    outcome:
      "Mixed Epic/Apple Ninth Circuit outcome in 2023; state claims and consumer suits continue with appeals and remanded issues—no final nationwide liability.",
    laws: ["sherman-2", "sherman-1", "ftc-5"],
    markets: ["mobile app distribution", "in-app payments", "iOS developer services"],
    sources: [
      {
        label: "Epic v. Apple Ninth Circuit opinion",
        url: "https://www.ca9.uscourts.gov/",
      },
      {
        label: "Utah-led state AG complaint (2021)",
        url: "https://coag.gov/app/uploads/2021/07/Utah-et-al-v-Apple-Complaint.pdf",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Epic filed antitrust suit", date: "August 2020" },
      { label: "State AG complaint (Utah et al.)", date: "July 2021" },
      { label: "Ninth Circuit appeal decision", date: "April 2023" },
      { label: "Remanded issues / appeals ongoing", date: "2024–ongoing" },
    ],
    timeline: [
      {
        date: "2020",
        title: "Epic sparks war",
        detail:
          "Epic Games bypassed Apple's payment system in Fortnite, triggering removal and landmark antitrust litigation.",
      },
      {
        date: "2021",
        title: "States join fray",
        detail:
          "Attorneys general from Utah, Colorado, and others sued Apple, aligning with developer complaints on commissions and steering.",
      },
      {
        date: "2023",
        title: "Appeals court split result",
        detail:
          "Ninth Circuit largely upheld Apple's App Store model except anti-steering rules under California unfair competition law.",
      },
      {
        date: "Ongoing",
        title: "Follow-on litigation lives",
        detail:
          "States pursue remaining theories; Supreme Court petitions and remands keep iOS distribution rules contested.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "After Epic sued Apple over App Store fees and rules, several state attorneys general filed similar cases. Courts mostly sided with Apple on federal antitrust claims but forced some changes to anti-steering rules. Appeals and state theories continue—Apple has not lost a nationwide monopolization verdict.",
      theStory: [
        "iPhone apps usually must use Apple's App Store and payment system, with Apple taking up to 30% of many sales. Developers have complained for years; Epic made it a courtroom fight.",
        "Epic intentionally broke Apple's rules in Fortnite to challenge the system. Apple removed the game. Epic sued, and Apple countersued.",
        "State attorneys general—not just game companies—joined the battle in 2021, arguing Apple's conduct harmed consumers in their states through higher app prices and reduced innovation.",
        "Trial produced a mixed verdict: federal antitrust claims mostly failed, but Apple lost on California's Unfair Competition Law regarding anti-steering—restrictions on telling users about outside payment options.",
        "The Ninth Circuit in 2023 largely affirmed, keeping most of Apple's model legal under federal law while preserving some external link obligations.",
        "States' cases were consolidated and trimmed but not entirely dead; remands and parallel consumer suits continue.",
        "Apple has adjusted policies in the US and EU under legal pressure, yet no court has ordered a full App Store breakup or nationwide Sherman Act monopolization finding.",
      ],
      whyItMatters: [
        "App Store economics affect every mobile developer and indirectly every smartphone user.",
        "State AG enforcement multiplies resources against national platform policies.",
        "Mixed Epic outcome shows monopolization claims are hard even when conduct annoys developers.",
        "Anti-steering wins still change what apps can tell you about cheaper payment options.",
        "US policy interacts with EU DMA rules reshaping iOS globally.",
      ],
      whatWasClaimed: [
        "Apple monopolizes iOS app distribution and in-app payment processing.",
        "30% commissions and exclusivity raise prices and block rival stores.",
        "Anti-steering and review retaliation maintain illegal monopoly power.",
        "States seek injunctive relief benefiting consumers and developers.",
      ],
      theOtherSide: [
        "Apple says its commission funds security, privacy, and curation users want.",
        "It argues iOS competes with Android and consoles; no monopoly exists.",
        "Apple maintains Epic breached contract and federal law doesn't require open sideloading.",
        "It cites ongoing policy changes as evidence of competitive pressure, not illegality.",
      ],
      whatItMeansForYou: [
        "Some apps may link to external payment pages with Apple's commission rules evolving.",
        "Fortnite remains largely off iOS in the US unless deals change.",
        "App prices won't drop automatically while appeals run.",
        "State cases could revive theories federal courts rejected—watch remands.",
        "No finding that Apple is an illegal monopolist nationwide—yet.",
      ],
      bottomLine:
        "State AG Epic follow-ons keep App Store fights alive after a mostly Apple-friendly federal appeals path. Anti-steering changes matter, but broad monopolization claims remain unsettled.",
    },
  },
  {
    id: "eu-tiktok-dma-inquiry",
    name: "EU ByteDance / TikTok DMA and competition scrutiny",
    shortName: "EU TikTok inquiry",
    companies: ["tiktok", "bytedance"],
    jurisdictions: ["EU"],
    conduct: ["data_lockin", "market_access", "self_preferencing", "platform_suspension"],
    yearStart: 2024,
    status: "ongoing",
    summary:
      "EU regulators assess whether TikTok meets Digital Markets Act gatekeeper tests and whether its advertising, in-app store, and data practices unduly favor ByteDance services over rivals on the short-video platform.",
    regulatorArgument:
      "TikTok's entrenched user base and advertising stack may confer gatekeeper power requiring fair access for creators, advertisers, and third-party apps; data flows to ByteDance raise lock-in concerns.",
    outcome:
      "Designation debates and compliance preparations ongoing; no final DMA gatekeeper designation or abuse finding publicly finalized for TikTok as of typical reporting.",
    laws: ["dma", "tfeu-102"],
    markets: ["short-form video", "social advertising", "in-app commerce", "creator monetization"],
    sources: [
      {
        label: "EC DMA gatekeeper designations (context)",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_23_4458",
      },
      {
        label: "EC TikTok Lite rewards probe (2024)",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_24_2320",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "DMA gatekeeper list (initial)", date: "September 2023" },
      { label: "TikTok Lite investigation opened", date: "April 2024" },
      { label: "Gatekeeper designation reviews", date: "2024–2025" },
      { label: "Compliance planning ongoing", date: "2025–ongoing" },
    ],
    timeline: [
      {
        date: "2023",
        title: "DMA era begins",
        detail:
          "ByteDance/TikTok analyzed whether short-video scale triggers gatekeeper duties like those on Meta and Google.",
      },
      {
        date: "April 2024",
        title: "TikTok Lite probe",
        detail:
          "Commission opened investigation into addictive rewards features in TikTok Lite, raising consumer and competition crossover issues.",
      },
      {
        date: "2024–2025",
        title: "Designation debate",
        detail:
          "Industry commentators split on whether TikTok matches DMA user thresholds and entrenched power tests.",
      },
      {
        date: "Ongoing",
        title: "Competition oversight continues",
        detail:
          "TikTok adjusts EU products while regulators monitor advertising fairness and in-app store practices.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "TikTok is hugely popular in Europe, and regulators are asking whether it should face the same strict Digital Markets Act rules as Apple and Google. They also opened a probe into TikTok Lite rewards features. ByteDance says it competes fairly. No final gatekeeper label or guilt finding has been announced yet.",
      theStory: [
        "TikTok rewired how millions consume video, especially younger users. That attention pool draws advertisers away from Meta, Google, and TV—a competitive shift regulators notice.",
        "The EU's Digital Markets Act targets 'gatekeepers' with ex ante duties. Initial designations in 2023 focused on obvious giants; TikTok's status remained debated based on user numbers, business user dependence, and durability.",
        "Competition concerns include whether TikTok's ad tools, creator funds, and in-app shopping favor ByteDance-controlled services, and whether data portability limits creator multi-homing.",
        "In April 2024 the Commission opened a formal investigation into TikTok Lite's rewards program in Spain and France, citing addictive design—overlapping consumer protection and platform power themes.",
        "TikTok emphasizes competition with Reels and YouTube Shorts, invests in EU transparency centers, and challenges narratives that it is an unstoppable gatekeeper.",
        "Geopolitical tensions over Chinese ownership add non-antitrust layers, but EU competition law focuses on economic conduct on the ground in Europe.",
        "Outcomes remain open: designation would trigger interoperability and fair-access duties; absence would keep TikTok mainly in classic Article 102 territory for any future abuse cases.",
      ],
      whyItMatters: [
        "Creator economies depend on platform rules for reach and pay—gatekeeper status changes bargaining power.",
        "Ad buyers want fair measurement when TikTok competes with Meta and Google.",
        "DMA expansion beyond obvious US giants signals broad platform regulation.",
        "Addictive design probes may pair with competition theories about engagement lock-in.",
        "US TikTok bans debates differ from EU competition process but share attention effects.",
      ],
      whatWasClaimed: [
        "TikTok may meet DMA gatekeeper criteria in social video and advertising.",
        "Platform design and data practices may unduly lock in creators and advertisers.",
        "TikTok Lite rewards features harm consumers and distort competition for attention.",
        "Fair access and transparency duties should apply if designation occurs.",
      ],
      theOtherSide: [
        "ByteDance says TikTok faces intense rivalry from Meta, Google, and Snap.",
        "It argues DMA thresholds were not clearly met at designation time.",
        "TikTok maintains rewards features comply with local laws and user choice.",
        "It invests in EU moderation and advertiser tools independently of designation politics.",
      ],
      whatItMeansForYou: [
        "Your For You feed economics could shift if DMA duties force more data export or linking.",
        "Designation is not a ban—expect product tweaks, not disappearance, unless separate laws intervene.",
        "Creators might gain portability tools if gatekeeper rules arrive.",
        "No EU fine for TikTok competition abuse has been finalized in this thread.",
        "Watch Commission announcements—not social media rumors—for designation news.",
      ],
      bottomLine:
        "EU TikTok scrutiny sits at the DMA gatekeeper borderline—active investigations and designation debates, but no final ruling that ByteDance abused dominance or must obey full gatekeeper duties yet.",
    },
  },
  {
    id: "us-unitedhealth-change-review",
    name: "US scrutiny of UnitedHealth / Change Healthcare integration",
    shortName: "UnitedHealth–Change review",
    companies: ["unitedhealth", "change-healthcare"],
    jurisdictions: ["US"],
    conduct: ["merger", "refusal_to_deal", "data_lockin", "vertical_restraint"],
    yearStart: 2022,
    status: "ongoing",
    summary:
      "After DOJ unsuccessfully challenged UnitedHealth's acquisition of Change Healthcare, the 2024 Change cyberattack and market outages reignited congressional and antitrust scrutiny of vertical integration in health claims processing and data.",
    regulatorArgument:
      "Combining the largest US insurer with a dominant claims clearinghouse risks exclusion of rival payers, sensitive data leverage, and fragile single points of failure harming providers and patients.",
    outcome:
      "Merger closed after 2022 litigation loss for DOJ; post-attack reviews, hearings, and private litigation strands ongoing—no retroactive breakup ordered.",
    laws: ["clayton-7", "sherman-2", "hart-scott"],
    markets: ["healthcare claims processing", "pharmacy benefit intermediaries", "commercial health insurance"],
    sources: [
      {
        label: "DOJ UnitedHealth/Change complaint (2022)",
        url: "https://www.justice.gov/opa/pr/justice-department-sues-block-unitedhealth-groups-acquisition-change-healthcare",
      },
      {
        label: "HHS Cyberattack response (Change)",
        url: "https://www.hhs.gov/about/news/2024/03/27/hhs-updates-change-healthcare-cyberattack.html",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "DOJ sued to block merger", date: "February 2022" },
      { label: "Court denied DOJ injunction", date: "September 2022" },
      { label: "Change Healthcare cyberattack", date: "February 2024" },
      { label: "Congressional oversight hearings", date: "2024–2025" },
    ],
    timeline: [
      {
        date: "2021",
        title: "Mega health IT deal announced",
        detail:
          "UnitedHealth agreed to buy Change Healthcare, combining insurance with claims rails used industry-wide.",
      },
      {
        date: "September 2022",
        title: "DOJ loses injunction fight",
        detail:
          "A federal judge allowed the merger, finding DOJ's vertical foreclosure theories insufficient.",
      },
      {
        date: "February 2024",
        title: "Cyberattack paralyzes claims",
        detail:
          "Change Healthcare ransomware outage disrupted prescriptions and billing nationwide, spotlighting concentration.",
      },
      {
        date: "Ongoing",
        title: "Aftermath reviews",
        detail:
          "Lawmakers, agencies, and providers examine resilience, data access, and whether remedies failed—without reopening merger easily.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "UnitedHealth bought Change Healthcare—a company that processes huge shares of US medical claims—after beating a DOJ block attempt. A massive 2024 cyberattack on Change froze pharmacies and clinics, sparking new outrage about one company owning both insurance and critical health data pipes. Congress is investigating; no court has ordered a breakup.",
      theStory: [
        "Health care billing runs on invisible middlemen. Change Healthcare sat at the center, moving claims between doctors, insurers, and pharmacies—often unrelated to whether you chose UnitedHealthcare as your insurer.",
        "When UnitedHealth announced acquisition, DOJ sued in 2022 alleging vertical harm: the biggest insurer might disadvantage rival payers relying on Change's rails or misuse sensitive claims data.",
        "The court rejected an injunction, allowing the deal to close. DOJ did not achieve a breakup; the merged structure became reality.",
        "In February 2024 a ransomware attack on Change Healthcare caused nationwide outages—prescriptions delayed, small clinics unable to get paid, chaos exposing dependency on a single vendor now inside UnitedHealth.",
        "Congressional hearings followed, blending cybersecurity, antitrust, and patient harm narratives. Providers demanded temporary funding support and long-term redundancy.",
        "Antitrust retroactivity is hard; enforcers explore information sharing, security mandates, and future merger policy rather than easily unwinding 2022 clearance.",
        "Private litigation and regulatory reviews continue, but no new court order has split Change from UnitedHealth—this is an ongoing oversight and policy aftermath story.",
      ],
      whyItMatters: [
        "Health care access can halt when one IT hub fails—concentration becomes a patient safety issue.",
        "Vertical merger losses may look quiet until real-world shocks reveal risks.",
        "Data-rich insurance-plus-IT combos raise exclusion fears for rival insurers and providers.",
        "Cyber resilience is now part of competition debates, not only traditional price theory.",
        "Future health IT mergers face tougher political scrutiny even if legal standards stay similar.",
      ],
      whatWasClaimed: [
        "Merger would let UnitedHealth disadvantage rival insurers using Change services.",
        "Sensitive claims data integration creates anticompetitive information advantages.",
        "Vertical foreclosure in claims processing raises costs and reduces innovation.",
        "Post-attack concentration proves public harm from approving the deal.",
      ],
      theOtherSide: [
        "UnitedHealth says integration improved efficiency and cybersecurity investments.",
        "It argues Change serves all payers with contractual firewalls.",
        "UnitedHealth maintains the cyberattack victimized the company too, requiring cooperation not breakup.",
        "It points to court rejection of DOJ's theories as proof the merger was lawful.",
      ],
      whatItMeansForYou: [
        "Your pharmacy delay during the outage showed how backend concentration hits front doors.",
        "Insurance premiums aren't directly set by this review, but system resilience affects care access.",
        "No breakup imminent—expect reporting duties and backup system pushes.",
        "Employers choosing insurers should ask about claims redundancy post-attack.",
        "Ongoing hearings may spur rules, not instant divestiture.",
      ],
      bottomLine:
        "UnitedHealth–Change is a closed merger under renewed antitrust-style scrutiny after a cyber catastrophe. DOJ lost the block fight; aftermath reviews continue without a court-ordered split.",
    },
  },
  {
    id: "eu-deutsche-bahn-rail-access",
    name: "EU Deutsche Bahn network access investigation",
    shortName: "EU Deutsche Bahn access",
    companies: ["deutsche-bahn"],
    jurisdictions: ["EU"],
    conduct: ["refusal_to_deal", "discrimination", "market_access", "abuse_of_dominance"],
    yearStart: 2021,
    status: "ongoing",
    summary:
      "The European Commission investigates whether Deutsche Bahn abused dominance by restricting rival train operators' access to tracks, stations, and maintenance facilities in Germany's rail market.",
    regulatorArgument:
      "Incumbent control over infrastructure and scheduling systems may discriminate against open-access passenger and freight operators despite EU rail liberalization goals.",
    outcome:
      "Formal investigation opened 2023; Commission and German regulator coordination ongoing—no final infringement decision announced.",
    laws: ["tfeu-102", "tfeu-101"],
    markets: ["passenger rail", "rail infrastructure access", "freight rail"],
    sources: [
      {
        label: "EC Deutsche Bahn investigation",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_23_5933",
      },
      {
        label: "EU rail liberalization policy",
        url: "https://transport.ec.europa.eu/transport-modes/rail_en",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "EU rail market opening milestones", date: "2020–2021" },
      { label: "Formal EC investigation opened", date: "December 2023" },
      { label: "Rival operator complaints (FlixTrain etc.)", date: "2021–2023" },
      { label: "Investigation ongoing", date: "2024–ongoing" },
    ],
    timeline: [
      {
        date: "2020s",
        title: "EU pushes rail competition",
        detail:
          "New rules aimed to let alternative operators run trains on incumbent tracks across Europe.",
      },
      {
        date: "2021–2023",
        title: "Rivals complain",
        detail:
          "FlixTrain and others alleged DB Netz favored Deutsche Bahn's own services in paths, stations, and maintenance slots.",
      },
      {
        date: "December 2023",
        title: "Commission opens case",
        detail:
          "EU antitrust enforcers began a formal abuse probe into access terms and potential self-preferencing.",
      },
      {
        date: "Ongoing",
        title: "National-EU coordination",
        detail:
          "Bundeskartellamt and Commission align on whether infrastructure discrimination persists.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Europe wants more train companies competing on the same tracks. Rivals say Deutsche Bahn—which owns much of Germany's rail network—makes it hard to get fair access to stations and schedules. The EU opened an abuse-of-dominance investigation. Deutsche Bahn denies favoritism. No final fine or ruling yet.",
      theStory: [
        "Rail travel is a climate policy priority in Europe, but tracks and stations are often owned by former state monopolies like Deutsche Bahn (DB).",
        "EU law pushes 'open access': independent operators should run their own trains on incumbent infrastructure paying regulated fees.",
        "FlixTrain and other challengers claimed DB Netz, the infrastructure arm, delayed path allocations, favored DB long-distance services in stations, and limited maintenance facility access.",
        "Passengers might see fewer cheap rival services if infrastructure gatekeeping blocks entry—even when laws promise liberalization.",
        "The Commission opened a formal investigation in December 2023 under Article 102, signaling serious scrutiny beyond national rail regulators alone.",
        "Deutsche Bahn argues it complies with access rules, invests heavily in network modernization, and that rivals mischaracterize normal capacity constraints.",
        "Case remains open; travelers should not expect instant new competitors until access disputes resolve—if they ever do with remedies or commitments.",
      ],
      whyItMatters: [
        "Rail competition could lower fares and improve service on busy corridors.",
        "Infrastructure self-preferencing mirrors tech platform fights in a 19th-century industry.",
        "Green transition goals depend on trains competing with flights and cars.",
        "Cross-border EU travel benefits if German access improves.",
        "Shows Article 102 applies to state-linked incumbents, not only Silicon Valley.",
      ],
      whatWasClaimed: [
        "Deutsche Bahn entities abuse dominance in rail infrastructure access.",
        "Discriminatory scheduling and station access foreclose rival passenger operators.",
        "Maintenance and path allocation practices protect DB's own services.",
        "EU liberalization is undermined without fair, transparent access.",
      ],
      theOtherSide: [
        "DB says network capacity is physically limited and fairly allocated.",
        "It cites major investment programs benefiting all operators.",
        "DB maintains regulatory oversight already exists at national level.",
        "It argues rivals entered markets successfully in some corridors, disproving foreclosure.",
      ],
      whatItMeansForYou: [
        "If you ride trains in Germany, more operators could mean more schedules and prices—eventually.",
        "No refunds from this probe; it's about future market structure.",
        "Delays in access cases slow FlixTrain-style expansion.",
        "EU climate targets tie to whether these cases succeed.",
        "Deutsche Bahn has not been found guilty yet.",
      ],
      bottomLine:
        "EU Deutsche Bahn probe tests whether rail liberalization on paper means fair track access in practice. Investigation open; incumbent denies abuse.",
    },
  },
  {
    id: "us-john-deere-repair",
    name: "US John Deere right-to-repair and competition scrutiny",
    shortName: "John Deere repair (US)",
    companies: ["john-deere"],
    jurisdictions: ["US"],
    conduct: ["refusal_to_deal", "tying", "market_access", "vertical_restraint"],
    yearStart: 2021,
    status: "ongoing",
    summary:
      "Farmers, FTC, and state enforcers challenge John Deere's restrictions on independent repair of tractors and combines—software locks and parts policies alleged to monopolize agricultural equipment servicing.",
    regulatorArgument:
      "Deere's control over diagnostic software and repair parts forecloses independent mechanics and raises farmers' costs, leveraging dominance in smart agricultural equipment.",
    outcome:
      "FTC and state investigations continue; Deere signed a memorandum of understanding with major farm groups on repair access—formal enforcement outcomes and litigation unsettled.",
    laws: ["sherman-2", "ftc-5"],
    markets: ["agricultural equipment", "farm machinery repair", "precision agriculture software"],
    sources: [
      {
        label: "FTC right to repair report",
        url: "https://www.ftc.gov/reports/nixing-fix-report-repair-restrictions",
      },
      {
        label: "DOJ/FTC repair workshop (Deere context)",
        url: "https://www.ftc.gov/news-events/events/2021/07/nixing-fix-workshop-repair-restrictions",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "FTC Nixing the Fix focus", date: "2021" },
      { label: "Farm Group MOU with Deere (reported)", date: "2023" },
      { label: "State AG repair scrutiny", date: "2022–ongoing" },
      { label: "Enforcement and litigation ongoing", date: "2024–ongoing" },
    ],
    timeline: [
      {
        date: "2010s",
        title: "Software-locked tractors",
        detail:
          "Modern Deere equipment required authorized dealers for many repairs due to encrypted diagnostics.",
      },
      {
        date: "2021",
        title: "Federal attention spikes",
        detail:
          "FTC prioritized repair restrictions; farmers testified about harvest downtime waiting for dealer techs.",
      },
      {
        date: "2023",
        title: "Industry MOU",
        detail:
          "Deere and farm associations announced principles expanding some tools to independent repairers—critics called it insufficient.",
      },
      {
        date: "Ongoing",
        title: "Antitrust and policy push",
        detail:
          "State bills and potential FTC enforcement examine whether repair limits violate competition law.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Farmers say John Deere won't let them or local mechanics fully fix modern tractors because software and parts are locked to authorized dealers. The FTC and states are examining whether that's illegal monopolization—not just an annoyance. Deere signed a repair agreement with farm groups, but many say it's not enough. No court has ruled Deere guilty yet.",
      theStory: [
        "A broken tractor during planting season can cost a farm tens of thousands of dollars per day. Modern machines are computers on wheels—engines, GPS, and emissions systems need software diagnostics to repair.",
        "John Deere sells through dealer networks and controls much of the diagnostic software and replacement parts ecosystem. Independent repair shops and farmers allege they cannot get tools or authorization to fix equipment they own.",
        "The FTC's 'Nixing the Fix' initiative framed repair restrictions as consumer and competition issues—dominant manufacturers using software to foreclose independent service markets.",
        "Farmers filed complaints and supported state right-to-repair bills; Colorado and other states passed laws touching agricultural equipment.",
        "Deere announced agreements with American Farm Bureau and others to provide some customer and independent technician tools, while reserving safety and emissions arguments.",
        "Skeptics say MOUs lack enforcement teeth and that Deere still ties warranties and updates to authorized channels.",
        "Antitrust theories remain active: tying repair to authorized dealers could abuse equipment market power. Investigations and possible cases continue without a definitive court verdict against Deere.",
      ],
      whyItMatters: [
        "Food supply chains depend on timely harvests—repair monopolies hit rural economies hard.",
        "Right-to-repair spans antitrust, copyright, and contract—this case shows competition angle.",
        "If Deere loses, other equipment makers (construction, medical) face similar scrutiny.",
        "Farmers are politically powerful storytellers for enforcement agencies.",
        "MOUs may avoid trials but might not satisfy enforcers seeking binding remedies.",
      ],
      whatWasClaimed: [
        "Deere monopolizes or dominates key agricultural equipment markets.",
        "Software locks and parts policies illegally foreclose independent repair.",
        "Farmers pay higher downtime costs and limited service choice.",
        "Repair restrictions are tying that extends dominance into aftermarket services.",
      ],
      theOtherSide: [
        "Deere says authorized repair protects safety, emissions compliance, and IP.",
        "It argues MOUs and tool releases address legitimate farmer needs.",
        "Deere maintains competition exists from Case IH, AGCO, and others.",
        "It warns hacked repairs could void warranties and cause environmental harm.",
      ],
      whatItMeansForYou: [
        "Even non-farmers eat food affected by harvest delays from repair fights.",
        "Rural communities may gain repair shops if enforcement succeeds.",
        "No nationwide Deere breakup or fine finalized yet.",
        "State laws may help before federal antitrust trials conclude.",
        "Buying used smart equipment still carries software lock risks today.",
      ],
      bottomLine:
        "John Deere repair battles blend right-to-repair activism with antitrust theory. Deere made partial concessions, but FTC and state scrutiny continue—no final guilty ruling.",
    },
  },
  {
    id: "eu-spotify-apple-fees",
    name: "EU Spotify / Apple App Store fee dispute (post-DMA)",
    shortName: "EU Spotify vs Apple fees",
    companies: ["apple"],
    jurisdictions: ["EU"],
    conduct: ["tying", "discrimination", "market_access", "abuse_of_dominance"],
    yearStart: 2019,
    status: "ongoing",
    summary:
      "Spotify's EU antitrust complaint against Apple's 30% App Store commission and anti-steering rules continues alongside DMA implementation, with the Commission's 2024 Apple decision fining Apple over music streaming steering restrictions.",
    regulatorArgument:
      "Apple abused dominance in app distribution to impose unfair commissions and anti-steering rules on rival music streaming services, raising consumer prices and limiting choice.",
    outcome:
      "March 2024 infringement decision imposed €1.84B fine on Apple for music streaming steering; Apple appealed. Spotify pursues further DMA fee challenges—overall dispute not fully closed.",
    laws: ["tfeu-102", "dma"],
    markets: ["music streaming", "mobile app distribution", "in-app payments"],
    sources: [
      {
        label: "EC Apple music streaming decision",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_24_1163",
      },
      {
        label: "Spotify complaint background",
        url: "https://newsroom.spotify.com/2019-03-13/spotify-files-antitrust-complaint-against-apple-with-european-commission/",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Spotify EC complaint", date: "March 13, 2019" },
      { label: "EC Statement of Objections (music)", date: "April 2021" },
      { label: "Infringement decision and fine", date: "March 4, 2024" },
      { label: "Apple appeal and DMA follow-ons", date: "2024–ongoing" },
    ],
    timeline: [
      {
        date: "2019",
        title: "Spotify goes to Brussels",
        detail:
          "Spotify accused Apple of using App Store rules to disadvantage Apple Music rival services.",
      },
      {
        date: "2021–2024",
        title: "EU builds music streaming case",
        detail:
          "Commission focused on anti-steering rules preventing apps from telling users about cheaper web signup options.",
      },
      {
        date: "March 2024",
        title: "Landmark fine",
        detail:
          "EU fined Apple €1.84 billion for abusive conduct toward music streaming apps; Apple announced appeal.",
      },
      {
        date: "Ongoing",
        title: "DMA fee fights continue",
        detail:
          "Spotify and others test whether DMA core technology fees and new EU rules fully restore fair competition.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Spotify says Apple used App Store rules to favor Apple Music—blocking cheaper sign-up links and charging commissions rivals couldn't avoid. Europe fined Apple €1.84 billion in 2024 for anti-steering abuse in music streaming. Apple is appealing, and Spotify still fights over DMA fees. The war isn't over, but EU regulators have scored one major win.",
      theStory: [
        "Music streaming lives on phones. Spotify must reach iPhone users through Apple's App Store, paying commissions on many transactions and following Apple's marketing rules.",
        "Spotify argued Apple Music competes directly yet enjoys zero commission and deeper iOS integration—classic self-preferencing and tying themes.",
        "A particular flashpoint: anti-steering—Apple barred Spotify from telling users inside the app that they could subscribe cheaper on the web without Apple's cut.",
        "The European Commission opened formal proceedings years before the Digital Markets Act fully applied, building an Article 102 case focused on music streaming.",
        "In March 2024 regulators fined Apple €1.84 billion—the first major EU antitrust penalty tied to App Store steering in streaming. Apple said it would appeal and disagreed with the facts and law.",
        "Meanwhile DMA obligations forced Apple to allow link-outs and alternative billing in Europe, but Spotify criticized new core technology fees as replacing old commissions with new ones.",
        "Appeals and DMA compliance fights mean Spotify's original competition grievances are partially addressed yet not fully resolved—ongoing in courts and in Brussels monitoring rooms.",
      ],
      whyItMatters: [
        "Subscription prices for music, video, and news reflect platform fee battles.",
        "Anti-steering wins let apps speak more freely about non-App-Store payment options in EU.",
        "Fine size signals EU willingness to penalize platform discrimination in digital content.",
        "DMA and classic antitrust run in parallel—double enforcement tracks confuse but strengthen complainants.",
        "US developers watch EU outcomes for leverage in domestic App Store fights.",
      ],
      whatWasClaimed: [
        "Apple dominates iOS app distribution and abused that power against music streaming rivals.",
        "Anti-steering rules and commissions raised prices and reduced consumer choice.",
        "Apple Music received unfair advantages unavailable to third-party streamers.",
        "Remedies must include fair access and elimination of discriminatory fees.",
      ],
      theOtherSide: [
        "Apple says it created the App Store ecosystem Spotify profits from.",
        "It argues commissions fund privacy and security all developers benefit from.",
        "Apple maintains Apple Music competes on merit and the fine ignores economic reality.",
        "On DMA, Apple says new EU fees reflect genuine infrastructure costs.",
      ],
      whatItMeansForYou: [
        "Spotify may show EU users clearer web signup links thanks to enforcement.",
        "Apple appealed—fine payment and final liability not locked until appeals end.",
        "Subscription prices may shift slightly if fee burdens change.",
        "Non-EU users see different rules until global policy changes.",
        "Case shows decade-long platform fights can produce partial wins, not instant overhaul.",
      ],
      bottomLine:
        "EU Spotify–Apple fee fight produced a major 2024 fine on steering abuse, but appeals and DMA fee disputes keep the case alive—partial victory for rivals, not final peace.",
    },
  },
];
