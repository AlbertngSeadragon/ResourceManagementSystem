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

import Draggable from "react-draggable";
import zIndex from "@material-ui/core/styles/zIndex";
import Group from "rc-image/lib/PreviewGroup";

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
    id: 4,
    group: 2,
    title: "Project 2",
    start_time: moment("2021-03-01"),
    end_time: moment("2021-04-01"),
    bgColor: "rgb(255, 99, 132)",
    expense: 300000,
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

  const [isModifiable, setIsModifiable] = useState(false);

  function difference(setA, setB) {
    let _difference = new Set(setA);
    for (let elem of setB) {
      _difference.delete(elem);
    }
    return _difference;
  }

  //const [beforeModifiedItems, setBeforeModifiedItems] = useState(null);
  //const [beforeModifiedGroups, setBeforeModifiedGroups] = useState(null);

  const handleModify = () => {
    setIsModifiable(!isModifiable);
    localStorage.setItem("BeforeItems", JSON.stringify(items));
    localStorage.setItem("BeforeGroups", JSON.stringify(groups));
    console.log("HandelModify", items);
    //setBeforeModifiedItems(items);
    //setBeforeModifiedGroups(groups);
  };

  const handleRestore = () => {
    //setIsModifiable(false);
    //console.log("Handrestoreeee",JSON.parse(localStorage.getItem('BeforeItems')));
    let Beforeitems = JSON.parse(localStorage.getItem("BeforeItems"));
    for (let i = 0; i < Beforeitems.length; i++) {
      Beforeitems[i].start_time = moment(
        moment(Beforeitems[i].start_time).format("YYYY-MM-DD")
      );
      Beforeitems[i].end_time = moment(
        moment(Beforeitems[i].end_time).format("YYYY-MM-DD")
      );
    }
    //console.log("Handle Restore", Beforeitems);
    setItemsHandler(Beforeitems);
    //setItems(JSON.parse(localStorage.getItem('BeforeItems')));
    setGroupsHandler(JSON.parse(localStorage.getItem("BeforeGroups")));
    //remove
    //localStorage.removeItem('BeforeItems');
    //remove
    //localStorage.removeItem('BeforeGroups');
    //setItems(beforeModifiedItems);
    //setGroups(beforeModifiedGroups);
    //console.log("Beforeitem", beforeModifiedItems)
  };

  const setBalanceChartPlotsHandler = function (plots) {
    setItems(plots);
  };

  const setItemsHandler = function (items) {
    setItems(items);
  };

  const setGroupsHandler = function (groups) {
    setGroups(groups);
  };

  const setProjectsHandler = function (projects) {
    setProjects(projects);
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
        .sort((a, b) =>
          moment(a.start_time, "YYYY-MM-DD").isBefore(
            moment(b.start_time, "YYYY-MM-DD")
          )
            ? -1
            : 1
        )
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
    setBalanceChartPlots(balanceChartPlotsGenerator());
  }, []);

  useEffect(() => {
    let newSet = new Set(items.map((item) => item.title));
    let oldSet = new Set(projects.map((project) => project.projectName));
    let [diffSet] = [...difference(newSet, oldSet)];
    console.log("diffSet", diffSet);
    if (diffSet !== undefined) {
      setProjects([
        ...projects,
        {
          projectName: diffSet,
          initialBalance: 500000,
        },
      ]);
    }
  }, [items]);

  useEffect(() => {
    setBalanceChartPlots(balanceChartPlotsGenerator());
    console.log("setBalanceChartPlots", items);
  }, [groups, items, projects]);

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
      <Draggable
        styled={{ position: "relative", zIndex: 999999999999999999999999 }}
      >
        <div className="whatifcontent">
          {/* <Grid item xs={18}> */}
          {/* <button onClick={handleModify}>Modify</button> */}
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                onClick={handleModify}
              />
            }
            label="What-if"
          />
          <Collapse in={checked}>
            {<button onMouseDown={handleRestore}>Reset</button>}
            <h2>isModifiable: {isModifiable.toString()}</h2>

            {/* <Grid item xs={12} style={{ marginLeft: "100px" }}> */}
            {/* <Card sx={{ maxWidth: 500 }}> */}

            {/* <Grid item xs={5}> */}
            <Form
              groups={groups}
              items={items}
              projects={projects}
              setItemsHandler={setItemsHandler}
              setGroupsHandler={setGroupsHandler}
              setProjectsHandler={setProjectsHandler}
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
        isModifiable={isModifiable}
      ></Expense>
      {/* </Grid>
      </Grid> */}
    </div>
  );
}

export default Charts;
