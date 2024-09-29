import { NextResponse } from 'next/server';
import { sendEmail } from '@/actions/sendEmail';
import React from 'react';

export async function POST(req: Request) {
  try {
    const { email, comment } = await req.json();

    // Create form data
    const formData = new FormData();
    formData.append('senderEmail', email);
    formData.append('message', comment);

    // Call the sendEmail action
    const result = await sendEmail(formData);

    if (result.error) {
      return NextResponse.json({ message: result.error }, { status: 400 });
    }

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
