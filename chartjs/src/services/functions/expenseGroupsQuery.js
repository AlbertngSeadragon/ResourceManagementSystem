import axios from "axios";
const { cloudServerLocation, api } = require("../config.json");

let url = cloudServerLocation + api.group.getGroup;

async function getExpenseGroups() {
  axios.get(url).then((res) => {
    return res.body.ExpenseGroups;
  });
}

async function updateExpenseGroups(groups) {
  axios.post(url).then((res) => {
    return res.body.ExpenseGroups;
  });
}

export { getExpenseGroups, updateExpenseGroups };
