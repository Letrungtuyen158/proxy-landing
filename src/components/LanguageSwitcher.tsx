"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { locales } from "@/lib/i18n/translations";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, ChevronDown, Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = locales.find((l) => l.code === locale)!;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4" />
        <span className="font-medium">{current.flag}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 opacity-50 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/50"
          >
            {locales.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-sm transition-colors hover:bg-white/5 ${
                  locale === lang.code ? "text-white" : "text-zinc-400"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-8 font-medium">{lang.flag}</span>
                  <span>{lang.label}</span>
                </span>
                {locale === lang.code && <Check className="h-4 w-4 text-violet-400" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
