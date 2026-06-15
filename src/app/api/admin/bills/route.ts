import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createBill, deleteBill, getAllBills, updateBill } from "@/lib/bills-store";
import { getAllUsers } from "@/lib/users-store";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [users, bills] = await Promise.all([getAllUsers(), getAllBills()]);
  return NextResponse.json({ users, bills });
}

export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const userId = typeof body.userId === "string" ? body.userId : "";
    const planName = typeof body.planName === "string" ? body.planName.trim() : "";
    const paymentMethod =
      typeof body.paymentMethod === "string" ? body.paymentMethod.trim() : "Binance (USDT)";
    const days = Number(body.days);
    const amountUsd = Number(body.amountUsd);
    const startDate = typeof body.startDate === "string" ? body.startDate : undefined;

    if (!userId || !planName || Number.isNaN(days) || days <= 0 || Number.isNaN(amountUsd) || amountUsd <= 0) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const users = await getAllUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const bill = await createBill({
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      planName,
      amountUsd,
      days,
      startDate,
      paymentMethod,
    });

    return NextResponse.json({ bill }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create bill" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const billId = typeof body.billId === "string" ? body.billId : "";
    const planName = typeof body.planName === "string" ? body.planName.trim() : undefined;
    const paymentMethod = typeof body.paymentMethod === "string" ? body.paymentMethod.trim() : undefined;
    const amountUsd = body.amountUsd !== undefined ? Number(body.amountUsd) : undefined;
    const startDate = typeof body.startDate === "string" ? body.startDate : undefined;
    const endDate = typeof body.endDate === "string" ? body.endDate : undefined;
    const status = body.status === "paid" || body.status === "unpaid" ? body.status : undefined;

    if (!billId) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const bill = await updateBill(billId, {
      ...(planName ? { planName } : {}),
      ...(paymentMethod ? { paymentMethod } : {}),
      ...(amountUsd && amountUsd > 0 ? { amountUsd } : {}),
      ...(startDate ? { startDate: new Date(startDate).toISOString() } : {}),
      ...(endDate ? { endDate: new Date(endDate).toISOString() } : {}),
      ...(status ? { status } : {}),
    });
    if (!bill) {
      return NextResponse.json({ error: "Bill not found" }, { status: 404 });
    }
    return NextResponse.json({ bill });
  } catch {
    return NextResponse.json({ error: "Failed to update bill" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const id = request.nextUrl.searchParams.get("id") ?? "";
  if (!id) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const ok = await deleteBill(id);
  if (!ok) {
    return NextResponse.json({ error: "Bill not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
