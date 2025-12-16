"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={
        active
          ? "rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm"
          : "rounded-full px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-white/70 hover:text-neutral-900"
      }
    >
      {label}
    </Link>
  );
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-300 to-rose-400 text-sm font-extrabold text-neutral-900 shadow-sm">
            S
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-neutral-900">Saffron &amp; Stone</div>
            <div className="text-xs text-neutral-600">Reservations</div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-2">
          <NavLink href="/reserve" label="Book" />
          <NavLink href="/status" label="Status" />
          <NavLink href="/case-study" label="Case Study" />
          <NavLink href="/admin/login" label="Admin" />
        </nav>
      </div>
    </header>
  );
}
