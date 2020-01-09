import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

export const sendMail = (email, subject, text) => {
  const transporter = nodemailer.createTransport(mg({
    auth: {
      api_key: process.env.MAIL_API_KEY,
      domain: process.env.MAIL_DOMAIN,
    }
  }));

  var mailOptions = {
    from: process.env.MAIL_FORM,
    to: email,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
};
