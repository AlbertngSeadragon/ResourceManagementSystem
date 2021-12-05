import React, { useState, useEffect } from "react";
import Balance from "./Balance";
import Expense from "./Expense";
import Form from "./Form";
import ModifiedList from "./ModifiedList";
import ExpenseItemInput from "./ExpenseItemInput";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import moment from "moment";

import "./Charts.css";

import Draggable from "react-draggable";
import zIndex from "@material-ui/core/styles/zIndex";
import Group from "rc-image/lib/PreviewGroup";

const Projects = [
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
];

const ExpenseGroups = [
  { id: 1, title: "General Expense" },
  { id: 2, title: "Equipment Expense" },
  { id: 3, title: "Conference" },
  { id: 4, title: "RStudent - MPhill" },
  { id: 5, title: "RStudent - PHD" },
  { id: 6, title: "Staff - RA" },
  { id: 7, title: "Staff - PostDoc" },
  { id: 8, title: "Staff - Admin" },
];

const ExpenseItems = [
  {
    id: 1,
    group: 3,
    title: "Graph Database Storage Design",
    start_time: moment("2015-09-01"),
    end_time: moment("2015-09-01"),
    bgColor: "rgb(54, 162, 235)",
    expense: 150000,
    description: "ACM/IEEE Design Automation Conference",
    isWhatIF: false,
  },
  {
    id: 2,
    group: 5,
    title: "Graph Database Storage Design",
    start_time: moment("2016-12-01"),
    end_time: moment("2020-12-01"),
    bgColor: "rgb(54, 162, 235)",
    expense: 480000,
    description: "Research Student: Albert",
    isWhatIF: false,
  },
  {
    id: 3,
    group: 2,
    title: "Graph Database Storage Design",
    start_time: moment("2018-03-01"),
    end_time: moment("2018-03-01"),
    bgColor: "rgb(54, 162, 235)",
    expense: 300000,
    description: "Server purchasement",
    isWhatIF: false,
  },
  {
    id: 4,
    group: 4,
    title: "Optimizations for Distributed Data Analytics in Cloud Environment",
    start_time: moment("2020-09-01"),
    end_time: moment("2022-09-01"),
    bgColor: "rgb(255, 99, 132)",
    expense: 240000,
    description: "Research Student: Timmy",
    isWhatIF: false,
  },

  {
    id: 5,
    group: 2,
    title: "Optimizations for Distributed Data Analytics in Cloud Environment",
    start_time: moment("2022-09-01"),
    end_time: moment("2022-09-01"),
    bgColor: "rgb(255, 99, 132)",
    expense: 500000,
    description: "EC2 fee",
    isWhatIF: false,
  },
];

function Charts() {
  const [groups, setGroups] = useState(ExpenseGroups);
  const [items, setItems] = useState(ExpenseItems);
  const [projects, setProjects] = useState(Projects);
  const [balanceChartPlots, setBalanceChartPlots] = useState([]);
  const [checked, setChecked] = useState(false);
  const [modifiedItems, setModifiedItems] = useState([]);
  // const [requireCopy, setRequireCopy] = useState(false);

  const [isModifiable, setIsModifiable] = useState(false);
  const [originalItems, setOriginalItems] = useState([]);
  const [originalProjects, setOriginalProjects] = useState([]);

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
    // TODO: Async issue, here should be if (isModifiable) {...}, fix it later
    if (!isModifiable) {
      let maxId = Math.max(...projects.map((project) => project.id));
      let originalProjectLocal = projects
        .filter((project) => {
          return project.projectName != "Today";
        })
        .map((project, index) => {
          return {
            ...project,
            projectName: project.projectName + " (original)",
            id: maxId + index + 1,
          };
        });
      setProjects([...projects, ...originalProjectLocal]);
      setOriginalProjects(originalProjectLocal);
      setOriginalItems(
        items.map((item) => {
          return { ...item, title: item.title + " (original)" };
        })
      );
    } else {
      setProjects(
        projects.filter((project) => {
          return !project.projectName.includes(" (original)");
        })
      );
      setOriginalItems([]);
      setOriginalProjects([]);
    }

    localStorage.setItem("BeforeItems", JSON.stringify(items));
    localStorage.setItem("BeforeGroups", JSON.stringify(groups));
    localStorage.setItem("BeforeProjects", JSON.stringify(projects));
    //console.log("HandelModify", JSON.stringify(projects));
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

    let BeforeProjects = JSON.parse(localStorage.getItem("BeforeProjects"));
    for (let i = 0; i < BeforeProjects.length; i++) {
      BeforeProjects[i].start_time = moment(
        moment(BeforeProjects[i].start_time).format("YYYY-MM-DD")
      );
      BeforeProjects[i].end_time = moment(
        moment(BeforeProjects[i].end_time).format("YYYY-MM-DD")
      );
    }
    setProjectsHandler(BeforeProjects);
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

  const setModifiedItemsHandler = function (modifiedItems) {
    setModifiedItems(modifiedItems);
  };

  const setItemsHandler = function (items) {
    // console.log("Triggered setItems");
    setItems(items);
    console.log("items", items);
  };

  const setGroupsHandler = function (groups) {
    setGroups(groups);
  };

  const setProjectsHandler = function (projects) {
    setProjects(projects);
  };

  const balanceChartPlotsGenerator = function () {
    let plots = [];
    if (isModifiable) {
      let appendedItems = [...items, ...originalItems];
      projects.forEach((project) => {
        let remainingBalance = project.initialBalance;
        plots.push({
          projectName: project.projectName,
          balance: remainingBalance,
          date: project.start_time.format("YYYY-MM-DD"),
        });
        appendedItems
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
              expense: item.expense,
              description: item.description,
              expenseItem: groups.filter((groups) => groups.id == item.group),
            });
          });
        plots.push({
          projectName: project.projectName,
          //balance: remainingBalance,
          balance: 0,
          date: project.end_time.format("YYYY-MM-DD"),
        });
      });
      // projects.forEach((project) => {
      //   let remainingBalance = project.initialBalance;
      //   // plots.push({
      //   //   projectName: project.projectName + " (original)",
      //   //   balance: remainingBalance,
      //   //   date: project.start_time.format("YYYY-MM-DD"),
      //   // });
      //   items
      //     .filter((item) => item.title === project.projectName)
      //     .sort((a, b) =>
      //       moment(a.start_time, "YYYY-MM-DD").isBefore(
      //         moment(b.start_time, "YYYY-MM-DD")
      //       )
      //         ? -1
      //         : 1
      //     )
      //     .forEach((item) => {
      //       remainingBalance = remainingBalance - item.expense;
      //       plots.push({
      //         projectName: project.projectName + " (original)",
      //         balance: remainingBalance,
      //         date: item.start_time.format("YYYY-MM-DD"),
      //         expense: item.expense,
      //         description: item.description,
      //         expenseItem: groups.filter((groups) => groups.id == item.group),
      //       });
      //     });
      //   // plots.push({
      //   //   projectName: project.projectName + " (original)",
      //   //   //balance: remainingBalance,
      //   //   balance: 0,
      //   //   date: project.end_time.format("YYYY-MM-DD"),
      //   // });
      // });
    } else {
      projects.forEach((project) => {
        let remainingBalance = project.initialBalance;
        plots.push({
          projectName: project.projectName,
          balance: remainingBalance,
          date: project.start_time.format("YYYY-MM-DD"),
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
              expense: item.expense,
              description: item.description,
              expenseItem: groups.filter((groups) => groups.id == item.group),
            });
          });
        plots.push({
          projectName: project.projectName,
          //balance: remainingBalance,
          balance: 0,
          date: project.end_time.format("YYYY-MM-DD"),
        });
      });
    }

    // console.log("run 1", plots);
    // setBalanceChartPlots(plots);
    return plots;
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
    //Set all whatif to real when close the what-if mode
    for (let i = 0; i < items.length; i++) {
      items[i].isWhatIF = false;
    }
    setItems(items);
  };

  useEffect(() => {
    setBalanceChartPlots(balanceChartPlotsGenerator());
  }, []);

  useEffect(() => {
    let newSet = new Set(items.map((item) => item.title));
    let oldSet = new Set(projects.map((project) => project.projectName));
    let [diffSet] = [...difference(newSet, oldSet)];
    // console.log("diffSet", diffSet);
    if (diffSet !== undefined) {
      setProjects([
        ...projects,
        {
          projectName: diffSet,
          initialBalance: 500000,
        },
      ]);
    }
    // setBalanceChartPlots(balanceChartPlotsGenerator());
    // console.log("setBalanceChartPlots", items);
  }, [items]);

  useEffect(() => {
    setBalanceChartPlots(balanceChartPlotsGenerator());
    // console.log("setBalanceChartPlots", items);
  }, [groups, items, projects, isModifiable]);

  return (
    <div style={{ backgroundColor: isModifiable ? "#fffde0" : "#FFF" }}>
      {/* <Grid container spacing={2}>
        <Grid item xs={12}> */}
      <Grid container spacing={1}>
        <Grid xs={7}>
          <br />
          <Balance
            balanceChartPlots={balanceChartPlots}
            projects={projects}
            isModifiable={isModifiable}
          ></Balance>
          <Divider />
          <Expense
            groups={groups}
            items={items}
            projects={projects}
            setItemsHandler={setItemsHandler}
            setGroupsHandler={setGroupsHandler}
            setBalanceChartPlotsHandler={setBalanceChartPlotsHandler}
            isModifiable={isModifiable}
            setModifiedItemsHandler={setModifiedItemsHandler}
            modifiedItems={modifiedItems}
          ></Expense>
        </Grid>
        <Grid xs={2}>
          <ModifiedList modifiedItems={modifiedItems}></ModifiedList>
        </Grid>
        <Grid xs={3}>
          <Draggable styled={{ position: "relative" }}>
            <div className="whatifcontent">
              {/* <Grid item xs={18}> */}
              {/* <button onClick={handleModify}>Modify</button> */}
              <br />
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
                {
                  <button className="resetButton" onMouseDown={handleRestore}>
                    Reset
                  </button>
                }
                {/* <h2>isModifiable: {isModifiable.toString()}</h2> */}

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
                  setModifiedItemsHandler={setModifiedItemsHandler}
                  modifiedItems={modifiedItems}
                ></Form>
                {/* </Grid> */}
                {/* <Grid item xs={5}> */}
                <ExpenseItemInput
                  groups={groups}
                  items={items}
                  projects={projects}
                  setItemsHandler={setItemsHandler}
                  setGroupsHandler={setGroupsHandler}
                  setBalanceChartPlotsHandler={setBalanceChartPlotsHandler}
                  setModifiedItemsHandler={setModifiedItemsHandler}
                  modifiedItems={modifiedItems}
                ></ExpenseItemInput>
                {/* </Grid> */}

                {/* </Card> */}
                {/* </Grid> */}
              </Collapse>
              {/* </Grid> */}
            </div>
          </Draggable>
        </Grid>
      </Grid>
      {/* </Grid> */}

      {/* <Grid item xs={12}> */}
      {/* </Grid>
      </Grid> */}
    </div>
  );
}

export default Charts;
