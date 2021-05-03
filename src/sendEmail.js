const nodemailer = require('nodemailer');
const getEmailTemplate = require('./utils/getEmailTemplate');

module.exports = async function sendEmail(coins, coinsAmount, newCoinsAmount) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  const info = await transporter.sendMail({
    from: '"Autofarm bot" <crypto.russ.hanneman@gmail.com>',
    to: 'mariusz0689@gmail.com',
    subject: `🚗  New  ${newCoinsAmount} ${newCoinsAmount > 1 ? 'coins' : 'coin'} on Autofarm 🚗`,
    html: getEmailTemplate(coins, coinsAmount)
  });

  return info;
};
