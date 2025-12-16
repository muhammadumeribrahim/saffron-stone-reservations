"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StatusLookupPage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = code.trim().toUpperCase();
    if (!cleaned) return;
    router.push(`/reservation/${encodeURIComponent(cleaned)}`);
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="glass p-8 md:p-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/60 px-3 py-1 text-xs text-zinc-700">
          Saffron & Stone • Status
        </div>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Check your reservation
        </h1>
        <p className="mt-3 text-zinc-600">
          Enter your confirmation code to see if it’s pending, approved, or denied.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="rounded-2xl border border-zinc-900/10 bg-white/70 px-4 py-3">
            <label className="text-xs text-zinc-500">Confirmation code</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. 1A13494E"
              className="mt-1 w-full bg-transparent text-sm outline-none"
            />
            <div className="mt-2 text-xs text-zinc-500">
              Tip: paste the code from your email or success screen.
            </div>
          </div>

          <button type="submit" className="btn-primary rounded-2xl px-6 py-4 text-sm font-semibold">
            Check
          </button>
        </form>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {[
            { title: "Pending", desc: "We received your request.", tone: "border-amber-300/60" },
            { title: "Approved", desc: "Your table is confirmed.", tone: "border-emerald-300/60" },
            { title: "Denied", desc: "Try another slot.", tone: "border-rose-300/60" },
          ].map((x) => (
            <div key={x.title} className={`rounded-2xl border bg-white/60 p-5 ${x.tone}`}>
              <div className="text-sm font-semibold">{x.title}</div>
              <div className="mt-2 text-sm text-zinc-600">{x.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
