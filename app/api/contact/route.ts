import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function getText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("The contact form email environment variables are not fully configured.");
    return Response.json(
      { error: "The contact form is temporarily unavailable. Please try again later." },
      { status: 500 },
    );
  }

  let body: ContactRequest;

  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = getText(body.name);
  const email = getText(body.email);
  const message = getText(body.message);

  if (!name || !email || !message || !emailPattern.test(email)) {
    return Response.json({ error: "Please provide valid contact details." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  if (error) {
    console.error("Resend could not send the contact form email.", error);
    return Response.json(
      { error: "Your message could not be sent. Please try again shortly." },
      { status: 502 },
    );
  }

  return Response.json({ message: "Thanks — your message has been sent." });
}
