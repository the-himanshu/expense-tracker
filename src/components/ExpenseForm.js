import { useState } from "react"
import "../styles/ExpenseForm.css"

function ExpenseForm(props) {
    const [currentTitleValue, setTitle] = useState('')
    const [currentCostValue, setCost] = useState('')
    const [currentDateValue, setDate] = useState('')
    const [isCostValid, setIsCostValid] = useState(1)
    const [isTitleValid, setIsTitleValid] = useState(1)

    const placeholderArray = ['Please enter a valid amount', '', 'Please enter a valid title', '']

    function titleChangeHandler(event) {
        setTitle(event.target.value)
    }

    function costChangeHandler(event) {
        setCost(event.target.value.trim())
    }

    function dateChangeHandler(event) {
        setDate(event.target.value)
    }

    function createNewExpense(event) {
        //it will prevent the normal execution of the submit event
        event.preventDefault()
        let breakFlag = false

        if(!currentCostValue || currentCostValue === 0) {
            setIsCostValid(0)
            breakFlag = true
        } else if(isCostValid === 0) {
            setIsCostValid(1)
        }

        if(!currentTitleValue || currentTitleValue.trim().length === 0) {
            setIsTitleValid(0)
            breakFlag = true
        } else if(isTitleValid === 0) {
            setIsTitleValid(1)
        }

        if(breakFlag) return

        const newExpense = {
            id: Math.random(),
            title: currentTitleValue,
            cost: parseInt(currentCostValue),
            date: new Date(currentDateValue)
        }
        console.log("🚀 ~ file: ExpenseForm.js ~ line 49 ~ createNewExpense ~ newExpense", newExpense)
        
        //trigger the event in the parent component
        props.onSaveExpenseData(newExpense)
        
        //set all values as zero
        setTitle('')
        setCost('')
        setDate(new Date())
    }

    return (
        <form className="expense-form" onSubmit={createNewExpense}>
            <div className={`expense-form-input-field ${isTitleValid == 1 ? '' : 'invalid'}`}>
                <label>Title</label>
                <input type="text" value={currentTitleValue} onChange={titleChangeHandler} placeholder={placeholderArray[isTitleValid + 2]}></input>
            </div>
            <div className={`expense-form-input-field ${isCostValid == 1 ? '' : 'invalid'}`}>
                <label>Cost</label>
                <input type="Number" value={currentCostValue} min="1" step="1" onChange={costChangeHandler} placeholder={placeholderArray[isCostValid]}></input>
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