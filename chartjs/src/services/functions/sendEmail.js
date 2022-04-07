import axios from "axios";
const { mailServeerLocation, api } = require("../config.json");

let sendEmailUrl = mailServeerLocation + api.mail.sendEmail;

const sendEmail = (contents) => {
  return new Promise((resolve, reject) => {
    axios
      .post(sendEmailUrl, contents)
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject("Rejected");
      });
  });
};

export { sendEmail };
