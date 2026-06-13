"use client";

import { motion } from "framer-motion";
import { Star, Award } from "lucide-react";
import { testimonialInitials } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedSection from "./AnimatedSection";

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {t.testimonials.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-500">{t.testimonials.subtitle}</p>
        </AnimatedSection>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.testimonials.items.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="card-hover flex h-full flex-col rounded-2xl border border-zinc-200 bg-zinc-50 p-6"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                    {testimonialInitials[i]}
                  </div>
                  <span className="text-sm font-semibold text-zinc-900">{item.author}</span>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-16" delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {t.testimonials.awards.map((award) => (
              <div
                key={award}
                className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700"
              >
                <Award className="h-4 w-4 text-violet-500" />
                {award}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
