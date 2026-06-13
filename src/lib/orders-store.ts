import "server-only";

import { randomUUID } from "crypto";
import { readJsonFile, writeJsonFile } from "@/lib/file-store";
import type { PricingTab } from "@/lib/data";
import { updateUser } from "@/lib/users-store";

export type OrderStatus = "pending" | "reviewing" | "paid" | "rejected" | "cancelled";

export interface StoredOrder {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  planTab: PricingTab;
  planLabel: string;
  planPrice: string;
  planUnit: string;
  amountUsd: number;
  amountUsdt: number;
  status: OrderStatus;
  txHash?: string | null;
  adminNote?: string | null;
  createdAt: string;
  updatedAt: string;
}

const FILE = "orders.json";

async function readOrders(): Promise<StoredOrder[]> {
  const data = await readJsonFile<StoredOrder[]>(FILE, []);
  return Array.isArray(data) ? data : [];
}

async function writeOrders(orders: StoredOrder[]): Promise<void> {
  await writeJsonFile(FILE, orders);
}

export async function getAllOrders(): Promise<StoredOrder[]> {
  return readOrders();
}

export async function getOrdersByUserId(userId: string): Promise<StoredOrder[]> {
  const orders = await readOrders();
  return orders
    .filter((o) => o.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function findOrderById(id: string): Promise<StoredOrder | null> {
  const orders = await readOrders();
  return orders.find((o) => o.id === id) ?? null;
}

export async function createOrder(data: {
  userId: string;
  userEmail: string;
  userName: string;
  planTab: PricingTab;
  planLabel: string;
  planPrice: string;
  planUnit: string;
  amountUsd: number;
}): Promise<StoredOrder> {
  const orders = await readOrders();
  const now = new Date().toISOString();

  const order: StoredOrder = {
    id: randomUUID().slice(0, 8).toUpperCase(),
    userId: data.userId,
    userEmail: data.userEmail,
    userName: data.userName,
    planTab: data.planTab,
    planLabel: data.planLabel,
    planPrice: data.planPrice,
    planUnit: data.planUnit,
    amountUsd: data.amountUsd,
    amountUsdt: data.amountUsd,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  orders.push(order);
  await writeOrders(orders);

  await updateUser(data.userId, {
    planStatus: "pending",
    planLabel: data.planLabel,
    planTab: data.planTab,
    planAmount: `$${data.amountUsd}`,
  });

  return order;
}

export async function submitOrderPayment(
  orderId: string,
  userId: string,
  txHash: string
): Promise<StoredOrder | null> {
  const orders = await readOrders();
  const index = orders.findIndex((o) => o.id === orderId && o.userId === userId);
  if (index === -1) return null;

  orders[index] = {
    ...orders[index],
    txHash,
    status: "reviewing",
    updatedAt: new Date().toISOString(),
  };

  await writeOrders(orders);
  return orders[index];
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  adminNote?: string
): Promise<StoredOrder | null> {
  const orders = await readOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;

  const order = orders[index];
  orders[index] = {
    ...order,
    status,
    adminNote: adminNote ?? order.adminNote,
    updatedAt: new Date().toISOString(),
  };

  await writeOrders(orders);

  if (status === "paid") {
    await updateUser(order.userId, {
      planStatus: "active",
      planLabel: order.planLabel,
      planTab: order.planTab,
      planAmount: `$${order.amountUsd}`,
      planActivatedAt: new Date().toISOString(),
    });
  }

  if (status === "rejected") {
    await updateUser(order.userId, {
      planStatus: "none",
      planLabel: null,
      planTab: null,
      planAmount: null,
      planActivatedAt: null,
    });
  }

  return orders[index];
}
