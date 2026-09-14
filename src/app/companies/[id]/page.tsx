import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompanyWithCases } from "@/lib/analyze";
import { buildCompanyRecord } from "@/lib/companyNarrative";
import { CaseCard, SectionLabel } from "@/components/Ui";
import { PageWrap } from "@/components/PageWrap";

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = getCompanyWithCases(id);
  if (!data) notFound();
  const { company, cases } = data;
  const record = buildCompanyRecord(company, cases);

  return (
    <PageWrap narrow className="py-12 md:py-16">
      <Link href="/companies" className="text-sm text-mute hover:text-ink">
        ← Companies
      </Link>
      <SectionLabel>
        <span className="mt-6 inline-block">Competition record</span>
      </SectionLabel>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-ink sm:text-4xl md:text-5xl">
        {company.name}
      </h1>
      <p className="mt-2 text-sm text-mute">{record.readingHint}</p>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">{company.blurb}</p>

      <section className="mt-12 space-y-12">
        <Article title="Overview" paras={record.overview} />
        <Article
          title="Competition footprint"
          paras={record.competitionFootprint}
        />
        <Article
          title="Consumer & business angle"
          paras={record.consumerAndBusinessAngle}
        />

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            What to watch
          </h2>
          <ul className="mt-3 space-y-3">
            {record.whatToWatch.map((item) => (
              <li
                key={item.slice(0, 40)}
                className="border-l-2 border-signal pl-4 text-sm leading-relaxed text-ink-soft"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            Markets
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {company.markets.join(" · ") || "Not tagged yet"}
          </p>
          {company.aliases.length > 0 && (
            <p className="mt-2 text-sm text-mute">
              Also known as: {company.aliases.join(", ")}
            </p>
          )}
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
            Conduct themes
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {company.conductThemes.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--line)] px-3 py-1 text-sm"
              >
                {t.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-14 border-t border-[var(--line)]">
        <SectionLabel>
          <span className="mt-8 inline-block">Linked cases in the library</span>
        </SectionLabel>
        {cases.length === 0 ? (
          <p className="mt-4 text-sm text-mute">
            No linked matters in the current library yet. The narrative above is
            still a market-power primer — check primary sources for live
            disputes.
          </p>
        ) : (
          cases.map((c) => <CaseCard key={c.id} c={c} />)
        )}
      </div>
    </PageWrap>
  );
}

function Article({ title, paras }: { title: string; paras: string[] }) {
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
