"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PageWrap } from "@/components/PageWrap";
import { AssessmentVisualReport } from "@/components/AssessmentVisualReport";
import { useAuth } from "@/lib/auth";
import { getLocalComplianceScan } from "@/lib/localScanStore";
import type { StoredComplianceScan } from "@/lib/complianceScanTypes";

export default function ComplianceScanReportPage() {
  const params = useParams();
  const scanId = params.id as string;
  const { user, loading, getAccessToken } = useAuth();
  const [scan, setScan] = useState<StoredComplianceScan | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    const local = getLocalComplianceScan(user.id, scanId);
    if (local) {
      setScan({
        id: local.id,
        userId: local.userId,
        url: local.url,
        assessedAt: local.assessedAt,
        assessment: local.assessment,
        changeNotes: local.changeNotes,
        pluginDiffs: local.pluginDiffs,
        fixesLines: local.fixesLines,
        sharePublic: false,
      });
      return;
    }

    void (async () => {
      const token = await getAccessToken();
      if (!token) {
        setError("Report not found on this device. Run the scan again while signed in.");
        return;
      }
      try {
        const res = await fetch(
          `/api/compliance-scans/${encodeURIComponent(scanId)}`,
          { headers: { Authorization: `Bearer ${token}` } },
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
  }, [scanId, user, loading, getAccessToken]);

  if (loading) {
    return (
      <PageWrap className="py-16 text-center text-sm text-mute">
        Loading account…
      </PageWrap>
    );
  }

  if (!user) {
    return (
      <PageWrap className="py-16 text-center">
        <p className="text-sm text-ink-soft">Sign in to view saved scans.</p>
        <Link href="/?auth=login" className="mt-4 inline-block text-sm underline">
          Sign in
        </Link>
      </PageWrap>
    );
  }

  if (error) {
    return (
      <PageWrap className="py-16 text-center">
        <p className="text-sm text-danger">{error}</p>
        <Link href="/profile" className="mt-4 inline-block text-sm underline">
          Back to profile
        </Link>
      </PageWrap>
    );
  }

  if (!scan) {
    return (
      <PageWrap className="py-16 text-center text-sm text-mute">
        Loading report…
      </PageWrap>
    );
  }

  const rescanHref = `/assess?url=${encodeURIComponent(scan.url)}`;

  return (
    <PageWrap className="py-10 sm:py-14">
      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
        <Link href="/profile" className="text-mute underline hover:text-ink">
          Profile
        </Link>
        <span className="text-mute">·</span>
        <Link href={rescanHref} className="text-mute underline hover:text-ink">
          Re-scan this site
        </Link>
      </div>
      <AssessmentVisualReport
        assessment={scan.assessment}
        pluginDiffs={scan.pluginDiffs}
        fixesLines={scan.fixesLines}
        storedScanId={scan.id.startsWith("local-") ? undefined : scan.id}
      />
    </PageWrap>
  );
}
