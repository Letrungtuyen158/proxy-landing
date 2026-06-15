"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, FileText, Loader2, Printer } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "@/lib/i18n/translations";

interface BillItem {
  id: string;
  invoiceNo: string;
  userName: string;
  userEmail: string;
  planName: string;
  amountUsd: number;
  startDate: string;
  endDate: string;
  invoiceDate: string;
  paymentMethod: string;
  transactionId: string;
  status: "paid" | "unpaid";
}

function formatDate(date: string, locale: Locale) {
  return new Date(date).toLocaleDateString(locale === "zh" ? "zh-CN" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatMoney(amount: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function InvoiceCard({
  bill,
  locale,
  printTarget,
  onPrint,
  onDownload,
}: {
  bill: BillItem;
  locale: Locale;
  printTarget: boolean;
  onPrint: () => void;
  onDownload: () => void;
}) {
  const { t } = useLanguage();
  const b = t.bill;

  const period = b.period
    .replace("{plan}", bill.planName)
    .replace("{start}", formatDate(bill.startDate, locale))
    .replace("{end}", formatDate(bill.endDate, locale));

  const statusLabel = bill.status === "paid" ? b.statusPaid : b.statusUnpaid;

  return (
    <article
      data-bill={bill.id}
      className={`invoice-card border border-zinc-200 bg-white text-zinc-900 shadow-sm ${
        printTarget ? "invoice-print-target" : ""
      }`}
    >
      <div className="invoice-header flex items-start justify-between overflow-visible border-b border-zinc-200 px-8 pb-5 pt-8">
        <BrandLogo
          size="lg"
          href={null}
          variant="invoice"
          className="text-zinc-900 [&_span]:text-zinc-900 [&_span_span]:text-violet-600"
        />
        <p
          className={`text-sm font-bold uppercase tracking-wide ${
            bill.status === "paid" ? "text-emerald-600" : "text-amber-600"
          }`}
        >
          {statusLabel}
        </p>
      </div>

      <div className="grid gap-8 border-b border-zinc-200 px-8 py-6 sm:grid-cols-2">
        <div className="space-y-5 text-sm">
          <div>
            <p className="font-semibold text-zinc-900">{b.invoicedTo}</p>
            <p className="mt-1 text-zinc-700">{bill.userName}</p>
            <p className="text-zinc-700">{bill.userEmail}</p>
          </div>
          <div>
            <p className="font-semibold text-zinc-900">{b.invoiceDate}</p>
            <p className="mt-1 text-zinc-700">{formatDate(bill.invoiceDate, locale)}</p>
          </div>
        </div>
        <div className="space-y-5 text-sm sm:text-right">
          <div>
            <p className="font-semibold text-zinc-900">{b.payTo}</p>
            <p className="mt-1 text-zinc-700">{b.companyName}</p>
            <p className="text-zinc-700">{b.companyAddress}</p>
            <p className="text-zinc-700">{b.companyVat}</p>
          </div>
          <div>
            <p className="font-semibold text-zinc-900">{b.paymentMethod}</p>
            <p className="mt-1 text-zinc-700">{bill.paymentMethod}</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="overflow-hidden rounded-sm border border-zinc-200">
          <div className="bg-[#d9edf7] px-4 py-2.5 text-sm font-semibold text-zinc-800">{b.invoiceItems}</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-white">
                <th className="px-4 py-3 text-left font-semibold text-zinc-800">{b.description}</th>
                <th className="px-4 py-3 text-right font-semibold text-zinc-800">{b.amount}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-200">
                <td className="px-4 py-3 text-zinc-700">{period}</td>
                <td className="px-4 py-3 text-right text-zinc-700">{formatMoney(bill.amountUsd, locale)}</td>
              </tr>
            </tbody>
          </table>
          <div className="border-t border-zinc-200 bg-white px-4 py-3 text-sm">
            <div className="ml-auto w-full max-w-xs space-y-2">
              <div className="flex justify-between text-zinc-700">
                <span>{b.subTotal}</span>
                <span>{formatMoney(bill.amountUsd, locale)}</span>
              </div>
              <div className="flex justify-between text-zinc-700">
                <span>{b.credit}</span>
                <span>{formatMoney(0, locale)}</span>
              </div>
              <div className="flex justify-between border-t border-zinc-200 pt-2 font-semibold text-zinc-900">
                <span>{b.total}</span>
                <span>{formatMoney(bill.amountUsd, locale)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden border border-zinc-200">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-white">
                <th className="px-4 py-3 text-left font-semibold text-zinc-800">{b.transactionDate}</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-800">{b.gateway}</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-800">{b.transactionId}</th>
                <th className="px-4 py-3 text-right font-semibold text-zinc-800">{b.amount}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 text-zinc-700">{formatDate(bill.invoiceDate, locale)}</td>
                <td className="px-4 py-3 text-zinc-700">{bill.paymentMethod.split("(")[0].trim()}</td>
                <td className="max-w-[280px] truncate px-4 py-3 font-mono text-xs text-zinc-600">
                  {bill.transactionId}
                </td>
                <td className="px-4 py-3 text-right text-zinc-700">{formatMoney(bill.amountUsd, locale)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          {b.invoiceNo}: {bill.invoiceNo}
        </p>

        <div className="mt-4 flex justify-end gap-5 print:hidden">
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#337ab7] hover:underline"
          >
            <Printer className="h-4 w-4" />
            {b.print}
          </button>
          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#337ab7] hover:underline"
          >
            <Download className="h-4 w-4" />
            {b.download}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function BillsClient() {
  const { t, locale } = useLanguage();
  const b = t.bill;
  const [loading, setLoading] = useState(true);
  const [bills, setBills] = useState<BillItem[]>([]);
  const [printingId, setPrintingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadBills() {
      try {
        const res = await fetch("/api/bills");
        const data = await res.json();
        if (res.ok) {
          setBills(data.bills ?? []);
        }
      } finally {
        setLoading(false);
      }
    }

    loadBills();
  }, []);

  const printBill = (id: string) => {
    setPrintingId(id);
    setTimeout(() => {
      window.print();
      setPrintingId(null);
    }, 150);
  };

  const downloadBill = (id: string) => {
    printBill(id);
  };

  return (
    <div className="bill-page min-h-screen bg-[#f5f5f5] py-8 text-zinc-900">
      <div className="mx-auto max-w-4xl px-4">
        <div className="bill-toolbar mb-6 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {b.backDashboard}
          </Link>
          <LanguageSwitcher />
        </div>

        {loading ? (
          <div className="flex items-center justify-center border border-zinc-200 bg-white py-20">
            <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
          </div>
        ) : bills.length === 0 ? (
          <div className="border border-zinc-200 bg-white p-10 text-center">
            <FileText className="mx-auto h-10 w-10 text-zinc-400" />
            <p className="mt-3 text-zinc-600">{b.noBills}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {bills.map((bill) => (
              <InvoiceCard
                key={bill.id}
                bill={bill}
                locale={locale}
                printTarget={printingId === null || printingId === bill.id}
                onPrint={() => printBill(bill.id)}
                onDownload={() => downloadBill(bill.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
