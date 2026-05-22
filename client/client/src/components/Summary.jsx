function Summary({ summary, grandTotal }) {
  if (summary.length === 0) {
    return (
      <div className="card">
        <h2 className="card-title">This Month</h2>
        <p className="empty-state">No tracked expenses for this month.</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="card-title">This Month</h2>
      <ul className="summary-list">
        {summary.map(row => (
          <li className="summary-item" key={row.category}>
            <span className="category-badge">{row.category}</span>
            <span className="category-amount">Rs. {row.total.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="summary-total">
        <span>Total:</span>
        <span>Rs. {grandTotal.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default Summary