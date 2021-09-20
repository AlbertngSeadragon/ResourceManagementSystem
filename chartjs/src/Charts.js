import React, { useState } from "react";
import "./Charts.css";
import Balance from "./Balance";
import Expense from "./Expense";
import Form from "./Form";
import ExpenseItemInput from "./ExpenseItemInput";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';

import moment from "moment";
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
  },
  {
    id: 2,
    group: 2,
    title: "Project 1",
    start_time: moment("2021-03-01"),
    end_time: moment("2021-04-01"),
    bgColor: "rgb(54, 162, 235)",
  },
  {
    id: 3,
    group: 1,
    title: "Project 2",
    start_time: moment("2020-10-01"),
    end_time: moment("2020-11-01"),
    bgColor: "rgb(255, 99, 132)",
  },
  {
    id: 4,
    group: 2,
    title: "Project 2",
    start_time: moment("2021-03-01"),
    end_time: moment("2021-04-01"),
    bgColor: "rgb(255, 99, 132)",
  },
  {
    id: 5,
    group: 2,
    title: "Project 3",
    start_time: moment("2020-11-01"),
    end_time: moment("2020-12-01"),
    bgColor: "rgb(43, 178, 76)",
  },
  {
    id: 6,
    group: 1,
    title: "Project 3",
    start_time: moment("2021-02-01"),
    end_time: moment("2021-03-01"),
    bgColor: "rgb(43, 178, 76)",
  },
  {
    id: 7,
    group: 4,
    title: "Project 3",
    start_time: moment("2020-12-01"),
    end_time: moment("2020-12-02"),
    bgColor: "rgb(43, 178, 76)",
  },
];


function Charts() {
  const [groups, setGroups] = useState(ExpenseGroups);
  const [items, setItems] = useState(ExpenseItems);
  const setItemsHandler = function (items) {
    setItems(items);
  };
  const setGroupsHandler = function (groups) {
    setGroups(groups);
  };

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Balance></Balance>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="What-if"
          />
          <Collapse in={checked}>
            <Grid item xs={12}>
              <Card sx={{ maxWidth: 500 }}>
                <Grid item xs={5}>
                  <Form
                    groups={groups}
                    items={items}
                    setItemsHandler={setItemsHandler}
                    setGroupsHandler={setGroupsHandler}
                  ></Form>
                </Grid>
                <Grid item xs={5}>
                  <ExpenseItemInput
                    groups={groups}
                    items={items}
                    setItemsHandler={setItemsHandler}
                    setGroupsHandler={setGroupsHandler}
                  ></ExpenseItemInput>
                </Grid>
              </Card>
            </Grid>
          </Collapse>
        </Grid>
        <Grid item xs={12}>
          <Expense
            groups={groups}
            items={items}
            setItemsHandler={setItemsHandler}
            setGroupsHandler={setGroupsHandler}
          ></Expense>
        </Grid>
      </Grid>
    </div>
  );
}

export default Charts;
