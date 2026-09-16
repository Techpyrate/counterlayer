/** Official 2026 HSR figures. Confirmed against the FTC page before the desk treats them as current. */

export const HSR_SOURCE =
  "https://www.ftc.gov/enforcement/competition-matters/2026/01/new-hsr-thresholds-filing-fees-2026";

export const HSR_REGISTER = "91 FR 2133";

export const HSR_EFFECTIVE = "2026-02-17";

export const HSR_2026 = {
  sizeOfTransaction: 133_900_000,
  sizeOfPersonSmall: 26_800_000,
  sizeOfPersonLarge: 267_800_000,
  sizeOfPersonNotRequired: 535_500_000,
  fees: [
    { below: 189_600_000, fee: 35_000 },
    { below: 586_900_000, fee: 110_000 },
    { below: 1_174_000_000, fee: 275_000 },
    { below: 2_347_000_000, fee: 440_000 },
    { below: 5_869_000_000, fee: 875_000 },
    { below: Number.POSITIVE_INFINITY, fee: 2_460_000 },
  ],
} as const;

/** Article 1 of the EU Merger Regulation. Not annually indexed like HSR. */
export const EU_MERGER_SOURCE =
  "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32004R0139";

export const EU_ARTICLE_1 = {
  primaryWorldwide: 5_000_000_000,
  primaryEuEach: 250_000_000,
  altWorldwide: 2_500_000_000,
  altThreeStateCombined: 100_000_000,
  altThreeStateEach: 25_000_000,
  altEuEach: 100_000_000,
} as const;

export type HsrInput = {
  transactionUsd: number;
  acquiringUsd: number;
  acquiredUsd: number;
};

export type EuInput = {
  worldwideA: number;
  worldwideB: number;
  euA: number;
  euB: number;
  twoThirdsSameMemberState: boolean;
  altThreeStatesMet: boolean;
};

export function hsrFee(transactionUsd: number): number | null {
  if (transactionUsd < HSR_2026.sizeOfTransaction) return null;
  const tier = HSR_2026.fees.find((f) => transactionUsd < f.below);
  return tier?.fee ?? null;
}

export function assessHsr(input: HsrInput): {
  reportable: "no" | "yes" | "incomplete";
  headline: string;
  reasons: string[];
  fee: number | null;
} {
  const { transactionUsd, acquiringUsd, acquiredUsd } = input;
  const reasons: string[] = [
    `Figures are the FTC 2026 adjustments, effective ${HSR_EFFECTIVE} (${HSR_REGISTER}). Exemptions are not applied.`,
  ];
  if (!Number.isFinite(transactionUsd) || transactionUsd <= 0) {
    return {
      reportable: "incomplete",
      headline: "Enter a transaction value.",
      reasons,
      fee: null,
    };
  }
  if (transactionUsd < HSR_2026.sizeOfTransaction) {
    return {
      reportable: "no",
      headline: "Below the 2026 size-of-transaction threshold.",
      reasons: [
        ...reasons,
        `$${fmt(transactionUsd)} is under $${fmt(HSR_2026.sizeOfTransaction)}. Look at the threshold in effect at closing.`,
      ],
      fee: null,
    };
  }
  const fee = hsrFee(transactionUsd);
  if (transactionUsd >= HSR_2026.sizeOfPersonNotRequired) {
    return {
      reportable: "yes",
      headline: "Size-of-person test does not apply. Treat as reportable unless an exemption fits.",
      reasons: [
        ...reasons,
        `Value meets or exceeds $${fmt(HSR_2026.sizeOfPersonNotRequired)}.`,
        fee ? `Filing fee at these 2026 tiers: $${fmt(fee)}, measured at filing.` : "",
      ].filter(Boolean),
      fee,
    };
  }
  const larger = Math.max(acquiringUsd, acquiredUsd);
  const smaller = Math.min(acquiringUsd, acquiredUsd);
  if (!acquiringUsd || !acquiredUsd) {
    return {
      reportable: "incomplete",
      headline: "Value is in the band where size-of-person matters. Enter both sides.",
      reasons: [
        ...reasons,
        `Between $${fmt(HSR_2026.sizeOfTransaction)} and $${fmt(HSR_2026.sizeOfPersonNotRequired)}.`,
      ],
      fee,
    };
  }
  const personMet =
    larger >= HSR_2026.sizeOfPersonLarge && smaller >= HSR_2026.sizeOfPersonSmall;
  return {
    reportable: personMet ? "yes" : "no",
    headline: personMet
      ? "Size-of-transaction and size-of-person are both met."
      : "Size-of-transaction is met, but size-of-person is not.",
    reasons: [
      ...reasons,
      `Larger side $${fmt(larger)} vs $${fmt(HSR_2026.sizeOfPersonLarge)}. Smaller side $${fmt(smaller)} vs $${fmt(HSR_2026.sizeOfPersonSmall)}.`,
      fee && personMet ? `Filing fee at these 2026 tiers: $${fmt(fee)}.` : "",
    ].filter(Boolean),
    fee: personMet ? fee : null,
  };
}

export function assessEu(input: EuInput): {
  reportable: "no" | "yes" | "incomplete";
  headline: string;
  reasons: string[];
} {
  const worldwide = input.worldwideA + input.worldwideB;
  const reasons = [
    "EU Merger Regulation Article 1 turnover tests. Amounts are euros. The two-thirds rule can take a deal out of Commission jurisdiction even when turnover is met.",
  ];
  if (!input.worldwideA || !input.worldwideB || !input.euA || !input.euB) {
    return {
      reportable: "incomplete",
      headline: "Enter worldwide and EU turnover for both undertakings.",
      reasons,
    };
  }
  const eachEu =
    Math.min(input.euA, input.euB) >= EU_ARTICLE_1.primaryEuEach;
  const primary =
    worldwide > EU_ARTICLE_1.primaryWorldwide && eachEu;
  const alt =
    worldwide > EU_ARTICLE_1.altWorldwide &&
    Math.min(input.euA, input.euB) > EU_ARTICLE_1.altEuEach &&
    input.altThreeStatesMet;
  const met = primary || alt;
  if (!met) {
    return {
      reportable: "no",
      headline: "Article 1 turnover thresholds are not met on the figures entered.",
      reasons: [
        ...reasons,
        `Combined worldwide €${fmt(worldwide)}. Primary test needs over €${fmt(EU_ARTICLE_1.primaryWorldwide)} and each EU turnover over €${fmt(EU_ARTICLE_1.primaryEuEach)}.`,
        input.altThreeStatesMet
          ? "Alternative three-Member-State test was marked as met, but EU-wide or worldwide figures still fall short."
          : "Alternative test was not marked as met.",
      ],
    };
  }
  if (input.twoThirdsSameMemberState) {
    return {
      reportable: "no",
      headline: "Turnover is met, but the two-thirds exception points to a national authority.",
      reasons: [
        ...reasons,
        "Each undertaking achieves more than two-thirds of its EU turnover in the same Member State. Commission jurisdiction under Article 1 typically does not arise. Check a referral before you rely on this.",
      ],
    };
  }
  return {
    reportable: "yes",
    headline: primary
      ? "Primary Article 1(2) test is met."
      : "Alternative Article 1(3) test is met on the boxes you checked.",
    reasons,
  };
}

export function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
}

export function hsrMarkerStillCurrent(pageText: string): boolean {
  return pageText.includes("133.9") && pageText.includes("2026");
}
