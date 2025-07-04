import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',         // Replace with your Gmail
      pass: 'your-app-password',            // Use Gmail App Password (not regular password)
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'your-email@gmail.com', // Receive message here
      subject: `Contact from VetriTV Website`,
      text: message,
    });

    return NextResponse.json({ message: 'Email sent' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
