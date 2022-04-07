const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
const port = 3010;
const nodemailer = require("nodemailer");
require("dotenv").config();

app.post("/sendEmail", (req, res) => {
  console.log(req.body.content);
  // async..await is not allowed in global scope, must use a wrapper
  (async () => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.PASSWORD,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "awdasd654321@gmail.com", // sender address
      to: "tcmak217@outlook.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: req.body.content, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.send("Mail sent");
  })();
});

app.listen(port, () => {
  console.log(`server.js is listening on port ${port}`);
});
