require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

function sendEmail({ email }) {
  let mailOptions = {
    from: "patrickyoung18@googlemail.com",
    to: `${email}`,
    subject: "Contract update",
    text: "Contract agreed."
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("error occured");
    } else {
      console.log("email sent!");
    }
  });
}
module.exports = {
  sendEmail
};
