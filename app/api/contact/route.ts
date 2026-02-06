import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextResponse } from "next/server";

const sesClient = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const FROM_EMAIL = "Danny Yanko <danny@djy89.net>";
const TO_EMAIL = "danny@djy89.net";

// Starforge design tokens for email
const colors = {
  background: "#0a0f12",
  surface: "#111a1f",
  border: "#1e2a32",
  foreground: "#f0f4f8",
  muted: "#8b9caa",
  accent: "#ff5722",
};

// Notification email template (sent to site owner)
function buildNotificationEmail(data: {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
}): string {
  const { name, email, company, budget, message } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${colors.background}; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: ${colors.background};">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom: 32px; border-bottom: 1px solid ${colors.border};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 24px; font-weight: 700; color: ${colors.foreground}; letter-spacing: -0.5px;">DJY89</span>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: ${colors.accent};">New Contact</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 0;">
              <h1 style="margin: 0 0 24px 0; font-size: 28px; font-weight: 600; color: ${colors.foreground}; line-height: 1.3;">
                Message from ${name}
              </h1>

              <!-- Contact Details -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px; background-color: ${colors.surface}; border-left: 3px solid ${colors.accent};">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 8px;">
                          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: ${colors.muted};">From</span><br>
                          <span style="font-size: 15px; color: ${colors.foreground};">${name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: ${company || budget ? "8px" : "0"};">
                          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: ${colors.muted};">Email</span><br>
                          <a href="mailto:${email}" style="font-size: 15px; color: ${colors.accent}; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      ${company ? `
                      <tr>
                        <td style="padding-bottom: ${budget ? "8px" : "0"};">
                          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: ${colors.muted};">Company</span><br>
                          <span style="font-size: 15px; color: ${colors.foreground};">${company}</span>
                        </td>
                      </tr>
                      ` : ""}
                      ${budget ? `
                      <tr>
                        <td>
                          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: ${colors.muted};">Budget</span><br>
                          <span style="font-size: 15px; color: ${colors.foreground};">${budget}</span>
                        </td>
                      </tr>
                      ` : ""}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: ${colors.muted};">Message</span>
                    <p style="margin: 8px 0 0 0; font-size: 15px; line-height: 1.6; color: ${colors.foreground}; white-space: pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reply Button -->
          <tr>
            <td style="padding: 24px 0; border-top: 1px solid ${colors.border};">
              <a href="mailto:${email}" style="display: inline-block; padding: 14px 28px; background-color: ${colors.accent}; color: #ffffff; font-size: 14px; font-weight: 500; text-decoration: none; letter-spacing: 0.5px;">Reply to ${name}</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 24px; border-top: 1px solid ${colors.border};">
              <p style="margin: 0; font-size: 12px; color: ${colors.muted};">
                Sent from djy89.net contact form<br>
                ${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Auto-reply email template (sent to form submitter)
function buildAutoReplyEmail(data: { name: string; message: string }): string {
  const { name, message } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanks for reaching out</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${colors.background}; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: ${colors.background};">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom: 32px; border-bottom: 1px solid ${colors.border};">
              <span style="font-size: 24px; font-weight: 700; color: ${colors.foreground}; letter-spacing: -0.5px;">DJY89</span>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 0;">
              <h1 style="margin: 0 0 24px 0; font-size: 28px; font-weight: 600; color: ${colors.foreground}; line-height: 1.3;">
                Thanks for reaching out, ${name}.
              </h1>

              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.7; color: ${colors.muted};">
                I've received your message and will get back to you within 24-48 hours.
              </p>

              <!-- Original Message Reference -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
                <tr>
                  <td style="padding: 16px; background-color: ${colors.surface}; border-left: 3px solid ${colors.border};">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: ${colors.muted};">Your Message</span>
                    <p style="margin: 8px 0 0 0; font-size: 14px; line-height: 1.6; color: ${colors.muted}; white-space: pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 15px; line-height: 1.7; color: ${colors.muted};">
                In the meantime, feel free to explore my recent work.
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 24px 0; border-top: 1px solid ${colors.border};">
              <a href="https://djy89.net/projects" style="display: inline-block; padding: 14px 28px; background-color: ${colors.accent}; color: #ffffff; font-size: 14px; font-weight: 500; text-decoration: none; letter-spacing: 0.5px;">View Projects</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 24px; border-top: 1px solid ${colors.border};">
              <p style="margin: 0 0 16px 0; font-size: 15px; color: ${colors.foreground};">
                Best regards,<br>
                <strong>Danny Yanko</strong>
              </p>
              <p style="margin: 0; font-size: 12px; color: ${colors.muted};">
                Systems Architect & Automation Consultant<br>
                <a href="https://djy89.net" style="color: ${colors.accent}; text-decoration: none;">djy89.net</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

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

    // Build plain text fallbacks
    let notificationText = `New contact form submission:\n\n`;
    notificationText += `Name: ${name}\n`;
    notificationText += `Email: ${email}\n`;
    if (company) notificationText += `Company: ${company}\n`;
    if (budget) notificationText += `Budget: ${budget}\n`;
    notificationText += `\nMessage:\n${message}`;

    const autoReplyText = `Hi ${name},

Thanks for getting in touch! I've received your message and will get back to you within 24-48 hours.

For reference, here's what you sent:

---
${message}
---

In the meantime, feel free to check out my latest work at https://djy89.net/projects

Best regards,
Danny Yanko
Systems Architect & Automation Consultant
https://djy89.net
`;

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
          Html: {
            Data: buildNotificationEmail({ name, email, company, budget, message }),
            Charset: "UTF-8",
          },
          Text: {
            Data: notificationText,
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
          Data: "Thanks for reaching out",
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: buildAutoReplyEmail({ name, message }),
            Charset: "UTF-8",
          },
          Text: {
            Data: autoReplyText,
            Charset: "UTF-8",
          },
        },
      },
    });

    // Send notification email first
    try {
      await sesClient.send(notificationCommand);
      console.log("✓ Notification email sent to owner");
    } catch (notifError) {
      console.error("✗ Failed to send notification email:", notifError);
      throw notifError;
    }

    // Send auto-reply email
    try {
      await sesClient.send(autoReplyCommand);
      console.log("✓ Auto-reply email sent to:", email);
    } catch (replyError) {
      console.error("✗ Failed to send auto-reply to:", email, replyError);
      // Don't throw - notification was sent, auto-reply is secondary
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
