const nodemailer = require('nodemailer');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_AUTH_EMAIL,
    pass: process.env.GMAIL_AUTH_PASSWORD,
  },
});

// **Blocking (Regular) Email Function**
const sendEmail = async (to, subject, htmlContent, cc = [], attachmentPath = null) => {
  const mailOptions = {
    from: `no-reply <${process.env.GMAIL_AUTH_EMAIL}>`,
    to: to,
    subject: subject,
    html: htmlContent,
    ...(cc.length > 0 && { cc: cc.join(', ') }),
    ...(attachmentPath && {
      attachments: [
        {
          filename: path.basename(attachmentPath),
          path: attachmentPath,
        },
      ],
    }),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// **Truly Non-Blocking Email Function**
const sendEmailAsync = (to, subject, htmlContent, cc = [], attachmentPath = null) => {
  const mailOptions = {
    from: `no-reply <${process.env.GMAIL_AUTH_EMAIL}>`,
    to: to,
    subject: subject,
    html: htmlContent,
    ...(cc.length > 0 && { cc: cc.join(', ') }),
    ...(attachmentPath && {
      attachments: [
        {
          filename: path.basename(attachmentPath),
          path: attachmentPath,
        },
      ],
    }),
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => console.log('Async email sent:', info.response))
    .catch((error) => console.error('Error sending async email:', error));
};

module.exports = { sendEmail, sendEmailAsync };
