import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  // Honeypot — real users never fill this.
  company?: string;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  // Silently accept honeypot hits so bots think they succeeded.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  // Server-side validation (never trust the client).
  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "All fields are required." },
      { status: 400 },
    );
  }
  if (!emailRe.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 },
    );
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Message must be between 10 and 5000 characters." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  // Not configured yet — return a clear, non-crashing error.
  if (!apiKey || !to) {
    console.warn(
      "[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set — email not sent.",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "The contact form isn't configured yet. Please email me directly in the meantime.",
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Portfolio Contact <${from}>`,
        to: [to],
        reply_to: email,
        subject: `New message from ${name} (portfolio)`,
        html: `
          <div style="font-family: system-ui, sans-serif; line-height: 1.6;">
            <h2 style="margin:0 0 12px;">New portfolio message</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] Resend error:", res.status, detail);
      return NextResponse.json(
        { ok: false, error: "Could not send the message. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error. Please try again later." },
      { status: 500 },
    );
  }
}
