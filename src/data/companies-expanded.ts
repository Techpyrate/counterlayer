import type { CompanyProfile, ConductTag } from "./types";

export const expandedCompanies: CompanyProfile[] = [
  {
    id: "google",
    name: "Google (Alphabet)",
    aliases: ["alphabet", "youtube", "android", "chrome"],
    markets: ["general search", "digital ads", "mobile OS", "app distribution", "cloud"],
    caseIds: [
      "eu-google-shopping",
      "eu-google-android",
      "us-v-google-search",
      "eu-google-adsense",
      "live-doj-google-adtech",
      "dma-gatekeeper-compliance",
    ],
    conductThemes: ["self_preferencing", "exclusivity", "tying", "abuse_of_dominance"],
    blurb:
      "Dominant in search, mobile, and ad tech; recurring EU and US scrutiny over defaults, self-preferencing, and vertical integration in advertising stacks.",
  },
  {
    id: "apple",
    name: "Apple",
    aliases: ["app store", "ios", "safari"],
    markets: ["smartphones", "app distribution", "mobile payments", "wearables"],
    caseIds: ["eu-apple-music", "epic-v-apple", "live-eu-apple-dma", "hist-us-apple-ebooks", "dma-gatekeeper-compliance"],
    conductThemes: ["tying", "platform_suspension", "self_preferencing", "refusal_to_deal"],
    blurb:
      "App Store rules, in-app payment commissions, and device ecosystem lock-in drive US litigation and EU Digital Markets Act compliance fights.",
  },
  {
    id: "amazon",
    name: "Amazon",
    aliases: ["aws", "prime", "whole foods"],
    markets: ["online marketplace", "e-commerce", "cloud", "logistics"],
    caseIds: ["us-amzn-prime", "eu-amazon-buybox"],
    conductThemes: ["self_preferencing", "discrimination", "abuse_of_dominance", "data_lockin"],
    blurb:
      "Marketplace seller treatment, Buy Box algorithms, and Prime bundling sit at the center of US and European abuse-of-dominance theories.",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    aliases: ["xbox", "linkedin", "azure", "activision blizzard"],
    markets: ["OS", "productivity software", "cloud", "gaming"],
    caseIds: ["us-v-microsoft", "msft-activision", "cma-msft-activision", "eu-microsoft-media-player"],
    conductThemes: ["tying", "exclusivity", "merger"],
    blurb:
      "From historic browser tying to cloud and gaming mergers, Microsoft remains a template for platform leverage and large-deal remedy design.",
  },
  {
    id: "meta",
    name: "Meta",
    aliases: ["facebook", "instagram", "whatsapp", "oculus"],
    markets: ["social networking", "digital advertising", "VR", "messaging"],
    caseIds: ["meta-within", "meta-whatsapp", "eu-meta-marketplace", "live-ftc-meta"],
    conductThemes: ["merger", "abuse_of_dominance", "data_lockin"],
    blurb:
      "Social-graph scale and acquisition strategy fuel ongoing US monopolization claims and EU marketplace/advertising investigations.",
  },
  {
    id: "visa",
    name: "Visa",
    aliases: [],
    markets: ["payment networks", "card processing"],
    caseIds: ["visa-mastercard"],
    conductThemes: ["vertical_restraint", "exclusivity"],
    blurb:
      "Network rules on merchant routing, surcharging, and acceptance have drawn decades of US and EU payment-competition litigation.",
  },
  {
    id: "mastercard",
    name: "Mastercard",
    aliases: [],
    markets: ["payment networks", "card processing"],
    caseIds: ["visa-mastercard"],
    conductThemes: ["vertical_restraint", "exclusivity"],
    blurb:
      "Often litigated alongside Visa over interchange, honor-all-cards rules, and constraints on merchant choice in card acceptance.",
  },
  {
    id: "american-express",
    name: "American Express",
    aliases: ["amex"],
    markets: ["payment networks", "charge cards"],
    caseIds: ["ohio-v-amex"],
    conductThemes: ["vertical_restraint"],
    blurb:
      "Anti-steering clauses and two-sided market economics produced a landmark US Supreme Court ruling on platform competition.",
  },
  {
    id: "paypal",
    name: "PayPal",
    aliases: ["venmo", "braintree"],
    markets: ["digital wallets", "online payments"],
    caseIds: [],
    conductThemes: ["tying", "platform_suspension", "data_lockin"],
    blurb:
      "Wallet and merchant-services bundling raise questions about account suspension, data portability, and checkout defaults.",
  },
  {
    id: "stripe",
    name: "Stripe",
    aliases: [],
    markets: ["payment processing", "fintech infrastructure"],
    caseIds: [],
    conductThemes: ["exclusivity", "refusal_to_deal"],
    blurb:
      "Embedded payments infrastructure for platforms invites scrutiny when routing, pricing, or access rules favor affiliated products.",
  },
  {
    id: "block",
    name: "Block (Square)",
    aliases: ["square", "cash app"],
    markets: ["payment processing", "POS", "consumer fintech"],
    caseIds: [],
    conductThemes: ["tying", "vertical_restraint"],
    blurb:
      "Hardware, software, and banking services bundled for merchants can resemble tying when switching costs are high.",
  },
  {
    id: "qualcomm",
    name: "Qualcomm",
    aliases: [],
    markets: ["modem chips", "SEP licensing", "mobile semiconductors"],
    caseIds: ["qualcomm-ftc", "eu-qualcomm"],
    conductThemes: ["exclusivity", "refusal_to_deal", "abuse_of_dominance"],
    blurb:
      "Chip supply plus patent licensing produced divergent US and EU outcomes on foreclosure and FRAND-adjacent conduct.",
  },
  {
    id: "intel",
    name: "Intel",
    aliases: [],
    markets: ["CPUs", "data-center chips"],
    caseIds: ["eu-intel-rebates"],
    conductThemes: ["exclusivity", "abuse_of_dominance", "predatory_pricing"],
    blurb:
      "Loyalty rebates to PC OEMs yielded a landmark EU abuse case whose legal analysis was later reworked on appeal.",
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    aliases: ["geforce", "cuda"],
    markets: ["GPUs", "AI accelerators", "data-center chips"],
    caseIds: ["nvidia-arm"],
    conductThemes: ["merger", "exclusivity"],
    blurb:
      "GPU dominance in AI training and the abandoned Arm acquisition highlight foreclosure fears in semiconductor ecosystems.",
  },
  {
    id: "amd",
    name: "AMD",
    aliases: ["advanced micro devices"],
    markets: ["CPUs", "GPUs", "data-center chips"],
    caseIds: [],
    conductThemes: ["exclusivity"],
    blurb:
      "Competes with Intel and NVIDIA in processors; past cross-licensing and exclusivity disputes shaped x86 market structure.",
  },
  {
    id: "broadcom",
    name: "Broadcom",
    aliases: ["vmware"],
    markets: ["networking chips", "enterprise software"],
    caseIds: [],
    conductThemes: ["merger", "exclusivity"],
    blurb:
      "Semiconductor and infrastructure software acquisitions trigger merger reviews over customer foreclosure and chip bundling.",
  },
  {
    id: "arm",
    name: "Arm",
    aliases: ["arm holdings"],
    markets: ["chip design IP", "mobile semiconductors"],
    caseIds: ["nvidia-arm"],
    conductThemes: ["merger", "refusal_to_deal"],
    blurb:
      "Neutral IP licensor to the mobile ecosystem; proposed NVIDIA takeover raised global concerns about access to core designs.",
  },
  {
    id: "tsmc",
    name: "TSMC",
    aliases: ["taiwan semiconductor"],
    markets: ["foundry", "advanced semiconductors"],
    caseIds: [],
    conductThemes: ["refusal_to_deal", "market_access"],
    blurb:
      "Leading contract foundry capacity allocation can affect downstream chip designers' ability to compete at the cutting edge.",
  },
  {
    id: "samsung",
    name: "Samsung",
    aliases: ["samsung electronics"],
    markets: ["smartphones", "memory chips", "displays"],
    caseIds: ["eu-qualcomm"],
    conductThemes: ["exclusivity", "abuse_of_dominance"],
    blurb:
      "Vertically integrated handset and component giant; EU cases have examined rebate and exclusivity programs in mobile chips.",
  },
  {
    id: "illumina",
    name: "Illumina",
    aliases: ["grail"],
    markets: ["gene sequencing", "diagnostics"],
    caseIds: ["illumina-grail"],
    conductThemes: ["merger", "refusal_to_deal"],
    blurb:
      "Vertical life-sciences merger with Grail became a landmark for foreclosure theories and structural remedy debates.",
  },
  {
    id: "grail",
    name: "Grail",
    aliases: [],
    markets: ["cancer diagnostics", "liquid biopsy"],
    caseIds: ["illumina-grail"],
    conductThemes: ["merger"],
    blurb:
      "Early cancer-detection startup whose acquisition by sequencing incumbent Illumina drew multi-jurisdiction merger challenges.",
  },
  {
    id: "att",
    name: "AT&T",
    aliases: ["at&t", "warnermedia legacy"],
    markets: ["telecom", "mobile wireless", "broadband"],
    caseIds: ["att-tmobile", "att-breakup"],
    conductThemes: ["merger"],
    blurb:
      "From the historic Ma Bell breakup to blocked T-Mobile merger attempts, AT&T anchors US telecom competition history.",
  },
  {
    id: "tmobile",
    name: "T-Mobile",
    aliases: ["t-mobile us"],
    markets: ["mobile wireless"],
    caseIds: ["att-tmobile", "hist-sprint-tmobile"],
    conductThemes: ["merger"],
    blurb:
      "Sprint merger approval and prior AT&T deal collapse illustrate how concentrated wireless markets are shaped by merger law.",
  },
  {
    id: "verizon",
    name: "Verizon",
    aliases: [],
    markets: ["mobile wireless", "broadband", "enterprise telecom"],
    caseIds: [],
    conductThemes: ["merger", "exclusivity"],
    blurb:
      "Major US carrier whose past acquisitions and device exclusivity deals recur in mobile market-concentration analysis.",
  },
  {
    id: "sprint",
    name: "Sprint",
    aliases: [],
    markets: ["mobile wireless"],
    caseIds: ["hist-sprint-tmobile"],
    conductThemes: ["merger"],
    blurb:
      "Former fourth national carrier whose T-Mobile merger reduced US wireless from four players to three.",
  },
  {
    id: "comcast",
    name: "Comcast",
    aliases: ["xfinity", "nbcuniversal"],
    markets: ["cable broadband", "media", "streaming"],
    caseIds: [],
    conductThemes: ["merger", "vertical_restraint", "tying"],
    blurb:
      "Vertical integration of broadband pipes and content raises recurring questions about prioritization and bundle leverage.",
  },
  {
    id: "charter",
    name: "Charter Communications",
    aliases: ["spectrum"],
    markets: ["cable broadband", "pay TV"],
    caseIds: [],
    conductThemes: ["merger"],
    blurb:
      "Large cable operator formed through consolidation; regional broadband concentration affects ISP choice for households.",
  },
  {
    id: "deutsche-telekom",
    name: "Deutsche Telekom",
    aliases: ["t-mobile europe"],
    markets: ["telecom", "mobile wireless"],
    caseIds: [],
    conductThemes: ["merger", "abuse_of_dominance"],
    blurb:
      "European telecom incumbent with cross-border mobile assets; EU merger control frequently reviews national market shares.",
  },
  {
    id: "vodafone",
    name: "Vodafone",
    aliases: [],
    markets: ["mobile wireless", "telecom"],
    caseIds: [],
    conductThemes: ["merger"],
    blurb:
      "Pan-European mobile operator whose in-market consolidation and roaming policies intersect with EU competition enforcement.",
  },
  {
    id: "american-airlines",
    name: "American Airlines",
    aliases: ["aa"],
    markets: ["passenger airlines"],
    caseIds: ["american-airlines-cartel"],
    conductThemes: ["cartel_coordination", "merger"],
    blurb:
      "Named in US cargo price-fixing prosecutions and active in alliance and merger dynamics that reshape route competition.",
  },
  {
    id: "delta",
    name: "Delta Air Lines",
    aliases: [],
    markets: ["passenger airlines"],
    caseIds: ["american-airlines-cartel"],
    conductThemes: ["cartel_coordination", "merger"],
    blurb:
      "Major US network carrier involved in alliance coordination debates and airport slot concentration at hub cities.",
  },
  {
    id: "united-airlines",
    name: "United Airlines",
    aliases: ["united"],
    markets: ["passenger airlines"],
    caseIds: ["american-airlines-cartel"],
    conductThemes: ["cartel_coordination", "merger"],
    blurb:
      "Large hub-and-spoke carrier whose joint ventures and capacity discipline draw periodic antitrust attention.",
  },
  {
    id: "southwest",
    name: "Southwest Airlines",
    aliases: [],
    markets: ["passenger airlines", "low-cost carriers"],
    caseIds: [],
    conductThemes: ["merger", "predatory_pricing"],
    blurb:
      "Dominant US low-cost carrier; expansion and capacity choices affect competitive constraints on legacy network airlines.",
  },
  {
    id: "jetblue",
    name: "JetBlue Airways",
    aliases: [],
    markets: ["passenger airlines", "low-cost carriers"],
    caseIds: ["jetblue-spirit"],
    conductThemes: ["merger"],
    blurb:
      "Proposed Spirit acquisition tested whether further airline consolidation would harm ultra-low-cost competition.",
  },
  {
    id: "spirit-airlines",
    name: "Spirit Airlines",
    aliases: [],
    markets: ["passenger airlines", "ultra-low-cost carriers"],
    caseIds: ["jetblue-spirit"],
    conductThemes: ["merger"],
    blurb:
      "Ultra-low-cost disruptor whose attempted merger with JetBlue was challenged over loss of independent price competition.",
  },
  {
    id: "lufthansa",
    name: "Lufthansa",
    aliases: [],
    markets: ["passenger airlines", "air cargo"],
    caseIds: ["american-airlines-cartel"],
    conductThemes: ["cartel_coordination", "merger"],
    blurb:
      "European flag carrier tied to Star Alliance coordination and EU scrutiny of state aid and slot allocation.",
  },
  {
    id: "ryanair",
    name: "Ryanair",
    aliases: [],
    markets: ["passenger airlines", "low-cost carriers"],
    caseIds: [],
    conductThemes: ["abuse_of_dominance", "predatory_pricing"],
    blurb:
      "Europe's largest low-cost airline; aggressive pricing and airport deal strategies periodically attract dominance complaints.",
  },
  {
    id: "easyjet",
    name: "easyJet",
    aliases: [],
    markets: ["passenger airlines", "low-cost carriers"],
    caseIds: [],
    conductThemes: ["merger"],
    blurb:
      "Major European LCC whose route overlap with Ryanair and legacy carriers shapes short-haul price competition.",
  },
  {
    id: "pfizer",
    name: "Pfizer",
    aliases: [],
    markets: ["pharmaceuticals", "vaccines"],
    caseIds: [],
    conductThemes: ["merger", "refusal_to_deal"],
    blurb:
      "Global pharma giant whose large mergers and patent lifecycle strategies intersect with pay-for-delay and bundling theories.",
  },
  {
    id: "johnson-johnson",
    name: "Johnson & Johnson",
    aliases: ["j&j", "janssen"],
    markets: ["pharmaceuticals", "medical devices", "consumer health"],
    caseIds: [],
    conductThemes: ["merger", "vertical_restraint"],
    blurb:
      "Diversified health conglomerate; device and pharma bundling can raise vertical foreclosure concerns in hospital purchasing.",
  },
  {
    id: "merck",
    name: "Merck",
    aliases: ["msd"],
    markets: ["pharmaceuticals", "vaccines"],
    caseIds: [],
    conductThemes: ["merger", "cartel_coordination"],
    blurb:
      "Major drug maker involved in historic US pricing investigations and ongoing merger reviews in specialty therapeutics.",
  },
  {
    id: "abbvie",
    name: "AbbVie",
    aliases: ["allergan"],
    markets: ["pharmaceuticals", "biologics"],
    caseIds: [],
    conductThemes: ["merger", "refusal_to_deal"],
    blurb:
      "Humira maker whose patent settlements and large acquisitions exemplify pharma consolidation and lifecycle management.",
  },
  {
    id: "roche",
    name: "Roche",
    aliases: ["genentech"],
    markets: ["pharmaceuticals", "diagnostics"],
    caseIds: [],
    conductThemes: ["merger", "vertical_restraint"],
    blurb:
      "Swiss pharma-diagnostics integrator; vertical links between tests and therapies can affect hospital formulary competition.",
  },
  {
    id: "novartis",
    name: "Novartis",
    aliases: ["sandoz"],
    markets: ["pharmaceuticals", "generics"],
    caseIds: [],
    conductThemes: ["merger", "cartel_coordination"],
    blurb:
      "Global pharma with generics arm Sandoz; EU and US authorities have pursued cartel cases in generic drug markets.",
  },
  {
    id: "teva",
    name: "Teva Pharmaceutical",
    aliases: [],
    markets: ["generic pharmaceuticals"],
    caseIds: [],
    conductThemes: ["cartel_coordination", "price_fix"],
    blurb:
      "World's largest generic manufacturer; central figure in US criminal and civil price-fixing prosecutions among generics makers.",
  },
  {
    id: "moderna",
    name: "Moderna",
    aliases: [],
    markets: ["biotechnology", "vaccines", "mRNA therapeutics"],
    caseIds: [],
    conductThemes: ["refusal_to_deal", "market_access"],
    blurb:
      "mRNA platform company whose licensing and manufacturing access choices affect vaccine and therapeutic market entry.",
  },
  {
    id: "walmart",
    name: "Walmart",
    aliases: ["sam's club"],
    markets: ["retail", "grocery", "e-commerce"],
    caseIds: [],
    conductThemes: ["vertical_restraint", "predatory_pricing", "discrimination"],
    blurb:
      "Largest US retailer; buyer power, supplier terms, and grocery pricing strategies draw periodic monopsony and dominance debate.",
  },
  {
    id: "kroger",
    name: "Kroger",
    aliases: ["fred meyer", "ralphs"],
    markets: ["grocery retail"],
    caseIds: [],
    conductThemes: ["merger", "price_fix"],
    blurb:
      "Proposed Albertsons merger would reshape US grocery concentration and worker/local market competition.",
  },
  {
    id: "albertsons",
    name: "Albertsons",
    aliases: ["safeway", "vons"],
    markets: ["grocery retail"],
    caseIds: [],
    conductThemes: ["merger"],
    blurb:
      "Second-largest US supermarket operator; Kroger merger attempt triggered FTC challenge over local grocery market power.",
  },
  {
    id: "costco",
    name: "Costco",
    aliases: [],
    markets: ["warehouse retail", "grocery"],
    caseIds: [],
    conductThemes: ["vertical_restraint", "exclusivity"],
    blurb:
      "Membership warehouse model with limited SKUs; exclusive supplier arrangements can constrain brand access across channels.",
  },
  {
    id: "target",
    name: "Target",
    aliases: [],
    markets: ["retail", "e-commerce"],
    caseIds: [],
    conductThemes: ["vertical_restraint", "resale_restriction"],
    blurb:
      "National big-box retailer whose marketplace and vendor policies affect third-party seller pricing and assortment online.",
  },
  {
    id: "tesco",
    name: "Tesco",
    aliases: [],
    markets: ["grocery retail", "UK supermarkets"],
    caseIds: [],
    conductThemes: ["abuse_of_dominance", "price_fix"],
    blurb:
      "UK grocery leader historically investigated by the CMA over supplier payments and market allocation with other retailers.",
  },
  {
    id: "carrefour",
    name: "Carrefour",
    aliases: [],
    markets: ["grocery retail", "hypermarkets"],
    caseIds: [],
    conductThemes: ["merger", "vertical_restraint"],
    blurb:
      "European hypermarket giant whose promotions and supplier rebates intersect with French and EU retail competition rules.",
  },
  {
    id: "ahold-delhaize",
    name: "Ahold Delhaize",
    aliases: ["stop & shop", "food lion", "giant"],
    markets: ["grocery retail"],
    caseIds: [],
    conductThemes: ["merger"],
    blurb:
      "Transatlantic supermarket group formed by merger; local market overlap reviews govern further US and EU consolidation.",
  },
  {
    id: "ford",
    name: "Ford",
    aliases: ["ford motor"],
    markets: ["automotive", "commercial vehicles"],
    caseIds: [],
    conductThemes: ["merger", "vertical_restraint"],
    blurb:
      "Legacy US automaker navigating EV transition; dealer franchise laws and vertical integration choices affect retail competition.",
  },
  {
    id: "gm",
    name: "General Motors",
    aliases: ["chevrolet", "cadillac"],
    markets: ["automotive", "EVs"],
    caseIds: [],
    conductThemes: ["merger", "cartel_coordination"],
    blurb:
      "Detroit automaker with history of large mergers; supplier and emissions scandals have intersected with cartel enforcement.",
  },
  {
    id: "toyota",
    name: "Toyota",
    aliases: ["lexus"],
    markets: ["automotive", "hybrid vehicles"],
    caseIds: [],
    conductThemes: ["cartel_coordination", "merger"],
    blurb:
      "World's largest automaker by volume; past component cartel cases in Japan and Europe touched its supply chain.",
  },
  {
    id: "volkswagen",
    name: "Volkswagen Group",
    aliases: ["vw", "audi", "porsche", "skoda"],
    markets: ["automotive", "EVs"],
    caseIds: [],
    conductThemes: ["cartel_coordination", "merger"],
    blurb:
      "German automotive conglomerate implicated in EU diesel and steel cartel investigations alongside brand portfolio consolidation.",
  },
  {
    id: "stellantis",
    name: "Stellantis",
    aliases: ["fiat", "chrysler", "peugeot", "jeep"],
    markets: ["automotive"],
    caseIds: [],
    conductThemes: ["merger"],
    blurb:
      "Formed by Fiat Chrysler–PSA merger; multi-brand portfolio raises EU and US reviews on platform sharing and dealer networks.",
  },
  {
    id: "tesla",
    name: "Tesla",
    aliases: [],
    markets: ["EVs", "charging networks", "energy storage"],
    caseIds: [],
    conductThemes: ["vertical_restraint", "refusal_to_deal", "tying"],
    blurb:
      "Direct-sales EV maker; proprietary charging standards and repair restrictions echo platform lock-in themes from tech markets.",
  },
  {
    id: "rivian",
    name: "Rivian",
    aliases: [],
    markets: ["EVs", "commercial vans"],
    caseIds: [],
    conductThemes: ["exclusivity"],
    blurb:
      "EV startup with Amazon delivery-van exclusivity; vertical partnerships can foreclose rival fleet buyers from scale production.",
  },
  {
    id: "booking",
    name: "Booking.com",
    aliases: ["booking holdings", "priceline", "kayak"],
    markets: ["online travel agencies", "hotel distribution"],
    caseIds: ["booking-parity"],
    conductThemes: ["vertical_restraint", "price_fix"],
    blurb:
      "Dominant OTA whose hotel price-parity clauses became a defining European vertical-restraint enforcement theme.",
  },
  {
    id: "expedia",
    name: "Expedia Group",
    aliases: ["hotels.com", "vrbo", "trivago"],
    markets: ["online travel agencies", "vacation rentals"],
    caseIds: ["booking-parity"],
    conductThemes: ["vertical_restraint", "merger"],
    blurb:
      "Major OTA alongside Booking; parity clauses and metasearch advertising practices drew parallel EU competition scrutiny.",
  },
  {
    id: "airbnb",
    name: "Airbnb",
    aliases: [],
    markets: ["short-term rentals", "travel platforms"],
    caseIds: [],
    conductThemes: ["platform_suspension", "discrimination", "data_lockin"],
    blurb:
      "Short-term rental platform whose host rules, fee structures, and delisting policies affect local lodging competition.",
  },
  {
    id: "uber",
    name: "Uber",
    aliases: ["uber eats"],
    markets: ["ride-hailing", "food delivery", "freight"],
    caseIds: [],
    conductThemes: ["merger", "predatory_pricing", "platform_suspension"],
    blurb:
      "Multi-sided platform spanning mobility and delivery; pricing, driver classification, and acquisition strategy attract competition attention.",
  },
  {
    id: "lyft",
    name: "Lyft",
    aliases: [],
    markets: ["ride-hailing"],
    caseIds: [],
    conductThemes: ["predatory_pricing", "merger"],
    blurb:
      "US ride-hail duopolist with Uber; coordinated pricing and market exit scenarios recur in two-sided platform analysis.",
  },
  {
    id: "doordash",
    name: "DoorDash",
    aliases: ["caviar", "wolt"],
    markets: ["food delivery", "local commerce"],
    caseIds: [],
    conductThemes: ["merger", "exclusivity", "predatory_pricing"],
    blurb:
      "Leading US food-delivery app; restaurant exclusivity, fee caps, and acquisition of rivals raise local market power concerns.",
  },
  {
    id: "grubhub",
    name: "Grubhub",
    aliases: ["seamless"],
    markets: ["food delivery"],
    caseIds: [],
    conductThemes: ["merger", "vertical_restraint"],
    blurb:
      "Legacy delivery platform consolidated through mergers; restaurant commission and listing practices affect menu pricing online.",
  },
  {
    id: "deliveroo",
    name: "Deliveroo",
    aliases: [],
    markets: ["food delivery", "grocery delivery"],
    caseIds: [],
    conductThemes: ["merger", "exclusivity"],
    blurb:
      "European delivery platform whose Amazon investment and rider employment models triggered UK and EU competition reviews.",
  },
  {
    id: "just-eat-takeaway",
    name: "Just Eat Takeaway",
    aliases: ["just eat", "takeaway.com", "grubhub parent"],
    markets: ["food delivery", "online ordering"],
    caseIds: [],
    conductThemes: ["merger"],
    blurb:
      "Transatlantic delivery group formed by merger; cross-border consolidation reshapes restaurant commission competition in Europe.",
  },
  {
    id: "disney",
    name: "Disney",
    aliases: ["espn", "hulu", "marvel", "pixar"],
    markets: ["media", "streaming", "theme parks"],
    caseIds: [],
    conductThemes: ["merger", "vertical_restraint", "exclusivity"],
    blurb:
      "Entertainment conglomerate whose sports rights, streaming bundles, and theatrical window policies affect content distribution.",
  },
  {
    id: "netflix",
    name: "Netflix",
    aliases: [],
    markets: ["streaming video"],
    caseIds: [],
    conductThemes: ["merger", "exclusivity"],
    blurb:
      "Dominant SVOD service; content exclusivity and recommendation placement shape competition among streaming platforms.",
  },
  {
    id: "warner-bros-discovery",
    name: "Warner Bros. Discovery",
    aliases: ["wbd", "hbo max", "cnn"],
    markets: ["media", "streaming", "studios"],
    caseIds: [],
    conductThemes: ["merger"],
    blurb:
      "Merged media giant whose portfolio consolidation and sports streaming rights affect bargaining with distributors and creators.",
  },
  {
    id: "spotify",
    name: "Spotify",
    aliases: [],
    markets: ["music streaming", "audio advertising"],
    caseIds: ["eu-apple-music"],
    conductThemes: ["platform_suspension", "tying", "discrimination"],
    blurb:
      "Leading music streamer central to EU Apple App Store cases over 30% commissions and in-app payment restrictions.",
  },
  {
    id: "live-nation",
    name: "Live Nation Entertainment",
    aliases: ["live nation", "ticketmaster"],
    markets: ["live entertainment", "concert promotion", "ticketing"],
    caseIds: ["live-nation-ticketmaster"],
    conductThemes: ["merger", "abuse_of_dominance", "vertical_restraint"],
    blurb:
      "Vertically integrated promoter and ticketing giant; 2024 DOJ suit alleges monopolization across live-event markets.",
  },
  {
    id: "ticketmaster",
    name: "Ticketmaster",
    aliases: [],
    markets: ["event ticketing", "primary sales"],
    caseIds: ["live-nation-ticketmaster"],
    conductThemes: ["merger", "abuse_of_dominance"],
    blurb:
      "Dominant primary ticketer whose merger with Live Nation and fee structures remain a high-profile US competition flashpoint.",
  },
  {
    id: "stubhub",
    name: "StubHub",
    aliases: [],
    markets: ["secondary ticketing", "resale"],
    caseIds: [],
    conductThemes: ["vertical_restraint", "resale_restriction"],
    blurb:
      "Secondary ticket marketplace; exclusive resale deals with teams and artists can limit fan choice and price discovery.",
  },
  {
    id: "seatgeek",
    name: "SeatGeek",
    aliases: [],
    markets: ["ticketing", "event discovery"],
    caseIds: [],
    conductThemes: ["refusal_to_deal", "market_access"],
    blurb:
      "Ticketing aggregator seeking primary inventory access; refusal by dominant primary sellers raises interoperability themes.",
  },
  {
    id: "exxonmobil",
    name: "ExxonMobil",
    aliases: ["exxon", "mobil"],
    markets: ["oil & gas", "refining", "petrochemicals"],
    caseIds: [],
    conductThemes: ["merger", "cartel_coordination"],
    blurb:
      "Integrated energy major whose mergers and joint ventures intersect with commodity market manipulation and consolidation reviews.",
  },
  {
    id: "chevron",
    name: "Chevron",
    aliases: [],
    markets: ["oil & gas", "refining"],
    caseIds: [],
    conductThemes: ["merger"],
    blurb:
      "US supermajor pursuing large acquisitions; FTC and foreign regulators assess upstream consolidation and retail fuel markets.",
  },
  {
    id: "shell",
    name: "Shell",
    aliases: [],
    markets: ["oil & gas", "lng", "retail fuel"],
    caseIds: [],
    conductThemes: ["cartel_coordination", "merger"],
    blurb:
      "Global energy company named in past cartel and price-fixing probes alongside merger reviews in European downstream markets.",
  },
  {
    id: "bp",
    name: "BP",
    aliases: ["british petroleum"],
    markets: ["oil & gas", "renewables"],
    caseIds: [],
    conductThemes: ["cartel_coordination", "merger"],
    blurb:
      "European integrated oil company; downstream joint ventures and trading desk conduct have featured in competition enforcement.",
  },
  {
    id: "boeing",
    name: "Boeing",
    aliases: [],
    markets: ["commercial aircraft", "defense"],
    caseIds: ["boeing-mcdonnell-douglas"],
    conductThemes: ["merger"],
    blurb:
      "McDonnell Douglas merger created a US duopoly in large commercial jets; safety and supply chain issues affect OEM competition.",
  },
  {
    id: "airbus",
    name: "Airbus",
    aliases: [],
    markets: ["commercial aircraft"],
    caseIds: [],
    conductThemes: ["merger", "market_access"],
    blurb:
      "European aerospace rival to Boeing; WTO disputes over launch aid illustrate state-supported competition in wide-body markets.",
  },
  {
    id: "ge-aerospace",
    name: "GE Aerospace",
    aliases: ["general electric", "cfm international"],
    markets: ["jet engines", "industrial equipment"],
    caseIds: [],
    conductThemes: ["merger", "exclusivity"],
    blurb:
      "Engine joint ventures and aftermarket parts policies affect airline maintenance choice and rival engine OEM entry.",
  },
  {
    id: "siemens",
    name: "Siemens",
    aliases: [],
    markets: ["industrial automation", "energy equipment", "rail"],
    caseIds: [],
    conductThemes: ["merger", "cartel_coordination"],
    blurb:
      "German industrial conglomerate; EU cartel fines and large rail and energy mergers shape European infrastructure competition.",
  },
  {
    id: "honeywell",
    name: "Honeywell",
    aliases: [],
    markets: ["aerospace", "building technologies", "industrial"],
    caseIds: [],
    conductThemes: ["merger"],
    blurb:
      "Diversified industrial whose blocked and completed acquisitions illustrate US merger enforcement in aerospace components.",
  },
  {
    id: "caterpillar",
    name: "Caterpillar",
    aliases: ["cat"],
    markets: ["heavy equipment", "construction machinery"],
    caseIds: [],
    conductThemes: ["merger", "vertical_restraint"],
    blurb:
      "Construction equipment leader; dealer territories and aftermarket parts restrictions echo vertical themes from auto and tech.",
  },
  {
    id: "deere",
    name: "Deere & Company",
    aliases: ["john deere"],
    markets: ["agricultural equipment", "precision agriculture"],
    caseIds: [],
    conductThemes: ["refusal_to_deal", "interoperability", "vertical_restraint"],
    blurb:
      "Farm equipment giant facing Right to Repair scrutiny over software-locked parts and restricted independent servicing.",
  },
  {
    id: "volvo-trucks",
    name: "Volvo Group",
    aliases: ["volvo trucks", "mack"],
    markets: ["commercial trucks", "buses"],
    caseIds: ["hist-eu-trucks-cartel"],
    conductThemes: ["cartel_coordination", "merger"],
    blurb:
      "European truck maker fined in the EU trucks cartel alongside rivals for coordinated pricing of heavy vehicles.",
  },
  {
    id: "daimler-truck",
    name: "Daimler Truck",
    aliases: ["freightliner", "mercedes-benz trucks"],
    markets: ["commercial trucks"],
    caseIds: ["hist-eu-trucks-cartel"],
    conductThemes: ["cartel_coordination"],
    blurb:
      "Major commercial-vehicle OEM that participated in the EU heavy-truck price-coordination cartel enforcement action.",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    aliases: ["slack", "tableau"],
    markets: ["CRM", "enterprise SaaS"],
    caseIds: [],
    conductThemes: ["merger", "tying", "data_lockin"],
    blurb:
      "CRM market leader whose acquisitions and platform bundling raise switching-cost and ecosystem foreclosure questions.",
  },
  {
    id: "oracle",
    name: "Oracle",
    aliases: ["sun microsystems legacy"],
    markets: ["enterprise databases", "cloud", "ERP"],
    caseIds: [],
    conductThemes: ["merger", "tying", "refusal_to_deal"],
    blurb:
      "Database incumbent known for aggressive licensing and large acquisitions; cloud transition renews tying and lock-in debates.",
  },
  {
    id: "adobe",
    name: "Adobe",
    aliases: ["creative cloud"],
    markets: ["creative software", "document services"],
    caseIds: [],
    conductThemes: ["tying", "data_lockin"],
    blurb:
      "Subscription-only creative suite illustrates software tying and high switching costs for professional design workflows.",
  },
  {
    id: "ibm",
    name: "IBM",
    aliases: ["red hat"],
    markets: ["enterprise IT", "cloud", "mainframes"],
    caseIds: [],
    conductThemes: ["merger", "tying"],
    blurb:
      "Legacy enterprise vendor with mainframe dominance history; Red Hat acquisition expanded hybrid-cloud merger scrutiny.",
  },
  {
    id: "sap",
    name: "SAP",
    aliases: [],
    markets: ["ERP", "enterprise software"],
    caseIds: [],
    conductThemes: ["tying", "abuse_of_dominance"],
    blurb:
      "European ERP giant whose suite bundling and maintenance policies attract abuse-of-dominance complaints from customers.",
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    aliases: [],
    markets: ["CDN", "DNS", "edge security"],
    caseIds: [],
    conductThemes: ["platform_suspension", "refusal_to_deal"],
    blurb:
      "Internet infrastructure provider whose content moderation and termination policies affect downstream site availability.",
  },
  {
    id: "snowflake",
    name: "Snowflake",
    aliases: [],
    markets: ["cloud data warehousing"],
    caseIds: [],
    conductThemes: ["data_lockin", "tying"],
    blurb:
      "Cloud data platform whose multi-cloud positioning still raises egress and interoperability costs for enterprise analytics stacks.",
  },
  {
    id: "ebay",
    name: "eBay",
    aliases: [],
    markets: ["online marketplace", "C2C commerce"],
    caseIds: [],
    conductThemes: ["vertical_restraint", "platform_suspension"],
    blurb:
      "Legacy marketplace whose seller fee, promoted listing, and account suspension policies affect small-business online retail.",
  },
  {
    id: "etsy",
    name: "Etsy",
    aliases: [],
    markets: ["handmade marketplace", "niche e-commerce"],
    caseIds: [],
    conductThemes: ["platform_suspension", "discrimination"],
    blurb:
      "Craft-focused marketplace; fee hikes and search placement for sellers echo broader platform self-preferencing debates.",
  },
  {
    id: "shopify",
    name: "Shopify",
    aliases: [],
    markets: ["e-commerce infrastructure", "merchant services"],
    caseIds: [],
    conductThemes: ["tying", "data_lockin"],
    blurb:
      "Merchant platform bundling payments, logistics, and app-store rules; defaults can steer sellers toward affiliated services.",
  },
  {
    id: "alibaba",
    name: "Alibaba Group",
    aliases: ["taobao", "tmall", "alipay", "aliexpress"],
    markets: ["e-commerce", "cloud", "payments"],
    caseIds: [],
    conductThemes: ["self_preferencing", "abuse_of_dominance", "merger"],
    blurb:
      "Chinese e-commerce and cloud conglomerate fined by Chinese regulators for merchant exclusivity and algorithmic self-preferencing.",
  },
  {
    id: "tencent",
    name: "Tencent",
    aliases: ["wechat", "qq"],
    markets: ["social messaging", "gaming", "digital payments"],
    caseIds: [],
    conductThemes: ["merger", "tying", "data_lockin"],
    blurb:
      "WeChat super-app and gaming investor; ecosystem bundling and acquisition strategy draw Chinese and foreign competition attention.",
  },
  {
    id: "bytedance",
    name: "ByteDance",
    aliases: ["tiktok", "douyin"],
    markets: ["short-form video", "social media", "advertising"],
    caseIds: [],
    conductThemes: ["data_lockin", "merger"],
    blurb:
      "TikTok parent facing US divestiture pressure; algorithmic scale and data flows sit at intersection of competition and security policy.",
  },
  {
    id: "huawei",
    name: "Huawei",
    aliases: [],
    markets: ["telecom equipment", "smartphones", "5G"],
    caseIds: [],
    conductThemes: ["refusal_to_deal", "exclusivity"],
    blurb:
      "Chinese telecom gear supplier restricted in Western 5G markets over security; SEP licensing disputes parallel Qualcomm themes.",
  },
  {
    id: "epic-games",
    name: "Epic Games",
    aliases: ["fortnite", "unreal engine"],
    markets: ["video games", "game engines", "app distribution"],
    caseIds: ["epic-v-apple"],
    conductThemes: ["tying", "platform_suspension", "refusal_to_deal"],
    blurb:
      "Fortnite maker that sued Apple over App Store payment rules, becoming a flagship US case on mobile platform gatekeeping.",
  },
  {
    id: "activision-blizzard",
    name: "Activision Blizzard",
    aliases: ["call of duty", "world of warcraft"],
    markets: ["video games", "AAA publishing"],
    caseIds: ["msft-activision", "cma-msft-activision"],
    conductThemes: ["merger"],
    blurb:
      "Major game publisher whose acquisition by Microsoft tested cloud gaming foreclosure theories across three continents.",
  },
  {
    id: "within",
    name: "Within (Meta acquisition target)",
    aliases: ["supernatural vr"],
    markets: ["VR fitness", "immersive apps"],
    caseIds: ["meta-within"],
    conductThemes: ["merger"],
    blurb:
      "VR fitness studio whose blocked acquisition by Meta illustrated nascent-market merger theories in immersive computing.",
  },
  {
    id: "cvs",
    name: "CVS Health",
    aliases: ["cvs pharmacy", "aetna"],
    markets: ["pharmacy retail", "pharmacy benefit management", "health insurance"],
    caseIds: [],
    conductThemes: ["merger", "vertical_restraint"],
    blurb:
      "Vertical integration of PBM, insurer, and retail pharmacy raises steering and formulary foreclosure concerns in US healthcare.",
  },
  {
    id: "walgreens",
    name: "Walgreens Boots Alliance",
    aliases: ["walgreens", "boots"],
    markets: ["pharmacy retail", "wholesale distribution"],
    caseIds: [],
    conductThemes: ["merger"],
    blurb:
      "US pharmacy chain pursuing consolidation; local retail pharmacy concentration affects consumer choice and reimbursement bargaining.",
  },
  {
    id: "unitedhealth",
    name: "UnitedHealth Group",
    aliases: ["optum", "unitedhealthcare"],
    markets: ["health insurance", "pharmacy benefit management", "care delivery"],
    caseIds: [],
    conductThemes: ["merger", "vertical_restraint", "data_lockin"],
    blurb:
      "Largest US health insurer with Optum services arm; vertical integration prompts DOJ scrutiny over care and data advantages.",
  },
  {
    id: "cigna",
    name: "Cigna",
    aliases: ["express scripts"],
    markets: ["health insurance", "pharmacy benefit management"],
    caseIds: [],
    conductThemes: ["merger"],
    blurb:
      "Insurer-PBM combination whose blocked Anthem merger and Express Scripts deal shaped US healthcare consolidation limits.",
  },
  {
    id: "elevance",
    name: "Elevance Health",
    aliases: ["anthem", "blue cross"],
    markets: ["health insurance", "managed care"],
    caseIds: [],
    conductThemes: ["merger"],
    blurb:
      "Major Blue Cross carrier whose attempted Cigna merger failure highlighted insurer consolidation risks for providers and employers.",
  },
  {
    id: "ncaa",
    name: "NCAA",
    aliases: ["college athletics"],
    markets: ["amateur sports", "broadcast rights"],
    caseIds: ["hist-ncaa-alston"],
    conductThemes: ["vertical_restraint", "price_fix"],
    blurb:
      "College sports governing body whose athlete compensation limits were challenged in Alston, reshaping amateurism antitrust doctrine.",
  },
  {
    id: "leegin",
    name: "Leegin Creative Leather",
    aliases: ["leegin"],
    markets: ["fashion accessories", "wholesale distribution"],
    caseIds: ["hist-us-leegin"],
    conductThemes: ["resale_restriction", "vertical_restraint"],
    blurb:
      "Minimum resale price maintenance defendant in Leegin v. PSKS, which shifted US treatment of vertical price agreements.",
  },
  {
    id: "home-depot",
    name: "Home Depot",
    aliases: [],
    markets: ["home improvement retail"],
    caseIds: [],
    conductThemes: ["merger", "vertical_restraint"],
    blurb:
      "Dominant US home-improvement big-box chain; supplier exclusivity and pro-customer programs affect independent dealer competition.",
  },
  {
    id: "lowes",
    name: "Lowe's",
    aliases: ["lowes"],
    markets: ["home improvement retail"],
    caseIds: [],
    conductThemes: ["merger"],
    blurb:
      "Second-largest US home-improvement retailer; local duopoly dynamics with Home Depot shape contractor and consumer pricing.",
  },
  {
    id: "ikea",
    name: "IKEA",
    aliases: [],
    markets: ["furniture retail", "home furnishings"],
    caseIds: [],
    conductThemes: ["vertical_restraint", "resale_restriction"],
    blurb:
      "Global furniture retailer whose supplier scale and catalog exclusivity affect independent furniture sellers in many markets.",
  },
  {
    id: "lvmh",
    name: "LVMH",
    aliases: ["louis vuitton", "dior", "moet"],
    markets: ["luxury goods", "fashion", "spirits"],
    caseIds: [],
    conductThemes: ["merger", "vertical_restraint"],
    blurb:
      "Luxury conglomerate whose brand portfolio acquisitions and selective distribution networks define European luxury competition.",
  },
  {
    id: "nike",
    name: "Nike",
    aliases: ["jordan brand"],
    markets: ["athletic footwear", "sportswear"],
    caseIds: [],
    conductThemes: ["resale_restriction", "vertical_restraint"],
    blurb:
      "Global sportswear leader; MAP policies and wholesale account terminations illustrate resale-price and distribution control.",
  },
  {
    id: "standard-oil",
    name: "Standard Oil (historical)",
    aliases: ["rockefeller"],
    markets: ["oil refining", "pipelines"],
    caseIds: ["us-standard-oil"],
    conductThemes: ["abuse_of_dominance", "merger"],
    blurb:
      "Historic US petroleum trust dissolved in 1911; foundational precedent for structural remedies against monopolization.",
  },
];
