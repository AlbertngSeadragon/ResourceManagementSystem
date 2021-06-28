import React, { useEffect } from "react";
import { SvelteGantt, SvelteGanttTable } from "svelte-gantt";
import moment from "moment";
import Gantt from "frappe-gantt";
import "frappe-gantt/dist/frappe-gantt.css";

function Expense() {
  useEffect(() => {
    var tasks = [
      {
        id: "Project 1",
        name: "Project 1",
        start: "2020-09-01",
        end: "2020-10-01",
        progress: 30,
      },
      {
        id: "Project 2",
        name: "Project 2",
        start: "2020-10-01",
        end: "2020-11-01",
        progress: 30,
      },
      {
        id: "Project 3",
        name: "Project 3",
        start: "2020-11-01",
        end: "2021-01-01",
        progress: 30,
      },
    ];
    var gantt = new Gantt("#gantt", tasks, { view_mode: "Week" });
  });

  return (
    <div className="chart-container">
      <h2>Expense</h2>
      <div id="gantt"></div>
    </div>
  );
}

export default Expense;
