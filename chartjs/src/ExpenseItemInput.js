import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Select from "react-select";
import { Input, Button } from "@material-ui/core";
import { Input as AntdInput } from "antd";
import { RgbaColorPicker } from "react-colorful";
import { color } from "@mui/system";
import "./ExpenseItemInput.css";

// import { ExpenseItems, ExpenseGroups } from "./Expense";
import chroma from "chroma-js";

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
    //data.start_time = moment(data.start_time).format('YYYY-MM-DD');
    Object.assign(data, { id: items.length + 1 });
    data.start_time = moment(moment(data.start_time).format("YYYY-MM-DD"));
    data.end_time = moment(moment(data.end_time).format("YYYY-MM-DD"));
    data.bgColor = data.bgColor.value;
    setItemsHandler([...items, data]);
    // console.log("items inside the Expense", ...items);
    // console.log(ExpenseItems.push(data));
  };
  // const onSubmit = (data) => {
  //     console.log(moment(selectedDate).format("DD/MM/yyyy"));
  //  };

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
    menu: (styles) => ({ ...styles, zIndex: 999999999999 })
  };

  //start_time<input {...register("start_time", { valueAsDate: true })} /><br />
  //end_time<input {...register("end_time", { valueAsDate: true })} /><br />
  //const [selectedDate, setselectedDate] = useState(null);

  //            end_time https://stackoverflow.com/questions/60864610/is-it-possible-to-use-react-datepicker-with-react-hooks-forms
  //     <Controller name="end_time" control={control} defaultValue={null}
  //     render ={
  //         ({onChange, value}) => <DatePicker onChange={onChange} selected={value}/>
  //     }
  // />
  //   console.log(watch("example")); // watch input value by passing the name of it
  //console.log("++++++++++++++++++++++++++++++++++++++++++", testgroups.push({ id: 5, title: "testEquipement Expense" }));
  //console.log(testitems)
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label>New Project</label>
      {/* register your input into the hook by invoking the "register" function */}
      {/**<input {...register("example")} />*/}
      {/* errors will return when field validation fails  */}
      {/*<select {...register("project")}>
        <option value="Project1">Project1</option>
        <option value="Project2">Project2</option>
        <option value="Project3">Project3</option>
        </select>  id<input type="number" {...register("id", { valueAsNumber: true })} /><br /> */}
      <Controller
        name="group"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <AntdInput type="number" placeholder="Row No. Expense Item" {...field} />
        )}
      />
      {errors.group && <span className="text-danger">This field is required</span>}
      {/* <input type="number" {...register("group", { valueAsNumber: true })} /> */}
      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <AntdInput placeholder="Project Item" {...field} />
        )}
      />
      {errors.title && <span className="text-danger">This field is required</span>}
      <div className="container">
      <Controller
        name="bgColor"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            class="select-size"
            {...field}
            placeholder="Project Colour"
            options={[
              // { value: "rgb(54, 162, 235)", label: "Blue" },
              // { value: "rgb(255, 159, 64)", label: "Red" },
              // { value: "rgb(43, 178, 76)", label: "Green" },
              { value: "rgb(54, 162, 235)", label: "blue", color: "blue" },
              { value: "rgb(255, 159, 64)", label: "red", color: "red" },
              { value: "rgb(43, 178, 76)", label: "green", color: "green" }
            ]}
            styles={colourStyles}
          />
        )}
      />
      </div>
      {errors.bgColor && <span className="text-danger">This field is required</span>}
      <Controller
        name="balance"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => <AntdInput type="number" placeholder="Balance Deduction" {...field} />}
      />
      {errors.balance && <span className="text-danger">This field is required</span>}
      {/*title
      <input {...register("title")} /> */}
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
      {errors.start_time && <span className="text-danger">This field is required</span>}
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
      {errors.end_time && <span className="text-danger">This field is required</span>}
      {/* <Controller
        name="bgColor"
        defaultValue={'r: 200, g: 150, b: 35'}
        control={control}
        render={({ field }) => <RgbaColorPicker onChange={setColor} color={field.value = color}  />}
      /> */}
      {/* bgColor
      <input {...register("bgColor")} /> */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      <input type="submit" value="Add"/>
      {/* <Button type="submit" variant="outlined">Submit</Button> */}
    </form>
  );
}
