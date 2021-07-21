import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import zoomPlugin from "chartjs-plugin-zoom";
import "./Balance.css";
import axios from "axios";

function Balance() {
  const [projects, setProjects] = useState([]);
  const color = ["rgb(54, 162, 235)", "rgb(255, 159, 64)", "rgb(43, 178, 76)"];
  let project1 = [
    { balance: 550000, date: "2020-09-01" },
    { balance: 400000, date: "2020-11-01" },
    { balance: 300000, date: "2021-03-01" },
  ];
  let project2 = [
    { balance: 500000, date: "2020-09-01" },
    { balance: 450000, date: "2020-10-01" },
    { balance: 150000, date: "2021-03-01" },
  ];
  let project3 = [
    { balance: 400000, date: "2020-09-01" },
    { balance: 350000, date: "2020-11-01" },
    { balance: 300000, date: "2020-12-01" },
    { balance: 250000, date: "2021-02-01" },
    { balance: 250000, date: "2021-03-01" },
  ];

  // const getData = async () => {
  //   const response = await fetch("http://localhost:3001/api/balance");
  //   const projectData = await response.json();
  //   // const projectId = new Set(res.data.map((project) => project.project));
  //   // let projectData = [...projectId].map((id) => {
  //   //   return {
  //   //     label: `Project${id}`,
  //   //     backgroundColor: color[id - 1],
  //   //     borderColor: color[id - 1],
  //   //     data: res.data
  //   //       .filter((project) => project.project === id)
  //   //       .map((project) => {
  //   //         return { x: project.date, y: project.balance };
  //   //       }),
  //   //   };
  //   // });
  //   // setProjects(projectData);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    Chart.register(zoomPlugin);
    // axios
    //   .get("http://localhost:3001/api/balance")
    //   .then((res) => {
    //     const projectId = new Set(res.data.map((project) => project.project));
    //     // console.log(projectId);
    //     let projectData = [...projectId].map((id) => {
    //       return {
    //         label: `Project${id}`,
    //         backgroundColor: color[id - 1],
    //         borderColor: color[id - 1],
    //         data: res.data
    //           .filter((project) => project.project === id)
    //           .map((project) => {
    //             return { x: project.date, y: project.balance };
    //           }),
    //       };
    //     });
    //     setProjects(projectData);
    //     console.log(projects);
    //   })

    //   .catch((err) => {
    //     console.log(err);
    //   });

    const data = {
      datasets: [
        {
          label: "Project1",
          data: project1.map((project) => {
            return { x: project.date, y: project.balance };
          }),
          backgroundColor: "rgb(54, 162, 235)",
          borderColor: "rgb(54, 162, 235)",

          stepped: true,
        },

        {
          label: "Project2",
          data: project2.map((project) => {
            return { x: project.date, y: project.balance };
          }),
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          stepped: true,
        },
        {
          label: "Project3",
          data: project3.map((project) => {
            return { x: project.date, y: project.balance };
          }),
          backgroundColor: "rgb(43, 178, 76)",
          borderColor: "rgb(43, 178, 76)",
          stepped: true,
        },
      ],
      // datasets: projects,
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
            text: "Balance Chart",
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
            ticks: {
              callback: function (value, index, values) {
                return "$" + value;
              },
            },
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
