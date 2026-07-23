import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json({ error: "Telegram not configured" }, { status: 500 });
    }

    const text = [
      `🏠 *Нове замовлення — Mebli Chortkiv*`,
      ``,
      `👤 *Ім'я:* ${name}`,
      `📞 *Телефон:* ${phone}`,
      email ? `📧 *Email:* ${email}` : null,
      message ? `💬 *Повідомлення:* ${message}` : null,
      ``,
      `📅 ${new Date().toLocaleString("uk-UA")}`,
    ]
      .filter(Boolean)
      .join("\n");

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: "Telegram API error", details: err }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
