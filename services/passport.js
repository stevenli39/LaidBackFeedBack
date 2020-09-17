const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// one argument means try to fetch something out of mongoose
const User = mongoose.model('users');

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    // after permission granted, send them to route above
  },
  (accessToken, refreshToken, profile, done) => {
    new User({ googleId: profile.id }).save();
    }
  )
);
