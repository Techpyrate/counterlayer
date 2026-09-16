"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { isAdminEmail } from "@/lib/adminAccess";

export function AdminNavLink({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  if (loading || !user || !isAdminEmail(user.email)) return null;

  const active = pathname === "/admin" || pathname.startsWith("/admin/");
  return (
    <Link
      href="/admin"
      className={
        className ??
        (compact
          ? "inline-flex h-10 items-center justify-center rounded-xl bg-signal px-3 text-sm font-bold text-ink"
          : `rounded-md px-2 py-1.5 text-xs font-semibold transition xl:px-2.5 xl:text-sm ${
              active ? "bg-signal text-ink" : "bg-signal/20 text-ink hover:bg-signal/40"
            }`)
      }
    >
      Admin
    </Link>
  );
}
