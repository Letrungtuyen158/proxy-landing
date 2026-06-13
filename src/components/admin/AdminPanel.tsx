"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Check,
  LayoutDashboard,
  Loader2,
  LogOut,
  RefreshCw,
  Shield,
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

export default function AdminPanel({ adminName }: { adminName: string }) {
  const { t } = useLanguage();
  const a = t.admin;
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [tab, setTab] = useState<"orders" | "users">("orders");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin");
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setUsers(data.users);
      setOrders(data.orders);
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
        ) : (
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
        )}
      </main>
    </div>
  );
}
