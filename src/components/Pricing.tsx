"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Infinity,
  Layers,
  Shield,
  Zap,
} from "lucide-react";
import {
  dailyPlans,
  getDailyPrice,
  getMonthlyPrice,
  monthlyPlans,
  type PricingTab,
} from "@/lib/data";
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
  const [activeTab, setActiveTab] = useState<PricingTab>("daily");

  const tabs: { id: PricingTab; label: string }[] = [
    { id: "daily", label: p.tabs.daily },
    { id: "monthly", label: p.tabs.monthly },
  ];

  const getDayDurationLabel = (days: number) => {
    if (days === 1) return p.durationOne.replace("{n}", String(days));
    return p.durationMany.replace("{n}", String(days));
  };

  const getMonthDurationLabel = (months: number) => {
    if (months === 1) return p.monthOne.replace("{n}", String(months));
    return p.monthMany.replace("{n}", String(months));
  };

  const getPerDay = (amount: string, days: number) => {
    const value = parseAmount(amount) / days;
    return p.perDay.replace("{price}", `$${value.toFixed(2)}`);
  };

  const getPerMonth = (amount: string, months: number) => {
    const value = parseAmount(amount) / months;
    return p.perMonth.replace("{price}", `$${value.toFixed(0)}`);
  };

  const handleBuy = (index: number) => {
    const checkoutUrl = `/checkout?tab=${activeTab}&index=${index}`;
    if (!session?.user) {
      router.push(`/login?callbackUrl=${encodeURIComponent(checkoutUrl)}`);
      return;
    }
    router.push(checkoutUrl);
  };

  const plans = activeTab === "daily" ? dailyPlans : monthlyPlans;

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

          <div className="mx-auto mt-8 inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="pricing-tab-pill"
                    className="absolute inset-0 rounded-full bg-violet-600"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="mt-10 space-y-3">
          <AnimatePresence mode="wait">
            {activeTab === "daily"
              ? dailyPlans.map((plan, i) => {
                  const pricing = getDailyPrice(plan.days, plan.discount ?? 0);
                  const isPopular = plan.popular;
                  const hasDiscount = (plan.discount ?? 0) > 0;
                  return (
                    <motion.div
                      key={`daily-${plan.days}`}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
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
                      {hasDiscount && (
                        <span className="absolute -top-3 right-6 rounded-full bg-green-500/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-green-300">
                          {p.savePercent.replace("{n}", String(plan.discount))}
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
                            {getDayDurationLabel(plan.days)}
                          </div>
                          <div className="mt-0.5 text-sm text-zinc-500">
                            {getPerDay(pricing.amountLabel, plan.days)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 sm:gap-8">
                        <div className="text-left sm:text-right">
                          {hasDiscount && (
                            <div className="text-sm text-zinc-500 line-through">
                              {pricing.originalLabel}
                            </div>
                          )}
                          <div className="text-3xl font-bold tracking-tight text-white">
                            {pricing.finalLabel}
                          </div>
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
                })
              : monthlyPlans.map((plan, i) => {
                  const pricing = getMonthlyPrice(plan.months, plan.discount);
                  const isPopular = plan.popular;
                  return (
                    <motion.div
                      key={`monthly-${plan.months}`}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
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
                      <span className="absolute -top-3 right-6 rounded-full bg-green-500/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-green-300">
                        {p.savePercent.replace("{n}", String(plan.discount))}
                      </span>
                      <div className="flex items-center gap-5">
                        <div
                          className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl ${
                            isPopular
                              ? "bg-violet-500/20 ring-1 ring-violet-400/30"
                              : "bg-white/5 ring-1 ring-white/10"
                          }`}
                        >
                          <span className="text-2xl font-bold leading-none text-white">{plan.months}</span>
                          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                            {plan.months === 1 ? p.monthUnit : p.monthsUnit}
                          </span>
                        </div>
                        <div>
                          <div className="text-base font-semibold text-white">
                            {getMonthDurationLabel(plan.months)}
                          </div>
                          <div className="mt-0.5 text-sm text-zinc-500">
                            {getPerMonth(pricing.amountLabel, plan.months)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 sm:gap-8">
                        <div className="text-left sm:text-right">
                          <div className="text-sm text-zinc-500 line-through">
                            {pricing.originalLabel}
                          </div>
                          <div className="text-3xl font-bold tracking-tight text-white">
                            {pricing.finalLabel}
                          </div>
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
          </AnimatePresence>
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
