import React, { useState, useEffect } from "react";
import Balance from "./Balance";
import Expense from "./Expense";
import Form from "./Form";
import ExpenseItemInput from "./ExpenseItemInput";

import moment from "moment";

const Projects = [
  { projectName: "Project 1", initialBalance: 550000 },
  { projectName: "Project 2", initialBalance: 500000 },
  { projectName: "Project 3", initialBalance: 400000 },
];

const ExpenseGroups = [
  { id: 1, title: "Research Student" },
  { id: 2, title: "Research Assistant" },
  { id: 3, title: "General Expense" },
  { id: 4, title: "Equipment Expense" },
];

const ExpenseItems = [
  {
    id: 1,
    group: 1,
    title: "Project 1",
    start_time: moment("2020-11-01"),
    end_time: moment("2020-12-01"),
    bgColor: "rgb(54, 162, 235)",
    expense: 150000,
  },
  {
    id: 2,
    group: 2,
    title: "Project 1",
    start_time: moment("2021-03-01"),
    end_time: moment("2021-04-01"),
    bgColor: "rgb(54, 162, 235)",
    expense: 100000,
  },
  {
    id: 3,
    group: 1,
    title: "Project 2",
    start_time: moment("2020-10-01"),
    end_time: moment("2020-11-01"),
    bgColor: "rgb(255, 99, 132)",
    expense: 50000,
  },
  {
    id: 4,
    group: 2,
    title: "Project 2",
    start_time: moment("2021-03-01"),
    end_time: moment("2021-04-01"),
    bgColor: "rgb(255, 99, 132)",
    expense: 300000,
  },
  {
    id: 5,
    group: 2,
    title: "Project 3",
    start_time: moment("2020-11-01"),
    end_time: moment("2020-12-01"),
    bgColor: "rgb(43, 178, 76)",
    expense: 50000,
  },
  {
    id: 6,
    group: 1,
    title: "Project 3",
    start_time: moment("2021-02-01"),
    end_time: moment("2021-03-01"),
    bgColor: "rgb(43, 178, 76)",
    expense: 50000,
  },
  {
    id: 7,
    group: 4,
    title: "Project 3",
    start_time: moment("2020-12-01"),
    end_time: moment("2020-12-02"),
    bgColor: "rgb(43, 178, 76)",
    expense: 50000,
  },
];
function Charts() {
  const [groups, setGroups] = useState(ExpenseGroups);
  const [items, setItems] = useState(ExpenseItems);
  const [projects, setProjects] = useState(Projects);
  const [balanceChartPlots, setBalanceChartPlots] = useState([]);

  const setBalanceChartPlotsHandler = function (plots) {
    setItems(plots);
  };

  const setItemsHandler = function (items) {
    setItems(items);
  };

  const setGroupsHandler = function (groups) {
    setGroups(groups);
  };

  const balanceChartPlotsGenerator = function () {
    let plots = [];
    projects.forEach((project) => {
      let remainingBalance = project.initialBalance;
      plots.push({
        projectName: project.projectName,
        balance: remainingBalance,
        date: moment("2020-09-01"),
      });
      items
        .filter((item) => item.title === project.projectName)
        .forEach((item) => {
          remainingBalance = remainingBalance - item.expense;
          plots.push({
            projectName: project.projectName,
            balance: remainingBalance,
            date: item.start_time,
          });
        });
      plots.push({
        projectName: project.projectName,
        balance: remainingBalance,
        date: moment("YYYY-MM-DD"),
      });
    });
    // console.log("run 1", plots);
    // setBalanceChartPlots(plots);
    return plots;
  };

  useEffect(() => {
    // setBalanceChartPlots([
    //   { projectName: "Project 1", balance: 550000, date: "2020-09-01" },
    //   { projectName: "Project 1", balance: 400000, date: "2020-11-01" },
    //   { projectName: "Project 1", balance: 550000, date: "2020-09-01" },
    //   { projectName: "Project 1", balance: 550000, date: "2020-09-01" },
    // ]);
    // console.log("run 2", balanceChartPlotsGenerator());
    setBalanceChartPlots(balanceChartPlotsGenerator());
    // console.log(balanceChartPlots);
  }, []);

  return (
    <div>
      <Form
        groups={groups}
        items={items}
        setItemsHandler={setItemsHandler}
        setGroupsHandler={setGroupsHandler}
        setBalanceChartPlotsHandler={setBalanceChartPlotsHandler}
      ></Form>
      <ExpenseItemInput
        groups={groups}
        items={items}
        setItemsHandler={setItemsHandler}
        setGroupsHandler={setGroupsHandler}
        setBalanceChartPlotsHandler={setBalanceChartPlotsHandler}
      ></ExpenseItemInput>
      <Balance
        balanceChartPlots={balanceChartPlots}
        projects={projects}
      ></Balance>
      <Expense
        groups={groups}
        items={items}
        setItemsHandler={setItemsHandler}
        setGroupsHandler={setGroupsHandler}
        setBalanceChartPlotsHandler={setBalanceChartPlotsHandler}
      ></Expense>
    </div>
  );
}

export default Charts;
