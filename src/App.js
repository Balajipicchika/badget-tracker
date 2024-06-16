import React, { useState} from 'react';
import html2canvas from 'html2canvas';
import Header from './Header';
import Footer from './Footer';
import './App.css';

const BudgetTracker = () => {
  const [budget, setBudget] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const handleBudgetChange = e => {
    setBudget(e.target.value);
  };

  const handleExpenseNameChange = e => {
    setExpenseName(e.target.value);
  };

  const handleExpenseAmountChange = e => {
    setExpenseAmount(e.target.value);
  };

  const handleAddExpense = e => {
    e.preventDefault();
    if (expenseName && expenseAmount) {
      const newExpense = {
        id: Date.now(),
        name: expenseName,
        amount: parseFloat(expenseAmount),
      };
      setExpenses([...expenses, newExpense]);
      setExpenseName('');
      setExpenseAmount('');
    } else {
      alert('Please enter both expense name and amount.');
    }
  };

  const handleDeleteExpense = id => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = budget - totalExpenses;

  // function downloadTableAsImage() {
  //   const table = document.getElementById('budgetTable');
  //   if (!table) {
  //       console.error('Table not found');
  //       return;
  //   }

  //   html2canvas(table).then(canvas => {
  //       const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
  //       const link = document.createElement('a');
  //       link.setAttribute('download', 'budget_table.png');
  //       link.setAttribute('href', image);
  //       link.click();
  //   }).catch(error => {
  //       console.error('Error generating image:', error);
  //   });
  // }

  function downloadTableAsImage() {
    const table = document.getElementById('budgetTable');
    if (!table) {
        console.error('Table not found');
        return;
    }

    const cols = table.querySelectorAll('td:nth-child(3), th:nth-child(3)');
    cols.forEach(col => col.style.display = 'none');

    html2canvas(table).then(canvas => {
        cols.forEach(col => col.style.display = '');

        const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        const link = document.createElement('a');
        link.setAttribute('download', 'budget_table.png');
        link.setAttribute('href', image);
        link.click();
    }).catch(error => {
        console.error('Error generating image:', error);
    });
  }

  

  return (
    <div>
      <Header />
      <div className='merge'>
        <div className='split'>
          <center>
          <form onSubmit={handleAddExpense}>
            <label>
              Budget(&#8377;): {/* entering budget for the whole event */}
              <input type="number" value={budget} onChange={handleBudgetChange} placeholder='Enter amount'/> 
            </label>
            <br /><br />
            <div className='addexpense'>
              {/* entering event name */}
              <input type="text" value={expenseName} onChange={handleExpenseNameChange} placeholder='Expense Name' />
              {/* entering event amount*/}
              <input type="number" value={expenseAmount} onChange={handleExpenseAmountChange} placeholder='Expense Amount'/>
              <br />
              <br />
              <button type="submit" className='add-button'> &#10010; Add</button> 
            </div>
          </form>
          <br />
          </center>
          <h3>Budget: &#8377;{budget}</h3>
          <h3>Total Expenses: &#8377;{totalExpenses}</h3>
          <h3>Remaining Budget: &#8377;{remainingBudget}</h3>
        </div>
        <div className='split' >
        <center>
          <h4>Expense Tracker Table</h4>
          <table id="budgetTable">
            <thead>
              <tr>
                <th>Event</th>
                <th>Amount</th>
                <th><button className='split2-button'>&#10005;</button></th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.name}</td>
                  <td>{expense.amount}</td>
                  <td><button className='split2-button' onClick={() => handleDeleteExpense(expense.id)}>&#10005;</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className='download-button' onClick={downloadTableAsImage}>Download Table as Image</button>
        </center>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BudgetTracker;