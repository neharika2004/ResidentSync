const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        // Validate that the phone number starts with '+91' and is followed by 10 digits
        return /^\+91[0-9]{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number with country code +91!`
    }
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create the User model
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
