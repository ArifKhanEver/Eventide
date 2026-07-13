"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

interface NavLink {
  label: string;
  href: string;
}

export default function Navbar() {
  const router = useRouter();
  
  const { data: session, isPending } = useSession();

  // ৩. Array of Objects with Type Annotation
  const publicRoutes: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "About", href: "/about" },
  ];

  const privateRoutes: NavLink[] = [
    { label: "Add Item", href: "/items/add" },
    { label: "Manage", href: "/items/manage" },
  ];

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-twilight-950/80 backdrop-blur-md border-b border-twilight-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link href="/" className="text-2xl font-bold text-amber-400">
          Eventide
        </Link>

        <div className="flex gap-6 items-center">
          {publicRoutes.map((route) => (
            <Link key={route.href} href={route.href} className="text-white/80 hover:text-amber-400 transition-colors">
              {route.label}
            </Link>
          ))}

          {isPending ? (
            <div className="h-4 w-20 bg-twilight-800 animate-pulse rounded"></div>
          ) : session ? (
            <>
              {privateRoutes.map((route) => (
                <Link key={route.href} href={route.href} className="text-dusk-400 font-semibold hover:text-dusk-500 transition-colors">
                  {route.label}
                </Link>
              ))}
              <button onClick={handleLogout} className="px-4 py-2 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500/20">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="px-4 py-2 bg-amber-400 text-twilight-950 font-semibold rounded-md">
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}