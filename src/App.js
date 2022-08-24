import { useState } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import NewExpense from './components/NewExpense';

function App() {
  const [expenseList, setExpenseList] = useState([])

  function newExpenseAdded(data) {
    setExpenseList((prevState) => {
      return [...prevState, data]
    })
  }

  return (
    <div>
      <NewExpense onNewExpenseAdded={newExpenseAdded}></NewExpense>
      <ExpenseList expenseList={expenseList}></ExpenseList>
    </div>
  );
}

export default App;
