const passport = require('passport');

// passport has internal 'google' identifer which tells passport to use google strategy
// 'profle' and 'email' internal fields within google

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
}
