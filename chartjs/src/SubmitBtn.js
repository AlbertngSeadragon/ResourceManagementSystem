import React from "react";
import {
  getProjects,
  updateProjects,
} from "./services/functions/projectsQuery";
import {
  getExpenseItems,
  updateExpenseItems,
} from "./services/functions/expenseItemsQuery";
import {
  getExpenseGroups,
  updateExpenseGroups,
} from "./services/functions/expenseGroupsQuery";

function submitBtn({ groups, items, projects }) {
  const handleSubmit = async () => {
    await updateProjects(projects);
    await updateExpenseGroups(groups);
    await updateExpenseItems(items);
  };

  return (
    <button onClick={handleSubmit()} style={{ width: "300px" }}>
      Submit
    </button>
  );
}

export default submitBtn;