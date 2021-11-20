import React, { useState, useEffect } from "react";
import Timeline, {
  TimelineMarkers,
  CustomMarker,
  TodayMarker,
  CursorMarker,
} from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import "./Expense.css";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import RemoveItem from "./RemoveItem";
import EditItem from "./EditItem";

function Expense({
  items,
  projects,
  groups,
  setItemsHandler,
  isModifiable,
  setModifiedItemsHandler,
  modifiedItems,
}) {
  // const [isModifiable, setIsModifiable] = useState(false);

  // const [beforeModifiedItems, setBeforeModifiedItems] = useState(null);
  const [matchItemforRemoveOREdit, setmatchItemforRemoveOREdit] =
    useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // const handleModify = () => {
  //   setIsModifiable(!isModifiable);
  //   setBeforeModifiedItems(items);
  // };

  // const handleRestore = () => {
  //   setIsModifiable(false);
  //   setItemsHandler(beforeModifiedItems);
  // };

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const group = groups[newGroupOrder];
    const [oldMovedItem] = items.filter((item) => item.id === itemId);
    let itemAction;
    let modifyDescription;
    setItemsHandler(
      items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              start_time: moment(dragTime),
              end_time: moment(dragTime + (item.end_time - item.start_time)),
              group: group.id,
            }
          : item
      )
    );
    if (
      oldMovedItem.start_time != moment(dragTime) &&
      oldMovedItem.group == groups[newGroupOrder].id
    ) {
      itemAction = "Moved";
      modifyDescription = `Item start date is modified to ${moment(
        dragTime
      ).format("Do MMMM YYYY")} from ${moment(oldMovedItem.start_time).format(
        "Do MMMM YYYY"
      )}`;
    } else if (oldMovedItem.group != groups[newGroupOrder].id) {
      itemAction = "Group changed";
      modifyDescription = `Item group is modified to ${
        groups[newGroupOrder].id
      } from ${oldMovedItem.group}, Item start date is modified to ${moment(
        dragTime
      ).format("Do MMMM YYYY")} from ${moment(oldMovedItem.start_time).format(
        "Do MMMM YYYY"
      )}`;
      console.log(oldMovedItem);
    }
    setModifiedItemsHandler([
      ...modifiedItems,
      {
        action: itemAction,
        id: itemId,
        start_time: moment(dragTime).toString(),
        description: modifyDescription,
      },
    ]);
    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  const handleItemResize = (itemId, time, edge) => {
    setItemsHandler(
      items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              start_time: edge === "left" ? time : item.start_time,
              end_time: edge === "left" ? item.end_time : time,
            }
          : item
      )
    );
    console.log("Resized", itemId, time, edge);
  };

  const ItemDoubleClick = (itemId, e, time) => {
    if (isModifiable == true) {
      setAnchorEl(e.currentTarget);
      console.log("DoubleClick", itemId);
      console.log("DoubleClickItem", items);
      //const getItems = getCurrentitem();
      const matchItem = items.filter((item) => item.id === itemId);
      console.log("Match", matchItem[0]);
      setmatchItemforRemoveOREdit(matchItem[0]);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const itemRenderer = ({
    item,
    timelineContext,
    itemContext,
    getItemProps,
    getResizeProps,
  }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const backgroundColor = itemContext.selected
      ? itemContext.dragging
        ? "red"
        : item.selectedBgColor
      : item.bgColor;
    // console.log("++++++++", item);
    const borderColor = itemContext.resizing ? "red" : item.color;
    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            color: item.color,
            borderColor,
            opacity: (isModifiable && (item.isWhatIF == null || item.isWhatIF == true)) ? 0.5 : 1,
            borderStyle: (isModifiable && (item.isWhatIF == null || item.isWhatIF == true)) ? "dashed" : "solid",
            borderWidth: itemContext.selected & (isModifiable && (item.isWhatIF == null || item.isWhatIF == true)) ? 3 : 1,
            borderRadius: itemContext.selected & (isModifiable && (item.isWhatIF == null || item.isWhatIF == true)) ? 3 : 1,
            borderLeftWidth: itemContext.selected & (isModifiable && (item.isWhatIF == null || item.isWhatIF == true)) ? 3 : 1,
            borderRightWidth: itemContext.selected & (isModifiable && (item.isWhatIF == null || item.isWhatIF == true)) ? 3 : 1,
          },
          // onMouseDown: () => {
          //   console.log("on item click", item);
          // },
        })}
      >
        {/* {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null} */}

        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: "hidden",
            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            backgroundColor,
            color: item.color,
            borderColor,
            opacity: (isModifiable && (item.isWhatIF == null || item.isWhatIF == true)) ? 0.5 : 1,
            borderStyle: (isModifiable && (item.isWhatIF == null || item.isWhatIF == true)) ? "dashed" : "solid",
            borderWidth: itemContext.selected & (isModifiable && (item.isWhatIF == null || item.isWhatIF == true)) ? 3 : 1,
            borderRadius: itemContext.selected & (isModifiable && (item.isWhatIF == null || item.isWhatIF == true)) ? 3 : 1,
            borderLeftWidth: itemContext.selected & (isModifiable && (item.isWhatIF == null || item.isWhatIF == true)) ? 3 : 1,
            borderRightWidth: itemContext.selected & (isModifiable && (item.isWhatIF == null || item.isWhatIF == true)) ? 3 : 1,
          }}
        >
          {itemContext.title}
        </div>

        {/* {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null} */}
      </div>
    );
  };

  return (
    <div className="chart-container">
      <h2>Expense</h2>

      {/* {console.log(typeof (groups, items))} */}
      {/* <h2>{groups}</h2> */}

      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment("2021-03-01").add(-3, "month")}
        defaultTimeEnd={moment("2021-08-01").add(3, "month")}
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
        canMove={isModifiable}
        stackItems
        itemRenderer={itemRenderer}
        onItemDoubleClick={ItemDoubleClick}
      >
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }}>
            Current details of the item.
            <br />
            Please change the value if you want.
            <RemoveItem
              items={items}
              selectedItemforRemove={matchItemforRemoveOREdit}
              setItemsHandler={setItemsHandler}
              isModifiable={isModifiable}
              setAnchorEl={setAnchorEl}
            />
            <EditItem
              items={items}
              projects={projects}
              selectedItemforEdit={matchItemforRemoveOREdit}
              setItemsHandler={setItemsHandler}
              isModifiable={isModifiable}
            />
          </Typography>
        </Popover>

        <TimelineMarkers>
          <TodayMarker></TodayMarker>
        </TimelineMarkers>
      </Timeline>
    </div>
  );
}

export default Expense;
