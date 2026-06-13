"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { navHrefs } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChat } from "@/contexts/ChatContext";
import LanguageSwitcher from "./LanguageSwitcher";
import BrandLogo from "./BrandLogo";

export default function Header() {
  const { t } = useLanguage();
  const { openChat } = useChat();
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLabels: Record<(typeof navHrefs)[number]["key"], string> = {
    proxies: t.header.nav.proxies,
    scraping: t.header.nav.scraping,
    pricing: t.header.nav.pricing,
    dataForAi: t.header.nav.dataForAi,
    resources: t.header.nav.resources,
  };

  const isLoggedIn = status === "authenticated" && session?.user;

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient py-2.5 text-center text-sm text-white">
        <span>
          {t.header.announcement}{" "}
          <a href="#features" className="underline underline-offset-2 font-medium hover:opacity-80">
            {t.header.tryNow}
          </a>
        </span>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
            : "bg-black"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <BrandLogo size="sm" />

          <nav className="hidden items-center gap-1 lg:flex">
            {navHrefs.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {navLabels[link.key]}
                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <button
              onClick={openChat}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {t.header.talkToExpert}
            </button>

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {t.header.dashboard}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  {t.header.logout}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  {t.header.login}
                </Link>
                <Link
                  href="/#pricing"
                  className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium text-white transition-all hover:border-white hover:bg-white/5"
                >
                  {t.header.startFree}
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              className="text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/5 bg-black/95 backdrop-blur-xl"
            >
              <nav className="flex flex-col gap-1 px-4 py-4">
                {navHrefs.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                  >
                    {navLabels[link.key]}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openChat();
                  }}
                  className="rounded-lg px-3 py-3 text-left text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                >
                  {t.header.talkToExpert}
                </button>

                {isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                    >
                      {t.header.dashboard}
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="rounded-lg px-3 py-3 text-left text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                    >
                      {t.header.logout}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                    >
                      {t.header.login}
                    </Link>
                    <Link
                      href="/#pricing"
                      onClick={() => setMobileOpen(false)}
                      className="mt-2 rounded-full btn-primary px-5 py-3 text-center text-sm font-medium text-white"
                    >
                      {t.header.startFree}
                    </Link>
                  </>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
