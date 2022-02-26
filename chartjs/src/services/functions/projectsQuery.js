import axios from "axios";
const {
  cloudServerLocation,
  updateServerLocation,
  api,
} = require("../config.json");

let getUrl = cloudServerLocation + api.project.getProject;
let updateUrl = updateServerLocation + api.project.updateProject;

const getProjects = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(getUrl)
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
      .post(updateUrl, {
        Projects: projects,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject("Rejected");
      });
  });
};

export { getProjects, updateProjects };
