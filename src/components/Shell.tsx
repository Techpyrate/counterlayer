"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PageWrap } from "@/components/PageWrap";
import { AuthNavControls } from "@/components/AuthNavControls";
import { AuthModal } from "@/components/AuthModal";
import { MobileTabBar } from "@/components/MobileTabBar";
import { AdminNavLink } from "@/components/AdminNavLink";
import { useAuth } from "@/lib/auth";
import {
  PRODUCT_BOUNDARY_SHORT,
  PRODUCT_POSITIONING,
  PRODUCT_TAGLINE,
} from "@/lib/positioning";

const desktopPrimary = [
  { href: "/consumers", label: "Consumers" },
  { href: "/report", label: "Report" },
  { href: "/check", label: "Business Scan" },
  { href: "/assess", label: "Compliance" },
  { href: "/cases", label: "Library" },
  { href: "/pricing", label: "Pricing" },
];

const desktopSecondary = [
  { href: "/seller-check", label: "Seller check" },
  { href: "/rights", label: "My Rights" },
  { href: "/file", label: "File" },
  { href: "/similar", label: "Similar" },
  { href: "/companies", label: "Companies" },
  { href: "/ongoing", label: "Live" },
  { href: "/power", label: "Power" },
];

function AuthQueryOpener() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [modal, setModal] = useState<"login" | "signup" | null>(null);

  useEffect(() => {
    if (loading || user) return;
    const auth = searchParams.get("auth");
    if (auth === "login" || auth === "signup") {
      setModal(auth);
      router.replace(pathname, { scroll: false });
    }
  }, [searchParams, loading, user, router, pathname]);

  return (
    <AuthModal
      open={modal !== null}
      initialMode={modal ?? "login"}
      onClose={() => setModal(null)}
    />
  );
}

function useEmbeddedInNativeApp() {
  const searchParams = useSearchParams();
  return searchParams.get("app") === "1";
}

export function Nav() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-paper lg:bg-[color-mix(in_srgb,var(--paper)_92%,transparent)] lg:backdrop-blur-md">
        <PageWrap className="flex items-center justify-between gap-3 py-3">
          <Link href="/" className="min-w-0 shrink">
            <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-ink sm:text-2xl">
              CounterLayer
            </span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.16em] text-mute sm:text-xs">
              Competition rights
            </span>
          </Link>

          {/* Plain links — work even if JS/CSS chunks fail on phone */}
          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <AdminNavLink compact />
            <Link
              href="/profile"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-[var(--line)] bg-fog px-3 text-sm font-bold text-ink"
            >
              Profile
            </Link>
            <Link
              href="/menu"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-ink px-3.5 text-sm font-bold text-fog"
            >
              Menu
            </Link>
          </div>

          <div className="hidden min-w-0 items-center gap-2 xl:gap-3 lg:flex">
            <nav
              className="flex min-w-0 flex-wrap items-center justify-end gap-0.5 xl:gap-1"
              aria-label="Main"
            >
              {desktopPrimary.map((l) => (
                <DesktopNavLink key={l.href} href={l.href} label={l.label} />
              ))}
              {/* Full secondary set on wide desktops */}
              <span className="hidden 2xl:contents">
                {desktopSecondary.map((l) => (
                  <DesktopNavLink key={l.href} href={l.href} label={l.label} />
                ))}
              </span>
              {/* Compact “More” on laptop / mid desktop */}
              <details className="relative 2xl:hidden">
                <summary className="cursor-pointer list-none rounded-md px-2.5 py-1.5 text-sm text-ink-soft/80 marker:content-none hover:bg-fog-deep/60 hover:text-ink [&::-webkit-details-marker]:hidden">
                  More
                </summary>
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-[var(--line)] bg-paper p-1.5 shadow-lg">
                  {desktopSecondary.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-fog hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  ))}
                  <Link
                    href="/menu"
                    className="mt-1 block rounded-lg border-t border-[var(--line)] px-3 py-2 text-sm font-semibold text-ink hover:bg-fog"
                  >
                    All pages
                  </Link>
                </div>
              </details>
            </nav>
            <AdminNavLink />
            <AuthNavControls />
          </div>
        </PageWrap>

        <Suspense fallback={null}>
          <AuthQueryOpener />
        </Suspense>
      </header>

      <Suspense fallback={null}>
        <EmbeddedChromeGate />
      </Suspense>

      <MobileTabBar />
    </>
  );
}

function DesktopNavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={`rounded-md px-2 py-1.5 text-xs transition xl:px-2.5 xl:text-sm ${
        active
          ? "bg-ink text-fog"
          : "text-ink-soft/80 hover:bg-fog-deep/60 hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );
}

function EmbeddedChromeGate() {
  const embedded = useEmbeddedInNativeApp();
  if (!embedded) return null;
  return (
    <style>{`
      header, footer, [aria-label="Primary"] { display: none !important; }
    `}</style>
  );
}

function DisclaimerBannerInner() {
  const embedded = useEmbeddedInNativeApp();
  if (embedded) return null;
  return (
    <div className="hidden border-b border-[var(--line)] bg-ink text-fog sm:block">
      <PageWrap>
        <p className="py-2 text-center text-[11px] leading-relaxed sm:text-sm">
          {PRODUCT_POSITIONING}
        </p>
      </PageWrap>
    </div>
  );
}

export function DisclaimerBanner() {
  return (
    <Suspense fallback={null}>
      <DisclaimerBannerInner />
    </Suspense>
  );
}

function FooterInner() {
  const embedded = useEmbeddedInNativeApp();
  if (embedded) return null;
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-ink text-fog pb-24 lg:pb-0">
      <PageWrap className="flex flex-col gap-3 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl font-bold">
            CounterLayer
          </p>
          <p className="mt-2 max-w-xl text-sm text-fog/70">{PRODUCT_TAGLINE}</p>
        </div>
        <p className="text-xs text-fog/50 md:max-w-sm md:text-right">
          {PRODUCT_BOUNDARY_SHORT} Verify primary sources before relying on any
          summary.
        </p>
      </PageWrap>
    </footer>
  );
}

export function Footer() {
  return (
    <Suspense fallback={null}>
      <FooterInner />
    </Suspense>
  );
}
