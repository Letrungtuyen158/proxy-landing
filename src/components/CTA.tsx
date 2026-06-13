"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedSection from "./AnimatedSection";

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-black py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-pink-600/10 animate-gradient" />
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">{t.cta.subtitle}</p>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 inline-block"
          >
            <a
              href="/#pricing"
              className="btn-primary inline-block rounded-full px-10 py-4 text-base font-semibold text-white glow-purple"
            >
              {t.cta.startNow}
            </a>
          </motion.div>

          <p className="mt-6 text-sm text-zinc-500">{t.cta.note}</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
