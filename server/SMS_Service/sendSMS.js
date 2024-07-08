const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

async function sendSMS(phoneNumber, message) {
  try {
    await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: phoneNumber
    });
    console.log(`SMS sent successfully to ${phoneNumber}: ${message}`);
    return true; 
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
}

module.exports = sendSMS;
