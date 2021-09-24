import React, { useState, useEffect } from "react";

export default function RemoveItem({ items, selectedItemforRemove, setItemsHandler, isModifiable }) {

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
            console.log("After Remove ======>",useitems);
        }
    }
    return (
        <div>
            <button onMouseDown={itemRemovefromExpense}>Delete</button>
        </div>
    )
}
