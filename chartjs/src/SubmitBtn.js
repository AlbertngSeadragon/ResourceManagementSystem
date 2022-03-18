import React, { useState } from "react";
import { updateProjects } from "./services/functions/projectsQuery";
import { updateExpenseItems } from "./services/functions/expenseItemsQuery";
import { updateExpenseGroups } from "./services/functions/expenseGroupsQuery";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

function SubmitBtn({ groups, items, projects }) {
<<<<<<< HEAD
=======
  const [isLoading, setIsLoading] = useState(false);
>>>>>>> feature/add-preview-functionv2
  const handleSubmit = async () => {
    setIsLoading(true);
    await updateExpenseItems(items);
    await updateProjects(projects);
    await updateExpenseGroups(groups);
    setIsLoading(false);
  };

  return (
    <>
      {
        <LoadingButton
          onClick={handleSubmit}
          endIcon={<SendIcon />}
          loading={isLoading}
          style={{ width: "300px" }}
          loadingPosition="end"
          variant="contained"
        >
          Submit
        </LoadingButton>
      }
    </>
  );
}

<<<<<<< HEAD
export default SubmitBtn;
=======
export default SubmitBtn;
>>>>>>> feature/add-preview-functionv2
