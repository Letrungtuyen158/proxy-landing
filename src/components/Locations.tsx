"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedSection from "./AnimatedSection";

export default function Locations() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-black py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.locations.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">{t.locations.subtitle}</p>
        </AnimatedSection>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.locations.countries.map((loc, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass group flex items-center justify-between rounded-2xl p-5 transition-colors hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{loc.name}</div>
                    <div className="text-sm text-zinc-500">{loc.ips} IPs</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-violet-400" />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-10 text-center" delay={0.3}>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300"
          >
            {t.locations.explore}
            <ArrowRight className="h-4 w-4" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
