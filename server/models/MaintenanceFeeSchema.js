const mongoose = require('mongoose');

const MaintenanceFeeSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  description: {
    type: String
  },
  isPaid: {
    type: Boolean,
    default: false // Default value is false, indicating payment has not been made
  },
  notified: {
    type: Boolean,
    default: false // Default value is false, indicating notification has not been sent
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the MaintenanceFee model
const MaintenanceFee = mongoose.model('MaintenanceFee', MaintenanceFeeSchema);

module.exports = MaintenanceFee;
