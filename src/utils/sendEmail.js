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

const sendPasswordResetEmail = async (email) => {
    console.log('dentro del transport ', email)
    const resetCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    console.log(resetCode);
    

    await transporter.sendMail({
        from: "mihome.notification@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Password Recovery", // Subject line
        text: `Your password reset code is ${resetCode}`, // plain text body
      });
    return resetCode;
};



module.exports = sendPasswordResetEmail;