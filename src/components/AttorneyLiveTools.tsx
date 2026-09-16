"use client";

import { useState } from "react";
import type { CounselMatter } from "@/lib/attorneyPractice";
import type { DocketHit } from "@/lib/liveSources";
import { fmt } from "@/lib/thresholds";

type Panel = "dockets" | "thresholds" | "file";

type ThresholdResult = {
  retrievedAt: string;
  warning: string | null;
  ftcPage: {
    url: string;
    ok: boolean;
    status: number;
    title: string | null;
    stillShows2026Figures: boolean;
  };
  euSource: string;
  hsr: { reportable: string; headline: string; reasons: string[]; fee: number | null } | null;
  eu: { reportable: string; headline: string; reasons: string[] } | null;
};

type CitationResult = {
  name: string;
  citation: string;
  url: string;
  ok: boolean;
  status: number;
  title: string | null;
  retrievedAt: string;
  error?: string;
};

const field =
  "mt-1 w-full rounded-xl border border-[var(--line)] bg-paper px-3 py-2.5 text-sm";

export function AttorneyLiveTools({
  panel,
  matter,
  userEmail,
}: {
  panel: Panel;
  matter: CounselMatter;
  userEmail: string;
}) {
  const [query, setQuery] = useState(matter.counterparty || matter.client || matter.title);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hits, setHits] = useState<DocketHit[]>([]);
  const [retrievedAt, setRetrievedAt] = useState<string | null>(null);
  const [thresholds, setThresholds] = useState<ThresholdResult | null>(null);
  const [citations, setCitations] = useState<CitationResult[]>([]);
  const [hsrValue, setHsrValue] = useState("");
  const [acquirer, setAcquirer] = useState("");
  const [acquired, setAcquired] = useState("");
  const [wwA, setWwA] = useState("");
  const [wwB, setWwB] = useState("");
  const [euA, setEuA] = useState("");
  const [euB, setEuB] = useState("");
  const [twoThirds, setTwoThirds] = useState(false);
  const [altStates, setAltStates] = useState(false);

  async function call(body: Record<string, unknown>) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/attorney/live", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-counterlayer-email": userEmail,
        },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Lookup failed.");
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed.");
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function searchDockets() {
    const data = (await call({
      action: "dockets",
      query,
      forum: matter.forum,
    })) as { hits?: DocketHit[]; retrievedAt?: string; warnings?: string[] } | null;
    if (!data) return;
    setHits(data.hits ?? []);
    setRetrievedAt(data.retrievedAt ?? null);
    if (data.warnings?.length) setError(data.warnings.join(" "));
  }

  async function runThresholds() {
    const data = (await call({
      action: "thresholds",
      hsr: {
        transactionUsd: Number(hsrValue) || 0,
        acquiringUsd: Number(acquirer) || 0,
        acquiredUsd: Number(acquired) || 0,
      },
      eu: {
        worldwideA: Number(wwA) || 0,
        worldwideB: Number(wwB) || 0,
        euA: Number(euA) || 0,
        euB: Number(euB) || 0,
        twoThirdsSameMemberState: twoThirds,
        altThreeStatesMet: altStates,
      },
    })) as ThresholdResult | null;
    if (data) setThresholds(data);
  }

  async function checkCitations() {
    const data = (await call({
      action: "citations",
      issue: matter.issue,
    })) as { checked?: CitationResult[]; retrievedAt?: string } | null;
    if (!data) return;
    setCitations(data.checked ?? []);
    setRetrievedAt(data.retrievedAt ?? null);
  }

  function filingPacket() {
    const portal = filingPortal(matter);
    const lines = [
      `FILING PACKET — ${matter.title}`,
      `Client: ${matter.client || "—"}`,
      `Counterparty: ${matter.counterparty || "—"}`,
      `Forum: ${matter.forum}`,
      `Issue: ${matter.issue}`,
      "",
      "Facts",
      matter.facts || "—",
      "",
      "Market",
      matter.market || matter.marketNotes.product || "—",
      "",
      thresholds?.hsr
        ? `HSR: ${thresholds.hsr.headline} Fee: ${thresholds.hsr.fee ? `$${fmt(thresholds.hsr.fee)}` : "n/a"}`
        : "HSR: not calculated in this session.",
      thresholds?.eu ? `EU turnover: ${thresholds.eu.headline}` : "EU turnover: not calculated.",
      "",
      "Live hits to attach",
      ...(hits.length
        ? hits.map((h) => `- ${h.title} (${h.number ?? h.court}) ${h.url}`)
        : ["- None pulled yet. Run docket search first."]),
      "",
      "Submit this packet yourself in the official system.",
      portal.label,
      portal.url,
      "",
      "CounterLayer prepared this packet. It does not transmit it. You file it with your own credentials.",
    ];
    return { text: lines.join("\n"), portal };
  }

  function downloadPacket() {
    const { text } = filingPacket();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(matter.title || "filing").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-packet.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (panel === "dockets") {
    return (
      <div className="mt-5 space-y-4">
        <p className="text-sm text-ink-soft">
          United States hits come from CourtListener federal dockets, newest first.
          European Union hits open the Commission register, the DMA register, and Curia.
          Closed files can still appear — check the date and status on the source page.
        </p>
        <label className="block text-sm">
          <span className="text-mute">Party, docket, or case number</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} className={field} />
        </label>
        <button
          type="button"
          disabled={busy}
          onClick={() => void searchDockets()}
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-fog disabled:opacity-50"
        >
          {busy ? "Searching…" : "Search live dockets"}
        </button>
        {error && <p className="text-sm text-danger">{error}</p>}
        {retrievedAt && <p className="text-xs text-mute">Retrieved {retrievedAt}</p>}
        <ul className="space-y-3">
          {hits.map((hit) => (
            <li key={hit.id} className="rounded-2xl border border-[var(--line)] bg-white p-4">
              <a href={hit.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-ink hover:underline">
                {hit.title}
              </a>
              <p className="mt-1 text-xs text-mute">
                {hit.forum} · {hit.court}
                {hit.number ? ` · ${hit.number}` : ""}
                {hit.filed ? ` · filed ${hit.filed}` : ""}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{hit.note}</p>
              <p className="mt-1 text-[11px] text-mute">{hit.source}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (panel === "thresholds") {
    return (
      <div className="mt-5 space-y-5">
        <p className="text-sm text-ink-soft">
          HSR uses the FTC 2026 thresholds. Before the result is shown, the desk
          re-reads the FTC page and checks that those figures are still there.
          EU turnover uses Article 1 of Regulation 139/2004, which is not indexed every year.
        </p>
        <div className="grid gap-4 lg:grid-cols-2">
          <fieldset className="rounded-2xl border border-[var(--line)] bg-white p-4">
            <legend className="px-1 text-xs font-semibold uppercase tracking-wider text-mute">
              United States — dollars
            </legend>
            <Num label="Transaction value" value={hsrValue} onChange={setHsrValue} />
            <Num label="Acquiring person sales or assets" value={acquirer} onChange={setAcquirer} />
            <Num label="Acquired person sales or assets" value={acquired} onChange={setAcquired} />
          </fieldset>
          <fieldset className="rounded-2xl border border-[var(--line)] bg-white p-4">
            <legend className="px-1 text-xs font-semibold uppercase tracking-wider text-mute">
              European Union — euros
            </legend>
            <Num label="Undertaking A worldwide" value={wwA} onChange={setWwA} />
            <Num label="Undertaking B worldwide" value={wwB} onChange={setWwB} />
            <Num label="Undertaking A EU turnover" value={euA} onChange={setEuA} />
            <Num label="Undertaking B EU turnover" value={euB} onChange={setEuB} />
            <label className="mt-3 flex gap-2 text-sm text-ink">
              <input type="checkbox" checked={twoThirds} onChange={(e) => setTwoThirds(e.target.checked)} />
              Each achieves more than two-thirds of EU turnover in the same Member State
            </label>
            <label className="mt-2 flex gap-2 text-sm text-ink">
              <input type="checkbox" checked={altStates} onChange={(e) => setAltStates(e.target.checked)} />
              Alternative three-Member-State turnover test is met
            </label>
          </fieldset>
        </div>
        <button
          type="button"
          disabled={busy}
          onClick={() => void runThresholds()}
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-fog disabled:opacity-50"
        >
          {busy ? "Checking FTC page…" : "Compute and confirm sources"}
        </button>
        {error && <p className="text-sm text-danger">{error}</p>}
        {thresholds && (
          <div className="space-y-3">
            {thresholds.warning && (
              <p className="rounded-xl border border-danger/30 bg-danger/5 p-3 text-sm text-danger">
                {thresholds.warning}
              </p>
            )}
            <article className="rounded-2xl border border-[var(--line)] bg-white p-4 text-sm">
              <p className="font-semibold text-ink">HSR — {thresholds.hsr?.headline}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-soft">
                {thresholds.hsr?.reasons.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <a href={thresholds.ftcPage.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-signal-dim">
                FTC source retrieved {thresholds.retrievedAt}
                {thresholds.ftcPage.stillShows2026Figures ? " · 2026 figures still on the page" : " · figures not confirmed"}
              </a>
            </article>
            <article className="rounded-2xl border border-[var(--line)] bg-white p-4 text-sm">
              <p className="font-semibold text-ink">EU — {thresholds.eu?.headline}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-soft">
                {thresholds.eu?.reasons.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <a href={thresholds.euSource} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-signal-dim">
                Regulation 139/2004 on EUR-Lex
              </a>
            </article>
          </div>
        )}
        <button
          type="button"
          disabled={busy}
          onClick={() => void checkCitations()}
          className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-ink disabled:opacity-50"
        >
          Confirm statute pages for this issue
        </button>
        {citations.length > 0 && (
          <ul className="space-y-2">
            {citations.map((c) => (
              <li key={c.url} className="rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm">
                <a href={c.url} target="_blank" rel="noreferrer" className="font-semibold text-ink hover:underline">
                  {c.name}
                </a>
                <span className="text-mute"> · {c.citation}</span>
                <p className="mt-1 text-xs text-mute">
                  {c.ok ? `Live ${c.status}` : `Unconfirmed (${c.status || "no response"})`}
                  {c.title ? ` · ${c.title}` : ""}
                  {" · "}
                  {c.retrievedAt}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  const packet = filingPacket();
  return (
    <div className="mt-5 space-y-4">
      <p className="text-sm text-ink-soft">
        This prepares the packet and opens the official filing system. It does
        not submit the filing. HSR, PACER, and the Commission portals require
        your own login. A tool cannot file in your name without those
        credentials, and it should not.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={downloadPacket}
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-fog"
        >
          Download filing packet
        </button>
        <a
          href={packet.portal.url}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-ink"
        >
          Open {packet.portal.label}
        </a>
      </div>
      <pre className="max-h-[50vh] overflow-auto whitespace-pre-wrap rounded-2xl border border-[var(--line)] bg-white p-4 text-sm text-ink">
        {packet.text}
      </pre>
    </div>
  );
}

function Num({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="mt-3 block text-sm">
      <span className="text-mute">{label}</span>
      <input
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
        className={field}
      />
    </label>
  );
}

function filingPortal(matter: CounselMatter): { label: string; url: string } {
  if (matter.issue === "merger" && matter.forum !== "EU") {
    return { label: "HSR filing system", url: "https://www.hsr.gov/" };
  }
  if (matter.issue === "merger") {
    return {
      label: "Commission merger procedures",
      url: "https://competition-policy.ec.europa.eu/mergers/procedures_en",
    };
  }
  if (matter.forum === "EU" || matter.issue === "dma") {
    return {
      label: "Commission competition desk",
      url: "https://competition-policy.ec.europa.eu/index_en",
    };
  }
  if (matter.representation === "complainant" || matter.issue === "ftc") {
    return { label: "FTC report", url: "https://reportfraud.ftc.gov/" };
  }
  if (matter.issue === "cartel") {
    return {
      label: "DOJ Antitrust complaint center",
      url: "https://www.justice.gov/atr/citizen-complaint-center",
    };
  }
  return { label: "PACER", url: "https://pacer.uscourts.gov/" };
}
