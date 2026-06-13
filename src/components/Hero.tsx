"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { heroStatValues, trustBadges } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-black pb-16 pt-12 lg:pb-24 lg:pt-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-pink-500/8 blur-[100px] animate-float" />
        <div
          className="absolute -right-32 top-1/4 h-[350px] w-[350px] rounded-full bg-blue-500/8 blur-[100px] animate-float"
          style={{ animationDelay: "2s" }}
        />

        <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 1440 800" fill="none">
          <motion.path
            d="M-100 400 Q360 200 720 400 T1540 400"
            stroke="url(#trail1)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M-100 500 Q360 300 720 500 T1540 500"
            stroke="url(#trail2)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
          />
          <defs>
            <linearGradient id="trail1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="trail2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-6"
        >
          {trustBadges.map((badge) => (
            <div key={badge.name} className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-400">{badge.name}</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-zinc-500">{badge.rating}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center"
        >
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t.hero.title}{" "}
            <span className="text-gradient">{t.hero.titleHighlight}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
            {t.hero.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="/#pricing"
            className="btn-primary rounded-full px-8 py-3.5 text-sm font-semibold text-white"
          >
            {t.hero.startFree}
          </a>
          <a
            href="/login"
            className="rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/5"
          >
            {t.hero.login}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-white/5 pt-10"
        >
          {heroStatValues.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              className="text-center"
            >
              <div className="text-xl font-bold text-white sm:text-2xl">{stat.value}</div>
              <div className="mt-0.5 text-xs text-zinc-500 uppercase tracking-wider">
                {t.hero.stats[stat.key]}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
