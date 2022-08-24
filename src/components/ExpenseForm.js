import { useState } from "react"
import "../styles/ExpenseForm.css"

function ExpenseForm(props) {
    const [currentTitleValue, setTitle] = useState('')
    const [currentCostValue, setCost] = useState('')
    const [currentDateValue, setDate] = useState('')

    function titleChangeHandler(event) {
        setTitle(event.target.value)
    }

    function costChangeHandler(event) {
        setCost(event.target.value)
    }

    function dateChangeHandler(event) {
        setDate(event.target.value)
    }

    function createNewExpense(event) {
        //it will prevent the normal execution of the submit event
        event.preventDefault()

        const newExpense = {
            id: Math.random(),
            title: currentTitleValue,
            cost: parseInt(currentCostValue),
            date: new Date(currentDateValue)
        }
        
        //trigger the event in the parent component
        props.onSaveExpenseData(newExpense)
        
        //set all values as zero
        setTitle('')
        setCost('')
        setDate(new Date())
    }

    return (
        <form className="expense-form" onSubmit={createNewExpense}>
            <div className="expense-form-input-field">
                <label>Title</label>
                <input type="text" value={currentTitleValue} onChange={titleChangeHandler}></input>
            </div>
            <div className="expense-form-input-field">
                <label>Cost</label>
                <input type="Number" value={currentCostValue} min="1" step="1" onChange={costChangeHandler}></input>
            </div>
            <div className="expense-form-input-field">
                <label>Date</label>
                <input type="date" value={currentDateValue} onChange={dateChangeHandler}></input>
            </div>
            <div className="expense-form-action">
                <button className="expense-form-button">Cancel</button>
                <button className="expense-form-button" type="submit">Add Expense</button>
            </div>
        </form>
    )
}

export default ExpenseForm