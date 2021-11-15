import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

function ModifiedItem({ modifiedItem }) {
  return (
    <Card sx={{ marginTop: "5px", marginBottom: "5px" }} variant="outlined">
      <CardContent>{modifiedItem}</CardContent>
    </Card>
  );
}

export default ModifiedItem;
