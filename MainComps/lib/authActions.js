import { supabase } from "./supabase";
import {
  isEmail,
  normalizeEmail,
  normalizeName,
  normalizePhone,
  validateLoginIdentifier,
  validatePassword,
  validateSignup,
} from "./authValidation";

const CLIENT_ROLE = "client";
const ACTIVE_STATUS = "active";

function firstError(errors) {
  return Object.values(errors).find(Boolean) || "";
}

function profileRow({ id, fullName, phone, email }) {
  return {
    ...(id ? { id } : {}),
    full_name: normalizeName(fullName),
    phone: normalizePhone(phone),
    email: normalizeEmail(email),
    role: CLIENT_ROLE,
    status: ACTIVE_STATUS,
    created_at: new Date().toISOString(),
  };
}

async function findUserByEmail(email) {
  const { data, error } = await supabase
    .from("Users")
    .select("*")
    .eq("email", normalizeEmail(email))
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function findUserByPhone(phone) {
  const { data, error } = await supabase
    .from("Users")
    .select("*")
    .eq("phone", normalizePhone(phone))
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getProfileForAuthUser(authUser) {
  if (!authUser) return null;

  const byId = await supabase
    .from("Users")
    .select("*")
    .eq("id", authUser.id)
    .maybeSingle();

  if (!byId.error && byId.data) return byId.data;

  if (authUser.email) {
    return findUserByEmail(authUser.email);
  }

  return null;
}

export async function ensureUserProfile(authUser, extras = {}) {
  const existing = await getProfileForAuthUser(authUser);
  if (existing) return existing;

  const metadata = authUser.user_metadata || {};
  const row = profileRow({
    id: authUser.id,
    fullName: extras.fullName || metadata.full_name,
    phone: extras.phone || metadata.phone,
    email: extras.email || authUser.email,
  });

  const { data, error } = await supabase
    .from("Users")
    .insert(row)
    .select("*")
    .maybeSingle();

  if (!error && data) return data;

  if (error && row.id) {
    const { id, ...withoutId } = row;
    const retry = await supabase
      .from("Users")
      .insert(withoutId)
      .select("*")
      .maybeSingle();

    if (retry.error) throw retry.error;
    return retry.data;
  }

  if (error) throw error;
  return data;
}

export async function signUpAccount(form) {
  const fieldErrors = validateSignup(form);
  const message = firstError(fieldErrors);
  if (message) {
    return { error: message, fieldErrors };
  }

  const fullName = normalizeName(form.fullName);
  const phone = normalizePhone(form.phone);
  const email = normalizeEmail(form.email);

  const [emailTaken, phoneTaken] = await Promise.all([
    findUserByEmail(email),
    findUserByPhone(phone),
  ]);

  if (emailTaken) {
    return {
      error: "This email is already registered.",
      fieldErrors: { ...fieldErrors, email: "This email is already registered." },
    };
  }

  if (phoneTaken) {
    return {
      error: "This phone number is already registered.",
      fieldErrors: { ...fieldErrors, phone: "This phone number is already registered." },
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password: form.password,
    options: {
      data: {
        full_name: fullName,
        phone,
        role: CLIENT_ROLE,
        status: ACTIVE_STATUS,
      },
    },
  });

  if (error) {
    return { error: error.message, fieldErrors };
  }

  if (data.user) {
    try {
      await ensureUserProfile(data.user, { fullName, phone, email });
    } catch (profileError) {
      if (data.session) {
        return { error: profileError.message, fieldErrors };
      }
    }
  }

  if (!data.session) {
    return {
      error: "",
      needsConfirmation: true,
      fieldErrors,
    };
  }

  return { error: "", fieldErrors, session: data.session };
}

export async function signInAccount({ identifier, password }) {
  const identifierError = validateLoginIdentifier(identifier);
  const passwordError = password ? "" : "Enter your password.";

  if (identifierError || passwordError) {
    return {
      error: identifierError || passwordError,
      fieldErrors: {
        identifier: identifierError,
        password: passwordError,
      },
    };
  }

  const rawIdentifier = String(identifier).trim();
  let email = "";

  if (isEmail(rawIdentifier)) {
    email = normalizeEmail(rawIdentifier);
  } else {
    const profile = await findUserByPhone(rawIdentifier);
    if (!profile?.email) {
      return {
        error: "Invalid phone number, email, or password.",
        fieldErrors: {},
      };
    }
    email = profile.email;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: "Invalid phone number, email, or password.",
      fieldErrors: {},
    };
  }

  const profile = await ensureUserProfile(data.user);

  if (profile?.status && profile.status !== ACTIVE_STATUS) {
    await supabase.auth.signOut();
    return {
      error: "This account is not active.",
      fieldErrors: {},
    };
  }

  return { error: "", session: data.session, profile };
}
