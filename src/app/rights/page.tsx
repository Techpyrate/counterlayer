import { Suspense } from "react";
import { RightsWizard } from "@/components/RightsWizard";

export default function RightsPage() {
  return (
    <Suspense fallback={null}>
      <RightsWizard mode="rights" />
    </Suspense>
  );
}
