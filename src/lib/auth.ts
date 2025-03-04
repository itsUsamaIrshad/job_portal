// // lib/auth.ts
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// // Generate a JWT token
// export const generateToken = (userId: number, role: string) => {
//   return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1d' });
// };

// // Verify a JWT token
// export const verifyToken = (token: string) => {
//   return jwt.verify(token, JWT_SECRET);
// };

// // Hash a password
// export const hashPassword = async (password: string) => {
//   return await bcrypt.hash(password, 10);
// };

// // Compare a password with its hash
// export const comparePassword = async (password: string, hash: string) => {
//   return await bcrypt.compare(password, hash);
// };


import bcrypt from 'bcrypt';

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare password
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};