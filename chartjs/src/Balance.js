import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import zoomPlugin from "chartjs-plugin-zoom";
import "./Balance.css";

function Balance() {
  let project1 = [
    { balance: 500000, date: "2020-09-01" },
    { balance: 400000, date: "2020-11-01" },
    { balance: 400000, date: "2021-01-01" },
    { balance: 300000, date: "2021-02-01" },
    { balance: 300000, date: "2021-03-01" },
    { balance: 200000, date: "2021-04-01" },
  ];
  let project2 = [
    { balance: 500000, date: "2020-09-01" },
    { balance: 450000, date: "2020-10-01" },
    { balance: 450000, date: "2021-01-01" },
    { balance: 210000, date: "2021-02-01" },
    { balance: 210000, date: "2021-02-15" },
    { balance: 130000, date: "2021-03-01" },
  ];
  let project3 = [
    { balance: 400000, date: "2020-09-01" },
    { balance: 350000, date: "2020-10-17" },
    { balance: 350000, date: "2021-01-20" },
    { balance: 250000, date: "2021-02-11" },
    { balance: 250000, date: "2021-02-15" },
    { balance: 100000, date: "2021-03-01" },
  ];
  useEffect(() => {
    Chart.register(zoomPlugin);
    const data = {
      datasets: [
        {
          label: "Project1",
          data: project1.map((project) => {
            return { x: project.date, y: project.balance };
          }),
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
        },

        {
          label: "Project2",
          data: project2.map((project) => {
            return { x: project.date, y: project.balance };
          }),
          backgroundColor: "rgb(54, 162, 235)",
          borderColor: "rgb(54, 162, 235)",
        },
        {
          label: "Project3",
          data: project3.map((project) => {
            return { x: project.date, y: project.balance };
          }),
          backgroundColor: "rgb(255, 159, 64)",
          borderColor: "rgb(255, 159, 64)",
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Chart.js Line Chart",
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: "x",
            },
            pan: {
              enabled: true,
              mode: "x",
            },
          },
        },
        scales: {
          x: {
            type: "time",
            time: {
              unit: "month",
              stepSize: 0.5,
            },
          },
          y: {
            suggestedMin: 0,
            suggestedMax: 500000,
          },
        },
      },
    };

    var myChart = new Chart(document.getElementById("myChart"), config);
  }, []);

  return (
    <div className="chart-container">
      <canvas id="myChart"></canvas>
    </div>
  );
}

export default Balance;
