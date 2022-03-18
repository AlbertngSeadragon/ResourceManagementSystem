import axios from "axios";
const { pdfServerLocation, api } = require("../config.json");

let sendPdfDataUrl = pdfServerLocation + api.pdf.sendPdfData;

const sendPdfData = (dataUrl, items) => {
  return new Promise((resolve, reject) => {
    axios
      .post(sendPdfDataUrl, { dataUrl: dataUrl, items: items })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject("Rejected");
      });
  });
};

export { sendPdfData };
