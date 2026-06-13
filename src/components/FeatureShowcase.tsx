"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Home, Brain, ShoppingCart, MessageSquare, Database, Wrench } from "lucide-react";
import { featureIcons } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Translations } from "@/lib/i18n/translations";
import AnimatedSection from "./AnimatedSection";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code2 className="h-5 w-5" />,
  home: <Home className="h-5 w-5" />,
  brain: <Brain className="h-5 w-5" />,
  gift: <ShoppingCart className="h-5 w-5" />,
  "shopping-cart": <ShoppingCart className="h-5 w-5" />,
};

export default function FeatureShowcase() {
  const { t } = useLanguage();
  const [active, setActive] = useState(2);
  const d = t.features.diagram;

  return (
    <section id="features" className="bg-black py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <AnimatedSection>
            <div className="flex flex-col gap-3">
              {t.features.items.map((feature, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`group w-full rounded-2xl p-5 text-left transition-all duration-300 ${
                    active === i ? "glass glow-purple bg-white/5" : "hover:bg-white/3"
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        active === i
                          ? "bg-violet-600 text-white"
                          : "bg-white/5 text-zinc-400 group-hover:text-white"
                      }`}
                    >
                      {iconMap[featureIcons[i]]}
                    </div>
                    <div>
                      <h3
                        className={`font-semibold transition-colors ${
                          active === i ? "text-white" : "text-zinc-300"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
                        {feature.description}
                      </p>
                      {active === i && (
                        <motion.a
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          href="/#pricing"
                          className="mt-3 inline-block text-sm font-medium text-violet-400 hover:text-violet-300"
                        >
                          {t.features.startFree}
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative flex h-full min-h-[420px] items-center justify-center rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-8">
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/5 to-pink-600/5" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full max-w-md"
                >
                  {active === 2 ? (
                    <AIDiagram d={d} />
                  ) : active === 0 ? (
                    <ScrapingDiagram d={d} />
                  ) : active === 1 ? (
                    <ProxyDiagram d={d} />
                  ) : (
                    <StarterPlanDiagram d={d} ctaLabel={t.hero.startFree} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

type DiagramT = Translations["features"]["diagram"];

function AIDiagram({ d }: { d: DiagramT }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="glass rounded-xl px-4 py-3 text-sm text-zinc-300">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-violet-400" />
          {d.chatTrigger}
        </div>
      </div>
      <div className="h-8 w-px border-l border-dashed border-violet-500/40" />
      <div className="glow-purple w-full rounded-2xl border border-violet-500/30 bg-violet-950/40 p-6">
        <div className="mb-4 text-center text-sm font-semibold text-violet-300">{d.aiModel}</div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <MessageSquare className="h-4 w-4" />, label: d.chatModel },
            { icon: <Database className="h-4 w-4" />, label: d.memory },
            { icon: <Wrench className="h-4 w-4" />, label: d.tool },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 rounded-xl bg-white/5 p-3 text-center"
            >
              <div className="text-violet-400">{item.icon}</div>
              <span className="text-xs text-zinc-400">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-8 w-px border-l border-dashed border-violet-500/40" />
      <div className="flex gap-4">
        {["n8n", "LangChain", "MCP"].map((tool) => (
          <div key={tool} className="glass rounded-lg px-4 py-2 text-xs font-medium text-zinc-300">
            {tool}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScrapingDiagram({ d }: { d: DiagramT }) {
  return (
    <div className="space-y-4 font-mono text-sm">
      <div className="glass rounded-xl p-4">
        <div className="mb-2 text-xs text-violet-400">{d.postScrape}</div>
        <div className="text-zinc-400">
          {"{"} <span className="text-green-400">&quot;url&quot;</span>:{" "}
          <span className="text-yellow-300">&quot;target.com&quot;</span>,{" "}
          <span className="text-green-400">&quot;parse&quot;</span>:{" "}
          <span className="text-blue-300">true</span> {"}"}
        </div>
      </div>
      <div className="flex justify-center">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-violet-400"
        >
          ↓
        </motion.div>
      </div>
      <div className="glass glow-purple rounded-xl p-4">
        <div className="mb-2 text-xs text-green-400">{d.okResponse}</div>
        <div className="text-zinc-400">
          {"{"} <span className="text-green-400">&quot;title&quot;</span>:{" "}
          <span className="text-yellow-300">&quot;Product Name&quot;</span>,{" "}
          <span className="text-green-400">&quot;price&quot;</span>:{" "}
          <span className="text-blue-300">53.74</span> {"}"}
        </div>
      </div>
    </div>
  );
}

function ProxyDiagram({ d }: { d: DiagramT }) {
  const countries = ["🇺🇸 US", "🇬🇧 UK", "🇩🇪 DE", "🇯🇵 JP", "🇧🇷 BR"];
  return (
    <div className="space-y-4">
      <div className="text-center text-sm text-zinc-400">{d.residentialIps}</div>
      <div className="grid grid-cols-3 gap-3">
        {countries.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-3 text-center text-sm text-zinc-300"
          >
            {c}
          </motion.div>
        ))}
      </div>
      <div className="glass glow-purple rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-white">$2/GB</div>
        <div className="mt-1 text-xs text-zinc-500">{d.noHiddenFees}</div>
      </div>
    </div>
  );
}

function StarterPlanDiagram({
  d,
  ctaLabel,
}: {
  d: DiagramT;
  ctaLabel: string;
}) {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 glow-purple">
        <ShoppingCart className="h-10 w-10 text-white" />
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-white">{d.freeTrial}</div>
        <div className="mt-2 text-sm text-zinc-400">{d.freeTrialDesc}</div>
      </div>
      <a href="/#pricing" className="btn-primary rounded-full px-6 py-2.5 text-sm font-medium text-white">
        {ctaLabel}
      </a>
    </div>
  );
}
