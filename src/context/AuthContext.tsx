import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, type User } from '@/lib/supabase';

type AuthContextValue = {
  session: Session | null;
  profile: User | null;
  loading: boolean;
  connectionError: string | null;
  signUp: (email: string, password: string, username: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const loadProfile = useCallback(async (user: SupabaseUser) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Failed to load profile:', error.message);
      setConnectionError('Connection failed. Please check your network and try again.');
      return;
    }

    setConnectionError(null);

    if (!data) {
      // Profile doesn't exist yet — the user signed up but the trigger
      // (if any) hasn't created it. We'll create it lazily here.
      const username = (user.user_metadata?.username as string) || 'Seeker';
      const { data: created, error: createErr } = await supabase
        .from('users')
        .insert({ id: user.id, username })
        .select('*')
        .maybeSingle();

      if (createErr) {
        console.error('Failed to create profile:', createErr.message);
        setConnectionError('Connection failed. Please check your network and try again.');
        return;
      }
      setProfile(created as User);
      return;
    }

    setProfile(data as User);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (session?.user) {
      await loadProfile(session.user);
    }
  }, [session, loadProfile]);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session: s }, error }) => {
      if (!mounted) return;
      if (error) {
        setConnectionError('Connection failed. Please check your network and try again.');
        setLoading(false);
        return;
      }
      setSession(s);
      if (s?.user) {
        loadProfile(s.user).finally(() => mounted && setLoading(false));
      } else {
        setLoading(false);
      }
    }).catch(() => {
      if (!mounted) return;
      setConnectionError('Connection failed. Please check your network and try again.');
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!mounted) return;
      setSession(s);
      if (s?.user) {
        (async () => {
          await loadProfile(s.user);
          if (mounted) setLoading(false);
        })();
      } else {
        setProfile(null);
        if (mounted) setLoading(false);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    if (error) return { error: error.message };
    if (data.user) {
      await loadProfile(data.user);
    }
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    if (data.user) {
      await loadProfile(data.user);
    }
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ session, profile, loading, connectionError, signUp, signIn, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
