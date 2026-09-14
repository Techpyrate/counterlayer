import Link from "next/link";
import { PageWrap } from "@/components/PageWrap";
import { PricingCards } from "@/components/PricingCards";
import { SectionLabel } from "@/components/Ui";

export default function PricingPage() {
  return (
    <PageWrap className="py-10 sm:py-14">
      <SectionLabel>For teams &amp; founders</SectionLabel>
      <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        Pricing
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        Consumer tools and Business Scan stay free. Compliance Scan — automated
        diligence, cloud history, and counsel-ready exports — starts at $20/mo
        for individuals and $100/mo for teams.
      </p>

      <PricingCards />

      <p className="mt-10 max-w-2xl text-xs text-mute">
        Not a law firm. Not a substitute for counsel. Not a compliance
        certification. Cancel anytime from your profile — no email required.
      </p>
    </PageWrap>
  );
}
