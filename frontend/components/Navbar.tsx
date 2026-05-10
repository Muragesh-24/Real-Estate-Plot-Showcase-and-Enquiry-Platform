"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/plots", label: "Plots" },
  { href: "/layouts", label: "Layouts" },
  { href: "/completed-projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-sky-600 text-sm font-bold text-white shadow-lg shadow-emerald-600/20">
              ND
            </span>
            <span>
              <span className="block text-base font-semibold tracking-tight text-slate-900">
                Nyamagoud Developers
              </span>
              <span className="block text-xs font-medium uppercase tracking-[0.28em] text-slate-500">
                Jamkhandi, Karnataka
              </span>
            </span>
          </Link>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 lg:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-navigation"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span className="mr-2 text-lg leading-none">{mobileMenuOpen ? "×" : "☰"}</span>
            Menu
          </button>
        </div>

        <nav
          id="primary-navigation"
          className={`${mobileMenuOpen ? "flex" : "hidden"} flex-col gap-2 rounded-3xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/50 lg:flex lg:flex-row lg:items-center lg:gap-2 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
        >
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-3 text-sm font-medium transition lg:py-2 ${
                  active
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact#enquiry"
            className="rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 lg:py-2"
          >
            Book Site Visit
          </Link>
        </nav>
      </div>
    </header>
  );
}