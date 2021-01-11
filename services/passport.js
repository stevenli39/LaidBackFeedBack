const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// one argument means try to fetch something out of mongoose
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // id is the primary key in the mongoDB
  // can't always use the googleID, might use LinkedIN for example
  // user.id is the cookie
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // turning an id into a mongoose model instance
  // search collection, call done
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    // after permission granted, send them to route above
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id })
    if (existingUser) {
        return done(null, existingUser);
          // we already have a record with given profile ID
          // if user doesn't exist, returns true else null
    }
          // we don't have a user record with this ID, make a new record
          // call to .save, saves model instance to the database
      const user = await new User({ googleId: profile.id }).save()
      done(null, user); 
    }
  )
);
