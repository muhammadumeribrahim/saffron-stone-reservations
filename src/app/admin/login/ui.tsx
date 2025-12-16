"use client";

import { useActionState } from "react";
import { adminSignIn, type AdminAuthState } from "./actions";

const initial: AdminAuthState = { ok: true };

export default function AdminLoginForm() {
  const [signInState, signInAction, signInPending] = useActionState(adminSignIn, initial);

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-neutral-900">Admin Login</h1>
        <p className="mt-2 text-sm text-neutral-700">
          Sign in to manage reservation requests.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-neutral-900/15 bg-white/45 p-6 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        {/* Watermark (fixed: never clipped on mobile/desktop) */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 w-[92%] -translate-x-1/2 -translate-y-1/2 rotate-[-10deg] text-center">
            <div
              className="select-none font-extrabold leading-[0.9] tracking-tight text-neutral-900/10"
              style={{ fontSize: "clamp(44px, 6vw, 120px)" }}
            >
              <div>Saffron</div>
              <div>&amp; Stone</div>
            </div>
          </div>

          {/* soft glow wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-200/35 via-amber-100/20 to-sky-200/35" />
        </div>

        {/* Foreground content */}
        <div className="relative">
          <form action={signInAction} className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/55 px-3 py-1 text-xs font-medium text-neutral-800 backdrop-blur">
              Staff portal
            </div>

            <div className="pt-1">
              <h2 className="text-3xl font-semibold text-neutral-900">Admin Login</h2>
              <p className="mt-2 text-sm text-neutral-700">
                Sign in to manage reservation requests.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-900">Email</label>
              <input
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-2xl border border-neutral-900/15 bg-white/70 px-4 py-3 text-sm outline-none ring-0 placeholder:text-neutral-500 focus:border-neutral-900/25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-900">Password</label>
              <input
                name="password"
                type="password"
                required
                className="mt-1 w-full rounded-2xl border border-neutral-900/15 bg-white/70 px-4 py-3 text-sm outline-none ring-0 placeholder:text-neutral-500 focus:border-neutral-900/25"
              />
            </div>

            {signInState.message ? (
              <p className={signInState.ok ? "text-sm text-neutral-700" : "text-sm text-red-600"}>
                {signInState.message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={signInPending}
              className="w-full rounded-2xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white shadow-sm hover:opacity-95 disabled:opacity-60"
            >
              {signInPending ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
