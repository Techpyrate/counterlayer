"use client";

import { PageWrap } from "@/components/PageWrap";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { roles, situations } from "@/data/situations";
import type { Jurisdiction, Role } from "@/data/types";
import { buildAnalysis } from "@/lib/analyze";
import { briefToCreatorScript } from "@/lib/script";
import { ChoiceChip, SectionLabel } from "@/components/Ui";

export function RightsWizard({
  mode = "rights",
}: {
  mode?: "rights" | "file";
}) {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<Role | null>(null);
  const [situationId, setSituationId] = useState<string | null>(null);
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("Both");
  const [freeText, setFreeText] = useState("");
  const [companyQuery, setCompanyQuery] = useState("");
  const [scriptFormat, setScriptFormat] = useState<
    "youtube" | "short" | "newsletter" | "linkedin"
  >("youtube");
  const [showScript, setShowScript] = useState(false);

  useEffect(() => {
    const preset = searchParams.get("role");
    if (preset === "consumer") {
      setRole("consumer");
    }
  }, [searchParams]);

  const brief = useMemo(() => {
    if (!role || !situationId) return null;
    return buildAnalysis({
      situationId,
      role,
      jurisdiction,
      freeText,
      companyQuery,
    });
  }, [role, situationId, jurisdiction, freeText, companyQuery]);

  const script = useMemo(() => {
    if (!brief) return "";
    return briefToCreatorScript(brief, scriptFormat);
  }, [brief, scriptFormat]);

  return (
    <PageWrap className="py-10 sm:py-14">
      <div className="flex flex-wrap items-center gap-3 text-sm text-mute">
        <Link href="/consumers" className="font-medium text-ink-soft hover:text-ink">
          ← Consumer hub
        </Link>
      </div>
      <SectionLabel>
        {mode === "file"
          ? role === "consumer"
            ? "Where can I complain?"
            : "What can I file?"
          : role === "consumer"
            ? "Consumer rights"
            : "Know your rights"}
      </SectionLabel>
      <h1 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-ink md:text-5xl">
        {mode === "file"
          ? role === "consumer"
            ? "Find a consumer complaint channel"
            : "Map your situation to possible pathways"
          : role === "consumer"
            ? "What happened, and what can you do?"
            : "Who are you, and what happened?"}
      </h1>
      <p className="mt-4 max-w-2xl text-ink-soft/80">
        {role === "consumer"
          ? "Focus on unfair billing, deceptive offers, access problems, and other buyer harms. We guide you to consumer-protection complaint channels — a practical help tool, not a lawsuit filer. Not a law firm. Not a substitute for counsel."
          : "Structured intake that maps your situation to pathways, evidence, and similar cases. We guide and organize — decisions remain yours. Not a law firm. Not a substitute for counsel."}
      </p>

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            I am a…
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {roles.map((r) => (
              <ChoiceChip
                key={r.id}
                active={role === r.id}
                onClick={() => setRole(r.id)}
              >
                {r.label}
              </ChoiceChip>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            What happened?
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {situations.map((s) => (
              <ChoiceChip
                key={s.id}
                active={situationId === s.id}
                onClick={() => setSituationId(s.id)}
              >
                {s.label}
              </ChoiceChip>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
              Jurisdiction focus
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["US", "EU", "Both"] as Jurisdiction[]).map((j) => (
                <ChoiceChip
                  key={j}
                  active={jurisdiction === j}
                  onClick={() => setJurisdiction(j)}
                >
                  {j}
                </ChoiceChip>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold uppercase tracking-wider text-mute">
              Optional detail
            </label>
            <textarea
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              rows={3}
              placeholder="e.g. Amazon suspended my seller account and I believe competing sellers with similar metrics remain active…"
              className="mt-3 w-full rounded-xl border border-[var(--line)] bg-paper/80 px-4 py-3 text-sm outline-none ring-signal/40 focus:ring-2"
            />
            <input
              value={companyQuery}
              onChange={(e) => setCompanyQuery(e.target.value)}
              placeholder="Company name (optional)"
              className="mt-3 w-full rounded-xl border border-[var(--line)] bg-paper/80 px-4 py-3 text-sm outline-none ring-signal/40 focus:ring-2"
            />
          </div>
        </section>
      </div>

      {brief && (
        <div className="mt-14 space-y-12 border-t border-[var(--line)] pt-12">
          <div>
            <SectionLabel>Potential legal / competition issues</SectionLabel>
            <ul className="mt-4 space-y-2">
              {brief.potentialIssues.map((issue) => (
                <li
                  key={issue}
                  className="border-l-2 border-signal pl-4 text-ink-soft"
                >
                  {issue}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionLabel>Relevant law</SectionLabel>
            <div className="mt-4 divide-y divide-[var(--line)]">
              {brief.laws.map((law) => (
                <div key={law.id} className="py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-ink">{law.name}</h3>
                    <span className="text-xs text-mute">
                      {law.citation} · {law.jurisdiction}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-soft/90">{law.summary}</p>
                  {law.url && (
                    <a
                      href={law.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-sm font-medium text-signal-dim underline-offset-2 hover:underline"
                    >
                      Primary source
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Who can potentially raise this</SectionLabel>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">
              {brief.whoCanFile[0]}
            </p>
          </div>

          <div>
            <SectionLabel>Possible pathways</SectionLabel>
            <p className="mt-2 text-sm text-mute">
              This does not mean you have a valid legal claim. Each avenue has
              different thresholds and purposes.
            </p>
            <div className="mt-6 space-y-6">
              {brief.filingPaths.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-[var(--line)] bg-paper/50 p-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                      {p.name}
                    </h3>
                    <span className="text-xs uppercase tracking-wider text-mute">
                      {p.jurisdiction}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-mute">{p.agency}</p>
                  <p className="mt-3 text-sm text-ink-soft">
                    <span className="font-medium">Why it may be relevant: </span>
                    {p.whenRelevant}
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">
                    <span className="font-medium">How people typically start: </span>
                    {p.howToStart}
                  </p>
                  <p className="mt-2 text-sm text-mute">{p.standingNotes}</p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-signal-dim underline-offset-2 hover:underline"
                  >
                    Official resource →
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Evidence that usually matters</SectionLabel>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink-soft">
              {brief.evidenceMatters.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>

          <div>
            <SectionLabel>Similar cases</SectionLabel>
            <div className="mt-4 space-y-4">
              {brief.similarCases.map((c) => (
                <Link
                  key={c.id}
                  href={`/cases/${c.id}`}
                  className="block border-t border-[var(--line)] py-4 hover:bg-fog/40"
                >
                  <h3 className="font-semibold text-ink">{c.shortName}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{c.summary}</p>
                  <p className="mt-1 text-sm text-mute">
                    Regulators argued: {c.regulatorArgument}
                  </p>
                  <p className="mt-1 text-sm text-mute">Outcome: {c.outcome}</p>
                </Link>
              ))}
            </div>
          </div>

          {brief.companyMatches.length > 0 && (
            <div>
              <SectionLabel>Company matches</SectionLabel>
              <div className="mt-3 flex flex-wrap gap-3">
                {brief.companyMatches.map((c) => (
                  <Link
                    key={c.id}
                    href={`/companies/${c.id}`}
                    className="rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:bg-fog"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div>
            <SectionLabel>Caveats</SectionLabel>
            <ul className="mt-3 space-y-2 text-sm text-mute">
              {brief.caveats.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-ink p-6 text-fog md:p-8">
            <SectionLabel>
              <span className="text-signal">Creator script</span>
            </SectionLabel>
            <p className="mt-2 text-sm text-fog/70">
              Turn this brief into content material — with built-in guardrails.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(
                [
                  ["youtube", "YouTube"],
                  ["short", "Short / Reel"],
                  ["newsletter", "Newsletter"],
                  ["linkedin", "LinkedIn"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setScriptFormat(id);
                    setShowScript(true);
                  }}
                  className={`rounded-full px-3 py-1.5 text-sm ${
                    scriptFormat === id && showScript
                      ? "bg-signal text-ink"
                      : "bg-fog/10 text-fog hover:bg-fog/20"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {showScript && (
              <pre className="mt-6 max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-xl bg-ink-soft/80 p-4 text-xs leading-relaxed text-fog/90 md:text-sm">
                {script}
              </pre>
            )}
          </div>
        </div>
      )}
    </PageWrap>
  );
}
