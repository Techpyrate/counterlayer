"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PageWrap } from "@/components/PageWrap";
import { AssessmentVisualReport } from "@/components/AssessmentVisualReport";
import type { StoredComplianceScan } from "@/lib/complianceScanTypes";

export default function SharedComplianceReportPage() {
  const params = useParams();
  const shareId = params.shareId as string;
  const [scan, setScan] = useState<StoredComplianceScan | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch(
          `/api/compliance-scans/${encodeURIComponent(shareId)}?share=1`,
        );
        const data = (await res.json()) as {
          scan?: StoredComplianceScan;
          error?: string;
        };
        if (!res.ok || !data.scan) {
          setError(data.error ?? "Report not found.");
          return;
        }
        setScan(data.scan);
      } catch {
        setError("Could not load report.");
      }
    })();
  }, [shareId]);

  if (error) {
    return (
      <PageWrap className="py-16 text-center">
        <p className="text-sm text-danger">{error}</p>
        <Link href="/assess" className="mt-4 inline-block text-sm underline">
          Compliance Scan
        </Link>
      </PageWrap>
    );
  }

  if (!scan) {
    return (
      <PageWrap className="py-16 text-center text-sm text-mute">
        Loading shared report…
      </PageWrap>
    );
  }

  return (
    <PageWrap className="py-10 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-wider text-mute">
        Shared diligence report · read only
      </p>
      <AssessmentVisualReport
        assessment={scan.assessment}
        pluginDiffs={scan.pluginDiffs}
        fixesLines={scan.fixesLines}
        storedScanId={scan.id}
        readOnly
      />
    </PageWrap>
  );
}
