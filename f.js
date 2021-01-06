var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e5ea6e96d6b346",
      pass: "1ce785b8cd6aff"
    }
  });

var mailOptions = {
  from: 'fikridotnet@gmail.com',
  to: 'fatihalfikri21@gmail.com',
  subject: 'I am Hello dark',
  text: 'I want to employ you'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});