import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { createOTP } from '@/lib/otp';
import { sendOTPEmail } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const { mobile } = await request.json();

    if (!mobile) {
      return NextResponse.json(
        { message: 'Mobile number is required' },
        { status: 400 }
      );
    }


    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { message: 'Invalid mobile number format' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ mobile });

    if (!user) {
      return NextResponse.json(
        { message: 'If this mobile number is registered, you will receive an OTP via email' },
        { status: 200 }
      );
    }

    const otp = await createOTP(user.email, 'forgot_password');

    const emailResult = await sendOTPEmail(user.email, otp, 'password reset');

    if (!emailResult.success) {
      return NextResponse.json(
        { message: 'Failed to send OTP. Please try again later.' },
        { status: 500 }
      );
    }


    return NextResponse.json(
      { 
        message: 'OTP sent successfully to your registered email',
        maskedEmail: user.email.replace(/(.{2})(.*)(@.*)/, '$1***$3')
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
