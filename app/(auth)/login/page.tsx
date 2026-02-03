"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4">

      <div className="gradient-card max-w-md w-full">

        <div className="space-y-6 text-center">

          {/* Logo / Title */}
          <h1 className="text-3xl font-bold text-indigo-400">
            AI Career Coach
          </h1>

          <p className="text-slate-400 text-sm">
            Login to continue your journey
          </p>

          {/* Form */}
          <div className="space-y-4">

            <Input
              type="email"
              placeholder="Email"
              className="bg-black/40 border-white/10"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              className="bg-black/40 border-white/10"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 glow-btn"
            >
              {loading ? "Signing in..." : "Login"}
            </Button>

          </div>

          {/* Register Link */}
          <p className="text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-indigo-400 hover:underline"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}
