"use client";

import {
  Brain,
  Users,
  TrendingUp,
  Search,
  Globe,
  Megaphone,
} from "lucide-react";
import { useCaseIcons } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedSection from "./AnimatedSection";

const iconMap: Record<string, React.ReactNode> = {
  brain: <Brain className="h-6 w-6" />,
  users: <Users className="h-6 w-6" />,
  trending: <TrendingUp className="h-6 w-6" />,
  search: <Search className="h-6 w-6" />,
  globe: <Globe className="h-6 w-6" />,
  megaphone: <Megaphone className="h-6 w-6" />,
};

export default function UseCases() {
  const { t } = useLanguage();

  return (
    <section id="use-cases" className="bg-zinc-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {t.useCases.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-500">{t.useCases.subtitle}</p>
        </AnimatedSection>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.useCases.items.map((useCase, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="card-hover group h-full rounded-2xl border border-zinc-200 bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                  {iconMap[useCaseIcons[i]]}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900">{useCase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{useCase.description}</p>
                <a
                  href="#"
                  className="mt-4 inline-block text-sm font-medium text-violet-600 hover:text-violet-700"
                >
                  {t.useCases.learnMore}
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
