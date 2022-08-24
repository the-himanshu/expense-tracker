import ChartBar from "./ChartBar";
import "../styles/ExpenseChart.css"

function arraySum(arr) {
  let sum_ = 0
  for(let element of arr) sum_ = sum_ + element
  return sum_
}

function ExpenseChart(props) {
  //initialize the object containing the data per month
  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  const expensesList = props.expensesList;

  //the logic to calculate the expense for each month
  for (let expense of expensesList) {
    let month = expense.date.getMonth();
    chartDataPoints[month].value += expense.cost;
  }

  //find the total expenses of the filtered month  
  const dataPointValues = chartDataPoints.map((dataPoint) => dataPoint.value);
  const totalSum = arraySum(dataPointValues)
  
  if(totalSum === 0) {
    return <div className="no-expense-text">Nothing to Show</div>
  }

  return (
    <div className="monthly-expense-bar">
      {chartDataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          label={dataPoint.label}
          value={dataPoint.value}
          totalSum={totalSum}
        ></ChartBar>
      ))}
    </div>
  );
}

export default ExpenseChart;
