const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const cors = require("cors");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const port = 3009;

const uploadToS3 = (fileName) => {
  const fileContent = fs.readFileSync(fileName);
  const s3 = new AWS.S3({
    accessKeyId: process.env.S3_BUCKET_ID,
    secretAccessKey: process.env.SECRET_KEY,
  });

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: uuidv4() + ".pdf", // File name you want to save as in S3
    Body: fileContent,
  };

  const run = async () => {
    try {
      const s3Res = await s3.upload(params).promise();
      return s3Res.Location;
    } catch (err) {
      console.error(err);
    }
  };

  return new Promise((resolve, reject) => {
    try {
      const url = run();
      resolve(url);
    } catch {
      reject("Rejected");
    }
  });

  // s3.upload(params, function (err, data) {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(`File uploaded successfully. ${data.Location}`);
  //   redirectUrl = data.Location;
  // });
};

app.post("/sendImage", (req, res) => {
  // Create a document
  const doc = new PDFDocument();

  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  doc.pipe(fs.createWriteStream("output.pdf"));

  // Embed a font, set the font size, and render some text
  doc.font("fonts/Roboto/Roboto-Light.ttf").fontSize(25);
  doc.text("Resource Management System Report", 20, 10);

  // Add an image, constrain it to a given size, and center it vertically and horizontally
  doc.image(req.body.dataUrl, 75, 50, { width: 500 });

  // Add another page
  doc.addPage().fontSize(25).text("Here is some vector graphics...", 100, 100);

  // Draw a triangle
  doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300");

  // Apply some transforms and render an SVG path with the 'even-odd' fill rule
  doc
    .scale(0.6)
    .translate(470, -380)
    .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
    .fill("red", "even-odd")
    .restore();

  // Add some text with annotations
  doc
    .addPage()
    .fillColor("blue")
    .text("Here is a link!", 100, 100)
    .underline(100, 100, 160, 27, { color: "#0000FF" })
    .link(100, 100, 160, 27, "http://google.com/");

  // Finalize PDF file
  doc.end();

  let redirectUrl;

  (async function () {
    redirectUrl = await uploadToS3("output.pdf");
    console.log("redirectUrl", redirectUrl);
    res.json({ redirectUrl: redirectUrl });
  })();
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
