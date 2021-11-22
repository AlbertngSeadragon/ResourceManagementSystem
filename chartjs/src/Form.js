import React from "react";
import { useForm, Controller } from "react-hook-form";
import "./Form.css";
import { Input, Button } from "@material-ui/core";
import { Input as AntdInput } from "antd";
import TextField from "@mui/material/TextField";
import moment from "moment";
import DatePicker from "react-datepicker";
import Select from "react-select";
import chroma from "chroma-js";
// import { ExpenseItems, ExpenseGroups } from "./Expense";

export default function App({
  items,
  groups,
  projects,
  setItemsHandler,
  setGroupsHandler,
  setProjectsHandler,
  setModifiedItemsHandler,
  modifiedItems,
}) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    Object.assign(data, { id: projects.length + 1 });
    data.initialBalance = Number(data.initialBalance);
    data.bgColor = data.bgColor.value;
    data.start_time = moment(moment(data.start_time).format("YYYY-MM-DD"));
    data.end_time = moment(moment(data.end_time).format("YYYY-MM-DD"));
    setModifiedItemsHandler([
      ...modifiedItems,
      {
        action: "Add project",
        initialBalance: data.initialBalance,
        start_time: data.start_time,
        end_time: data.end_time,
        bgColor: data.bgColor,
        description: `Project is added. Project Name: ${
          data.projectName
        } Initial Balance: $${data.initialBalance}, Start date: ${moment(
          data.start_time
        ).format("YYYY-MM-DD")}, End date: ${moment(data.end_time).format(
          "YYYY-MM-DD"
        )}`,
      },
    ]);
    setProjectsHandler([...projects, data]);
    // setGroupsHandler([...groups, data]);
    console.log("++", ...projects);
    console.log("New Project======>", data);
    // ExpenseGroups.push(data);
    // console.log("++++++++++++++++++++++", ExpenseGroups);
    reset();
  };

  const dot = (color = "#ccc") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : null,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor:
            !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot() }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    //menu: (styles) => ({ ...styles, zIndex: 999999999999 }),
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
      <div className="container">
        <Controller
          name="bgColor"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              class="select-size"
              {...field}
              //isClearable
              placeholder="Project Colour"
              options={[
                // { value: "rgb(54, 162, 235)", label: "Blue" },
                // { value: "rgb(255, 159, 64)", label: "Red" },
                // { value: "rgb(43, 178, 76)", label: "Green" },
                { value: "rgb(54, 162, 235)", label: "blue", color: "blue" },
                { value: "rgb(255, 0, 0)", label: "red", color: "red" },
                { value: "rgb(43, 178, 76)", label: "green", color: "green" },
                { value: "rgb(255,255,0)", label: "yellow", color: "yellow" },
                { value: "rgb(255,192,203)", label: "pink", color: "pink" },
                { value: "rgb(128,0,128)", label: "purple", color: "purple" },
              ]}
              styles={colourStyles}
            />
          )}
        />
      </div>
      {errors.bgColor && (
        <span className="text-danger">This field is required</span>
      )}
      <Controller
        name="initialBalance"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <AntdInput type="number" placeholder="Initial Balance" {...field} />
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
            placeholderText="Start Date"
          />
        )}
      />
      {errors.start_time && (
        <span className="text-danger">This field is required</span>
      )}
      <Controller
        name="end_time"
        control={control}
        defaultValue={null}
        rules={{ required: true }}
        render={({ field }) => (
          <DatePicker
            onChange={(date) => field.onChange(date)}
            selected={field.value}
            placeholderText="End Date"
          />
        )}
      />
      {errors.end_time && (
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
