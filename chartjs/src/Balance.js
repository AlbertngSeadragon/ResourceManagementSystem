import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import zoomPlugin from "chartjs-plugin-zoom";
import "./Balance.css";
import axios from "axios";
import * as echarts from "echarts";

function Balance({ balanceChartPlots, projects }) {
  const myChart = useRef(null);
  const color = ["rgb(54, 162, 235)", "rgb(255, 159, 64)", "rgb(43, 178, 76)"];
  const [plots, setPlots] = useState([]);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    let localPlots = [];
    console.log(balanceChartPlots, projects);
    projects.forEach((project, index) => {
      localPlots.push({
        name: project.projectName,
        data: balanceChartPlots
          .filter((plot) => project.projectName === plot.projectName)
          .map((plot) => {
            // TODO: Sort the plot.date
            return [plot.date, plot.balance];
          }),
        type: "line",
        step: "end",
      });
    });
    console.log("localPlots", localPlots);

    setPlots(localPlots);
    console.log("Plots", plots);
  }, [balanceChartPlots, projects]);

  useEffect(() => {
    console.log("Plots useEffect called", plots);
    if (plots.length !== 0 && plots[0].data.length !== 0) {
      console.log("Plots useEffect", plots);
      let newChart;
      if (chart === null) {
        newChart = echarts.init(myChart.current);
      } else {
        newChart = chart;
      }

      newChart.setOption({
        title: {
          text: "Balance Chart",
        },
        tooltip: {},
        xAxis: {
          type: "time",
        },
        yAxis: {
          type: "value",
        },
        series: plots,
      });
      setChart(newChart);
    }
  }, [plots]);
  return (
    <div className="chart-container">
      <div ref={myChart} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}

export default Balance;
