import { Resend } from "resend";
import { NextResponse } from "next/server";

const resendApiKey = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
  try {
    if (!resendApiKey) {
      console.warn("Resend API key not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 }
      );
    }

    const resend = new Resend(resendApiKey);
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "dyanko89@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
