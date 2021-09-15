import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Select from "react-select";
import Input from "@material-ui/core/Input";
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
    //data.start_time = moment(data.start_time).format('YYYY-MM-DD');
    Object.assign(data, { id: items.length + 1 });
    data.start_time = moment(moment(data.start_time).format("YYYY-MM-DD"));
    data.end_time = moment(moment(data.end_time).format("YYYY-MM-DD"));
    data.bgColor = data.bgColor.value
    setItemsHandler([...items, data]);
    console.log("items inside the Expense", ...items);
    // console.log(ExpenseItems.push(data));
  };
  // const onSubmit = (data) => {
  //     console.log(moment(selectedDate).format("DD/MM/yyyy"));
  //  };

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
        render={({ field }) => <Input type="number" placeholder="Group" {...field} />}
      />
      {/* <input type="number" {...register("group", { valueAsNumber: true })} /> */}
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field }) => <Input placeholder="title" {...field} />}
      />
      <Controller
        name="balance"
        control={control}
        defaultValue=""
        render={({ field }) => <Input type="number" placeholder="Balance" {...field} />}
      />
      <br />
      {/*title
      <input {...register("title")} /> */}
      start_time
      <Controller
        name="start_time"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <DatePicker
            onChange={(date) => field.onChange(date)}
            selected={field.value}
          />
        )}
      />
      end_time
      <Controller
        name="end_time"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <DatePicker
            onChange={(date) => field.onChange(date)}
            selected={field.value}
          />
        )}
      />
      <Controller
        name="bgColor"
        control={control}
        render={({ field }) => <Select 
          {...field} 
          options={[
            { value: "rgb(54, 162, 235)", label: "Blue" },
            { value: "rgb(255, 159, 64)", label: "Red" },
            { value: "rgb(43, 178, 76)", label: "Green" }
          ]} 
        />}
      />
      {/* bgColor
      <input {...register("bgColor")} /> */}
      <br />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
}
