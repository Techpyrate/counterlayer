"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  blankMatter,
  buildCounselMemo,
  elementChecks,
  evidenceRequests,
  itemsFor,
  loadMatters,
  matterStatuses,
  procedureSteps,
  representations,
  saveMatters,
  sevenDayPlan,
  whyCite,
  type CounselMatter,
  type MatterStatus,
  type Representation,
} from "@/lib/attorneyPractice";
import {
  currentCounselMatters,
  forumLabel,
  frameworksFor,
  issueById,
  issueOptions,
  routesFor,
  type DeskForum,
  type IssueKind,
} from "@/lib/attorneyDesk";
import { PRODUCT_BOUNDARY_SHORT } from "@/lib/positioning";
import { AttorneyLiveTools } from "@/components/AttorneyLiveTools";

type Tab =
  | "file"
  | "elements"
  | "market"
  | "procedure"
  | "evidence"
  | "live"
  | "dockets"
  | "thresholds"
  | "filepack"
  | "memo";

const tabs: { id: Tab; label: string }[] = [
  { id: "file", label: "File" },
  { id: "elements", label: "Elements" },
  { id: "market", label: "Market" },
  { id: "procedure", label: "Procedure" },
  { id: "evidence", label: "Evidence" },
  { id: "live", label: "Library matches" },
  { id: "dockets", label: "Live dockets" },
  { id: "thresholds", label: "Thresholds" },
  { id: "filepack", label: "File" },
  { id: "memo", label: "Memo" },
];

const fieldClass =
  "mt-1 w-full rounded-xl border border-[var(--line)] bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:ring-2 focus:ring-signal/30";

export function AttorneyMode({ userEmail }: { userEmail: string }) {
  const [tab, setTab] = useState<Tab>("file");
  const [matters, setMatters] = useState<CounselMatter[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loaded = loadMatters(userEmail);
    if (loaded.length === 0) {
      const first = blankMatter();
      setMatters([first]);
      setActiveId(first.id);
    } else {
      setMatters(loaded);
      setActiveId(loaded[0]!.id);
    }
    setReady(true);
  }, [userEmail]);

  useEffect(() => {
    if (!ready) return;
    saveMatters(userEmail, matters);
  }, [matters, ready, userEmail]);

  const matter = matters.find((m) => m.id === activeId) ?? matters[0];

  function patch(partial: Partial<CounselMatter>) {
    if (!matter) return;
    setMatters((prev) =>
      prev.map((m) =>
        m.id === matter.id
          ? { ...m, ...partial, updatedAt: new Date().toISOString() }
          : m,
      ),
    );
  }

  function patchMarket(key: keyof CounselMatter["marketNotes"], value: string) {
    if (!matter) return;
    patch({ marketNotes: { ...matter.marketNotes, [key]: value } });
  }

  function toggleCheck(id: string) {
    if (!matter) return;
    const checked = matter.checked.includes(id)
      ? matter.checked.filter((x) => x !== id)
      : [...matter.checked, id];
    patch({ checked });
  }

  function toggleCite(id: string) {
    if (!matter) return;
    const citedCaseIds = matter.citedCaseIds.includes(id)
      ? matter.citedCaseIds.filter((x) => x !== id)
      : [...matter.citedCaseIds, id];
    patch({ citedCaseIds });
  }

  function newMatter() {
    const next = blankMatter();
    setMatters((prev) => [next, ...prev]);
    setActiveId(next.id);
    setTab("file");
  }

  function removeMatter(id: string) {
    setMatters((prev) => {
      const next = prev.filter((m) => m.id !== id);
      if (next.length === 0) {
        const blank = blankMatter();
        setActiveId(blank.id);
        return [blank];
      }
      if (activeId === id) setActiveId(next[0]!.id);
      return next;
    });
  }

  const spec = matter ? issueById(matter.issue) : issueById("dominance");
  const elements = matter
    ? itemsFor(elementChecks, matter.forum, matter.issue, matter.representation)
    : [];
  const procedure = matter
    ? itemsFor(procedureSteps, matter.forum, matter.issue, matter.representation)
    : [];
  const evidence = matter
    ? itemsFor(evidenceRequests, matter.forum, matter.issue, matter.representation)
    : [];
  const live = useMemo(
    () =>
      matter
        ? currentCounselMatters(matter.forum, issueById(matter.issue).conducts)
        : [],
    [matter],
  );
  const laws = frameworksFor(matter?.forum ?? "Both", spec.lawIds);
  const routes = routesFor(matter?.forum ?? "Both", spec.pathIds);
  const memo = matter ? buildCounselMemo(matter) : "";
  const done = elements.filter((e) => matter?.checked.includes(e.id)).length;

  async function copyMemo() {
    await navigator.clipboard.writeText(memo);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function downloadMemo() {
    const blob = new Blob([memo], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const slug = (matter?.title || "matter").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    a.href = url;
    a.download = `${slug}-counsel-memo.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!matter) {
    return <p className="mt-8 text-sm text-mute">Opening matter file…</p>;
  }

  return (
    <section className="mt-8">
      <p className="max-w-3xl text-sm leading-relaxed text-ink-soft">
        Working file for current United States and European Union competition
        matters. Library matches stay on open cases. Live dockets, threshold
        math, and source checks run from the tabs. Files stay in this browser
        until you export them. {PRODUCT_BOUNDARY_SHORT}
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="min-w-0 flex-1 text-sm">
          <span className="text-mute">Open matter</span>
          <select
            value={matter.id}
            onChange={(e) => setActiveId(e.target.value)}
            className={fieldClass}
          >
            {matters.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title || "Untitled"} · {forumLabel(m.forum)}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-2 sm:pt-5">
          <button
            type="button"
            onClick={newMatter}
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-fog"
          >
            New matter
          </button>
          <button
            type="button"
            onClick={() => removeMatter(matter.id)}
            className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-ink"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 flex gap-1 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
              tab === t.id ? "bg-ink text-fog" : "border border-[var(--line)] text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "file" && (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <label className="text-sm lg:col-span-2">
            <span className="text-mute">Matter title</span>
            <input
              value={matter.title}
              onChange={(e) => patch({ title: e.target.value })}
              className={fieldClass}
            />
          </label>
          <label className="text-sm">
            <span className="text-mute">Client</span>
            <input
              value={matter.client}
              onChange={(e) => patch({ client: e.target.value })}
              className={fieldClass}
            />
          </label>
          <label className="text-sm">
            <span className="text-mute">Counterparty</span>
            <input
              value={matter.counterparty}
              onChange={(e) => patch({ counterparty: e.target.value })}
              className={fieldClass}
            />
          </label>
          <label className="text-sm">
            <span className="text-mute">Your side</span>
            <select
              value={matter.representation}
              onChange={(e) => patch({ representation: e.target.value as Representation })}
              className={fieldClass}
            >
              {representations.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="text-mute">File status</span>
            <select
              value={matter.status}
              onChange={(e) => patch({ status: e.target.value as MatterStatus })}
              className={fieldClass}
            >
              {matterStatuses.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <fieldset className="text-sm">
            <legend className="text-mute">Forum</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  ["US", "United States"],
                  ["EU", "European Union"],
                  ["Both", "US + EU — wall the record"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => patch({ forum: id as DeskForum | "Both" })}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    matter.forum === id ? "bg-ink text-fog" : "border border-[var(--line)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="text-sm">
            <span className="text-mute">Issue</span>
            <select
              value={matter.issue}
              onChange={(e) => patch({ issue: e.target.value as IssueKind })}
              className={fieldClass}
            >
              {issueOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-mute">{spec.hint}</p>
          </label>
          <label className="text-sm lg:col-span-2">
            <span className="text-mute">Market you would plead</span>
            <input
              value={matter.market}
              onChange={(e) => patch({ market: e.target.value })}
              placeholder="Product and geography in one line"
              className={fieldClass}
            />
          </label>
          <label className="text-sm lg:col-span-2">
            <span className="text-mute">Facts you will stand on</span>
            <textarea
              value={matter.facts}
              onChange={(e) => patch({ facts: e.target.value })}
              rows={6}
              className={fieldClass}
            />
          </label>
          <label className="text-sm lg:col-span-2">
            <span className="text-mute">Next action</span>
            <input
              value={matter.nextAction}
              onChange={(e) => patch({ nextAction: e.target.value })}
              placeholder="Call, hold, marker, or draft"
              className={fieldClass}
            />
          </label>
        </div>
      )}

      {tab === "elements" && (
        <div className="mt-5 space-y-3">
          <p className="text-sm text-ink-soft">
            {done} of {elements.length} elements checked for this forum, issue, and side.
          </p>
          {elements.map((item) => (
            <label
              key={item.id}
              className="flex gap-3 rounded-2xl border border-[var(--line)] bg-white p-4"
            >
              <input
                type="checkbox"
                checked={matter.checked.includes(item.id)}
                onChange={() => toggleCheck(item.id)}
                className="mt-1"
              />
              <span>
                <span className="block text-sm font-semibold text-ink">{item.label}</span>
                <span className="mt-1 block text-sm text-ink-soft">{item.detail}</span>
              </span>
            </label>
          ))}
          <div className="rounded-2xl border border-[var(--line)] bg-fog/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-mute">
              Statutes in play
            </p>
            <ul className="mt-3 space-y-2">
              {laws.map((law) => (
                <li key={law.id} className="text-sm text-ink-soft">
                  <span className="font-semibold text-ink">{law.name}</span> · {law.citation}. {law.summary}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab === "market" && (
        <div className="mt-5 grid gap-4">
          {(
            [
              ["product", "Product market", "What is in, what is out, and the next-wider market."],
              ["geographic", "Geographic market", "Where customers can realistically turn."],
              ["shares", "Shares and diversion", "Current figures only. Say the source and the year."],
              ["barriers", "Barriers and durability", "Data, defaults, scale, regulation, or contracts."],
              ["switching", "Switching", "What it costs a customer to leave this quarter."],
              ["customers", "Customers who decide the case", "Names or segments, not a slogan."],
            ] as const
          ).map(([key, label, hint]) => (
            <label key={key} className="text-sm">
              <span className="font-semibold text-ink">{label}</span>
              <span className="mt-0.5 block text-xs text-mute">{hint}</span>
              <textarea
                value={matter.marketNotes[key]}
                onChange={(e) => patchMarket(key, e.target.value)}
                rows={3}
                className={fieldClass}
              />
            </label>
          ))}
        </div>
      )}

      {tab === "procedure" && (
        <div className="mt-5 space-y-3">
          {matter.forum === "Both" && (
            <p className="rounded-2xl border border-signal/40 bg-signal/10 p-4 text-sm text-ink">
              Dual-forum file. A fact you put in an FTC or DOJ submission can be
              used in Europe, and Commission correspondence is not a US
              privileged file. Split speakers and drafts before you send anything.
            </p>
          )}
          {procedure.map((step) => (
            <article key={step.id} className="rounded-2xl border border-[var(--line)] bg-white p-4">
              <h3 className="text-sm font-semibold text-ink">{step.label}</h3>
              <p className="mt-1 text-sm text-ink-soft">{step.detail}</p>
            </article>
          ))}
          <article className="rounded-2xl border border-[var(--line)] bg-white p-4">
            <h3 className="text-sm font-semibold text-ink">Where this would be filed</h3>
            <ul className="mt-3 space-y-3">
              {routes.map((path) => (
                <li key={path.id}>
                  <a
                    href={path.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-ink underline-offset-2 hover:underline"
                  >
                    {path.agency} — {path.name}
                  </a>
                  <p className="mt-1 text-sm text-ink-soft">{path.howToStart}</p>
                  <p className="mt-1 text-xs text-mute">{path.standingNotes}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      )}

      {tab === "evidence" && (
        <div className="mt-5 space-y-3">
          {evidence.map((item) => (
            <label
              key={item.id}
              className="flex gap-3 rounded-2xl border border-[var(--line)] bg-white p-4"
            >
              <input
                type="checkbox"
                checked={matter.checked.includes(item.id)}
                onChange={() => toggleCheck(item.id)}
                className="mt-1"
              />
              <span>
                <span className="block text-sm font-semibold text-ink">{item.label}</span>
                <span className="mt-1 block text-sm text-ink-soft">{item.detail}</span>
              </span>
            </label>
          ))}
          <article className="rounded-2xl border border-[var(--line)] bg-ink p-4 text-fog">
            <h3 className="text-sm font-semibold">Next 7 days</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-fog/80">
              {sevenDayPlan(matter).map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        </div>
      )}

      {tab === "live" && (
        <div className="mt-5 space-y-3">
          <p className="text-sm text-ink-soft">
            Ongoing and appealed only. Mark the ones you will actually cite.
            Closed historical matters stay in the library.
          </p>
          {live.length === 0 ? (
            <p className="text-sm text-mute">No live match in this forum.</p>
          ) : (
            live.map((c) => (
              <article key={c.id} className="rounded-2xl border border-[var(--line)] bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link href={`/cases/${c.id}`} className="text-sm font-semibold text-ink hover:underline">
                      {c.shortName || c.name}
                    </Link>
                    <p className="mt-1 text-xs text-mute">
                      {c.jurisdictions.join(" · ")} · {c.status.replace(/_/g, " ")} · {c.yearStart}
                      {c.yearEnd ? `–${c.yearEnd}` : "–"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleCite(c.id)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      matter.citedCaseIds.includes(c.id)
                        ? "bg-ink text-fog"
                        : "border border-[var(--line)]"
                    }`}
                  >
                    {matter.citedCaseIds.includes(c.id) ? "Cited" : "Cite in memo"}
                  </button>
                </div>
                <p className="mt-2 text-sm text-ink-soft">{c.summary}</p>
                <p className="mt-2 text-sm text-ink">{whyCite(c, matter.issue)}</p>
                <p className="mt-2 text-xs text-mute">Agency theory: {c.regulatorArgument}</p>
              </article>
            ))
          )}
        </div>
      )}

      {(tab === "dockets" || tab === "thresholds" || tab === "filepack") && (
        <AttorneyLiveTools
          panel={tab === "filepack" ? "file" : tab}
          matter={matter}
          userEmail={userEmail}
        />
      )}

      {tab === "memo" && (
        <div className="mt-5">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void copyMemo()}
              className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-fog"
            >
              {copied ? "Copied" : "Copy memo"}
            </button>
            <button
              type="button"
              onClick={downloadMemo}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-ink"
            >
              Download .md
            </button>
          </div>
          <pre className="mt-4 max-h-[70vh] overflow-auto whitespace-pre-wrap rounded-2xl border border-[var(--line)] bg-white p-4 text-sm leading-relaxed text-ink">
            {memo}
          </pre>
        </div>
      )}
    </section>
  );
}
