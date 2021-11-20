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
    // console.log(balanceChartPlots, projects);
    // projects.forEach((project, index) => {
    //   localPlots.push({
    //     name: project.projectName,
    //     data: balanceChartPlots
    //       .filter((plot) => project.projectName === plot.projectName)
    //       .map((plot) => {
    //         // TODO: Sort the plot.date
    //         return [plot.date, plot.balance];
    //       }),
    //     type: "line",
    //     step: "end",
    //   });
    // });
    // let tmp = projects.map((project) => {
    //   return {
    //     transform: [
    //       {
    //         type: "filter",
    //         config: {
    //           dimension: "projectName",
    //           value: project.projectName,
    //         },
    //       },
    //       {
    //         type: "sort",
    //         config: [
    //           { dimension: "balance", order: "desc" },
    //           { dimension: "date", order: "asc", parser: "time" },
    //         ],
    //       },
    //     ],
    //   };
    // });
    // console.log("tmp", ...tmp);

    // let tmp = projects.forEach((project, index) => {
    //   return {
    //     type: "line",
    //     step: "end",
    //     encode: { x: 1, y: 2 },
    //     datasetIndex: index + 1,
    //   };
    // });

    // console.log("tmp", tmp);

    setPlots(balanceChartPlots);
    // console.log("Plots", plots);
  }, [balanceChartPlots, projects]);

  useEffect(() => {
    // console.log("Plots useEffect called", plots);
    if (plots.length !== 0 && projects.length !== 0) {
      // console.log("Plots useEffect", plots);
      let newChart;
      if (chart === null) {
        newChart = echarts.init(myChart.current);
      } else {
        newChart = chart;
      }

      newChart.setOption({
        title: {
          text: "Balance Chart",
          textStyle: {
            color: "#000",
          },
        },
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
          axisPointer: { label: { precision: "0" } },
          // formatter: (params) => {
          //   return projects.filter((project) => project.projectName != "Today").map((project) => {
          //     return `
          //     Breakdown <br />
          //     Remain Balance: ${project.balance}<br />
          //     Expense: ${project.expense} <br />
          //     Description: <br />
          //     `;
          //   })
          // },
          formatter: (params) => {
              return `
              <b>Breakdown</b> <br />
              Remain Balance: ${params.data.balance}<br />
              ${params.data.expenseItem != null ? "Expense Item: " + params.data.expenseItem[0].title + "<br />" : ''}
              ${params.data.expense != null ? "Expense: " + params.data.expense + "<br />" : ''}
              ${params.data.description != null ? "Description: " + params.data.description + "<br />" : ''}
              `;
          },
          // formatter: "{c}",
        },
        legend: {
          type: "plain",
          orient: "horizontal",
          top: 10,
          data: projects.filter((project) => project.projectName != "Today").map((project) => project.projectName),
          // itemStyle: {
          //   color: "#000",
          // },
          // data: ["Project 1", "Project 2", "Project 3"],
        },
        dataZoom: {
          type: "inside",
          minSpan: 2, //Zoom to two day only
          // Set filterMode to "none" so that the lines connecting the nodes will
          // not disappear during zooming
          // Reference: https://github.com/apache/echarts/issues/3637
          filterMode: "none",
        },
        xAxis: {
          type: "time",
          splitLine: { show: true },
          axisLabel: {
            color: "#000",
            fontStyle: "normal",
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: function (value, index) {
              return "$" + value;
            },
            color: "#000",
          },
        },

        dataset: [
          {
            dimensions: ["projectName", "date", "balance"],
            source: plots,
          },

          ...projects.map((project) => {
            return {
              transform: [
                {
                  type: "filter",
                  config: {
                    dimension: "projectName",
                    value: project.projectName,
                  },
                },
                {
                  type: "sort",
                  config: [
                    { dimension: "balance", order: "desc" },
                    { dimension: "date", order: "asc", parser: "time" },
                  ],
                },
              ],
            };
          }),

          // {
          //   transform: [
          //     {
          //       type: "filter",
          //       config: { dimension: "projectName", value: "Project 1" },
          //     },
          //     {
          //       type: "sort",
          //       config: [
          //         { dimension: "balance", order: "desc" },
          //         { dimension: "date", order: "asc", parser: "time" },
          //       ],
          //     },
          //   ],
          // },
          // {
          //   transform: [
          //     {
          //       type: "filter",
          //       config: { dimension: "projectName", value: "Project 2" },
          //     },
          //     {
          //       type: "sort",
          //       config: [
          //         { dimension: "balance", order: "desc" },
          //         { dimension: "date", order: "asc", parser: "time" },
          //       ],
          //     },
          //   ],
          // },
          // {
          //   transform: [
          //     {
          //       type: "filter",
          //       config: { dimension: "projectName", value: "Project 3" },
          //     },
          //     {
          //       type: "sort",
          //       config: [
          //         { dimension: "balance", order: "desc" },
          //         { dimension: "date", order: "asc", parser: "time" },
          //       ],
          //     },
          //   ],
          // },
        ],

        series: [
          ...projects.map((project, index) => {
            return {
              name: project.projectName,
              type: "line",

              step: "end",
              encode: { x: 1, y: 2 },
              datasetIndex: index + 1,
              color: project.bgColor,
              markPoint: {
                data: project.projectName == "Today" ? null : [{
                  type : "min",
                  symbol: "diamond",
                  symbolSize: 20
                }]
              },
              // markLine: {
              //   data: [{ name: "Today", xAxis: "2021-09-01" }],
              // },
            };
          }),
        ],
        // series: [
        //   {
        //     type: "line",
        //     step: "end",
        //     encode: { x: 1, y: 2 },
        //     datasetIndex: 1,
        //   },
        //   {
        //     type: "line",
        //     step: "end",
        //     encode: { x: 1, y: 2 },
        //     datasetIndex: 2,
        //   },
        //   {
        //     type: "line",
        //     step: "end",
        //     encode: { x: 1, y: 2 },
        //     datasetIndex: 3,
        //   },
        // ],
      });
      setChart(newChart);
    }
  }, [plots, projects]);
  return (
    <div className="chart-container">
      <div ref={myChart} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}

export default Balance;
