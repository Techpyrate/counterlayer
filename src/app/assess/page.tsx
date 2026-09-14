import { Suspense } from "react";
import { ControlAssessmentWizard } from "@/components/ControlAssessmentWizard";
import { ProGate } from "@/components/ProGate";

export default function AssessPage() {
  return (
    <ProGate feature="Compliance Scan">
      <Suspense fallback={<p className="py-16 text-center text-sm text-mute">Loading…</p>}>
        <ControlAssessmentWizard />
      </Suspense>
    </ProGate>
  );
}
