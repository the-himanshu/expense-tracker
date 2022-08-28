import ExpenseItem from "./ExpenseItem";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseChart from "./ExpenseChart";
import "../styles/ExpenseList.css";
import { useState } from "react";
import { jsPDF } from "jspdf";
import moment from "moment";

function compareObjects(a, b) {
  const A = moment(a.date).utc().format('DD-MM-YYYY');
  const B = moment(b.date).utc().format('DD-MM-YYYY');
  const isAfter = moment(A).isAfter(moment(B));
  if ( !isAfter ){
    return -1;
  }
  if ( isAfter ){
    return 1;
  }
  return 0;
}

function ExpenseList(props) {
  //get original expense list from props
  let expenseList = props.expenseList;
  expenseList = expenseList.sort(compareObjects)

  //create filtered expense list and current filter value
  const [filteredExpenseList, setFilteredExpenseList] = useState([]);
  const [selectedFilterValue, setFilterValue] = useState('None');

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
      <button className="generate-report-button" onClick={generateReportHandler}>Generate Report</button>
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

  //function to download a pdf report containing all expenses
  function generateReportHandler() {
    var doc = new jsPDF('p', 'in', [12 ,16]);
    doc.setFontSize(12);
    doc.setFont("Helvetica");
    let textArray = ["PDF Report for expenses"]

    filteredExpenseList.forEach((expenseData, i) => {
      let text = "Date: " + expenseData.date + "     |    Title: " + expenseData.title + "     |    Cost: Rs. " + expenseData.cost + ""
      textArray.push(text)
    })

    doc.text(textArray, 1, 1)
    doc.save('Report.pdf');
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
