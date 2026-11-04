"use client";

import { request } from "./requests/request";
import { supabase } from "./supabase";

export async function saveProduct(values, profile) {
  if (!profile?.id) {
    throw new Error("User ID is required to save a product.");
  }

  if (!values.name?.trim()) {
    throw new Error("Product name is required.");
  }

  const description = values.description?.trim();

  if (!description) {
    throw new Error("Product description is required.");
  }

  const userId = profile.id;

  const row = {
    name: values.name.trim(),
    description,
    type: values.type || null,
    company_id: values.company_id || null,
    last_edited: userId,
  };

  if (values.id) {
    const { data, error } = await supabase
      .from("Products")
      .update(row)
      .eq("id", values.id)
      .select("*")
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error("Product not found or update not permitted.");

    return data;
  }

  const { data, error } = await supabase
    .from("Products")
    .insert({
      ...row,
      added_by: userId,
    })
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function saveCompany(values, profile) {
  if (!profile?.id) {
    throw new Error("User ID is required to save a company.");
  }

  if (!values.name?.trim()) {
    throw new Error("Company name is required.");
  }

  const userId = profile.id;

  const row = {
    name: values.name.trim(),
    description: values.description?.trim() || null,
    is_contracted: Boolean(values.is_contracted),
    last_edit_by: userId,
    last_edit_at: new Date().toISOString(),
  };

  if (values.id) {
    const { data, error } = await supabase
      .from("Companies")
      .update(row)
      .eq("id", values.id)
      .select("*")
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error("Company not found or update not permitted.");

    return data;
  }

  const { data, error } = await supabase
    .from("Companies")
    .insert(row)
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("Products").delete().eq("id", id);
  if (error) throw error;
}

export async function deleteCompany(id) {
  const { error } = await supabase.from("Companies").delete().eq("id", id);
  if (error) throw error;
}

async function getAccessToken() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;

  const token = data.session?.access_token;
  if (!token) {
    throw new Error("Not signed in.");
  }

  return token;
}

export async function listManagedUsers() {
  const token = await getAccessToken();
  const response = await fetch("/api/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const payload = await response.json();
    return payload.users || [];
  }

  const payload = await response.json().catch(() => ({}));

  if (response.status === 401) {
    throw new Error(payload.error || "You are not allowed to manage users.");
  }

  const data = await request("Users", {
    sort: { field: "created_at", direction: "desc" },
  });

  return data || [];
}

export async function updateManagedUser({ id, role, password }) {
  const token = await getAccessToken();
  const response = await fetch("/api/admin/users", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, role, password }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || "Could not update user.");
  }

  return payload.user;
}
