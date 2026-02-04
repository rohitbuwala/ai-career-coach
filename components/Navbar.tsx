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
    <>
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full z-50">

        <div className="px-4 py-3">

          <div
            className="
              mx-auto max-w-7xl
              flex h-16 items-center justify-between
              rounded-full
              border border-white/20
              bg-black/70
              backdrop-blur-xl
              px-6
              shadow-xl
            "
          >

            {/* Logo */}
            <Link
              href="/dashboard"
              className="
                text-xl font-bold tracking-wide
                bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500
                bg-clip-text text-transparent
              "
            >
              AI Career Coach
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-6">

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

              {/* Auth Button */}
              {status === "loading" ? (
                <p className="text-slate-400 text-sm">Loading...</p>
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

            </nav>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-slate-200"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>


        {/* Mobile Menu */}
        {open && (

          <div className="md:hidden px-4 mt-2">

            <div
              className="
                rounded-2xl
                border border-white/20
                bg-black/95
                backdrop-blur-xl
                shadow-xl
              "
            >

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

                {/* Mobile Auth */}
                <div className="pt-3 border-t border-white/10">

                  {status === "loading" ? (
                    <p className="text-slate-400 text-sm">Loading...</p>
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

          </div>
        )}

      </header>


      {/* Space for Navbar Height */}
      <div className="h-20" />
    </>
  );
}
