import axios from "axios";
const { cloudServerLocation, api } = require("../config.json");

let url = cloudServerLocation + api.expense.getExpense;

async function getExpenseItems() {
  axios.get(url).then((res) => {
    return res.body.ExpenseItems;
  });
}

async function updateExpenseItems(expenseItems) {
  axios.post(url).then((res) => {
    return res.body.ExpenseItems;
  });
}

export { getExpenseItems, updateExpenseItems };
