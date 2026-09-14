"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { AuthModal } from "@/components/AuthModal";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
}

export function AuthNavControls({
  onNavigate,
  compact = false,
}: {
  onNavigate?: () => void;
  /** Mobile header: avatar / Account only */
  compact?: boolean;
}) {
  const { user, loading } = useAuth();
  const [modal, setModal] = useState<"login" | "signup" | null>(null);

  if (loading) {
    return (
      <span
        className={`inline-block animate-pulse rounded-xl bg-fog-deep/60 ${
          compact ? "h-10 w-10" : "h-9 w-20 rounded-full"
        }`}
      />
    );
  }

  if (user) {
    return (
      <Link
        href="/profile"
        onClick={onNavigate}
        className={
          compact
            ? "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] bg-ink text-xs font-bold text-fog"
            : "inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-paper py-1 pl-1 pr-3 text-sm font-medium text-ink transition hover:bg-fog"
        }
        title="Open profile"
        aria-label={`Profile: ${user.name}`}
      >
        <span
          className={
            compact
              ? ""
              : "flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-bold text-fog"
          }
        >
          {initials(user.name)}
        </span>
        {!compact ? (
          <span className="max-w-[7rem] truncate">{user.name}</span>
        ) : null}
      </Link>
    );
  }

  return (
    <>
      {compact ? (
        <button
          type="button"
          onClick={() => setModal("login")}
          className="inline-flex h-10 items-center justify-center rounded-xl border border-[var(--line)] bg-fog px-3 text-sm font-semibold text-ink active:bg-fog-deep"
        >
          Account
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setModal("login")}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-ink-soft hover:bg-fog-deep/60 hover:text-ink"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => setModal("signup")}
            className="rounded-full bg-ink px-3 py-1.5 text-sm font-semibold text-fog"
          >
            Sign up
          </button>
        </div>
      )}
      <AuthModal
        open={modal !== null}
        initialMode={modal ?? "login"}
        onClose={() => setModal(null)}
      />
    </>
  );
}
