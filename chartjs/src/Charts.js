import React, { useState, useEffect } from "react";
import Balance from "./Balance";
import Expense from "./Expense";
import Form from "./Form";
import ExpenseItemInput from "./ExpenseItemInput";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";

import moment from "moment";

import "./Charts.css";

import Draggable from 'react-draggable';
import zIndex from "@material-ui/core/styles/zIndex";

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
    group: 4,
    title: "Project 3",
    start_time: moment("2020-12-01"),
    end_time: moment("2020-12-02"),
    bgColor: "rgb(43, 178, 76)",
    expense: 50000,
  },
  {
    id: 7,
    group: 1,
    title: "Project 3",
    start_time: moment("2021-02-01"),
    end_time: moment("2021-03-01"),
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
        date: moment("2020-09-01").format("YYYY-MM-DD"),
      });
      items
        .filter((item) => item.title === project.projectName)
        .forEach((item) => {
          remainingBalance = remainingBalance - item.expense;
          plots.push({
            projectName: project.projectName,
            balance: remainingBalance,
            date: item.start_time.format("YYYY-MM-DD"),
          });
        });
      plots.push({
        projectName: project.projectName,
        balance: remainingBalance,
        date: moment().format("YYYY-MM-DD"),
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

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div>
      {/* <Grid container spacing={2}>
        <Grid item xs={12}> */}
          <Balance
            balanceChartPlots={balanceChartPlots}
            projects={projects}
          ></Balance>
        {/* </Grid> */}
        <Draggable styled={{position: 'relative', zIndex: 999999999999999999999999}}>
        <div class="whatifcontent">
          {/* <Grid item xs={18}> */}
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="What-if"
            />
            <Collapse in={checked}>
              
                {/* <Grid item xs={12} style={{ marginLeft: "100px" }}> */}
                  {/* <Card sx={{ maxWidth: 500 }}> */}

                  {/* <Grid item xs={5}> */}
                    <Form
                      groups={groups}
                      items={items}
                      setItemsHandler={setItemsHandler}
                      setGroupsHandler={setGroupsHandler}
                      setBalanceChartPlotsHandler={setBalanceChartPlotsHandler}
                    ></Form>
                  {/* </Grid> */}
                  {/* <Grid item xs={5}> */}
                    <ExpenseItemInput
                      groups={groups}
                      items={items}
                      setItemsHandler={setItemsHandler}
                      setGroupsHandler={setGroupsHandler}
                      setBalanceChartPlotsHandler={setBalanceChartPlotsHandler}
                    ></ExpenseItemInput>
                  {/* </Grid> */}

                  {/* </Card> */}
                {/* </Grid> */}
              
            </Collapse>
          {/* </Grid> */}
          </div>
        </Draggable>
        {/* <Grid item xs={12}> */}
          <Expense
            groups={groups}
            items={items}
            setItemsHandler={setItemsHandler}
            setGroupsHandler={setGroupsHandler}
            setBalanceChartPlotsHandler={setBalanceChartPlotsHandler}
          ></Expense>
        {/* </Grid>
      </Grid> */}
    </div>
  );
}

export default Charts;
