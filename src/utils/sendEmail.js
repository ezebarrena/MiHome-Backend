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

const sendPasswordResetEmail = async (email) => {
    console.log('dentro del transport ', email)
    const resetCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    console.log(resetCode);
    

    await transporter.sendMail({
        from: process.env.USER, // sender address
        to: email, // list of receivers
        subject: "Password Recovery", // Subject line
        text: `Your password reset code is ${resetCode}`, // plain text body
      });
    return resetCode;
};



module.exports = sendPasswordResetEmail;