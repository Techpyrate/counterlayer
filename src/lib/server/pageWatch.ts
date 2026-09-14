import { createHash } from "crypto";

const POLICY_PATHS = [
  "/terms",
  "/terms-of-service",
  "/privacy",
  "/privacy-policy",
  "/legal",
  "/cancel",
  "/cancellation",
  "/refund",
  "/refunds",
  "/pricing",
  "/billing",
];

export async function hashPolicyPages(
  baseUrl: string,
): Promise<Record<string, string>> {
  const origin = normalizeOrigin(baseUrl);
  if (!origin) return {};

  const hashes: Record<string, string> = {};
  for (const path of POLICY_PATHS) {
    const url = `${origin}${path}`;
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "CounterLayer-PolicyWatch/1.0" },
        signal: AbortSignal.timeout(12_000),
      });
      if (!res.ok) continue;
      const text = await res.text();
      const normalized = text.replace(/\s+/g, " ").trim().slice(0, 120_000);
      hashes[path] = createHash("sha256").update(normalized).digest("hex").slice(0, 16);
    } catch {
      /* skip unreachable paths */
    }
  }
  return hashes;
}

export function diffPageHashes(
  before: Record<string, string>,
  after: Record<string, string>,
): string[] {
  const changed: string[] = [];
  const paths = new Set([...Object.keys(before), ...Object.keys(after)]);
  for (const path of paths) {
    if (before[path] !== after[path]) {
      if (!before[path] && after[path]) changed.push(`${path} — page appeared`);
      else if (before[path] && !after[path]) changed.push(`${path} — page missing or unreachable`);
      else changed.push(`${path} — content changed`);
    }
  }
  return changed;
}

function normalizeOrigin(url: string): string | null {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.origin;
  } catch {
    return null;
  }
}
