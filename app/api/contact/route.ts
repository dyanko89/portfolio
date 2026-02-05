import { Resend } from "resend";
import { NextResponse } from "next/server";

const resendApiKey = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
  try {
    const { name, email, company, budget, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Always log submissions to Vercel logs as backup
    console.log("=== NEW CONTACT FORM SUBMISSION ===");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    if (company) console.log(`Company: ${company}`);
    if (budget) console.log(`Budget: ${budget}`);
    console.log(`Message: ${message}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log("===================================");

    if (!resendApiKey) {
      console.warn("Resend API key not configured - submission logged only");
      // Still return success so user gets confirmation
      return NextResponse.json({ success: true, logged: true });
    }

    const resend = new Resend(resendApiKey);

    // Build email body with optional fields
    let emailBody = `Name: ${name}\nEmail: ${email}\n`;
    if (company) {
      emailBody += `Company: ${company}\n`;
    }
    if (budget) {
      emailBody += `Budget: ${budget}\n`;
    }
    emailBody += `\nMessage:\n${message}`;

    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "danny@djy89.net",
      subject: `New Contact Form Submission from ${name}${company ? ` (${company})` : ""}`,
      text: emailBody,
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
