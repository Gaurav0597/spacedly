import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error('No email found from Google'), null);
        }

        let user = await User.findOne({ where: { google_id: profile.id } });

        if (!user) {
          user = await User.findOne({ where: { email } });

          if (user) {
            user.google_id = profile.id;
            user.auth_provider = 'google';
            user.name = profile.displayName || user.name;
            await user.save();
          } else {
            user = await User.create({
              name: profile.displayName || 'Google User',
              email,
              google_id: profile.id,
              auth_provider: 'google',
              password: null,
              is_two_factor_enabled: false,
            });
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error, null);
      }
    },
  ),
);

export default passport;
