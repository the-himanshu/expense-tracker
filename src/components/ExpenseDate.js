import '../styles/ExpenseDate.css'

function ExpenseDate(props) {
    const month = props.date.toLocaleString("en-US", {month: 'long'})
    const day = props.date.getDate()
    const year = props.date.getFullYear()

    return (
        <div className="expense-date">
        <h2>{month}</h2>
        <h3>{day}</h3>
        <h2>{year}</h2>
        </div>
    )
}

export default ExpenseDate