"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1f1f27] px-6 text-white">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <div className="rounded-[2rem] border border-emerald-400/20 bg-white/[0.04] p-7">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">
            <Lock size={22} />
          </div>

          <h1 className="text-3xl font-bold">Admin Login</h1>

          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            Login to manage articles for pashamuhammad.me.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-emerald-400/20 bg-white/[0.04] px-5 py-4 outline-none focus:border-emerald-400"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-emerald-400/20 bg-white/[0.04] px-5 py-4 outline-none focus:border-emerald-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-black transition hover:scale-105 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}