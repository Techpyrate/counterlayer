import Link from "next/link";
import { PageWrap } from "@/components/PageWrap";
import { SectionLabel } from "@/components/Ui";

export default function PrivacyPage() {
  return (
    <PageWrap className="py-10 sm:py-14">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-ink">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-mute">Last updated: August 28, 2026</p>

      <div className="prose-legal mt-10 max-w-3xl space-y-6 text-[15px] leading-7 text-ink-soft">
        <p>
          CounterLayer respects your privacy. This policy explains what we collect
          when you create an account, run scans, and use our tools.
        </p>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
            Information we collect
          </h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Account details: name, email, and authentication identifiers.</li>
            <li>
              Scan inputs: URLs, optional staging credentials, and documents you
              upload for analysis.
            </li>
            <li>
              Usage data: pages visited, scan timestamps, and basic diagnostics to
              keep the service reliable.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
            How we use information
          </h2>
          <p className="mt-2">
            We use your data to authenticate you, run requested scans, store scan
            history tied to your account, improve product quality, and respond to
            support requests. We do not sell personal information.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
            Authentication
          </h2>
          <p className="mt-2">
            Sign-in is handled through Firebase (email/password and Google). Firebase
            processes authentication data according to Google&apos;s privacy practices.
            Optional auth cookies you provide for scans are used only for that scan
            session and are not stored permanently.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
            Your choices
          </h2>
          <p className="mt-2">
            You may update your profile, request account deletion, or contact us about
            data access. Some scan history may remain in local browser storage until
            cleared.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
            Contact
          </h2>
          <p className="mt-2">
            Questions about privacy? Contact us through the support channel listed on
            the CounterLayer website.
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm text-mute">
        See also our{" "}
        <Link href="/terms" className="font-medium text-ink underline">
          Terms of Service
        </Link>
        .
      </p>
    </PageWrap>
  );
}
