const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

// app.use wires up middleware 
// middleware: small functions that handles pre-processing requests before they are sent off to route handlers 

app.use(
  cookieSession({
    // maxAge is in miliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
); 

app.use(passport.initialize()); 
app.use(passport.session()); 


require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
