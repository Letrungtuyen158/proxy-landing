"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Copy,
  Loader2,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import { pricingPlans, formatPlanLabel, type PricingTab } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const FAKE_VERIFY_MS = 120_000;

interface CheckoutClientProps {
  planTab: string;
  planIndex: string;
  userName: string;
  userEmail: string;
}

interface OrderData {
  id: string;
  planLabel: string;
  planPrice: string;
  planUnit: string;
  amountUsdt: number;
  amountUsd: number;
  status: string;
}

interface PaymentData {
  usdtAddress: string;
  network: string;
  currency: string;
}

function formatElapsed(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function CheckoutClient({
  planTab,
  planIndex,
  userEmail,
}: CheckoutClientProps) {
  const { t } = useLanguage();
  const c = t.checkout;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tab = planTab as PricingTab;
  const index = Number(planIndex);
  const plan = pricingPlans[tab]?.[index];

  useEffect(() => {
    if (!plan) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function init() {
      setError("");

      try {
        const createRes = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planTab: tab, planIndex: index }),
        });

        if (!createRes.ok) {
          throw new Error("create failed");
        }

        const { order: created } = await createRes.json();
        const detailRes = await fetch(`/api/orders/${created.id}`);
        if (!detailRes.ok) throw new Error("detail failed");

        const data = await detailRes.json();
        if (cancelled) return;

        setOrder(data.order);
        setPayment(data.payment);
        setQrDataUrl(data.qrDataUrl);
      } catch {
        if (cancelled) return;
        await initLocalCheckout();
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    async function initLocalCheckout() {
      const amountUsd =
        parseFloat(plan!.amount.replace(/[^0-9.]/g, "")) || 0;
      const id = crypto.randomUUID().slice(0, 8).toUpperCase();
      const address =
        process.env.NEXT_PUBLIC_BINANCE_USDT_ADDRESS ||
        "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLGO";
      const network = process.env.NEXT_PUBLIC_BINANCE_NETWORK || "TRC20";
      const QRCode = (await import("qrcode")).default;
      const qrPayload = `${address}?amount=${amountUsd.toFixed(2)}&memo=${id}`;
      const qrDataUrl = await QRCode.toDataURL(qrPayload, {
        width: 280,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
      });

      setOrder({
        id,
        planLabel: formatPlanLabel(plan!.days),
        planPrice: plan!.price,
        planUnit: "",
        amountUsdt: amountUsd,
        amountUsd,
        status: "pending",
      });
      setPayment({ usdtAddress: address, network, currency: "USDT" });
      setQrDataUrl(qrDataUrl);
    }

    init();

    return () => {
      cancelled = true;
    };
  }, [plan, tab, index]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const copyText = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order || submitting) return;

    setSubmitting(true);
    setError("");
    setElapsedSec(0);

    const startedAt = Date.now();
    timerRef.current = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    await new Promise((resolve) => setTimeout(resolve, FAKE_VERIFY_MS));

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setSubmitting(false);
    setElapsedSec(0);
    setError(c.errors.overload);
  };

  if (!plan) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4 text-center text-white">
        <div>
          <p className="text-zinc-400">{c.invalidPlan}</p>
          <Link href="/#pricing" className="mt-4 inline-block text-violet-400">
            {c.backPricing}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 lg:px-8">
          <Link href="/#pricing" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            {c.backPricing}
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{c.title}</h1>
            <p className="mt-2 text-zinc-400">{c.subtitle}</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
            </div>
          ) : order && payment ? (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="glass rounded-2xl border border-white/10 p-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <QrCode className="h-5 w-5 text-violet-400" />
                  {c.scanQr}
                </h2>
                <p className="mt-2 text-sm text-zinc-400">{c.scanDesc}</p>

                <div className="mx-auto mt-6 flex w-fit flex-col items-center rounded-2xl bg-white p-4">
                  {qrDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={qrDataUrl} alt="Binance USDT QR" width={240} height={240} />
                  ) : (
                    <div className="flex h-60 w-60 items-center justify-center bg-zinc-100 text-zinc-500">
                      QR
                    </div>
                  )}
                  <div className="mt-3 rounded-full bg-[#F0B90B] px-3 py-1 text-xs font-bold text-black">
                    Binance · {payment.network}
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="rounded-xl bg-white/5 p-3">
                    <div className="text-xs text-zinc-500">{c.address}</div>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <code className="break-all text-xs text-violet-300">{payment.usdtAddress}</code>
                      <button
                        type="button"
                        onClick={() => copyText(payment.usdtAddress, "address")}
                        className="shrink-0 rounded-lg bg-white/10 p-2 hover:bg-white/15"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    {copied === "address" && (
                      <span className="text-xs text-green-400">{c.copied}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/5 p-3">
                      <div className="text-xs text-zinc-500">{c.amount}</div>
                      <div className="mt-1 font-semibold">{order.amountUsdt} USDT</div>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3">
                      <div className="text-xs text-zinc-500">{c.orderId}</div>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <span className="font-semibold">{order.id}</span>
                        <button
                          type="button"
                          onClick={() => copyText(order.id, "order")}
                          className="rounded-lg bg-white/10 p-1.5 hover:bg-white/15"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass rounded-2xl border border-white/10 p-6">
                  <h2 className="text-lg font-semibold">{c.orderSummary}</h2>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-zinc-500">{c.plan}</dt>
                      <dd>{order.planLabel}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-zinc-500">{c.price}</dt>
                      <dd>
                        {order.planPrice}
                        {order.planUnit}
                      </dd>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-3 font-semibold">
                      <dt>{c.total}</dt>
                      <dd className="text-violet-400">{order.amountUsdt} USDT</dd>
                    </div>
                    <div className="flex justify-between text-xs text-zinc-500">
                      <dt>{c.account}</dt>
                      <dd>{userEmail}</dd>
                    </div>
                  </dl>
                </div>

                <div className="glass rounded-2xl border border-white/10 p-6">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <ShieldCheck className="h-5 w-5 text-violet-400" />
                    {c.confirmPayment}
                  </h2>
                  <p className="mt-2 text-sm text-zinc-400">{c.confirmDesc}</p>

                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    {submitting && (
                      <div className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-4 py-4 text-sm text-violet-200">
                        <div className="flex items-center gap-2 font-medium">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {c.submitting}
                        </div>
                        <p className="mt-2 text-xs text-violet-200/80">{c.submittingHint}</p>
                        <p className="mt-1 text-xs text-zinc-400">
                          {c.submittingElapsed.replace("{time}", formatElapsed(elapsedSec))}
                        </p>
                      </div>
                    )}

                    {error && (
                      <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {error}
                      </div>
                    )}

                    <input
                      type="text"
                      value={txHash}
                      onChange={(e) => setTxHash(e.target.value)}
                      placeholder={c.txPlaceholder}
                      required
                      minLength={6}
                      disabled={submitting}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-violet-500/50 disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {c.submitting}
                        </>
                      ) : (
                        c.submit
                      )}
                    </button>
                  </form>
                </div>

                <p className="text-xs leading-relaxed text-zinc-500">{c.note}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-20 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
