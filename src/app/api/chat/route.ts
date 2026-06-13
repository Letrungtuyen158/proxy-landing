import { NextRequest, NextResponse } from "next/server";
import { getAdminReply, type Locale } from "@/lib/i18n/translations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const locale: Locale = body.locale === "zh" ? "zh" : "en";

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Simulate admin response delay handled on client; return reply immediately
    const reply = getAdminReply(message, locale);

    return NextResponse.json({
      reply,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
