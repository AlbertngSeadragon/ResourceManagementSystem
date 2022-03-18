import axios from "axios";
const { pdfServerLocation, api } = require("../config.json");

let sendEchartsImageUrl = pdfServerLocation + api.pdf.sendEchartsImage;

const sendEchartsImage = (dataUrl) => {
  return new Promise((resolve, reject) => {
    axios
      .post(sendEchartsImageUrl, { dataUrl: dataUrl })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject("Rejected");
      });
  });
};

export { sendEchartsImage };
