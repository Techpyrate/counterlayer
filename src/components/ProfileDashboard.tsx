"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  type AccountActivity,
  type ActivityKind,
  exportKindLabel,
  getAccountStats,
  listAccountActivity,
  overallColor,
} from "@/lib/accountActivity";
import type { ComplianceScanListItem } from "@/lib/complianceScanTypes";
import {
  listLocalComplianceScans,
  type LocalStoredScan,
} from "@/lib/localScanStore";
import {
  type ProfileRole,
  profileRoles,
} from "@/data/profileRoles";
import { RoleGuideModal } from "@/components/RoleGuideModal";
import { usePlan } from "@/components/ProGate";
import { formatPlanPrice, planLabel } from "@/lib/plans";
import type { PlanTier } from "@/lib/plans";

type Tab = "all" | ActivityKind;

type ScanRow = {
  id: string;
  kind: ActivityKind;
  url: string;
  date: string;
  overall?: AccountActivity["meta"]["overall"];
  score?: number;
  summary: string;
  openHref: string;
  rescanHref: string;
};

function buildScanRows(
  tab: Tab,
  activity: AccountActivity[],
  cloudScans: ComplianceScanListItem[],
  localScans: LocalStoredScan[],
): ScanRow[] {
  const rows: ScanRow[] = [];
  const seen = new Set<string>();
  const localIds = new Set(localScans.map((s) => s.id));
  const cloudIds = new Set(cloudScans.map((s) => s.id));

  function reportHref(scanId: string | undefined, url: string) {
    if (scanId && (localIds.has(scanId) || cloudIds.has(scanId))) {
      return `/assess/scans/${scanId}`;
    }
    return `/assess?url=${encodeURIComponent(url)}`;
  }

  for (const scan of localScans) {
    const key = scan.id;
    seen.add(key);
    rows.push({
      id: scan.id,
      kind: "compliance_scan",
      url: scan.url,
      date: scan.assessedAt,
      overall: scan.assessment.overall,
      score: scan.assessment.score,
      summary: `Score ${scan.assessment.score}`,
      openHref: `/assess/scans/${scan.id}`,
      rescanHref: `/assess?url=${encodeURIComponent(scan.url)}`,
    });
  }

  for (const scan of cloudScans) {
    if (seen.has(scan.id)) continue;
    seen.add(scan.id);
    rows.push({
      id: scan.id,
      kind: "compliance_scan",
      url: scan.url,
      date: scan.assessedAt,
      overall: scan.overall,
      score: scan.score,
      summary: `Score ${scan.score}`,
      openHref: `/assess/scans/${scan.id}`,
      rescanHref: `/assess?url=${encodeURIComponent(scan.url)}`,
    });
  }

  for (const item of activity) {
    if (item.kind === "compliance_scan") {
      const scanId = item.meta.scanId;
      if (scanId && seen.has(scanId)) continue;
      const dupUrl = rows.some(
        (r) =>
          r.url.trim().toLowerCase() === item.url.trim().toLowerCase() &&
          Math.abs(new Date(r.date).getTime() - new Date(item.createdAt).getTime()) <
            60_000,
      );
      if (dupUrl) continue;
      rows.push({
        id: item.id,
        kind: "compliance_scan",
        url: item.url,
        date: item.createdAt,
        overall: item.meta.overall,
        score: item.meta.score,
        summary: item.summary,
        openHref: scanId
          ? reportHref(scanId, item.url)
          : `/assess?url=${encodeURIComponent(item.url)}`,
        rescanHref: `/assess?url=${encodeURIComponent(item.url)}`,
      });
      continue;
    }
    if (item.kind === "business_scan") {
      rows.push({
        id: item.id,
        kind: "business_scan",
        url: item.url,
        date: item.createdAt,
        overall: undefined,
        score: undefined,
        summary: item.summary,
        openHref: `/check?url=${encodeURIComponent(item.url)}`,
        rescanHref: `/check?url=${encodeURIComponent(item.url)}`,
      });
      continue;
    }
    if (item.kind === "report_export" && (tab === "all" || tab === "report_export")) {
      rows.push({
        id: item.id,
        kind: "report_export",
        url: item.url,
        date: item.createdAt,
        summary: item.summary,
        openHref: `/assess?url=${encodeURIComponent(item.url)}`,
        rescanHref: `/assess?url=${encodeURIComponent(item.url)}`,
      });
    }
  }

  let filtered = rows;
  if (tab === "compliance_scan") {
    filtered = rows.filter((r) => r.kind === "compliance_scan");
  } else if (tab === "business_scan") {
    filtered = rows.filter((r) => r.kind === "business_scan");
  } else if (tab === "report_export") {
    filtered = rows.filter((r) => r.kind === "report_export");
  } else {
    filtered = rows.filter((r) => r.kind !== "report_export");
  }

  return filtered.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
}

function kindLabel(kind: ActivityKind) {
  if (kind === "business_scan") return "Business Scan";
  if (kind === "compliance_scan") return "Compliance Scan";
  return "Report";
}

export function ProfileDashboard() {
  const {
    user,
    signOut,
    updateProfile,
    updateProfileRole,
    changePassword,
    canChangePassword,
    authProviders,
    backend,
    getAccessToken,
  } = useAuth();

  const [name, setName] = useState("");
  const [roleDraft, setRoleDraft] = useState<ProfileRole | "">("");
  const [roleSaving, setRoleSaving] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [profileMsg, setProfileMsg] = useState<string | null>(null);
  const [profileErr, setProfileErr] = useState<string | null>(null);
  const [profileBusy, setProfileBusy] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwMsg, setPwMsg] = useState<string | null>(null);
  const [pwErr, setPwErr] = useState<string | null>(null);
  const [pwBusy, setPwBusy] = useState(false);

  const [tab, setTab] = useState<Tab>("all");
  const [activity, setActivity] = useState<AccountActivity[]>([]);
  const [cloudScans, setCloudScans] = useState<ComplianceScanListItem[]>([]);
  const [localScans, setLocalScans] = useState<LocalStoredScan[]>([]);
  const {
    plan: userPlan,
    isAdmin,
    canCancel,
    billingInterval,
    refresh: refreshPlan,
  } = usePlan();
  const [planBusy, setPlanBusy] = useState(false);
  const [planMsg, setPlanMsg] = useState<string | null>(null);
  const [planErr, setPlanErr] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setRoleDraft(user.profileRole ?? "");
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const refresh = () => {
      setActivity(listAccountActivity(user.id, tab));
      setLocalScans(listLocalComplianceScans(user.id));
    };
    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [user, tab]);

  useEffect(() => {
    if (!user) return;
    void (async () => {
      const token = await getAccessToken();
      if (!token) return;
      try {
        const res = await fetch("/api/compliance-scans", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = (await res.json()) as {
          scans?: ComplianceScanListItem[];
        };
        if (res.ok && data.scans) {
          setCloudScans(data.scans);
        }
      } catch {
        /* cloud optional — local scans always shown */
      }
    })();
  }, [user, getAccessToken, localScans.length]);

  const stats = useMemo(() => {
    if (!user) return null;
    const local = getAccountStats(user.id);
    const complianceCount = Math.max(
      local.complianceScans,
      localScans.length,
      cloudScans.length,
    );
    return {
      ...local,
      complianceScans: complianceCount,
      total: local.total - local.complianceScans + complianceCount,
    };
  }, [user, activity, cloudScans.length, localScans.length]);

  if (!user || !stats) return null;

  const scanRows = useMemo(
    () =>
      user
        ? buildScanRows(tab, activity, cloudScans, localScans)
        : [],
    [user, tab, activity, cloudScans, localScans],
  );
  const usesGoogle = authProviders.includes("google.com");
  const activeRole = user.profileRole ?? (roleDraft || null);

  async function onRoleChange(role: ProfileRole | "") {
    setRoleDraft(role);
    if (!role) return;
    setRoleSaving(true);
    await updateProfileRole(role);
    setRoleSaving(false);
  }

  async function cancelPlan() {
    if (!window.confirm("Cancel your paid plan? You will lose Pro/Business access immediately.")) {
      return;
    }
    setPlanBusy(true);
    setPlanMsg(null);
    setPlanErr(null);
    try {
      const token = await getAccessToken();
      const res = await fetch("/api/me/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ action: "cancel" }),
      });
      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        setPlanErr(data.error ?? "Could not cancel plan.");
        return;
      }
      setPlanMsg(data.message ?? "Plan cancelled.");
      await refreshPlan();
    } catch {
      setPlanErr("Could not cancel plan.");
    } finally {
      setPlanBusy(false);
    }
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileBusy(true);
    setProfileErr(null);
    setProfileMsg(null);
    const res = await updateProfile({ name });
    setProfileBusy(false);
    if (res.error) setProfileErr(res.error);
    else setProfileMsg("Profile updated.");
  }

  async function savePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwErr(null);
    setPwMsg(null);
    if (newPassword !== confirmPassword) {
      setPwErr("New passwords do not match.");
      return;
    }
    setPwBusy(true);
    const res = await changePassword({ currentPassword, newPassword });
    setPwBusy(false);
    if (res.error) setPwErr(res.error);
    else {
      setPwMsg("Password updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-6 border-b border-[var(--line)] pb-8 md:flex-row md:items-end md:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-ink text-xl font-bold text-fog">
            {user.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.photoUrl}
                alt=""
                className="h-full w-full rounded-2xl object-cover"
              />
            ) : (
              initials(user.name)
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-signal-dim">
              Account
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {user.name}
            </h1>
            <p className="mt-1 break-all text-sm text-ink-soft">{user.email}</p>
            <p className="mt-1 text-xs text-mute">
              Member since {new Date(user.createdAt).toLocaleDateString()}
              {usesGoogle && " · Google sign-in"}
            </p>
          </div>
        </div>
        <div className="flex w-full min-w-0 flex-col gap-4 md:w-auto md:items-end">
          <div className="w-full min-w-0 md:max-w-xs">
            <label className="block text-xs font-medium text-mute">Your role</label>
            <div className="mt-1.5 flex gap-2">
              <select
                value={roleDraft}
                disabled={roleSaving}
                onChange={(e) =>
                  void onRoleChange(e.target.value as ProfileRole | "")
                }
                className="min-w-0 flex-1 rounded-xl border border-[var(--line)] bg-paper px-3 py-2.5 text-sm font-medium text-ink outline-none focus:ring-2 focus:ring-signal/30 disabled:opacity-50"
              >
                <option value="">Select role…</option>
                {profileRoles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                disabled={!activeRole}
                onClick={() => setGuideOpen(true)}
                className="shrink-0 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-fog hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                View
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => void signOut()}
            className="rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-ink hover:bg-fog"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {(
          [
            ["Total activity", stats.total, "text-ink"],
            ["Business scans", stats.businessScans, "text-ink"],
            ["Compliance scans", stats.complianceScans, "text-signal-dim"],
            ["Reports exported", stats.reports, "text-ink-soft"],
          ] as const
        ).map(([label, value, color]) => (
          <div
            key={label}
            className="rounded-xl border border-[var(--line)] bg-white px-4 py-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
              {label}
            </p>
            <p className={`mt-1 text-3xl font-bold tabular-nums ${color}`}>
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/check"
          className="rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-ink"
        >
          New Business Scan
        </Link>
        <Link
          href="/assess"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-fog"
        >
          New Compliance Scan
        </Link>
        <Link
          href="/cases"
          className="rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-ink"
        >
          Case library
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,340px)_1fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
              Your plan
            </h2>
            <div className="mt-4 space-y-3">
              <p className="text-2xl font-bold text-ink">
                {planLabel(userPlan as PlanTier)}
                {userPlan === "pro" && (
                  <span className="ml-2 text-base font-normal text-mute">
                    {formatPlanPrice("pro", billingInterval ?? "monthly").amount}
                    {formatPlanPrice("pro", billingInterval ?? "monthly").suffix}
                  </span>
                )}
                {userPlan === "business" && (
                  <span className="ml-2 text-base font-normal text-mute">
                    {formatPlanPrice("business", billingInterval ?? "monthly").amount}
                    {formatPlanPrice("business", billingInterval ?? "monthly").suffix}
                  </span>
                )}
              </p>
              {isAdmin && (
                <p className="text-sm text-ink-soft">
                  Admin access — all features enabled.
                </p>
              )}
              {userPlan === "free" && (
                <p className="text-sm text-ink-soft">
                  Upgrade for Compliance Scan, cloud history, and exports.
                </p>
              )}
              {userPlan === "pro" && (
                <p className="text-sm text-ink-soft">
                  Compliance Scan, cloud history, share links, policy watch, and
                  counsel exports.
                </p>
              )}
              {userPlan === "business" && (
                <p className="text-sm text-ink-soft">
                  Everything in Pro plus seller bulk check and white-label
                  exports.
                </p>
              )}
              <div className="flex flex-wrap gap-2 pt-1">
                {userPlan === "free" && (
                  <Link
                    href="/pricing"
                    className="rounded-full bg-signal px-4 py-2 text-xs font-semibold text-ink"
                  >
                    View pricing
                  </Link>
                )}
                {userPlan === "pro" && (
                  <Link
                    href="/pricing"
                    className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold text-ink"
                  >
                    Upgrade to Business
                  </Link>
                )}
                {canCancel && (
                  <button
                    type="button"
                    disabled={planBusy}
                    onClick={() => void cancelPlan()}
                    className="rounded-full border border-danger/30 px-4 py-2 text-xs font-semibold text-danger disabled:opacity-50"
                  >
                    {planBusy ? "Cancelling…" : "Cancel plan"}
                  </button>
                )}
              </div>
              {planErr && <p className="text-sm text-danger">{planErr}</p>}
              {planMsg && <p className="text-sm text-signal-dim">{planMsg}</p>}
              {!isAdmin && userPlan !== "free" && (
                <p className="text-xs text-mute">
                  Cancel anytime — no email required. Access ends immediately.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
              Profile
            </h2>
            <form onSubmit={saveProfile} className="mt-4 space-y-4">
              <label className="block text-sm">
                <span className="text-mute">Display name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[var(--line)] bg-paper px-3 py-2.5 outline-none focus:ring-2 focus:ring-signal/30"
                />
              </label>
              <label className="block text-sm">
                <span className="text-mute">Email</span>
                <input
                  value={user.email}
                  disabled
                  className="mt-1 w-full rounded-xl border border-[var(--line)] bg-fog/50 px-3 py-2.5 text-mute"
                />
              </label>
              {profileErr && (
                <p className="text-sm text-danger">{profileErr}</p>
              )}
              {profileMsg && (
                <p className="text-sm text-signal-dim">{profileMsg}</p>
              )}
              <button
                type="submit"
                disabled={profileBusy}
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-fog disabled:opacity-50"
              >
                Save profile
              </button>
            </form>
          </section>

          <section className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
              Security
            </h2>
            {canChangePassword ? (
              <form onSubmit={savePassword} className="mt-4 space-y-4">
                <PasswordField
                  label="Current password"
                  value={currentPassword}
                  onChange={setCurrentPassword}
                  show={showCurrent}
                  onToggle={() => setShowCurrent((v) => !v)}
                />
                <PasswordField
                  label="New password"
                  value={newPassword}
                  onChange={setNewPassword}
                  show={showNew}
                  onToggle={() => setShowNew((v) => !v)}
                  hint="At least 6 characters"
                />
                <PasswordField
                  label="Confirm new password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  show={showNew}
                  onToggle={() => setShowNew((v) => !v)}
                />
                {pwErr && <p className="text-sm text-danger">{pwErr}</p>}
                {pwMsg && <p className="text-sm text-signal-dim">{pwMsg}</p>}
                <button
                  type="submit"
                  disabled={pwBusy}
                  className="rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-ink disabled:opacity-50"
                >
                  Update password
                </button>
              </form>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                {usesGoogle
                  ? "You sign in with Google. Manage your password in your Google account settings."
                  : "Password changes are not available for this sign-in method."}
              </p>
            )}
            <p className="mt-4 text-xs text-mute">
              Auth: {backend}
              {authProviders.length > 0 && ` · ${authProviders.join(", ")}`}
            </p>
          </section>
        </div>

        <section className="rounded-2xl border border-[var(--line)] bg-white">
          <div className="border-b border-[var(--line)] px-5 py-4 sm:px-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-mute">
              Your scans
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              Click any scan to open the full report.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(
                [
                  ["all", "All"],
                  ["business_scan", "Business"],
                  ["compliance_scan", "Compliance"],
                  ["report_export", "Reports"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    tab === id
                      ? "bg-ink text-fog"
                      : "bg-fog text-mute hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {scanRows.length === 0 ? (
            <div className="px-5 py-12 text-center sm:px-6">
              <p className="text-sm text-ink-soft">No scans yet.</p>
              <p className="mt-2 text-xs text-mute">
                Run a scan while logged in — it will show up here with the date.
                Click to open the report or re-scan.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Link
                  href="/check"
                  className="rounded-full bg-signal px-4 py-2 text-sm font-semibold text-ink"
                >
                  Business Scan
                </Link>
                <Link
                  href="/assess"
                  className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-ink"
                >
                  Compliance Scan
                </Link>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--line)]">
              {scanRows.map((row) => (
                <li
                  key={`${row.kind}-${row.id}`}
                  className="flex items-stretch gap-2 px-5 py-3 sm:px-6"
                >
                  <Link
                    href={row.openHref}
                    className="group flex min-w-0 flex-1 items-center gap-4 rounded-xl py-2 transition hover:bg-fog/80"
                  >
                    <ScanRowBody
                      kind={row.kind}
                      title={row.url}
                      summary={row.summary}
                      date={row.date}
                      url={row.url}
                      overall={row.overall}
                    />
                    <span
                      className="shrink-0 text-lg text-mute transition group-hover:text-ink"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                  <Link
                    href={row.rescanHref}
                    className="shrink-0 self-center rounded-full border border-[var(--line)] px-3 py-2 text-xs font-semibold text-ink hover:bg-fog"
                  >
                    Re-scan
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <RoleGuideModal
        open={guideOpen}
        roleId={activeRole}
        onClose={() => setGuideOpen(false)}
      />
    </div>
  );
}

function ScanRowBody({
  kind,
  title,
  summary,
  date,
  url,
  overall,
  exportKind,
  isRescan,
  watchEnabled,
}: {
  kind: ActivityKind;
  title: string;
  summary: string;
  date: string;
  url?: string;
  overall?: AccountActivity["meta"]["overall"];
  exportKind?: string;
  isRescan?: boolean;
  watchEnabled?: boolean;
}) {
  return (
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-fog px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-mute">
          {kindLabel(kind)}
        </span>
        {overall && (
          <span
            className="rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
            style={{ backgroundColor: overallColor(overall) }}
          >
            {overall}
          </span>
        )}
        {exportKind && (
          <span className="text-[10px] font-medium text-mute">
            {exportKindLabel(exportKind)}
          </span>
        )}
        {isRescan && (
          <span className="text-[10px] font-medium text-signal-dim">Re-scan</span>
        )}
        {watchEnabled && (
          <span className="text-[10px] font-medium text-signal-dim">Watch on</span>
        )}
      </div>
      <p className="mt-1 break-all font-medium text-ink group-hover:underline">
        {title}
      </p>
      <p className="mt-0.5 text-sm text-ink-soft">{summary}</p>
      <p className="mt-1 text-xs text-mute">
        {new Date(date).toLocaleString()}
        {url && title !== url && (
          <>
            {" · "}
            <span className="break-all">{url}</span>
          </>
        )}
      </p>
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggle,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  hint?: string;
}) {
  return (
    <label className="block text-sm">
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className="text-mute">{label}</span>
        {hint && <span className="text-xs text-mute">{hint}</span>}
      </div>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          minLength={label.includes("New") ? 6 : undefined}
          autoComplete={
            label.includes("Current")
              ? "current-password"
              : label.includes("Confirm")
                ? "new-password"
                : "new-password"
          }
          className="w-full rounded-xl border border-[var(--line)] bg-paper py-2.5 pl-3 pr-11 outline-none focus:ring-2 focus:ring-signal/30"
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-mute hover:bg-fog hover:text-ink"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </label>
  );
}
