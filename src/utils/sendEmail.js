const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'ezebarrena@gmail.com',
    pass: 'tsse gidf rjtz grnp',
  },
});

const sendPasswordResetEmail = async (email) => {
    console.log('dentro del transport ', email)
    const resetCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    console.log(resetCode);
    

    await transporter.sendMail({
        from: 'ezebarrena@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Password Recovery", // Subject line
        text: `Your password reset code is ${resetCode}`, // plain text body
      });
    return resetCode;
};

module.exports = sendPasswordResetEmail;