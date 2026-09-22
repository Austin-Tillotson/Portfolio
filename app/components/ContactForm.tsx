"use client";

import type { FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import Card from "./Card";

type FormErrors = {
  invalidEmail: boolean;
  missingFields: string[];
};

type SubmissionStatus = {
  message: string;
  type: "error" | "success" | null;
};

function createMissingFieldsMessage(fields: string[]) {
  if (fields.length === 0) {
    return "";
  }

  if (fields.length === 1) {
    return `Please fill out your ${fields[0]}.`;
  }

  const finalField = fields[fields.length - 1];
  const earlierFields = fields.slice(0, -1).join(", ");

  return `Please fill out your ${earlierFields} and ${finalField}.`;
}

export default function ContactForm() {
  const shouldReduceMotion = useReducedMotion();
  const [errors, setErrors] = useState<FormErrors>({
    invalidEmail: false,
    missingFields: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({
    message: "",
    type: null,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const message = formData.get("message")?.toString().trim() ?? "";
    const missingFields = [
      ...(name === "" ? ["name"] : []),
      ...(email === "" ? ["email address"] : []),
      ...(message === "" ? ["message for me"] : []),
    ];
    const invalidEmail =
      email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    setErrors({ invalidEmail, missingFields });

    if (missingFields.length > 0 || invalidEmail) {
      setSubmissionStatus({ message: "", type: null });
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus({ message: "", type: null });

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify({ email, message, name }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Your message could not be sent. Please try again shortly.");
      }

      form.reset();
      setSubmissionStatus({
        message: data.message ?? "Thanks — your message has been sent.",
        type: "success",
      });
    } catch (error) {
      setSubmissionStatus({
        message:
          error instanceof Error
            ? error.message
            : "Your message could not be sent. Please try again shortly.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const missingFieldsMessage = createMissingFieldsMessage(errors.missingFields);
  const nameHasError = errors.missingFields.includes("name");
  const emailHasError =
    errors.missingFields.includes("email address") || errors.invalidEmail;
  const messageHasError = errors.missingFields.includes("message for me");
  const errorMessages = [
    ...(missingFieldsMessage ? [missingFieldsMessage] : []),
    ...(errors.invalidEmail ? ["Please input a valid email address."] : []),
  ];
  const hasErrorMessages = errorMessages.length > 0;

  return (
    <motion.div
      className="contact-card-reveal"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
      transition={{
        duration: 1.2,
        delay: shouldReduceMotion ? 0 : 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-120px" }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
    >
      <Card className="contact-card">
        <form className="contact-form" noValidate onSubmit={handleSubmit}>
        <label className="contact-form__field">
          <span className="contact-form__label">Your Name</span>
          <input
            autoComplete="name"
            aria-invalid={nameHasError || undefined}
            className={`contact-form__input${nameHasError ? " contact-form__input--error" : ""}`}
            name="name"
            placeholder="John Smith"
            required
            type="text"
          />
        </label>
        <label className="contact-form__field">
          <span className="contact-form__label">Email Address</span>
          <input
            autoComplete="email"
            aria-invalid={emailHasError || undefined}
            className={`contact-form__input${emailHasError ? " contact-form__input--error" : ""}`}
            name="email"
            placeholder="John@email.com"
            required
            type="email"
          />
        </label>
        <label className="contact-form__field">
          <span className="contact-form__label">Message</span>
          <textarea
            aria-invalid={messageHasError || undefined}
            className={`contact-form__input contact-form__input--message${messageHasError ? " contact-form__input--error" : ""}`}
            name="message"
            placeholder="Give me details about the role, opportunity, team, request, etc."
            required
          />
        </label>
        {hasErrorMessages && (
          <div aria-live="polite" className="contact-form__errors">
            {errorMessages.map((errorMessage) => (
              <p className="contact-form__error" key={errorMessage}>
                {errorMessage}
              </p>
            ))}
          </div>
        )}
        {submissionStatus.type && (
          <p
            aria-live="polite"
            className={`contact-form__submission-status contact-form__submission-status--${submissionStatus.type}`}
          >
            {submissionStatus.message}
          </p>
        )}
        <button className="contact-form__submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Sending..." : "Contact Me"}
        </button>
        </form>
      </Card>
    </motion.div>
  );
}
