import React, { useState } from "react";
import { updateProjects } from "./services/functions/projectsQuery";
import { updateExpenseItems } from "./services/functions/expenseItemsQuery";
import { updateExpenseGroups } from "./services/functions/expenseGroupsQuery";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

function SubmitBtn({ groups, items, projects, setIsOpenHandler }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    setIsLoading(true);
    await updateExpenseItems(items);
    await updateProjects(projects);
    await updateExpenseGroups(groups);
    setIsLoading(false);
    setIsOpenHandler(false);
  };

  return (
    <>
      {
        <LoadingButton
          onClick={handleSubmit}
          endIcon={<SendIcon />}
          loading={isLoading}
          style={{ width: "100%", marginTop: "20px", padding: "14px" }}
          loadingPosition="end"
          variant="contained"
        >
          Submit
        </LoadingButton>
      }
    </>
  );
}

export default SubmitBtn;
