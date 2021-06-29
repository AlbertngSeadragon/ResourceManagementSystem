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

function Expense() {
  const [groups, setGroups] = useState([
    { id: 1, title: "Research Student 1" },
    { id: 2, title: "Research Student 2" },
    { id: 3, title: "General Expense" },
  ]);
  const [items, setItems] = useState([
    {
      id: 1,
      group: 1,
      title: "Proj. 1",
      start_time: moment("2021-03-01"),
      end_time: moment("2021-05-01"),
    },
    {
      id: 2,
      group: 2,
      title: "Proj. 2",
      start_time: moment("2021-04-01"),
      end_time: moment("2021-05-01"),
    },
    {
      id: 3,
      group: 3,
      title: "Proj. 3",
      start_time: moment("2021-05-01"),
      end_time: moment("2021-08-01"),
    },
  ]);

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
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment("2021-03-01").add(-3, "month")}
        defaultTimeEnd={moment("2021-08-01").add(3, "month")}
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
        canMove={true}
        stackItems
      >
        <TimelineMarkers>
          <TodayMarker></TodayMarker>
        </TimelineMarkers>
      </Timeline>
    </div>
  );
}

export default Expense;
