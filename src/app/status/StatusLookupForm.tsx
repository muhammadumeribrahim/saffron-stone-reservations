"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StatusLookupForm() {
  const router = useRouter();
  const [code, setCode] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = code.trim().toUpperCase();
    if (!cleaned) return;
    router.push(`/reservation/${encodeURIComponent(cleaned)}`);
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-3">
      <label className="block text-sm font-medium text-white/90">
        Confirmation code
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g. 1A13494E"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white outline-none focus:ring-2 focus:ring-[#f6c35f]/20"
        />
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-[#f6c35f] to-[#e39d2d] px-5 py-3 text-sm font-medium text-black hover:opacity-90"
        >
          Check
        </button>
      </div>

      <p className="text-xs text-white/50">
        Tip: paste the code from your email or the success screen.
      </p>
    </form>
  );
}
