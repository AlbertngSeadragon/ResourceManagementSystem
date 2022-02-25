import axios from "axios";
const { cloudServerLocation, api } = require("../config.json");

let url = cloudServerLocation + api.project.getProject;

const getProjects = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject("Rejected");
      });
  });
};

const updateProjects = (projects) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject("Rejected");
      });
  });
};

export { getProjects, updateProjects };
