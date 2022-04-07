import React, { useState } from "react";
import { updateProjects } from "./services/functions/projectsQuery";
import { updateExpenseItems } from "./services/functions/expenseItemsQuery";
import { updateExpenseGroups } from "./services/functions/expenseGroupsQuery";
import { sendEmail } from "./services/functions/sendEmail";

import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

function SubmitBtn({
  groups,
  items,
  projects,
  setIsOpenHandler,
  unmodifiedItems,
  modifiedItems,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const createEmailContent = (modifiedItems) => {
    const addedItems =
      `<h1>Added items</h1>
    <table style="border: 1px solid;">
      <tr style="border: 1px solid;">
        <th style="border: 1px solid;">Project Name</th>
        <th style="border: 1px solid;">Item Name</th>
        <th style="border: 1px solid;">Item type</th>
        <th style="border: 1px solid;">Expense</th>
        <th style="border: 1px solid;">Start Date</th>
        <th style="border: 1px solid;">End Date</th>
      </tr>` +
      modifiedItems
        .filter((item) => item.action === "Add item")
        .map((item) => {
          return `<tr>
            <td style="border: 1px solid;">${item.projectName}</td>
            <td style="border: 1px solid;">${item.itemName}</td>
            <td style="border: 1px solid;">${item.itemType}</td>
            <td style="border: 1px solid;">${item.expense}</td>
            <td style="border: 1px solid;">${item.start_time}</td>
            <td style="border: 1px solid;"></td>
          </tr>`;
        })
        .join("") +
      `</table>`;

    const editedItems =
      `<h1>Edited items</h1>` +
      modifiedItems
        .filter((item) => item.action === "Edit")
        .map((item, index) => {
          const unmodifiedItem = unmodifiedItems.filter(
            (unmodifiedItem) => unmodifiedItem.id === item.id
          )[0];
          console.log("unmodifiedItem", unmodifiedItem);
          return `
          <h2>${index + 1}</h2>
          <h3>Before edit</h2>
          <table>
            <tr style="border: 1px solid;">
              <th style="border: 1px solid;">Project Name</th>
              <th style="border: 1px solid;">Item Name</th>
              <th style="border: 1px solid;">Item type</th>
              <th style="border: 1px solid;">Expense</th>
              <th style="border: 1px solid;">Start Date</th>
              <th style="border: 1px solid;">End Date</th>
            </tr>
            <tr>
              <td style="border: 1px solid;">${unmodifiedItem.title}</td>
              <td style="border: 1px solid;">${unmodifiedItem.description}</td>
              <td style="border: 1px solid;">${
                groups[unmodifiedItem.group - 1].title
              }</td>
              <td style="border: 1px solid;">${unmodifiedItem.expense}</td>
              <td style="border: 1px solid;">${unmodifiedItem.start_time}</td>
              <td style="border: 1px solid;"></td>
            </tr>
          </table>
          <h3>After edit</h2>
          <table>
            <tr style="border: 1px solid;">
              <th style="border: 1px solid;">Project Name</th>
              <th style="border: 1px solid;">Item Name</th>
              <th style="border: 1px solid;">Item type</th>
              <th style="border: 1px solid;">Expense</th>
              <th style="border: 1px solid;">Start Date</th>
              <th style="border: 1px solid;">End Date</th>
            </tr>
            <tr>
              <td style="border: 1px solid;">${item.projectName}</td>
              <td style="border: 1px solid;">${item.itemName}</td>
              <td style="border: 1px solid;">${item.itemType}</td>
              <td style="border: 1px solid;">${item.expense}</td>
              <td style="border: 1px solid;">${item.start_time}</td>
              <td style="border: 1px solid;"></td>
            </tr>
          </table>
          `;
        })
        .join("");

    const removedItems =
      `<h1>Removed items</h1>
    <table style="border: 1px solid;">
      <tr style="border: 1px solid;">
        <th style="border: 1px solid;">Project Name</th>
        <th style="border: 1px solid;">Item Name</th>
        <th style="border: 1px solid;">Item type</th>
        <th style="border: 1px solid;">Expense</th>
        <th style="border: 1px solid;">Start Date</th>
        <th style="border: 1px solid;">End Date</th>
      </tr>` +
      modifiedItems
        .filter((item) => item.action === "Remove")
        .map((item) => {
          return `<tr>
            <td style="border: 1px solid;">${item.projectName}</td>
            <td style="border: 1px solid;">${item.itemName}</td>
            <td style="border: 1px solid;">${item.itemType}</td>
            <td style="border: 1px solid;">${item.expense}</td>
            <td style="border: 1px solid;">${item.start_time}</td>
            <td style="border: 1px solid;"></td>
          </tr>`;
        })
        .join("") +
      `</table>`;

    const htmlTemplate = addedItems + editedItems + removedItems;
    return htmlTemplate;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await sendEmail({ content: createEmailContent(modifiedItems) });
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
