"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PageWrap } from "@/components/PageWrap";
import { AuthNavControls } from "@/components/AuthNavControls";
import { AuthModal } from "@/components/AuthModal";
import { MobileTabBar } from "@/components/MobileTabBar";
import { useAuth } from "@/lib/auth";
import {
  PRODUCT_BOUNDARY_SHORT,
  PRODUCT_POSITIONING,
  PRODUCT_TAGLINE,
} from "@/lib/positioning";

const desktopLinks = [
  { href: "/consumers", label: "Consumers" },
  { href: "/report", label: "Report" },
  { href: "/check", label: "Business Scan" },
  { href: "/assess", label: "Compliance Scan" },
  { href: "/pricing", label: "Pricing" },
  { href: "/seller-check", label: "Seller check" },
  { href: "/rights", label: "My Rights" },
  { href: "/file", label: "File" },
  { href: "/similar", label: "Similar" },
  { href: "/companies", label: "Companies" },
  { href: "/ongoing", label: "Live" },
  { href: "/power", label: "Power" },
  { href: "/cases", label: "Library" },
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

          <div className="hidden items-center gap-3 lg:flex">
            <nav className="flex flex-wrap items-center justify-end gap-1">
              {desktopLinks.map((l) => (
                <DesktopNavLink key={l.href} href={l.href} label={l.label} />
              ))}
            </nav>
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
      className={`rounded-md px-2.5 py-1.5 text-sm transition ${
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
