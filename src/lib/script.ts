import type { AnalysisBrief } from "@/data/types";
import { situationById } from "@/data/situations";
import { roles } from "@/data/situations";

export function briefToCreatorScript(
  brief: AnalysisBrief,
  format: "youtube" | "short" | "newsletter" | "linkedin" = "youtube",
): string {
  const situation = situationById[brief.situationId];
  const roleLabel =
    roles.find((r) => r.id === brief.role)?.label ?? brief.role;
  const title = situation?.label ?? "Competition issue";
  const caseLines = brief.similarCases
    .slice(0, 3)
    .map(
      (c) =>
        `- ${c.shortName} (${c.yearStart}${c.yearEnd ? `–${c.yearEnd}` : ""}): ${c.outcome}`,
    )
    .join("\n");
  const lawLines = brief.laws
    .slice(0, 4)
    .map((l) => `- ${l.name} (${l.citation})`)
    .join("\n");
  const pathLines = brief.filingPaths
    .slice(0, 4)
    .map((p) => `- ${p.name} — ${p.agency}`)
    .join("\n");

  const disclaimer =
    "DISCLAIMER TO READ ON AIR: CounterLayer is a diligence and guidance platform — not a law firm and not a substitute for counsel. This commentary does not accuse any company of breaking the law.";

  if (format === "short") {
    return `${disclaimer}

HOOK: What if the thing that feels “unfair” on a platform is also a competition story regulators have seen before?

SITUATION (${roleLabel}): ${title}
${brief.freeText ? `User detail: ${brief.freeText}` : ""}

3 BEATS (45–60s):
1) Name the conduct in plain English — not “monopoly,” but the behavior (${situation?.conduct.join(", ")}).
2) One similar precedent: ${brief.similarCases[0]?.shortName ?? "see case library"} — what regulators argued, what happened.
3) Pathways exist (agency tip ≠ automatic lawsuit). Evidence that matters: ${brief.evidenceMatters[0] ?? "documents and timelines"}.

END: “Know the power relationship. Know what happened before. Don’t overclaim.”`;
  }

  if (format === "newsletter") {
    return `Subject: ${title} — what competition law might care about

${disclaimer}

For a ${roleLabel} facing: ${title}

What may be at issue
${brief.potentialIssues.map((i) => `• ${i}`).join("\n")}

Law touchpoints (${brief.jurisdiction})
${lawLines}

Similar cases
${caseLines}

If you explore filing avenues (exploratory only)
${pathLines}

Evidence checklist
${brief.evidenceMatters.map((e) => `• ${e}`).join("\n")}

Editor note: Always separate “this feels unfair” from “this is an antitrust violation.”`;
  }

  if (format === "linkedin") {
    return `${disclaimer}

Most people ask: “Is this a monopoly?”
Better question: “What conduct is this, who has power, and has a regulator seen it before?”

Role: ${roleLabel}
Situation: ${title}

Potential competition themes:
${brief.potentialIssues.map((i) => `→ ${i}`).join("\n")}

Precedent worth studying:
${caseLines || "→ Browse the case library"}

If you’re documenting a problem, start with evidence — not accusations.
${brief.evidenceMatters.slice(0, 3).map((e) => `• ${e}`).join("\n")}

#CompetitionLaw #Antitrust #ConsumerRights`;
  }

  // youtube long-form
  return `${disclaimer}

TITLE OPTIONS:
1) ${title}: What Competition Law Actually Looks At
2) Has This Happened Before? ${brief.similarCases[0]?.shortName ?? "Landmark cases"} Explained
3) ${roleLabel} Rights When ${title}

COLD OPEN (0:00–0:40)
“You’re a ${roleLabel}. Something like this happened: ${title}.
${brief.freeText ? `Specifically: ${brief.freeText}` : ""}
The question isn’t ‘is this company evil?’ — it’s ‘does this conduct raise competition issues regulators and courts have analyzed before?’”

ACT 1 — NAME THE CONDUCT
Explain in plain language:
${brief.potentialIssues.map((i) => `- ${i}`).join("\n")}
Conduct tags: ${situation?.conduct.join(", ")}

ACT 2 — THE LAW (LIGHT TOUCH)
Jurisdiction focus: ${brief.jurisdiction}
${lawLines}
Say out loud: statutes are starting points; facts control.

ACT 3 — HAS THIS HAPPENED BEFORE?
${caseLines}
For each case: allegation → what authorities argued → outcome/remedy → what is NOT the same as your facts.

ACT 4 — WHAT PEOPLE ACTUALLY DO
Who can raise issues as a ${roleLabel}:
${brief.whoCanFile.join("\n")}
Possible avenues (not recommendations):
${pathLines}
Evidence that usually matters:
${brief.evidenceMatters.map((e) => `- ${e}`).join("\n")}

ACT 5 — GUARDRAILS
${brief.caveats.map((c) => `- ${c}`).join("\n")}

CTA
“If you’re making content: cite sources, separate consumer-protection from antitrust, and never invent a court finding.”

SOURCES TO SHOW ON SCREEN
${brief.laws
  .map((l) => `- ${l.name}: ${l.url ?? l.citation}`)
  .join("\n")}
${brief.similarCases
  .flatMap((c) => c.sources.map((s) => `- ${c.shortName}: ${s.url}`))
  .slice(0, 6)
  .join("\n")}
`;
}
