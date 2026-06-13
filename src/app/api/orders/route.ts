import { NextRequest, NextResponse } from "next/server";
import { pricingPlans, type PricingTab } from "@/lib/data";
import { parseUsdAmount } from "@/lib/payment-config";
import { createOrder, getOrdersByUserId } from "@/lib/orders-store";
import { requireAuth } from "@/lib/admin-auth";
import { findUserById } from "@/lib/users-store";

export async function GET() {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await getOrdersByUserId(session.id);
  return NextResponse.json({ orders });
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const planTab = body.planTab as PricingTab;
    const planIndex = Number(body.planIndex);

    if (!pricingPlans[planTab] || Number.isNaN(planIndex)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const plan = pricingPlans[planTab][planIndex];
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const user = await findUserById(session.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const amountUsd = parseUsdAmount(plan.amount);
    if (amountUsd <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const order = await createOrder({
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      planTab,
      planLabel: plan.label,
      planPrice: plan.price,
      planUnit: plan.unit,
      amountUsd,
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
