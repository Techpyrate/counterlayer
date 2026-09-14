import Link from "next/link";
import { PageWrap } from "@/components/PageWrap";
import { SectionLabel } from "@/components/Ui";

export default function TermsPage() {
  return (
    <PageWrap className="py-10 sm:py-14">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-ink">
        Terms of Service
      </h1>
      <p className="mt-3 text-sm text-mute">Last updated: August 28, 2026</p>

      <div className="prose-legal mt-10 max-w-3xl space-y-6 text-[15px] leading-7 text-ink-soft">
        <p>
          CounterLayer is a diligence and guidance platform for competition,
          consumer protection, and public compliance. By creating an account or
          using the service, you agree to these terms.
        </p>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
            What CounterLayer is — and is not
          </h2>
          <p className="mt-2">
            We provide scans, guides, checklists, and report packs to help you
            understand issues and prepare materials. We are not a law firm and
            not a substitute for counsel on your specific facts. Outputs are
            automated product tools — not legal opinions, certifications, or
            guarantees of compliance. Decisions remain yours; involve qualified
            advisors when you need binding advice.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
            Your account
          </h2>
          <p className="mt-2">
            You must provide accurate information, keep credentials secure, and notify
            us of unauthorized access. You may not misuse the platform, attempt to
            disrupt scans, or scrape the service in violation of applicable law.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
            Acceptable use
          </h2>
          <p className="mt-2">
            You may only scan websites and materials you own or have permission to
            assess. Do not upload confidential third-party documents without
            authorization.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
            Changes
          </h2>
          <p className="mt-2">
            We may update these terms. Continued use after changes constitutes
            acceptance of the revised terms.
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm text-mute">
        See also our{" "}
        <Link href="/privacy" className="font-medium text-ink underline">
          Privacy Policy
        </Link>
        .
      </p>
    </PageWrap>
  );
}
