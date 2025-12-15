"use client";

import { useActionState } from "react";
import { adminSignIn, type AdminAuthState } from "./actions";

const initial: AdminAuthState = { ok: true };

export default function AdminLoginForm() {
  const [signInState, signInAction, signInPending] = useActionState(adminSignIn, initial);

  return (
    <div className="space-y-6">
      <form action={signInAction} className="space-y-4">
        <h2 className="text-lg font-medium">Sign in</h2>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>

        {signInState.message ? (
          <p className={signInState.ok ? "text-sm text-gray-600" : "text-sm text-red-600"}>
            {signInState.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={signInPending}
          className="w-full rounded-md bg-black px-4 py-2 text-white hover:opacity-90 disabled:opacity-60"
        >
          {signInPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
