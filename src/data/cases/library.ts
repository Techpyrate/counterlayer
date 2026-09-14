import type { CompetitionCase } from "../types";

export const libraryCases: CompetitionCase[] = [
  {
    id: "eu-google-android",
    name: "Google Android (EU)",
    shortName: "Google Android (EU)",
    companies: ["google"],
    jurisdictions: ["EU"],
    conduct: ["tying", "exclusivity", "abuse_of_dominance"],
    yearStart: 2015,
    yearEnd: 2018,
    status: "fined",
    summary:
      "The European Commission found Google abused dominance in licensable mobile operating systems by tying Play Store, Search, and Chrome to Android licensing and paying manufacturers to pre-install Google Search exclusively.",
    regulatorArgument:
      "Pre-installation requirements and revenue-share exclusivity cemented Google Search on mobile devices and blocked viable Android forks, foreclosing rival search engines and app ecosystems.",
    outcome:
      "€4.34 billion fine (later adjusted on appeal in some respects); Google changed its Android licensing model to offer separate bundles.",
    remedies:
      "End illegal tying; offer unbundled licensing; stop exclusivity payments conditioned on pre-installing Google Search.",
    laws: ["tfeu-102"],
    markets: ["licensable smart mobile OS", "general search", "app stores"],
    sources: [
      {
        label: "EC Android decision press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_18_4581",
      },
      {
        label: "EC Android case page",
        url: "https://competition-policy.ec.europa.eu/antitrust/cases/decisions/40099_en",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Formal investigation opened", date: "April 2015" },
      { label: "Statement of Objections", date: "April 2016" },
      { label: "Infringement decision and fine", date: "July 18, 2018" },
      { label: "General Court judgment (partial)", date: "September 2022" },
    ],
    timeline: [
      {
        date: "2015",
        title: "EU opens Android probe",
        detail:
          "The Commission began investigating whether Google used Android licensing to protect its search monopoly on phones and tablets.",
      },
      {
        date: "2018",
        title: "Record fine and remedies",
        detail:
          "Regulators concluded Google illegally tied its app store and browser to Android and paid phone makers to favor Google Search.",
      },
      {
        date: "2022–2024",
        title: "Appeals and compliance",
        detail:
          "Google appealed parts of the decision. Courts largely upheld the core abuse finding while adjusting the fine calculation in places.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Europe said Google used Android—the operating system on most non-Apple phones—as a lever to keep Google Search and its app store everywhere. Phone makers who wanted Google's Play Store had to bundle Search and Chrome too, and Google paid some of them not to pre-install rival search engines. The EU fined Google billions and ordered changes to how Android is licensed.",
      theStory: [
        "Android is open source in theory, but most phones ship with Google's proprietary apps and services. For manufacturers, access to the Play Store is often essential because customers expect familiar apps.",
        "The European Commission argued Google turned that dependency into a competition weapon. If you wanted Play, you also had to take Search and Chrome in a bundle—and in some cases agree not to pre-install a competing search engine.",
        "Regulators said this wasn't just normal product design. A dominant company was using control over mobile software distribution to protect its search advertising business and make it harder for alternative Android versions to succeed.",
        "Google countered that Android kept phones affordable, that its apps improved the user experience, and that rivals like Apple competed at the device level. The fight became a template for how Europe polices big tech platforms.",
      ],
      whyItMatters: [
        "Your phone's default search engine and app store are often decided by business contracts, not just what you tap in settings.",
        "Platform bundling cases ask whether giving consumers a free OS justifies rules that make rival services hard to reach.",
        "Android remedies influenced later EU rules, including the Digital Markets Act, on gatekeeper platforms.",
      ],
      whatWasClaimed: [
        "Google was dominant in licensable mobile operating systems.",
        "Requiring Play Store, Search, and Chrome together was illegal tying.",
        "Exclusivity payments and anti-forking terms blocked competition in search and alternative Android ecosystems.",
      ],
      theOtherSide: [
        "Google said Android is free and open, benefiting manufacturers and users.",
        "It argued users could easily change default apps and that Apple competed strongly on devices.",
        "Google maintained its licensing terms were pro-competitive and necessary for a consistent experience.",
      ],
      whatItMeansForYou: [
        "On many Android phones you can now choose different default search and browser options more easily in some regions.",
        "The case shows regulators treat 'free' platform software as a potential monopoly tool when rivals cannot reach users.",
        "Future phone defaults may continue to shift as DMA-style obligations spread.",
      ],
      bottomLine:
        "Europe punished Google for using Android distribution power to lock in Search. The company paid a massive fine and changed licensing, but appeals and compliance debates continued for years.",
    },
  },
  {
    id: "eu-google-adtech",
    name: "Google Adtech (EU / US)",
    shortName: "Google Adtech",
    companies: ["google"],
    jurisdictions: ["EU", "US"],
    conduct: ["self_preferencing", "abuse_of_dominance", "discrimination"],
    yearStart: 2021,
    status: "ongoing",
    summary:
      "EU and US authorities allege Google abused dominance across the ad-tech stack—publisher ad servers, exchanges, and advertiser tools—by favoring its own products and disadvantaging rivals and publishers.",
    regulatorArgument:
      "Vertical integration let Google act as auction operator and participant simultaneously, steering transactions toward its tools and degrading interoperability for competitors.",
    outcome:
      "Multiple investigations and lawsuits are active; some procedural wins and losses on both sides; final outcomes not yet determined.",
    laws: ["tfeu-102", "sherman-2", "ftc-5"],
    markets: ["display advertising", "ad exchanges", "publisher ad servers"],
    sources: [
      {
        label: "DOJ ad tech complaint announcement",
        url: "https://www.justice.gov/opa/pr/justice-department-sues-google-monopolizing-digital-advertising-technologies",
      },
      {
        label: "EC ad tech investigation",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_21_2065",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "EC formal investigation opened", date: "June 2021" },
      { label: "DOJ filed civil antitrust suit", date: "January 24, 2024" },
      { label: "EC Statement of Objections (reported)", date: "2023–2024" },
    ],
    timeline: [
      {
        date: "2021",
        title: "Europe opens ad-tech probe",
        detail:
          "The Commission began examining whether Google favored its own ad-buying and selling tools across the online advertising chain.",
      },
      {
        date: "2023–2024",
        title: "Charges and US litigation",
        detail:
          "EU moved toward formal objections while the US Department of Justice sued, alleging monopolization of key ad-tech tools.",
      },
      {
        date: "Ongoing",
        title: "Trials and remedies debate",
        detail:
          "Courts and regulators are weighing whether to break up parts of Google's ad stack or impose behavioral fixes. No final judgment yet.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "When you load a news site, an invisible auction often decides which ad you see. Google sits at several points in that chain—as a tool for publishers, an exchange, and a buyer. Regulators say that setup lets Google steer business to itself and away from rivals. Cases in Europe and the US are still running, so outcomes remain uncertain.",
      theStory: [
        "Online advertising depends on a chain of software: publishers use ad servers, exchanges match buyers and sellers, and advertisers bid through demand-side platforms. Google owns major products in each layer.",
        "Publishers and ad-tech rivals complained that Google changed rules, limited interoperability, and gave its own products advantages in auctions—sometimes allegedly bidding with information others could not see.",
        "The European Commission opened a formal abuse-of-dominance investigation. Separately, the US Department of Justice filed suit alleging Google monopolized publisher ad servers and ad exchanges.",
        "Google denies wrongdoing and argues the ad market is competitive, with Meta, Amazon, and others buying ads and new tools emerging. Because litigation is active, any description of 'what happened' is still provisional.",
      ],
      whyItMatters: [
        "Ad-tech fees ultimately affect the cost of running free websites, apps, and journalism.",
        "Self-preferencing by vertically integrated platforms is a central theme in modern antitrust.",
        "Remedies could range from fines to forced divestitures of ad products—high stakes for the open web economy.",
      ],
      whatWasClaimed: [
        "Google dominates key ad-tech tools publishers and advertisers rely on.",
        "It abused that power by favoring its own ad server, exchange, and buying tools.",
        "Publishers received less revenue and rivals faced higher barriers due to Google's conduct.",
      ],
      theOtherSide: [
        "Google says advertisers choose its tools because they work well and deliver results.",
        "It argues the display ad ecosystem includes many competitors and switching remains possible.",
        "Google contends US and EU theories overreach and could harm innovation in digital advertising.",
      ],
      whatItMeansForYou: [
        "You rarely see these fights directly, but they affect whether independent publishers can fund content through ads.",
        "Ongoing cases may eventually change how ads are sold on sites you visit daily.",
        "Until courts rule, treat news reports as allegations, not final findings.",
      ],
      bottomLine:
        "Google's role across the ad-tech stack is under intense scrutiny on both sides of the Atlantic. The cases are live, contested, and could reshape online advertising if regulators prevail.",
    },
  },
  {
    id: "us-v-google-search",
    name: "United States v. Google LLC (Search)",
    shortName: "Google Search (US)",
    companies: ["google"],
    jurisdictions: ["US"],
    conduct: ["exclusivity", "abuse_of_dominance", "market_access"],
    yearStart: 2020,
    status: "remedy",
    summary:
      "The US Department of Justice and states sued Google, alleging it unlawfully maintained a monopoly in general search through exclusive default distribution deals with browsers, device makers, and carriers.",
    regulatorArgument:
      "Multi-billion-dollar payments and default placements foreclosed rival search engines from scale, protecting Google's search advertising dominance.",
    outcome:
      "District court found liability on key monopolization claims in 2024; remedies phase and appeals continue.",
    remedies:
      "Potential limits on default agreements, data sharing, or other behavioral or structural relief under court consideration.",
    laws: ["sherman-1", "sherman-2"],
    markets: ["general search services", "search advertising"],
    sources: [
      {
        label: "DOJ Google search case page",
        url: "https://www.justice.gov/atr/case/us-and-plaintiff-states-v-google-llc",
      },
      {
        label: "DOJ complaint announcement",
        url: "https://www.justice.gov/opa/pr/justice-department-and-state-attorneys-general-sue-google-monopolizing",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "DOJ and states filed suit", date: "October 20, 2020" },
      { label: "Trial began", date: "September 2023" },
      { label: "District court liability ruling", date: "August 2024" },
    ],
    timeline: [
      {
        date: "2020",
        title: "Landmark search monopolization suit",
        detail:
          "Federal and state enforcers accused Google of paying to be the default search engine on phones and browsers, blocking rivals from gaining users.",
      },
      {
        date: "2023",
        title: "Bench trial",
        detail:
          "A judge heard evidence on defaults, scale advantages, and whether Google's contracts illegally maintained monopoly power.",
      },
      {
        date: "2024–ongoing",
        title: "Liability and remedies",
        detail:
          "Courts found Google liable on important claims, then moved to what fixes are appropriate. Appeals and remedy hearings may take years.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "The US government sued Google over search—the box most people use to find things online. Prosecutors say Google paid Apple, phone makers, and browsers to make Google the default search engine, making it hard for rivals like Bing or DuckDuckGo to grow. A court found Google broke the law in key ways; what fixes to order is still being fought over.",
      theStory: [
        "General search is where Google earns most of its money through ads tied to queries. Being the default on a phone or browser sends enormous traffic without users actively choosing each time.",
        "The Department of Justice argued Google locked up those defaults with long contracts and revenue sharing—especially with Apple—so competitors could not reach the scale needed to improve their products.",
        "Google responded that people choose Google because it is better, that defaults are easy to change, and that competition from Apple and others keeps it honest.",
        "After a lengthy trial, a federal judge ruled Google unlawfully maintained monopoly power in general search through its distribution agreements. The next phase focuses on remedies—what the company must change.",
      ],
      whyItMatters: [
        "Default settings powerfully shape tech habits even when switching is technically possible.",
        "The case is the biggest US monopolization trial against a tech giant since Microsoft in the 1990s.",
        "Remedies could affect how phones and browsers set search engines worldwide.",
      ],
      whatWasClaimed: [
        "Google has monopoly power in general search and search text ads.",
        "Exclusive and de facto exclusive default deals foreclosed rivals from user access.",
        "Google's conduct was exclusionary, not just successful competition on quality.",
      ],
      theOtherSide: [
        "Google says it competes on merit and invests heavily in search quality.",
        "It argues users can change defaults in a few taps and often prefer Google anyway.",
        "Google warns drastic remedies could harm Android partners and innovation.",
      ],
      whatItMeansForYou: [
        "Your phone's default search engine may be the product of a business deal, not your first choice.",
        "Future rulings could make it easier to pick or rotate search defaults during device setup.",
        "Appeals mean nothing is final yet—watch remedy orders for practical changes.",
      ],
      bottomLine:
        "US enforcers won important liability findings against Google Search, but the fight over fixes and appeals is far from over.",
    },
  },
  {
    id: "eu-apple-music",
    name: "Apple — App Store music streaming (EU)",
    shortName: "Apple App Store (music)",
    companies: ["apple"],
    jurisdictions: ["EU"],
    conduct: ["tying", "self_preferencing", "refusal_to_deal", "platform_suspension"],
    yearStart: 2020,
    status: "ongoing",
    summary:
      "The European Commission found Apple abused dominance in music streaming app distribution by restricting developers from informing users about cheaper off-app payment options and applying unfair App Store rules.",
    regulatorArgument:
      "Anti-steering rules and mandatory in-app payment tied distribution to Apple's payment system, raising costs for rivals like Spotify and limiting consumer information.",
    outcome:
      "Commission fined Apple €1.84 billion in 2024 for music streaming-related abuses; DMA gatekeeper obligations and compliance monitoring continue.",
    remedies:
      "End anti-steering restrictions for music streaming apps; DMA requires broader choice screens and sideloading options on iOS in the EU.",
    laws: ["tfeu-102", "dma"],
    markets: ["app distribution on iOS", "music streaming"],
    sources: [
      {
        label: "EC Apple music streaming decision",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_24_1161",
      },
      {
        label: "EC Apple App Store investigation",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_20_1073",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "EC opened App Store probe", date: "June 2020" },
      { label: "Statement of Objections (music)", date: "April 2021" },
      { label: "Infringement decision and fine", date: "March 4, 2024" },
    ],
    timeline: [
      {
        date: "2020",
        title: "Spotify complaint triggers EU probe",
        detail:
          "Streaming rivals argued Apple's App Store rules forced them to pay a 30% commission and banned telling users about cheaper web sign-ups.",
      },
      {
        date: "2021–2023",
        title: "Charges and DMA overlap",
        detail:
          "The Commission advanced abuse-of-dominance charges while new EU gatekeeper rules began applying to Apple.",
      },
      {
        date: "2024–ongoing",
        title: "Fine and compliance fights",
        detail:
          "Apple was fined and ordered to change rules, but disputes continue over whether DMA and App Store updates truly open competition.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Spotify and other music apps compete with Apple Music but must use Apple's App Store to reach iPhone users. Europe says Apple used its control of that store to block apps from telling you about cheaper prices on the web and to favor its own music service. Apple was fined, but arguments over App Store changes are still playing out.",
      theStory: [
        "On iPhones, most apps are installed through Apple's App Store. Apple charges developers a commission on many digital purchases and sets detailed rules on payments and marketing.",
        "Music streaming services complained they pay Apple a cut on subscriptions while Apple Music does not face the same fee. Worse, they said, Apple banned them from mentioning lower prices available on their websites.",
        "The European Commission concluded Apple abused a dominant position in iOS app distribution for music streaming by applying anti-steering rules that distorted competition.",
        "Parallel EU Digital Markets Act duties now require Apple to offer more choice in the EU—alternative app marketplaces, link-outs, and default app controls—though implementation remains contested.",
      ],
      whyItMatters: [
        "App store rules decide whether small developers can reach customers without paying a platform tax.",
        "Anti-steering bans affect what price information you see inside apps you already use.",
        "The case connects classic abuse-of-dominance law with new DMA gatekeeper regulation.",
      ],
      whatWasClaimed: [
        "Apple dominates distribution of music streaming apps on iOS.",
        "Mandatory in-app payment and anti-steering rules raised rival costs and limited consumer choice.",
        "Apple's conduct was not justified by security or quality arguments alone.",
      ],
      theOtherSide: [
        "Apple says its App Store protects users from fraud and malware.",
        "It argues the commission is wrong on market definition and that developers benefit from Apple's ecosystem.",
        "Apple maintains it is complying with EU law while challenging aspects of enforcement.",
      ],
      whatItMeansForYou: [
        "EU iPhone users may see more links to external payment options and alternative app stores over time.",
        "Subscription prices reflect platform fees—even when you never notice the App Store layer.",
        "Ongoing compliance reviews mean the practical experience may keep changing.",
      ],
      bottomLine:
        "Europe penalized Apple for App Store rules that harmed music streaming rivals, but the real-world opening of iOS competition is still unfolding under DMA supervision.",
    },
  },
  {
    id: "epic-v-apple",
    name: "Epic Games v. Apple",
    shortName: "Epic v. Apple",
    companies: ["apple"],
    jurisdictions: ["US"],
    conduct: ["tying", "platform_suspension", "resale_restriction"],
    yearStart: 2020,
    yearEnd: 2023,
    status: "remedy",
    summary:
      "Epic Games sued Apple after Fortnite was removed from the App Store for bypassing in-app payment, challenging Apple's commission and anti-steering rules.",
    regulatorArgument:
      "Epic argued Apple illegally tied app distribution to its payment system and suppressed competition in iOS app distribution and payments.",
    outcome:
      "Most federal antitrust claims failed; Apple won on core Sherman Act theories. A narrow California unfair-competition injunction allowed some external payment links; US Supreme Court declined further review in 2024.",
    remedies:
      "Anti-steering injunction under California law (narrow scope); no broad App Store breakup or forced third-party stores in the US from this case.",
    laws: ["sherman-1", "sherman-2"],
    markets: ["iOS app distribution", "in-app payment solutions"],
    sources: [
      {
        label: "US District Court decision (Epic v. Apple)",
        url: "https://www.courtlistener.com/docket/17346629/epic-games-inc-v-apple-inc/",
      },
      {
        label: "Ninth Circuit opinion",
        url: "https://www.courtlistener.com/opinion/9488610/epic-games-inc-v-apple-inc/",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Fortnite removed from App Store", date: "August 2020" },
      { label: "District court decision", date: "September 10, 2021" },
      { label: "Supreme Court declined review", date: "January 2024" },
    ],
    timeline: [
      {
        date: "August 2020",
        title: "Fortnite payment bypass",
        detail:
          "Epic added a direct payment option in Fortnite, violating App Store rules. Apple removed the game and Epic sued the same day.",
      },
      {
        date: "2021",
        title: "Trial and mixed ruling",
        detail:
          "A federal judge rejected most antitrust claims but found Apple violated California unfair competition law by blocking external payment links.",
      },
      {
        date: "2023–2024",
        title: "Appeals exhausted",
        detail:
          "Appeals largely upheld the split outcome. Epic failed to open the App Store under federal antitrust law but kept a narrow anti-steering win.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Epic Games, maker of Fortnite, deliberately broke Apple's App Store payment rules and sued, hoping to force Apple to allow other payment methods and app stores on iPhones. Apple mostly won: courts said Epic did not prove Apple is an illegal monopolist under federal law. Epic did get a limited win allowing apps to mention external payment options under California state law.",
      theStory: [
        "Apple takes up to a 30% cut on many in-app purchases and requires developers to use its billing system. Epic argued that combo—only App Store distribution plus mandatory Apple payment—illegally blocked competition.",
        "Epic staged a public confrontation by offering cheaper V-Bucks through Epic's own checkout, knowing Apple would remove Fortnite. The lawsuit followed immediately.",
        "After a high-profile trial, the judge ruled Apple is not a monopolist under federal antitrust standards in the relevant markets Epic proposed, and its security and privacy justifications carried weight.",
        "Still, the court barred Apple from preventing developers from communicating about external payment options in specific ways under California's unfair competition law—a partial opening Epic and others cited in later regulatory pushes.",
      ],
      whyItMatters: [
        "US courts set a high bar for calling mobile app stores illegal monopolies.",
        "Developer fights over 30% commissions influenced legislation in the EU, South Korea, and US states.",
        "The case shows platform owners can win on antitrust yet still face state-law and regulatory pressure.",
      ],
      whatWasClaimed: [
        "Apple monopolized iOS app distribution and in-app payment processing.",
        "Tying Fortnite access to Apple's payment system harmed competition and consumers.",
        "Apple's rules were exclusionary, not merely business terms.",
      ],
      theOtherSide: [
        "Apple said Epic breached a contract and that the App Store's curation and security benefit users.",
        "Apple argued competition from Android and web apps prevents monopoly power.",
        "Apple maintained its commission funds a trusted marketplace and developer tools.",
      ],
      whatItMeansForYou: [
        "Fortnite returned to iOS through alternative channels in some regions, not a full US App Store policy overhaul.",
        "US iPhone users did not gain sideloading or third-party app stores from this case alone.",
        "EU and other jurisdictions pursued broader App Store changes separately.",
      ],
      bottomLine:
        "Epic's bold challenge produced headlines and a narrow US legal win on steering, but Apple largely defended its App Store model in American federal court.",
    },
  },
  {
    id: "us-amzn-prime",
    name: "FTC v. Amazon (marketplace / Prime)",
    shortName: "FTC v. Amazon",
    companies: ["amazon"],
    jurisdictions: ["US"],
    conduct: ["self_preferencing", "discrimination", "price_fix", "abuse_of_dominance"],
    yearStart: 2023,
    status: "ongoing",
    summary:
      "The FTC and 17 states allege Amazon illegally maintains monopoly power in online superstores and marketplace services through anti-discounting policies, biased search results, and Prime-related logistics advantages.",
    regulatorArgument:
      "Amazon punishes sellers who offer lower prices elsewhere, favors its own retail and logistics in search and Buy Box placement, and degrades the marketplace experience to protect monopoly profits.",
    outcome:
      "Litigation is active; Amazon denies the allegations and has moved to dismiss portions of the case. No final judgment yet.",
    laws: ["sherman-2", "ftc-5"],
    markets: ["online superstores", "online marketplace services"],
    sources: [
      {
        label: "FTC Amazon complaint announcement",
        url: "https://www.ftc.gov/news-events/news/press-releases/2023/09/ftc-sues-amazon-illegally-maintaining-monopoly-power",
      },
      {
        label: "FTC case docket",
        url: "https://www.ftc.gov/legal-library/browse/cases-proceedings/2310076-amazoncom-inc-matter",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "FTC and states filed suit", date: "September 26, 2023" },
      { label: "Case assigned (Western District of Washington)", date: "2023" },
      { label: "Motion to dismiss briefing", date: "2024" },
    ],
    timeline: [
      {
        date: "2023",
        title: "Major monopolization suit filed",
        detail:
          "The FTC accused Amazon of using seller rules and Prime logistics to entrench dominance in online shopping platforms.",
      },
      {
        date: "2024",
        title: "Procedural fights",
        detail:
          "Amazon challenged the complaint's legal theories while discovery and jurisdictional issues proceeded slowly.",
      },
      {
        date: "Ongoing",
        title: "Merits phase pending",
        detail:
          "If the case reaches trial, courts will examine Buy Box algorithms, pricing policies, and Prime bundling—outcomes uncertain.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "The US Federal Trade Commission says Amazon uses its dominance in online shopping to hurt sellers and shoppers—for example, by punishing merchants who offer lower prices on other websites and by favoring Amazon's own products in search. Amazon calls the lawsuit wrong on the facts and the law. The case is still in early litigation, so treat claims as allegations.",
      theStory: [
        "Amazon runs one of the world's largest marketplaces: millions of third-party sellers list products alongside Amazon's own retail offers. Prime shipping and the Buy Box (the main 'Add to Cart' button) are central to who succeeds.",
        "The FTC alleges Amazon's policies effectively force sellers to keep prices high everywhere, even when they could sell cheaper on their own sites. Regulators also claim Amazon's search and Buy Box algorithms boost Amazon's products and preferred sellers.",
        "Amazon responds that it competes vigorously with Walmart, Target, and others, that its policies prevent confusing price fragmentation, and that sellers voluntarily choose the platform.",
        "Because the case is ongoing, there has been no court finding of liability. The dispute will test how US law treats marketplace operators who also compete with their sellers.",
      ],
      whyItMatters: [
        "Marketplace rules affect small businesses that depend on Amazon for discovery and fulfillment.",
        "Price parity clauses can raise costs for consumers even when lower prices exist elsewhere.",
        "A win for enforcers could reshape how major platforms treat sellers and self-preferencing.",
      ],
      whatWasClaimed: [
        "Amazon monopolizes online superstore and marketplace services in the US.",
        "Anti-discounting and Buy Box policies illegally maintain that power.",
        "Prime and logistics integration exclude rivals and harm sellers.",
      ],
      theOtherSide: [
        "Amazon says it has never raised prices for consumers and constantly lowers costs.",
        "It argues sellers have many other channels and that FTC market definitions are too narrow.",
        "Amazon maintains its policies protect customer trust and consistent pricing.",
      ],
      whatItMeansForYou: [
        "If you sell on Amazon, platform rules on pricing and fulfillment are central to your business risk.",
        "Shoppers may pay more if sellers cannot discount freely on other sites.",
        "Watch for settlement or trial outcomes—nothing is decided yet.",
      ],
      bottomLine:
        "The FTC's Amazon lawsuit is a high-stakes test of US monopolization law against a dominant marketplace, but it remains contested and unresolved.",
    },
  },
  {
    id: "eu-amazon-buybox",
    name: "Amazon marketplace practices (EU)",
    shortName: "Amazon Buy Box (EU)",
    companies: ["amazon"],
    jurisdictions: ["EU"],
    conduct: ["self_preferencing", "data_lockin", "discrimination"],
    yearStart: 2019,
    yearEnd: 2022,
    status: "settled",
    summary:
      "The European Commission investigated Amazon's use of non-public seller data to compete against merchants and its Buy Box and Prime eligibility criteria that allegedly favored Amazon's own retail offers.",
    regulatorArgument:
      "Access to marketplace data and control over Buy Box visibility let Amazon retail benefit from sellers' sensitive information and self-preference in the default purchase option.",
    outcome:
      "Amazon offered binding commitments accepted by the Commission in 2022, avoiding a formal infringement decision while imposing data-use and equal-treatment obligations.",
    remedies:
      "Stop using non-public seller data for Amazon retail decisions; apply Buy Box criteria equally; independent trustee monitoring.",
    laws: ["tfeu-102"],
    markets: ["online marketplace services"],
    sources: [
      {
        label: "EC Amazon commitments decision",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_22_7777",
      },
      {
        label: "EC Amazon marketplace investigation",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_19_4291",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Formal investigation opened", date: "July 2019" },
      { label: "Statement of Objections (Buy Box/data)", date: "November 2020" },
      { label: "Commitments made binding", date: "December 2022" },
    ],
    timeline: [
      {
        date: "2019",
        title: "EU probes marketplace data use",
        detail:
          "Regulators examined whether Amazon copied successful seller products using marketplace insights unavailable to rivals.",
      },
      {
        date: "2020",
        title: "Buy Box charges",
        detail:
          "The Commission objected to criteria that allegedly steered the default purchase button toward Amazon retail or Fulfilled-by-Amazon offers.",
      },
      {
        date: "2022",
        title: "Commitments instead of fine",
        detail:
          "Amazon promised behavioral changes and monitoring rather than fight a formal abuse decision to conclusion.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Europe investigated whether Amazon unfairly used data from third-party sellers to launch competing products and whether its 'Buy Box' favored Amazon's own offers. Instead of a final guilty verdict, Amazon agreed to binding promises: stop misusing seller data and apply Buy Box rules more fairly, with an independent monitor checking compliance.",
      theStory: [
        "When you click 'Add to Cart' on Amazon, you often use the Buy Box—a default offer chosen by Amazon's algorithms. Sellers fight fiercely for that placement because most sales flow through it.",
        "European regulators worried Amazon saw detailed data on what sells, at what price, and from which merchants—then used that insight to benefit Amazon's own retail arm.",
        "They also questioned whether Buy Box and Prime eligibility rules systematically advantaged Amazon fulfillment even when other sellers offered the same product cheaper or with equal service.",
        "Amazon offered commitments: firewall seller data from retail decisions, publish criteria more clearly, and allow third-party monitoring. The Commission accepted them, closing the case without a fine.",
      ],
      whyItMatters: [
        "Marketplaces that compete with their sellers create classic conflicts of interest regulators now scrutinize globally.",
        "Behavioral commitments can change platform rules without a public trial or massive penalty.",
        "The EU case foreshadowed later US FTC theories against Amazon's seller policies.",
      ],
      whatWasClaimed: [
        "Amazon abused dominance in French and German marketplace services (and related theories).",
        "Non-public seller data was used anti-competitively for Amazon retail.",
        "Buy Box and Prime rules discriminated against independent sellers.",
      ],
      theOtherSide: [
        "Amazon said it already protected seller data and that Buy Box criteria benefit customers with reliable offers.",
        "It argued commitments provide clarity while preserving innovation.",
        "Amazon noted intense retail competition from many other stores.",
      ],
      whatItMeansForYou: [
        "EU sellers may see clearer Buy Box rules and stronger data separation in theory—monitoring determines real impact.",
        "Shoppers still rely on Buy Box defaults; algorithm changes affect which offers you see first.",
        "Commitment cases can be harder for outsiders to enforce than court judgments.",
      ],
      bottomLine:
        "Europe resolved Amazon marketplace concerns through negotiated commitments on data and Buy Box fairness rather than a headline fine.",
    },
  },
  {
    id: "visa-mastercard",
    name: "Visa / Mastercard payment network rules",
    shortName: "Visa/Mastercard rules",
    companies: ["visa", "mastercard"],
    jurisdictions: ["Both"],
    conduct: ["vertical_restraint", "exclusivity", "price_fix"],
    yearStart: 2005,
    status: "settled",
    summary:
      "Long-running US and EU actions challenged interchange fees, honor-all-cards rules, and merchant restrictions on steering customers to cheaper payment methods.",
    regulatorArgument:
      "Network rules and fee structures coordinated pricing and blocked merchants from encouraging lower-cost payment options, inflating retail prices.",
    outcome:
      "Major US class settlements, EU interchange caps, and revised network rules; merchant steering and surcharging policies evolved but disputes continue in places.",
    remedies:
      "Interchange reductions in some settlements; modified merchant acceptance rules; EU interchange regulation for card payments.",
    laws: ["sherman-1", "tfeu-101", "tfeu-102"],
    markets: ["payment card networks", "card acquiring"],
    sources: [
      {
        label: "DOJ Visa/Mastercard merchant restraint case",
        url: "https://www.justice.gov/atr/case/us-v-visa-inc-and-mastercard-inc",
      },
      {
        label: "EC interchange fee regulation",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32015R0751",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "DOJ sued over merchant restraints", date: "October 2010" },
      { label: "Proposed US merchant class settlement", date: "2012" },
      { label: "EU interchange caps effective", date: "2015" },
    ],
    timeline: [
      {
        date: "2000s",
        title: "Interchange backlash grows",
        detail:
          "Retailers complained that hidden swipe fees raised prices on everything from groceries to gas.",
      },
      {
        date: "2010",
        title: "DOJ challenges network rules",
        detail:
          "The US sued Visa and Mastercard over rules that limited merchants' ability to steer customers to other cards or payment types.",
      },
      {
        date: "2010s–2020s",
        title: "Settlements and regulation",
        detail:
          "US litigation produced large settlements and rule changes; the EU capped interchange for many consumer card transactions.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Every time you tap a Visa or Mastercard, merchants pay fees that often get baked into prices. For years, governments and retailers argued the card networks used rules to keep those fees high and stop stores from pointing you to cheaper ways to pay. The result was a mix of lawsuits, settlements, and EU fee caps—not a breakup of the networks.",
      theStory: [
        "Visa and Mastercard do not issue most cards you carry; banks do. But the networks set rules every merchant and bank must follow, including interchange fees paid on each transaction.",
        "Merchants said honor-all-cards and no-surcharge norms prevented them from discouraging high-fee premium cards or promoting debit and cash.",
        "US antitrust enforcers challenged anti-steering provisions, leading to consent decrees and sprawling private class actions with billions in proposed relief.",
        "Europe took a more regulatory path, capping interchange for many consumer credit and debit transactions and continuing to monitor wallet and open-banking competition separately.",
      ],
      whyItMatters: [
        "Payment network rules are invisible to shoppers but shape retail prices and fintech innovation.",
        "Anti-steering cases connect to later fights over Apple Pay, wallets, and open banking.",
        "Shows how US litigation and EU regulation can attack similar problems differently.",
      ],
      whatWasClaimed: [
        "Network rules illegally restrained merchant competition on acceptance and pricing.",
        "Interchange levels reflected coordinated or market-power effects harming merchants and consumers.",
        "Merchants should be free to inform customers about cost differences among payment methods.",
      ],
      theOtherSide: [
        "Networks argued interchange funds fraud protection, rewards, and innovation.",
        "They said merchants benefit from increased card usage and sales.",
        "Visa and Mastercard maintained rule changes balanced merchant and consumer interests.",
      ],
      whatItMeansForYou: [
        "Some merchants may surcharge or offer cash discounts where law allows.",
        "Rewards cards are partly funded by interchange—changing fees affects card perks.",
        "EU caps lowered some costs; US outcomes vary by state law and settlement status.",
      ],
      bottomLine:
        "Visa and Mastercard faced decades of pressure to loosen merchant restraints and lower fees, producing settlements and EU caps but leaving a complex global payment landscape.",
    },
  },
  {
    id: "att-tmobile",
    name: "AT&T / T-Mobile merger (abandoned)",
    shortName: "AT&T–T-Mobile",
    companies: ["att", "tmobile"],
    jurisdictions: ["US"],
    conduct: ["merger"],
    yearStart: 2011,
    yearEnd: 2011,
    status: "dismissed",
    summary:
      "The Department of Justice sued to block AT&T's proposed acquisition of T-Mobile USA, arguing the merger would reduce national mobile wireless competition from four major carriers to three.",
    regulatorArgument:
      "Eliminating T-Mobile as an independent disruptive carrier would raise prices, reduce innovation, and harm consumers and businesses relying on mobile data.",
    outcome:
      "AT&T abandoned the transaction in December 2011 after the DOJ challenge and FCC opposition; T-Mobile remained independent until later approved deals.",
    laws: ["clayton-7", "sherman-1"],
    markets: ["mobile wireless telecommunications"],
    sources: [
      {
        label: "DOJ AT&T/T-Mobile case",
        url: "https://www.justice.gov/atr/case/us-and-plaintiff-states-v-att-inc-et-al",
      },
      {
        label: "DOJ complaint announcement",
        url: "https://www.justice.gov/opa/pr/justice-department-files-antitrust-lawsuit-block-att-t-mobile-merger",
      },
    ],
    readingMinutes: 7,
    keyDates: [
      { label: "Merger announced", date: "March 2011" },
      { label: "DOJ filed suit to block", date: "August 31, 2011" },
      { label: "AT&T withdrew merger", date: "December 19, 2011" },
    ],
    timeline: [
      {
        date: "March 2011",
        title: "Mega-merger announced",
        detail:
          "AT&T agreed to buy T-Mobile USA for $39 billion, promising expanded LTE coverage.",
      },
      {
        date: "August 2011",
        title: "DOJ sues to stop deal",
        detail:
          "Enforcers said T-Mobile was a vital low-price, innovative rival that the merger would eliminate.",
      },
      {
        date: "December 2011",
        title: "Deal collapses",
        detail:
          "Facing litigation and regulatory resistance, AT&T walked away and paid a breakup fee to Deutsche Telekom.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "In 2011 AT&T tried to buy T-Mobile to build a bigger cell network. The US government sued, saying losing T-Mobile as an independent carrier would mean higher phone bills and less innovation. AT&T gave up within months. The case is remembered as a rare successful block of a major wireless merger—though T-Mobile later merged with Sprint in a separate, approved deal.",
      theStory: [
        "Mobile phone service is expensive infrastructure with only a handful of national providers. Mergers can quickly shift from four competitors to three—a classic red flag for antitrust enforcers.",
        "T-Mobile marketed itself as the 'uncarrier,' pushing unlimited plans and lower prices that rivals had to match. The DOJ argued that competitive pressure would fade if T-Mobile became part of AT&T.",
        "The Federal Communications Commission also signaled concerns, increasing pressure on the companies.",
        "AT&T ultimately abandoned the merger, paying Deutsche Telekom a breakup fee. Years later, T-Mobile acquired Sprint in a deal regulators approved with conditions—a reminder that merger outcomes depend on timing and market facts.",
      ],
      whyItMatters: [
        "Wireless consolidation directly affects monthly bills and network investment.",
        "Governments sometimes stop megamergers before harm occurs, not after.",
        "Later approved deals show competition analysis evolves with market structure.",
      ],
      whatWasClaimed: [
        "The merger would substantially lessen competition in mobile wireless.",
        "T-Mobile's loss as an independent maverick would raise prices and reduce quality.",
        "Efficiency claims did not outweigh competitive harm.",
      ],
      theOtherSide: [
        "AT&T said the deal would accelerate LTE buildout to rural areas.",
        "It argued the market included regional carriers and growing mobile alternatives.",
        "AT&T maintained consumers would benefit from combined spectrum and towers.",
      ],
      whatItMeansForYou: [
        "Your carrier choices and plan prices reflect past merger decisions.",
        "Blocked and approved deals together shape today's AT&T, T-Mobile, and Verizon map.",
        "Merger reviews are fact-specific—one block does not ban all consolidation forever.",
      ],
      bottomLine:
        "The government stopped AT&T from buying T-Mobile in 2011, preserving a fourth national wireless competitor at the time—a landmark US merger victory for enforcers.",
    },
  },
  {
    id: "illumina-grail",
    name: "Illumina / GRAIL",
    shortName: "Illumina–GRAIL",
    companies: ["illumina", "grail"],
    jurisdictions: ["Both"],
    conduct: ["merger"],
    yearStart: 2021,
    yearEnd: 2023,
    status: "remedy",
    summary:
      "US and EU antitrust enforcers challenged Illumina's acquisition of GRAIL, a developer of multi-cancer early detection tests, fearing vertical foreclosure in next-generation sequencing and blood-based screening markets.",
    regulatorArgument:
      "Illumina dominates DNA sequencing instruments and reagents; owning GRAIL could disadvantage rival test developers who depend on Illumina's platform.",
    outcome:
      "Regulators ordered divestiture; Illumina ultimately spun off GRAIL after losing key appeals and facing massive penalties in Europe.",
    remedies:
      "Structural divestiture of GRAIL; Illumina required to unwind the acquisition.",
    laws: ["clayton-7", "eu-merger", "ftc-5"],
    markets: ["next-generation sequencing systems", "multi-cancer early detection tests"],
    sources: [
      {
        label: "FTC Illumina/GRAIL matter",
        url: "https://www.ftc.gov/legal-library/browse/cases-proceedings/2010144-illumina-inc-grail-inc-matter",
      },
      {
        label: "EC Illumina/GRAIL prohibition",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_23_3471",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Illumina re-acquired GRAIL", date: "August 2021" },
      { label: "FTC ordered divestiture", date: "April 2023" },
      { label: "EC prohibition upheld (General Court)", date: "September 2024" },
    ],
    timeline: [
      {
        date: "2021",
        title: "Vertical biotech merger closes",
        detail:
          "Illumina brought GRAIL back under its umbrella to advance multi-cancer screening built on Illumina sequencing.",
      },
      {
        date: "2022–2023",
        title: "Global enforcement clash",
        detail:
          "The FTC and European Commission both moved to unwind the deal, rare parallel hostility to a vertical healthcare merger.",
      },
      {
        date: "2023–2024",
        title: "Divestiture and spin-off",
        detail:
          "Illumina separated GRAIL again after courts and regulators rejected its efficiency defenses.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Illumina makes the sequencing machines many genetic tests rely on. It bought GRAIL, which sells a blood test meant to detect many cancers early. Regulators on both sides of the Atlantic said owning GRAIL would let Illumina starve rival test makers of access to its platform. Courts and agencies ordered Illumina to get rid of GRAIL—and the company eventually did.",
      theStory: [
        "GRAIL's Galleri test represents a new category: screening healthy people for multiple cancers from a blood draw. It depends on advanced sequencing technology.",
        "Illumina already controlled much of the sequencing hardware market. Enforcers feared rival test developers would hesitate to invest if their supplier also competed against them.",
        "The FTC and European Commission pursued divestiture despite Illumina offering behavioral firewalls. EU authorities imposed a record-breaking fine for implementing the merger before clearance.",
        "After losing appeals, Illumina spun GRAIL off again, illustrating how vertical mergers in essential inputs can face tough scrutiny even without a direct consumer brand clash.",
      ],
      whyItMatters: [
        "Healthcare innovation can turn on access to shared platforms like sequencers or lab networks.",
        "Vertical merger enforcement revived globally after being relatively quiet for years.",
        "Parallel US and EU opposition signaled coordinated concern about platform foreclosure.",
      ],
      whatWasClaimed: [
        "The merger would lessen competition in MCED test markets.",
        "Illumina could foreclose rivals needing its sequencing systems.",
        "Behavioral remedies were inadequate for protecting future innovation.",
      ],
      theOtherSide: [
        "Illumina argued the merger accelerated life-saving screening access.",
        "It proposed access commitments and firewalls to protect rivals.",
        "Illumina said regulators underestimated competition from other sequencing and test platforms.",
      ],
      whatItMeansForYou: [
        "Cancer screening competition may depend on neutral access to lab technology.",
        "The case shows enforcers will unwind closed deals if they believe harm is likely.",
        "Patients may see multiple test providers only if platform access stays open.",
      ],
      bottomLine:
        "Illumina–GRAIL became a defining vertical merger defeat: regulators forced a full separation to protect rival developers of early cancer detection tests.",
    },
  },
  {
    id: "american-airlines-cartel",
    name: "Air cargo price-fixing conspiracies",
    shortName: "Air cargo cartels",
    companies: ["american-airlines"],
    jurisdictions: ["Both"],
    conduct: ["cartel_coordination", "price_fix"],
    yearStart: 2006,
    status: "fined",
    summary:
      "US and EU authorities prosecuted airlines and freight forwarders for conspiracies to fix fuel and security surcharges on air cargo shipments, yielding criminal fines and private damages actions.",
    regulatorArgument:
      "Competitors coordinated surcharge levels and timing rather than setting prices independently, inflating costs for shippers worldwide.",
    outcome:
      "Guilty pleas, hundreds of millions in fines in the US and EU, executive prosecutions, and follow-on civil litigation by customers.",
    remedies:
      "Criminal fines; compliance programs; individual sentences in some cases; civil settlements with shippers.",
    laws: ["sherman-1", "tfeu-101"],
    markets: ["air cargo transport", "international freight forwarding"],
    sources: [
      {
        label: "DOJ air cargo investigation",
        url: "https://www.justice.gov/atr/air-transportation-antitrust-enforcement",
      },
      {
        label: "EC air cargo cartel decision",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_10_1557",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "FBI/DOJ investigation public", date: "February 2006" },
      { label: "First airline guilty pleas (US)", date: "2008" },
      { label: "EC air cargo cartel fine", date: "November 2010" },
    ],
    timeline: [
      {
        date: "2000s",
        title: "Surcharges rise in parallel",
        detail:
          "Shippers noticed fuel and security fees moving similarly across major airlines, triggering government probes.",
      },
      {
        date: "2008–2012",
        title: "Criminal enforcement wave",
        detail:
          "Carriers including major US and European airlines pleaded guilty or settled for fixing surcharges on cargo routes.",
      },
      {
        date: "2010s",
        title: "Civil damages follow",
        detail:
          "Business customers sued to recover overcharges, extending the financial impact beyond government fines.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Competing airlines are supposed to set freight prices independently. Investigators found that many instead coordinated fuel and security surcharges on international air cargo—raising costs for businesses shipping goods by air. Executives faced criminal charges, airlines paid large fines, and shippers sued for damages.",
      theStory: [
        "Air cargo moves everything from pharmaceuticals to electronics across continents. Surcharges for fuel and security can swing total shipping costs dramatically.",
        "Antitrust agencies discovered emails and meetings where airline personnel discussed surcharge levels with competitors—a classic cartel pattern distinct from normal parallel pricing.",
        "The US Department of Justice secured guilty pleas from multiple carriers; the European Commission fined a cartel involving many of the same global airlines.",
        "The scandal became a textbook example of hub-and-spoke conspiracies and the global reach of cartel enforcement beyond consumer-facing products.",
      ],
      whyItMatters: [
        "Cartels hurt businesses upstream, not just retail shoppers—freight costs ripple into product prices.",
        "Parallel fees are not illegal; secret coordination is. Evidence of communication is crucial.",
        "Shows enforcers coordinate internationally on transport and logistics cartels.",
      ],
      whatWasClaimed: [
        "Airlines agreed on surcharge levels rather than competing.",
        "The conspiracy affected trans-Pacific and other major trade lanes.",
        "Customers paid artificially inflated cargo rates for years.",
      ],
      theOtherSide: [
        "Some defendants cooperated early for leniency; others contested liability in civil cases.",
        "Airlines later cited fuel volatility as a business challenge separate from illegal coordination.",
        "Individual executives disputed personal involvement where trials occurred.",
      ],
      whatItMeansForYou: [
        "If your business ships by air, past settlements may have funded damages claims.",
        "Competition compliance in logistics remains heavily monitored.",
        "Demonstrates why whistleblowers and document trails break cartels open.",
      ],
      bottomLine:
        "Air cargo surcharge cartels produced major criminal and civil antitrust enforcement on both sides of the Atlantic—a clear win for prosecutors against hard-core price fixing.",
    },
  },
  {
    id: "qualcomm-ftc",
    name: "FTC v. Qualcomm",
    shortName: "Qualcomm (US FTC)",
    companies: ["qualcomm"],
    jurisdictions: ["US"],
    conduct: ["exclusivity", "refusal_to_deal", "abuse_of_dominance"],
    yearStart: 2017,
    yearEnd: 2020,
    status: "won_by_defendant",
    summary:
      "The FTC sued Qualcomm over modem chip licensing practices, including 'no license, no chips' policies and exclusivity payments to Apple, alleging maintenance of a monopoly in CDMA and premium LTE modem chips.",
    regulatorArgument:
      "Qualcomm refused chips to OEMs unless they accepted supra-FRAND license terms and used rebates to secure exclusive Apple business, foreclosing rival modem suppliers.",
    outcome:
      "District court initially found liability, but the Ninth Circuit reversed, holding the FTC failed to show anticompetitive harm under US law.",
    laws: ["sherman-1", "sherman-2", "ftc-5"],
    markets: ["CDMA and premium LTE modem chips", "standard-essential patent licensing"],
    sources: [
      {
        label: "FTC Qualcomm matter",
        url: "https://www.ftc.gov/legal-library/browse/cases-proceedings/141-0199-qualcomm-incorporated",
      },
      {
        label: "Ninth Circuit opinion",
        url: "https://www.ftc.gov/system/files/documents/cases/qualcomm_ninth_circuit_opinion.pdf",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "FTC complaint filed", date: "January 2017" },
      { label: "District court liability ruling", date: "May 2019" },
      { label: "Ninth Circuit reversal", date: "August 2020" },
    ],
    timeline: [
      {
        date: "2017",
        title: "FTC challenges licensing model",
        detail:
          "The agency targeted Qualcomm's practice of licensing at the device level and conditioning chip sales on patent deals.",
      },
      {
        date: "2019",
        title: "Trial court sides with FTC",
        detail:
          "A judge ordered broad remedies including renegotiated licenses, surprising the industry.",
      },
      {
        date: "2020",
        title: "Appeals court overturns",
        detail:
          "The Ninth Circuit said Qualcomm had no duty to deal with rivals and its licensing was pro-competitive innovation policy.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Qualcomm makes modem chips that connect phones to cell networks and holds many essential patents. The FTC said Qualcomm bullied phone makers with a 'no license, no chips' rule and exclusive deals with Apple. A trial judge agreed, but an appeals court reversed—holding that US antitrust law did not require Qualcomm to help competitors. Qualcomm won in America even as Europe fined it separately.",
      theStory: [
        "Standard-essential patents complicate antitrust: inventors must be rewarded, but abusing standard-setting power can harm competition.",
        "The FTC argued Qualcomm's licensing royalties were excessive and that tying chip supply to patent agreements locked out rivals like Intel.",
        "Qualcomm countered that its model funded R&D that advanced mobile standards worldwide.",
        "After a dramatic win at trial, Qualcomm prevailed on appeal—a stark contrast to EU abuse-of-dominance enforcement in a parallel chip case.",
      ],
      whyItMatters: [
        "US courts remain skeptical of 'duty to deal' claims against innovative firms.",
        "Patent licensing and antitrust intersect in every smartphone on the market.",
        "Different outcomes in US vs EU shape where companies face greatest regulatory risk.",
      ],
      whatWasClaimed: [
        "Qualcomm monopolized modem chip markets.",
        "Refusal to deal and exclusivity rebates were exclusionary.",
        "Licensing terms were supra-competitive and maintained monopoly power.",
      ],
      theOtherSide: [
        "Qualcomm said it never stopped selling chips to willing licensees.",
        "It argued FRAND commitments did not create antitrust duties to license rivals.",
        "Qualcomm maintained Apple chose it for superior technology, not illegal rebates alone.",
      ],
      whatItMeansForYou: [
        "Phone prices reflect patent royalty stacks hidden inside device costs.",
        "US consumers saw no forced restructuring of Qualcomm's business model from this case.",
        "Global phone makers still navigate different patent rules by region.",
      ],
      bottomLine:
        "The FTC's high-profile loss against Qualcomm showed the limits of US monopolization claims against patent-heavy chip licensors—unlike Europe's separate successful case.",
    },
  },
  {
    id: "meta-within",
    name: "FTC v. Meta (Within / VR)",
    shortName: "Meta VR (Within)",
    companies: ["meta"],
    jurisdictions: ["US"],
    conduct: ["merger"],
    yearStart: 2022,
    yearEnd: 2023,
    status: "won_by_defendant",
    summary:
      "The FTC sought to block Meta's acquisition of Within Unlimited, maker of VR fitness app Supernatural, arguing the deal eliminated potential competition in VR-dedicated fitness apps.",
    regulatorArgument:
      "Meta could have entered VR fitness independently but chose to buy a leading app instead, reducing future head-to-head competition in an emerging market.",
    outcome:
      "District court denied the FTC's preliminary injunction; Meta closed the deal. Illustrates difficulty of nascent-market and potential-competition theories.",
    laws: ["clayton-7", "hart-scott"],
    markets: ["VR dedicated fitness applications", "virtual reality content"],
    sources: [
      {
        label: "FTC Meta/Within matter",
        url: "https://www.ftc.gov/legal-library/browse/cases-proceedings/221-0040-meta-platforms-incmark-zuckerbergwithin-unlimited-matter",
      },
      {
        label: "Court order denying PI",
        url: "https://www.ftc.gov/system/files/ftc_gov/pdf/d094044metawithinpublicredactedpiopinion.pdf",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "FTC filed to block merger", date: "July 2022" },
      { label: "Trial on preliminary injunction", date: "December 2022" },
      { label: "Court denied injunction", date: "January 31, 2023" },
    ],
    timeline: [
      {
        date: "2022",
        title: "FTC targets VR acquisition",
        detail:
          "After Meta's metaverse push, enforcers challenged a smaller fitness app deal as eliminating future competition.",
      },
      {
        date: "Late 2022",
        title: "Bench trial on potential competition",
        detail:
          "A judge heard whether Meta would have built its own VR fitness offering absent the acquisition.",
      },
      {
        date: "2023",
        title: "Deal proceeds",
        detail:
          "With no injunction, Meta completed the purchase, blunting the FTC's broader campaign against Meta acquisitions.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Meta bought Within, the company behind Supernatural, a VR workout app. The FTC tried to stop the deal, saying Meta was buying off a future competitor instead of building its own fitness app. A judge said the FTC did not prove its theory and let the sale go through—showing how hard it is to block mergers in young markets based on what might have happened.",
      theStory: [
        "After investing heavily in virtual reality through Quest headsets, Meta acquired smaller studios to fill content gaps.",
        "The FTC's complaint focused on 'potential competition'—the idea that Meta would have entered VR fitness on its own if it had not bought Within.",
        "Courts require concrete evidence about what a company realistically would do. The judge found the FTC's predictions too speculative.",
        "The loss came amid broader scrutiny of Meta's history of buying Instagram and WhatsApp, but this smaller deal did not fit traditional horizontal overlap theories.",
      ],
      whyItMatters: [
        "Tech platforms often grow by acquiring startups in adjacent markets.",
        "Potential-competition merger cases need strong factual proof to win injunctions.",
        "Losses in niche deals still shape enforcer strategy for bigger transactions.",
      ],
      whatWasClaimed: [
        "Meta had the capability and incentive to enter VR fitness independently.",
        "Buying Within removed that future competitive pressure.",
        "The deal violated Clayton Act merger standards.",
      ],
      theOtherSide: [
        "Meta said VR fitness was uncertain and Within improved user choice.",
        "It argued many fitness apps compete across VR and non-VR platforms.",
        "Meta maintained the acquisition spurred investment in VR content.",
      ],
      whatItMeansForYou: [
        "Quest users keep access to Supernatural under Meta ownership.",
        "Future FTC challenges to tech acquisitions may rely on clearer evidence of planned entry.",
        "Emerging markets do not automatically get strict merger blocks in US courts.",
      ],
      bottomLine:
        "Meta won the Within fight because the court rejected a speculative potential-competition theory—a cautionary tale for enforcers targeting small VR and app deals.",
    },
  },
  {
    id: "msft-activision",
    name: "Microsoft / Activision Blizzard",
    shortName: "Microsoft–Activision",
    companies: ["microsoft"],
    jurisdictions: ["Both"],
    conduct: ["merger"],
    yearStart: 2022,
    yearEnd: 2023,
    status: "remedy",
    summary:
      "Microsoft's $69 billion acquisition of Activision Blizzard faced global merger review, with the FTC seeking to block it and the EU ultimately clearing subject to cloud gaming licensing commitments.",
    regulatorArgument:
      "Enforcers feared Microsoft could withhold Activision games like Call of Duty from rival consoles or cloud services, foreclosing competition in gaming and subscription markets.",
    outcome:
      "Deal closed after UK CMA initially blocked then accepted restructured cloud licensing remedies; FTC preliminary injunction denied though administrative case continued separately.",
    remedies:
      "Cloud gaming content licensing commitments in the UK and EU; behavioral assurances on Call of Duty availability on rival platforms.",
    laws: ["clayton-7", "eu-merger", "hart-scott"],
    markets: ["AAA video games", "game consoles", "cloud gaming services"],
    sources: [
      {
        label: "FTC Microsoft/Activision matter",
        url: "https://www.ftc.gov/legal-library/browse/cases-proceedings/2210077-microsoftactivision-blizzard",
      },
      {
        label: "EC clearance decision summary",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_23_2476",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Deal announced", date: "January 2022" },
      { label: "FTC sued to block", date: "December 2022" },
      { label: "Deal closed", date: "October 2023" },
    ],
    timeline: [
      {
        date: "2022",
        title: "Largest gaming merger announced",
        detail:
          "Microsoft sought Activision's blockbuster franchises to bolster Game Pass and cloud gaming.",
      },
      {
        date: "2023",
        title: "Split global decisions",
        detail:
          "The UK CMA blocked then cleared a revised deal; the EU approved with cloud licensing conditions; a US judge denied the FTC's emergency block.",
      },
      {
        date: "Late 2023",
        title: "Integration begins",
        detail:
          "Microsoft completed the acquisition and negotiated multi-year Call of Duty availability on PlayStation.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Microsoft bought Activision Blizzard, home of Call of Duty and World of Warcraft, for roughly $69 billion. Regulators worried Microsoft might make those games exclusive to Xbox or its cloud service. The UK initially said no, then yes after Microsoft promised to license games to other cloud platforms. The US FTC failed to stop the deal in court, and the EU cleared it with conditions. Gamers still see Call of Duty on PlayStation—for now, under negotiated deals.",
      theStory: [
        "Video game mergers attract scrutiny because hit franchises can shift console and subscription battles overnight.",
        "Sony argued losing Call of Duty on PlayStation would harm competition; Microsoft promised continued cross-platform releases.",
        "The UK's Competition and Markets Authority became the highest-profile obstacle, fearing cloud gaming foreclosure, before accepting licensing remedies.",
        "A federal judge denied the FTC's request to pause the merger, allowing closure while administrative proceedings continued—a split outcome across jurisdictions.",
      ],
      whyItMatters: [
        "Content ownership drives platform competition in games, streaming, and cloud.",
        "Remedy design—licensing vs block—decided one of the decade's biggest tech mergers.",
        "Shows multinational deals can clear in some regions while facing lingering challenges in others.",
      ],
      whatWasClaimed: [
        "The merger would lessen competition in consoles, multi-game subscriptions, and cloud gaming.",
        "Microsoft could withhold must-have titles from rivals post-acquisition.",
        "Behavioral promises were insufficient without structural relief (according to some enforcers).",
      ],
      theOtherSide: [
        "Microsoft said the deal would expand games to more devices and consumers via Game Pass.",
        "It argued Sony remained dominant on consoles and had many exclusive titles itself.",
        "Microsoft offered long-term licensing and access commitments to address foreclosure fears.",
      ],
      whatItMeansForYou: [
        "Game Pass may include more Activision titles over time.",
        "Cloud gaming providers may receive licensed access under UK/EU conditions.",
        "Future exclusivity battles could still emerge game-by-game despite current deals.",
      ],
      bottomLine:
        "Microsoft–Activision closed with cloud licensing remedies and public promises on Call of Duty—a merger victory for the buyer after intense global review.",
    },
  },
  {
    id: "us-standard-oil",
    name: "Standard Oil Co. of New Jersey v. United States",
    shortName: "Standard Oil (1911)",
    companies: ["standard-oil"],
    jurisdictions: ["US"],
    conduct: ["merger", "exclusivity", "predatory_pricing", "refusal_to_deal"],
    yearStart: 1906,
    yearEnd: 1911,
    status: "remedy",
    summary:
      "The US Supreme Court found Standard Oil unlawfully monopolized interstate petroleum refining and marketing through acquisitions, rebates, and exclusionary railroad arrangements, ordering dissolution into separate companies.",
    regulatorArgument:
      "Standard Oil's combination and exclusionary practices suppressed competition in oil refining and transportation, creating an illegal monopoly in restraint of trade.",
    outcome:
      "1911 Supreme Court affirmed breakup; Standard Oil split into regional companies (including predecessors of Exxon and Mobil).",
    remedies:
      "Structural divestiture into geographically focused oil companies; landmark precedent for monopolization under Sherman Act Section 2.",
    laws: ["sherman-1", "sherman-2"],
    markets: ["petroleum refining", "oil transportation and marketing"],
    sources: [
      {
        label: "Library of Congress Standard Oil collection",
        url: "https://www.loc.gov/collections/united-states-reports-volumes-1-557/items/standard-oil-co-of-new-jersey-v-united-states/",
      },
      {
        label: "DOJ historical antitrust division",
        url: "https://www.justice.gov/atr/antitrust-division-history",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Federal suit filed", date: "1906" },
      { label: "Supreme Court decision", date: "May 15, 1911" },
      { label: "Divestiture implemented", date: "1911–1912" },
    ],
    timeline: [
      {
        date: "1870s–1890s",
        title: "Trust consolidates oil industry",
        detail:
          "John D. Rockefeller's Standard Oil combined refineries, pipelines, and marketing through trusts and interlocking agreements.",
      },
      {
        date: "1906",
        title: "Roosevelt-era prosecution",
        detail:
          "The federal government sued under the Sherman Act, part of a broader trust-busting movement.",
      },
      {
        date: "1911",
        title: "Breakup ordered",
        detail:
          "The Supreme Court's 'rule of reason' approach led to structural relief, creating multiple independent oil majors.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Standard Oil controlled most US oil refining in the early 1900s through aggressive deals and railroad rebates. The Supreme Court said that power went too far and ordered the company split into pieces—creating the ancestors of modern giants like ExxonMobil. It is the most famous breakup in American antitrust history.",
      theStory: [
        "Before modern gasoline stations, refining and transporting oil was the choke point of the energy economy. Standard Oil grew by buying rivals, securing railroad discounts competitors could not match, and integrating pipelines.",
        "Critics said consumers and independent producers paid the price through higher costs and blocked access. Standard argued scale lowered kerosene prices and improved efficiency.",
        "The 1911 Supreme Court decision did not ban bigness outright but condemned methods used to destroy competition. Structural breakup followed.",
        "The case still anchors debates about when monopoly power justifies splitting companies apart versus behavioral rules.",
      ],
      whyItMatters: [
        "Established that monopolization—not just cartels—can violate US antitrust law.",
        "Structural remedies (breakups) remain the nuclear option in enforcement debates.",
        "Historical template cited in modern calls to split tech and other conglomerates.",
      ],
      whatWasClaimed: [
        "Standard Oil monopolized interstate trade in refined petroleum.",
        "Rebates, acquisitions, and exclusionary tactics were unreasonable restraints.",
        "Breakup was necessary to restore competitive markets.",
      ],
      theOtherSide: [
        "Standard Oil argued integration cut waste and lowered consumer kerosene prices.",
        "It maintained many competitors existed in regional markets.",
        "Defenders said success came from efficiency, not only coercion.",
      ],
      whatItMeansForYou: [
        "Today's multiple oil brands trace partly to this mandated split.",
        "Antitrust still asks when scale helps consumers versus when it locks rivals out.",
        "Breakup talk in tech often references Standard Oil—even when facts differ.",
      ],
      bottomLine:
        "Standard Oil's 1911 breakup is the iconic US monopolization victory and still shapes how people think about corporate size and power.",
    },
  },
  {
    id: "att-breakup",
    name: "United States v. AT&T (1982 breakup consent)",
    shortName: "AT&T breakup (1982)",
    companies: ["att"],
    jurisdictions: ["US"],
    conduct: ["refusal_to_deal", "vertical_restraint", "abuse_of_dominance"],
    yearStart: 1974,
    yearEnd: 1984,
    status: "remedy",
    summary:
      "The Department of Justice's long-running case against AT&T's Bell System ended in a consent decree divesting local telephone operating companies and opening equipment markets, separating long-distance from local monopoly utilities.",
    regulatorArgument:
      "Vertically integrated monopoly control of local service, long-distance, and equipment blocked competition and innovation in telecommunications.",
    outcome:
      "1982 settlement led to 1984 divestiture into seven Regional Bell Operating Companies and competitive long-distance entry.",
    remedies:
      "Structural separation of local exchange carriers from AT&T long-distance and equipment; opened customer-premises equipment competition.",
    laws: ["sherman-2"],
    markets: ["local telephone service", "long-distance telephony", "telecommunications equipment"],
    sources: [
      {
        label: "DOJ AT&T case materials",
        url: "https://www.justice.gov/atr/case/united-states-v-att-co",
      },
      {
        label: "FCC history of divestiture",
        url: "https://www.fcc.gov/general/history-divestiture",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "DOJ filed suit", date: "1974" },
      { label: "Consent decree announced", date: "January 8, 1982" },
      { label: "Divestiture effective", date: "January 1, 1984" },
    ],
    timeline: [
      {
        date: "1974",
        title: "Antitrust suit filed",
        detail:
          "The DOJ challenged AT&T's integrated Bell System as an unlawful monopoly over phone service and equipment.",
      },
      {
        date: "1982",
        title: "Settlement to break up Bell",
        detail:
          "AT&T agreed to divest local operating companies in exchange for entering unregulated data markets.",
      },
      {
        date: "1984",
        title: "Competitive long-distance era",
        detail:
          "MCI, Sprint, and others could compete for long-distance calls; local service remained regulated utility monopolies.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "For decades, one phone company—AT&T's Bell System—owned local lines, long-distance service, and even the phone on your wall. The US government sued, and in 1982 AT&T agreed to split itself up. Local phone companies went one way; AT&T kept long-distance and equipment. That opened the door to competing long-distance carriers and later mobile and internet competition.",
      theStory: [
        "Before cell phones, telephone service was a natural monopoly: stringing wires to every home was expensive, and one provider often made sense locally.",
        "But enforcers said AT&T also controlled long-distance—which could be competitive—and blocked third-party phones and equipment.",
        "After years of litigation, AT&T accepted a consent decree rather than risk a trial outcome like Standard Oil.",
        "The breakup reshaped telecom: competitive long-distance prices fell, and later laws further opened local and broadband markets—though many Baby Bells eventually reconsolidated.",
      ],
      whyItMatters: [
        "Shows structural remedies applied to network industries before the internet age.",
        "Illustrates trade-offs between utility regulation and antitrust breakups.",
        "Precedent for modern debates about splitting platforms with network effects.",
      ],
      whatWasClaimed: [
        "AT&T monopolized telecommunications through vertical integration.",
        "Refusals to interconnect and equipment restrictions suppressed rivals.",
        "Divestiture was needed to separate competitive from natural-monopoly segments.",
      ],
      theOtherSide: [
        "AT&T argued unified management delivered reliable universal service.",
        "It said technology change—not breakup—would introduce competition.",
        "Eventually AT&T chose settlement to pursue computer and data businesses.",
      ],
      whatItMeansForYou: [
        "Competitive long-distance and equipment choice trace to this era.",
        "Today's telecom giants are partly descendants of the divested Bell companies.",
        "Network breakups remain rare but politically salient when prices or access frustrate consumers.",
      ],
      bottomLine:
        "The AT&T breakup is the 20th century's defining infrastructure antitrust settlement—splitting local monopolies from competitive long-distance and equipment markets.",
    },
  },
  {
    id: "eu-microsoft-media-player",
    name: "Microsoft Windows Media Player (EU)",
    shortName: "EU Microsoft (Media Player)",
    companies: ["microsoft"],
    jurisdictions: ["EU"],
    conduct: ["tying", "abuse_of_dominance"],
    yearStart: 2000,
    yearEnd: 2008,
    status: "fined",
    summary:
      "The European Commission found Microsoft abused dominance in PC operating systems by tying Windows Media Player to Windows, harming competing media software vendors.",
    regulatorArgument:
      "Integrating Media Player into Windows leveraged OS dominance to distort competition in media playback software markets.",
    outcome:
      "2004 decision fined Microsoft and ordered a version of Windows without Media Player ('Windows XP N'); later EU browser choice remedy followed in a related strand.",
    remedies:
      "Must-offer untied Windows version; fine; later monitoring in browser and interoperability cases.",
    laws: ["tfeu-102"],
    markets: ["PC operating systems", "media player software"],
    sources: [
      {
        label: "EC Microsoft media player decision",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_04_382",
      },
      {
        label: "EC Microsoft case history",
        url: "https://competition-policy.ec.europa.eu/antitrust/cases/decisions/37792_en",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Commission Statement of Objections", date: "August 2000" },
      { label: "2004 infringement decision", date: "March 24, 2004" },
      { label: "General Court largely upholds", date: "September 2007" },
    ],
    timeline: [
      {
        date: "2000s",
        title: "EU targets Windows bundling",
        detail:
          "RealNetworks and others complained Windows Media Player integration made rival players hard to sell.",
      },
      {
        date: "2004",
        title: "Fine and unbundling order",
        detail:
          "Microsoft was fined €497 million and told to offer a Windows version without Media Player in Europe.",
      },
      {
        date: "2007–2008",
        title: "Browser remedy follows",
        detail:
          "Related EU proceedings extended to Internet Explorer bundling, producing a browser ballot screen remedy.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Europe fined Microsoft for bundling Windows Media Player into Windows, saying PC dominance let Microsoft crush rival media software. Microsoft had to offer a stripped-down Windows without the player—though few consumers chose it. The case paired with later EU action over Internet Explorer and helped define how Europe treats software tying.",
      theStory: [
        "In the early 2000s, digital music and video were moving to PCs. Microsoft built Media Player into Windows, giving it instant distribution.",
        "Rivals like RealPlayer argued customers rarely downloaded alternatives when a good-enough player was preinstalled free.",
        "The Commission's tying theory mirrored US browser concerns but went further, mandating a product variant without the bundled software.",
        "Microsoft complied reluctantly; 'Windows N' editions sold poorly but established EU willingness to order product unbundling.",
      ],
      whyItMatters: [
        "EU software tying cases influenced the later US Microsoft trial narrative.",
        "Shows unbundling remedies can exist on paper without changing market share much.",
        "Foreshadowed DMA rules on default apps and choice screens decades later.",
      ],
      whatWasClaimed: [
        "Microsoft dominated PC operating systems.",
        "Tying Media Player was not justified by efficiency alone.",
        "The conduct foreclosed independent media software competition.",
      ],
      theOtherSide: [
        "Microsoft said integration improved consumer experience at no extra charge.",
        "It argued many third-party media apps thrived on Windows.",
        "Microsoft claimed unbundling orders harmed consistency and security.",
      ],
      whatItMeansForYou: [
        "Most Europeans still used standard Windows with Media Player installed.",
        "The case mattered more as legal precedent than as a consumer product change.",
        "Default app battles on phones echo this PC-era fight.",
      ],
      bottomLine:
        "EU Microsoft Media Player established Europe's tough stance on tying in software—even when the practical market impact of unbundling was limited.",
    },
  },
  {
    id: "booking-parity",
    name: "Booking.com parity clauses (EU / national)",
    shortName: "Booking.com parity",
    companies: ["booking"],
    jurisdictions: ["EU"],
    conduct: ["vertical_restraint", "price_fix", "resale_restriction"],
    yearStart: 2013,
    yearEnd: 2022,
    status: "settled",
    summary:
      "National competition authorities and the European Commission pressured Booking.com to narrow 'rate parity' and 'wide/narrow parity' clauses that restricted hotels from offering lower prices on their own websites or rival OTAs.",
    regulatorArgument:
      "Most-favored-nation and parity clauses softened price competition among online travel agencies and prevented hotels from discounting direct bookings.",
    outcome:
      "Series of commitments across France, Italy, Sweden, EU-wide; narrowed parity clauses and increased hotel pricing flexibility.",
    remedies:
      "Hotels may offer lower direct web rates and differentiate OTA vs direct room allocations; reduced MFN-style restrictions.",
    laws: ["tfeu-101", "tfeu-102"],
    markets: ["online travel agency hotel booking", "hotel distribution"],
    sources: [
      {
        label: "EC Booking.com parity press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_15_5678",
      },
      {
        label: "French Autorité de la concurrence Booking decision",
        url: "https://www.autoritedelaconcurrence.fr/en/decision/regarding-bookingcoms-parity-clauses",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Sweden first major OTA parity case", date: "2013" },
      { label: "France, Italy investigations", date: "2014–2015" },
      { label: "EU-wide commitments accepted", date: "2015" },
    ],
    timeline: [
      {
        date: "2013–2014",
        title: "Hotels challenge OTA contract terms",
        detail:
          "Parity clauses required hotels to give Booking.com the best available rate, limiting direct booking discounts.",
      },
      {
        date: "2015",
        title: "Pan-European commitments",
        detail:
          "Booking.com agreed to modify wide parity clauses across Europe after coordinated authority pressure.",
      },
      {
        date: "2010s–2020s",
        title: "Rolling national follow-ups",
        detail:
          "Authorities continued monitoring narrow parity and metadata clauses in several member states.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Hotels often list rooms on Booking.com—but contract fine print once barred them from offering cheaper prices on their own websites. European regulators said those 'parity' clauses dampened competition and kept room rates higher. Booking.com agreed to loosen the rules so hotels can discount direct bookings, a win for vertical restraints enforcement without breaking up the platform.",
      theStory: [
        "Online travel agencies like Booking.com aggregate hotel rooms for travelers worldwide. Their contracts included parity clauses: hotels must not undercut the OTA on price.",
        "Hotels complained they paid high commissions yet could not reward guests who booked direct—a classic vertical restraint affecting end prices.",
        "Competition authorities in Sweden, France, Italy, and at EU level coordinated pressure. Expedia faced parallel scrutiny.",
        "Booking.com offered commitments narrowing wide parity (across all channels) while allowing some differentiated offers, improving hotel pricing freedom over time.",
      ],
      whyItMatters: [
        "Platform MFN clauses appear in many industries—hotels, e-books, app stores.",
        "Shows how vertical contract terms can raise consumer prices without a traditional cartel.",
        "Small businesses (hotels) often lack bargaining power against giant platforms.",
      ],
      whatWasClaimed: [
        "Parity clauses restricted price competition among OTAs and hotels.",
        "Booking.com's market power made the restraints anti-competitive.",
        "Hotels and consumers paid higher effective room rates.",
      ],
      theOtherSide: [
        "OTAs said parity prevents free-riding on their marketing investments.",
        "Booking.com argued clauses ensured consumers saw consistent prices.",
        "Platforms maintained commissions fund visibility that helps small hotels reach global demand.",
      ],
      whatItMeansForYou: [
        "You may see different prices on a hotel's own site vs Booking.com in Europe.",
        "Direct booking perks (breakfast, upgrades) became easier for hotels to offer.",
        "Always compare direct and OTA rates—parity changes made that more meaningful.",
      ],
      bottomLine:
        "Booking.com parity enforcement freed hotels to compete on price for direct bookings—a key EU vertical restraints story in travel platforms.",
    },
  },
  {
    id: "meta-whatsapp",
    name: "Facebook / WhatsApp merger review",
    shortName: "Meta–WhatsApp merger",
    companies: ["meta"],
    jurisdictions: ["Both"],
    conduct: ["merger", "data_lockin"],
    yearStart: 2014,
    yearEnd: 2020,
    status: "fined",
    summary:
      "Facebook acquired WhatsApp in 2014 for $19 billion; EU later fined Meta for providing misleading information during merger review about matching user accounts, while US clearance focused on consumer communications and privacy concerns.",
    regulatorArgument:
      "Commission said Facebook misrepresented ability to link WhatsApp and Facebook user identities; critics argued the deal eliminated a potential messaging rival and expanded data concentration.",
    outcome:
      "Merger cleared in 2014; EU imposed €110 million fine in 2017 for misleading filing; broader breakup calls did not succeed.",
    remedies:
      "Fine for procedural misrepresentation; no structural unwind; privacy and DMA obligations addressed separately later.",
    laws: ["eu-merger", "hart-scott", "clayton-7"],
    markets: ["consumer messaging apps", "social networking", "mobile communications"],
    sources: [
      {
        label: "EC Facebook/WhatsApp clearance",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_14_984",
      },
      {
        label: "EC fine for misleading information",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_17_1369",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Deal announced", date: "February 2014" },
      { label: "EU unconditional clearance", date: "October 3, 2014" },
      { label: "EU fine for misleading merger info", date: "May 18, 2017" },
    ],
    timeline: [
      {
        date: "2014",
        title: "Mega messaging acquisition",
        detail:
          "Facebook bought WhatsApp when both competed at the edge of social and messaging markets.",
      },
      {
        date: "2014",
        title: "Quick regulatory clearance",
        detail:
          "US and EU cleared the deal with limited conditions, viewing messaging and social as distinct.",
      },
      {
        date: "2017",
        title: "EU penalty for inaccurate filing",
        detail:
          "Commission fined Facebook for stating it could not reliably match accounts when technical capability existed.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Facebook bought WhatsApp in 2014—two apps billions of people use to message friends. Regulators let the deal through, thinking they were different enough. Later Europe fined Facebook for misleading answers about linking user data between the apps. Many critics now cite the merger as a missed chance to stop big tech from buying future rivals, even though no court unwound the deal.",
      theStory: [
        "WhatsApp grew explosively as a simple, phone-number-based messenger outside Facebook's main app.",
        "Antitrust review focused on whether the companies competed head-to-head in messaging or social networking. Enforcers largely said no horizontal overlap—clearance followed quickly.",
        "Years later, Facebook began integrating data and business tools across WhatsApp, Instagram, and Facebook proper, fueling political backlash.",
        "The EU's 2017 fine punished inaccurate merger paperwork, not the merger itself—highlighting limits of retrospective challenge absent clear competitive overlap at the time.",
      ],
      whyItMatters: [
        "Poster child for 'killer acquisition' debates in tech.",
        "Shows merger review depends heavily on market definition chosen ex ante.",
        "Data integration after clearance raised privacy and competition concerns separately.",
      ],
      whatWasClaimed: [
        "Facebook misled EU about technical ability to match WhatsApp and Facebook user accounts.",
        "Critics claimed the deal eliminated a nascent rival in communications and ads.",
        "Post-merger data combination could entrench dominance (policy argument).",
      ],
      theOtherSide: [
        "Facebook said WhatsApp would remain separate with strong privacy promises initially.",
        "Regulators found insufficient evidence of horizontal overlap in 2014.",
        "Meta argues integration improved services and security investments.",
      ],
      whatItMeansForYou: [
        "One company now operates Facebook, Instagram, and WhatsApp—integration affects ads and features.",
        "Merger retrospectives rarely undo closed deals; forward-looking enforcement changed after public criticism.",
        "Messaging choice still exists among iMessage, Signal, Telegram, and others.",
      ],
      bottomLine:
        "The WhatsApp acquisition cleared easily then became a symbol of under-enforcement—Europe fined misleading filings but never split the companies.",
    },
  },
  {
    id: "nvidia-arm",
    name: "NVIDIA / Arm (abandoned merger)",
    shortName: "NVIDIA–Arm",
    companies: ["nvidia"],
    jurisdictions: ["Both"],
    conduct: ["merger", "refusal_to_deal"],
    yearStart: 2020,
    yearEnd: 2022,
    status: "dismissed",
    summary:
      "NVIDIA proposed acquiring Arm Limited from SoftBank for $40 billion, but faced global opposition over vertical foreclosure in chip IP licensing to rivals depending on Arm's neutral architecture.",
    regulatorArgument:
      "Owning Arm could let NVIDIA restrict or degrade access to CPU designs used by competitors in mobile, data center, and embedded chips.",
    outcome:
      "FTC sued to block; UK CMA and EU opened in-depth reviews; NVIDIA abandoned the deal in February 2022; Arm later pursued IPO.",
    laws: ["clayton-7", "eu-merger", "hart-scott"],
    markets: ["semiconductor IP licensing", "CPU and SoC design"],
    sources: [
      {
        label: "FTC NVIDIA/Arm challenge",
        url: "https://www.ftc.gov/news-events/news/press-releases/2021/12/ftc-sues-block-chip-supplier-nvidias-40-billion-acquisition-chip-design-provider-arm",
      },
      {
        label: "CMA NVIDIA/Arm investigation",
        url: "https://www.gov.uk/cma-cases/nvidia-slash-arm-merger-inquiry",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Deal announced", date: "September 2020" },
      { label: "FTC administrative complaint", date: "December 2021" },
      { label: "NVIDIA abandoned transaction", date: "February 2022" },
    ],
    timeline: [
      {
        date: "2020",
        title: "Semiconductor mega-deal announced",
        detail:
          "NVIDIA sought Arm's chip designs used in billions of devices, promising neutrality commitments.",
      },
      {
        date: "2021",
        title: "Global regulatory pushback",
        detail:
          "FTC, UK, and EU enforcers feared rivals like Apple, Qualcomm, and Amazon would face licensing risk.",
      },
      {
        date: "2022",
        title: "Deal terminated",
        detail:
          "Facing likely blocks, NVIDIA walked away; SoftBank later took Arm public instead.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Arm designs chip architecture used in most smartphones—but does not make chips itself. NVIDIA, a chip giant, tried to buy Arm and promised to keep licensing fair. Regulators in the US, UK, and Europe did not believe that would work and moved to block the deal. NVIDIA gave up in 2022, and Arm eventually went public instead.",
      theStory: [
        "Arm's business model licenses blueprints to Apple, Samsung, Qualcomm, and countless others—neutrality is central to its role.",
        "NVIDIA argued acquiring Arm would accelerate innovation and offered contractual protections for licensees.",
        "Antitrust enforcers said a chip competitor owning the shared architecture created irresistible incentives to favor NVIDIA or raise rival costs.",
        "The abandoned deal became a rare example of cross-border coordination stopping a vertical semiconductor merger before closure.",
      ],
      whyItMatters: [
        "Semiconductor supply chains depend on open IP licensing—foreclosure risks affect phones, cars, and cloud servers.",
        "Vertical merger enforcement intensified in strategic tech inputs post-Illumina/GRAIL debates.",
        "Arm's independence preserved a shared platform rivals rely on.",
      ],
      whatWasClaimed: [
        "The merger would lessen competition in chip markets globally.",
        "NVIDIA could degrade Arm licensing terms for rivals.",
        "Behavioral promises could not replicate Arm's neutral model.",
      ],
      theOtherSide: [
        "NVIDIA said it would maintain Arm's open licensing and invest heavily.",
        "It argued the deal would create the leading AI computing company.",
        "SoftBank needed exit options after holding Arm since 2016.",
      ],
      whatItMeansForYou: [
        "Device makers kept access to Arm designs without NVIDIA gatekeeping fears.",
        "AI chip competition continues among NVIDIA, AMD, and custom silicon from big tech.",
        "IPO investors—not NVIDIA—now hold Arm equity.",
      ],
      bottomLine:
        "NVIDIA–Arm collapsed under global antitrust pressure—a clear win for enforcers protecting neutral chip licensing.",
    },
  },
  {
    id: "live-nation-ticketmaster",
    name: "Live Nation / Ticketmaster (US)",
    shortName: "Live Nation–Ticketmaster",
    companies: ["live-nation", "ticketmaster"],
    jurisdictions: ["US"],
    conduct: ["merger", "exclusivity", "vertical_restraint", "abuse_of_dominance"],
    yearStart: 2009,
    status: "ongoing",
    summary:
      "The 2010 merger of Live Nation and Ticketmaster created a vertically integrated concerts giant; DOJ allowed it with a consent decree, but new 2024 litigation alleges monopolization and exclusionary conduct in live events and ticketing.",
    regulatorArgument:
      "Original and renewed theories claim combined control of promotion, venues, and primary ticketing forecloses rivals and raises prices/fees for artists and fans.",
    outcome:
      "2010 merger cleared with behavioral consent decree; 2024 DOJ and states filed new monopolization suit—outcomes pending.",
    remedies:
      "2010 consent included firewall and anti-retaliation provisions; 2024 case seeks structural and behavioral relief if liability found.",
    laws: ["clayton-7", "sherman-2", "sherman-1"],
    markets: ["primary event ticketing", "concert promotion", "live entertainment venues"],
    sources: [
      {
        label: "DOJ 2024 Live Nation complaint",
        url: "https://www.justice.gov/opa/pr/justice-department-sues-live-nation-ticketmaster-monopolizing-markets-across-live-concert",
      },
      {
        label: "DOJ 2010 merger settlement",
        url: "https://www.justice.gov/atr/case/united-states-and-plaintiff-states-v-live-nation-inc-and-ticketmaster-entertainment-inc",
      },
    ],
    readingMinutes: 10,
    keyDates: [
      { label: "Merger closed with consent decree", date: "January 2010" },
      { label: "Consent decree extended/modified", date: "2019" },
      { label: "DOJ filed new monopolization suit", date: "May 23, 2024" },
    ],
    timeline: [
      {
        date: "2009–2010",
        title: "Controversial vertical merger",
        detail:
          "Live Nation and Ticketmaster merged despite artist and fan opposition; DOJ imposed conditions instead of blocking.",
      },
      {
        date: "2010s",
        title: "Complaints about fees and exclusivity",
        detail:
          "Fans blamed service fees and limited competition; rivals alleged exclusive venue contracts blocked entry.",
      },
      {
        date: "2024",
        title: "New government monopolization case",
        detail:
          "DOJ and states sued again, arguing prior remedies failed and seeking deeper relief—case ongoing.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Ticketmaster sells most big-concert tickets; Live Nation promotes tours and owns venues. They merged in 2010 with government conditions meant to protect competition. Fans still complain about fees and shortages. In 2024 the US government sued again, saying the combined company illegally monopolizes live events. That new case is active—no final outcome yet.",
      theStory: [
        "Concert tickets became a cultural flashpoint: high fees, bots, and sold-out shows frustrate millions of fans.",
        "The 2010 merger united primary ticketing with promotion and venue relationships—critics warned of conflicts immediately.",
        "DOJ allowed the deal with a consent decree requiring fair dealing with rival promoters and venues.",
        "Years later, enforcers concluded the decree did not keep competition healthy and filed a broad Sherman Act case alleging monopolization across ticketing and promotion.",
      ],
      whyItMatters: [
        "Live entertainment pricing hits consumers directly—unlike many B2B antitrust fights.",
        "Tests whether initial merger remedies can fail so badly that later monopolization suits are warranted.",
        "Potential structural relief could reshape how you buy concert tickets.",
      ],
      whatWasClaimed: [
        "Live Nation–Ticketmaster unlawfully monopolizes ticketing and promotion.",
        "Exclusive venue and amphitheater deals exclude rivals like SeatGeek.",
        "Artists and fans pay higher fees and face worse service than competitive markets would provide.",
      ],
      theOtherSide: [
        "Live Nation says it invests in venues and artists and competes with many entertainment options.",
        "It argues ticketing technology and fraud prevention require scale.",
        "The company denies monopolization and will contest the 2024 case vigorously.",
      ],
      whatItMeansForYou: [
        "Ticket fees and availability may eventually change if government wins new remedies—uncertain today.",
        "Past merger approval does not shield companies from later conduct challenges.",
        "Follow the 2024 case for possible divestitures or interoperability orders.",
      ],
      bottomLine:
        "Ticketmaster–Live Nation shows merger remedies can face second-chance enforcement—2024 litigation may be the biggest live-events antitrust fight in a generation, but it is not decided.",
    },
  },
  {
    id: "ohio-v-amex",
    name: "Ohio v. American Express Co.",
    shortName: "Ohio v. Amex",
    companies: ["amex"],
    jurisdictions: ["US"],
    conduct: ["vertical_restraint", "price_fix", "discrimination"],
    yearStart: 2010,
    yearEnd: 2018,
    status: "won_by_defendant",
    summary:
      "The US Supreme Court held American Express's anti-steering rules in merchant agreements did not violate Sherman Act Section 1 because plaintiffs failed to prove anticompetitive effects in the relevant two-sided transaction platform market.",
    regulatorArgument:
      "States argued Amex blocked merchants from steering customers to lower-cost cards, suppressing price competition among payment networks.",
    outcome:
      "5–4 Supreme Court decision for Amex (2018); vertical anti-steering rules lawful under challenged two-sided market theory.",
    laws: ["sherman-1"],
    markets: ["credit card network services", "merchant acquiring"],
    sources: [
      {
        label: "Supreme Court opinion (Ohio v. Amex)",
        url: "https://www.supremecourt.gov/opinions/17pdf/16-1454_5h26.pdf",
      },
      {
        label: "DOJ original Amex case",
        url: "https://www.justice.gov/atr/case/united-states-v-american-express-co",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "DOJ and states filed suit", date: "October 2010" },
      { label: "Second Circuit reversed liability", date: "2016" },
      { label: "Supreme Court affirmed for Amex", date: "June 25, 2018" },
    ],
    timeline: [
      {
        date: "2010",
        title: "Anti-steering challenge filed",
        detail:
          "Government sued Amex, Visa, and Mastercard merchant rules; Visa and Mastercard settled.",
      },
      {
        date: "2015–2016",
        title: "Trial and appellate split",
        detail:
          "District court found Amex rules anticompetitive; Second Circuit said both merchant and cardholder sides must be analyzed together.",
      },
      {
        date: "2018",
        title: "Supreme Court victory for Amex",
        detail:
          "The Court credited Amex's pro-competitive benefits for cardholders on a two-sided platform.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "American Express told merchants they could not suggest customers use cheaper Visa or Mastercard at checkout. Ohio and other states said that hurt competition. The Supreme Court sided with Amex in a close 5–4 vote, reasoning credit cards are a 'two-sided market' serving both shoppers and stores—and the states had not proved harm overall. The decision makes it harder to challenge similar steering rules in the US.",
      theStory: [
        "Payment networks set rules for millions of merchants. Anti-steering clauses ban subtle nudges like 'use debit to save us money.'",
        "Visa and Mastercard settled with the DOJ and changed rules; Amex fought on.",
        "Courts debated whether to look only at merchant harms or also cardholder rewards and brand value.",
        "Justice Thomas's majority opinion said plaintiffs must show net harm across the platform—a high bar that shielded Amex's business model.",
      ],
      whyItMatters: [
        "Two-sided market theory affects tech platforms, not just credit cards.",
        "Merchants lost a tool to push back on swipe fees through customer steering.",
        "Contrasts with EU and DOJ wins against Visa/Mastercard restraints on different records.",
      ],
      whatWasClaimed: [
        "Amex anti-steering agreements were unreasonable restraints of trade.",
        "Merchants could not reduce acceptance costs by steering to lower-fee networks.",
        "Network market power made vertical restraints harmful.",
      ],
      theOtherSide: [
        "Amex argued its model funds premium rewards and fraud protection for cardholders.",
        "It said steering bans preserve brand consistency and investment in cardholder benefits.",
        "Amex maintained merchants voluntarily accept its cards for valuable customers.",
      ],
      whatItMeansForYou: [
        "Stores still rarely encourage you to pick a cheaper card at Amex-heavy merchants.",
        "Rewards cards remain subsidized partly by merchant fees upheld here.",
        "Later cases distinguish platform markets carefully after Amex precedent.",
      ],
      bottomLine:
        "Ohio v. Amex is the leading US Supreme Court case blessing certain anti-steering rules when enforcers cannot prove net harm on a two-sided platform.",
    },
  },
  {
    id: "eu-meta-marketplace",
    name: "Facebook Marketplace (EU)",
    shortName: "EU Meta Marketplace",
    companies: ["meta"],
    jurisdictions: ["EU"],
    conduct: ["self_preferencing", "abuse_of_dominance", "data_lockin"],
    yearStart: 2019,
    status: "ongoing",
    summary:
      "The European Commission investigates whether Meta tied its online classified ads service Facebook Marketplace to the social network, using data and default placement to disadvantage standalone classifieds rivals like eBay Kleinanzeigen.",
    regulatorArgument:
      "Meta allegedly leveraged personal social network dominance to boost Marketplace visibility and used data advantages unavailable to independent classifieds platforms.",
    outcome:
      "Formal proceedings ongoing; Statement of Objections reported in 2023–2024; no final decision yet.",
    laws: ["tfeu-102", "dma"],
    markets: ["online classified advertising", "social networking"],
    sources: [
      {
        label: "EC Facebook Marketplace investigation",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_21_4321",
      },
      {
        label: "EC Meta DMA designation",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_23_4458",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Commission opened formal probe", date: "June 2021" },
      { label: "Statement of Objections (reported)", date: "2023" },
      { label: "DMA gatekeeper duties apply", date: "2024" },
    ],
    timeline: [
      {
        date: "2016–2019",
        title: "Marketplace launches in Europe",
        detail:
          "Facebook added buy/sell features inside its app, reaching users who already logged in daily.",
      },
      {
        date: "2021",
        title: "EU antitrust investigation",
        detail:
          "Classifieds rivals complained Meta copied their model with unbeatable distribution.",
      },
      {
        date: "Ongoing",
        title: "Charges and DMA overlap",
        detail:
          "Abuse-of-dominance case proceeds alongside Meta's gatekeeper obligations on interoperability and self-preferencing.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Facebook added a buy-and-sell tab called Marketplace inside the app billions already use. Standalone classifieds sites say Meta unfairly pushed Marketplace using social network data and default placement. Europe is investigating whether that abused Meta's dominance. The case is not finished—allegations remain contested.",
      theStory: [
        "Local classifieds—used furniture, bikes, apartments—moved online through sites like Craigslist and regional players.",
        "Meta embedded Marketplace into Facebook and Instagram feeds, giving instant audience without a separate app download.",
        "Competitors allege Meta used login data and social graph information rivals cannot match, while promoting Marketplace prominently.",
        "The Commission's probe tests whether bundling a new service into a dominant social app is illegal self-preferencing—a live question without final penalties yet.",
      ],
      whyItMatters: [
        "Platforms can enter adjacent markets faster than standalone startups can defend share.",
        "Self-preferencing theory extends beyond search ads to classifieds and local commerce.",
        "DMA may impose parallel duties even as the antitrust case continues.",
      ],
      whatWasClaimed: [
        "Meta dominates personal social networks in Europe.",
        "Marketplace benefits from unlawful tying and data advantages.",
        "Independent classifieds cannot compete on equal terms.",
      ],
      theOtherSide: [
        "Meta says Marketplace helps users and small sellers reach local buyers safely.",
        "It argues classifieds compete with many channels including dedicated apps.",
        "Meta maintains it complies with evolving EU digital rules.",
      ],
      whatItMeansForYou: [
        "You may see Marketplace listings mixed with friends' posts in Meta apps.",
        "Competition among local selling platforms affects fees and safety features.",
        "Final EU findings could change how Meta promotes its own services.",
      ],
      bottomLine:
        "EU Meta Marketplace is an active self-preferencing probe—important for local online selling, but outcomes and remedies remain unsettled.",
    },
  },
  {
    id: "eu-google-adsense",
    name: "Google AdSense (EU)",
    shortName: "Google AdSense (EU)",
    companies: ["google"],
    jurisdictions: ["EU"],
    conduct: ["exclusivity", "abuse_of_dominance", "vertical_restraint"],
    yearStart: 2016,
    yearEnd: 2019,
    status: "fined",
    summary:
      "The European Commission fined Google for abusing dominance in online search advertising intermediation through AdSense contracts that restricted publishers from placing rival search ads on their sites.",
    regulatorArgument:
      "Exclusive and restrictive clauses in AdSense for Search agreements prevented publishers from using competing ad services, protecting Google's search ad intermediation monopoly.",
    outcome:
      "€1.49 billion fine in 2019; Google required to remove restrictive clauses from publisher contracts.",
    remedies:
      "Stop imposing exclusive or restrictive AdSense placement clauses; contract revisions for publishers.",
    laws: ["tfeu-102"],
    markets: ["search advertising intermediation", "publisher ad services"],
    sources: [
      {
        label: "EC AdSense decision press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_19_1350",
      },
      {
        label: "EC Google AdSense case page",
        url: "https://competition-policy.ec.europa.eu/antitrust/cases/decisions/40411_en",
      },
    ],
    readingMinutes: 7,
    keyDates: [
      { label: "Statement of Objections", date: "July 2016" },
      { label: "Infringement decision and fine", date: "March 20, 2019" },
      { label: "Contract remedy compliance", date: "2019" },
    ],
    timeline: [
      {
        date: "2006–2016",
        title: "AdSense exclusivity clauses",
        detail:
          "Google's contracts with websites allegedly blocked rival search ad boxes on the same pages.",
      },
      {
        date: "2019",
        title: "Third major EU Google fine",
        detail:
          "Commission penalized AdSense restrictions alongside separate Shopping and Android cases.",
      },
      {
        date: "Post-2019",
        title: "Publisher contract updates",
        detail:
          "Google modified terms; broader ad-tech probe later examined other parts of the ad stack.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Many websites show Google search ads through a program called AdSense. Europe said Google used contract fine print to stop those sites from also running ads from Google's rivals. That kept Google dominant in brokering search ads for publishers. Google paid a €1.49 billion fine and changed its contracts.",
      theStory: [
        "Publishers with search boxes on their sites—think site-specific search—often used AdSense to monetize queries.",
        "The Commission found Google inserted exclusivity and restrictive clauses preventing publishers from accepting competing search ad services.",
        "Unlike the Shopping case about result placement, AdSense focused on B2B contract terms between Google and website owners.",
        "The 2019 fine was part of a trilogy of EU Google decisions that defined abuse of dominance in search-related markets.",
      ],
      whyItMatters: [
        "Vertical contract restrictions can violate antitrust law even without visible consumer price effects.",
        "Publishers—not just shoppers—can be victims of platform dominance.",
        "AdSense case complements ongoing broader ad-tech investigations.",
      ],
      whatWasClaimed: [
        "Google dominated search ad intermediation for publishers.",
        "Exclusive clauses illegally maintained that dominance.",
        "Publishers lost revenue opportunities from rival ad services.",
      ],
      theOtherSide: [
        "Google said clauses protected ad quality and user experience.",
        "It argued publishers could choose among many monetization options overall.",
        "Google updated contracts before and after the decision.",
      ],
      whatItMeansForYou: [
        "Website owners may have more freedom to mix ad providers on search units.",
        "Indirect effect on content funding for sites you visit.",
        "Part of Europe's multi-front Google enforcement strategy.",
      ],
      bottomLine:
        "EU AdSense enforcement targeted hidden publisher contract restrictions—a clear fine-and-remedy win against Google's search ad brokerage power.",
    },
  },
  {
    id: "eu-intel-rebates",
    name: "Intel x86 CPU rebates (EU)",
    shortName: "Intel rebates (EU)",
    companies: ["intel"],
    jurisdictions: ["EU"],
    conduct: ["exclusivity", "predatory_pricing", "abuse_of_dominance"],
    yearStart: 2000,
    yearEnd: 2009,
    status: "fined",
    summary:
      "The European Commission fined Intel for abusing dominance in x86 CPUs by granting exclusivity-inducing rebates and payments to computer makers that conditioned favorable pricing on limiting or avoiding AMD chips.",
    regulatorArgument:
      "Conditional rebates and naked restrictions foreclosed Intel's only significant rival from achieving scale with OEMs like Dell and Lenovo.",
    outcome:
      "€1.06 billion fine in 2009; General Court annulled in 2022 on procedural/incentive analysis grounds; Commission may revisit.",
    remedies:
      "Original decision required cessation of exclusivity rebates; annulment reopened legal debate on rebate analysis under Article 102.",
    laws: ["tfeu-102"],
    markets: ["x86 central processing units", "PC and server microprocessors"],
    sources: [
      {
        label: "EC Intel decision press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_09_745",
      },
      {
        label: "General Court annulment",
        url: "https://curia.europa.eu/jcms/upload/docs/application/pdf/2022-01/cp220012en.pdf",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Raids and investigation", date: "2005" },
      { label: "Infringement decision and fine", date: "May 13, 2009" },
      { label: "General Court annulled decision", date: "January 2022" },
    ],
    timeline: [
      {
        date: "2000s",
        title: "AMD competes on performance",
        detail:
          "AMD won design wins when PC makers could freely adopt its Opteron and Athlon chips.",
      },
      {
        date: "2009",
        title: "Record EU abuse fine",
        detail:
          "Commission said Intel paid manufacturers to delay or limit AMD-based products.",
      },
      {
        date: "2022",
        title: "Court overturns fine",
        detail:
          "EU General Court faulted economic analysis, annulling the decision though facts of rebates remained controversial.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Intel dominated PC chips for years. Europe fined it over a billion euros for rebate deals that allegedly paid computer makers to favor Intel and sideline rival AMD. Intel appealed for more than a decade. In 2022 an EU court threw out the fine, saying regulators did not prove the rebates harmed competition convincingly enough—showing even big fines can unravel on appeal.",
      theStory: [
        "CPU competition affects every laptop and server. AMD's early-2000s innovations threatened Intel's share if OEMs adopted them broadly.",
        "The Commission documented payments and rebates tied to purchasing targets that allegedly made using AMD commercially risky for PC makers.",
        "Intel also faced a separate US FTC settlement on similar themes, though US outcomes differed.",
        "The 2022 annulment did not declare rebates pro-competitive—it criticized the Commission's proof—keeping rebate law contested in Europe.",
      ],
      whyItMatters: [
        "Rebate cases turn on economic evidence, not just big market shares.",
        "OEM exclusivity shapes which chip architectures reach consumers.",
        "Long appeals can erase headline fines years later.",
      ],
      whatWasClaimed: [
        "Intel dominated x86 CPU markets.",
        "Conditional rebates and payments were exclusionary, not normal volume discounts.",
        "AMD was foreclosed from competing for OEM slots.",
      ],
      theOtherSide: [
        "Intel said rebates reflected legitimate volume pricing benefiting consumers.",
        "It argued AMD gained share during the investigated period anyway.",
        "Intel welcomed the annulment as vindication of its pricing practices.",
      ],
      whatItMeansForYou: [
        "PC performance and pricing depend on healthy CPU rivalry—AMD vs Intel remains important.",
        "EU enforcement can fail on appeal even after billion-euro fines.",
        "Businesses offering loyalty discounts study Intel for legal risk in Europe.",
      ],
      bottomLine:
        "Intel's EU rebate saga delivered a massive fine then a stunning annulment—highlighting how dominance pricing cases can flip after years of litigation.",
    },
  },
  {
    id: "eu-qualcomm",
    name: "Qualcomm baseband chipsets (EU)",
    shortName: "Qualcomm (EU chips)",
    companies: ["qualcomm"],
    jurisdictions: ["EU"],
    conduct: ["predatory_pricing", "exclusivity", "abuse_of_dominance"],
    yearStart: 2015,
    yearEnd: 2018,
    status: "fined",
    summary:
      "The European Commission fined Qualcomm for predatory pricing of UMTS baseband chipsets paid to Huawei and ZTE to eliminate Icera, a rival chipset supplier.",
    regulatorArgument:
      "Below-cost pricing targeted a specific competitor to protect Qualcomm's dominance in 3G baseband chips, contrary to Article 102 TFEU.",
    outcome:
      "€997 million fine in 2018; General Court annulled in 2022 for procedural errors; Commission considering next steps.",
    remedies:
      "Original decision required cessation of predatory pricing strategy; annulment vacated fine pending potential re-adoption.",
    laws: ["tfeu-102"],
    markets: ["UMTS baseband chipsets", "mobile device semiconductors"],
    sources: [
      {
        label: "EC Qualcomm predatory pricing decision",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_18_765",
      },
      {
        label: "General Court annulment summary",
        url: "https://curia.europa.eu/jcms/upload/docs/application/pdf/2022-06/cp220060en.pdf",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Statement of Objections", date: "December 2015" },
      { label: "Fine imposed", date: "January 24, 2018" },
      { label: "General Court annulled", date: "June 2022" },
    ],
    timeline: [
      {
        date: "2010s",
        title: "Icera rivalry in 3G chips",
        detail:
          "UK-based Icera competed with Qualcomm in baseband processors until exiting the market.",
      },
      {
        date: "2018",
        title: "EU predatory pricing fine",
        detail:
          "Commission said Qualcomm sold chips below cost to two large customers to knock out Icera.",
      },
      {
        date: "2022",
        title: "Fine annulled on procedure",
        detail:
          "Courts voided the decision for inadequate hearing on certain evidence, not necessarily rejecting predatory pricing theory.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Qualcomm makes chips that connect phones to cell networks. Europe fined it nearly €1 billion for selling chips below cost to two big customers to crush a smaller rival called Icera. Unlike the US FTC case Qualcomm won, Europe went after predatory pricing. But in 2022 an EU court canceled the fine over procedural mistakes—another reminder that antitrust wins can be reversed.",
      theStory: [
        "Baseband chips are essential modems inside smartphones. Qualcomm held strong share in 3G-era chipsets.",
        "Icera offered alternative designs; regulators claimed Qualcomm targeted it with artificially low prices to major OEMs.",
        "Predatory pricing cases require proving below-cost sales and ability to recoup losses later—a high bar the Commission thought it met.",
        "Appeals focused on whether Qualcomm received a fair chance to review evidence, leading to annulment without clearing all conduct questions.",
      ],
      whyItMatters: [
        "Chip competition affects device costs and innovation in mobile networks.",
        "Contrasts with US Qualcomm outcome—jurisdiction matters enormously.",
        "Procedural rigor can defeat substantive enforcement even in high-profile cases.",
      ],
      whatWasClaimed: [
        "Qualcomm dominated UMTS baseband chipsets.",
        "Below-cost sales to Huawei and ZTE excluded Icera anti-competitively.",
        "Qualcomm could recoup losses after eliminating the rival.",
      ],
      theOtherSide: [
        "Qualcomm denied selling below cost and said competition remained vigorous.",
        "It argued Icera failed for business reasons unrelated to pricing.",
        "Qualcomm challenged both EU chip and separate EU patent royalty cases.",
      ],
      whatItMeansForYou: [
        "Modem chip rivalry influences phone features and prices over time.",
        "EU and US enforcers can reach opposite conclusions on the same company.",
        "Annulment does not automatically legalize contested pricing—watch for refiling.",
      ],
      bottomLine:
        "EU Qualcomm chip enforcement mirrored US battles but used predatory pricing theory—yet the 2018 fine fell on procedural appeal, leaving the story legally unsettled.",
    },
  },
  {
    id: "jetblue-spirit",
    name: "JetBlue / Spirit merger (blocked)",
    shortName: "JetBlue–Spirit",
    companies: ["jetblue", "spirit"],
    jurisdictions: ["US"],
    conduct: ["merger"],
    yearStart: 2022,
    yearEnd: 2024,
    status: "dismissed",
    summary:
      "JetBlue agreed to acquire ultra-low-cost carrier Spirit Airlines, but a federal court sided with the DOJ and blocked the merger as likely to raise fares by removing Spirit's disruptive pricing model.",
    regulatorArgument:
      "Eliminating Spirit—the largest ULCC—would reduce head-to-head competition on numerous routes and weaken JetBlue's ability to discipline legacy carriers.",
    outcome:
      "District court enjoined merger in January 2024; companies abandoned the deal; Spirit later pursued bankruptcy/restructuring.",
    laws: ["clayton-7", "hart-scott"],
    markets: ["domestic passenger air travel", "ultra-low-cost carriers"],
    sources: [
      {
        label: "DOJ JetBlue/Spirit challenge",
        url: "https://www.justice.gov/opa/pr/justice-department-sues-block-jetblues-proposed-acquisition-spirit-airlines",
      },
      {
        label: "Court opinion blocking merger",
        url: "https://www.courtlistener.com/docket/67845678/united-states-v-jetblue-airways-corp/",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Merger agreement announced", date: "July 2022" },
      { label: "DOJ sued to block", date: "March 2023" },
      { label: "Court blocked merger", date: "January 16, 2024" },
    ],
    timeline: [
      {
        date: "2022",
        title: "ULCC merger proposed",
        detail:
          "JetBlue sought Spirit to scale against Big Four legacy airlines after failed Northeast Alliance with American.",
      },
      {
        date: "2023",
        title: "DOJ litigation",
        detail:
          "Enforcers argued Spirit's bare-bones fares uniquely pressure rivals on overlapping city pairs.",
      },
      {
        date: "2024",
        title: "Deal terminated",
        detail:
          "After injunction, JetBlue paid breakup fee; Spirit faced severe financial distress separately.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Spirit Airlines sells some of the cheapest US plane tickets by charging extra for almost everything else. JetBlue tried to buy Spirit to get bigger. The government sued, saying losing Spirit as an independent discounter would mean higher fares. A judge agreed and stopped the merger. JetBlue walked away—one of the Biden-era DOJ's visible airline merger wins.",
      theStory: [
        "US airline consolidation left four major legacy carriers dominating many hubs. Ultra-low-cost carriers like Spirit and Frontier provide a different, no-frills option.",
        "JetBlue positioned the deal as creating a stronger fifth national competitor, but DOJ said the relevant competition was Spirit-vs-JetBlue and Spirit-vs-legacies on specific routes.",
        "Trial evidence included internal documents about fare effects if Spirit disappeared as a maverick price cutter.",
        "The court's injunction led to deal termination; Spirit's later bankruptcy highlighted how fragile ULCC models can be even after antitrust wins.",
      ],
      whyItMatters: [
        "Airfare antitrust directly affects family travel budgets.",
        "Shows enforcers prioritizing elimination of disruptive low-price competitors.",
        "Merger block did not guarantee Spirit's long-term survival as an independent firm.",
      ],
      whatWasClaimed: [
        "Merger would substantially lessen competition on dozens of routes.",
        "Spirit's removal would raise fares and reduce seat capacity growth.",
        "JetBlue's efficiency claims did not offset lost head-to-head rivalry.",
      ],
      theOtherSide: [
        "JetBlue said combined scale was needed to compete with Delta, United, American, and Southwest.",
        "It offered divestitures of Spirit assets at some airports.",
        "JetBlue argued customers would benefit from a larger hybrid network carrier.",
      ],
      whatItMeansForYou: [
        "Fare competition on routes where Spirit operated may depend on whether ULCC capacity returns via other carriers.",
        "Blocked mergers can still leave acquired firms in financial trouble—antitrust is not industrial policy.",
        "Watch Frontier and other discounters for market gaps Spirit leaves.",
      ],
      bottomLine:
        "JetBlue–Spirit is a recent US example of blocking airline consolidation to preserve a low-fare maverick—though Spirit's later troubles show limits of merger enforcement alone.",
    },
  },
  {
    id: "cma-msft-activision",
    name: "Microsoft / Activision (CMA UK strand)",
    shortName: "CMA Activision block",
    companies: ["microsoft"],
    jurisdictions: ["Other"],
    conduct: ["merger", "refusal_to_deal"],
    yearStart: 2022,
    yearEnd: 2023,
    status: "remedy",
    summary:
      "The UK Competition and Markets Authority initially blocked Microsoft's Activision acquisition over cloud gaming foreclosure concerns, then cleared a restructured deal after Microsoft agreed to license Activision content to rival cloud providers.",
    regulatorArgument:
      "Combining Activision games with Xbox Cloud Gaming and Windows could make Microsoft the gatekeeper of cloud gaming, foreclosing independent cloud platforms.",
    outcome:
      "April 2023 prohibition decision; October 2023 clearance after cloud content licensing undertakings; deal completed globally.",
    remedies:
      "Automatic licensing of Activision games to cloud gaming services worldwide for 15 years; other behavioral undertakings.",
    laws: ["clayton-7"],
    markets: ["cloud gaming services", "AAA game content licensing"],
    sources: [
      {
        label: "CMA final report blocking (April 2023)",
        url: "https://www.gov.uk/cma-cases/microsoft-slash-activision-blizzard-merger-inquiry",
      },
      {
        label: "CMA clearance after restructure",
        url: "https://www.gov.uk/government/news/cma-approves-microsoft-slash-activision-deal-after-cloud-gaming-undertakings",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "CMA referred to Phase 2", date: "September 2022" },
      { label: "CMA blocked merger", date: "April 26, 2023" },
      { label: "CMA cleared restructured deal", date: "October 13, 2023" },
    ],
    timeline: [
      {
        date: "2022–2023",
        title: "UK focuses on cloud, not consoles",
        detail:
          "Unlike Sony's PlayStation fears, the CMA emphasized nascent cloud gaming as the competitive bottleneck.",
      },
      {
        date: "April 2023",
        title: "Shock prohibition",
        detail:
          "Microsoft appeared blocked in the UK even as other jurisdictions moved toward approval.",
      },
      {
        date: "October 2023",
        title: "Remedy unlocks deal",
        detail:
          "Microsoft offered global cloud licensing commitments satisfying the CMA; merger proceeded.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "When Microsoft bought Activision, most attention was on PlayStation vs Xbox. Britain's antitrust agency cared more about cloud gaming—playing high-end games streamed over the internet. It first blocked the deal, fearing Microsoft would hoard Activision hits on its own cloud service. Microsoft then promised to license those games to other cloud platforms for 15 years, and the UK approved. It is a short case study in remedy-driven clearance.",
      theStory: [
        "Cloud gaming is smaller than console gaming but growing via Game Pass, GeForce Now, and others.",
        "The CMA ran a deep Phase 2 review and concluded Microsoft's control of Activision content could foreclose independent cloud platforms.",
        "Initial prohibition stunned industry observers because the US and EU seemed closer to yes with conditions.",
        "Microsoft re-cut the deal with undertakings to supply Activision games to rival cloud services automatically, converting a block into a conditioned approval.",
      ],
      whyItMatters: [
        "One jurisdiction's theory can dictate global merger remedies.",
        "Nascent market foreclosure arguments succeeded temporarily in the UK.",
        "Licensing remedies preserved multi-platform cloud access for popular franchises.",
      ],
      whatWasClaimed: [
        "Merger would lessen competition in UK cloud gaming.",
        "Microsoft could withhold Call of Duty and other titles from rival cloud hosts.",
        "Behavioral console promises were insufficient for cloud concerns.",
      ],
      theOtherSide: [
        "Microsoft said cloud was competitive with many entrants and devices.",
        "It argued the CMA overestimated Microsoft's cloud market power.",
        "Microsoft restructured rather than abandon the global deal.",
      ],
      whatItMeansForYou: [
        "Cloud gaming services may offer Activision titles due to UK-mandated licensing.",
        "UK enforcers can force worldwide behavioral fixes in global mergers.",
        "Console players saw separate negotiations on PlayStation releases.",
      ],
      bottomLine:
        "The CMA's Activision strand blocked then cleared Microsoft's deal via cloud licensing—a focused UK chapter distinct from the broader global merger fight.",
    },
  },
  {
    id: "dma-gatekeeper-compliance",
    name: "DMA gatekeeper compliance (Apple / Google)",
    shortName: "DMA compliance (Apple/Google)",
    companies: ["apple", "google"],
    jurisdictions: ["EU"],
    conduct: ["self_preferencing", "interoperability", "market_access", "data_lockin"],
    yearStart: 2024,
    status: "ongoing",
    summary:
      "EU Digital Markets Act gatekeeper duties require Apple and Google to open interoperability, choice screens, sideloading, and fair access; Commission opened non-compliance investigations in 2024 over alleged friction and fees undermining DMA goals.",
    regulatorArgument:
      "Designated gatekeepers must not circumvent DMA obligations through confusing flows, continuing self-preferencing, or new fees that deter alternative app stores and default services.",
    outcome:
      "Investigations ongoing; potential fines up to 10% of global turnover; no final non-compliance decisions yet as of typical reporting.",
    remedies:
      "If violations found: orders to effective compliance, periodic penalties, possible structural remedies under DMA framework.",
    laws: ["dma", "tfeu-102"],
    markets: ["mobile operating systems", "app distribution", "general search", "messaging interoperability"],
    sources: [
      {
        label: "EC DMA gatekeeper designations",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_23_4458",
      },
      {
        label: "EC Apple DMA non-compliance investigation",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_24_1682",
      },
    ],
    readingMinutes: 9,
    keyDates: [
      { label: "Gatekeepers designated", date: "September 2023" },
      { label: "Core DMA obligations effective", date: "March 7, 2024" },
      { label: "Non-compliance investigations opened", date: "March–June 2024" },
    ],
    timeline: [
      {
        date: "2022–2023",
        title: "DMA becomes law",
        detail:
          "EU created ex ante rules for the largest platforms, beyond traditional case-by-case antitrust.",
      },
      {
        date: "March 2024",
        title: "Compliance day",
        detail:
          "Apple published alternative app store rules in EU; Google adjusted search and Android choice screens.",
      },
      {
        date: "2024–ongoing",
        title: "Skepticism and probes",
        detail:
          "Developers criticized fees and scary warning screens; Commission opened investigations into Apple and Google compliance.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Europe's Digital Markets Act tells the biggest tech platforms—gatekeepers like Apple and Google—what they must do up front: choice screens, alternative app stores, fair messaging links, and more. Early compliance updates drew complaints that new fees and scary pop-ups discourage real competition. EU regulators opened investigations, but no final penalties have been decided—this is an ongoing regulatory story, not a finished court case.",
      theStory: [
        "Traditional antitrust cases take years. The DMA imposes duties on designated gatekeepers before a full abuse trial.",
        "Apple enabled alternative app marketplaces and link-outs in the EU while charging core technology fees critics call anticompetitive.",
        "Google adjusted default search and browser choice on Android; rivals said some flows still favor Google services.",
        "The Commission's non-compliance probes will test whether DMA delivers practical choice or paper compliance—outcomes remain open.",
      ],
      whyItMatters: [
        "Ex ante regulation may change phones faster than lawsuits—but only if enforcement bites.",
        "Developers and small businesses gain new rights on paper; real economics depend on fee levels and UX friction.",
        "US and other regions watch EU DMA experiments for their own digital competition bills.",
      ],
      whatWasClaimed: [
        "Apple's EU app distribution changes do not meet DMA effective access requirements.",
        "Google's choice architecture may still self-preference search and Play services.",
        "Gatekeepers must not use new charges to neutralize DMA benefits.",
      ],
      theOtherSide: [
        "Apple says its EU changes comply while protecting user security.",
        "Google argues it implemented choice screens and billing options in good faith.",
        "Both companies warn heavy-handed fixes could harm European users and developers.",
      ],
      whatItMeansForYou: [
        "EU iPhone and Android users may see more setup choices—quality varies by update.",
        "App developers might pay new platform fees even when avoiding the main store.",
        "Final Commission decisions could reshape mobile software economics—watch ongoing probes.",
      ],
      bottomLine:
        "DMA Apple/Google compliance is live EU regulation under investigation—promising more platform openness, but with contested implementation and no final non-compliance rulings yet.",
    },
  },
  {
    id: "boeing-mcdonnell-douglas",
    name: "FTC review of Boeing / McDonnell Douglas",
    shortName: "Boeing–McDonnell Douglas",
    companies: ["boeing"],
    jurisdictions: ["US"],
    conduct: ["merger"],
    yearStart: 1996,
    yearEnd: 1997,
    status: "remedy",
    summary:
      "The FTC allowed Boeing's acquisition of McDonnell Douglas after the companies agreed to behavioral remedies, including firewalling McDonnell Douglas commercial data and limited asset divestitures, amid concerns about duopoly in large commercial jets.",
    regulatorArgument:
      "Merger reduced global large jet manufacturers to two major players; McDonnell Douglas's declining commercial unit still held valuable customer relationships and data Boeing could exploit anti-competitively.",
    outcome:
      "Deal cleared with consent order requiring firewalls, reporting, and non-discrimination commitments; created Boeing–Airbus duopoly structure enduring today.",
    remedies:
      "Firewalls on McDonnell Douglas commercial information; mandatory reporting; limited divestitures of assets.",
    laws: ["clayton-7", "hart-scott"],
    markets: ["large commercial aircraft", "military aerospace"],
    sources: [
      {
        label: "FTC Boeing/McDonnell Douglas consent",
        url: "https://www.ftc.gov/news-events/news/press-releases/1997/07/ftc-approves-boeing-mcdonnell-douglas-merger-settlement",
      },
      {
        label: "FTC analysis advisory",
        url: "https://www.ftc.gov/system/files/documents/public_statements/735411/boeing_mcdonnell_douglas_analysis.pdf",
      },
    ],
    readingMinutes: 7,
    keyDates: [
      { label: "Merger announced", date: "December 1996" },
      { label: "FTC consent order", date: "July 1997" },
      { label: "Merger completed", date: "August 1997" },
    ],
    timeline: [
      {
        date: "1990s",
        title: "Consolidation in aerospace",
        detail:
          "McDonnell Douglas's commercial jet line faded, but the company remained a defense giant.",
      },
      {
        date: "1997",
        title: "FTC conditional approval",
        detail:
          "US and EU cleared the deal with remedies focusing on commercial data and military overlap.",
      },
      {
        date: "Long term",
        title: "Duopoly with Airbus",
        detail:
          "The merger solidified a Boeing–Airbus two-firm market for large passenger jets.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "In 1997 Boeing bought McDonnell Douglas, combining America's two historic jet makers. Regulators worried the world would end up with only Boeing and Airbus building big passenger planes. The US FTC approved the deal but made Boeing promise firewalls so it would not misuse McDonnell Douglas customer data to hurt competition. The merger went through—creating the duopoly we still see in large airliners.",
      theStory: [
        "McDonnell Douglas once competed with Boeing on MD-80 and MD-11 jets, but orders collapsed by the 1990s.",
        "Boeing sought the merger for defense business and manufacturing consolidation as much as commercial rivalry elimination.",
        "Antitrust agencies globally focused on whether Boeing would gain unfair insight into airlines' Airbus purchases via McDonnell Douglas records.",
        "Behavioral remedies cleared the path; critics later argued the merger still reduced potential future competition in an already concentrated industry.",
      ],
      whyItMatters: [
        "Airline manufacturing concentration affects ticket prices indirectly through plane supply and innovation.",
        "Shows regulators approving '2-to-1.5' style mergers with behavioral fixes instead of blocks.",
        "Historical contrast to blocked or challenged airline mergers in passenger service markets.",
      ],
      whatWasClaimed: [
        "Merger could lessen competition in commercial aircraft markets.",
        "Combined customer data might facilitate anticompetitive pricing or product strategies.",
        "Military overlaps required oversight separately from commercial jets.",
      ],
      theOtherSide: [
        "Boeing said McDonnell Douglas was exiting commercial jets anyway.",
        "Efficiencies in production and R&D would benefit airlines and the Pentagon.",
        "Global competition from Airbus remained vigorous.",
      ],
      whatItMeansForYou: [
        "When you fly, your plane is likely Boeing or Airbus partly because of 1990s consolidation.",
        "Behavioral remedies tried to preserve competition without stopping the deal.",
        "Later Boeing crises (737 MAX) renewed debate on industrial concentration—not antitrust reversals.",
      ],
      bottomLine:
        "Boeing–McDonnell Douglas cleared with firewalls, cementing a global jet duopoly—a landmark conditional airline manufacturing merger from the 1990s.",
    },
  },
];
