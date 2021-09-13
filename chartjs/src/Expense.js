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

function Expense() {
  const [isModifiable, setIsModifiable] = useState(false);
  const [groups, setGroups] = useState([
    { id: 1, title: "Reasearch Student" },
    { id: 2, title: "Reasearch Assistant" },
    { id: 3, title: "General Expense" },
    { id: 4, title: "Equipement Expense" },
  ]);
  const [items, setItems] = useState([
    {
      id: 1,
      group: 1,
      title: "Project 1",
      start_time: moment("2020-11-01"),
      end_time: moment("2020-12-01"),
      bgColor: "rgb(54, 162, 235)",
    },
    {
      id: 2,
      group: 2,
      title: "Project 1",
      start_time: moment("2021-03-01"),
      end_time: moment("2021-04-01"),
      bgColor: "rgb(54, 162, 235)",
    },
    {
      id: 3,
      group: 1,
      title: "Project 2",
      start_time: moment("2020-10-01"),
      end_time: moment("2020-11-01"),
      bgColor: "rgb(255, 99, 132)",
    },
    {
      id: 4,
      group: 2,
      title: "Project 2",
      start_time: moment("2021-03-01"),
      end_time: moment("2021-04-01"),
      bgColor: "rgb(255, 99, 132)",
    },
    {
      id: 5,
      group: 2,
      title: "Project 3",
      start_time: moment("2020-11-01"),
      end_time: moment("2020-12-01"),
      bgColor: "rgb(43, 178, 76)",
    },
    {
      id: 6,
      group: 1,
      title: "Project 3",
      start_time: moment("2021-02-01"),
      end_time: moment("2021-03-01"),
      bgColor: "rgb(43, 178, 76)",
    },
    {
      id: 7,
      group: 4,
      title: "Project 3",
      start_time: moment("2020-12-01"),
      end_time: moment("2020-12-02"),
      bgColor: "rgb(43, 178, 76)",
    },
  ]);

  const [beforeModifiedItems, setBeforeModifiedItems] = useState(null);

  const handleModify = () => {
    setIsModifiable(!isModifiable);
    setBeforeModifiedItems(items);
  };

  const handleRestore = () => {
    setIsModifiable(false);
    setItems(beforeModifiedItems);
  };

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const group = groups[newGroupOrder];
    setItems(
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
    setItems(
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
