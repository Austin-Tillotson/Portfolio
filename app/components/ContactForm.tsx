"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Card from "./Card";

type FormErrors = {
  invalidEmail: boolean;
  missingFields: string[];
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
  const [errors, setErrors] = useState<FormErrors>({
    invalidEmail: false,
    missingFields: [],
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
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

  return (
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
        <div aria-live="polite" className="contact-form__errors">
          <p
            className={`contact-form__error${errorMessages[0] ? " contact-form__error--visible" : ""}`}
          >
            {errorMessages[0]}
          </p>
          <p
            className={`contact-form__error${errorMessages[1] ? " contact-form__error--visible" : ""}`}
          >
            {errorMessages[1]}
          </p>
        </div>
        <button className="contact-form__submit" type="submit">
          Contact Me
        </button>
      </form>
    </Card>
  );
}
