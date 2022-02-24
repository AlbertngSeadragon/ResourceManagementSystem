import axios from "axios";
const { cloudServerLocation, api } = require("../config.json");

let url = cloudServerLocation + api.group.getGroup;

const getExpenseGroups = () => {
  return new Promise((resolve, reject) => {
    try {
      axios.get(url).then((res) => {
        resolve(res.data);
      });
    } catch {
      reject("Rejected");
    }
  });
};

const updateExpenseGroups = (groups) => {
  return new Promise((resolve, reject) => {
    try {
      axios.get(url).then((res) => {
        resolve(res.data);
      });
    } catch {
      reject("Rejected");
    }
  });
};

export { getExpenseGroups, updateExpenseGroups };
