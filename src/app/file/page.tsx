import { Suspense } from "react";
import { RightsWizard } from "@/components/RightsWizard";

export default function FilePage() {
  return (
    <Suspense fallback={null}>
      <RightsWizard mode="file" />
    </Suspense>
  );
}
