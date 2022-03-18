const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const cors = require("cors");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const { createReport } = require("./helper");
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

// function savePdfToFile(pdf, fileName) {
//   return new Promise((resolve, reject) => {

//       // To determine when the PDF has finished being written successfully
//       // we need to confirm the following 2 conditions:
//       //
//       //   1. The write stream has been closed
//       //   2. PDFDocument.end() was called syncronously without an error being thrown

//       let pendingStepCount = 2;

//       const stepFinished = () => {
//           if (--pendingStepCount == 0) {
//               resolve();
//           }
//       };

//       const writeStream = fs.createWriteStream(fileName);
//       writeStream.on('close', stepFinished);
//       pdf.pipe(writeStream);

//       pdf.end();

//       stepFinished();
//   });
// }

app.post("/sendPdfData", (req, res) => {
  // Create a document
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const writeStream = fs.createWriteStream("output.pdf");

  // console.log(req.body);

  createReport(doc, writeStream, req.body, "output.pdf");

  let redirectUrl;

  writeStream.on("finish", function () {
    // do stuff with the PDF file
    (async function () {
      redirectUrl = await uploadToS3("output.pdf");
      console.log("redirectUrl", redirectUrl);
      res.json({ redirectUrl: redirectUrl });
    })();
  });

  // (async function () {
  //   redirectUrl = await uploadToS3("output.pdf");
  //   console.log("redirectUrl", redirectUrl);
  //   res.json({ redirectUrl: redirectUrl });
  // })();
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
