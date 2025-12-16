"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={
        active
          ? "rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-rose-500/20"
          : "rounded-full px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-white/70 hover:text-neutral-900"
      }
    >
      {label}
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-300 via-rose-300 to-fuchsia-400 text-sm font-extrabold text-neutral-900 shadow-sm">
            S
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-neutral-900">Saffron &amp; Stone</div>
            <div className="text-xs text-neutral-600">Reservations</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 sm:flex">
          <NavLink href="/reserve" label="Book" />
          <NavLink href="/status" label="Status" />
          <NavLink href="/case-study" label="Case Study" />
          <NavLink href="/admin/login" label="Admin" />
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden inline-flex items-center justify-center rounded-xl border border-white/50 bg-white/70 px-3 py-2 text-sm font-semibold text-neutral-900 shadow-sm"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {open ? (
        <div className="sm:hidden border-t border-white/40 bg-white/65 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <div className="grid gap-2">
              <NavLink href="/reserve" label="Book" onClick={() => setOpen(false)} />
              <NavLink href="/status" label="Status" onClick={() => setOpen(false)} />
              <NavLink href="/case-study" label="Case Study" onClick={() => setOpen(false)} />
              <NavLink href="/admin/login" label="Admin" onClick={() => setOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
