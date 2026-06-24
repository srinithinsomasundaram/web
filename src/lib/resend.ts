type SendEmailArgs = {
  from: string;
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: string;
  }>;
};

const RESEND_API_URL = "https://api.resend.com/emails";
let didLogResendKeyStatus = false;

function logResendKeyStatus() {
  if (didLogResendKeyStatus) return;
  didLogResendKeyStatus = true;

  const apiKey = process.env.RESEND_API_KEY;
  console.info(
    `[Yesp Studio] RESEND_API_KEY ${apiKey ? "is present" : "is missing"} in the server runtime.`,
  );
}

export async function sendResendEmail({
  from,
  to,
  subject,
  text,
  html,
  replyTo,
  attachments,
}: SendEmailArgs) {
  logResendKeyStatus();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      html,
      reply_to: replyTo,
      attachments,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Resend request failed (${response.status}): ${message}`);
  }

  return response.json();
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
