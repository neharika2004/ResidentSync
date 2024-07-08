const mongoose = require('mongoose');

// Define the schema
const UnexpVisitorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  purposeOther: {
    type: String
  },
  hostName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String
  },
  idProof: {
    type: String
  },
  idNumber: {
    type: String
  },
  approved: {
    type: Boolean,
    default: false
  },
  vehicleInfo: {
    licensePlate: {
      type: String
    },
    vehicleModel: {
      type: String
    }
  },
  arrivalTimestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // This will automatically add createdAt and updatedAt fields
});

// Create the model
const UnexpVisitorInfo = mongoose.model('UnexpVisitorInfo', UnexpVisitorSchema);

module.exports = UnexpVisitorInfo;
