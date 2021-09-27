import React from "react";
import { useForm, Controller } from "react-hook-form";
import "./Form.css";
import { Input, Button } from "@material-ui/core";
import { Input as AntdInput } from "antd";
import TextField from "@mui/material/TextField";
import moment from "moment";
import DatePicker from "react-datepicker";
// import { ExpenseItems, ExpenseGroups } from "./Expense";

export default function App({
  items,
  groups,
  projects,
  setItemsHandler,
  setGroupsHandler,
  setProjectsHandler,
}) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    Object.assign(data, { id: projects.length + 1 });
    data.initialBalance = Number(data.initialBalance);
    data.start_time = moment(moment(data.start_time).format("YYYY-MM-DD"));
    setProjectsHandler([...projects, data]);
    // setGroupsHandler([...groups, data]);
    console.log("++", ...projects);
    console.log("New Project======>", data)
    // ExpenseGroups.push(data);
    // console.log("++++++++++++++++++++++", ExpenseGroups);
  };

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label>New Project</label>
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
      {/* <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <AntdInput placeholder="Expense Item" {...field} />
        )}
      /> */}
      {/* {errors.title && (
        <span className="text-danger">This field is required</span>
      )} */}
      <Controller
        name="projectName"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <AntdInput placeholder="New Project Name" {...field} />
        )}
      />
      {errors.projectName && (
        <span className="text-danger">This field is required</span>
      )}
      <Controller
        name="initialBalance"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <AntdInput type="number" placeholder="New Initial Balance" {...field} />
        )}
      />
      {errors.initialBalance && (
        <span className="text-danger">This field is required</span>
      )}
      <Controller
        name="start_time"
        control={control}
        defaultValue={null}
        rules={{ required: true }}
        render={({ field }) => (
          <DatePicker
            onChange={(date) => field.onChange(date)}
            selected={field.value}
            placeholderText="Initial Date"
          />
        )}
      />
      {errors.start_time && (
        <span className="text-danger">This field is required</span>
      )}
      {/* {errors.title === "required" ? (
        <div>
          <span className="text-danger">
            {"Device Type is required"}
          </span>
        </div>
      ) : null} */}
      <input type="submit" value="Add" />
      {/* <Button type="submit" variant="outlined">Submit</Button> */}
    </form>
  );
}
