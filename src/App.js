import { useState } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import Login from './components/Login';
import NewExpense from './components/NewExpense';
import moment from "moment";

function App() {
  const [expenseList, setExpenseList] = useState([])

  //this variable is used to check where the token is valid and (not) expired or not
  let isUserLoggedIn = false
  let content = null

  const tokenObjectFromStorage = localStorage.getItem('tokenObject')
  if(tokenObjectFromStorage) {
    const tokenObject = JSON.parse(tokenObjectFromStorage)
    const timestamp = moment(tokenObject.timestamp).utc();
    const currentTime = moment(new Date()).utc();
    const difference = currentTime.diff(timestamp)
    
    //the token can only be valid for maximum of 4 hours
    if(difference > 4 * 60 * 60 * 1000) isUserLoggedIn = false
    else isUserLoggedIn = true
  }

  if(isUserLoggedIn) {
    content = <div><NewExpense onNewExpenseAdded={newExpenseAdded}></NewExpense><ExpenseList expenseList={expenseList}></ExpenseList></div>
  } else {
    content = <div><Login onSuccessfulLogin={reloadPage}></Login></div>
  }

  function reloadPage() {
    setExpenseList((prevState) => {
      return [...prevState]
    })
  }

  function newExpenseAdded(data) {
    setExpenseList((prevState) => {
      return [...prevState, data]
    })
  }

  return content
}

export default App;
