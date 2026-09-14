import Link from "next/link";
import { ongoingCases } from "@/lib/analyze";
import { cases } from "@/data/cases";
import { SectionLabel } from "@/components/Ui";

export default function HomePage() {
  const live = ongoingCases().length;

  return (
    <div className="pb-8 lg:pb-0">
      {/* Phone / tablet — visible until lg (1024). Survives Safari “desktop site”. */}
      <section className="cl-m-hero lg:hidden">
        <div className="cl-m-hero__glow" aria-hidden />
        <p className="cl-m-hero__brand">CounterLayer</p>
        <div className="cl-m-hero__bar" aria-hidden />
        <h1 className="cl-m-hero__headline">
          See the issue.
          <br />
          Move with clarity.
        </h1>
        <p className="cl-m-hero__lede">
          Competition, consumer protection, and public compliance — guidance
          you can act on.
        </p>

        <div className="cl-m-hero__actions">
          <Link href="/check" className="cl-m-cta cl-m-cta--primary">
            <span className="cl-m-cta__eyebrow">Start here</span>
            <span className="cl-m-cta__title">Scan a website</span>
            <span className="cl-m-cta__sub">
              Free public review · works from your phone
            </span>
          </Link>
          <Link href="/consumers" className="cl-m-cta cl-m-cta--dark">
            <span className="cl-m-cta__eyebrow">Consumers</span>
            <span className="cl-m-cta__title">I need help</span>
            <span className="cl-m-cta__sub">
              Report, rights, and filing pathways
            </span>
          </Link>
        </div>

        <div className="cl-m-stats">
          <div>
            <strong>{cases.length}</strong>
            <span>cases</span>
          </div>
          <div>
            <strong>{live}</strong>
            <span>live</span>
          </div>
          <div>
            <strong>Guide</strong>
            <span>not counsel</span>
          </div>
        </div>
      </section>

      <section className="cl-m-section lg:hidden">
        <p className="cl-m-section__label">Quick tools</p>
        <div className="cl-m-grid">
          <Link href="/report" className="cl-m-tile cl-m-tile--signal">
            Report
          </Link>
          <Link href="/rights" className="cl-m-tile">
            My rights
          </Link>
          <Link href="/assess" className="cl-m-tile">
            Compliance
          </Link>
          <Link href="/cases" className="cl-m-tile">
            Library
          </Link>
        </div>
      </section>

      {/* Large desktop only */}
      <section className="relative hidden overflow-hidden border-b border-[var(--line)] lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(47,214,123,0.15),transparent_55%)]" />
        <div className="relative mx-auto w-full max-w-[min(100%,1600px)] px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 xl:px-10 md:pb-28 md:pt-24">
          <div className="animate-rise">
            <p className="font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[0.95] tracking-tight text-ink xl:text-7xl 2xl:text-8xl">
              CounterLayer
            </p>
            <div className="mt-4 h-1 w-28 bg-signal signal-bar" />
          </div>
          <p className="animate-rise-delay mt-8 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Diligence tools and practical guides for competition, consumer
            protection, and public compliance — so you can spot issues, prepare
            reports, and move with confidence.
          </p>
          <div className="animate-rise-delay-2 mt-10 flex flex-wrap gap-3">
            <Link
              href="/consumers"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-fog transition hover:bg-ink-soft"
            >
              Consumer hub
            </Link>
            <Link
              href="/report"
              className="rounded-full border border-ink/20 bg-paper/60 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/40"
            >
              Report a problem
            </Link>
            <Link
              href="/assess"
              className="rounded-full bg-signal px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-95"
            >
              Compliance scan
            </Link>
            <Link
              href="/check"
              className="rounded-full border border-ink/20 bg-paper/60 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/40"
            >
              Scan My Business
            </Link>
            <Link
              href="/rights"
              className="rounded-full border border-ink/20 bg-paper/60 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/40"
            >
              Something happened to me
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto hidden w-full max-w-[min(100%,1600px)] px-4 py-12 lg:block lg:px-8 xl:px-10">
        <SectionLabel>Competition Watch</SectionLabel>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-ink md:text-4xl">
          What do you need?
        </h2>
        <div className="mt-10 grid gap-0 sm:grid-cols-2 xl:grid-cols-3">
          {[
            {
              href: "/consumers",
              k: "01",
              t: "Consumer hub",
              d: "Billing traps, refunds, hidden fees — report problems and find complaint channels.",
            },
            {
              href: "/report",
              k: "02",
              t: "Report a problem",
              d: "Build a consumer complaint pack with evidence checklist and agency links.",
            },
            {
              href: "/check",
              k: "03",
              t: "Scan My Business",
              d: "Public website review + owner risk map.",
            },
            {
              href: "/assess",
              k: "04",
              t: "Compliance scan",
              d: "Pro: automated compliance controls on public Terms, Privacy, cancel paths.",
            },
            {
              href: "/rights",
              k: "05",
              t: "Know your rights",
              d: "Role + situation → laws, evidence, pathways.",
            },
            {
              href: "/file",
              k: "06",
              t: "What can I file?",
              d: "Map a situation to FTC, DOJ, state AG, EU pathways.",
            },
            {
              href: "/similar",
              k: "07",
              t: "Has this happened before?",
              d: "Match conduct themes to prior matters.",
            },
            {
              href: "/companies",
              k: "08",
              t: "Company history",
              d: "Competition records with linked cases.",
            },
            {
              href: "/ongoing",
              k: "09",
              t: "Live cases",
              d: `${live} ongoing matters in the current dataset.`,
            },
            {
              href: "/power",
              k: "10",
              t: "Consumer power",
              d: "Score lock-in, switching costs, and control.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group border-t border-[var(--line)] py-8 pr-4 transition hover:bg-fog/40 md:pr-8"
            >
              <span className="text-xs tabular-nums text-mute">{item.k}</span>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-ink group-hover:text-signal-dim">
                {item.t}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-mute">
                {item.d}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-ink text-fog">
        <div className="mx-auto w-full max-w-[min(100%,1600px)] px-4 py-12 sm:px-6 lg:px-8 xl:px-10 md:py-20">
          <SectionLabel>
            <span className="text-signal">What we are</span>
          </SectionLabel>
          <p className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-xl font-semibold leading-snug sm:text-2xl md:text-3xl">
            A guide and diligence platform: scan public compliance surfaces,
            map pathways, package evidence, and learn from prior cases.
          </p>
          <p className="mt-6 max-w-2xl text-sm text-fog/60">
            We are not a law firm and not a substitute for counsel on your
            specific facts.
          </p>
        </div>
      </section>
    </div>
  );
}
