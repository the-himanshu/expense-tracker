import ExpenseForm from "./ExpenseForm"
import "../styles/NewExpense.css"

function NewExpense(props) {
    function saveExpenseData(data) {
        props.onNewExpenseAdded(data);
    }

    return (
        <div className="new-expense-body">
        <div><ExpenseForm onSaveExpenseData={saveExpenseData}></ExpenseForm></div>
        </div>
    )
}

export default NewExpense