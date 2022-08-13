import ExpenseDate from "./ExpenseDate"
import '../styles/ExpenseItem.css'

function ExpenseItem(props) {
    const title = props.title
    const cost = props.cost

    return (
        <div className="expense-item">
            <div className="expense-item-left-subsection">
                <h4><ExpenseDate date={props.date}></ExpenseDate></h4>
            </div>
            <div className="expense-item-right-subsection">
                {title} - {cost}
            </div>
        </div>
    )
}

export default ExpenseItem