import ExpenseItem from "./ExpenseItem"
import "../styles/ExpenseList.css"

function ExpenseList() {
    const expenseList = [
        {
            "title" : "Car Parking",
            "cost" : "Rs. 120",
            "date" : new Date(2022, 2, 2)
        },
        {
            "title" : "Movie Night",
            "cost" : "Rs. 1800",
            "date" : new Date(2022, 2, 14)
        }
    ]

    return (
        <div>
        <div className="expense-item-outer"><ExpenseItem date={expenseList[0].date} title={expenseList[0].title} cost={expenseList[0].cost}></ExpenseItem></div>
        <div className="expense-item-outer"><ExpenseItem date={expenseList[1].date} title={expenseList[1].title} cost={expenseList[1].cost}></ExpenseItem></div>
        </div>
    )
}

export default ExpenseList