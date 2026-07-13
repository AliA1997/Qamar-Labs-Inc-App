import { MailService } from "@genezio/email-service";
import { NextResponse } from "next/server";

import { DEV_EMAIL } from "@/constants/contact";

/**
 * Contact form transport.
 *
 * This runs on the server for one reason: the mail token must never reach the browser.
 * Next.js inlines every NEXT_PUBLIC_* variable into the client bundle, so the previous
 * client-side send published the credential to every visitor. Read the un-prefixed var
 * here and nowhere else.
 */
const EMAIL_SERVICE_TOKEN = process.env.EMAIL_SERVICE_TOKEN;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  /** Honeypot. Real users cannot see this field, so a filled one means a bot. */
  website?: unknown;
};

// Deliberately conservative: enough to reject nonsense, not enough to reject real addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Mirrors the client's Yup schema. The client copy is a UX affordance; this one is the
 * control. `strict: false` in tsconfig means the compiler will not catch a missing field
 * for us, so every access is checked by hand.
 */
function validate(body: ContactPayload): { name: string; email: string; message: string } | string {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name) return "Name is required";
  if (name.length > 50) return "Name must be 50 characters or less";
  if (!email) return "Email is required";
  if (!EMAIL_PATTERN.test(email)) return "Invalid email address";
  if (message.length < 10) return "Message must be at least 10 characters";

  return { name, email, message };
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Malformed request" }, { status: 400 });
  }

  // Silently accept and discard bot submissions — telling a bot it was caught teaches it.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ success: true });
  }

  const validated = validate(body);
  if (typeof validated === "string") {
    return NextResponse.json({ success: false, error: validated }, { status: 400 });
  }

  if (!EMAIL_SERVICE_TOKEN) {
    // Misconfiguration, not user error. Say so in the log; stay vague in the response.
    console.error("EMAIL_SERVICE_TOKEN is not set — contact form cannot deliver mail.");
    return NextResponse.json(
      { success: false, error: "Contact form is unavailable" },
      { status: 503 },
    );
  }

  try {
    const response = await MailService.sendMail({
      emailServiceToken: EMAIL_SERVICE_TOKEN,
      from: validated.email,
      replyTo: validated.email,
      to: DEV_EMAIL,
      subject: `Qamar Labs enquiry from ${validated.name}`,
      text: `${validated.message}\n\n—\nFrom: ${validated.name} <${validated.email}>`,
    });

    if (!response?.success) {
      console.error("Mail provider rejected the send:", response?.errorMessage);
      return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 502 });
  }
}
