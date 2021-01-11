const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');



mongoose.connect(keys.mongoURI);

const app = express();

// app.use wires up middleware 
// middleware: small functions that handles pre-processing requests before they are sent off to route handlers 
app.use(bodyParser.json());
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
require('./routes/billingRoutes')(app); 

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets 
  // like our main.js file, or main.css file! 
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path'); 
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'))
  }); 
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
