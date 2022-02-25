import axios from "axios";
const { cloudServerLocation, api } = require("../config.json");

let url = cloudServerLocation + api.expense.getExpense;

const getExpenseItems = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject("Rejected");
      });
  });
};

const updateExpenseItems = (expenseItems) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject("Rejected");
      });
  });
};

export { getExpenseItems, updateExpenseItems };
