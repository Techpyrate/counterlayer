"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Jurisdiction } from "@/data/types";
import {
  questionsForAudience,
  scoreCompliance,
  type Answer,
  type CheckAudience,
} from "@/data/complianceCheck";
import { findSimilarCasesHybrid } from "@/lib/caseSearch";
import type { ScanProgressEvent, SiteScanResult } from "@/lib/siteScan";
import { downloadBusinessPdfReport } from "@/lib/pdfReport";
import { useAuth } from "@/lib/auth";
import { recordBusinessScan, recordReportExport } from "@/lib/accountActivity";
import { ChoiceChip, SectionLabel } from "@/components/Ui";
import { PageWrap } from "@/components/PageWrap";
import {
  BusinessTypeCardPicker,
  selectedAudienceBlurb,
} from "@/components/BusinessTypePicker";
import {
  QuestionnaireVisualReport,
  ScanVisualReport,
} from "@/components/BusinessReportVisuals";

type ScanUiState = {
  message: string;
  current: number;
  total: number;
  url: string;
  liveFindings: number;
};

export function ComplianceCheckWizard() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [audience, setAudience] = useState<CheckAudience | null>(null);
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("Both");
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [submitted, setSubmitted] = useState(false);
  const [website, setWebsite] = useState(() => searchParams.get("url")?.trim() ?? "");
  const [scanLoading, setScanLoading] = useState(false);
  const [scan, setScan] = useState<SiteScanResult | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [scanUi, setScanUi] = useState<ScanUiState>({
    message: "Starting…",
    current: 0,
    total: 0,
    url: "",
    liveFindings: 0,
  });

  const questions = useMemo(
    () => (audience ? questionsForAudience(audience) : []),
    [audience],
  );

  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const ready = Boolean(audience && answeredCount === questions.length);

  const result = useMemo(() => {
    if (!audience || !submitted) return null;
    return scoreCompliance({ audience, answers, jurisdiction });
  }, [audience, answers, jurisdiction, submitted]);

  const similar = useMemo(() => {
    if (!result && !scan) return [];
    const conduct = result?.flags.flatMap((f) => f.conduct) ?? [];
    const text = [
      result?.flags.map((f) => f.theme).join(" ") ?? "",
      scan?.findings.map((f) => f.title).join(" ") ?? "",
    ].join(" ");
    return findSimilarCasesHybrid({
      text: text || website,
      conduct,
      jurisdiction,
      limit: 8,
    });
  }, [result, jurisdiction, scan, website]);

  // Scan-only: business type + successful crawl
  const canPdfScan = Boolean(audience && scan?.fetchedOk);
  // Full report: complete steps 1–4 (type, jurisdiction, all answers + risk map) AND scan
  const checklistDone = Boolean(ready && result);
  const canPdfFull = Boolean(canPdfScan && checklistDone);
  const canScan = Boolean(audience && website.trim() && !scanLoading);

  function setAnswer(id: string, value: Answer) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setSubmitted(false);
  }

  function resetAnswers() {
    setAnswers({});
    setSubmitted(false);
  }

  async function runSiteScan() {
    if (!audience) {
      setScanError("Select what kind of business you are before scanning.");
      return;
    }
    setScanError(null);
    setScanLoading(true);
    setScan(null);
    setScanUi({
      message: "Connecting…",
      current: 0,
      total: 0,
      url: "",
      liveFindings: 0,
    });

    try {
      const res = await fetch("/api/site-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: website }),
      });

      if (!res.ok || !res.body) {
        const err = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setScanError(err?.error || "Scan failed.");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let findingCount = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          let event: ScanProgressEvent;
          try {
            event = JSON.parse(line) as ScanProgressEvent;
          } catch {
            continue;
          }

          if (event.type === "status") {
            setScanUi((s) => ({ ...s, message: event.message }));
          } else if (event.type === "progress") {
            setScanUi((s) => ({
              ...s,
              message: `Scanning page ${event.current} of ~${event.total}`,
              current: event.current,
              total: event.total,
              url: event.url,
            }));
          } else if (event.type === "finding") {
            findingCount += 1;
            setScanUi((s) => ({
              ...s,
              liveFindings: findingCount,
              message: `Flagged: ${event.finding.title}`,
            }));
          } else if (event.type === "done") {
            setScan(event.result);
            if (user && audience && event.result.fetchedOk) {
              recordBusinessScan(user.id, {
                url: website.trim(),
                audience,
                jurisdiction,
                scan: event.result,
                hasQuestionnaire: submitted,
              });
            }
            if (event.result.error && !event.result.fetchedOk) {
              setScanError(event.result.error);
            }
          }
        }
      }
    } catch {
      setScanError("Could not reach the scan service.");
    } finally {
      setScanLoading(false);
    }
  }

  function exportPdf(mode: "scan" | "full") {
    if (!audience) return;
    if (mode === "full" && !canPdfFull) return;
    if (mode === "scan" && !canPdfScan) return;
    downloadBusinessPdfReport({
      website,
      audience,
      jurisdiction,
      scan,
      questionnaire: mode === "full" ? result : null,
    });
    if (user && website.trim()) {
      recordReportExport(user.id, {
        url: website.trim(),
        exportKind:
          mode === "full" ? "business_full_pdf" : "business_scan_pdf",
      });
    }
  }

  return (
    <>
      {scanLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 px-4 backdrop-blur-sm">
          <div
            className="w-full max-w-lg rounded-2xl bg-paper p-6 shadow-xl sm:p-8"
            role="alertdialog"
            aria-modal="true"
            aria-busy="true"
            aria-label="Website scan in progress"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal-dim">
              Full-site scan running
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
              Please wait — do not leave this page
            </h2>
            <p className="mt-3 text-sm text-ink-soft">{scanUi.message}</p>
            {scanUi.total > 0 && (
              <div className="mt-5">
                <div className="mb-2 flex justify-between text-xs text-mute">
                  <span>
                    {scanUi.current} / {scanUi.total} pages
                  </span>
                  <span>{scanUi.liveFindings} flags so far</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-fog-deep">
                  <div
                    className="h-full rounded-full bg-signal transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        (scanUi.current / Math.max(scanUi.total, 1)) * 100,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}
            {scanUi.url && (
              <p className="mt-4 break-all text-xs text-mute">{scanUi.url}</p>
            )}
            <p className="mt-5 text-xs text-mute">
              Nested sitemaps, policy PDFs, allowlisted off-site hosts, and
              selective JS rendering. Interaction is locked until the scan
              finishes.
            </p>
          </div>
        </div>
      )}

      <PageWrap
        className={`py-10 sm:py-14 ${scanLoading ? "pointer-events-none select-none opacity-40" : ""}`}
      >
        <SectionLabel>
          For founders, developers & small-business owners
        </SectionLabel>
        <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Scan My Business
        </h1>
        <p className="mt-4 max-w-3xl text-base text-ink-soft/80 sm:text-lg">
          Tell us what you run, review your public site, answer the owner
          checklist, then download a visual PDF diligence report before you go
          live.
        </p>
        <p className="mt-3 text-sm text-mute">
          Need a control-matrix compliance report with policy uploads instead?{" "}
          <Link href="/assess" className="font-medium text-ink underline">
            Open Compliance scan
          </Link>
          .
        </p>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            1. What kind of business are you?{" "}
            <span className="text-danger">*</span>
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Required before scanning — shapes the owner checklist and which
            plugins apply. Pick the closest match, or{" "}
            <span className="font-medium text-ink">General commercial site</span>{" "}
            for the broadest coverage.
          </p>
          <div className="mt-4">
            <BusinessTypeCardPicker
              value={audience}
              disabled={scanLoading}
              onChange={(id) => {
                setAudience(id);
                resetAnswers();
                setScanError(null);
              }}
            />
          </div>
          {audience && selectedAudienceBlurb(audience) && (
            <p className="mt-4 max-w-2xl text-sm text-ink-soft">
              {selectedAudienceBlurb(audience)}
            </p>
          )}
          {!audience && (
            <p className="mt-3 text-sm text-danger">
              Select a business type to unlock the website scan and reports.
            </p>
          )}
        </section>

        <section
          className={`mt-10 ${!audience ? "pointer-events-none opacity-45" : ""}`}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            2. Jurisdiction focus <span className="text-danger">*</span>
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["US", "EU", "Both"] as Jurisdiction[]).map((j) => (
              <ChoiceChip
                key={j}
                active={jurisdiction === j}
                onClick={() => {
                  if (scanLoading || !audience) return;
                  setJurisdiction(j);
                  setSubmitted(false);
                }}
              >
                {j}
              </ChoiceChip>
            ))}
          </div>
        </section>

        <section
          className={`mt-10 rounded-2xl border border-[var(--line)] bg-paper/80 p-4 sm:p-6 ${
            !audience ? "pointer-events-none opacity-45" : ""
          }`}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            3. Public site review
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Nested sitemaps + robots, common legal/commerce paths, allowlisted
            off-site policy hosts, policy PDFs, and selective JS rendering for
            thin/SPA pages (up to ~50 public URLs) — not just your homepage.
          </p>
          {!audience && (
            <p className="mt-3 rounded-xl border border-warn/40 bg-warn/10 px-3 py-2 text-sm text-ink">
              Complete step 1 (business type) before starting a scan.
            </p>
          )}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              disabled={scanLoading || !audience}
              placeholder="https://yourbusiness.com"
              className="min-w-0 flex-1 rounded-xl border border-[var(--line)] bg-paper px-4 py-3 text-base outline-none focus:ring-2 focus:ring-signal/30 disabled:opacity-50"
            />
            <button
              type="button"
              disabled={!canScan}
              onClick={runSiteScan}
              className="shrink-0 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-fog disabled:opacity-40"
            >
              Start full scan
            </button>
          </div>
          {scanError && <p className="mt-3 text-sm text-danger">{scanError}</p>}

          {scan && (
            <div className="mt-6 space-y-5 border-t border-[var(--line)] pt-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  disabled={!canPdfScan}
                  onClick={() => exportPdf("scan")}
                  className="rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-ink disabled:opacity-40"
                >
                  Download scan PDF only
                </button>
                <button
                  type="button"
                  disabled={!canPdfFull}
                  onClick={() => exportPdf("full")}
                  className="rounded-full border border-ink/20 bg-paper px-5 py-2.5 text-sm font-semibold text-ink disabled:opacity-40"
                >
                  Download full report (scan + checklist)
                </button>
              </div>
              {!canPdfFull && (
                <p className="text-xs text-mute">
                  Full report unlocks after you finish steps 1–4: business type,
                  jurisdiction, every owner checklist answer, and “Get my risk
                  map.” You can download the scan-only PDF now.
                </p>
              )}
              <p className="text-xs text-mute">
                Tap any finding or document card for details · PDF matches this
                visual report
              </p>

              <ScanVisualReport scan={scan} />

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-mute">
                  Pre-launch checklist
                </h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {scan.checklist.map((c) => (
                    <li
                      key={c}
                      className="rounded-xl border border-[var(--line)] bg-fog/40 px-3 py-2 text-sm text-ink-soft"
                    >
                      ☐ {c}
                    </li>
                  ))}
                </ul>
              </div>

              <details className="text-sm">
                <summary className="cursor-pointer font-medium text-ink">
                  Pages reviewed ({scan.pagesScanned.length})
                </summary>
                <ul className="mt-2 max-h-48 space-y-1 overflow-auto text-xs text-mute">
                  {scan.pagesScanned.map((p) => (
                    <li key={p} className="break-all">
                      {p}
                    </li>
                  ))}
                </ul>
              </details>
              <p className="text-xs text-mute">{scan.disclaimer}</p>
            </div>
          )}
        </section>

        {audience && (
          <section className="mt-10">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
                4. Owner checklist ({answeredCount}/{questions.length}){" "}
                <span className="text-danger">*</span>
              </h2>
              <button
                type="button"
                disabled={scanLoading}
                onClick={resetAnswers}
                className="text-sm text-mute underline-offset-2 hover:underline disabled:opacity-40"
              >
                Reset answers
              </button>
            </div>
            <p className="mt-2 text-sm text-ink-soft">
              Answer every question — required for your risk map and full PDF.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className={`rounded-2xl border p-4 sm:p-5 ${
                    answers[q.id]
                      ? "border-[var(--line)] bg-paper/50"
                      : "border-danger/30 bg-paper/50"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-signal-dim">
                    {idx + 1}. {q.theme}
                    {!answers[q.id] && (
                      <span className="ml-2 text-danger">required</span>
                    )}
                  </p>
                  <p className="mt-2 font-medium text-ink">{q.prompt}</p>
                  <p className="mt-2 text-sm text-mute">{q.help}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(
                      [
                        ["yes", "Yes"],
                        ["no", "No"],
                        ["unsure", "Not sure"],
                      ] as const
                    ).map(([id, label]) => (
                      <ChoiceChip
                        key={id}
                        active={answers[q.id] === id}
                        onClick={() => {
                          if (scanLoading) return;
                          setAnswer(q.id, id);
                        }}
                      >
                        {label}
                      </ChoiceChip>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={!ready || scanLoading}
                onClick={() => setSubmitted(true)}
                className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-fog disabled:opacity-40"
              >
                Get my risk map
              </button>
              <button
                type="button"
                disabled={!canPdfScan || scanLoading}
                onClick={() => exportPdf("scan")}
                className="rounded-full border border-ink/20 bg-paper px-6 py-3 text-sm font-semibold text-ink disabled:opacity-40"
              >
                Download scan PDF only
              </button>
              <button
                type="button"
                disabled={!canPdfFull || scanLoading}
                onClick={() => exportPdf("full")}
                className="rounded-full bg-signal px-6 py-3 text-sm font-semibold text-ink disabled:opacity-40"
              >
                Download full report
              </button>
            </div>
            {!ready && (
              <p className="mt-2 text-xs text-danger">
                Answer all {questions.length} questions to unlock your risk map
                and full report.
              </p>
            )}
            {ready && !result && (
              <p className="mt-2 text-xs text-mute">
                Click “Get my risk map” to finish step 4 and unlock the full
                report download.
              </p>
            )}
            {checklistDone && !scan?.fetchedOk && (
              <p className="mt-2 text-xs text-mute">
                Run the public site review (step 3) to attach site findings — required
                for both scan-only and full PDF downloads.
              </p>
            )}
            {canPdfScan && !canPdfFull && result && (
              <p className="mt-2 text-xs text-mute">
                Checklist complete — full report is ready. Or download scan-only
                above.
              </p>
            )}
          </section>
        )}

        {result && (
          <section className="mt-14 space-y-10 border-t border-[var(--line)] pt-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionLabel>Questionnaire results</SectionLabel>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={!canPdfScan}
                  onClick={() => exportPdf("scan")}
                  className="rounded-full border border-ink/20 bg-paper px-5 py-2.5 text-sm font-semibold text-ink disabled:opacity-40"
                >
                  Scan PDF only
                </button>
                <button
                  type="button"
                  disabled={!canPdfFull}
                  onClick={() => exportPdf("full")}
                  className="rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-ink disabled:opacity-40"
                >
                  Full report PDF
                </button>
              </div>
            </div>
            {!canPdfFull && (
              <p className="text-sm text-mute">
                Full PDF needs a completed site review plus this checklist.
                {!scan?.fetchedOk
                  ? " Run step 3 scan first."
                  : " Finish any remaining steps above."}
              </p>
            )}

            <QuestionnaireVisualReport
              result={result}
              answers={answers}
              scanFindingCount={scan?.findings.length ?? 0}
            />

            {similar.length > 0 && (
              <div>
                <SectionLabel>Related cases</SectionLabel>
                <p className="mt-2 text-sm text-mute">
                  Real matters that touch similar themes — context for your
                  situation, not proof that it matches.
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {similar.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-2xl border border-[var(--line)] bg-paper/70 p-4"
                    >
                      <Link
                        href={`/cases/${c.id}`}
                        className="text-sm font-medium text-signal-dim underline-offset-2 hover:underline"
                      >
                        {c.shortName} →
                      </Link>
                      <p className="mt-1 text-sm text-mute">
                        {c.plainEnglish.inOneMinute}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </PageWrap>
    </>
  );
}
