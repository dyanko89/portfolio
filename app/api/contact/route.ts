import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextResponse } from "next/server";

const sesClient = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const FROM_EMAIL = "Danny Yanko <noreply@djy89.net>";
const TO_EMAIL = "danny@djy89.net";

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

    // Check if AWS credentials are configured
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.warn("AWS credentials not configured - submission logged only");
      return NextResponse.json({ success: true, logged: true });
    }

    // Build notification email body
    let notificationBody = `New contact form submission:\n\n`;
    notificationBody += `Name: ${name}\n`;
    notificationBody += `Email: ${email}\n`;
    if (company) notificationBody += `Company: ${company}\n`;
    if (budget) notificationBody += `Budget: ${budget}\n`;
    notificationBody += `\nMessage:\n${message}`;

    // Send notification email to site owner
    const notificationCommand = new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: {
        ToAddresses: [TO_EMAIL],
      },
      Message: {
        Subject: {
          Data: `New Contact: ${name}${company ? ` (${company})` : ""}`,
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: notificationBody,
            Charset: "UTF-8",
          },
        },
      },
      ReplyToAddresses: [email],
    });

    // Send auto-reply to form submitter
    const autoReplyCommand = new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: "Thanks for reaching out!",
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: `Hi ${name},

Thanks for getting in touch! I've received your message and will get back to you as soon as possible, typically within 24-48 hours.

For reference, here's what you sent:

---
${message}
---

In the meantime, feel free to check out my latest work at https://djy89.net/projects

Best regards,
Danny Yanko
`,
            Charset: "UTF-8",
          },
        },
      },
    });

    // Send both emails
    await Promise.all([
      sesClient.send(notificationCommand),
      sesClient.send(autoReplyCommand),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
