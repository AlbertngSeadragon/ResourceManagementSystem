import axios from "axios";
const {
  cloudServerLocation,
  updateServerLocation,
  api,
} = require("../config.json");

let getUrl = cloudServerLocation + api.group.getGroup;
let updateUrl = updateServerLocation + api.group.updateGroup;

const getExpenseGroups = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(getUrl)
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject("Rejected");
      });
  });
};

const updateExpenseGroups = (groups) => {
  return new Promise((resolve, reject) => {
    axios
      .post(updateUrl, {
        ExpenseGroups: groups,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject("Rejected");
      });
  });
};

export { getExpenseGroups, updateExpenseGroups };
