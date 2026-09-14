import type { CompetitionCase } from "../types";

/** Landmark / classic matters with full layman explainers */
export const classicCases: CompetitionCase[] = [
  {
    id: "us-v-microsoft",
    name: "United States v. Microsoft Corp.",
    shortName: "Microsoft (browsers)",
    companies: ["microsoft"],
    jurisdictions: ["US"],
    conduct: ["tying", "exclusivity", "abuse_of_dominance"],
    yearStart: 1998,
    yearEnd: 2002,
    status: "remedy",
    summary:
      "DOJ alleged Microsoft maintained an OS monopoly by integrating Internet Explorer and restricting OEMs and rivals.",
    regulatorArgument:
      "Exclusionary agreements and technological tying raised rivals’ costs and protected the Windows monopoly.",
    outcome:
      "Liability findings; settlement/consent decree with behavioral remedies (API disclosure, OEM flexibility).",
    remedies: "Behavioral restrictions; monitoring; no full breakup after appeal path.",
    laws: ["sherman-1", "sherman-2"],
    markets: ["PC operating systems", "web browsers"],
    sources: [
      {
        label: "DOJ Microsoft case page",
        url: "https://www.justice.gov/atr/case/us-v-microsoft-corp",
      },
    ],
    readingMinutes: 8,
    keyDates: [
      { label: "Complaint filed", date: "May 18, 1998" },
      { label: "District court findings", date: "April 3, 2000" },
      { label: "Appeals court decision", date: "June 28, 2001" },
      { label: "Settlement approved", date: "November 1, 2002" },
    ],
    timeline: [
      {
        date: "1990s",
        title: "Windows becomes the default PC platform",
        detail:
          "Most home and office PCs shipped with Windows. That made Windows the doorway almost every software company had to pass through.",
      },
      {
        date: "May 18, 1998",
        title: "US government sues",
        detail:
          "The Department of Justice and several states accused Microsoft of illegally protecting its Windows monopoly, especially around Internet Explorer.",
      },
      {
        date: "2000–2001",
        title: "Trial, liability, then appeal",
        detail:
          "A trial court found serious violations and even considered breaking up Microsoft. An appeals court kept key liability findings but rejected the breakup plan as ordered.",
      },
      {
        date: "2001–2002",
        title: "Settlement and monitoring",
        detail:
          "Microsoft agreed to rules about how it dealt with PC makers and rivals, with years of oversight instead of a corporate split.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "The US government said Microsoft used its control of Windows to crush browser competition—especially Netscape—by bundling Internet Explorer and pressuring PC makers. Courts agreed Microsoft broke competition rules in important ways. The company was not broken up, but it had to change how it treated partners and rivals for years.",
      theStory: [
        "In the 1990s, Windows sat on nearly every personal computer that mattered. If you built software, you usually needed Windows to reach customers. That kind of gatekeeping power is exactly what antitrust law watches closely.",
        "Netscape’s browser was popular and threatened to become a new layer people used on top of Windows. Microsoft responded by pouring resources into Internet Explorer and making it hard for PC makers and users to choose something else.",
        "Prosecutors argued this was not ordinary hard competition. They said Microsoft used monopoly power in operating systems to win a different market—browsers—and to protect Windows itself from future threats.",
        "The case became one of the most famous tech antitrust fights in US history: courtroom demos, emails, and a public debate about whether government should rein in a software giant.",
      ],
      whyItMatters: [
        "If one company controls the platform everyone uses, it can decide which apps thrive and which die—even when customers might prefer a rival.",
        "This case is the ancestor of today’s fights about app stores, default search engines, and “self-preferencing.” When you hear those debates, Microsoft is often the historical reference point.",
        "For small developers and startups, the lesson is simple: platform rules are not just product design. They can be competition issues when the platform is unavoidable.",
      ],
      whatWasClaimed: [
        "Microsoft had monopoly power in PC operating systems.",
        "It illegally maintained that monopoly by excluding browser rivals and locking in PC makers with restrictive deals.",
        "Bundling Internet Explorer with Windows was part of a strategy to harm competition, not just a helpful feature.",
      ],
      theOtherSide: [
        "Microsoft argued it was innovating and giving consumers a free browser.",
        "It said integrating software is normal, and that antitrust law should not freeze product design.",
        "It also argued rivals were not as locked out as prosecutors claimed.",
      ],
      whatItMeansForYou: [
        "You do not need to be a lawyer to spot the pattern: a must-have platform + pressure to use the platform owner’s add-on + punishment for using rivals.",
        "Remedies focused on behavior (how Microsoft dealt with others), not permanently splitting Windows from Office or browsers.",
        "Later tech cases often ask: is this the Microsoft playbook again, or something different?",
      ],
      bottomLine:
        "A dominant platform company can get in trouble when it uses that dominance to shut rivals out of neighboring markets. Microsoft changed practices under court oversight; it was not dismantled.",
    },
  },
  {
    id: "eu-google-shopping",
    name: "Google Search (Shopping)",
    shortName: "Google Shopping (EU)",
    companies: ["google"],
    jurisdictions: ["EU"],
    conduct: ["self_preferencing", "abuse_of_dominance", "discrimination"],
    yearStart: 2010,
    yearEnd: 2017,
    status: "fined",
    summary:
      "Commission found Google abused dominance in general search by favoring its own comparison-shopping service.",
    regulatorArgument:
      "More favorable positioning and display of Google’s own service versus rival comparison services.",
    outcome: "€2.42B fine; requirement to treat rival services fairly in Shopping results.",
    remedies: "Equal treatment remedy in shopping units; fine upheld on core theory after appeals path.",
    laws: ["tfeu-102"],
    markets: ["general search", "comparison shopping"],
    sources: [
      {
        label: "EC press release",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/IP_17_1784",
      },
    ],
    readingMinutes: 7,
    keyDates: [
      { label: "Investigation opened", date: "November 2010" },
      { label: "Statement of Objections", date: "April 2015" },
      { label: "Infringement decision & fine", date: "June 27, 2017" },
    ],
    timeline: [
      {
        date: "2010",
        title: "EU opens a formal probe",
        detail:
          "Rival shopping comparison sites complained that Google Search results systematically preferred Google’s own shopping boxes.",
      },
      {
        date: "2015–2017",
        title: "Charges, then a landmark fine",
        detail:
          "The Commission concluded Google abused a dominant position in general search and ordered changes plus a multi-billion-euro fine.",
      },
      {
        date: "After 2017",
        title: "Appeals and compliance fights",
        detail:
          "Google challenged parts of the case. The core self-preferencing story remained a defining EU digital-competition precedent.",
      },
    ],
    plainEnglish: {
      inOneMinute:
        "Europe said Google used its popular search engine like a referee who also plays on one team—pushing Google Shopping results above rival comparison sites. Regulators called that an abuse of dominance and issued a huge fine plus orders to treat rivals more fairly.",
      theStory: [
        "For most people in Europe, Google Search was (and often still is) the starting point for finding products online. That makes the order of results incredibly powerful.",
        "Comparison shopping sites help you scan prices across stores. They alleged Google’s own shopping unit got premium placement while rivals were demoted—even when rivals might have been useful to shoppers.",
        "The European Commission’s theory was not “Google is big.” It was “Google is dominant in general search and leveraged that dominance to favor itself in a neighboring shopping service.”",
        "In 2017 the Commission issued one of the most famous tech fines of the era and demanded equal treatment principles for shopping results.",
      ],
      whyItMatters: [
        "If you run a small online business or a comparison tool, a platform’s ranking rules can decide whether customers ever see you.",
        "“Self-preferencing” became everyday language after this case: when a gatekeeper promotes its own product over competitors on the same platform.",
        "Consumers may see fewer real choices if the default search experience quietly steers traffic to the platform owner.",
      ],
      whatWasClaimed: [
        "Google held a dominant position in general internet search in the EEA.",
        "It systematically gave prominent placement to its own comparison shopping service.",
        "Rival services were demoted, harming competition on the merits.",
      ],
      theOtherSide: [
        "Google argued its shopping units improved the user experience and showed relevant products.",
        "It disputed the market definitions and the idea that rivals were unfairly harmed.",
        "It said competition in shopping and retail remained intense.",
      ],
      whatItMeansForYou: [
        "When a free service is the front door to the internet, its design choices are not only “product UX”—they can be competition issues.",
        "Fines get headlines; the longer fight is often about how results must be displayed going forward.",
        "Similar arguments later appeared in US cases and in the EU’s Digital Markets Act debates.",
      ],
      bottomLine:
        "In the EU, a dominant search engine can be punished for favoring its own shopping service over rivals in how results are shown—not merely for being successful.",
    },
  },
];
