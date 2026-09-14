"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile as firebaseUpdateProfile,
  updatePassword as firebaseUpdatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  getFirebaseAuth,
  googleProvider,
  isFirebaseConfigured,
  mapFirebaseAuthError,
} from "@/lib/firebase";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { ProfileRole } from "@/data/profileRoles";
import {
  getProfileRole,
  setProfileRole as persistProfileRole,
} from "@/lib/profilePreferences";

export type AuthBackend = "firebase" | "supabase" | "local";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  backend: AuthBackend;
  photoUrl?: string;
  profileRole?: ProfileRole | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  backend: AuthBackend;
  signUp: (input: {
    name: string;
    email: string;
    password: string;
  }) => Promise<{ error?: string }>;
  signIn: (input: {
    email: string;
    password: string;
  }) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (input: { name: string }) => Promise<{ error?: string }>;
  updateProfileRole: (role: ProfileRole) => Promise<{ error?: string }>;
  changePassword: (input: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<{ error?: string }>;
  canChangePassword: boolean;
  authProviders: string[];
  getAccessToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = "cw-auth-session";
const USERS_KEY = "cw-auth-users";

type LocalAccount = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
};

function resolveBackend(): AuthBackend {
  if (isFirebaseConfigured()) return "firebase";
  if (isSupabaseConfigured()) return "supabase";
  return "local";
}

function firebaseUserToAuthUser(user: FirebaseUser): AuthUser {
  return {
    id: user.uid,
    email: user.email || "",
    name:
      user.displayName ||
      user.email?.split("@")[0] ||
      "Account",
    createdAt: user.metadata.creationTime || new Date().toISOString(),
    backend: "firebase",
    photoUrl: user.photoURL || undefined,
    profileRole: getProfileRole(user.uid),
  };
}

function withStoredRole(user: AuthUser): AuthUser {
  return { ...user, profileRole: getProfileRole(user.id) };
}

async function hashPassword(password: string) {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function readLocalUsers(): LocalAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LocalAccount[];
  } catch {
    return [];
  }
}

function writeLocalUsers(users: LocalAccount[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function writeSession(user: AuthUser | null) {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else localStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authProviders, setAuthProviders] = useState<string[]>([]);
  const backend = resolveBackend();

  useEffect(() => {
    let cancelled = false;

    async function bootFirebase() {
      const auth = getFirebaseAuth();
      if (!auth) {
        if (!cancelled) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      const unsub = onAuthStateChanged(auth, (fbUser) => {
        if (cancelled) return;
        setAuthProviders(
          fbUser?.providerData.map((p) => p.providerId) ?? [],
        );
        setUser(fbUser ? firebaseUserToAuthUser(fbUser) : null);
        setLoading(false);
      });

      return unsub;
    }

    async function bootSupabase() {
      const sb = getSupabase();
      if (!sb) {
        if (!cancelled) {
          setUser(readSession());
          setLoading(false);
        }
        return;
      }
      const { data } = await sb.auth.getSession();
      if (cancelled) return;
      const session = data.session;
      if (session?.user) {
        const meta = session.user.user_metadata as { name?: string } | undefined;
        setAuthProviders(["email"]);
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          name:
            meta?.name ||
            session.user.email?.split("@")[0] ||
            "Account",
          createdAt: session.user.created_at || new Date().toISOString(),
          backend: "supabase",
          profileRole: getProfileRole(session.user.id),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
      const { data: sub } = sb.auth.onAuthStateChange((_event, next) => {
        if (!next?.user) {
          setUser(null);
          return;
        }
        const meta = next.user.user_metadata as { name?: string } | undefined;
        setAuthProviders(["email"]);
        setUser({
          id: next.user.id,
          email: next.user.email || "",
          name: meta?.name || next.user.email?.split("@")[0] || "Account",
          createdAt: next.user.created_at || new Date().toISOString(),
          backend: "supabase",
          profileRole: getProfileRole(next.user.id),
        });
      });
      return () => sub.subscription.unsubscribe();
    }

    let cleanup: (() => void) | undefined;

    if (backend === "firebase") {
      void bootFirebase().then((unsub) => {
        if (typeof unsub === "function") cleanup = unsub;
      });
    } else if (backend === "supabase") {
      void bootSupabase().then((fn) => {
        if (typeof fn === "function") cleanup = fn;
      });
    } else if (!cancelled) {
      setAuthProviders(["password"]);
      const session = readSession();
      setUser(session ? withStoredRole(session) : null);
      setLoading(false);
    }

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [backend]);

  const signUp = useCallback(
    async (input: { name: string; email: string; password: string }) => {
      const name = input.name.trim();
      const email = input.email.trim().toLowerCase();
      const password = input.password;
      if (!name || !email || password.length < 6) {
        return { error: "Name, email, and a password (6+ characters) are required." };
      }

      if (backend === "firebase") {
        const auth = getFirebaseAuth();
        if (!auth) return { error: "Auth service unavailable." };
        try {
          const cred = await createUserWithEmailAndPassword(auth, email, password);
          await firebaseUpdateProfile(cred.user, { displayName: name });
          setUser({ ...firebaseUserToAuthUser(cred.user), name });
          return {};
        } catch (err) {
          const code = (err as { code?: string }).code || "";
          return { error: mapFirebaseAuthError(code) };
        }
      }

      if (backend === "supabase") {
        const sb = getSupabase();
        if (!sb) return { error: "Auth service unavailable." };
        const { data, error } = await sb.auth.signUp({
          email,
          password,
          options: { data: { name } },
        });
        if (error) return { error: error.message };
        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || email,
            name,
            createdAt: data.user.created_at || new Date().toISOString(),
            backend: "supabase",
          });
        }
        return {};
      }

      const users = readLocalUsers();
      if (users.some((u) => u.email === email)) {
        return { error: "An account with that email already exists." };
      }
      const account: LocalAccount = {
        id: crypto.randomUUID(),
        email,
        name,
        passwordHash: await hashPassword(password),
        createdAt: new Date().toISOString(),
      };
      writeLocalUsers([...users, account]);
      const session: AuthUser = {
        id: account.id,
        email: account.email,
        name: account.name,
        createdAt: account.createdAt,
        backend: "local",
      };
      writeSession(session);
      setUser(session);
      return {};
    },
    [backend],
  );

  const signIn = useCallback(
    async (input: { email: string; password: string }) => {
      const email = input.email.trim().toLowerCase();
      const password = input.password;
      if (!email || !password) return { error: "Email and password are required." };

      if (backend === "firebase") {
        const auth = getFirebaseAuth();
        if (!auth) return { error: "Auth service unavailable." };
        try {
          const cred = await signInWithEmailAndPassword(auth, email, password);
          setUser(firebaseUserToAuthUser(cred.user));
          return {};
        } catch (err) {
          const code = (err as { code?: string }).code || "";
          return { error: mapFirebaseAuthError(code) };
        }
      }

      if (backend === "supabase") {
        const sb = getSupabase();
        if (!sb) return { error: "Auth service unavailable." };
        const { data, error } = await sb.auth.signInWithPassword({
          email,
          password,
        });
        if (error) return { error: error.message };
        if (data.user) {
          const meta = data.user.user_metadata as { name?: string } | undefined;
          setUser({
            id: data.user.id,
            email: data.user.email || email,
            name: meta?.name || email.split("@")[0] || "Account",
            createdAt: data.user.created_at || new Date().toISOString(),
            backend: "supabase",
          });
        }
        return {};
      }

      const users = readLocalUsers();
      const account = users.find((u) => u.email === email);
      if (!account) return { error: "No account found for that email." };
      const hash = await hashPassword(password);
      if (hash !== account.passwordHash) {
        return { error: "Incorrect password." };
      }
      const session: AuthUser = {
        id: account.id,
        email: account.email,
        name: account.name,
        createdAt: account.createdAt,
        backend: "local",
      };
      writeSession(session);
      setUser(session);
      return {};
    },
    [backend],
  );

  const signInWithGoogle = useCallback(async () => {
    if (backend !== "firebase") {
      return { error: "Google sign-in requires Firebase auth." };
    }
    const auth = getFirebaseAuth();
    if (!auth) return { error: "Auth service unavailable." };
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      setUser(firebaseUserToAuthUser(cred.user));
      return {};
    } catch (err) {
      const code = (err as { code?: string }).code || "";
      return { error: mapFirebaseAuthError(code) };
    }
  }, [backend]);

  const signOut = useCallback(async () => {
    if (backend === "firebase") {
      const auth = getFirebaseAuth();
      await auth?.signOut();
    } else if (backend === "supabase") {
      const sb = getSupabase();
      await sb?.auth.signOut();
    }
    writeSession(null);
    setUser(null);
  }, [backend]);

  const updateProfile = useCallback(
    async (input: { name: string }) => {
      const name = input.name.trim();
      if (!name) return { error: "Name is required." };
      if (!user) return { error: "Not signed in." };

      if (backend === "firebase") {
        const auth = getFirebaseAuth();
        if (!auth?.currentUser) return { error: "Auth service unavailable." };
        try {
          await firebaseUpdateProfile(auth.currentUser, { displayName: name });
          setUser({ ...user, name });
          return {};
        } catch (err) {
          const code = (err as { code?: string }).code || "";
          return { error: mapFirebaseAuthError(code) };
        }
      }

      if (backend === "supabase") {
        const sb = getSupabase();
        if (!sb) return { error: "Auth service unavailable." };
        const { error } = await sb.auth.updateUser({ data: { name } });
        if (error) return { error: error.message };
        setUser({ ...user, name });
        return {};
      }

      const users = readLocalUsers().map((u) =>
        u.id === user.id ? { ...u, name } : u,
      );
      writeLocalUsers(users);
      const next = { ...user, name };
      writeSession(next);
      setUser(next);
      return {};
    },
    [backend, user],
  );

  const updateProfileRole = useCallback(
    async (role: ProfileRole) => {
      if (!user) return { error: "Not signed in." };
      persistProfileRole(user.id, role);
      setUser({ ...user, profileRole: role });
      return {};
    },
    [user],
  );

  const canChangePassword =
    backend === "local" ||
    backend === "supabase" ||
    (backend === "firebase" &&
      authProviders.some((p) => p === "password"));

  const changePassword = useCallback(
    async (input: { currentPassword: string; newPassword: string }) => {
      const { currentPassword, newPassword } = input;
      if (!user) return { error: "Not signed in." };
      if (newPassword.length < 6) {
        return { error: "New password must be at least 6 characters." };
      }
      if (newPassword === currentPassword) {
        return { error: "New password must be different from the current one." };
      }

      if (backend === "firebase") {
        const auth = getFirebaseAuth();
        const fbUser = auth?.currentUser;
        if (!fbUser?.email) return { error: "Auth service unavailable." };
        if (!authProviders.includes("password")) {
          return {
            error:
              "This account uses Google sign-in. Change your password in your Google account.",
          };
        }
        try {
          const cred = EmailAuthProvider.credential(
            fbUser.email,
            currentPassword,
          );
          await reauthenticateWithCredential(fbUser, cred);
          await firebaseUpdatePassword(fbUser, newPassword);
          return {};
        } catch (err) {
          const code = (err as { code?: string }).code || "";
          return { error: mapFirebaseAuthError(code) };
        }
      }

      if (backend === "supabase") {
        const sb = getSupabase();
        if (!sb) return { error: "Auth service unavailable." };
        const { error: signInError } = await sb.auth.signInWithPassword({
          email: user.email,
          password: currentPassword,
        });
        if (signInError) return { error: "Current password is incorrect." };
        const { error } = await sb.auth.updateUser({ password: newPassword });
        if (error) return { error: error.message };
        return {};
      }

      const users = readLocalUsers();
      const account = users.find((u) => u.id === user.id);
      if (!account) return { error: "Account not found." };
      const hash = await hashPassword(currentPassword);
      if (hash !== account.passwordHash) {
        return { error: "Current password is incorrect." };
      }
      const newHash = await hashPassword(newPassword);
      writeLocalUsers(
        users.map((u) =>
          u.id === user.id ? { ...u, passwordHash: newHash } : u,
        ),
      );
      return {};
    },
    [backend, user, authProviders],
  );

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    if (backend !== "firebase") return null;
    const auth = getFirebaseAuth();
    const fbUser = auth?.currentUser;
    if (!fbUser) return null;
    try {
      return await fbUser.getIdToken();
    } catch {
      return null;
    }
  }, [backend]);

  const value = useMemo(
    () => ({
      user,
      loading,
      backend,
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
      updateProfile,
      updateProfileRole,
      changePassword,
      canChangePassword,
      authProviders,
      getAccessToken,
    }),
    [
      user,
      loading,
      backend,
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
      updateProfile,
      updateProfileRole,
      changePassword,
      canChangePassword,
      authProviders,
      getAccessToken,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
