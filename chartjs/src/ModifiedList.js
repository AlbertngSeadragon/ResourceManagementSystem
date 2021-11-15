import React, { useEffect } from "react";
import ModifiedItem from "./ModifiedItem";
import Container from "@mui/material/Container";

function ModifiedList({ modifiedItems }) {
  //   console.log("ModifiedList", modifiedItems);
  //   useEffect(() => {}, [modifiedItems]);
  return (
    <Container>
      <h1>Modified</h1>
      {/* {console.log("modifiedItems", modifiedItems)} */}
      {/* <ModifiedItem modifiedItem={"hello"}></ModifiedItem>
      <ModifiedItem modifiedItem={"hello"}></ModifiedItem> */}
      {/* <h1>{modifiedItems}</h1> */}
      {modifiedItems.map((modifiedItem) => {
        return <ModifiedItem modifiedItem={modifiedItem}></ModifiedItem>;
        console.log("card", modifiedItem);
        // console.log("called");
      })}
    </Container>
  );
}

export default ModifiedList;
