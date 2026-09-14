import type { CompetitionCase, ConductTag, Jurisdiction } from "@/data/types";
import { cases } from "@/data/cases";

const STOP = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "to",
  "of",
  "in",
  "on",
  "for",
  "is",
  "are",
  "was",
  "were",
  "be",
  "by",
  "with",
  "from",
  "that",
  "this",
  "it",
  "as",
  "at",
  "my",
  "our",
  "their",
  "they",
  "we",
  "you",
  "i",
  "me",
  "not",
  "no",
  "yes",
  "can",
  "cannot",
  "cant",
  "don't",
  "dont",
  "into",
  "about",
  "than",
  "then",
  "too",
  "very",
  "just",
  "been",
  "have",
  "has",
  "had",
  "will",
  "would",
  "could",
  "should",
  "may",
  "might",
  "also",
  "more",
  "most",
  "some",
  "any",
  "all",
]);

const KEYWORD_TO_CONDUCT: Record<string, ConductTag[]> = {
  tie: ["tying"],
  tying: ["tying"],
  bundle: ["tying"],
  bundled: ["tying"],
  exclusive: ["exclusivity"],
  exclusivity: ["exclusivity"],
  preferencing: ["self_preferencing"],
  "self-preferencing": ["self_preferencing"],
  ranking: ["self_preferencing", "discrimination"],
  suspend: ["platform_suspension"],
  suspension: ["platform_suspension"],
  banned: ["platform_suspension"],
  delisted: ["platform_suspension"],
  merger: ["merger"],
  acquisition: ["merger"],
  acquired: ["merger"],
  cartel: ["cartel_coordination", "price_fix"],
  collusion: ["cartel_coordination", "price_fix"],
  coordinate: ["cartel_coordination"],
  pricing: ["price_fix", "predatory_pricing"],
  monopoly: ["abuse_of_dominance"],
  dominant: ["abuse_of_dominance"],
  dominance: ["abuse_of_dominance"],
  interoperable: ["interoperability"],
  interoperability: ["interoperability"],
  api: ["interoperability", "refusal_to_deal"],
  payment: ["tying", "self_preferencing"],
  payments: ["tying", "self_preferencing"],
  resale: ["resale_restriction"],
  dealer: ["vertical_restraint"],
  distributor: ["vertical_restraint"],
  discrimination: ["discrimination"],
  lockin: ["data_lockin"],
  "lock-in": ["data_lockin"],
  portability: ["data_lockin", "interoperability"],
  search: ["self_preferencing", "abuse_of_dominance"],
  app: ["tying", "platform_suspension"],
  store: ["tying", "self_preferencing"],
  amazon: ["self_preferencing", "discrimination"],
  google: ["self_preferencing", "exclusivity", "abuse_of_dominance"],
  apple: ["tying", "platform_suspension"],
  meta: ["merger", "abuse_of_dominance"],
  facebook: ["merger", "abuse_of_dominance"],
  microsoft: ["tying", "merger"],
};

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function caseHaystack(c: CompetitionCase): string {
  return [
    c.name,
    c.shortName,
    c.summary,
    c.regulatorArgument,
    c.outcome,
    c.remedies ?? "",
    c.plainEnglish.inOneMinute,
    c.plainEnglish.bottomLine,
    ...c.plainEnglish.theStory,
    ...c.plainEnglish.whyItMatters,
    ...c.plainEnglish.whatWasClaimed,
    ...c.markets,
    ...c.conduct,
    ...c.companies,
    ...c.timeline.map((t) => `${t.title} ${t.detail}`),
  ]
    .join(" ")
    .toLowerCase();
}

function jurisdictionOk(
  c: CompetitionCase,
  jurisdiction: Jurisdiction,
): boolean {
  if (jurisdiction === "Both") return true;
  return (
    c.jurisdictions.includes(jurisdiction) ||
    c.jurisdictions.includes("Both")
  );
}

export function searchCasesByKeywords(
  text: string,
  opts?: {
    conduct?: ConductTag[];
    jurisdiction?: Jurisdiction;
    limit?: number;
  },
): CompetitionCase[] {
  const jurisdiction = opts?.jurisdiction ?? "Both";
  const limit = opts?.limit ?? 150;
  const tokens = tokenize(text);
  const conduct = new Set<ConductTag>(opts?.conduct ?? []);

  for (const token of tokens) {
    const mapped = KEYWORD_TO_CONDUCT[token];
    if (mapped) mapped.forEach((t) => conduct.add(t));
  }

  const scored = cases
    .map((c) => {
      if (!jurisdictionOk(c, jurisdiction)) return null;
      const hay = caseHaystack(c);
      let score = 0;

      for (const token of tokens) {
        if (hay.includes(token)) score += 3;
        // light stem: match plurals / ing
        if (token.endsWith("s") && hay.includes(token.slice(0, -1))) score += 1;
      }

      const phrase = text.trim().toLowerCase();
      if (phrase.length > 8 && hay.includes(phrase)) score += 8;

      const overlap = c.conduct.filter((t) => conduct.has(t)).length;
      score += overlap * 2;

      if (tokens.length === 0 && overlap === 0 && (opts?.conduct?.length ?? 0) === 0) {
        score += 0.1; // allow browsing full library when empty? handled by caller
      }

      return score > 0 ? { c, score } : null;
    })
    .filter(Boolean) as { c: CompetitionCase; score: number }[];

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.c);
}

export function findSimilarCasesHybrid(input: {
  text: string;
  conduct: ConductTag[];
  jurisdiction: Jurisdiction;
  limit?: number;
}): CompetitionCase[] {
  const { text, conduct, jurisdiction, limit = 120 } = input;
  const trimmed = text.trim();

  if (trimmed.length >= 2) {
    // Keyword-first across the whole library
    const byKeywords = searchCasesByKeywords(trimmed, {
      conduct,
      jurisdiction,
      limit,
    });
    if (byKeywords.length > 0) return byKeywords;
  }

  // Tag-only fallback
  const scored = cases
    .map((c) => {
      if (!jurisdictionOk(c, jurisdiction)) {
        return { c, score: 0 };
      }
      const overlap = c.conduct.filter((t) => conduct.includes(t)).length;
      return { c, score: overlap };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((x) => x.c);
}
