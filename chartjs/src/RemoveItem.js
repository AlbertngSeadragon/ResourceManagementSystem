import React, { useState, useEffect } from "react";
import "./RemoveItem.css"

export default function RemoveItem({ items, selectedItemforRemove, setItemsHandler, isModifiable, setAnchorEl}) {

    const itemRemovefromExpense = () => {
        if (isModifiable){
            let useitems = items
            console.log("Removeitemjs items", useitems);
            console.log("Removeitemjs selectedItem", selectedItemforRemove);
            for (let i = 0; i < useitems.length; i++) {
                if (useitems[i].id === selectedItemforRemove.id) {
                    useitems = useitems.filter(item => item.id !== selectedItemforRemove.id);
                    let j = i;
                    //console.log("after", useitems[i].id, selectedItem.id)
                    while ((j) < useitems.length) {
                        useitems[j].id = useitems[j].id - 1;
                        console.log(useitems[j]);
                        j++;
                    }
                    break;
                }
            }
            setItemsHandler(useitems)
            setAnchorEl(null); //Remove  the small box
            console.log("After Remove ======>",useitems);
        }
    }
    return (
        <div className="RemoveButton">
            <button onMouseDown={itemRemovefromExpense}>Delete</button>
        </div>
    )
}
