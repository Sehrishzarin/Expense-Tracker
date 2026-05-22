function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p className="empty-state">No expenses yet. Add one above to get started!</p>
  }

  return (
    <ul className="expense-list">
      {expenses.map(expense => (
        <li className="expense-item" key={expense.id}>
          <div className="expense-info">
            <span className="expense-title">{expense.title}</span>
            <div className="expense-meta">
              <span className="badge-tag">{expense.category}</span>
              <span>{expense.date}</span>
            </div>
          </div>
          <div className="expense-actions">
            <span className="expense-amount">Rs. {expense.amount.toFixed(2)}</span>
            <button className="btn-delete" onClick={() => onDelete(expense.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ExpenseList