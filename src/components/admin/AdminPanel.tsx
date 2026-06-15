"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Check,
  Edit3,
  FileText,
  LayoutDashboard,
  Loader2,
  LogOut,
  RefreshCw,
  Shield,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  planStatus?: string;
  planLabel?: string | null;
  createdAt: string;
}

interface AdminOrder {
  id: string;
  userEmail: string;
  userName: string;
  planLabel: string;
  amountUsdt: number;
  status: string;
  txHash?: string | null;
  createdAt: string;
}

interface AdminBill {
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
  status: "paid" | "unpaid";
}

export default function AdminPanel({ adminName }: { adminName: string }) {
  const { t } = useLanguage();
  const a = t.admin;
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [bills, setBills] = useState<AdminBill[]>([]);
  const [tab, setTab] = useState<"orders" | "users" | "bills">("orders");
  const [creatingBill, setCreatingBill] = useState(false);
  const [savingBillId, setSavingBillId] = useState<string | null>(null);
  const [monthFilter, setMonthFilter] = useState("");
  const [editingBill, setEditingBill] = useState<AdminBill | null>(null);
  const [billForm, setBillForm] = useState({
    userId: "",
    planName: "IP Proxy Plan",
    amountUsd: "30",
    days: "30",
    startDate: new Date().toISOString().slice(0, 10),
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [adminRes, billsRes] = await Promise.all([
        fetch("/api/admin"),
        fetch("/api/admin/bills"),
      ]);
      if (!adminRes.ok || !billsRes.ok) throw new Error("failed");
      const adminData = await adminRes.json();
      const billsData = await billsRes.json();
      setUsers(adminData.users);
      setOrders(adminData.orders);
      setBills(billsData.bills ?? []);
      setBillForm((prev) => ({
        ...prev,
        userId: prev.userId || adminData.users[0]?.id || "",
      }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateOrder = async (orderId: string, status: "paid" | "rejected") => {
    setUpdating(orderId);
    try {
      await fetch("/api/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });
      await loadData();
    } finally {
      setUpdating(null);
    }
  };

  const statusColor = (status: string) => {
    if (status === "paid" || status === "active") return "text-green-400 bg-green-500/10";
    if (status === "reviewing" || status === "pending") return "text-amber-400 bg-amber-500/10";
    if (status === "rejected") return "text-red-400 bg-red-500/10";
    return "text-zinc-400 bg-white/5";
  };

  const pendingOrders = orders.filter((o) => o.status === "reviewing" || o.status === "pending");

  const createBill = async (e: FormEvent) => {
    e.preventDefault();
    setCreatingBill(true);
    try {
      const res = await fetch("/api/admin/bills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: billForm.userId,
          planName: billForm.planName,
          amountUsd: Number(billForm.amountUsd),
          days: Number(billForm.days),
          startDate: billForm.startDate,
          paymentMethod: "Binance (USDT)",
        }),
      });
      if (!res.ok) throw new Error("create bill failed");
      await loadData();
    } finally {
      setCreatingBill(false);
    }
  };

  const filteredBills = bills.filter((bill) => {
    if (!monthFilter) return true;
    return bill.invoiceDate.slice(0, 7) === monthFilter;
  });

  const saveBillEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingBill) return;
    setSavingBillId(editingBill.id);
    try {
      await fetch("/api/admin/bills", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billId: editingBill.id,
          planName: editingBill.planName,
          amountUsd: editingBill.amountUsd,
          startDate: editingBill.startDate.slice(0, 10),
          endDate: editingBill.endDate.slice(0, 10),
          paymentMethod: editingBill.paymentMethod,
          status: editingBill.status,
        }),
      });
      setEditingBill(null);
      await loadData();
    } finally {
      setSavingBillId(null);
    }
  };

  const removeBill = async (id: string) => {
    setSavingBillId(id);
    try {
      await fetch(`/api/admin/bills?id=${id}`, { method: "DELETE" });
      await loadData();
    } finally {
      setSavingBillId(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold">{a.title}</div>
              <div className="text-xs text-zinc-500">{adminName}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={loadData}
              className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
              aria-label="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <Link href="/dashboard" className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white">
              <LayoutDashboard className="h-4 w-4" />
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: a.stats.users, value: users.length },
            { label: a.stats.orders, value: orders.length },
            { label: a.stats.pending, value: pendingOrders.length },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="mt-1 text-sm text-zinc-500">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setTab("orders")}
            className={`rounded-full px-5 py-2 text-sm font-medium ${
              tab === "orders" ? "bg-violet-600 text-white" : "bg-white/5 text-zinc-400"
            }`}
          >
            {a.tabs.orders}
          </button>
          <button
            onClick={() => setTab("users")}
            className={`rounded-full px-5 py-2 text-sm font-medium ${
              tab === "users" ? "bg-violet-600 text-white" : "bg-white/5 text-zinc-400"
            }`}
          >
            {a.tabs.users}
          </button>
          <button
            onClick={() => setTab("bills")}
            className={`rounded-full px-5 py-2 text-sm font-medium ${
              tab === "bills" ? "bg-violet-600 text-white" : "bg-white/5 text-zinc-400"
            }`}
          >
            Bills
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
          </div>
        ) : tab === "orders" ? (
          <div className="overflow-x-auto rounded-2xl border border-white/5">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-white/5 bg-white/[0.03] text-zinc-500">
                <tr>
                  <th className="px-4 py-3">{a.table.orderId}</th>
                  <th className="px-4 py-3">{a.table.user}</th>
                  <th className="px-4 py-3">{a.table.plan}</th>
                  <th className="px-4 py-3">{a.table.amount}</th>
                  <th className="px-4 py-3">{a.table.txHash}</th>
                  <th className="px-4 py-3">{a.table.status}</th>
                  <th className="px-4 py-3">{a.table.actions}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5">
                    <td className="px-4 py-3 font-mono">{order.id}</td>
                    <td className="px-4 py-3">
                      <div>{order.userName}</div>
                      <div className="text-xs text-zinc-500">{order.userEmail}</div>
                    </td>
                    <td className="px-4 py-3">{order.planLabel}</td>
                    <td className="px-4 py-3">{order.amountUsdt} USDT</td>
                    <td className="max-w-[140px] truncate px-4 py-3 font-mono text-xs text-zinc-400">
                      {order.txHash || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {(order.status === "reviewing" || order.status === "pending") && (
                        <div className="flex gap-2">
                          <button
                            disabled={updating === order.id}
                            onClick={() => updateOrder(order.id, "paid")}
                            className="flex items-center gap-1 rounded-lg bg-green-600/20 px-2.5 py-1.5 text-xs text-green-300 hover:bg-green-600/30"
                          >
                            {updating === order.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Check className="h-3 w-3" />
                            )}
                            {a.approve}
                          </button>
                          <button
                            disabled={updating === order.id}
                            onClick={() => updateOrder(order.id, "rejected")}
                            className="flex items-center gap-1 rounded-lg bg-red-600/20 px-2.5 py-1.5 text-xs text-red-300 hover:bg-red-600/30"
                          >
                            <X className="h-3 w-3" />
                            {a.reject}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : tab === "users" ? (
          <div className="overflow-x-auto rounded-2xl border border-white/5">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-white/5 bg-white/[0.03] text-zinc-500">
                <tr>
                  <th className="px-4 py-3">{a.table.user}</th>
                  <th className="px-4 py-3">{a.table.role}</th>
                  <th className="px-4 py-3">{a.table.plan}</th>
                  <th className="px-4 py-3">{a.table.status}</th>
                  <th className="px-4 py-3">{a.table.joined}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-white/5">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-zinc-500" />
                        <div>
                          <div>{user.name}</div>
                          <div className="text-xs text-zinc-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{user.role || "user"}</td>
                    <td className="px-4 py-3">{user.planLabel || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColor(user.planStatus || "none")}`}>
                        {user.planStatus || "none"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-6">
            <form
              onSubmit={createBill}
              className="grid gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-5 md:grid-cols-2"
            >
              <div className="md:col-span-2 flex items-center gap-2 text-sm font-semibold text-white">
                <FileText className="h-4 w-4 text-violet-400" />
                Create bill
              </div>
              <label className="text-sm">
                <div className="mb-1 text-zinc-500">User</div>
                <select
                  value={billForm.userId}
                  onChange={(e) => setBillForm((prev) => ({ ...prev, userId: e.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
                  required
                >
                  <option value="" disabled>
                    Select user
                  </option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                <div className="mb-1 text-zinc-500">Plan name</div>
                <input
                  value={billForm.planName}
                  onChange={(e) => setBillForm((prev) => ({ ...prev, planName: e.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
                  required
                />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-zinc-500">Amount (USD)</div>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={billForm.amountUsd}
                  onChange={(e) => setBillForm((prev) => ({ ...prev, amountUsd: e.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
                  required
                />
              </label>
              <label className="text-sm">
                <div className="mb-1 text-zinc-500">Days</div>
                <input
                  type="number"
                  min="1"
                  value={billForm.days}
                  onChange={(e) => setBillForm((prev) => ({ ...prev, days: e.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
                  required
                />
              </label>
              <label className="text-sm md:col-span-2">
                <div className="mb-1 text-zinc-500">Start date</div>
                <input
                  type="date"
                  value={billForm.startDate}
                  onChange={(e) => setBillForm((prev) => ({ ...prev, startDate: e.target.value }))}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white"
                  required
                />
              </label>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={creatingBill}
                  className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-60"
                >
                  {creatingBill ? "Creating..." : "Create bill"}
                </button>
              </div>
            </form>

            <div className="overflow-x-auto rounded-2xl border border-white/5">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="border-b border-white/5 bg-white/[0.03] text-zinc-500">
                  <tr>
                    <th className="px-4 py-3">Invoice No</th>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Plan</th>
                    <th className="px-4 py-3">Invoice date</th>
                    <th className="px-4 py-3">Period</th>
                    <th className="px-4 py-3">Method</th>
                    <th className="px-4 py-3">Tx ID</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBills.map((bill) => (
                    <tr key={bill.id} className="border-b border-white/5">
                      <td className="px-4 py-3 font-mono">{bill.invoiceNo}</td>
                      <td className="px-4 py-3">
                        <div>{bill.userName}</div>
                        <div className="text-xs text-zinc-500">{bill.userEmail}</div>
                      </td>
                      <td className="px-4 py-3">{bill.planName}</td>
                      <td className="px-4 py-3 text-xs text-zinc-400">
                        {new Date(bill.invoiceDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-xs text-zinc-400">
                        {new Date(bill.startDate).toLocaleDateString()} -{" "}
                        {new Date(bill.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">{bill.paymentMethod}</td>
                      <td className="max-w-[180px] truncate px-4 py-3 font-mono text-xs text-zinc-400">
                        {bill.transactionId}
                      </td>
                      <td className="px-4 py-3">${bill.amountUsd.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingBill(bill)}
                            className="rounded-md bg-white/10 p-1.5 text-zinc-300 hover:bg-white/15"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => removeBill(bill.id)}
                            disabled={savingBillId === bill.id}
                            className="rounded-md bg-red-600/20 p-1.5 text-red-300 hover:bg-red-600/30 disabled:opacity-60"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      {tab === "bills" && (
        <div className="fixed bottom-6 right-6">
          <label className="rounded-lg border border-white/10 bg-black/80 px-3 py-2 text-xs text-zinc-300">
            Filter month{" "}
            <input
              type="month"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="ml-2 rounded bg-black/80 px-1 py-0.5 text-zinc-200"
            />
          </label>
        </div>
      )}
      {editingBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <form onSubmit={saveBillEdit} className="w-full max-w-lg space-y-3 rounded-2xl border border-white/10 bg-zinc-900 p-5">
            <h3 className="text-lg font-semibold">Edit Bill {editingBill.invoiceNo}</h3>
            <input
              value={editingBill.planName}
              onChange={(e) => setEditingBill({ ...editingBill, planName: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
            />
            <input
              type="number"
              step="0.01"
              value={editingBill.amountUsd}
              onChange={(e) => setEditingBill({ ...editingBill, amountUsd: Number(e.target.value) })}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={editingBill.startDate.slice(0, 10)}
                onChange={(e) => setEditingBill({ ...editingBill, startDate: new Date(e.target.value).toISOString() })}
                className="rounded-lg border border-white/10 bg-black/30 px-3 py-2"
              />
              <input
                type="date"
                value={editingBill.endDate.slice(0, 10)}
                onChange={(e) => setEditingBill({ ...editingBill, endDate: new Date(e.target.value).toISOString() })}
                className="rounded-lg border border-white/10 bg-black/30 px-3 py-2"
              />
            </div>
            <input
              value={editingBill.paymentMethod}
              onChange={(e) => setEditingBill({ ...editingBill, paymentMethod: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setEditingBill(null)} className="rounded-lg bg-white/10 px-3 py-2 text-sm">
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingBillId === editingBill.id}
                className="rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold"
              >
                {savingBillId === editingBill.id ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
