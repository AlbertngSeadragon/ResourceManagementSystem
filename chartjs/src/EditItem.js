import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input as AntdInput } from "antd";
import Select from "react-select";
import "./EditItem.css";
import { defaults } from "chart.js";
import { selectClasses } from "@mui/material";

function EditItem({
  items,
  projects,
  selectedItemforEdit,
  setItemsHandler,
  isModifiable,
  handleClose,
  // setModifiedItemsHandler,
  // modifiedItems,
}) {
  const [projectColor, setProjectColor] = useState(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: selectedItemforEdit.title,
      description: selectedItemforEdit.description,
      balance: selectedItemforEdit.expense,
      bgColor: selectedItemforEdit.bgColor,
    },
  });

  const onSubmit = (data) => {
    if (isModifiable) {
      // let itemLocal = items
      //   .filter((item) => {
      //     return selectedItemforEdit.id === item.id;
      //   })
      //   .map((item) => {
      //     return {
      //       ...item,
      //       expense: parseInt(data.balance, 10),
      //       description: data.description,
      //       bgColor: projectColor,
      //       title: data.title.label,
      //       isWhatIF: true,
      //     };
      //   });

      // BUGFIX:
      // Reproduction: Change the item expense, then drag it to the other group

      for (let i = 0; i < items.length; i++) {
        if (selectedItemforEdit.id === items[i].id) {
          items[i].expense =
            parseInt(data.balance, 10) != null
              ? parseInt(data.balance, 10)
              : selectedItemforEdit.expense;
          items[i].description =
            data.description != null
              ? data.description
              : selectedItemforEdit.description;
          items[i].bgColor =
            projectColor != null ? projectColor : selectedItemforEdit.bgColor;
          items[i].title =
            data.title.label != null
              ? data.title.label
              : selectedItemforEdit.title;
          items[i].isWhatIF = true;
          // setModifiedItemsHandler([
          //   ...modifiedItems,
          //   {
          //     action: "Edit",
          //     group: items[i].group,
          //     id: items[i].id,
          //     bgColor: items[i].bgColor,
          //     start_time: items[i].start_time,
          //     description: `Item description is changed to ${items[i].description}, with expense $${items[i].expense}.`,
          //   },
          // ]);
        }
      }
      handleClose();
      console.log("From the edititem", items);
      setItemsHandler([...items]);
      //   console.log("items", items);
      //reset();
    }
  };
  // const optionsProjects = projects.map((item) => {
  //   return { value: item.id, label: item.projectName, color: item.bgColor };
  // });

  const optionsProjects = projects
    .filter(
      (project) =>
        project.projectName != "Today" &&
        !project.projectName.includes(" (original)")
    )
    .map((item) => {
      return {
        value: item.id,
        label: item.projectName,
        color: item.bgColor,
        start_time: item.start_time,
        end_time: item.end_time,
      };
    });
  function selectProjectsID(selectedItemforEdit, projects) {
    for (let i = 0; i < projects.length; i++) {
      if (selectedItemforEdit.title === projects[i].projectName) {
        console.log("XXXXXXXXXXXX", projects[i].id);
        return projects[i].id;
      }
    }
  }
  return (
    <div className="EditItem">
      <br></br>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, ref } }) => (
              // <CreatableSelect
              <Select
                class="select-size"
                //{...field}
                onChange={(inputRef) => {
                  setProjectColor(inputRef.color);
                  onChange(inputRef);
                }}
                inputRef={ref}
                placeholder="Project Item"
                // options={optionsItems(optionsItemsfilter)}
                options={optionsProjects}
                defaultValue={{
                  label: selectedItemforEdit.title,
                  value: selectProjectsID(selectedItemforEdit, projects),
                  color: selectedItemforEdit.bgColor,
                }}
              />
            )}
          />
        </div>
        {errors.title && (
          <span className="text-danger">This field 11 is required</span>
        )}
        Description
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <AntdInput
              type="text"
              value="xxx"
              placeholder="New Description"
              {...field}
            />
          )}
        />
        {errors.description && (
          <span className="text-danger">This field is required</span>
        )}
        Expense
        <Controller
          name="balance"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <AntdInput
              type="number"
              placeholder="New Expense Amount"
              {...field}
            />
          )}
        />
        {errors.balance && (
          <span className="text-danger">This field is required</span>
        )}
        <input type="submit" value="Update" />
      </form>
    </div>
  );
}

export default EditItem;
