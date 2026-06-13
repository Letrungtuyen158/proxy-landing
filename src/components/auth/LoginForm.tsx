"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AuthLayout from "./AuthLayout";

export default function LoginForm() {
  const { t } = useLanguage();
  const a = t.auth.login;
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(a.errors.invalid);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError(a.errors.generic);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title={a.title} subtitle={a.subtitle}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-300">
            {a.email}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-zinc-300">
            {a.password}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {a.submitting}
            </>
          ) : (
            a.submit
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        {a.noAccount}{" "}
        <Link href="/register" className="font-medium text-violet-400 hover:text-violet-300">
          {a.register}
        </Link>
      </p>
    </AuthLayout>
  );
}
