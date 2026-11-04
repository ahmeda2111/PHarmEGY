"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProfileForAuthUser } from "../services/authActions";
import { supabase } from "../services/supabase";

const AuthContext = createContext(null);

export function getUserName(user, profile) {
  if (profile?.full_name) return profile.full_name;
  if (!user) return "";

  return (
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Account"
  );
}

export function getUserAvatar(user) {
  return user?.user_metadata?.avatar_url || user?.user_metadata?.picture || "";
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    const syncUser = async (authUser) => {
      setUser(authUser);

      if (!authUser) {
        setProfile(null);
        return;
      }

      try {
        const data = await getProfileForAuthUser(authUser);
        if (active) setProfile(data);
      } catch {
        if (active) setProfile(null);
      }
    };

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      await syncUser(data.session?.user ?? null);
      if (active) setReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      syncUser(session?.user ?? null).then(() => {
        if (active) setReady(true);
      });
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = useMemo(
    () => ({ user, profile, ready, signOut }),
    [user, profile, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
