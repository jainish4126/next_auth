import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.AUTH_JWT_SECRET || 'your-default-secret-change-in-production';

const getSecretKey = () => new TextEncoder().encode(JWT_SECRET);

export async function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

export async function verifyPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

export async function generateToken(userId) {
  const token = await new SignJWT({ userId, timestamp: Date.now() })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey());
  
  return token;
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getUserFromToken(token) {
  const decoded = await verifyToken(token);
  return decoded ? decoded.userId : null;
}
