const cron = require('node-cron');
const sendSMS = require('../SMS_Service/sendSMS');
const MaintenanceFee = require('../models/MaintenanceFeeSchema');
const User = require('../models/userSchema');

function setup() {
  cron.schedule('0 8 * * *', async () => {
    console.log('Running cron job to check upcoming due dates...');

    try {
      const dueDateThreshold = new Date();
      dueDateThreshold.setDate(dueDateThreshold.getDate() + 7);

      const upcomingFees = await MaintenanceFee.find({
        dueDate: { $lte: dueDateThreshold },
        notified: false
      }).populate('Username'); // Ensure Username is populated with User model

      for (const fee of upcomingFees) {
        if (!fee.Username) {
          console.error(`Skipping fee ${fee._id} due to missing Username`);
          continue;
        }

        // Assuming Username is the name of the user, fetch the corresponding User model
        const user = await User.findOne({ name: fee.Username });

        if (!user || !user.phone) {
          console.error(`Skipping fee ${fee._id} due to missing User or phone number`);
          continue;
        }

        await sendSMS(user.phone, `Maintenance Fee Reminder: Your fee of $${fee.amount} is due on ${fee.dueDate}.`);
        
        fee.notified = true;
        await fee.save();
      }

      console.log('Notification process completed.');
    } catch (error) {
      console.error('Error running cron job:', error);
    }
  }, {
    timezone: 'Asia/Kolkata'
  });
}

module.exports = { setup };
