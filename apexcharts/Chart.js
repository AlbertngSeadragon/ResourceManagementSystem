import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ApexCharts from "apexcharts";

function Chart() {
  useEffect(() => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=HOUST&file_type=json&api_key=35715974767bbc15c604f64d409cf15c"
      )
      .then((res) => {
        var options = {
          series: [
            {
              name: "Desktops",
              data: res.data.observations.map((row) => row.value),
            },
          ],
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: "Product Trends by Month",
            align: "left",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
            ],
          },
        };
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
        // console.log(res.data.observations);
      });
  }, []);

  return <div id="chart"></div>;
}

export default Chart;
