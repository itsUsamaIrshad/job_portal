// lib/authMiddleware.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '@/lib/auth';

export const authMiddleware = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded; // Attach user data to the request object
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};