import "server-only";

import { randomUUID } from "crypto";
import { readJsonFile, writeJsonFile } from "@/lib/file-store";

export type BillStatus = "paid" | "unpaid";

export interface StoredBill {
  id: string;
  invoiceNo: string;
  userId: string;
  userEmail: string;
  userName: string;
  planName: string;
  amountUsd: number;
  startDate: string;
  endDate: string;
  invoiceDate: string;
  paymentMethod: string;
  transactionId: string;
  status: BillStatus;
  createdAt: string;
}

const FILE = "bills.json";

async function readBills(): Promise<StoredBill[]> {
  const data = await readJsonFile<StoredBill[]>(FILE, []);
  return Array.isArray(data) ? data : [];
}

async function writeBills(bills: StoredBill[]): Promise<void> {
  await writeJsonFile(FILE, bills);
}

function buildInvoiceNo(date: Date, seq: number): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const n = String(seq).padStart(4, "0");
  return `VP-${y}${m}${d}-${n}`;
}

export async function getAllBills(): Promise<StoredBill[]> {
  const bills = await readBills();
  return bills.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getBillsByUserId(userId: string): Promise<StoredBill[]> {
  const bills = await readBills();
  return bills
    .filter((bill) => bill.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createBill(data: {
  userId: string;
  userEmail: string;
  userName: string;
  planName: string;
  amountUsd: number;
  days: number;
  startDate?: string;
  paymentMethod?: string;
}): Promise<StoredBill> {
  const bills = await readBills();
  const now = new Date();
  const start = data.startDate ? new Date(data.startDate) : now;
  const end = new Date(start);
  end.setDate(end.getDate() + Math.max(1, data.days));

  const seq = bills.filter((b) => b.invoiceDate.slice(0, 10) === now.toISOString().slice(0, 10)).length + 1;
  const bill: StoredBill = {
    id: randomUUID().slice(0, 8).toUpperCase(),
    invoiceNo: buildInvoiceNo(now, seq),
    userId: data.userId,
    userEmail: data.userEmail,
    userName: data.userName,
    planName: data.planName,
    amountUsd: data.amountUsd,
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    invoiceDate: now.toISOString(),
    paymentMethod: data.paymentMethod ?? "Binance (USDT)",
    transactionId: `txn_${randomUUID().replace(/-/g, "").slice(0, 24)}`,
    status: "paid",
    createdAt: now.toISOString(),
  };

  bills.push(bill);
  await writeBills(bills);
  return bill;
}

export async function updateBill(
  id: string,
  patch: Partial<Pick<StoredBill, "planName" | "amountUsd" | "startDate" | "endDate" | "paymentMethod" | "status">>
): Promise<StoredBill | null> {
  const bills = await readBills();
  const index = bills.findIndex((b) => b.id === id);
  if (index === -1) return null;

  bills[index] = { ...bills[index], ...patch };
  await writeBills(bills);
  return bills[index];
}

export async function deleteBill(id: string): Promise<boolean> {
  const bills = await readBills();
  const filtered = bills.filter((b) => b.id !== id);
  if (filtered.length === bills.length) return false;
  await writeBills(filtered);
  return true;
}
