"use client";

import { useState } from "react";
import Link from "next/link";
import { PageWrap } from "@/components/PageWrap";
import { SectionLabel } from "@/components/Ui";
import { BusinessGate } from "@/components/ProGate";
import { useAuth } from "@/lib/auth";
import type { CheckAudience } from "@/data/complianceCheck";
import type { Jurisdiction } from "@/data/types";

type SellerResult = {
  url: string;
  overall?: string;
  score?: number;
  sellerReady?: boolean;
  openControls?: { id: string; title: string; status: string }[];
  error?: string;
};

export default function SellerCheckPage() {
  return (
    <BusinessGate feature="Seller bulk check">
      <SellerCheckTool />
    </BusinessGate>
  );
}

function SellerCheckTool() {
  const { getAccessToken } = useAuth();
  const [urls, setUrls] = useState("");
  const [audience, setAudience] = useState<CheckAudience>("seller");
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("Both");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SellerResult[] | null>(null);
  const [scannedAt, setScannedAt] = useState<string | null>(null);

  async function runCheck() {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const token = await getAccessToken();
      const res = await fetch("/api/seller-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          urls: urls.split(/\n|,/).map((u) => u.trim()).filter(Boolean),
          audience,
          jurisdiction,
        }),
      });
      const data = (await res.json()) as {
        results?: SellerResult[];
        scannedAt?: string;
        error?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Check failed.");
        return;
      }
      setResults(data.results ?? []);
      setScannedAt(data.scannedAt ?? null);
    } catch {
      setError("Could not reach seller check service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageWrap className="py-10 sm:py-14">
      <SectionLabel>Business plan</SectionLabel>
      <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-ink">
        Seller bulk check
      </h1>
      <p className="mt-4 max-w-2xl text-sm text-ink-soft">
        Paste up to 25 seller URLs — one per line. We scan public cancel, refund,
        privacy, and transparency controls for onboarding decisions.
      </p>

      <div className="mt-8 max-w-2xl space-y-4">
        <label className="block text-sm">
          <span className="text-mute">Seller URLs</span>
          <textarea
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            rows={8}
            placeholder={"https://seller-one.com\nhttps://seller-two.com"}
            className="mt-1 w-full rounded-xl border border-[var(--line)] bg-paper px-3 py-2.5 font-mono text-sm outline-none focus:ring-2 focus:ring-signal/30"
          />
        </label>
        <button
          type="button"
          disabled={loading || !urls.trim()}
          onClick={() => void runCheck()}
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-fog disabled:opacity-40"
        >
          {loading ? "Scanning…" : "Run bulk check"}
        </button>
        {error && <p className="text-sm text-danger">{error}</p>}
      </div>

      {results && (
        <div className="mt-10">
          {scannedAt && (
            <p className="text-xs text-mute">
              Scanned {new Date(scannedAt).toLocaleString()} · {results.length}{" "}
              URLs
            </p>
          )}
          <ul className="mt-4 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-white">
            {results.map((r) => (
              <li key={r.url} className="px-5 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="min-w-0 break-all font-medium text-ink">{r.url}</p>

                  {r.error ? (
                    <span className="text-xs text-danger">{r.error}</span>
                  ) : (
                    <>
                      <span className="rounded-md bg-fog px-2 py-0.5 text-[10px] font-semibold uppercase text-mute">
                        {r.overall}
                      </span>
                      <span className="text-xs text-mute">
                        {r.sellerReady ? "Seller-ready" : "Needs review"}
                      </span>
                    </>
                  )}
                </div>
                {r.openControls && r.openControls.length > 0 && (
                  <ul className="mt-2 space-y-1 text-xs text-ink-soft">
                    {r.openControls.map((c) => (
                      <li key={c.id}>
                        · {c.title} ({c.status})
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-8 text-xs text-mute">
        <Link href="/assess" className="underline">
          Compliance Scan
        </Link>{" "}
        for full diligence on your own site. Not a legal clearance.
      </p>
    </PageWrap>
  );
}
