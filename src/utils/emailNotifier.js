const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  service:"gmail",
  secure: true,
  logger: true,
  debug: true,
  secureConnection: false,
  tls: {
    rejectUnauthorized: true,
  },
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const sendMessageEmail = async (contactEmail, userEmail, subject, text) => {
  try{  
  await transporter.sendMail({
      
      from: process.env.USER,
      to: contactEmail, 
      subject: `Nueva consulta de ${userEmail}:` + subject,
      text: text,
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendMessageEmail;