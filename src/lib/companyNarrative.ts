import type { CompanyProfile, CompetitionCase, ConductTag } from "@/data/types";

const CONDUCT_PLAIN: Record<ConductTag, string> = {
  tying: "tying or forced bundling (you must take product B to get product A)",
  exclusivity: "exclusive dealing (pressure to deal with one firm only)",
  self_preferencing: "self-preferencing (a platform favoring its own offers)",
  refusal_to_deal: "refusal to deal or blocked access",
  price_fix: "price coordination / cartel-style concerns",
  predatory_pricing: "predatory or exclusionary pricing theories",
  merger: "mergers and acquisitions that may reduce competition",
  cartel_coordination: "coordination between rivals",
  resale_restriction: "limits on resale or aftermarket freedom",
  interoperability: "blocked interoperability or portability",
  platform_suspension: "account or seller suspensions on platforms",
  market_access: "blocked routes to customers or key inputs",
  vertical_restraint: "vertical restraints in supply chains",
  discrimination: "unequal treatment of similarly situated partners",
  data_lockin: "data lock-in that raises switching costs",
  abuse_of_dominance: "abuse of a dominant position (especially in EU law)",
};

export function buildCompanyRecord(
  company: CompanyProfile,
  linkedCases: CompetitionCase[],
): Required<
  Pick<
    CompanyProfile,
    | "overview"
    | "competitionFootprint"
    | "consumerAndBusinessAngle"
    | "whatToWatch"
  >
> & { readingHint: string } {
  if (
    company.overview?.length &&
    company.competitionFootprint?.length &&
    company.consumerAndBusinessAngle?.length &&
    company.whatToWatch?.length
  ) {
    return {
      overview: company.overview,
      competitionFootprint: company.competitionFootprint,
      consumerAndBusinessAngle: company.consumerAndBusinessAngle,
      whatToWatch: company.whatToWatch,
      readingHint: `Deep profile · ${linkedCases.length} linked library matter${linkedCases.length === 1 ? "" : "s"}`,
    };
  }

  const markets =
    company.markets.length > 0
      ? company.markets.join(", ")
      : "several overlapping markets";
  const themes = company.conductThemes
    .slice(0, 6)
    .map((t) => CONDUCT_PLAIN[t] ?? t.replace(/_/g, " "));
  const aliases =
    company.aliases.length > 0
      ? `People also search for it as ${company.aliases.slice(0, 4).join(", ")}.`
      : "";

  const overview = [
    `${company.name} is listed in CounterLayer because it operates in markets where competition rules often matter: ${markets}. ${company.blurb}`,
    aliases
      ? `${aliases} This page explains the company’s competition footprint in plain English so consumers, sellers, developers, and small businesses can understand the power relationship—not so they can accuse anyone of breaking the law.`
      : `This page explains the company’s competition footprint in plain English so consumers, sellers, developers, and small businesses can understand the power relationship—not so they can accuse anyone of breaking the law.`,
    `Competition law cares less about “big” as a slogan and more about conduct: exclusive deals, self-preferencing, mergers that remove rivals, blocked interoperability, or coordination between competitors. ${company.name} appears here because those themes have shown up around its markets, products, or distribution channels.`,
    linkedCases.length > 0
      ? `In this library, ${company.name} is currently linked to ${linkedCases.length} matter${linkedCases.length === 1 ? "" : "s"}. Each linked case has its own long-form explainer with timeline, claims, outcomes, and sources. Use those pages for the detailed story; use this page for the company-level map.`
      : `This profile may not yet have a deep linked-case list in the library. That does not mean the company is “cleared” or “guilty”—it means you should treat this as a market-power primer and keep reading primary sources when a live dispute appears.`,
    `When you read agency press releases or news headlines about ${company.name}, separate three ideas: (1) a complaint or investigation, (2) a proven violation, and (3) a settlement or remedy that changes behavior going forward. Those are different stages, and CounterLayer labels them carefully.`,
  ];

  const competitionFootprint = [
    themes.length
      ? `Recurring conduct themes associated with ${company.name} in this dataset include: ${themes.join("; ")}. Themes are labels for patterns—not automatic findings of illegality.`
      : `Competition themes for ${company.name} will fill in as more matters are linked. Until then, start from the markets above and ask who controls access to customers, data, or distribution.`,
    linkedCases.length
      ? `Linked library headlines include: ${linkedCases
          .slice(0, 5)
          .map((c) => c.shortName)
          .join("; ")}${linkedCases.length > 5 ? "; and more" : ""}. Open each case for jurisdiction, dates, and outcomes.`
      : `If you are researching a rumor or news story, look for the agency name (FTC, DOJ, European Commission, national authority), the legal theory (merger, cartel, dominance, DMA duty), and whether the matter is still open.`,
    `US and EU rules can point different directions on similar facts. A practice that survives US antitrust scrutiny may still face EU Article 102 or Digital Markets Act duties—and the reverse can also be true depending on the doctrine and market definition.`,
    `For mergers, watch whether rivals disappear, whether a buyer controls a critical input, and whether agencies demanded divestitures or behavioral remedies. For platforms, watch ranking, fees, defaults, and whether rivals can reach users without the gatekeeper’s permission.`,
  ];

  const consumerAndBusinessAngle = [
    `If you are a consumer of ${company.name}, ask practical questions: How many alternatives do you have? Can you export your data? Can access be revoked? Can terms change after you buy? Those questions measure dependence even when no lawsuit is filed.`,
    `If you are a seller, developer, supplier, or retailer dealing with ${company.name}, keep contemporaneous records: contracts, fee schedules, ranking screenshots, suspension notices, and messages about exclusivity. Evidence timelines matter more than vibes.`,
    `Small businesses often feel platform or supplier power first. That does not automatically create an antitrust claim, but it does explain why agencies hear from merchants, app developers, and distributors in these markets.`,
    `CounterLayer’s Consumer Power and My Rights tools can help you structure the story before you talk to counsel or file an agency tip. Filing a tip is not the same as winning a case.`,
  ];

  const whatToWatch = [
    `Watch for new merger filings or abandoned deals involving ${company.name} in ${markets}.`,
    `Watch for platform rule changes affecting fees, ranking, defaults, sideloading, or payment routing.`,
    `Watch for EU DMA / gatekeeper-style obligations if the firm is designated or supplies a designated gatekeeper ecosystem.`,
    `Watch private lawsuits and state AG actions that may travel parallel to federal or Commission cases.`,
    `Always read the primary source before sharing a claim online: press release, complaint, judgment, or commitment text.`,
  ];

  return {
    overview: company.overview?.length ? company.overview : overview,
    competitionFootprint: company.competitionFootprint?.length
      ? company.competitionFootprint
      : competitionFootprint,
    consumerAndBusinessAngle: company.consumerAndBusinessAngle?.length
      ? company.consumerAndBusinessAngle
      : consumerAndBusinessAngle,
    whatToWatch: company.whatToWatch?.length
      ? company.whatToWatch
      : whatToWatch,
    readingHint: `Expanded record · ${linkedCases.length} linked library matter${linkedCases.length === 1 ? "" : "s"}`,
  };
}
