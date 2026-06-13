import { NextRequest, NextResponse } from "next/server";
import { getPaymentConfig, buildPaymentQrPayload } from "@/lib/payment-config";
import { findOrderById, submitOrderPayment } from "@/lib/orders-store";
import { requireAuth } from "@/lib/admin-auth";
import QRCode from "qrcode";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const order = await findOrderById(id);

  if (!order || order.userId !== session.id) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const payment = getPaymentConfig();
  const qrPayload = buildPaymentQrPayload(payment.usdtAddress, order.amountUsdt, order.id);
  const qrDataUrl = await QRCode.toDataURL(qrPayload, {
    width: 280,
    margin: 2,
    color: { dark: "#000000", light: "#ffffff" },
  });

  return NextResponse.json({ order, payment, qrDataUrl, qrPayload });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const txHash = typeof body.txHash === "string" ? body.txHash.trim() : "";

  if (!txHash || txHash.length < 6) {
    return NextResponse.json({ error: "Invalid transaction ID" }, { status: 400 });
  }

  const order = await submitOrderPayment(id, session.id, txHash);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order });
}
