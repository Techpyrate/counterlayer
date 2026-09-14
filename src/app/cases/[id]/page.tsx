import Link from "next/link";
import { notFound } from "next/navigation";
import { caseById } from "@/data/cases";
import { lawById } from "@/data/laws";
import { companies } from "@/data/companies";
import { CaseEngagement } from "@/components/CaseEngagement";
import { SectionLabel } from "@/components/Ui";
import { PageWrap } from "@/components/PageWrap";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = caseById[id];
  if (!c) notFound();

  const relatedCompanies = companies.filter((co) =>
    c.companies.includes(co.id),
  );
  const pe = c.plainEnglish;

  return (
    <PageWrap narrow className="py-12 md:py-16">
      <Link href="/cases" className="text-sm text-mute hover:text-ink">
        ← Case library
      </Link>
      <SectionLabel>
        <span className="mt-6 inline-block">
          {c.jurisdictions.join(" · ")} · {c.status} · ~{c.readingMinutes} min
          read
        </span>
      </SectionLabel>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-ink md:text-4xl">
        {c.name}
      </h1>
      <p className="mt-2 text-sm text-mute">
        {c.yearStart}
        {c.yearEnd ? `–${c.yearEnd}` : "–present"} · {c.markets.join(", ")}
      </p>

      <p className="mt-8 rounded-2xl border border-[var(--line)] bg-fog/50 p-5 text-base leading-relaxed text-ink-soft md:p-6">
        {pe.inOneMinute}
      </p>

      <section className="mt-12 space-y-12">
        <ArticleBlock title="The story" paras={pe.theStory} />
        <ArticleBlock title="Why it matters" paras={pe.whyItMatters} />
        <ArticleBlock title="What was claimed" paras={pe.whatWasClaimed} />
        <ArticleBlock title="The other side" paras={pe.theOtherSide} />
        <ArticleBlock
          title="What it means for you"
          paras={pe.whatItMeansForYou}
        />

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            Bottom line
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-ink">{pe.bottomLine}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            Timeline
          </h2>
          <ol className="mt-4 space-y-5 border-l border-[var(--line)] pl-5">
            {c.timeline.map((t) => (
              <li key={`${t.date}-${t.title}`} className="relative">
                <span className="absolute -left-[1.4rem] top-1.5 h-2.5 w-2.5 rounded-full bg-signal" />
                <p className="text-xs font-semibold uppercase tracking-wider text-signal-dim">
                  {t.date}
                </p>
                <h3 className="mt-1 font-semibold text-ink">{t.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {t.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            Key dates
          </h2>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {c.keyDates.map((d) => (
              <div
                key={`${d.label}-${d.date}`}
                className="rounded-xl border border-[var(--line)] px-4 py-3"
              >
                <dt className="text-xs uppercase tracking-wider text-mute">
                  {d.label}
                </dt>
                <dd className="mt-1 font-medium text-ink">{d.date}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            Formal snapshot
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-soft">
            <p>
              <span className="font-medium text-ink">Summary: </span>
              {c.summary}
            </p>
            <p>
              <span className="font-medium text-ink">
                Regulator / plaintiff argument:{" "}
              </span>
              {c.regulatorArgument}
            </p>
            <p>
              <span className="font-medium text-ink">Outcome: </span>
              {c.outcome}
            </p>
            {c.remedies && (
              <p>
                <span className="font-medium text-ink">Remedies: </span>
                {c.remedies}
              </p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            Conduct tags
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {c.conduct.map((t) => (
              <span
                key={t}
                className="rounded-full bg-ink/5 px-3 py-1 text-sm"
              >
                {t.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            Laws referenced
          </h2>
          <ul className="mt-3 space-y-2">
            {c.laws.map((lid) => {
              const law = lawById[lid];
              if (!law) return null;
              return (
                <li key={lid} className="text-sm text-ink-soft">
                  <span className="font-medium text-ink">{law.name}</span> —{" "}
                  {law.citation}
                </li>
              );
            })}
          </ul>
        </div>

        {relatedCompanies.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
              Companies
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedCompanies.map((co) => (
                <Link
                  key={co.id}
                  href={`/companies/${co.id}`}
                  className="rounded-full border border-[var(--line)] px-3 py-1 text-sm hover:bg-fog"
                >
                  {co.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            Sources
          </h2>
          <ul className="mt-3 space-y-2">
            {c.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-signal-dim underline-offset-2 hover:underline"
                >
                  {s.label} →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CaseEngagement caseId={c.id} />
    </PageWrap>
  );
}

function ArticleBlock({
  title,
  paras,
}: {
  title: string;
  paras: string[];
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
        {title}
      </h2>
      <div className="mt-3 space-y-4">
        {paras.map((p) => (
          <p key={p.slice(0, 48)} className="leading-relaxed text-ink-soft">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
