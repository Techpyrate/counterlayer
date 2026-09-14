"use client";

import { useEffect, useState } from "react";
import { PageWrap } from "@/components/PageWrap";
import { ProfileDashboard } from "@/components/ProfileDashboard";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/lib/auth";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) setLoginOpen(true);
  }, [loading, user]);

  if (loading) {
    return (
      <PageWrap className="py-16">
        <p className="text-sm text-mute">Loading account…</p>
      </PageWrap>
    );
  }

  if (!user) {
    return (
      <PageWrap className="py-10 pb-28">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-ink">
          Profile
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Sign in to view your account, plan, and scan history.
        </p>
        <button
          type="button"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-ink px-5 text-sm font-semibold text-fog"
          onClick={() => setLoginOpen(true)}
        >
          Log in / Sign up
        </button>
        <AuthModal
          open={loginOpen}
          initialMode="login"
          onClose={() => setLoginOpen(false)}
        />
      </PageWrap>
    );
  }

  return (
    <PageWrap className="py-10 sm:py-14 pb-28">
      <ProfileDashboard />
    </PageWrap>
  );
}
