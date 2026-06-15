"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Activity,
  Globe,
  LayoutDashboard,
  LogOut,
  Server,
  Shield,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import BrandLogo from "@/components/BrandLogo";

interface DashboardClientProps {
  isAdmin?: boolean;
  user: {
    name: string;
    email: string;
    createdAt: string;
    image: string | null;
    planStatus: "none" | "pending" | "active";
    planLabel: string | null;
    planAmount: string | null;
  };
}

export default function DashboardClient({ user, isAdmin }: DashboardClientProps) {
  const { t } = useLanguage();
  const d = t.auth.dashboard;

  const hasActivePlan = user.planStatus === "active";
  const isPending = user.planStatus === "pending";

  const stats = [
    {
      label: d.stats.bandwidth,
      value: hasActivePlan ? "—" : d.statValues.bandwidth,
      icon: <Activity className="h-5 w-5" />,
      color: "from-violet-500 to-purple-600",
    },
    {
      label: d.stats.requests,
      value: hasActivePlan ? "—" : d.statValues.requests,
      icon: <Zap className="h-5 w-5" />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      label: d.stats.ips,
      value: hasActivePlan ? "—" : d.statValues.ips,
      icon: <Globe className="h-5 w-5" />,
      color: "from-pink-500 to-rose-600",
    },
    {
      label: d.stats.plan,
      value: hasActivePlan ? (user.planLabel ?? d.statValues.plan) : isPending ? "Pending" : d.statValues.plan,
      icon: <Server className="h-5 w-5" />,
      color: "from-amber-500 to-orange-600",
    },
  ];

  const memberDate = new Date(user.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
          <BrandLogo size="sm" />
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-violet-400 transition-colors hover:bg-white/5 hover:text-violet-300"
              >
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">{d.adminPanel}</span>
              </Link>
            )}
            <LanguageSwitcher />
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{d.logout}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-sm text-violet-400">
            <LayoutDashboard className="h-4 w-4" />
            {d.title}
          </div>
          <h1 className="mt-2 text-3xl font-bold text-white">
            {d.welcome}, {user.name.split(" ")[0]}!
          </h1>
          <p className="mt-2 text-zinc-400">{d.subtitle}</p>
        </motion.div>

        {hasActivePlan ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-5 sm:p-6"
          >
            <h2 className="text-base font-semibold text-green-200">{d.activePlanBanner}</h2>
            <p className="mt-2 text-sm text-green-100/80">
              {d.activePlanDesc.replace("{plan}", user.planLabel ?? "Proxy")}
            </p>
          </motion.div>
        ) : isPending ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 sm:p-6"
          >
            <h2 className="text-base font-semibold text-blue-200">{d.pendingPlanBanner}</h2>
            <p className="mt-2 text-sm text-blue-100/80">{d.pendingPlanDesc}</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 sm:p-6"
          >
            <h2 className="text-base font-semibold text-amber-200">{d.noPlanBanner}</h2>
            <p className="mt-2 text-sm text-amber-100/80">{d.noPlanDesc}</p>
            <Link
              href="/#pricing"
              className="mt-4 inline-flex rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
            >
              {d.buyStarter}
            </Link>
          </motion.div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/5 bg-white/[0.03] p-6"
            >
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white`}
              >
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/5 bg-white/[0.03] p-6"
          >
            <h2 className="text-lg font-semibold text-white">{d.quickActions}</h2>
            <div className="mt-4 flex flex-col gap-3">
              {!hasActivePlan && (
                <Link
                  href="/#pricing"
                  className="rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm font-medium text-violet-300 transition-colors hover:bg-violet-500/20"
                >
                  {d.actions.buyProxy}
                </Link>
              )}
              <Link
                href="#"
                className="rounded-xl border border-white/10 px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5"
              >
                {d.actions.docs}
              </Link>
              <Link
                href="/bill"
                className="rounded-xl border border-white/10 px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5"
              >
                My bills
              </Link>
              <Link
                href="/"
                className="rounded-xl border border-white/10 px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5"
              >
                {d.actions.support}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-2xl border border-white/5 bg-white/[0.03] p-6"
          >
            <h2 className="text-lg font-semibold text-white">{d.account}</h2>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="text-xs uppercase tracking-wider text-zinc-500">Email</dt>
                <dd className="mt-1 text-sm text-white">{user.email}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-zinc-500">
                  {d.memberSince}
                </dt>
                <dd className="mt-1 text-sm text-white">{memberDate}</dd>
              </div>
            </dl>
          </motion.div>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <ArrowLeft className="h-4 w-4" />
            {d.backHome}
          </Link>
        </div>
      </main>
    </div>
  );
}
