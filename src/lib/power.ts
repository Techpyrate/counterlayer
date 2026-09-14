export type PowerAnswers = {
  alternatives: number; // 0-4 scale mapped from UI
  canSwitch: boolean;
  canTransferData: boolean;
  canTakePurchasesElsewhere: boolean;
  canResell: boolean;
  canChangeTerms: boolean;
  canTerminate: boolean;
  switchingCost: "low" | "medium" | "high";
};

export type PowerResult = {
  companyPower: number;
  consumerAlternatives: number;
  switchingDifficulty: number;
  dependency: number;
  overallConsumerPower: number;
  why: string[];
};

export function scoreConsumerPower(a: PowerAnswers): PowerResult {
  const altScore = Math.min(100, a.alternatives * 25);
  const switchBase =
    a.switchingCost === "high" ? 90 : a.switchingCost === "medium" ? 55 : 20;
  const switchingDifficulty = Math.min(
    100,
    switchBase + (a.canSwitch ? 0 : 25) + (a.canTransferData ? 0 : 10),
  );
  const lockBits =
    (a.canResell ? 0 : 15) +
    (a.canTakePurchasesElsewhere ? 0 : 15) +
    (a.canTerminate ? 20 : 0) +
    (a.canChangeTerms ? 15 : 0) +
    (a.canTransferData ? 0 : 15);
  const dependency = Math.min(100, 30 + lockBits);
  const companyPower = Math.min(
    100,
    Math.round((100 - altScore) * 0.45 + switchingDifficulty * 0.3 + dependency * 0.25),
  );
  const overallConsumerPower = Math.max(
    0,
    Math.round(
      altScore * 0.4 +
        (100 - switchingDifficulty) * 0.35 +
        (100 - dependency) * 0.25,
    ),
  );

  const why: string[] = [];
  if (a.alternatives <= 1)
    why.push("Few realistic alternatives increase the company’s leverage over you.");
  if (!a.canSwitch)
    why.push("If switching is impractical, competitive pressure on the firm weakens.");
  if (!a.canTransferData)
    why.push("Limited data portability raises lock-in and switching costs.");
  if (!a.canResell)
    why.push("No resale rights reduce your exit options after purchase.");
  if (a.canTerminate)
    why.push("Unilateral termination power shifts control to the company after you buy or subscribe.");
  if (a.canChangeTerms)
    why.push("Ability to change terms post-purchase is a classic dependency signal.");
  if (a.switchingCost === "high")
    why.push("High switching costs can entrench a provider even without a formal monopoly label.");
  if (why.length === 0)
    why.push("You retain meaningful alternatives and exit options relative to many digital markets.");

  return {
    companyPower,
    consumerAlternatives: altScore,
    switchingDifficulty,
    dependency,
    overallConsumerPower,
    why,
  };
}
