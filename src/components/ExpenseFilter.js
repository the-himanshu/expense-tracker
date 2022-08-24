import { useState } from "react";
import "../styles/ExpenseFilter.css"

function ExpenseFilter(props) {
  const [selectedFilterValue, setFilterValue] = useState(props.selected)

  //this function will handle the change in filter value
  //and also trigger the event for same in the parent component
  function filterChangeHandler(event) {
    setFilterValue(event.target.value)
    props.changeFilterValue(event.target.value)
  }

  return (
    <div className='expense-filter'>
        <label className="expense-filter-label">Filter by year</label>
        <select className="expense-filter-dropdown" value={selectedFilterValue} onChange={filterChangeHandler}>
          <option value='None'>None</option>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
        </select>
    </div>
  );
}

export default ExpenseFilter
