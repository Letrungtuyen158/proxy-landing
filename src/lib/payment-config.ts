import "server-only";

import { brand } from "@/lib/brand";

export function getPaymentConfig() {
  return {
    usdtAddress:
      process.env.BINANCE_USDT_ADDRESS ||
      "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLGO",
    network: process.env.BINANCE_NETWORK || "TRC20",
    currency: "USDT",
    note: process.env.BINANCE_PAY_NOTE || brand.paymentNote,
  };
}

export function parseUsdAmount(amount: string): number {
  const cleaned = amount.replace(/[^0-9.]/g, "");
  const value = parseFloat(cleaned);
  return Number.isFinite(value) ? value : 0;
}

export function buildPaymentQrPayload(address: string, amount: number, orderId: string): string {
  return `${address}?amount=${amount.toFixed(2)}&memo=${orderId}`;
}
