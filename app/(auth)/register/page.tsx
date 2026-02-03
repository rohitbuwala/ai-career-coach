"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";

export default function RegisterPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      window.location.href = "/login";

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4">

      <div className="gradient-card max-w-md w-full">

        <div className="space-y-6 text-center">

          {/* Title */}
          <h1 className="text-3xl font-bold text-indigo-400">
        Join AI Career Coach today </h1>

          <p className="text-slate-400 text-xl">
              Create Account
          </p>

          {/* Form */}
          <div className="space-y-4">

            <Input
              placeholder="Full Name"
              className="bg-black/40 border-white/10"
              onChange={(e) => setName(e.target.value)}
            />

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
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 glow-btn"
            >
              {loading ? "Creating..." : "Register"}
            </Button>

          </div>

          {/* Login Link */}
          <p className="text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-400 hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}
