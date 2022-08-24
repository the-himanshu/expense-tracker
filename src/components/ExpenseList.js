import ExpenseItem from "./ExpenseItem";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseChart from "./ExpenseChart";
import "../styles/ExpenseList.css";
import { useState } from "react";

function ExpenseList(props) {
  //get original expense list from props
  const expenseList = props.expenseList;

  //create filtered expense list and current filter value
  const [filteredExpenseList, setFilteredExpenseList] = useState([]);
  const [selectedFilterValue, setFilterValue] = useState("");

  if(expenseList.length !== filteredExpenseList.length && selectedFilterValue === 'None') {
    setFilteredExpenseList(expenseList)
  }

  //using conditional content mapping to return the required content
  let expenseListContent = <div className="no-expense-test">No Expenses found</div>;

  if (filteredExpenseList.length > 0) {
    expenseListContent = (
      <div>
        {filteredExpenseList.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            cost={expense.cost}
            date={expense.date}
          ></ExpenseItem>
        ))}
      </div>
    );
  }

  //this function will be triggered from inside the expense filter component
  function onFilterValueChange(value) {
    setFilterValue(value);

    //the main logic for filtering the expenses is written over here
    if(value !== 'None') {
      let expenseListOnFilterChange = expenseList.filter(
        (expense) => expense.date.toString().split(" ")[3] === value
      );
      setFilteredExpenseList(expenseListOnFilterChange);
    }
  }

  return (
    <div className="main-body">
      <div>
        <ExpenseFilter
          selected={selectedFilterValue}
          changeFilterValue={onFilterValueChange}
        ></ExpenseFilter>
      </div>
      <div className="expense-chart">
        <ExpenseChart expensesList={filteredExpenseList}></ExpenseChart>
      </div>
      {expenseListContent}
    </div>
  );
}

export default ExpenseList;
