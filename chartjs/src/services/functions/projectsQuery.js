import axios from "axios";
const { cloudServerLocation, api } = require("../config.json");

let url = cloudServerLocation + api.project.getProject;

async function getProjects() {
  axios.get(url).then((res) => {
    return res.body.Projects;
  });
}

async function updateProjects(projects) {
  axios.post(url).then((res) => {
    return res.body.Projects;
  });
}

export { getProjects, updateProjects };
