import React from "react";
import { useForm, Controller } from "react-hook-form";
import "./Form.css";
import { Input, Button } from "@material-ui/core";
import { Input as AntdInput } from "antd";
import TextField from '@mui/material/TextField';
// import { ExpenseItems, ExpenseGroups } from "./Expense";

export default function App({
  items,
  groups,
  setItemsHandler,
  setGroupsHandler,
}) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    Object.assign(data, { id: groups.length + 1 });
    setGroupsHandler([...groups, data]);
    console.log("++", ...groups)
    // ExpenseGroups.push(data);
    // console.log("++++++++++++++++++++++", ExpenseGroups);
  };

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label>New Expense</label>
      {/* register your input into the hook by invoking the "register" function */}
      {/* <input {...register("example")} /> */}
      {/* errors will return when field validation fails  */}
      {/* <select {...register("project")}>
        <option value="Project1">Project1</option>
        <option value="Project2">Project2</option>
        <option value="Project3">Project3</option>
        </select> */}
      {/* Title
      <input {...register("title")} /> */}
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field }) => <AntdInput placeholder="Expense Item" {...field} />}
      />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
      {/* <Button type="submit" variant="outlined">Submit</Button> */}
    </form>
  );
}
