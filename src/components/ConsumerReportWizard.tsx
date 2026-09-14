"use client";

import { PageWrap } from "@/components/PageWrap";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Jurisdiction } from "@/data/types";
import {
  buildComplaintDraft,
  consumerIssueCategories,
  consumerIssuesForCategory,
  getConsumerIssue,
  pathwaysForIssue,
  type ConsumerIssueCategory,
  type ConsumerIssueId,
} from "@/data/consumerReport";
import { findSimilarCasesHybrid } from "@/lib/caseSearch";
import { ChoiceChip, SectionLabel } from "@/components/Ui";

const needsCustomTitle = (id: ConsumerIssueId | null) =>
  id === "other" || id === "custom";

export function ConsumerReportWizard() {
  const [category, setCategory] = useState<ConsumerIssueCategory>("billing");
  const [issueId, setIssueId] = useState<ConsumerIssueId | null>(null);
  const [customIssueTitle, setCustomIssueTitle] = useState("");
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("US");
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [detail, setDetail] = useState("");
  const [copied, setCopied] = useState(false);

  const issue = issueId ? getConsumerIssue(issueId) : null;
  const categoryIssues = consumerIssuesForCategory(category);
  const showCustomTitle = needsCustomTitle(issueId);
  const customTitleRequired = issueId === "custom";
  const canShowReport =
    issue &&
    (!customTitleRequired || customIssueTitle.trim().length > 0);

  const pathways = useMemo(() => {
    if (!issue) return [];
    return pathwaysForIssue(issue, jurisdiction);
  }, [issue, jurisdiction]);

  const draft = useMemo(() => {
    if (!issue || !canShowReport) return "";
    return buildComplaintDraft({
      issue,
      customIssueLabel:
        showCustomTitle && customIssueTitle.trim()
          ? customIssueTitle.trim()
          : undefined,
      company,
      product,
      location,
      detail,
      dates,
    });
  }, [
    issue,
    canShowReport,
    showCustomTitle,
    customIssueTitle,
    company,
    product,
    location,
    detail,
    dates,
  ]);

  const similar = useMemo(() => {
    if (!issue || !canShowReport) return [];
    const label =
      showCustomTitle && customIssueTitle.trim()
        ? customIssueTitle.trim()
        : issue.label;
    const text = `${label} ${company} ${product} ${detail}`;
    return findSimilarCasesHybrid({
      text,
      conduct: [],
      jurisdiction,
      limit: 6,
    });
  }, [
    issue,
    canShowReport,
    showCustomTitle,
    customIssueTitle,
    company,
    product,
    detail,
    jurisdiction,
  ]);

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function selectCategory(next: ConsumerIssueCategory) {
    setCategory(next);
    setIssueId(null);
    setCustomIssueTitle("");
  }

  function selectIssue(id: ConsumerIssueId) {
    setIssueId(id);
    if (!needsCustomTitle(id)) {
      setCustomIssueTitle("");
    }
  }

  return (
    <PageWrap className="py-10 sm:py-14">
      <div className="flex flex-wrap items-center gap-3 text-sm text-mute">
        <Link href="/consumers" className="font-medium text-ink-soft hover:text-ink">
          ← Consumer hub
        </Link>
      </div>
      <SectionLabel>Consumer protection</SectionLabel>
      <h1 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-bold text-ink md:text-5xl">
        Report a problem
      </h1>
      <p className="mt-4 max-w-2xl text-ink-soft/80">
        For everyday buyer problems — billing traps, refunds, hidden fees,
        deceptive offers, delivery issues. We guide you through an evidence
        checklist, complaint portals, and a copy-paste draft. We do not file for
        you. Not a law firm. Not a substitute for counsel.
      </p>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
          1. What happened?
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-soft">
          Choose a category, then pick the closest match — or use{" "}
          <strong className="font-medium text-ink">Fully custom</strong> to describe
          everything yourself.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {consumerIssueCategories.map((c) => (
            <ChoiceChip
              key={c.id}
              active={category === c.id}
              onClick={() => selectCategory(c.id)}
            >
              {c.label}
            </ChoiceChip>
          ))}
        </div>
        <p className="mt-3 text-sm text-mute">
          {consumerIssueCategories.find((c) => c.id === category)?.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {categoryIssues.map((i) => (
            <ChoiceChip
              key={i.id}
              active={issueId === i.id}
              onClick={() => selectIssue(i.id)}
            >
              {i.label}
            </ChoiceChip>
          ))}
        </div>

        {showCustomTitle && (
          <div className="mt-6 max-w-xl">
            <label className="text-xs font-semibold uppercase tracking-wider text-mute">
              {issueId === "custom"
                ? "Your issue title (required)"
                : "Short title for your issue (optional)"}
            </label>
            <input
              value={customIssueTitle}
              onChange={(e) => setCustomIssueTitle(e.target.value)}
              placeholder={
                issueId === "custom"
                  ? "e.g. Gym membership won't cancel after move"
                  : "e.g. Streaming bundle I never agreed to"
              }
              className="mt-2 w-full rounded-xl border border-[var(--line)] bg-paper/80 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-signal/30"
            />
          </div>
        )}

        <div className="mt-6">
          <label className="text-xs font-semibold uppercase tracking-wider text-mute">
            Describe what happened
            {issueId ? " (recommended)" : ""}
          </label>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            rows={5}
            placeholder="Timeline, what you paid, what you were told, what you want fixed… You can start typing before picking an issue — we'll use it in your draft."
            className="mt-2 w-full rounded-xl border border-[var(--line)] bg-paper/80 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-signal/30"
          />
        </div>

        {issueId === "custom" && !customIssueTitle.trim() && (
          <p className="mt-3 text-sm text-amber-800">
            Add a short issue title above to generate your report pack.
          </p>
        )}
      </section>

      {issue && canShowReport && (
        <>
          <section className="mt-10 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
                2. Jurisdiction focus
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
            <p className="self-end text-sm text-ink-soft">{issue.description}</p>
          </section>

          <section className="mt-10 grid gap-4 md:grid-cols-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-mute md:col-span-2">
              3. Details
            </h2>
            <Field
              label="Company"
              value={company}
              onChange={setCompany}
              placeholder="e.g. Acme Streaming"
            />
            <Field
              label="Product / service"
              value={product}
              onChange={setProduct}
              placeholder="e.g. Premium subscription"
            />
            <Field
              label="Where you are"
              value={location}
              onChange={setLocation}
              placeholder="City, state or country"
            />
            <Field
              label="Approximate dates"
              value={dates}
              onChange={setDates}
              placeholder="e.g. March–April 2026"
            />
          </section>

          <section className="mt-14 space-y-10 border-t border-[var(--line)] pt-10">
            <div>
              <SectionLabel>Why this may be a consumer issue</SectionLabel>
              <LaneCard
                title="Consumer protection"
                body={issue.whyConsumerProtectionMayMatter}
                tone="signal"
              />
            </div>

            <div>
              <SectionLabel>Evidence checklist</SectionLabel>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink-soft">
                {issue.evidence.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>

            <div>
              <SectionLabel>
                Where to complain (consumer-protection portals)
              </SectionLabel>
              <p className="mt-2 text-sm text-mute">
                CounterLayer does not file for you. Open the agency site, paste
                your draft, and attach evidence. These are consumer-complaint
                channels — not antitrust lawsuit tools.
              </p>
              <div className="mt-6 space-y-4">
                {pathways.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-[var(--line)] bg-paper/60 p-5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                        {friendlyPathwayName(p.id, p.name)}
                      </h3>
                      <span className="text-xs uppercase tracking-wider text-mute">
                        {p.jurisdiction}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-mute">{p.agency}</p>
                    <p className="mt-3 text-sm text-ink-soft">{p.whenRelevant}</p>
                    <p className="mt-2 text-sm text-mute">{p.standingNotes}</p>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-sm font-semibold text-signal-dim underline-offset-2 hover:underline"
                    >
                      Open official resource →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-ink p-6 text-fog md:p-8">
              <SectionLabel>
                <span className="text-signal">Complaint draft</span>
              </SectionLabel>
              <p className="mt-2 text-sm text-fog/70">
                Edit before sending. Not a formal filing.
              </p>
              <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap rounded-xl bg-ink-soft/80 p-4 text-xs leading-relaxed text-fog/90 md:text-sm">
                {draft}
              </pre>
              <button
                type="button"
                onClick={copyDraft}
                className="mt-4 rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-ink"
              >
                {copied ? "Copied" : "Copy draft"}
              </button>
            </div>

            {similar.length > 0 && (
              <div>
                <SectionLabel>Related enforcement to read</SectionLabel>
                <p className="mt-2 text-sm text-mute">
                  Plain-English summaries that may resemble your situation —
                  often consumer-protection matters, not court findings that
                  apply to your case.
                </p>
                <ul className="mt-4 space-y-3">
                  {similar.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/cases/${c.id}`}
                        className="text-sm font-medium text-signal-dim underline-offset-2 hover:underline"
                      >
                        {c.shortName} →
                      </Link>
                      <p className="text-sm text-mute">{c.plainEnglish.inOneMinute}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-xs text-mute">
              We guide you through documenting a complaint pack. An agency
              complaint informs priorities; it does not mean you win money
              automatically or that any company violated the law. Not a law firm.
              Not a substitute for counsel.
            </p>
          </section>
        </>
      )}
    </PageWrap>
  );
}

function friendlyPathwayName(id: string, fallback: string) {
  if (id === "ftc-complaint") return "FTC consumer complaint";
  if (id === "state-ag") return "State attorney general (consumer)";
  if (id === "consumer-protection") return "Consumer-protection complaint";
  return fallback;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-mute">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-[var(--line)] bg-paper/80 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-signal/30"
      />
    </div>
  );
}

function LaneCard({
  title,
  body,
  tone,
}: {
  title: string;
  body: string;
  tone: "signal" | "mute";
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        tone === "signal"
          ? "border-signal/40 bg-signal/10"
          : "border-[var(--line)] bg-paper/50"
      }`}
    >
      <h3 className="font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}
