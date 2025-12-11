import Otp from '@/models/Otp';
import connectDB from './mongodb';

export function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export async function createOTP(identifier, type = 'forgot_password') {
  await connectDB();
  
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

  await Otp.deleteMany({ identifier, type });

  await Otp.create({
    identifier,
    otp,
    type,
    expiresAt,
  });

  return otp;
}

export async function verifyOTP(identifier, otp, type = 'forgot_password') {
  await connectDB();

  const otpRecord = await Otp.findOne({
    identifier,
    type,
    isUsed: false,
  }).sort({ createdAt: -1 });

  if (!otpRecord) {
    return { valid: false, message: 'OTP not found or expired' };
  }

  if (new Date() > otpRecord.expiresAt) {
    return { valid: false, message: 'OTP has expired' };
  }

  if (otpRecord.attempts >= 5) {
    return { valid: false, message: 'Too many invalid attempts' };
  }

  if (otpRecord.otp !== otp) {
    otpRecord.attempts += 1;
    await otpRecord.save();
    return { valid: false, message: 'Invalid OTP' };
  }

  otpRecord.isUsed = true;
  await otpRecord.save();

  return { valid: true, message: 'OTP verified successfully' };
}

export async function cleanupExpiredOTPs() {
  await connectDB();
  const result = await Otp.deleteMany({
    expiresAt: { $lt: new Date() },
  });
  return result.deletedCount;
}
