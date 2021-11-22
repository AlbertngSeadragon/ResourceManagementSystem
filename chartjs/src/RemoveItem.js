import React, { useState, useEffect } from "react";
import "./RemoveItem.css";

export default function RemoveItem({
  items,
  selectedItemforRemove,
  setItemsHandler,
  isModifiable,
  setAnchorEl,
  setModifiedItemsHandler,
  modifiedItems,
}) {
  const itemRemovefromExpense = () => {
    if (isModifiable) {
      let useitems = items;
      console.log("Removeitemjs items", useitems);
      console.log("Removeitemjs selectedItem", selectedItemforRemove);
      for (let i = 0; i < useitems.length; i++) {
        if (useitems[i].id === selectedItemforRemove.id) {
          useitems = useitems.filter(
            (item) => item.id !== selectedItemforRemove.id
          );
          setModifiedItemsHandler([
            ...modifiedItems,
            {
              action: "Remove",
              group: items[i].group,
              id: items[i].id,
              bgColor: items[i].bgColor,
              start_time: items[i].start_time,
              description: `Item ${items[i].description} is removed.`,
            },
          ]);
          let j = i;
          //console.log("after", useitems[i].id, selectedItem.id)
          while (j < useitems.length) {
            useitems[j].id = useitems[j].id - 1;
            console.log(useitems[j]);
            j++;
          }
          break;
        }
      }
      setItemsHandler(useitems);
      setAnchorEl(null); //Remove  the small box
      console.log("After Remove ======>", useitems);
    }
  };
  return (
    <div>
      <button className="RemoveButton" onMouseDown={itemRemovefromExpense}>
        Delete
      </button>
    </div>
  );
}
