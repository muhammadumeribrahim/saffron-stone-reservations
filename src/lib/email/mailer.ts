import { Resend } from "resend";

type SendEmailArgs = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendEmail(args: SendEmailArgs) {
  const apiKey = process.env.RESEND_API_KEY;

  // If not configured, do NOT crash the app in dev.
  if (!apiKey) {
    console.log("[email disabled]", { to: args.to, subject: args.subject });
    return;
  }

  const from = process.env.EMAIL_FROM;
  if (!from) throw new Error("Missing EMAIL_FROM in .env.local");

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to: args.to,
    subject: args.subject,
    html: args.html,
    text: args.text,
  });
}
