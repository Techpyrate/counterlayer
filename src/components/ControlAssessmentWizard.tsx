"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageWrap } from "@/components/PageWrap";
import { ChoiceChip, SectionLabel } from "@/components/Ui";
import { AssessmentVisualReport } from "@/components/AssessmentVisualReport";
import { type CheckAudience } from "@/data/complianceCheck";
import type { Jurisdiction } from "@/data/types";
import { useAuth } from "@/lib/auth";
import {
  recordComplianceScan,
  recordReportExport,
} from "@/lib/accountActivity";
import {
  type ComplianceAssessment,
  type ComplianceScanProgressEvent,
} from "@/lib/complianceAssessment";
import type { SiteScanResult } from "@/lib/siteScan";
import {
  downloadDiligenceExport,
  type DiligenceExportKind,
} from "@/lib/diligenceExport";
import {
  saveScanSnapshot,
  type PluginDiff,
} from "@/lib/scanHistory";
import { saveLocalComplianceScan } from "@/lib/localScanStore";
import { usePlan } from "@/components/ProGate";
import {
  BusinessTypeChipPicker,
} from "@/components/BusinessTypePicker";

type ScanUiState = {
  phase: string;
  message: string;
  current: number;
  total: number;
  url: string;
  pluginsDone: number;
  pluginsTotal: number;
  lastPlugin: string;
};

type UploadedDoc = { name: string; text: string; chars: number };

export function ControlAssessmentWizard() {
  const searchParams = useSearchParams();
  const { user, getAccessToken } = useAuth();
  const { isBusiness } = usePlan();
  const [whiteLabelOrg, setWhiteLabelOrg] = useState("");
  const [audience, setAudience] = useState<CheckAudience | null>(null);
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("Both");
  const [website, setWebsite] = useState(() => searchParams.get("url")?.trim() ?? "");
  const [stagingUrl, setStagingUrl] = useState("");
  const [authCookie, setAuthCookie] = useState("");
  const [appStoreUrl, setAppStoreUrl] = useState("");
  const [uploads, setUploads] = useState<UploadedDoc[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hasPriorScan, setHasPriorScan] = useState(false);
  const [attestChanges, setAttestChanges] = useState(false);
  const [changeNotes, setChangeNotes] = useState("");
  const [pluginDiffs, setPluginDiffs] = useState<PluginDiff[]>([]);
  const [fixesLines, setFixesLines] = useState<string[]>([]);
  const [storedScanId, setStoredScanId] = useState<string | null>(null);
  const [cloudHistory, setCloudHistory] = useState<
    { id: string; url: string; assessedAt: string; overall: string; score: number }[]
  >([]);
  const [scanLoading, setScanLoading] = useState(false);
  const [scan, setScan] = useState<SiteScanResult | null>(null);
  const [assessment, setAssessment] = useState<ComplianceAssessment | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [scanUi, setScanUi] = useState<ScanUiState>({
    phase: "idle",
    message: "",
    current: 0,
    total: 0,
    url: "",
    pluginsDone: 0,
    pluginsTotal: 0,
    lastPlugin: "",
  });

  useEffect(() => {
    void (async () => {
      const token = await getAccessToken();
      if (!token) return;
      try {
        const res = await fetch("/api/compliance-scans", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = (await res.json()) as {
          scans?: { id: string; url: string; assessedAt: string; overall: string; score: number }[];
        };
        if (data.scans) {
          setCloudHistory(data.scans);
          if (website.trim()) {
            const match = data.scans.find(
              (s) => s.url.trim().toLowerCase() === website.trim().toLowerCase(),
            );
            setHasPriorScan(Boolean(match));
          }
        }
      } catch {
        /* ignore */
      }
    })();
  }, [website, assessment?.assessedAt, getAccessToken]);

  const canFirstScan = Boolean(audience && website.trim() && !scanLoading && !hasPriorScan);
  const canRescan =
    Boolean(
      audience &&
        website.trim() &&
        !scanLoading &&
        attestChanges &&
        changeNotes.trim().length >= 8,
    );

  async function handleDocUpload(fileList: FileList | null) {
    if (!fileList?.length) return;
    setUploadLoading(true);
    setScanError(null);
    try {
      const token = await getAccessToken();
      for (const file of Array.from(fileList)) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/extract-text", {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: form,
        });
        const data = (await res.json()) as {
          error?: string;
          name?: string;
          text?: string;
          chars?: number;
        };
        if (!res.ok) {
          setScanError(data.error || `Could not read ${file.name}`);
          continue;
        }
        if (data.text && data.name) {
          setUploads((prev) => [
            ...prev,
            { name: data.name!, text: data.text!, chars: data.chars ?? data.text!.length },
          ]);
        }
      }
    } catch {
      setScanError("Document upload failed.");
    } finally {
      setUploadLoading(false);
    }
  }

  async function runComplianceScanFlow(isRescanRun: boolean) {
    if (!audience) {
      setScanError("Select business type before scanning.");
      return;
    }
    if (isRescanRun && !canRescan) {
      setScanError(
        "Re-scan requires attestation and a short note on what you changed (min 8 chars).",
      );
      return;
    }

    setScanError(null);
    setScanLoading(true);
    setScan(null);
    setAssessment(null);
    setPluginDiffs([]);
    setFixesLines([]);
    setScanUi({
      phase: "review",
      message: "Starting compliance scan…",
      current: 0,
      total: 0,
      url: "",
      pluginsDone: 0,
      pluginsTotal: 0,
      lastPlugin: "",
    });

    const token = await getAccessToken();
    if (!token) {
      setScanError("Pro session required. Sign in and upgrade to run scans.");
      setScanLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/compliance-scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          url: website.trim(),
          audience,
          jurisdiction,
          stagingUrl: stagingUrl.trim() || undefined,
          authCookie: authCookie.trim() || undefined,
          appStoreUrls: appStoreUrl.trim() ? [appStoreUrl.trim()] : undefined,
          uploadTexts: uploads.map((u) => ({ name: u.name, text: u.text })),
          changeNotes: isRescanRun ? changeNotes.trim() : undefined,
        }),
      });

      if (!res.ok || !res.body) {
        const err = (await res.json().catch(() => null)) as { error?: string } | null;
        setScanError(err?.error || "Compliance scan failed.");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finalAssessment: ComplianceAssessment | null = null;
      let finalScan: SiteScanResult | null = null;
      let finalStoredScanId: string | undefined;
      let finalPluginDiffs: PluginDiff[] | undefined;
      let finalFixesLines: string[] | undefined;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          let event: ComplianceScanProgressEvent;
          try {
            event = JSON.parse(line) as ComplianceScanProgressEvent;
          } catch {
            continue;
          }

          if (event.type === "status") {
            const phase =
              event.message.includes("Phase 2") || event.message.includes("Plugin")
                ? "plugins"
                : "review";
            setScanUi((s) => ({
              ...s,
              phase,
              message:
                phase === "plugins"
                  ? "Running compliance controls…"
                  : "Reviewing your public site…",
            }));
          } else if (event.type === "progress") {
            setScanUi((s) => ({
              ...s,
              phase: "review",
              message: `Reviewing page ${event.current} of ${event.total}`,
              current: event.current,
              total: event.total,
            }));
          } else if (event.type === "plugin") {
            setScanUi((s) => ({
              ...s,
              phase: "plugins",
              pluginsDone: s.pluginsDone + 1,
              message: "Running compliance controls…",
            }));
          } else if (event.type === "done") {
            finalScan = event.result.scan;
            finalAssessment = event.result.assessment;
            setScan(finalScan);
            setAssessment(finalAssessment);
            finalStoredScanId = event.result.storedScanId;
            setStoredScanId(event.result.storedScanId ?? null);
            if (event.result.pluginDiffs) {
              finalPluginDiffs = event.result.pluginDiffs;
              setPluginDiffs(event.result.pluginDiffs);
            }
            if (event.result.fixesLines) {
              finalFixesLines = event.result.fixesLines;
              setFixesLines(event.result.fixesLines);
            }
            setScanUi((s) => ({
              ...s,
              pluginsTotal: event.result.assessment.stats.pluginsRun,
              pluginsDone: event.result.assessment.stats.pluginsRun,
            }));
            if (event.result.scan.error && !event.result.scan.fetchedOk) {
              setScanError(event.result.scan.error);
            }
          }
        }
      }

      if (finalAssessment) {
        saveScanSnapshot(
          finalAssessment,
          isRescanRun ? changeNotes.trim() : undefined,
        );
        if (user) {
          recordComplianceScan(user.id, {
            assessment: finalAssessment,
            isRescan: isRescanRun,
            changeNotes: isRescanRun ? changeNotes.trim() : undefined,
            storedScanId: finalStoredScanId,
          });
          saveLocalComplianceScan(user.id, {
            id: finalStoredScanId,
            assessment: finalAssessment,
            pluginDiffs: finalPluginDiffs,
            fixesLines: finalFixesLines,
            changeNotes: isRescanRun ? changeNotes.trim() : undefined,
          });
        }
        setHasPriorScan(true);
        setAttestChanges(false);
        setChangeNotes("");
        requestAnimationFrame(() => {
          document
            .getElementById("compliance-report")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    } catch {
      setScanError("Could not reach the compliance scan service.");
    } finally {
      setScanLoading(false);
    }
  }

  function exportDiligence(kind: DiligenceExportKind) {
    if (!assessment) return;
    downloadDiligenceExport({
      assessment,
      kind,
      fixesSinceLastScan: fixesLines.length ? fixesLines : undefined,
      pluginDiffs: pluginDiffs.length ? pluginDiffs : undefined,
      coverageNotes: assessment.coverageNotes,
      whiteLabelOrg:
        isBusiness && whiteLabelOrg.trim() ? whiteLabelOrg.trim() : undefined,
    });
    if (user) {
      recordReportExport(user.id, {
        url: assessment.url,
        exportKind: kind,
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
            aria-label="Compliance scan in progress"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal-dim">
              Automated compliance scan
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
              {scanUi.phase === "plugins"
                ? "Running compliance controls…"
                : "Reviewing your public site…"}
            </h2>
            <p className="mt-3 text-sm text-ink-soft">{scanUi.message}</p>
            {scanUi.phase === "review" && scanUi.total > 0 && (
              <div className="mt-5">
                <div className="mb-2 flex justify-between text-xs text-mute">
                  <span>
                    {scanUi.current} / {scanUi.total} pages
                  </span>
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
            {scanUi.phase === "plugins" && (
              <p className="mt-4 text-xs text-mute">Running control checks…</p>
            )}
            <p className="mt-5 text-xs text-mute">
              Scan on demand — re-run only after you publish fixes. Do not leave
              this page.
            </p>
          </div>
        </div>
      )}

      <PageWrap className="py-10 sm:py-14">
        <SectionLabel>Pro · compliance scan</SectionLabel>
        <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Compliance scan
        </h1>
        <p className="mt-4 max-w-3xl text-base text-ink-soft/80 sm:text-lg">
          Automated public-site compliance controls — Terms, Privacy, cancel flows,
          and policy paths. Scan at launch, attest fixes, re-scan on demand. Cloud
          history, shareable diligence reports, and counsel exports included with Pro.
          Not a law firm. Not a substitute for counsel.
        </p>
        <p className="mt-3 max-w-3xl text-sm text-mute">
          We do not push weekly monitoring — re-scan when you publish changes, or
          enable policy-page watch for change alerts only.
        </p>
        <p className="mt-3 text-sm text-mute">
          Need the owner practice checklist?{" "}
          <Link href="/check" className="font-medium text-ink underline">
            Business Scan
          </Link>{" "}
          is separate.
        </p>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            1. Target URL <span className="text-danger">*</span>
          </h2>
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            disabled={scanLoading}
            placeholder="https://yourbusiness.com"
            className="mt-3 w-full max-w-2xl rounded-xl border border-[var(--line)] bg-paper px-4 py-3 text-base outline-none focus:ring-2 focus:ring-signal/30 disabled:opacity-50"
          />
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            2. Business type <span className="text-danger">*</span>
          </h2>
          <div className="mt-4">
            <BusinessTypeChipPicker
              value={audience}
              disabled={scanLoading}
              onChange={(id) => {
                setAudience(id);
                setAssessment(null);
              }}
            />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            3. Jurisdiction pack
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["US", "EU", "Both"] as const).map((j) => (
              <ChoiceChip
                key={j}
                active={jurisdiction === j}
                disabled={scanLoading}
                onClick={() => {
                  setJurisdiction(j);
                  setAssessment(null);
                }}
              >
                {j === "Both" ? "US + EU" : j}
              </ChoiceChip>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="text-sm font-semibold text-ink underline"
          >
            {showAdvanced ? "Hide" : "Show"} deeper coverage
          </button>
          {showAdvanced && (
            <div className="mt-4 max-w-2xl space-y-4 rounded-xl border border-[var(--line)] bg-fog/30 p-5">
              <p className="text-sm text-ink-soft">
                Checkout-path probe, CMS policy paths, App Store listing text,
                staging URL + auth cookie, and document vault uploads.
              </p>
              <label className="block text-sm">
                <span className="font-medium text-ink">Staging / preview URL</span>
                <input
                  value={stagingUrl}
                  onChange={(e) => setStagingUrl(e.target.value)}
                  disabled={scanLoading}
                  placeholder="https://staging.yoursite.com"
                  className="mt-1 w-full rounded-lg border border-[var(--line)] bg-paper px-3 py-2 text-sm"
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-ink">
                  Auth cookie (logged-in Terms)
                </span>
                <input
                  value={authCookie}
                  onChange={(e) => setAuthCookie(e.target.value)}
                  disabled={scanLoading}
                  type="password"
                  autoComplete="off"
                  placeholder="session=… (sent only for this scan; not stored)"
                  className="mt-1 w-full rounded-lg border border-[var(--line)] bg-paper px-3 py-2 font-mono text-xs"
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-ink">App Store / Play URL</span>
                <input
                  value={appStoreUrl}
                  onChange={(e) => setAppStoreUrl(e.target.value)}
                  disabled={scanLoading}
                  placeholder="https://apps.apple.com/… or play.google.com/…"
                  className="mt-1 w-full rounded-lg border border-[var(--line)] bg-paper px-3 py-2 text-sm"
                />
              </label>
              <div className="text-sm">
                <span className="font-medium text-ink">Document vault</span>
                <p className="mt-1 text-xs text-mute">
                  Upload contracts or policy PDFs — text is merged into plugin
                  evidence for this scan only.
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.txt,.md,.html,.htm"
                  disabled={scanLoading || uploadLoading}
                  onChange={(e) => void handleDocUpload(e.target.files)}
                  className="mt-2 block w-full text-xs"
                />
                {uploads.length > 0 && (
                  <ul className="mt-2 space-y-1 text-xs text-mute">
                    {uploads.map((u) => (
                      <li key={u.name}>
                        {u.name} · {u.chars.toLocaleString()} chars
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            4. {hasPriorScan ? "Re-scan after fixes" : "Initial scan"}
          </h2>
          {!hasPriorScan ? (
            <>
              <p className="mt-2 max-w-2xl text-sm text-ink-soft">
                Baseline scan of your public compliance surface. Fix gaps on your
                site, then return here to re-scan — not on a calendar schedule.
              </p>
              {scanError && (
                <p className="mt-3 text-sm text-danger">{scanError}</p>
              )}
              <div className="mt-4">
                <button
                  type="button"
                  disabled={!canFirstScan}
                  onClick={() => void runComplianceScanFlow(false)}
                  className="rounded-full bg-signal px-6 py-3 text-sm font-semibold text-ink disabled:opacity-40"
                >
                  {scanLoading ? "Scanning…" : "Run compliance scan"}
                </button>
              </div>
            </>
          ) : (
            <div className="mt-3 max-w-2xl rounded-xl border border-[var(--line)] bg-paper p-5">
              <p className="text-sm text-ink-soft">
                You have a prior scan for this URL. Publish your fixes on the live
                site first, then attest what changed and re-scan.
              </p>
              <label className="mt-4 flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={attestChanges}
                  onChange={(e) => setAttestChanges(e.target.checked)}
                  disabled={scanLoading}
                  className="mt-1"
                />
                <span>
                  I have published changes to the website (Terms, Privacy, cancel
                  flow, etc.) since the last scan.
                </span>
              </label>
              <label className="mt-4 block text-sm">
                <span className="font-medium text-ink">What did you change?</span>
                <textarea
                  value={changeNotes}
                  onChange={(e) => setChangeNotes(e.target.value)}
                  disabled={scanLoading}
                  rows={3}
                  placeholder="e.g. Added Privacy Policy link in footer; updated refund/cancel section on /billing"
                  className="mt-1 w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm"
                />
              </label>
              {scanError && (
                <p className="mt-3 text-sm text-danger">{scanError}</p>
              )}
              <button
                type="button"
                disabled={!canRescan}
                onClick={() => void runComplianceScanFlow(true)}
                className="mt-4 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-ink disabled:opacity-40"
              >
                {scanLoading ? "Re-scanning…" : "Re-scan after my changes"}
              </button>
            </div>
          )}
        </section>

        {cloudHistory.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
              Cloud scan history
            </h2>
            <ul className="mt-3 max-w-2xl divide-y divide-[var(--line)] rounded-xl border border-[var(--line)] bg-paper">
              {cloudHistory.slice(0, 8).map((s) => (
                <li
                  key={s.id}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
                >
                  <span className="min-w-0 break-all font-medium text-ink">
                    {s.url}
                  </span>
                  <span className="text-mute">
                    {new Date(s.assessedAt).toLocaleDateString()} · {s.overall} ·{" "}
                    {s.score}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {assessment && (
          <section className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
              5. Results &amp; diligence packs
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">
              Open the report below for a full walkthrough. Use diligence packs
              when packaging for a third party. Download and share live in the
              report toolbar.
            </p>
            {isBusiness && (
              <label className="mt-4 block max-w-md text-sm">
                <span className="text-mute">
                  White-label export name (Business)
                </span>
                <input
                  value={whiteLabelOrg}
                  onChange={(e) => setWhiteLabelOrg(e.target.value)}
                  placeholder="Your firm or company name"
                  className="mt-1 w-full rounded-xl border border-[var(--line)] bg-paper px-3 py-2.5 outline-none focus:ring-2 focus:ring-signal/30"
                />
              </label>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("compliance-report")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-fog"
              >
                View full report
              </button>
              <button
                type="button"
                onClick={() => exportDiligence("investor")}
                className="rounded-full border border-[var(--line)] bg-paper px-4 py-2 text-sm font-semibold text-ink"
              >
                Investor / acquirer pack
              </button>
              <button
                type="button"
                onClick={() => exportDiligence("app_store")}
                className="rounded-full border border-[var(--line)] bg-paper px-4 py-2 text-sm font-semibold text-ink"
              >
                App store / marketplace
              </button>
              <button
                type="button"
                onClick={() => exportDiligence("partner")}
                className="rounded-full border border-[var(--line)] bg-paper px-4 py-2 text-sm font-semibold text-ink"
              >
                Partner onboarding
              </button>
            </div>
            {scan?.fetchedOk && (
              <p className="mt-3 text-sm text-ink-soft">
                {assessment.stats.pluginsRun} plugins ·{" "}
                {assessment.scanStats.pagesOk} pages ·{" "}
                {assessment.stats.gap + assessment.stats.risk_signal} open issues
              </p>
            )}
          </section>
        )}

        {assessment && (
          <div className="mt-12">
            <AssessmentVisualReport
              assessment={assessment}
              pluginDiffs={pluginDiffs}
              fixesLines={fixesLines}
              storedScanId={storedScanId ?? undefined}
              onDownloaded={(kind) => {
                if (user) {
                  recordReportExport(user.id, {
                    url: assessment.url,
                    exportKind:
                      kind === "pdf" ? "compliance_pdf" : "compliance_markdown",
                  });
                }
              }}
              onShared={() => {
                if (user) {
                  recordReportExport(user.id, {
                    url: assessment.url,
                    exportKind: "compliance_share",
                  });
                }
              }}
            />
          </div>
        )}
      </PageWrap>
    </>
  );
}
