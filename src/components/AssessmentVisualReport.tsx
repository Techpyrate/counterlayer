"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { ComplianceAssessment } from "@/lib/complianceAssessment";
import type { ControlStatus } from "@/data/complianceControls";
import type { PluginDiff } from "@/lib/scanHistory";
import { useAuth } from "@/lib/auth";
import { downloadAssessmentPdf } from "@/lib/assessmentPdf";
import {
  downloadControlMatrixCsv,
  downloadCounselAttestationPdf,
} from "@/lib/counselExport";
import {
  assessmentHost,
  buildAssessmentShareText,
  downloadAssessmentMarkdown,
  overallBandExplanation,
  overallBandLabel,
} from "@/lib/assessmentShare";

const STATUS_STYLE: Record<
  ControlStatus,
  { label: string; color: string; bg: string; short: string }
> = {
  pass: { label: "Pass", short: "Pass", color: "#1a7a45", bg: "#e8f7ee" },
  partial: {
    label: "Partial",
    short: "Partial",
    color: "#9a6b12",
    bg: "#fbf3dd",
  },
  gap: { label: "Gap", short: "Gap", color: "#b42318", bg: "#fdecea" },
  risk_signal: {
    label: "Risk signal",
    short: "Risk",
    color: "#b42318",
    bg: "#fdecea",
  },
  not_assessed: {
    label: "Inconclusive",
    short: "N/A",
    color: "#5c6b66",
    bg: "#eef2f0",
  },
};

type SectionId =
  | "overview"
  | "summary"
  | "remediation"
  | "plugins"
  | "coverage"
  | "changes"
  | "methodology"
  | "limits";

type PluginFilter = "all" | "open" | "pass" | "launch";

function scrollToSection(id: SectionId) {
  const el = document.getElementById(`report-${id}`);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function AssessmentVisualReport({
  assessment,
  pluginDiffs = [],
  fixesLines = [],
  storedScanId,
  readOnly = false,
  onDownloaded,
  onShared,
}: {
  assessment: ComplianceAssessment;
  pluginDiffs?: PluginDiff[];
  fixesLines?: string[];
  storedScanId?: string;
  readOnly?: boolean;
  onDownloaded?: (kind: "pdf" | "markdown" | "csv" | "attestation") => void;
  onShared?: () => void;
}) {
  const { user, getAccessToken } = useAuth();
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [pluginFilter, setPluginFilter] = useState<PluginFilter>("open");
  const [selectedPluginId, setSelectedPluginId] = useState<string | null>(
    null,
  );
  const [shareState, setShareState] = useState<
    "idle" | "copied" | "shared" | "link"
  >("idle");
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [watchMsg, setWatchMsg] = useState<string | null>(null);

  const overallColor =
    assessment.overall === "elevated"
      ? "#b42318"
      : assessment.overall === "watch"
        ? "#9a6b12"
        : "#1a7a45";

  const generated = new Date(assessment.assessedAt).toLocaleString();
  const host = assessmentHost(assessment.url);
  const openCount =
    assessment.stats.gap +
    assessment.stats.risk_signal +
    assessment.stats.partial;

  const sections = useMemo(() => {
    const list: { id: SectionId; label: string; hint: string }[] = [
      {
        id: "overview",
        label: "Overview",
        hint: "Band, score, and what the scan means",
      },
      {
        id: "summary",
        label: "Executive summary",
        hint: "Plain-English findings",
      },
      {
        id: "remediation",
        label: "Priority fixes",
        hint: "What to publish next",
      },
      {
        id: "plugins",
        label: "Control results",
        hint: `${assessment.stats.pluginsRun} automated checks`,
      },
    ];
    if (assessment.coverageNotes.length > 0) {
      list.push({
        id: "coverage",
        label: "Coverage",
        hint: "What was reviewed",
      });
    }
    if (fixesLines.length > 0) {
      list.push({
        id: "changes",
        label: "Since last scan",
        hint: "Your attested fixes",
      });
    }
    list.push(
      {
        id: "methodology",
        label: "Methodology",
        hint: "How plugins were tested",
      },
      {
        id: "limits",
        label: "Limits",
        hint: "What this scan cannot do",
      },
    );
    return list;
  }, [assessment, fixesLines.length]);

  const filteredControls = useMemo(() => {
    return assessment.controls.filter((c) => {
      if (pluginFilter === "all") return true;
      if (pluginFilter === "pass") return c.status === "pass";
      if (pluginFilter === "launch") {
        return (
          c.launchCritical &&
          (c.status === "gap" ||
            c.status === "risk_signal" ||
            c.status === "partial")
        );
      }
      return (
        c.status === "gap" ||
        c.status === "risk_signal" ||
        c.status === "partial"
      );
    });
  }, [assessment.controls, pluginFilter]);

  const selectedControl =
    assessment.controls.find((c) => c.controlId === selectedPluginId) ?? null;

  // Default filter: if nothing open, show all
  useEffect(() => {
    if (openCount === 0) setPluginFilter("all");
  }, [openCount, assessment.assessedAt]);

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]?.target.id) {
          const id = visible[0].target.id.replace(
            "report-",
            "",
          ) as SectionId;
          if (ids.includes(id)) setActiveSection(id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    for (const id of ids) {
      const el = document.getElementById(`report-${id}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  async function handleShareLink() {
    if (!storedScanId || readOnly) {
      await handleShare();
      return;
    }
    const token = await getAccessToken();
    if (!token) return;
    try {
      const res = await fetch(`/api/compliance-scans/${storedScanId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "share" }),
      });
      const data = (await res.json()) as { shareId?: string; error?: string };
      if (!res.ok || !data.shareId) return;
      const url = `${window.location.origin}/assess/reports/${data.shareId}`;
      setShareUrl(url);
      await navigator.clipboard.writeText(url);
      setShareState("link");
      onShared?.();
      setTimeout(() => setShareState("idle"), 2500);
    } catch {
      setShareState("idle");
    }
  }

  async function handleEnableWatch() {
    if (!storedScanId || readOnly) return;
    const token = await getAccessToken();
    if (!token) return;
    const res = await fetch("/api/compliance-watch", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scanId: storedScanId, action: "enable" }),
    });
    const data = (await res.json()) as { message?: string; error?: string };
    setWatchMsg(data.message ?? data.error ?? null);
  }

  async function handleCheckWatch() {
    if (!storedScanId || readOnly) return;
    const token = await getAccessToken();
    if (!token) return;
    const res = await fetch("/api/compliance-watch", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scanId: storedScanId, action: "check" }),
    });
    const data = (await res.json()) as { suggestion?: string; changes?: string[] };
    setWatchMsg(
      data.changes?.length
        ? `${data.suggestion} ${data.changes.join("; ")}`
        : data.suggestion ?? null,
    );
  }

  async function handleShare() {
    const text = buildAssessmentShareText(assessment);
    const title = `Compliance scan — ${host}`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, text });
        setShareState("shared");
        onShared?.();
        setTimeout(() => setShareState("idle"), 2000);
        return;
      }
    } catch {
      // fall through to clipboard
    }
    try {
      await navigator.clipboard.writeText(text);
      setShareState("copied");
      onShared?.();
      setTimeout(() => setShareState("idle"), 2000);
    } catch {
      setShareState("idle");
    }
  }

  function handleDownloadPdf() {
    downloadAssessmentPdf(assessment);
    onDownloaded?.("pdf");
    setDownloadOpen(false);
  }

  function handleDownloadMarkdown() {
    downloadAssessmentMarkdown(assessment);
    onDownloaded?.("markdown");
    setDownloadOpen(false);
  }

  return (
    <article
      id="compliance-report"
      className="overflow-hidden rounded-sm border border-[var(--line)] bg-white shadow-sm"
    >
      {/* Report toolbar */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mute">
            Compliance scan report
          </p>
          <p className="text-sm font-semibold text-ink">{host}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {!readOnly && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDownloadOpen((v) => !v)}
                className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-fog"
              >
                Download report
              </button>
              {downloadOpen && (
                <div className="absolute right-0 z-30 mt-2 w-64 rounded-xl border border-[var(--line)] bg-white p-2 shadow-lg">
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-ink hover:bg-fog"
                  >
                    Full report (PDF)
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadMarkdown}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-ink hover:bg-fog"
                  >
                    Full report (Markdown)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      downloadControlMatrixCsv(assessment);
                      onDownloaded?.("csv");
                      setDownloadOpen(false);
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-ink hover:bg-fog"
                  >
                    Control matrix (CSV)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      downloadCounselAttestationPdf({
                        assessment,
                        attestedBy: user?.email,
                        scanId: storedScanId,
                      });
                      onDownloaded?.("attestation");
                      setDownloadOpen(false);
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-ink hover:bg-fog"
                  >
                    Counsel attestation (PDF)
                  </button>
                </div>
              )}
            </div>
          )}
          {!readOnly && storedScanId && (
            <>
              <button
                type="button"
                onClick={() => void handleShareLink()}
                className="rounded-full border border-[var(--line)] bg-paper px-4 py-2 text-sm font-semibold text-ink"
              >
                {shareState === "link"
                  ? "Link copied"
                  : "Copy share link"}
              </button>
              <button
                type="button"
                onClick={() => void handleEnableWatch()}
                className="rounded-full border border-[var(--line)] bg-paper px-4 py-2 text-sm font-semibold text-ink"
              >
                Watch policy pages
              </button>
              <button
                type="button"
                onClick={() => void handleCheckWatch()}
                className="rounded-full border border-[var(--line)] bg-paper px-4 py-2 text-sm font-semibold text-ink"
              >
                Check for changes
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => void handleShare()}
            className="rounded-full border border-[var(--line)] bg-paper px-4 py-2 text-sm font-semibold text-ink"
          >
            {shareState === "copied"
              ? "Copied summary"
              : shareState === "shared"
                ? "Shared"
                : "Share summary"}
          </button>
        </div>
        {shareUrl && (
          <p className="mt-2 break-all text-xs text-mute">{shareUrl}</p>
        )}
        {watchMsg && (
          <p className="mt-2 max-w-xl text-xs text-ink-soft">{watchMsg}</p>
        )}
      </div>

      <header className="border-b border-[var(--line)] bg-ink px-6 py-8 text-fog sm:px-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-signal">
          CounterLayer · Pro compliance scan
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
          {host}
        </h2>
        <p className="mt-2 break-all text-sm text-fog/60">{assessment.url}</p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fog/80">
          This report explains what our automated compliance controls found on your{" "}
          <em>public</em> website — Terms, Privacy, cancel flows, and related policy
          paths. Click a section or open a control row for evidence and remediation.
          Not a legal opinion, SOC 2, or ISO certification. We are a diligence
          guide — not a law firm, and not a substitute for counsel.
        </p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <p className="text-xs text-fog/50">
            Generated {generated} · {assessment.packsApplied.join(" · ")} ·{" "}
            {assessment.scanStats.pagesOk} pages ·{" "}
            {assessment.scanStats.charsScanned.toLocaleString()} chars analyzed
          </p>
          <div className="border border-white/15 bg-white/5 px-5 py-3 text-center">
            <p className="text-[10px] uppercase tracking-[0.16em] text-fog/55">
              Overall band
            </p>
            <p className="mt-1 text-xl font-bold" style={{ color: overallColor }}>
              {assessment.overall.toUpperCase()}
            </p>
            <p className="text-xs text-fog/55">Score {assessment.score}</p>
          </div>
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-[220px_1fr]">
        {/* Section nav */}
        <nav
          aria-label="Report sections"
          className="border-b border-[var(--line)] bg-[#f7faf8] lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)] lg:overflow-y-auto lg:border-b-0 lg:border-r"
        >
          <p className="px-4 pt-4 text-[10px] font-semibold uppercase tracking-wider text-mute sm:px-5">
            Jump to section
          </p>
          <ul className="flex gap-1 overflow-x-auto px-3 py-3 lg:flex-col lg:overflow-visible lg:px-3">
            {sections.map((s) => (
              <li key={s.id} className="shrink-0 lg:w-full">
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection(s.id);
                    scrollToSection(s.id);
                  }}
                  className={`w-full rounded-lg px-3 py-2.5 text-left transition ${
                    activeSection === s.id
                      ? "bg-ink text-fog"
                      : "text-ink-soft hover:bg-white"
                  }`}
                >
                  <span className="block text-sm font-semibold">{s.label}</span>
                  <span
                    className={`mt-0.5 hidden text-[11px] leading-snug lg:block ${
                      activeSection === s.id ? "text-fog/65" : "text-mute"
                    }`}
                  >
                    {s.hint}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-12 px-6 py-8 sm:px-10">
          {/* Overview */}
          <section id="report-overview" className="scroll-mt-24">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
              Overview
            </h3>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-ink-soft">
              <span className="font-semibold text-ink">
                {overallBandLabel(assessment.overall)}.
              </span>{" "}
              {overallBandExplanation(assessment.overall)}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(
                [
                  {
                    label: "Controls run",
                    value: assessment.stats.pluginsRun,
                    note: "Automated checks tested",
                    color: "#2fd67b",
                    filter: "all" as PluginFilter,
                  },
                  {
                    label: "Passed",
                    value: assessment.stats.pass,
                    note: "No gap/risk on public evidence",
                    color: "#1a7a45",
                    filter: "pass" as PluginFilter,
                  },
                  {
                    label: "Needs work",
                    value: openCount,
                    note: "Gaps, risks, or partial",
                    color: "#b42318",
                    filter: "open" as PluginFilter,
                  },
                  {
                    label: "Launch-critical open",
                    value: assessment.stats.launchCriticalGaps,
                    note: "Fix before go-live",
                    color: "#9a6b12",
                    filter: "launch" as PluginFilter,
                  },
                ] as const
              ).map((card) => (
                <button
                  key={card.label}
                  type="button"
                  onClick={() => {
                    setPluginFilter(card.filter);
                    scrollToSection("plugins");
                  }}
                  className="rounded-xl border border-[var(--line)] bg-[#f7faf8] px-4 py-4 text-left transition hover:border-ink/25 hover:bg-white"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                    {card.label}
                  </p>
                  <p
                    className="mt-1 text-3xl font-bold tabular-nums"
                    style={{ color: card.color }}
                  >
                    {card.value}
                  </p>
                  <p className="mt-1 text-xs text-mute">{card.note}</p>
                  <p className="mt-2 text-[11px] font-semibold text-ink">
                    View →
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {(
                [
                  ["Partial", assessment.stats.partial],
                  ["Gap", assessment.stats.gap],
                  ["Risk signal", assessment.stats.risk_signal],
                  ["Inconclusive", assessment.stats.not_assessed],
                ] as const
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-lg border border-[var(--line)] px-3 py-2 text-sm"
                >
                  <span className="text-mute">{label}</span>
                  <span className="font-semibold tabular-nums text-ink">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Executive summary */}
          <section id="report-summary" className="scroll-mt-24">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
              Executive summary
            </h3>
            <p className="mt-2 max-w-3xl text-sm text-mute">
              What the scan concluded in plain language — use this when briefing
              a teammate or diligence contact.
            </p>
            <ul className="mt-5 space-y-4">
              {assessment.executiveSummary.map((p, i) => (
                <li
                  key={p.slice(0, 48)}
                  className="flex gap-3 border-l-2 border-signal/50 pl-4 text-[15px] leading-7 text-ink-soft"
                >
                  <span className="shrink-0 font-mono text-xs text-mute">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Remediation */}
          <section id="report-remediation" className="scroll-mt-24">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
              Priority remediation
            </h3>
            <p className="mt-2 max-w-3xl text-sm text-mute">
              Suggested order of work on your live site. After publishing fixes,
              return here, attest the changes, and re-scan.
            </p>
            <ol className="mt-5 space-y-3">
              {assessment.nextSteps.map((s, i) => (
                <li
                  key={s.slice(0, 40)}
                  className="flex gap-4 rounded-xl border border-[var(--line)] bg-[#f7faf8] px-4 py-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-fog">
                    {i + 1}
                  </span>
                  <p className="text-[15px] leading-relaxed text-ink">{s}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Plugins */}
          <section id="report-plugins" className="scroll-mt-24">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
              Control results
            </h3>
            <p className="mt-2 max-w-3xl text-sm text-mute">
              Each row is an automated compliance control evaluated against your
              evaluated against your public site. Click a row for evidence, how we tested, and
              remediation steps.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {(
                [
                  ["open", `Needs work (${openCount})`],
                  ["launch", `Launch-critical (${assessment.stats.launchCriticalGaps})`],
                  ["pass", `Passed (${assessment.stats.pass})`],
                  ["all", `All (${assessment.stats.pluginsRun})`],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPluginFilter(id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    pluginFilter === id
                      ? "bg-ink text-fog"
                      : "border border-[var(--line)] bg-paper text-ink-soft"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-5 divide-y divide-[var(--line)] overflow-hidden rounded-xl border border-[var(--line)]">
              {filteredControls.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-mute">
                  No controls in this filter. Try &ldquo;All&rdquo; or another
                  status.
                </p>
              ) : (
                filteredControls.map((c) => {
                  const st = STATUS_STYLE[c.status];
                  return (
                    <button
                      key={c.controlId}
                      type="button"
                      onClick={() => setSelectedPluginId(c.controlId)}
                      className="flex w-full items-start gap-3 bg-white px-4 py-4 text-left transition hover:bg-[#f7faf8] sm:items-center sm:px-5"
                    >
                      <span
                        className="mt-0.5 shrink-0 rounded-sm px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                        style={{ color: st.color, background: st.bg }}
                      >
                        {st.short}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <span className="font-mono text-xs font-semibold text-ink">
                            {c.pluginId}
                          </span>
                          {c.launchCritical && (
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800">
                              Launch-critical
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 font-semibold text-ink">{c.title}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
                          {c.requirement}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-semibold text-mute">
                        Open →
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </section>

          {assessment.coverageNotes.length > 0 && (
            <section id="report-coverage" className="scroll-mt-24">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
                Additional sources
              </h3>
              <p className="mt-2 text-sm text-mute">
                Staging URLs, app listings, and uploaded documents included in
                this run.
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-soft">
                {assessment.coverageNotes.map((n) => (
                  <li key={n.slice(0, 48)} className="flex gap-2">
                    <span className="text-signal">·</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {fixesLines.length > 0 && (
            <section id="report-changes" className="scroll-mt-24">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
                What changed since last scan
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-soft">
                {fixesLines.map((line) => (
                  <li key={line.slice(0, 60)}>· {line}</li>
                ))}
              </ul>
              {pluginDiffs.length > 0 && (
                <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--line)]">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[var(--line)] bg-[#f7faf8] text-mute">
                        <th className="px-4 py-2.5">Plugin</th>
                        <th className="px-4 py-2.5">Before</th>
                        <th className="px-4 py-2.5">After</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pluginDiffs.map((d) => (
                        <tr
                          key={d.pluginId}
                          className="border-b border-[var(--line)]/50"
                        >
                          <td className="px-4 py-2.5 font-mono">
                            {d.improved ? "↑ " : "↓ "}
                            {d.pluginId}
                          </td>
                          <td className="px-4 py-2.5">{d.before}</td>
                          <td className="px-4 py-2.5">{d.after}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          <section id="report-methodology" className="scroll-mt-24">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
              Methodology
            </h3>
            <p className="mt-2 text-sm text-mute">
              How CounterLayer produced this report.
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
              {assessment.methodology.map((m) => (
                <li key={m.slice(0, 36)} className="flex gap-2">
                  <span className="text-signal">·</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="report-limits" className="scroll-mt-24 pb-4">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
              Limits &amp; disclaimers
            </h3>
            <p className="mt-2 text-sm text-mute">
              Read before sharing with investors, partners, or app stores.
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
              {assessment.limitations.map((m) => (
                <li key={m.slice(0, 36)} className="flex gap-2">
                  <span className="text-mute">·</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Plugin detail panel */}
      {selectedControl && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/50 p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={selectedControl.title}
          onClick={() => setSelectedPluginId(null)}
        >
          <div
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-[var(--line)] bg-white px-5 py-4 sm:px-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-ink">
                    {selectedControl.pluginId}
                  </span>
                  <span
                    className="rounded-sm px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                    style={{
                      color: STATUS_STYLE[selectedControl.status].color,
                      background: STATUS_STYLE[selectedControl.status].bg,
                    }}
                  >
                    {STATUS_STYLE[selectedControl.status].label}
                  </span>
                  {selectedControl.launchCritical && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800">
                      Launch-critical
                    </span>
                  )}
                </div>
                <h4 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-ink">
                  {selectedControl.title}
                </h4>
                <p className="mt-1 text-xs text-mute">
                  {selectedControl.packLabel} · confidence{" "}
                  {selectedControl.confidence}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPluginId(null)}
                className="rounded-full border border-[var(--line)] px-3 py-1 text-sm font-semibold text-ink"
              >
                Close
              </button>
            </div>

            <div className="space-y-6 px-5 py-5 sm:px-6">
              <DetailBlock title="What we check">
                {selectedControl.requirement}
              </DetailBlock>
              <DetailBlock title="Why it matters">
                {selectedControl.whyItMatters}
              </DetailBlock>
              <DetailBlock title="How we tested">
                {selectedControl.howWeTest}
              </DetailBlock>
              {selectedControl.frameworkRefs.length > 0 && (
                <DetailBlock title="Framework references">
                  {selectedControl.frameworkRefs.join(" · ")}
                </DetailBlock>
              )}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                  Evidence collected
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft">
                  {selectedControl.evidence.map((e) => (
                    <li key={e.slice(0, 50)}>{e}</li>
                  ))}
                </ul>
              </div>
              {selectedControl.status !== "pass" &&
                selectedControl.status !== "not_assessed" && (
                  <div className="rounded-xl border border-signal/30 bg-[#f0fdf4] px-4 py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                      Remediation
                    </p>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
                      {selectedControl.remediation.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
        {title}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{children}</p>
    </div>
  );
}
