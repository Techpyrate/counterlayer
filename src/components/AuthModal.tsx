"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "@/lib/auth";

type Mode = "login" | "signup";

export function AuthModal({
  open,
  initialMode = "login",
  onClose,
}: {
  open: boolean;
  initialMode?: Mode;
  onClose: () => void;
}) {
  const { signIn, signUp, signInWithGoogle, backend } = useAuth();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const descId = useId();
  const googleEnabled = backend === "firebase";
  const isSignup = mode === "signup";
  const termsOk = !isSignup || agreedToTerms;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setError(null);
      setPassword("");
      setShowPassword(false);
      setAgreedToTerms(false);
    }
  }, [open, initialMode]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (isSignup && !agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    setBusy(true);
    setError(null);
    const res =
      mode === "login"
        ? await signIn({ email, password })
        : await signUp({ name, email, password });
    setBusy(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    onClose();
  }

  async function googleSignIn() {
    if (isSignup && !agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    setGoogleBusy(true);
    setError(null);
    const res = await signInWithGoogle();
    setGoogleBusy(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    onClose();
  }

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    if (next === "login") setAgreedToTerms(false);
  }

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-[6px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[440px] rounded-2xl border border-[var(--line)] bg-paper shadow-[0_24px_80px_-12px_rgba(18,28,26,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b border-[var(--line)] bg-[#f7faf8] px-6 py-5 sm:px-7">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-mute transition hover:bg-fog hover:text-ink"
          >
            <CloseIcon />
          </button>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-signal-dim">
            CounterLayer
          </p>
          <h2
            id={titleId}
            className="mt-1 pr-8 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-ink"
          >
            {isSignup ? "Create your account" : "Welcome back"}
          </h2>
          <p id={descId} className="mt-1.5 text-sm text-ink-soft">
            {isSignup
              ? "Save scans, export diligence reports, and manage your profile."
              : "Sign in to access your saved scans and profile."}
          </p>
        </div>

        <div className="px-6 py-5 sm:px-7">
          <div className="flex rounded-xl border border-[var(--line)] bg-fog/40 p-1">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                mode === "login"
                  ? "bg-paper text-ink shadow-sm"
                  : "text-mute hover:text-ink-soft"
              }`}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                mode === "signup"
                  ? "bg-paper text-ink shadow-sm"
                  : "text-mute hover:text-ink-soft"
              }`}
            >
              Sign up
            </button>
          </div>

          {googleEnabled && (
            <>
              <button
                type="button"
                disabled={busy || googleBusy || !termsOk}
                onClick={() => void googleSignIn()}
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl border border-[var(--line)] bg-paper px-4 py-3 text-sm font-semibold text-ink transition hover:border-ink/20 hover:bg-fog/30 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <GoogleMark />
                {googleBusy ? "Connecting…" : "Continue with Google"}
              </button>
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--line)]" />
                </div>
                <p className="relative mx-auto w-fit bg-paper px-3 text-[11px] font-medium uppercase tracking-wider text-mute">
                  or continue with email
                </p>
              </div>
            </>
          )}

          <form className="space-y-4" onSubmit={submit}>
            {isSignup && (
              <Field label="Full name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Jane Smith"
                  className={inputClass}
                />
              </Field>
            )}

            <Field label="Email address">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@company.com"
                className={inputClass}
              />
            </Field>

            <Field
              label="Password"
              hint={isSignup ? "At least 6 characters" : undefined}
            >
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  placeholder={isSignup ? "Create a password" : "Your password"}
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-mute transition hover:bg-fog hover:text-ink"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </Field>

            {isSignup && (
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--line)] bg-[#f7faf8] px-3.5 py-3 text-sm leading-snug text-ink-soft">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    if (e.target.checked) setError(null);
                  }}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
                />
                <span>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink underline underline-offset-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink underline underline-offset-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-danger/20 bg-danger/5 px-3 py-2.5 text-sm text-danger"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy || googleBusy || !termsOk}
              className="w-full rounded-xl bg-ink px-4 py-3.5 text-sm font-semibold text-fog transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {busy
                ? "Please wait…"
                : isSignup
                  ? "Create account"
                  : "Log in"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs leading-relaxed text-mute">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="font-semibold text-ink underline underline-offset-2"
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                New to CounterLayer?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="font-semibold text-ink underline underline-offset-2"
                >
                  Create an account
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}

const inputClass =
  "w-full rounded-xl border border-[var(--line)] bg-paper px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-mute/70 focus:border-signal/40 focus:ring-2 focus:ring-signal/20";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-ink">{label}</span>
        {hint && <span className="text-xs text-mute">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 3l18 18M10.58 10.58A3 3 0 0 0 12 15a3 3 0 0 0 2.42-4.42M9.9 4.24A10.66 10.66 0 0 1 12 4c6.5 0 10 7 10 7a18.24 18.24 0 0 1-2.16 3.19M6.12 6.12A18.49 18.49 0 0 0 2 12s3.5 7 10 7a10.66 10.66 0 0 0 4.24-.9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.083 36 24 36c-5.514 0-10-4.486-10-10s4.486-10 10-10c2.719 0 5.188 1.037 7.061 2.729l5.657-5.657C34.046 10.053 29.268 8 24 8 12.955 8 4 16.955 4 28s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c2.719 0 5.188 1.037 7.061 2.729l5.657-5.657C34.046 10.053 29.268 8 24 8 16.318 8 9.656 12.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 48c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 39.091 26.715 40 24 40c-5.047 0-9.402-3.317-10.927-7.888l-6.522 5.025C9.505 43.556 16.227 48 24 48z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 41.205 44 34 44 24c0-1.341-.138-2.652-.389-3.917z"
      />
    </svg>
  );
}
