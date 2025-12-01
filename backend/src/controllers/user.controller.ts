import {
  createUserSchema,
  loginUserSchema,
} from '../validations/user.validation';
import { Request, Response } from 'express';
import { userLogin, userRegister } from '../services/user.service';
import ApiResponse from '../utils/apiResponse';
import asyncWrapper from '../utils/asyncWrapper';

export const registerUser = asyncWrapper(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    await createUserSchema.validateAsync({ name, email, password });

    const user = await userRegister({ name, email, password });

    return ApiResponse.created(res, { user }, 'User registered successfully');
  },
);

export const loginUser = asyncWrapper(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  await loginUserSchema.validateAsync({ email, password });

  const { accessToken, refreshToken, user } = await userLogin({
    email,
    password,
  });

  // Send cookies
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 mins
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 1d days
  });

  return ApiResponse.success(res, { user }, 'User logged in Successfully');
});
