"use client";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Answer, ComplianceFlag, ComplianceResult, RiskLevel } from "@/data/complianceCheck";
import type {
  RequiredDocument,
  SiteFinding,
  SiteScanResult,
} from "@/lib/siteScan";
import { useEffect, useId, useState } from "react";

const COLORS = {
  elevated: "#e85d4c",
  watch: "#e3b23c",
  info: "#5b8def",
  low: "#2fd67b",
  yes: "#e85d4c",
  no: "#2fd67b",
  unsure: "#e3b23c",
  competition: "#0c2e2c",
  consumer: "#2fd67b",
  market_rules: "#5b8def",
  transparency: "#9b7bff",
  found: "#2fd67b",
  weak: "#e3b23c",
  missing: "#e85d4c",
  ink: "#061a1a",
  mute: "#5c7570",
};

export function ScanVisualReport({ scan }: { scan: SiteScanResult }) {
  const documents = scan.documents ?? [];
  const severityData = [
    { name: "Elevated", value: scan.stats.elevated, color: COLORS.elevated },
    { name: "Watch", value: scan.stats.watch, color: COLORS.watch },
    { name: "Info", value: scan.stats.info, color: COLORS.info },
  ].filter((d) => d.value > 0);

  const domainMap = new Map<string, number>();
  for (const f of scan.findings) {
    domainMap.set(f.domain, (domainMap.get(f.domain) || 0) + 1);
  }
  const domainData = Array.from(domainMap.entries()).map(([name, value]) => ({
    name: name.replace(/_/g, " "),
    value,
    fill:
      name === "competition"
        ? COLORS.competition
        : name === "consumer"
          ? COLORS.consumer
          : name === "market_rules"
            ? COLORS.market_rules
            : COLORS.transparency,
  }));

  const crawlData = [
    { name: "Fetched", value: scan.stats.pagesOk, fill: COLORS.low },
    { name: "Failed", value: scan.stats.pagesFailed, fill: COLORS.elevated },
  ];

  const docsPie = [
    {
      name: "Found",
      value: scan.stats.docsFound ?? documents.filter((d) => d.status === "found").length,
      color: COLORS.found,
    },
    {
      name: "Weak",
      value: scan.stats.docsWeak ?? documents.filter((d) => d.status === "weak").length,
      color: COLORS.weak,
    },
    {
      name: "Missing",
      value:
        scan.stats.docsMissing ??
        documents.filter((d) => d.status === "missing").length,
      color: COLORS.missing,
    },
  ].filter((d) => d.value > 0);

  const riskScore = Math.min(
    100,
    scan.stats.elevated * 28 +
      scan.stats.watch * 12 +
      scan.stats.info * 4 +
      (scan.stats.docsMissing ?? 0) * 8 +
      (scan.stats.docsWeak ?? 0) * 4,
  );
  const gaugeData = [
    { name: "risk", value: riskScore, fill: riskColor(riskScore) },
    { name: "rest", value: 100 - riskScore, fill: "#d7e5df" },
  ];

  const host = (() => {
    try {
      return new URL(scan.url).hostname;
    } catch {
      return scan.url;
    }
  })();

  const launchGaps = documents.filter(
    (d) => d.requiredForLaunch && d.status !== "found",
  ).length;

  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-gradient-to-br from-[#0c2e2c] via-[#0a2422] to-[#123d38] text-fog shadow-xl">
      <div className="border-b border-white/10 px-5 py-6 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-signal">
          Website risk report
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">
          {host}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-fog/70">
          Visual summary of the public-site review — colorful for scanning, not a
          legal verdict.
        </p>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-8 lg:grid-cols-3 xl:grid-cols-5">
        <HeroStat
          label="Pages fetched"
          value={String(scan.stats.pagesOk)}
          accent="#2fd67b"
        />
        <HeroStat
          label="Elevated"
          value={String(scan.stats.elevated)}
          accent="#e85d4c"
        />
        <HeroStat
          label="Docs found"
          value={String(scan.stats.docsFound ?? 0)}
          accent="#2fd67b"
        />
        <HeroStat
          label="Docs missing"
          value={String(scan.stats.docsMissing ?? 0)}
          accent="#e85d4c"
        />
        <HeroStat
          label="Launch gaps"
          value={String(launchGaps)}
          accent="#e3b23c"
        />
      </div>

      <p className="px-5 text-xs text-fog/55 sm:px-8">
        Coverage extras: {scan.stats.jsRendered ?? 0} JS-rendered ·{" "}
        {scan.stats.pdfPages ?? 0} PDF · {scan.stats.offsitePages ?? 0} off-site
        policy · {scan.stats.sitemapUrls ?? 0} sitemap URLs discovered
      </p>

      <div className="grid gap-4 px-5 pb-5 pt-4 sm:px-8 lg:grid-cols-3">
        <ChartCard title="Site review score">
          <div className="relative h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="65%"
                outerRadius="100%"
                data={gaugeData}
                startAngle={210}
                endAngle={-30}
              >
                <RadialBar dataKey="value" cornerRadius={8} background />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold" style={{ color: riskColor(riskScore) }}>
                {riskScore}
              </p>
              <p className="text-xs uppercase tracking-wider text-fog/60">
                / 100
              </p>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Finding severity">
          <div className="h-52">
            {severityData.length === 0 ? (
              <EmptyChart label="No severity hits" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={48}
                    outerRadius={78}
                    paddingAngle={3}
                  >
                    {severityData.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value) => [String(value ?? 0), "Findings"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <LegendRow
            items={severityData.map((d) => ({
              label: `${d.name} (${d.value})`,
              color: d.color,
            }))}
          />
        </ChartCard>

        <ChartCard title="Website documents">
          <div className="h-52">
            {docsPie.length === 0 ? (
              <EmptyChart label="No document scan" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={docsPie}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={48}
                    outerRadius={78}
                    paddingAngle={3}
                  >
                    {docsPie.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value) => [String(value ?? 0), "Documents"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <LegendRow
            items={docsPie.map((d) => ({
              label: `${d.name} (${d.value})`,
              color: d.color,
            }))}
          />
        </ChartCard>
      </div>

      {documents.length > 0 && (
        <div className="px-5 pb-5 sm:px-8">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-signal">
            Required website documents
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {documents.map((d) => (
              <DocumentCard key={d.id} doc={d} />
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 px-5 pb-5 sm:px-8 lg:grid-cols-2">
        {domainData.length > 0 && (
          <ChartCard title="Issues by legal theme">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={domainData} layout="vertical" margin={{ left: 8, right: 8 }}>
                  <XAxis type="number" allowDecimals={false} stroke="#9fb4ae" fontSize={11} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={88}
                    stroke="#9fb4ae"
                    fontSize={10}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {domainData.map((d) => (
                      <Cell key={d.name} fill={d.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        )}
        <ChartCard title="Pages fetched vs failed">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={crawlData}>
                <XAxis dataKey="name" stroke="#9fb4ae" fontSize={11} />
                <YAxis allowDecimals={false} stroke="#9fb4ae" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {crawlData.map((d) => (
                    <Cell key={d.name} fill={d.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="px-5 pb-5 sm:px-8">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-signal">
          Executive summary
        </h3>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {scan.executiveSummary.map((s, i) => (
            <div
              key={s.slice(0, 28)}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-fog/85"
            >
              <span className="mb-2 inline-block rounded-full bg-signal/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-signal">
                Insight {i + 1}
              </span>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pb-8 sm:px-8">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-signal">
          Findings gallery
        </h3>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {scan.findings.map((f) => (
            <FindingVisual key={f.id} f={f} />
          ))}
          {scan.findings.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/20 p-6 text-sm text-fog/60 md:col-span-2">
              No strong keyword hits on reviewed pages — still run the owner
              checklist below.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DocumentCard({ doc }: { doc: RequiredDocument }) {
  const [open, setOpen] = useState(false);
  const color =
    doc.status === "found"
      ? COLORS.found
      : doc.status === "weak"
        ? COLORS.weak
        : COLORS.missing;
  const statusLabel =
    doc.status === "found"
      ? "Found"
      : doc.status === "weak"
        ? "Weak / thin"
        : "Missing";
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
        style={{ boxShadow: `inset 3px 0 0 ${color}` }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{ background: `${color}33`, color }}
          >
            {statusLabel}
          </span>
          {doc.requiredForLaunch && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-fog/55">
              Launch critical
            </span>
          )}
          <span className="text-[10px] uppercase tracking-wider text-fog/45">
            {doc.category}
          </span>
        </div>
        <h4 className="mt-2 font-semibold text-fog">{doc.label}</h4>
        <p className="mt-1 line-clamp-2 text-sm text-fog/70">{doc.whyItMatters}</p>
        <p className="mt-3 text-xs font-medium text-signal">Tap for details →</p>
      </button>
      {open && (
        <DetailModal
          title={doc.label}
          accent={color}
          onClose={() => setOpen(false)}
        >
          <ModalRow label="Status" value={statusLabel} />
          <ModalRow label="Category" value={doc.category} />
          {doc.requiredForLaunch && (
            <ModalRow label="Priority" value="Launch critical" />
          )}
          <ModalRow label="Evidence" value={doc.evidence} />
          {doc.url && <ModalRow label="URL" value={doc.url} />}
          <ModalRow label="Why it matters" value={doc.whyItMatters} />
          <ModalRow label="What to do" value={doc.whatToDo} />
        </DetailModal>
      )}
    </>
  );
}

function FindingVisual({ f }: { f: SiteFinding }) {
  const [open, setOpen] = useState(false);
  const color =
    f.severity === "elevated"
      ? COLORS.elevated
      : f.severity === "watch"
        ? COLORS.watch
        : COLORS.info;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
        style={{ boxShadow: `inset 3px 0 0 ${color}` }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{ background: `${color}33`, color }}
          >
            {f.severity}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-fog/50">
            {f.domain.replace(/_/g, " ")}
          </span>
        </div>
        <h4 className="mt-2 font-semibold text-fog">{f.title}</h4>
        <p className="mt-1 line-clamp-2 text-sm text-fog/75">{f.detail}</p>
        <p className="mt-2 text-xs text-fog/55">
          {f.pages.length} page{f.pages.length === 1 ? "" : "s"} · Tap for details →
        </p>
      </button>
      {open && (
        <DetailModal
          title={f.title}
          accent={color}
          onClose={() => setOpen(false)}
        >
          <ModalRow label="Severity" value={f.severity} />
          <ModalRow label="Domain" value={f.domain.replace(/_/g, " ")} />
          <ModalRow label="Detail" value={f.detail} />
          <ModalRow label="Evidence" value={f.evidence} />
          <ModalRow label="What to do" value={f.whatToDo} />
          {f.pages.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                Pages
              </p>
              <ul className="mt-1 max-h-40 space-y-1 overflow-auto text-sm text-ink-soft">
                {f.pages.map((p) => (
                  <li key={p} className="break-all">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DetailModal>
      )}
    </>
  );
}

export function FlagResultCard({ flag }: { flag: ComplianceFlag }) {
  const [open, setOpen] = useState(false);
  const color =
    flag.level === "elevated"
      ? COLORS.elevated
      : flag.level === "watch"
        ? COLORS.watch
        : COLORS.low;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-2xl border border-[var(--line)] bg-gradient-to-br from-white to-fog/40 p-5 text-left shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
        style={{ boxShadow: `inset 3px 0 0 ${color}` }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <RiskBadge level={flag.level} />
          <span className="text-xs uppercase tracking-wider text-mute">
            {flag.theme}
          </span>
        </div>
        <p className="mt-3 text-sm font-medium text-ink">{flag.prompt}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {flag.plainWhy}
        </p>
        <p className="mt-2 text-sm font-medium text-ink">{flag.soWhat}</p>
        <p className="mt-3 text-xs font-medium text-signal-dim">
          Tap for step-by-step fixes →
        </p>
      </button>
      {open && (
        <DetailModal
          title={flag.theme}
          accent={color}
          onClose={() => setOpen(false)}
          light
        >
          <div className="flex flex-wrap items-center gap-2">
            <RiskBadge level={flag.level} />
            <span className="text-xs uppercase tracking-wider text-mute">
              {flag.domains.join(" · ")}
            </span>
          </div>
          <ModalRow label="What we asked" value={flag.prompt} />
          <ModalRow label="Why this matters (plain English)" value={flag.plainWhy} />
          <ModalRow label="So what?" value={flag.soWhat} />
          <ModalRow label="Note" value={flag.note} />
          {flag.conduct.length > 0 && (
            <ModalRow
              label="Related conduct themes"
              value={flag.conduct.map((c) => c.replace(/_/g, " ")).join(", ")}
            />
          )}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
              What to do next
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
              {flag.remediation.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </DetailModal>
      )}
    </>
  );
}

function DetailModal({
  title,
  accent,
  onClose,
  children,
  light,
}: {
  title: string;
  accent: string;
  onClose: () => void;
  children: React.ReactNode;
  light?: boolean;
}) {
  const titleId = useId();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-ink/60 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className={`max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl p-5 shadow-2xl sm:p-6 ${
          light ? "bg-paper text-ink" : "bg-[#0c2e2c] text-fog"
        }`}
        style={{ boxShadow: `inset 4px 0 0 ${accent}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h3
            id={titleId}
            className={`font-[family-name:var(--font-display)] text-xl font-bold ${
              light ? "text-ink" : "text-fog"
            }`}
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className={`shrink-0 rounded-full px-3 py-1 text-sm ${
              light
                ? "bg-fog text-ink hover:bg-fog-deep"
                : "bg-white/10 text-fog hover:bg-white/20"
            }`}
          >
            Close
          </button>
        </div>
        <div className="mt-4 space-y-4">{children}</div>
      </div>
    </div>
  );
}

function ModalRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed opacity-90">{value}</p>
    </div>
  );
}

function HeroStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
      style={{ boxShadow: `inset 0 0 0 1px ${accent}22` }}
    >
      <p className="text-[11px] uppercase tracking-wider text-fog/55">{label}</p>
      <p className="mt-1 text-3xl font-bold" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}

export function QuestionnaireVisualReport({
  result,
  answers,
  scanFindingCount,
}: {
  result: ComplianceResult;
  answers: Record<string, Answer>;
  scanFindingCount: number;
}) {
  const answerCounts = { yes: 0, no: 0, unsure: 0 };
  for (const v of Object.values(answers)) {
    if (v === "yes" || v === "no" || v === "unsure") answerCounts[v] += 1;
  }
  const answerData = [
    { name: "Yes", value: answerCounts.yes, color: COLORS.yes },
    { name: "No", value: answerCounts.no, color: COLORS.no },
    { name: "Unsure", value: answerCounts.unsure, color: COLORS.unsure },
  ].filter((d) => d.value > 0);

  const flagLevels = [
    {
      name: "Elevated",
      value: result.flags.filter((f) => f.level === "elevated").length,
      color: COLORS.elevated,
    },
    {
      name: "Watch",
      value: result.flags.filter((f) => f.level === "watch").length,
      color: COLORS.watch,
    },
  ].filter((d) => d.value > 0);

  const scorePct = Math.min(100, Math.round((result.score / 20) * 100));
  const overallColor =
    result.overall === "elevated"
      ? COLORS.elevated
      : result.overall === "watch"
        ? COLORS.watch
        : COLORS.low;

  const pe = result.plainEnglish;
  const sortedFlags = [...result.flags].sort((a, b) => {
    const rank = { elevated: 0, watch: 1, low: 2 };
    return rank[a.level] - rank[b.level];
  });
  const generated = new Date().toLocaleString();

  return (
    <article className="overflow-hidden rounded-sm border border-[var(--line)] bg-white shadow-sm">
      {/* Cover / letterhead */}
      <header className="border-b border-[var(--line)] bg-ink px-6 py-8 text-fog sm:px-10 sm:py-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-signal">
              CounterLayer · Diligence report
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              Owner checklist risk report
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fog/80">
              {pe.headline}
            </p>
            <p className="mt-4 text-xs text-fog/50">
              Generated {generated}
              {scanFindingCount
                ? ` · ${scanFindingCount} public-site flag${scanFindingCount === 1 ? "" : "s"} available to read alongside this report`
                : " · public site review not attached"}
              {" · "}Diligence guide — not a law firm / not a substitute for counsel
            </p>
          </div>
          <div className="min-w-[9rem] border border-white/15 bg-white/5 px-5 py-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.16em] text-fog/55">
              Overall rating
            </p>
            <p className="mt-2 text-2xl font-bold" style={{ color: overallColor }}>
              {result.overall.toUpperCase()}
            </p>
            <p className="mt-1 text-xs text-fog/55">Score {result.score}</p>
          </div>
        </div>
      </header>

      {/* Contents */}
      <nav className="border-b border-[var(--line)] bg-[#f7faf8] px-6 py-4 sm:px-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">
          Contents
        </p>
        <ol className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-soft">
          {[
            "1. Executive summary",
            "2. Snapshot charts",
            "3. How to read this",
            "4. Priority actions",
            "5. Detailed findings",
            "6. Rulebooks & method",
            "7. Limits & next steps",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </nav>

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        {/* 1. Executive summary */}
        <section className="border-b border-[var(--line)] pb-10">
          <ReportSectionLabel n="01" title="Executive summary" />
          <p className="mt-4 text-lg font-medium leading-relaxed text-ink">
            {pe.overallExplained}
          </p>
          <div className="mt-5 space-y-4">
            {pe.executiveNarrative.map((para) => (
              <p
                key={para.slice(0, 48)}
                className="text-[15px] leading-7 text-ink-soft"
              >
                {para}
              </p>
            ))}
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {pe.inSimpleTerms.map((line) => (
              <li
                key={line.slice(0, 40)}
                className="border border-[var(--line)] bg-[#f7faf8] px-4 py-3 text-sm leading-relaxed text-ink"
              >
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-mute">
            {pe.whatWeLookedAt}
          </p>
        </section>

        {/* 2. Compact charts */}
        <section className="border-b border-[var(--line)] py-10">
          <ReportSectionLabel n="02" title="Snapshot charts" />
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mute">
            Charts are a quick visual only. The numbered findings further down
            are the substance of this report.
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <div className="border border-[var(--line)] bg-[#f7faf8] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                Answers
              </p>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={answerData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={28}
                      outerRadius={48}
                      paddingAngle={2}
                    >
                      {answerData.map((d) => (
                        <Cell key={d.name} fill={d.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyleLight} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <LegendRow
                light
                items={answerData.map((d) => ({
                  label: `${d.name} ${d.value}`,
                  color: d.color,
                }))}
              />
            </div>
            <div className="border border-[var(--line)] bg-[#f7faf8] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                Flag severity
              </p>
              <div className="h-28">
                {flagLevels.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-xs text-mute">
                    No severity flags
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={flagLevels} margin={{ top: 4, bottom: 0 }}>
                      <XAxis dataKey="name" stroke={COLORS.mute} fontSize={10} />
                      <YAxis allowDecimals={false} stroke={COLORS.mute} fontSize={10} width={24} />
                      <Tooltip contentStyle={tooltipStyleLight} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {flagLevels.map((d) => (
                          <Cell key={d.name} fill={d.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
            <div className="border border-[var(--line)] bg-[#f7faf8] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                Score band
              </p>
              <div className="flex h-28 flex-col justify-center gap-3 px-1">
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-ink">{result.score}</p>
                  <p className="text-xs text-mute">points</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-fog-deep">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${scorePct}%`,
                      background: overallColor,
                    }}
                  />
                </div>
                <p className="text-[11px] leading-snug text-mute">
                  &lt;4 low · 4–9 watch · 10+ elevated
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. How to read */}
        <section className="border-b border-[var(--line)] py-10">
          <ReportSectionLabel n="03" title="How to read this report" />
          <div className="mt-5 grid gap-8 lg:grid-cols-2">
            <ol className="list-decimal space-y-3 pl-5 text-[15px] leading-7 text-ink-soft">
              {pe.howToReadThis.map((h) => (
                <li key={h.slice(0, 40)}>{h}</li>
              ))}
            </ol>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-mute">
                Rating key
              </p>
              <ul className="mt-3 space-y-3">
                {pe.levelGuide.map((g) => (
                  <li key={g.level} className="border-l-2 border-ink/20 pl-3">
                    <p className="text-sm font-semibold text-ink">{g.level}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {g.meaning}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Priorities */}
        <section className="border-b border-[var(--line)] py-10">
          <ReportSectionLabel n="04" title="Priority action plan" />
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-ink-soft">
            Work top-down. These items are ordered for impact, not alphabetical
            order. Assign each to a person and a date.
          </p>
          <ol className="mt-6 divide-y divide-[var(--line)] border border-[var(--line)]">
            {pe.topPriorities.map((p, i) => (
              <li
                key={p.slice(0, 48)}
                className="flex gap-4 bg-white px-4 py-4 text-[15px] leading-7 text-ink sm:px-5"
              >
                <span
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center text-xs font-bold text-fog"
                  style={{ background: overallColor }}
                >
                  {i + 1}
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 border border-[var(--line)] bg-[#f7faf8] px-4 py-3 text-sm leading-relaxed text-ink">
            <span className="font-semibold">If you do nothing: </span>
            {pe.ifYouDoNothing}
          </p>
        </section>

        {/* 5. Findings */}
        <section className="border-b border-[var(--line)] py-10">
          <ReportSectionLabel n="05" title="Detailed findings" />
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-ink-soft">
            Each finding explains the theme in plain language, what your answer
            implies, and the immediate remediation steps. Elevated first, then
            watch.
          </p>
          {sortedFlags.length === 0 ? (
            <p className="mt-6 border border-dashed border-[var(--line)] bg-[#f7faf8] px-5 py-6 text-sm leading-relaxed text-mute">
              No “yes / unsure” risk findings on this pass. Your clear answers
              are a good baseline — re-run when you add exclusivity, competitor
              partnerships, or a marketplace.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {sortedFlags.map((f, idx) => (
                <div
                  key={f.questionId}
                  className="border border-[var(--line)] bg-white"
                >
                  <div className="flex flex-wrap items-center gap-2 border-b border-[var(--line)] bg-[#f7faf8] px-4 py-2.5 sm:px-5">
                    <span className="text-xs font-semibold text-mute">
                      Finding {idx + 1}
                    </span>
                    <RiskBadge level={f.level} />
                    <span className="text-xs uppercase tracking-wider text-mute">
                      {f.theme}
                    </span>
                    <span className="text-xs text-mute">
                      · {f.domains.map((d) => d.replace(/_/g, " ")).join(", ")}
                    </span>
                  </div>
                  <div className="space-y-3 px-4 py-4 sm:px-5">
                    <p className="text-sm font-medium text-ink">{f.prompt}</p>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                        Why this matters
                      </p>
                      <p className="mt-1 text-[15px] leading-7 text-ink-soft">
                        {f.plainWhy}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                        What it means for you
                      </p>
                      <p className="mt-1 text-[15px] leading-7 text-ink">
                        {f.soWhat}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                        Immediate fixes
                      </p>
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink-soft">
                        {f.remediation.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-xs text-mute">{f.note}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 6. Method & domains */}
        <section className="border-b border-[var(--line)] py-10">
          <ReportSectionLabel n="06" title="Rulebooks & methodology" />
          <div className="mt-5 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-mute">
                How scoring works
              </p>
              <ul className="mt-3 space-y-2 text-[15px] leading-7 text-ink-soft">
                {pe.methodology.map((m) => (
                  <li key={m.slice(0, 40)} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-mute">
                Which rulebooks your flags touch
              </p>
              {pe.domainNotes.length === 0 ? (
                <p className="mt-3 text-sm text-mute">
                  No domain flags on this pass.
                </p>
              ) : (
                <ul className="mt-3 space-y-4">
                  {pe.domainNotes.map((d) => (
                    <li key={d.domain} className="border border-[var(--line)] p-4">
                      <p className="text-sm font-semibold text-ink">
                        {d.label}{" "}
                        <span className="font-normal text-mute">
                          ({d.count})
                        </span>
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {d.meaning}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                {result.jurisdictionNote}
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {result.summary.map((s, i) => (
              <div key={s.slice(0, 30)} className="border border-[var(--line)] p-4">
                <p
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: i === 0 ? overallColor : COLORS.mute }}
                >
                  Takeaway {i + 1}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Limits */}
        <section className="pt-10">
          <ReportSectionLabel n="07" title="Limits & next steps" />
          <div className="mt-5 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-mute">
                What this report is not
              </p>
              <ul className="mt-3 space-y-2 text-[15px] leading-7 text-ink-soft">
                {pe.whatThisIsNot.map((w) => (
                  <li key={w.slice(0, 36)}>· {w}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-mute">
                Suggested next steps
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-7 text-ink">
                {pe.nextSteps.map((n) => (
                  <li key={n.slice(0, 36)}>{n}</li>
                ))}
              </ol>
            </div>
          </div>
          <p className="mt-8 border-t border-[var(--line)] pt-6 text-sm leading-relaxed text-mute">
            {pe.closingNote}
          </p>
          <p className="mt-2 text-sm font-medium text-ink">{result.counselCue}</p>
        </section>
      </div>
    </article>
  );
}

function ReportSectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-[family-name:var(--font-display)] text-sm font-bold text-mute">
        {n}
      </span>
      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-ink sm:text-2xl">
        {title}
      </h3>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-fog/60">
        {title}
      </p>
      {children}
    </div>
  );
}

function ChartCardLight({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-sm">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-mute">
        {title}
      </p>
      {children}
    </div>
  );
}

function LegendRow({
  items,
  light,
}: {
  items: { label: string; color: string }[];
  light?: boolean;
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item.label}
          className={`inline-flex items-center gap-1.5 text-xs ${
            light ? "text-mute" : "text-fog/70"
          }`}
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: item.color }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center text-sm text-fog/50">
      {label}
    </div>
  );
}

function EmptyChartLight({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center text-sm text-mute">
      {label}
    </div>
  );
}

function riskColor(score: number) {
  if (score >= 60) return COLORS.elevated;
  if (score >= 30) return COLORS.watch;
  return COLORS.low;
}

const tooltipStyle = {
  background: "#0c2e2c",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  color: "#e7f0ed",
  fontSize: 12,
};

const tooltipStyleLight = {
  background: "#ffffff",
  border: "1px solid rgba(6,26,26,0.12)",
  borderRadius: 12,
  color: "#061a1a",
  fontSize: 12,
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  const styles =
    level === "elevated"
      ? "bg-danger/15 text-danger"
      : level === "watch"
        ? "bg-warn/20 text-ink"
        : "bg-signal/20 text-signal-dim";
  const label =
    level === "elevated" ? "Elevated" : level === "watch" ? "Watch" : "Low";
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${styles}`}
    >
      {label}
    </span>
  );
}
