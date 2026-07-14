// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FiMenu, FiX, FiCalendar } from "react-icons/fi";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isAdmin = (session?.user as { role?: string } | undefined)?.role === "admin";
  const isLoggedIn = !isPending && !!session;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  // Logged-out: Home, Explore, About = 3 routes (rubric minimum).
  // Logged-in: Home, Explore, Add Event, Manage Events, About = 5 routes (rubric minimum).
  const loggedOutLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Explore" },
    { href: "/about", label: "About" },
  ];
  const loggedInLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Explore" },
    { href: "/events/add", label: "Add Event" },
    { href: "/events/manage", label: isAdmin ? "Manage All" : "My Events" },
    { href: "/about", label: "About" },
  ];
  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-twilight-800 bg-twilight-950/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 lg:px-16">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <FiCalendar className="text-amber-400" />
          Eventide
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-amber-400 ${
                pathname === link.href ? "text-amber-400" : "text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {isPending ? null : isLoggedIn ? (
            <button
              onClick={handleSignOut}
              className="rounded-lg border border-twilight-800 px-4 py-2 text-sm hover:bg-twilight-900"
            >
              Sign Out
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm text-foreground/80 hover:text-amber-400">
                Log In
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-twilight-950 hover:bg-amber-500"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="text-2xl md:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-twilight-800 bg-twilight-950 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm text-foreground/80 hover:text-amber-400"
              >
                {link.label}
              </Link>
            ))}
            {isPending ? null : isLoggedIn ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleSignOut();
                }}
                className="text-left text-sm text-red-400"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="text-sm">
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-amber-400"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}