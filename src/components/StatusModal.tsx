"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function StatusModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) setTimeout(() => boxRef.current?.querySelector("input")?.focus(), 50);
  }, [open]);

  function go() {
    const cleaned = code.trim().toUpperCase();
    if (!cleaned) return;
    onClose();
    router.push(`/reservation/${encodeURIComponent(cleaned)}`);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div
          ref={boxRef}
          className="w-full max-w-lg rounded-[28px] border border-black/10 bg-white/85 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.18)] backdrop-blur"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs text-black/60">Saffron & Stone</div>
              <h3 className="mt-1 text-xl font-semibold text-black">
                Check reservation status
              </h3>
              <p className="mt-2 text-sm text-black/70">
                Enter your confirmation code to view your reservation.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-2xl border border-black/10 bg-black/5 px-3 py-2 text-sm text-black/70 hover:bg-black/10"
            >
              Close
            </button>
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-black/90">
              Confirmation code
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. 1A13494E"
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 font-mono text-sm text-black outline-none focus:ring-2 focus:ring-amber-300"
              />
              <button
                onClick={go}
                className="rounded-2xl bg-gradient-to-r from-amber-400 to-rose-400 px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(244,166,97,0.35)] hover:opacity-95"
              >
                Check
              </button>
            </div>
            <p className="mt-2 text-xs text-black/55">
              You’ll find the code on the success screen or your email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
