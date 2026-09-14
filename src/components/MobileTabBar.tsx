"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    href: "/",
    label: "Home",
    match: (p: string) => p === "/",
  },
  {
    href: "/check",
    label: "Scan",
    match: (p: string) =>
      p.startsWith("/check") ||
      p.startsWith("/assess") ||
      p.startsWith("/seller-check"),
  },
  {
    href: "/cases",
    label: "Library",
    match: (p: string) =>
      p.startsWith("/cases") ||
      p.startsWith("/companies") ||
      p.startsWith("/ongoing") ||
      p.startsWith("/similar"),
  },
  {
    href: "/consumers",
    label: "You",
    match: (p: string) =>
      p.startsWith("/consumers") ||
      p.startsWith("/rights") ||
      p.startsWith("/file") ||
      p.startsWith("/report") ||
      p.startsWith("/power") ||
      p.startsWith("/profile") ||
      p.startsWith("/pricing"),
  },
] as const;

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="cl-tabbar lg:hidden" aria-label="Primary">
      <ul className="cl-tabbar__list">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          return (
            <li key={tab.href} className="cl-tabbar__item">
              <Link
                href={tab.href}
                className={`cl-tabbar__link ${active ? "is-active" : ""}`}
              >
                <span className="cl-tabbar__dot" aria-hidden />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
