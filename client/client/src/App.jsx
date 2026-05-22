import { useState, useEffect } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Summary from './components/Summary'

function App() {
  const [expenses, setExpenses] = useState([])
  const [summary, setSummary] = useState([])
  const [grandTotal, setGrandTotal] = useState(0)

  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = String(now.getFullYear())

  async function fetchExpenses() {
    const res = await fetch('http://localhost:3000/api/expenses')
    const data = await res.json()
    setExpenses(data)
  }

  async function fetchSummary() {
    const res = await fetch(`http://localhost:3000/api/summary?month=${month}&year=${year}`)
    const data = await res.json()
    setSummary(data.summary)
    setGrandTotal(data.grandTotal)
  }

  useEffect(() => {
    fetchExpenses()
    fetchSummary()
  }, [])

  async function handleAdd(newExpense) {
    setExpenses(prev => [newExpense, ...prev])
    await fetchSummary()
  }

  async function handleDelete(id) {
    await fetch(`http://localhost:3000/api/expenses/${id}`, { method: 'DELETE' })
    setExpenses(prev => prev.filter(e => e.id !== id))
    await fetchSummary()
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Expense Tracker</h1>
      </header>
      
      <div className="dashboard-grid">
        <ExpenseForm onAdd={handleAdd} />
        <Summary summary={summary} grandTotal={grandTotal} />
      </div>

      <div className="card expense-list-container">
        <h2 className="card-title">Recent Transactions</h2>
        <ExpenseList expenses={expenses} onDelete={handleDelete} />
      </div>
    </div>
  )
}

export default App