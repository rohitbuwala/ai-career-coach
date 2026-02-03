"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {

  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Resume", path: "/resume" },
    { name: "Interview", path: "/interview" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <Link
          href="/dashboard"
          className="text-xl font-bold gradient-text tracking-wide"
        >
          AI Career Coach
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">

          {navItems.map((item) => {

            const active = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`
                  text-sm font-medium transition
                  ${
                    active
                      ? "text-indigo-400"
                      : "text-slate-300 hover:text-white"
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}

        </nav>

        {/* Right Auth */}
        <div className="hidden md:flex items-center gap-4">

          {status === "loading" ? (
            <p className="text-slate-400 text-sm">
              Loading...
            </p>
          ) : session ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => signOut()}
              className="border-white/20 hover:bg-white/10"
            >
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Login
              </Button>
            </Link>
          )}

        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-slate-200"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (

        <div className="md:hidden border-t border-white/10 bg-black/95">

          <nav className="flex flex-col gap-4 p-5">

            {navItems.map((item) => {

              const active = pathname === item.path;

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className={`
                    text-sm font-medium
                    ${
                      active
                        ? "text-indigo-400"
                        : "text-slate-300"
                    }
                  `}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-white/10">

              {status === "loading" ? (
                <p className="text-slate-400 text-sm">
                  Loading...
                </p>
              ) : session ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                  className="w-full border-white/20"
                >
                  Logout
                </Button>
              ) : (
                <Link href="/login">
                  <Button
                    size="sm"
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
              )}

            </div>

          </nav>

        </div>
      )}

    </header>
  );
}
