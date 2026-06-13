"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Infinity,
  Layers,
  Shield,
  Zap,
} from "lucide-react";
import { PROXY_PLAN_TAB, proxyPlans } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedSection from "./AnimatedSection";

const featureIcons = [Globe, Zap, Layers, Shield, Infinity, Globe];

function parseAmount(amount: string): number {
  return parseFloat(amount.replace(/[^0-9.]/g, "")) || 0;
}

export default function Pricing() {
  const { t } = useLanguage();
  const router = useRouter();
  const { data: session } = useSession();
  const p = t.pricing;

  const getDurationLabel = (days: number) => {
    if (days === 1) return p.durationOne.replace("{n}", String(days));
    return p.durationMany.replace("{n}", String(days));
  };

  const getPerDay = (amount: string, days: number) => {
    const value = parseAmount(amount) / days;
    return p.perDay.replace("{price}", `$${value.toFixed(2)}`);
  };

  const handleBuy = (index: number) => {
    const checkoutUrl = `/checkout?tab=${PROXY_PLAN_TAB}&index=${index}`;
    if (!session?.user) {
      router.push(`/login?callbackUrl=${encodeURIComponent(checkoutUrl)}`);
      return;
    }
    router.push(checkoutUrl);
  };

  return (
    <section id="pricing" className="relative overflow-hidden bg-zinc-950 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 lg:px-8">
        <AnimatedSection className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
            {p.unlimited}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {p.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">{p.subtitle}</p>
        </AnimatedSection>

        <div className="mt-12 space-y-3">
          {proxyPlans.map((plan, i) => {
            const isPopular = plan.popular;

            return (
              <motion.div
                key={plan.days}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className={`group relative flex flex-col gap-4 rounded-2xl border p-5 transition-all sm:flex-row sm:items-center sm:justify-between sm:p-6 ${
                  isPopular
                    ? "border-violet-500/50 bg-gradient-to-r from-violet-950/80 to-indigo-950/60 shadow-xl shadow-violet-500/10"
                    : "border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]"
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                    {p.mostPopular}
                  </span>
                )}

                <div className="flex items-center gap-5">
                  <div
                    className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl ${
                      isPopular
                        ? "bg-violet-500/20 ring-1 ring-violet-400/30"
                        : "bg-white/5 ring-1 ring-white/10"
                    }`}
                  >
                    <span className="text-2xl font-bold leading-none text-white">{plan.days}</span>
                    <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                      {plan.days === 1 ? p.dayUnit : p.daysUnit}
                    </span>
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white">
                      {getDurationLabel(plan.days)}
                    </div>
                    <div className="mt-0.5 text-sm text-zinc-500">{getPerDay(plan.amount, plan.days)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 sm:gap-8">
                  <div className="text-left sm:text-right">
                    <div className="text-3xl font-bold tracking-tight text-white">{plan.price}</div>
                    <div className="text-xs text-zinc-500">{p.oneTime}</div>
                  </div>

                  <button
                    onClick={() => handleBuy(i)}
                    className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                      isPopular
                        ? "bg-white text-violet-950 hover:bg-violet-50"
                        : "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15"
                    }`}
                  >
                    {p.startTrial}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 rounded-2xl border border-white/8 bg-white/[0.02] p-6 lg:p-8"
        >
          <p className="text-center text-sm font-semibold text-zinc-300">{p.allPlansInclude}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {p.features.map((feature, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-4 py-3 ring-1 ring-white/5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-zinc-400">{feature}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
