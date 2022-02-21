import Mock from "mock.js";
const { cloudServerLocation, api } = require("../config.json");

let urlTable = {
  getExpense: cloudServerLocation + api.expense.getExpense,
  getGroup: cloudServerLocation + api.expense.getGroup,
  getProject: cloudServerLocation + api.expense.getProject,
  updateExpense: cloudServerLocation + api.expense.updateExpense,
  updateGroup: cloudServerLocation + api.expense.updateGroup,
  updateProject: cloudServerLocation + api.expense.updateProject,
};

Mock.mock(urlTable.getExpense, "GET", {
  ExpenseItems: [
    {
      bgColor: "rgb(54, 162, 235)",
      description: "ACM/IEEE Design Automation Conference",
      end_time: 'moment("2015-09-01")',
      expense: 150000,
      group: 3,
      id: 1,
      isWhatIF: 0,
      start_time: 'moment("2015-09-01")',
      title: "Graph Database Storage Design",
    },
    {
      bgColor: "rgb(54, 162, 235)",
      description: "Research Student: Albert",
      end_time: 'moment("2020-12-01")',
      expense: 48000,
      group: 5,
      id: 2,
      isWhatIF: 0,
      start_time: 'moment("2016-12-01")',
      title: "Graph Database Storage Design",
    },
    {
      bgColor: "rgb(54, 162, 235)",
      description: "Server purchasement",
      end_time: 'moment("2018-03-01")',
      expense: 300000,
      group: 2,
      id: 3,
      isWhatIF: 0,
      start_time: 'moment("2018-03-01")',
      title: "Graph Database Storage Design",
    },
    {
      bgColor: "rgb(255, 99, 132)",
      description: "Research Student: Timmy",
      end_time: 'moment("2022-09-01")',
      expense: 240000,
      group: 4,
      id: 4,
      isWhatIF: 0,
      start_time: 'moment("2020-09-01")',
      title:
        "Optimizations for Distributed Data Analytics in Cloud Environment",
    },
    {
      bgColor: "rgb(255, 99, 132)",
      description: "EC2 fee",
      end_time: 'moment("2022-09-01")',
      expense: 500000,
      group: 2,
      id: 5,
      isWhatIF: 0,
      start_time: 'moment("2022-09-01")',
      title:
        "Optimizations for Distributed Data Analytics in Cloud Environment",
    },
  ],
});

Mock.mock(urlTable.updateExpense, "POST", {
  ExpenseItems: [
    {
      bgColor: "rgb(54, 162, 235)",
      description: "ACM/IEEE Design Automation Conference",
      end_time: 'moment("2015-09-01")',
      expense: 150000,
      group: 3,
      id: 1,
      isWhatIF: 0,
      start_time: 'moment("2015-09-01")',
      title: "Graph Database Storage Design",
    },
    {
      bgColor: "rgb(54, 162, 235)",
      description: "Research Student: Albert",
      end_time: 'moment("2020-12-01")',
      expense: 48000,
      group: 5,
      id: 2,
      isWhatIF: 0,
      start_time: 'moment("2016-12-01")',
      title: "Graph Database Storage Design",
    },
    {
      bgColor: "rgb(54, 162, 235)",
      description: "Server purchasement",
      end_time: 'moment("2018-03-01")',
      expense: 300000,
      group: 2,
      id: 3,
      isWhatIF: 0,
      start_time: 'moment("2018-03-01")',
      title: "Graph Database Storage Design",
    },
    {
      bgColor: "rgb(255, 99, 132)",
      description: "Research Student: Timmy",
      end_time: 'moment("2022-09-01")',
      expense: 240000,
      group: 4,
      id: 4,
      isWhatIF: 0,
      start_time: 'moment("2020-09-01")',
      title:
        "Optimizations for Distributed Data Analytics in Cloud Environment",
    },
    {
      bgColor: "rgb(255, 99, 132)",
      description: "EC2 fee",
      end_time: 'moment("2022-09-01")',
      expense: 500000,
      group: 2,
      id: 5,
      isWhatIF: 0,
      start_time: 'moment("2022-09-01")',
      title:
        "Optimizations for Distributed Data Analytics in Cloud Environment",
    },
  ],
});

Mock.mock(urlTable.getProject, "GET", {
  Projects: [
    {
      id: 0,
      projectName: "Today",
      initialBalance: 3000000,
      start_time: moment(),
      end_time: moment(),
      bgColor: "rgb(0, 0, 0)",
    },
    {
      id: 1,
      projectName: "Graph Database Storage Design",
      initialBalance: 2000000,
      start_time: moment("2013-09-01"),
      end_time: moment("2020-09-01"),
      bgColor: "rgb(54, 162, 235)",
    },
    {
      id: 2,
      projectName:
        "Optimizations for Distributed Data Analytics in Cloud Environment",
      initialBalance: 3000000,
      start_time: moment("2019-09-01"),
      end_time: moment("2026-09-01"),
      bgColor: "rgb(255, 99, 132)",
    },
  ],
});

Mock.mock(urlTable.updateProject, "POST", {
  Projects: [
    {
      id: 0,
      projectName: "Today",
      initialBalance: 3000000,
      start_time: moment(),
      end_time: moment(),
      bgColor: "rgb(0, 0, 0)",
    },
    {
      id: 1,
      projectName: "Graph Database Storage Design",
      initialBalance: 2000000,
      start_time: moment("2013-09-01"),
      end_time: moment("2020-09-01"),
      bgColor: "rgb(54, 162, 235)",
    },
    {
      id: 2,
      projectName:
        "Optimizations for Distributed Data Analytics in Cloud Environment",
      initialBalance: 3000000,
      start_time: moment("2019-09-01"),
      end_time: moment("2026-09-01"),
      bgColor: "rgb(255, 99, 132)",
    },
  ],
});

Mock.mock(urlTable.getGroup, "GET", {
  ExpenseGroups: [
    { id: 1, title: "General Expense" },
    { id: 2, title: "Equipment Expense" },
    { id: 3, title: "Conference" },
    { id: 4, title: "RStudent - MPhill" },
    { id: 5, title: "RStudent - PHD" },
    { id: 6, title: "Staff - RA" },
    { id: 7, title: "Staff - PostDoc" },
    { id: 8, title: "Staff - Admin" },
  ],
});

Mock.mock(urlTable.updateGroup, "POST", {
  ExpenseGroups: [
    { id: 1, title: "General Expense" },
    { id: 2, title: "Equipment Expense" },
    { id: 3, title: "Conference" },
    { id: 4, title: "RStudent - MPhill" },
    { id: 5, title: "RStudent - PHD" },
    { id: 6, title: "Staff - RA" },
    { id: 7, title: "Staff - PostDoc" },
    { id: 8, title: "Staff - Admin" },
  ],
});
