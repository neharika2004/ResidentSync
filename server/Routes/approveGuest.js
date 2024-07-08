const express = require('express');
const router = express.Router();
const VisitorInfo = require('../models/unAnnouncedSchema');
const  sendSMS  = require('../SMS_Service/sendSMS'); // Make sure to import sendSMS function
const UserModel = require('../models/userSchema'); // Assuming UserModel is defined in userSchema.js
const UnexpVisitorInfo = require('../models/unAnnouncedSchema');

// Function to get host's phone number (moved from index.js)
async function getHostPhoneNumber(hostName) {
    try {
        const host = await UserModel.findOne({ name: hostName });
        return host ? host.phone : null;
    } catch (error) {
        console.error('Error fetching host phone number:', error);
        return null;
    }
}
// Assuming getHostPhoneNumber function is defined as shown above

router.post('/approve-guest', async (req, res) => {
    try {
        const newVisitor = new VisitorInfo(req.body);
        await newVisitor.save();

       const { fullName, purpose, contactNumber, hostName } = req.body;

        // Get host's phone number using the locally defined function
        const hostPhoneNumber = await getHostPhoneNumber(hostName);
        if (!hostPhoneNumber) {
            throw new Error('Host phone number not found');
        }

        // Send SMS to host
        const message = `Visitor Approval Required: Name - ${fullName}, Purpose - ${purpose}, Contact - ${contactNumber}. Reply with 'APPROVE ${newVisitor._id}' to approve or 'DENY ${newVisitor._id}' to deny.`;
        await sendSMS(hostPhoneNumber, message);

        // Respond with success message
        res.status(201).json({ message: 'Visitor information saved successfully' });
    } catch (error) {
        console.error('Error saving visitor information or sending SMS:', error);
        res.status(500).json({ error: 'Failed to save visitor information or send SMS' });
    }
});

router.get('/approve-guest', async (req, res) => {
    try {
        const visitors = await UnexpVisitorInfo.find();
        res.json(visitors);
    } catch (error) {
        console.error('Error fetching visitors:', error);
        res.status(500).json({ error: 'Error fetching visitors' });
    }
});

module.exports = router;
