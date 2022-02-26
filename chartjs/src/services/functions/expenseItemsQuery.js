import axios from "axios";
const {
  cloudServerLocation,
  updateServerLocation,
  api,
} = require("../config.json");

let getUrl = cloudServerLocation + api.expense.getExpense;
let updateUrl = updateServerLocation + api.expense.updateExpense;

const getExpenseItems = () => {
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

const updateExpenseItems = (expenseItems) => {
  return new Promise((resolve, reject) => {
    axios
      .post(updateUrl, {
        ExpenseItems: expenseItems,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject("Rejected");
      });
  });
};

export { getExpenseItems, updateExpenseItems };
