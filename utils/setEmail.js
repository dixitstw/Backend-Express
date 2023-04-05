"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
 function sendEmail(mailOptions) {

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_HOST,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // generated
      pass: process.env.SMTP_PASS, // generated 
    },
  });

  // send mail with defined transport object
    transporter.sendMail({
    from: mailOptions.from, // sender address
    to: mailOptions.to, // list of receivers
    subject: mailOptions.subject, // Subject line
    text: mailOptions.text, // plain text body
    html: mailOptions.html, // html body
  });

  console.log("Email sent successfully");
// Email sent successfully

}

module.exports = sendEmail