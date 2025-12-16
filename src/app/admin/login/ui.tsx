"use client";

import { useActionState } from "react";
import { adminSignIn, type AdminAuthState } from "./actions";

const initial: AdminAuthState = { ok: true };

export default function AdminLoginForm() {
  const [signInState, signInAction, signInPending] = useActionState(adminSignIn, initial);

  return (
    <div className="relative mx-auto max-w-xl">
      {/* Background restaurant name */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 w-[1200px] -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] text-center text-[90px] font-semibold tracking-tight text-zinc-900/5 md:text-[120px]">
          Saffron &amp; Stone
        </div>
      </div>

      <div className="glass relative p-8 md:p-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/60 px-3 py-1 text-xs text-zinc-700">
          Staff portal
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Admin Login</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Sign in to manage reservation requests.
        </p>

        <form action={signInAction} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3 text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3 text-sm outline-none"
            />
          </div>

          {signInState.message ? (
            <p className={signInState.ok ? "text-sm text-zinc-600" : "text-sm text-rose-600"}>
              {signInState.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={signInPending}
            className="btn-primary w-full rounded-2xl px-4 py-3 text-sm font-semibold disabled:opacity-60"
          >
            {signInPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
