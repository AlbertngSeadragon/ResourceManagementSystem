import React, { useState, useEffect } from "react";

export default function RemoveItem({ items, selectedItemforRemove, setItemsHandler }) {

    const itemRemovefromExpense = () => {
        console.log("Removeitemjs items", items);
        console.log("Removeitemjs selectedItem", selectedItemforRemove);
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === selectedItemforRemove.id) {
                items = items.filter(item => item.id !== selectedItemforRemove.id);
                let j = i;
                //console.log("after", items[i].id, selectedItem.id)
                while ((j) < items.length) {
                    items[j].id = items[j].id - 1;
                    console.log(items[j]);
                    j++;
                }
                break;
            }
        }
        setItemsHandler(items)
        //console.log("After Remove ======>",items);
    }
    return (
        <div>
            <button onClick={itemRemovefromExpense}>Delete</button>
        </div>
    )
}
