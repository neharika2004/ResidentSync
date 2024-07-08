const express = require('express');
const connectDB = require('./dataBase/db.js'); 
const bodyParser = require('body-parser');
const cors = require("cors");
const qr = require('qrcode'); 
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const cronJob = require('./cronJobs/maintenanceFeeReminder');


require('dotenv').config(); 
const { authenticateUser } = require('./Middleware/authMiddleware.js');
const verifyToken = require('./Middleware/verifyToken.js');

const UserModel = require('./models/userSchema.js');
const VisitorModel = require('./models/visitorSchema');

const approveGuestRouter = require('./Routes/approveGuest');
const smsReplyRouter = require('./Routes/smsReply.js');
const paymentRouter=require('./Routes/maintenanceFees.js')
const login=require('./Routes/login.js')




const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

cronJob.setup();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Function to generate QR code image
async function generateQRCode(qrData) {
    return qr.toBuffer(qrData);
}

// Function to create PDF document with QR code image
async function createPDFWithQRCode(qrData, visitorName) {
    const doc = new PDFDocument();
    const qrCodeImage = await generateQRCode(qrData);

    doc.pipe(fs.createWriteStream(`./${visitorName}_invitation.pdf`));
    doc.image(qrCodeImage, { width: 200 });
    doc.end();
}

// Function to send PDF document via email
async function sendPDFByEmail(visitorEmail, visitorName) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: visitorEmail,
        subject: 'Your Visit Invitation',
        html: `
            <p>Hello ${visitorName},</p>
            <p>Please find attached your visit invitation PDF with QR code.</p>
            <p>Thank you!</p>
        `,
        attachments: [{
            filename: `${visitorName}_invitation.pdf`,
            path: `./${visitorName}_invitation.pdf`,
            contentType: 'application/pdf'
        }]
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Invitation email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Routes
app.use('/', login);

app.get('/protected-route', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

app.post('/', (req, res) => {
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => {
        console.error("Error creating user:", err);
        res.status(500).json({ error: 'Error creating user' });
    });
});

app.post('/invite', async (req, res) => {
    const { name, email, phone, purpose, arrivalTime } = req.body;

    // Check if all required fields are present
    if (!name || !email || !phone || !purpose || !arrivalTime) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Generate QR code
        const qrData = JSON.stringify({ name, email, phone, purpose, arrivalTime });
        const qrCode = await qr.toDataURL(qrData);

        // Save visitor details to the database
        const newVisitor = new VisitorModel({
            name,
            email,
            phone,
            purpose,
            arrivalTime,
            qrCode,
        });

        // Validate the newVisitor object before saving
        const validationError = newVisitor.validateSync();
        if (validationError) {
            return res.status(400).json({ error: validationError.message });
        }

        await newVisitor.save();

        // Create PDF with QR code and send via email
        await createPDFWithQRCode(qrData, name);
        await sendPDFByEmail(email, name);

        // Send response
        res.status(201).send({ message: 'Visitor invited successfully', qrCode });
    } catch (error) {
        console.error('Error inviting visitor:', error);
        res.status(500).json({ error: 'Error inviting visitor' });
    }
});

app.get('/invite', (req, res) => {
    res.status(405).send('Method Not Allowed');
});

// app.post('/send-approval-sms', async (req, res) => {
//     const { hostName, visitorName } = req.body;

//     if (!hostName || !visitorName) {
//         return res.status(400).json({ error: 'Missing required fields' });
//     }

//     try {
//         const hostPhoneNumber = await getHostPhoneNumber(hostName);
//         if (!hostPhoneNumber) {
//             return res.status(404).json({ error: 'Host not found' });
//         }

//         const message = `Visitor ${visitorName} is here to see you. Do you approve their entry?`;
//         await sendSms(hostPhoneNumber, message);

//         res.status(200).send({ message: 'SMS sent successfully' });
//     } catch (error) {
//         console.error('Error sending SMS:', error);
//         res.status(500).json({ error: 'Error sending SMS' });
//     }
// });

app.post('/verify-invitation', async (req, res) => {
    const { qrCodeContent } = req.body;

    console.log('Received QR Code Content:', qrCodeContent);

    try {
        const visitor = await VisitorModel.findOne({ qrCode: qrCodeContent });

        if (visitor) {
            console.log('Visitor found:', visitor);
            res.json({ success: true, message: 'Invitation verified, grant access.' });
        } else {
            console.log('No matching visitor found for QR code.');
            res.json({ success: false, message: 'Invalid or expired QR code.' });
        }
    } catch (error) {
        console.error('Error verifying QR code:', error);
        res.status(500).json({ error: 'Error verifying QR code' });
    }
});

app.get('/visitors', async (req, res) => {
    try {
        const visitors = await VisitorModel.find();
        res.json(visitors);
    } catch (error) {
        console.error('Error fetching visitors:', error);
        res.status(500).json({ error: 'Error fetching visitors' });
    }
});

app.get('/residents', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});


app.use('/', approveGuestRouter);
app.use('/', smsReplyRouter);
app.use('/', paymentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});