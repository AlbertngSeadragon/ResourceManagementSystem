import React from "react";
import moment from "moment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

function ModifiedItem({ modifiedItem }) {
  return (
    <Card sx={{ marginTop: "5px", marginBottom: "5px" }} variant="outlined">
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
