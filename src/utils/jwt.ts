import jwt from 'jsonwebtoken';

import { env } from '@/config/env';

interface JwtPayload {
  userId: string;
}

export function signToken(
  payload: JwtPayload,
) {
  return jwt.sign(
    payload,
    env.JWT_SECRET,
    {
      expiresIn:
        env.JWT_EXPIRES_IN,
    },
  );
}

export function verifyToken(
  token: string,
) {
  return jwt.verify(
    token,
    env.JWT_SECRET,
  );
}