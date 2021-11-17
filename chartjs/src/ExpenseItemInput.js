import React, { useState, useEffect } from "react";
import { Controller, set, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Input, Button } from "@material-ui/core";
import { Input as AntdInput } from "antd";
import { RgbaColorPicker } from "react-colorful";
import { color } from "@mui/system";
import "./ExpenseItemInput.css";

// import { ExpenseItems, ExpenseGroups } from "./Expense";
import chroma from "chroma-js";
import { dataTool } from "echarts";

export default function App({
  items,
  groups,
  projects,
  setItemsHandler,
  setGroupsHandler,
  setProjectsHandler,
  setTempProjectsHandler,
  tempProjects,
  setTempProjectsIdHandler,
  tempProjectsId,
  setTempItemsHandler,
  tempItems,
  tempItemsId,
  setTempItemsIdHandler,
}) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [showEndDate, setShowEndDate] = useState(true);

  const [projectColor, setProjectColor] = useState(null);

  const [projectStartforDatePicker, setProjectStartforDatePicker] =
    useState(null);

  const [projectEndforDatePicker, setProjectEndforDatePicker] = useState(null);

  const onSubmit = (data) => {
    //data.start_time = moment(data.start_time).format('YYYY-MM-DD');
    // if (checkedDuplicateExpneseItem(data) == false) {
    //   setGroupsHandler([...groups, { id: groups.length + 1, title: data.group.label }]);
    //   data.group = Number(groups.length + 1)
    //   console.log("No duplicate", data.group)
    // }
    // else {
    //   data.group = Number(data.group.value)
    //   console.log("Yes duplicate", data.group)
    // }
    data.group = Number(data.group.value);
    data.title = data.title.label;
    //setGroupsHandler([...groups, { id: groups.length + 1, title: data.group.label }]);
    data.description = data.description;
    Object.assign(data, { id: items.length + 1 });
    if (data.group == 4) {
      // MPhill 2 year
      data.expense = Number(data.expense) * 12 * 2;
    } else if (data.group == 5) {
      //PHD 4 year
      data.expense = Number(data.expense) * 12 * 4;
    } else {
      data.expense = Number(data.expense);
    }
    //data.group = Number(data.group);
    data.start_time = moment(moment(data.start_time).format("YYYY-MM-DD"));
    if (showEndDate == false) {
      if (data.group == 4) {
        //Mphill
        data.end_time = moment(
          moment(data.start_time).add(2, "years").format("YYYY-MM-DD")
        );
      } else if (data.group == 5) {
        //PHD
        data.end_time = moment(
          moment(data.start_time).add(4, "years").format("YYYY-MM-DD")
        );
      } else {
        // For one off item
        data.end_time = moment(
          moment(data.start_time).add(1, "days").format("YYYY-MM-DD")
        );
      }
    } else {
      data.end_time = moment(moment(data.end_time).format("YYYY-MM-DD"));
    }
    //data.bgColor = data.bgColor.value;
    data.bgColor = projectColor;
    console.log("onSubmitFromExpenseInput", data);

    // Create a copy of project to temp project
    let projectCopy;
    let tempProjectExist = false;
    // console.log(
    //   tempProjects.filter((project) => {
    //     return project.projectName == data.title + " (temp)";
    //   })
    // );

    if (
      tempProjects.filter((project) => {
        return project.projectName == data.title + " (temp)";
      }).length == 0
    ) {
      tempProjectExist = false;
    } else {
      tempProjectExist = true;
    }
    if (!tempProjectExist) {
      projectCopy = Object.assign(
        {},
        projects.filter((project) => {
          return project.projectName == data.title;
        })[0]
      );
      projectCopy.id = tempProjectsId;
      projectCopy.projectName = data.title + " (temp)";
      projectCopy.originalProjectName = data.title;
      // console.log("projectCopy: ", projectCopy);
      setTempProjectsHandler([...tempProjects, projectCopy]);
      setTempProjectsIdHandler(tempProjectsId + 1);
    }

    // Add a copy of original project items to the temp project and also add
    // the new item to it

    // Deep copy
    let itemsCopy;
    if (!tempProjectExist) {
      itemsCopy = JSON.parse(JSON.stringify(items)).filter((item) => {
        return item.title === data.title;
      });
      itemsCopy.forEach((item) => {
        item.title = data.title + " (temp)";
        item.id = tempItemsId;
        tempItemsId = tempItemsId + 1;
      });
    }

    data.title = data.title + " (temp)";
    data.id = tempItemsId;
    tempItemsId = tempItemsId + 1;

    if (!tempProjectExist) {
      itemsCopy.push(data);
      setTempItemsIdHandler(tempItemsId);
      setTempItemsHandler([...tempItems, ...itemsCopy]);
    } else {
      setTempItemsIdHandler(tempItemsId);
      setTempItemsHandler([...tempItems, data]);
    }

    // setItemsHandler([...items, data]);

    // console.log("items inside the Expense", ...items);
    // console.log(ExpenseItems.push(data));
    reset();
  };
  // const onSubmit = (data) => {
  //     console.log(moment(selectedDate).format("DD/MM/yyyy"));
  //  };
  function checkedDuplicateExpneseItem(data) {
    for (let i = 0; i < groups.length; i++) {
      if (data.group.id == groups[i].id) {
        return true;
      } else {
        return false;
      }
    }
  }

  const optionsGroups = groups.map(function (row) {
    // This function defines the "mapping behaviour". name and title
    // data from each "row" from your columns array is mapped to a
    // corresponding item in the new "options" array

    return { value: row.id, label: row.title };
  });

  // const optionsItemsfilter = items.map(function (row) {

  //   // This function defines the "mapping behaviour". name and title
  //   // data from each "row" from your columns array is mapped to a
  //   // corresponding item in the new "options" array

  //   return { value: row.title, label: row.title }
  // })

  // const optionsItems = (values) => {
  //   let concatArray = values.map(eachValue => {
  //     return Object.values(eachValue).join('')
  //   })
  //   let filterValues = values.filter((value, index) => {
  //     return concatArray.indexOf(concatArray[index]) === index

  //   })
  //   return filterValues
  // }

  const optionsProjects = projects.map((item) => {
    return {
      value: item.id,
      label: item.projectName,
      color: item.bgColor,
      start_time: item.start_time,
      end_time: item.end_time,
    };
  });

  // const dot = (color = "#ccc") => ({
  //   alignItems: "center",
  //   display: "flex",

  //   ":before": {
  //     backgroundColor: color,
  //     borderRadius: 10,
  //     content: '" "',
  //     display: "block",
  //     marginRight: 8,
  //     height: 10,
  //     width: 10,
  //   },
  // });

  // const colourStyles = {
  //   control: (styles) => ({ ...styles, backgroundColor: "white" }),
  //   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //     const color = chroma(data.color);
  //     return {
  //       ...styles,
  //       backgroundColor: isDisabled
  //         ? null
  //         : isSelected
  //           ? data.color
  //           : isFocused
  //             ? color.alpha(0.1).css()
  //             : null,
  //       color: isDisabled
  //         ? "#ccc"
  //         : isSelected
  //           ? chroma.contrast(color, "white") > 2
  //             ? "white"
  //             : "black"
  //           : data.color,
  //       cursor: isDisabled ? "not-allowed" : "default",

  //       ":active": {
  //         ...styles[":active"],
  //         backgroundColor:
  //           !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
  //       },
  //     };
  //   },
  //   input: (styles) => ({ ...styles, ...dot() }),
  //   placeholder: (styles) => ({ ...styles, ...dot() }),
  //   singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  //   //menu: (styles) => ({ ...styles, zIndex: 999999999999 }),
  // };

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
      <label>New Expense</label>
      {/* register your input into the hook by invoking the "register" function */}
      {/**<input {...register("example")} />*/}
      {/* errors will return when field validation fails  */}
      {/*<select {...register("project")}>
        <option value="Project1">Project1</option>
        <option value="Project2">Project2</option>
        <option value="Project3">Project3</option>
        </select>  id<input type="number" {...register("id", { valueAsNumber: true })} /><br /> */}
      {/* <Controller
        name="group"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <AntdInput
            type="number"
            placeholder="Row No. Expense Item"
            {...field}
          />
        )}
      />
      {errors.group && (
        <span className="text-danger">This field is required</span>
      )} */}
      <div className="container">
        <Controller
          name="group"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, ref, value } }) => (
            <CreatableSelect
              class="select-size"
              //{...field}
              //isClearable
              onChange={(inputRef) => {
                if (!inputRef) {
                  //https://stackoverflow.com/questions/63196611/event-is-null-when-using-isclearable-on-react-select
                  inputRef = {
                    target: inputRef,
                    value: "",
                  };
                }
                if (
                  inputRef.value === 1 ||
                  inputRef.value === 2 ||
                  inputRef.value === 3 ||
                  inputRef.value === 4 ||
                  inputRef.value === 5
                ) {
                  setShowEndDate(false);
                } else {
                  setShowEndDate(true);
                }
                onChange(inputRef);
              }}
              inputRef={ref}
              placeholder="Expense Item"
              options={optionsGroups}
            />
          )}
        />
      </div>
      {errors.group && (
        <span className="text-danger">This field is required</span>
      )}
      {/* <input type="number" {...register("group", { valueAsNumber: true })} /> */}
      {/* <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <AntdInput placeholder="Project Item" {...field} />
        )}
      /> */}
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
              //isClearable
              onChange={(inputRef) => {
                if (!inputRef) {
                  //https://stackoverflow.com/questions/63196611/event-is-null-when-using-isclearable-on-react-select
                  inputRef = {
                    target: inputRef,
                    value: "",
                  };
                }
                setProjectColor(inputRef.color);
                setProjectStartforDatePicker(inputRef.start_time);
                setProjectEndforDatePicker(inputRef.end_time);
                onChange(inputRef);
              }}
              inputRef={ref}
              placeholder="Project Item"
              // options={optionsItems(optionsItemsfilter)}
              options={optionsProjects}
            />
          )}
        />
      </div>
      {errors.title && (
        <span className="text-danger">This field 11 is required</span>
      )}
      {/* <div className="container">
        <Controller
          name="bgColor"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              class="select-size"
              {...field}
              placeholder="Expense Item Colour"
              options={[
                // { value: "rgb(54, 162, 235)", label: "Blue" },
                // { value: "rgb(255, 159, 64)", label: "Red" },
                // { value: "rgb(43, 178, 76)", label: "Green" },
                { value: "rgb(54, 162, 235)", label: "blue", color: "blue" },
                { value: "rgb(255, 0, 0)", label: "red", color: "red" },
                { value: "rgb(43, 178, 76)", label: "green", color: "green" },
                { value: "rgb(255,255,0)", label: "yellow", color: "yellow" },
                { value: "rgb(43, 178, 76)", label: "pink", color: "pink" },
                { value: "rgb(128,0,128)", label: "purple", color: "purple" },
              ]}
              styles={colourStyles}
            />
          )}
        />
      </div>
      {errors.bgColor && (
        <span className="text-danger">This field is required</span>
      )} */}
      <Controller
        name="description"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <AntdInput type="text" placeholder="Description" {...field} />
        )}
      />
      {errors.description && (
        <span className="text-danger">This field is required</span>
      )}
      <Controller
        name="expense"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <AntdInput type="number" placeholder="Expense Amount" {...field} />
        )}
      />
      {errors.expense && (
        <span className="text-danger">This field is required</span>
      )}
      *Mphill And PHD per month
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
            filterDate={(date) => {
              return (
                projectStartforDatePicker < date &&
                date < projectEndforDatePicker
              );
            }}
          />
        )}
      />
      {errors.start_time && (
        <span className="text-danger">This field is required</span>
      )}
      {showEndDate ? (
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
              filterDate={(date) => {
                return (
                  projectStartforDatePicker < date &&
                  date < projectEndforDatePicker
                );
              }}
            />
          )}
        />
      ) : null}
      {errors.end_time && (
        <span className="text-danger">This field is required</span>
      )}
      {/* <Controller
        name="bgColor"
        defaultValue={'r: 200, g: 150, b: 35'}
        control={control}
        render={({ field }) => <RgbaColorPicker onChange={setColor} color={field.value = color}  />}
      /> */}
      {/* bgColor
      <input {...register("bgColor")} /> */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      <input type="submit" value="Add" />
      {/* <Button type="submit" variant="outlined">Submit</Button> */}
    </form>
  );
}
