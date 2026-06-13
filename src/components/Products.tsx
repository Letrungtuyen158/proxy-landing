"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { productColors } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedSection from "./AnimatedSection";

export default function Products() {
  const { t } = useLanguage();

  return (
    <section id="products" className="bg-zinc-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {t.products.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-500">{t.products.subtitle}</p>
        </AnimatedSection>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.products.items.map((product, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="card-hover group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${productColors[i]}`}
                />
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-zinc-900">{product.name}</h3>
                  <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                    {product.price}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">{product.description}</p>
                <a
                  href="#pricing"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 transition-colors group-hover:gap-2.5"
                >
                  {t.products.startTrial}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
