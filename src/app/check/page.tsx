import { Suspense } from "react";
import { ComplianceCheckWizard } from "@/components/ComplianceCheckWizard";

export default function CheckPage() {
  return (
    <Suspense fallback={<p className="py-16 text-center text-sm text-mute">Loading…</p>}>
      <ComplianceCheckWizard />
    </Suspense>
  );
}
