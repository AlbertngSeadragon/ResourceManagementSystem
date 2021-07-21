import React from "react";
import Balance from "./Balance";
import Expense from "./Expense";
import Form from "./Form";

function Charts() {
  return (
    <div>
      <Balance></Balance>
      {/* <Form></Form> */}
      <Expense></Expense>
    </div>
  );
}

export default Charts;
