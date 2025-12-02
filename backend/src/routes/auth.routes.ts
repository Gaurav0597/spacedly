import express from 'express';
import passport from '../config/passport';
import User from '../models/user.model';
import { CustomRequest } from '../middlewares/auth.middleware';
import { generateAccessToken, generateRefreshToken } from '../helpers/auth';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_auth_failed`,
    session: false,
  }),
  async (req: CustomRequest, res) => {
    try {
      const user = req.user as User;
      if (!user) {
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=user_not_found`,
        );
      }

      const accessToken = generateAccessToken(user.id, user.email);
      const refreshToken = generateRefreshToken(user.id, user.email);

      user.refresh_token = refreshToken;
      await user.save();

      // Send cookie
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    } catch (error) {
      res.redirect(`${process.env.FRONTEND_URL}/login?error=internal_error`);
    }
  },
);

export default router;
