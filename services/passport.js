const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    // after permission granted, send them to route above
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile:', profile);
    }
  )
);
