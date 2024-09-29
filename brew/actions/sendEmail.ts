"use server";

import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import EmailForm from "@/email/email-form";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get('senderEmail');
  const message = formData.get('message');

  if (!validateString(senderEmail, 500)) {
    return {
      error: 'Invalid sender email',
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: 'Invalid message',
    };
  }

  try {
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'felipechicaiza47@gmail.com',
      subject: 'New message from The Brew Community!',
      replyTo: senderEmail as string,
      react: React.createElement(EmailForm, { message: message as string, senderEmail: senderEmail as string }),
    });

    return { data };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
};
