"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AuthNavControls } from "@/components/AuthNavControls";

const mobileMenuGroups = [
  {
    title: "Scan",
    items: [
      { href: "/check", label: "Scan My Business" },
      { href: "/assess", label: "Compliance scan" },
      { href: "/seller-check", label: "Seller check" },
    ],
  },
  {
    title: "For you",
    items: [
      { href: "/consumers", label: "Consumer hub" },
      { href: "/report", label: "Report a problem" },
      { href: "/rights", label: "My rights" },
      { href: "/file", label: "What can I file?" },
      { href: "/power", label: "Consumer power" },
    ],
  },
  {
    title: "Library",
    items: [
      { href: "/cases", label: "Case library" },
      { href: "/companies", label: "Companies" },
      { href: "/ongoing", label: "Live cases" },
      { href: "/similar", label: "Similar cases" },
    ],
  },
  {
    title: "More",
    items: [
      { href: "/profile", label: "Profile" },
      { href: "/pricing", label: "Pricing" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function MobileHeaderActions() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const drawer =
    open && mounted
      ? createPortal(
          <div
            id={panelId}
            className="cl-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <button
              type="button"
              className="cl-mobile-drawer__backdrop"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <div className="cl-mobile-drawer__sheet">
              <div className="cl-mobile-drawer__handle" aria-hidden />
              <div className="cl-mobile-drawer__top">
                <div>
                  <p className="cl-mobile-drawer__kicker">CounterLayer</p>
                  <p className="cl-mobile-drawer__title">Menu</p>
                </div>
                <button
                  type="button"
                  className="cl-mobile-drawer__close"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>

              <div className="cl-mobile-drawer__auth">
                <AuthNavControls onNavigate={() => setOpen(false)} />
              </div>

              <div className="cl-mobile-drawer__body">
                {mobileMenuGroups.map((group) => (
                  <div key={group.title} className="cl-mobile-drawer__group">
                    <p className="cl-mobile-drawer__group-label">{group.title}</p>
                    <ul className="cl-mobile-drawer__list">
                      {group.items.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            className="cl-mobile-drawer__link"
                            onClick={() => setOpen(false)}
                          >
                            {l.label}
                            <span aria-hidden>›</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="flex shrink-0 items-center gap-2 lg:hidden">
        <AuthNavControls compact onNavigate={() => setOpen(false)} />
        <button
          type="button"
          className="cl-menu-btn"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {drawer}
    </>
  );
}
