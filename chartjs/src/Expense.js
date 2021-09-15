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

function Expense({ items, groups, setItemsHandler, setGroupsHandler }) {
  const [isModifiable, setIsModifiable] = useState(false);

  const [beforeModifiedItems, setBeforeModifiedItems] = useState(null);

  const handleModify = () => {
    setIsModifiable(!isModifiable);
    setBeforeModifiedItems(items);
  };

  const handleRestore = () => {
    setIsModifiable(false);
    setItemsHandler(beforeModifiedItems);
  };

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const group = groups[newGroupOrder];
    setItemsHandler(
      items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              start_time: dragTime,
              end_time: dragTime + (item.end_time - item.start_time),
              group: group.id,
            }
          : item
      )
    );
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

  return (
    <div className="chart-container">
      <h2>Expense</h2>
      <h2>isModifiable: {isModifiable.toString()}</h2>
      <button onClick={handleModify}>Modify</button>
      {isModifiable && <button onClick={handleRestore}>Restore</button>}

      {console.log(typeof (groups, items))}
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
        backgroundColor
      >
        <TimelineMarkers>
          <TodayMarker></TodayMarker>
        </TimelineMarkers>
      </Timeline>
    </div>
  );
}

export default Expense;
