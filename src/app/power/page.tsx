"use client";

import { PageWrap } from "@/components/PageWrap";
import { useMemo, useState } from "react";
import Link from "next/link";
import { scoreConsumerPower, type PowerAnswers } from "@/lib/power";
import { ChoiceChip, ScoreBar, SectionLabel } from "@/components/Ui";

const defaults: PowerAnswers = {
  alternatives: 2,
  canSwitch: true,
  canTransferData: false,
  canTakePurchasesElsewhere: false,
  canResell: false,
  canChangeTerms: true,
  canTerminate: true,
  switchingCost: "medium",
};

export default function PowerPage() {
  const [a, setA] = useState<PowerAnswers>(defaults);
  const [mode, setMode] = useState<"balance" | "before">("before");
  const result = useMemo(() => scoreConsumerPower(a), [a]);

  return (
    <PageWrap className="py-10 sm:py-14">
      <div className="flex flex-wrap items-center gap-3 text-sm text-mute">
        <Link href="/consumers" className="font-medium text-ink-soft hover:text-ink">
          ← Consumer hub
        </Link>
      </div>
      <SectionLabel>Consumer power</SectionLabel>
      <h1 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-bold text-ink md:text-5xl">
        How much control will this company have over you?
      </h1>
      <p className="mt-4 max-w-2xl text-ink-soft/80">
        Practical checklist before or after you buy — cancel difficulty,
        lock-in, and switching costs. A guidance tool to help you decide — not
        “is this a monopoly?” and not a substitute for counsel.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <ChoiceChip
          active={mode === "before"}
          onClick={() => setMode("before")}
        >
          Before you buy
        </ChoiceChip>
        <ChoiceChip
          active={mode === "balance"}
          onClick={() => setMode("balance")}
        >
          Power balance
        </ChoiceChip>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <Field label="How many realistic alternatives?">
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3, 4].map((n) => (
                <ChoiceChip
                  key={n}
                  active={a.alternatives === n}
                  onClick={() => setA({ ...a, alternatives: n })}
                >
                  {n === 4 ? "4+" : String(n)}
                </ChoiceChip>
              ))}
            </div>
          </Field>

          <Toggle
            label="Can you switch providers in practice?"
            value={a.canSwitch}
            onChange={(canSwitch) => setA({ ...a, canSwitch })}
          />
          <Toggle
            label="Can you transfer your data?"
            value={a.canTransferData}
            onChange={(canTransferData) => setA({ ...a, canTransferData })}
          />
          <Toggle
            label="Can you take purchases / content elsewhere?"
            value={a.canTakePurchasesElsewhere}
            onChange={(canTakePurchasesElsewhere) =>
              setA({ ...a, canTakePurchasesElsewhere })
            }
          />
          <Toggle
            label="Can you resell it?"
            value={a.canResell}
            onChange={(canResell) => setA({ ...a, canResell })}
          />
          <Toggle
            label="Can the company change terms later?"
            value={a.canChangeTerms}
            onChange={(canChangeTerms) => setA({ ...a, canChangeTerms })}
          />
          <Toggle
            label="Can it terminate or revoke access?"
            value={a.canTerminate}
            onChange={(canTerminate) => setA({ ...a, canTerminate })}
          />

          <Field label="Switching cost">
            <div className="flex flex-wrap gap-2">
              {(["low", "medium", "high"] as const).map((s) => (
                <ChoiceChip
                  key={s}
                  active={a.switchingCost === s}
                  onClick={() => setA({ ...a, switchingCost: s })}
                >
                  {s}
                </ChoiceChip>
              ))}
            </div>
          </Field>
        </div>

        <div className="rounded-2xl border border-[var(--line)] bg-paper/70 p-6 md:p-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
            {mode === "before" ? "Before you buy" : "Consumer power balance"}
          </h2>
          <div className="mt-8 space-y-5">
            <ScoreBar
              label="Company power"
              value={result.companyPower}
              tone="danger"
            />
            <ScoreBar
              label="Consumer alternatives"
              value={result.consumerAlternatives}
              tone="signal"
            />
            <ScoreBar
              label="Switching difficulty"
              value={result.switchingDifficulty}
              tone="warn"
            />
            <ScoreBar
              label="Dependency"
              value={result.dependency}
              tone="warn"
            />
            <div className="border-t border-[var(--line)] pt-5">
              <ScoreBar
                label="Your consumer power"
                value={result.overallConsumerPower}
                tone="signal"
              />
            </div>
          </div>

          {mode === "before" && (
            <dl className="mt-8 space-y-3 border-t border-[var(--line)] pt-6 text-sm">
              <Row k="Can you resell it?" v={a.canResell ? "Yes" : "No"} />
              <Row
                k="Can you transfer data?"
                v={a.canTransferData ? "Yes" : "Limited / No"}
              />
              <Row
                k="Can the company revoke access?"
                v={a.canTerminate ? "Potentially" : "Unlikely from your answers"}
              />
              <Row
                k="Alternative products"
                v={a.alternatives === 4 ? "4+" : String(a.alternatives)}
              />
            </dl>
          )}

          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-mute">
              Why
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {result.why.map((w) => (
                <li key={w} className="border-l-2 border-signal pl-3">
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-xs text-mute">
            This scores bargaining and lock-in dynamics. It is not a legal
            conclusion about monopoly power or liability.
          </p>
        </div>
      </div>
    </PageWrap>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
        {label}
      </h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <Field label={label}>
      <div className="flex gap-2">
        <ChoiceChip active={value} onClick={() => onChange(true)}>
          Yes
        </ChoiceChip>
        <ChoiceChip active={!value} onClick={() => onChange(false)}>
          No
        </ChoiceChip>
      </div>
    </Field>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-mute">{k}</dt>
      <dd className="font-medium text-ink">{v}</dd>
    </div>
  );
}
