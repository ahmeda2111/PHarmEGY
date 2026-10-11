"use client";

import { useEffect, useState } from "react";
import { getProfileForAuthUser } from "./authActions";
import { supabase } from "./supabase";

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

export function useAuth() {
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
      syncUser(session?.user ?? null);
      setReady(true);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, profile, ready, signOut };
}
