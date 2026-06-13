import { NextRequest, NextResponse } from "next/server";
import { getAllUsers } from "@/lib/users-store";
import { getAllOrders, updateOrderStatus, type OrderStatus } from "@/lib/orders-store";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [users, orders] = await Promise.all([getAllUsers(), getAllOrders()]);

  return NextResponse.json({
    users,
    orders: orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  });
}

export async function PATCH(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const orderId = typeof body.orderId === "string" ? body.orderId : "";
    const status = body.status as OrderStatus;
    const adminNote = typeof body.adminNote === "string" ? body.adminNote : undefined;

    if (!orderId || !["paid", "rejected", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const order = await updateOrderStatus(orderId, status, adminNote);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
