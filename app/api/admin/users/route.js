import { NextResponse } from "next/server";
import { getUserManager } from "@/MainComps/lib/adminAuth";
import { canAssignRole, USER_ROLES } from "@/MainComps/lib/roles";
import { validatePassword } from "@/MainComps/lib/authValidation";

function jsonError(message, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request) {
  try {
    const { admin } = await getUserManager(request);
    const { data, error } = await admin
      .from("Users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ users: data || [] });
  } catch (error) {
    const message = error.message || "Could not load users.";
    const status = /not signed in|not allowed/i.test(message) ? 401 : 400;
    return jsonError(message, status);
  }
}

export async function PATCH(request) {
  try {
    const { profile, admin } = await getUserManager(request);
    const body = await request.json();
    const id = String(body?.id || "").trim();
    const nextRole = body?.role ? String(body.role).trim().toLowerCase() : "";
    const password = body?.password ? String(body.password) : "";

    if (!id) {
      return jsonError("User id is required.");
    }

    if (!nextRole && !password) {
      return jsonError("Provide a role or a new password.");
    }

    const existing = await admin.from("Users").select("*").eq("id", id).maybeSingle();

    if (existing.error) throw existing.error;
    if (!existing.data) {
      return jsonError("User not found.", 404);
    }

    if (nextRole) {
      if (!USER_ROLES.includes(nextRole)) {
        return jsonError("Invalid role.");
      }

      if (!canAssignRole(profile.role, nextRole)) {
        return jsonError("You cannot assign this role.");
      }

      if (id === profile.id && nextRole !== profile.role) {
        return jsonError("You cannot change your own role.");
      }

      const { error } = await admin
        .from("Users")
        .update({ role: nextRole })
        .eq("id", id);

      if (error) throw error;

      try {
        await admin.auth.admin.updateUserById(id, {
          user_metadata: {
            role: nextRole,
          },
        });
      } catch {
        // Role is stored on the Users table even if Auth metadata cannot be updated.
      }
    }

    if (password) {
      const passwordError = validatePassword(password);
      if (passwordError) {
        return jsonError(passwordError);
      }

      const { error } = await admin.auth.admin.updateUserById(id, { password });
      if (error) throw error;
    }

    const updated = await admin.from("Users").select("*").eq("id", id).maybeSingle();
    if (updated.error) throw updated.error;

    return NextResponse.json({ user: updated.data });
  } catch (error) {
    const message = error.message || "Could not update user.";
    const status = /not signed in|not allowed/i.test(message) ? 401 : 400;
    return jsonError(message, status);
  }
}
