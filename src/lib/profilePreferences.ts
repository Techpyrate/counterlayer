import type { ProfileRole } from "@/data/profileRoles";

const KEY = "counterweight:profile-role";

function readAll(): Record<string, ProfileRole> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record<string, ProfileRole>) : {};
  } catch {
    return {};
  }
}

export function getProfileRole(userId: string): ProfileRole | null {
  return readAll()[userId] ?? null;
}

export function setProfileRole(userId: string, role: ProfileRole): void {
  const all = readAll();
  all[userId] = role;
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function clearProfileRole(userId: string): void {
  const all = readAll();
  delete all[userId];
  localStorage.setItem(KEY, JSON.stringify(all));
}
