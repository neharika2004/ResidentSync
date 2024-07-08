const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
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
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: Date,
    required: true
  },
  qrCode: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create the Visitor model
const VisitorModel = mongoose.model('Visitor', visitorSchema);

module.exports = VisitorModel;
