const mongoose = require('mongoose');
const { Schema } = mongoose;

// body object, can add additional properties
const userSchema = new Schema({
  googleId: String
});

// two arguments mean trying to load something into mongoose
// make new collection called users
mongoose.model('users', userSchema);
