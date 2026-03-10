import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { config, genericAccessDenied, genericAuthError, hasSupabaseCoreConfig } from '@/lib/config';
import { AuthSession, getUser, signInWithOtp, signInWithPassword, supabaseLogout, verifyOtp } from '@/lib/supabase';
import { safeStorage } from '@/lib/storage';

interface PendingMfa {
  email: string;
  expiresAt: number;
}

interface AuthCtx {
  session: AuthSession | null;
  isAdmin: boolean;
  loading: boolean;
  pendingMfa: PendingMfa | null;
  beginSecureLogin: (email: string, password: string) => Promise<void>;
  resendOtpChallenge: () => Promise<void>;
  verifyOtpCode: (otp: string) => Promise<void>;
  cancelPendingLogin: () => void;
  logout: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | undefined>(undefined);
const storageKey = 'x1-auth-session';
const pendingMfaKey = 'x1-auth-mfa-pending';
const MFA_WINDOW_MS = 5 * 60 * 1000;

const readAuthStorage = () => safeStorage.get(storageKey, 'session') ?? safeStorage.get(storageKey, 'local');

const writeAuthStorage = (value: string) => {
  safeStorage.set(storageKey, value, 'session');
  safeStorage.remove(storageKey, 'local');
};

const clearAuthStorage = () => safeStorage.remove(storageKey, 'both');

const readPendingMfa = (): PendingMfa | null => {
  const raw = safeStorage.get(pendingMfaKey, 'session');
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as PendingMfa;
    if (!parsed?.email || !parsed?.expiresAt) return null;
    if (Date.now() >= parsed.expiresAt) return null;
    return { email: parsed.email.toLowerCase(), expiresAt: parsed.expiresAt };
  } catch {
    return null;
  }
};

const writePendingMfa = (value: PendingMfa) => safeStorage.set(pendingMfaKey, JSON.stringify(value), 'session');
const clearPendingMfaStorage = () => safeStorage.remove(pendingMfaKey, 'session');

const readAuthStorage = () => safeStorage.get(storageKey, 'session') ?? safeStorage.get(storageKey, 'local');

const writeAuthStorage = (value: string) => {
  safeStorage.set(storageKey, value, 'session');
  safeStorage.remove(storageKey, 'local');
};

const clearAuthStorage = () => safeStorage.remove(storageKey, 'both');

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<AuthSession | null>(() => {
    try {
      const raw = readAuthStorage();
      if (!raw) return null;
      const parsed = JSON.parse(raw) as AuthSession;
      if (!parsed?.access_token || !parsed?.refresh_token || !parsed?.token_type || !parsed?.user?.id) return null;
      return parsed;
    } catch {
      clearAuthStorage();
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [pendingMfa, setPendingMfa] = useState<PendingMfa | null>(() => readPendingMfa());

  const normalizedAdminEmail = config.adminEmail?.toLowerCase() ?? '';
  const isAdmin = Boolean(session?.user.email && normalizedAdminEmail && session.user.email.toLowerCase() === normalizedAdminEmail);

  const clearPendingMfa = () => {
    setPendingMfa(null);
    clearPendingMfaStorage();
  };

  const ensureAdmin = (next: AuthSession) => {
    const email = next.user.email?.toLowerCase();
    if (!email || !normalizedAdminEmail || email !== normalizedAdminEmail) {
      throw new Error(genericAccessDenied);
    }
  };

  useEffect(() => {
    if (!pendingMfa) return;
    if (Date.now() >= pendingMfa.expiresAt) clearPendingMfa();
  }, [pendingMfa]);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const token = hash.get('access_token');
    const refresh = hash.get('refresh_token');
    const type = hash.get('token_type') || 'bearer';
    const expires = Number(hash.get('expires_in') || 3600);
    if (!token || !refresh || !hasSupabaseCoreConfig) return;

    const activePending = readPendingMfa();
    if (!activePending) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
      void supabaseLogout(token).catch(() => undefined);
      return;
    }

    getUser(token)
      .then((user) => {
        const tokenEmail = user.email?.toLowerCase();
        if (!tokenEmail || tokenEmail !== activePending.email) throw new Error(genericAuthError);
        const next: AuthSession = { access_token: token, refresh_token: refresh, token_type: type, expires_in: expires, user };
        ensureAdmin(next);
        setSession(next);
        writeAuthStorage(JSON.stringify(next));
        clearPendingMfa();
        history.replaceState(null, '', window.location.pathname + window.location.search);
      })
      .catch(() => {
        clearPendingMfa();
        history.replaceState(null, '', window.location.pathname + window.location.search);
      });
  }, []);

  useEffect(() => {
    if (!session?.access_token || !hasSupabaseCoreConfig) return;
    getUser(session.access_token)
      .then((user) => {
        if (!user?.id) throw new Error('invalid-session');
        const email = user.email?.toLowerCase();
        if (!email || !normalizedAdminEmail || email !== normalizedAdminEmail) throw new Error(genericAccessDenied);
        const next = { ...session, user };
        setSession(next);
        writeAuthStorage(JSON.stringify(next));
      })
      .catch(async () => {
        if (session?.access_token) await supabaseLogout(session.access_token).catch(() => undefined);
        setSession(null);
        clearPendingMfa();
        clearAuthStorage();
      });
  }, [normalizedAdminEmail, session?.access_token]);

  const value = useMemo<AuthCtx>(
    () => ({
      session,
      isAdmin,
      loading,
      pendingMfa,
      beginSecureLogin: async (email, password) => {
        if (!hasSupabaseCoreConfig) throw new Error(genericAuthError);
        setLoading(true);
        try {
          const next = await signInWithPassword(email, password);
          ensureAdmin(next);
          await supabaseLogout(next.access_token).catch(() => undefined);
          await signInWithOtp(email);
          clearAuthStorage();
          setSession(null);
          const pending = { email, expiresAt: Date.now() + MFA_WINDOW_MS };
          setPendingMfa(pending);
          writePendingMfa(pending);
        } catch {
          clearPendingMfa();
          throw new Error(genericAuthError);
        } finally {
          setLoading(false);
        }
      },
      resendOtpChallenge: async () => {
        if (!hasSupabaseCoreConfig || !pendingMfa) throw new Error(genericAuthError);
        if (Date.now() >= pendingMfa.expiresAt) {
          clearPendingMfa();
          throw new Error(genericAuthError);
        }
        setLoading(true);
        try {
          await signInWithOtp(pendingMfa.email);
          const next = { email: pendingMfa.email, expiresAt: Date.now() + MFA_WINDOW_MS };
          setPendingMfa(next);
          writePendingMfa(next);
        } catch {
          throw new Error(genericAuthError);
        } finally {
          setLoading(false);
        }
      },
      verifyOtpCode: async (otp) => {
        if (!hasSupabaseCoreConfig || !pendingMfa) throw new Error(genericAuthError);
        if (Date.now() >= pendingMfa.expiresAt) {
          clearPendingMfa();
          throw new Error(genericAuthError);
        }
        setLoading(true);
        try {
          const next = await verifyOtp(pendingMfa.email, otp.trim());
          ensureAdmin(next);
          setSession(next);
          writeAuthStorage(JSON.stringify(next));
          clearPendingMfa();
        } catch {
          throw new Error(genericAuthError);
        } finally {
          setLoading(false);
        }
      },
      cancelPendingLogin: () => {
        clearPendingMfa();
      },
      logout: async () => {
        if (session?.access_token && hasSupabaseCoreConfig) await supabaseLogout(session.access_token).catch(() => undefined);
        setSession(null);
        clearPendingMfa();
        clearAuthStorage();
      },
    }),
    [isAdmin, loading, pendingMfa, session],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('Authentication context unavailable.');
  return ctx;
}
