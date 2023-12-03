const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const sendMessageEmail = async (contactEmail, userEmail, subject, text) => {
    await transporter.sendMail({
      from: process.env.USER,
      to: contactEmail, 
      subject: `Nueva consulta de ${userEmail}:` + subject,
      text: text,
    })
}

module.exports = sendMessageEmail;