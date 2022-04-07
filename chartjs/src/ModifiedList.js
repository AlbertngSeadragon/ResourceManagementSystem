import React, { useEffect, useState } from "react";
import ModifiedItem from "./ModifiedItem";
import Container from "@mui/material/Container";
import ItemCard from "./ItemCard";

function ModifiedList({
  modifiedItems,
  items,
  setItemsHandler,
  projects,
  isModifiable,
  setModifiedItemsHandler,
  groups,
  unmodifiedItems,
}) {
  console.log("ModifiedList", modifiedItems);
  //   useEffect(() => {}, [modifiedItems]);
  return (
    <Container>
      <h1>Modified</h1>
      {/* {console.log("modifiedItems", modifiedItems)} */}
      {/* <ModifiedItem modifiedItem={"hello"}></ModifiedItem>
      <ModifiedItem modifiedItem={"hello"}></ModifiedItem> */}
      {/* <h1>{modifiedItems}</h1> */}
      {/* {modifiedItems.map((modifiedItem) => {
        return <ModifiedItem modifiedItem={modifiedItem}></ModifiedItem>;
        console.log("card", modifiedItem);
        // console.log("called");
      })} */}
      {items.map((item) => {
        return (
          <ItemCard
            item={item}
            items={items}
            setItemsHandler={setItemsHandler}
            projects={projects}
            isModifiable={isModifiable}
            modifiedItems={modifiedItems}
            setModifiedItemsHandler={setModifiedItemsHandler}
            groups={groups}
            unmodifiedItems={unmodifiedItems}
          ></ItemCard>
        );
      })}
    </Container>
  );
}

export default ModifiedList;
