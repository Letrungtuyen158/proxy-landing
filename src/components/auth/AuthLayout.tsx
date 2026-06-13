"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import BrandLogo from "@/components/BrandLogo";

export default function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-purple-600/15 blur-[120px] animate-pulse-glow" />
        <div className="absolute -left-20 bottom-20 h-[300px] w-[300px] rounded-full bg-pink-500/10 blur-[100px] animate-float" />
        <div className="absolute -right-20 top-1/3 h-[250px] w-[250px] rounded-full bg-blue-500/10 blur-[100px] animate-float" />
      </div>

      <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6">
        <LanguageSwitcher />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 flex justify-center">
          <BrandLogo size="lg" />
        </div>

        <div className="glass rounded-2xl border border-white/10 p-8 shadow-2xl shadow-black/50">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
          </div>
          {children}
        </div>

        <p className="mt-6 text-center">
          <Link href="/" className="text-sm text-zinc-500 transition-colors hover:text-zinc-300">
            ← Back to home
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
