import {
  comparePassword,
  hashPassword,
} from '@/utils/hash';

import { signToken } from '@/utils/jwt';

import { AuthRepository } from './auth.repository';

import {
  LoginDto,
  SignupDto,
} from './auth.types';
import { AppError } from '@/utils/app-error';

export class AuthService {
  private repository =
    new AuthRepository();

  async signup(
    payload: SignupDto,
  ) {
    const existingUser =
      await this.repository.findByEmail(
        payload.email,
      );

    if (existingUser) {
      throw new AppError(
        'Email already exists',
        409
      );
    }

    const hashedPassword =
      await hashPassword(
        payload.password,
      );

    const user =
      await this.repository.createUser(
        payload.email,
        hashedPassword,
      );

    const token = signToken({
      userId: user.id,
    });

    return {
      token,
    };
  }

  async login(
    payload: LoginDto,
  ) {
    const user =
      await this.repository.findByEmail(
        payload.email,
      );

    if (!user) {
      throw new AppError(
        'Invalid credentials',
        401
      );
    }

    const passwordMatches =
      await comparePassword(
        payload.password,
        user.password,
      );

    if (!passwordMatches) {
      throw new AppError(
        'Invalid credentials',
        401
      );
    }

    const token = signToken({
      userId: user.id,
    });

    return {
      token,
    };
  }
}