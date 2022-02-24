import axios from "axios";
const { cloudServerLocation, api } = require("../config.json");

let url = cloudServerLocation + api.project.getProject;

const getProjects = () => {
  return new Promise((resolve, reject) => {
    try {
      axios.get(url).then((res) => {
        resolve(res.data);
      });
    } catch {
      reject("Rejected");
    }
  });
};

const updateProjects = (projects) => {
  return new Promise((resolve, reject) => {
    try {
      axios.get(url).then((res) => {
        resolve(res.data);
      });
    } catch {
      reject("Rejected");
    }
  });
};

export { getProjects, updateProjects };
