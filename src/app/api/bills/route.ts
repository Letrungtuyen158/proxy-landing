import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/admin-auth";
import { getBillsByUserId } from "@/lib/bills-store";

export async function GET() {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bills = await getBillsByUserId(session.id);
  return NextResponse.json({ bills });
}
