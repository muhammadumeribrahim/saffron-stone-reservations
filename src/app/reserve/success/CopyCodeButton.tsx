"use client";

import { useState } from "react";

export default function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
      disabled={!code}
      title={!code ? "No code available" : "Copy code"}
    >
      {copied ? "Copied!" : "Copy code"}
    </button>
  );
}
