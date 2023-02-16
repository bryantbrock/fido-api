import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { JWT_SECRET } = process.env;
  const auth = req.headers.authorization;
  const token = auth && auth.split(' ')[1];

  if (!token)
    return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    jwt.verify(token, JWT_SECRET!);
    next();
  } catch {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};
