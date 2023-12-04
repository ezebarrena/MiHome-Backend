const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service:"gmail",
  secure: true,
  logger: true,
  debug: true,
  secureConnection: false,
  tls: {
    rejectUnauthorized: true,
  },
  auth: {
    user: "mihome.notification@gmail.com",
    pass: "raht fucb tohg pgkk",
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