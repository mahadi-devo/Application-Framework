const nodemailer = require('nodemailer');

const attendeeEmailConfirmation = (email, subject, textbody, htmlBody) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = transporter.sendMail(
    {
      from: `"Conference Management System" <${process.env.EMAIL_ADDRESS}>`, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: textbody, // plain text body
      html: htmlBody, // html body
    },
    (err, info) => {
      if (err) {
        console.log(err);
        return false;
      }
      //   console.log('Succesfully send the mail');
      return true;
    }
  );
};

module.exports = attendeeEmailConfirmation;
