import React from "react";
import moment from "moment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

function ModifiedItem({ modifiedItem }) {
  return (
    <Card
      sx={{
        marginTop: "5px",
        marginBottom: "5px",
        // backgroundColor:
        //   modifiedItem.action === "Add project"
        //     ? "orange"
        //     : modifiedItem.action === "Edit"
        //     ? "yellow"
        //     : modifiedItem.action === "Group changed"
        //     ? "gray"
        //     : modifiedItem.action === "Moved"
        //     ? "violet"
        //     : modifiedItem.action === "Add item"
        //     ? "cyan"
        //     : modifiedItem.action === "Remove"
        //     ? "red"
        //     : "white",
        backgroundColor: modifiedItem.bgColor,
      }}
      variant="outlined"
    >
      {/* <CardContent>Item id: {modifiedItem.id}</CardContent>
      <CardContent>Group id: {modifiedItem.group}</CardContent>
      <CardContent>Action: {modifiedItem.action}</CardContent>
      <CardContent>
        Start Date: {moment(modifiedItem.start_time).format("Do MMMM YYYY")}
      </CardContent> */}
      <CardContent>{modifiedItem.description}</CardContent>
    </Card>
  );
}

export default ModifiedItem;
