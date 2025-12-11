import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyOTP } from '@/lib/otp';

export async function POST(request) {
  try {
    const { mobile, otp } = await request.json();

    if (!mobile || !otp) {
      return NextResponse.json(
        { message: 'Mobile number and OTP are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ mobile });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid request' },
        { status: 400 }
      );
    }

    const result = await verifyOTP(user.email, otp, 'forgot_password');

    if (!result.valid) {
      return NextResponse.json(
        { message: result.message },
        { status: 400 }
      );
    }


    return NextResponse.json(
      { 
        message: 'OTP verified successfully',
        identifier: user.email 
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
