import React from "react";
import { updateProjects } from "./services/functions/projectsQuery";
import { updateExpenseItems } from "./services/functions/expenseItemsQuery";
import { updateExpenseGroups } from "./services/functions/expenseGroupsQuery";

function SubmitBtn({ groups, items, projects }) {
  const handleSubmit = async () => {
    await updateExpenseItems(items);
    await updateProjects(projects);
    await updateExpenseGroups(groups);
  };

  return (
    <button onClick={handleSubmit} style={{ width: "300px" }}>
      Submit
    </button>
  );
}

export default SubmitBtn;
