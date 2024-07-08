const express = require('express');
const router = express.Router();
const VisitorInfo = require('../models/unAnnouncedSchema');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

// Middleware to parse application/x-www-form-urlencoded bodies
router.use(bodyParser.urlencoded({ extended: false }));

// Handle POST requests to /sms-reply
router.post('/sms-reply', async (req, res) => {
    const twiml = new MessagingResponse();
    const { Body } = req.body;
    const [action, visitorId] = Body.split(' ');

    try {
        const visitor = await VisitorInfo.findById(visitorId);

        if (!visitor) {
            twiml.message('Visitor not found');
            res.writeHead(404, { 'Content-Type': 'text/xml' });
            return res.end(twiml.toString());
        }

        if (action.toUpperCase() === 'APPROVE') {
            visitor.approved = true;
            await visitor.save();
            twiml.message('Visitor approved successfully');
        } else if (action.toUpperCase() === 'DENY') {
            await VisitorInfo.deleteOne({ _id: visitorId });
            twiml.message('Visitor denied and removed successfully');
        } else {
            twiml.message('Invalid action. Please reply with APPROVE or DENY followed by the visitor ID.');
        }

        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    } catch (error) {
        console.error('Error processing SMS reply:', error);
        twiml.message('Server error');
        res.writeHead(500, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    }
});

module.exports = router;
