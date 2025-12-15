"use server";

import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";

export type AdminAuthState = { ok: boolean; message?: string };

export async function adminSignIn(
  prev: AdminAuthState,
  formData: FormData
): Promise<AdminAuthState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) return { ok: false, message: "Email and password are required." };

  const supabase = await createSupabaseServer();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { ok: false, message: error.message };

  redirect("/admin/reservations");
}

export async function adminSignUp(
  prev: AdminAuthState,
  formData: FormData
): Promise<AdminAuthState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) return { ok: false, message: "Email and password are required." };

  const supabase = await createSupabaseServer();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) return { ok: false, message: error.message };

  return { ok: true, message: "Account created. Now sign in." };
}

export async function adminLogout() {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
