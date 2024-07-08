const express = require('express');
const router = express.Router();
const MaintenanceFee = require('../models/MaintenanceFeeSchema'); // Adjust path as per your project structure
const verifyToken = require('../Middleware/verifyToken');

router.post('/maintenance-fees', async (req, res) => {
  try {
    const { Username, amount, dueDate, description } = req.body; // Ensure Username is capitalized as per schema

    const newMaintenanceFee = new MaintenanceFee({
      Username: Username, // Capitalized as per schema
      amount: amount,
      dueDate: dueDate,
      description: description
    });

    const savedFee = await newMaintenanceFee.save();
    res.status(201).json(savedFee);
  } catch (err) {
    console.error('Error saving maintenance fee:', err);
    res.status(500).json({ error: 'Failed to save maintenance fee' });
  }
});

router.get('/maintenance-fees', async (req, res) => {
  try {
    const fees = await MaintenanceFee.find(); // Retrieve all maintenance fees from database
    res.status(200).json(fees);
  } catch (err) {
    console.error('Error fetching maintenance fees:', err);
    res.status(500).json({ error: 'Failed to fetch maintenance fees' });
  }
});

router.post('/update-payment-status/:id', async (req, res) => {
  const { id } = req.params;
  const { isPaid } = req.body;

  try {
    const fee = await MaintenanceFee.findByIdAndUpdate(id, { isPaid }, { new: true });
    if (fee) {
      res.status(200).json({ message: 'Payment status updated successfully.', fee });
    } else {
      res.status(404).json({ message: 'Fee not found.' });
    }
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


module.exports = router;
