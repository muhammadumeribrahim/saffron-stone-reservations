import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-zinc-900/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} Saffron & Stone • Reservations
            </p>

        <div className="flex gap-4 text-sm">
          <Link className="text-zinc-700 hover:text-zinc-950" href="/reserve">
            Book
          </Link>
          <Link className="text-zinc-700 hover:text-zinc-950" href="/status">
            Check Status
          </Link>
          <Link className="text-zinc-700 hover:text-zinc-950" href="/admin/login">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
