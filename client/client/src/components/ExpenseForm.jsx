import { useState } from 'react'

const CATEGORIES = ['Food', 'Transport', 'Bills', 'Shopping', 'Health', 'Other']

function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const res = await fetch('http://localhost:3000/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, amount: parseFloat(form.amount) })
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      return
    }

    onAdd(data)
    setForm({ title: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0] })
  }

  return (
    <div className="card">
      <h2 className="card-title">Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Expense Title</label>
          <input 
            className="input-field" 
            name="title" 
            placeholder="e.g. Grocery Shopping" 
            value={form.title} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Amount (Rs.)</label>
          <input 
            className="input-field" 
            name="amount" 
            type="number" 
            step="0.01"
            placeholder="0.00" 
            value={form.amount} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select className="input-field" name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Date</label>
          <input className="input-field" name="date" type="date" value={form.date} onChange={handleChange} />
        </div>

        <button className="btn-primary" type="submit">Add Expense</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  )
}

export default ExpenseForm