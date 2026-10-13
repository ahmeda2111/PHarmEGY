import { createClient } from "@supabase/supabase-js";
import { canManageUsers } from "./roles";
import { createSupabaseAdmin } from "./supabaseAdmin";

function getBearerToken(request) {
  const header = request.headers.get("authorization") || "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
}

export async function getUserManager(request) {
  const token = getBearerToken(request);

  if (!token) {
    throw new Error("Not signed in.");
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase is not configured.");
  }

  const authClient = createClient(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data, error } = await authClient.auth.getUser(token);

  if (error || !data.user) {
    throw new Error("Not signed in.");
  }

  const admin = createSupabaseAdmin();
  const byId = await admin
    .from("Users")
    .select("*")
    .eq("id", data.user.id)
    .maybeSingle();

  if (byId.error) throw byId.error;

  let profile = byId.data;

  if (!profile && data.user.email) {
    const byEmail = await admin
      .from("Users")
      .select("*")
      .eq("email", data.user.email.toLowerCase())
      .maybeSingle();

    if (byEmail.error) throw byEmail.error;
    profile = byEmail.data;
  }

  if (!canManageUsers(profile?.role)) {
    throw new Error("You are not allowed to manage users.");
  }

  return { user: data.user, profile, admin };
}
