import Link from "next/link";
import { PageWrap } from "@/components/PageWrap";
import { SectionLabel } from "@/components/Ui";

const tools = [
  {
    href: "/report",
    title: "Report a problem",
    description:
      "Billing traps, refunds, hidden fees, deceptive offers, delivery failures — pick what happened or describe your own. Get an evidence checklist, agency links, and a draft you can paste.",
    primary: true,
  },
  {
    href: "/rights?role=consumer",
    title: "Know your rights",
    description:
      "What consumer-protection rules may apply to your situation, what evidence helps, and who you can contact — with clear caveats.",
  },
  {
    href: "/power",
    title: "Before you buy",
    description:
      "Check lock-in, cancel difficulty, and switching costs so you know how much control a company will have after you pay.",
  },
  {
    href: "/file?role=consumer",
    title: "Where can I complain?",
    description:
      "FTC ReportFraud, your state attorney general, and consumer-protection bodies — not courtroom antitrust filings.",
  },
];

const topics = [
  "Hard to cancel / auto-renew traps",
  "Refunds denied or delayed",
  "Hidden fees at checkout",
  "Free trial charged without clear warning",
  "Gift card or loyalty balance lost",
  "Digital purchase or license revoked",
  "Order never arrived or wrong item",
  "Defective product / warranty refused",
  "Misleading ads or bait-and-switch",
  "Unauthorized or mystery charges",
  "Privacy or data used without consent",
  "Surprise medical bills",
  "Something else — describe your own",
];

export default function ConsumersPage() {
  return (
    <PageWrap className="py-10 sm:py-14">
      <SectionLabel>For consumers</SectionLabel>
      <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
        Got charged, stuck, or misled?
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-ink-soft">
        This section is for everyday buyers — subscriptions you can&apos;t
        cancel, refunds that never come, hidden fees, deceptive offers, and
        broken deliveries. We guide you through documenting what happened and
        finding the right complaint channels. Not a law firm. Not a substitute
        for counsel.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/report"
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-fog"
        >
          Report a problem →
        </Link>
        <Link
          href="/rights?role=consumer"
          className="rounded-full border border-[var(--line)] px-6 py-3 text-sm font-semibold text-ink hover:bg-fog"
        >
          Know your rights
        </Link>
      </div>

      <section className="mt-14">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
          Consumer tools
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`group rounded-2xl border p-5 transition hover:shadow-md ${
                tool.primary
                  ? "border-signal/40 bg-signal/10 hover:border-signal/60"
                  : "border-[var(--line)] bg-white hover:border-ink/20"
              }`}
            >
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink group-hover:text-signal-dim">
                {tool.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {tool.description}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-mute group-hover:text-ink">
                Open →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-[var(--line)] bg-[#f7faf8] p-6 sm:p-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">
          Common consumer problems
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-soft">
          Start with{" "}
          <Link href="/report" className="font-medium text-ink underline">
            Report a problem
          </Link>{" "}
          — choose a category or write your own description.
        </p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <li
              key={t}
              className="flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-sm text-ink-soft"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 border-t border-[var(--line)] pt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
          Looking for something else?
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-soft">
          Business owners checking their own site should use{" "}
          <Link href="/check" className="font-medium text-ink underline">
            Business Scan
          </Link>{" "}
          or{" "}
          <Link href="/assess" className="font-medium text-ink underline">
            Compliance Scan
          </Link>
          . For competition and case-library tools, start from the{" "}
          <Link href="/" className="font-medium text-ink underline">
            home page
          </Link>{" "}
          — those are separate from this consumer hub.
        </p>
      </section>
    </PageWrap>
  );
}
