const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});


// two arguments mean trying to load something into mongoose 
mongoose.model('users', userSchema);
