import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, generateToken } from '@/lib/auth';
import { validateEmail } from '@/lib/validators';

export async function POST(request) {
  try {
    const { mobile, email, password } = await request.json();

    if (!mobile || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { message: 'Invalid mobile number' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUserByMobile = await User.findOne({ mobile });
    if (existingUserByMobile) {
      return NextResponse.json(
        { message: 'Mobile number already registered' },
        { status: 400 }
      );
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create({
      mobile,
      email,
      passwordHash,
    });

    const token = await generateToken(user._id.toString());

    const response = NextResponse.json(
      {
        message: 'Account created successfully',
        user: { 
          id: user._id.toString(), 
          mobile: user.mobile, 
          email: user.email 
        },
      },
      { status: 201 }
    );

    response.cookies.set({
      name: 'civic_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
