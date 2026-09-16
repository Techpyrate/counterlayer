/** Emails that may see the admin dashboard. Not a secret by itself — the account still needs a password. */
const BUILTIN_ADMIN_EMAILS = ["techpyrate.help@gmail.com"];

function extraAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function adminEmails(): string[] {
  return Array.from(
    new Set([...BUILTIN_ADMIN_EMAILS, ...extraAdminEmails()]),
  );
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return adminEmails().includes(email.trim().toLowerCase());
}
