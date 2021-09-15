import React from "react";
import { useForm } from "react-hook-form";
import "./Form.css";
// import { ExpenseItems, ExpenseGroups } from "./Expense";

export default function App({
  items,
  groups,
  setItemsHandler,
  setGroupsHandler,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    Object.assign(data, { id: groups.length + 1 });
    setGroupsHandler([...groups, data]);
    // ExpenseGroups.push(data);
    // console.log("++++++++++++++++++++++", ExpenseGroups);
  };

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      {/* <input {...register("example")} /> */}
      {/* errors will return when field validation fails  */}
      {/* <select {...register("project")}>
        <option value="Project1">Project1</option>
        <option value="Project2">Project2</option>
        <option value="Project3">Project3</option>
        </select> */}
      Title
      <input {...register("title")} />
      <br />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
}
