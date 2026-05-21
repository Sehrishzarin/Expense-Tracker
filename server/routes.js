const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all expenses
router.get('/expenses', (req, res) => {
  const expenses = db.prepare('SELECT * FROM expenses ORDER BY date DESC').all();
  res.json(expenses);
});

// Add an expense
router.post('/expenses', (req, res) => {
  const { title, amount, category, date } = req.body;

  if (!title || !amount || !category || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (amount <= 0) {
    return res.status(400).json({ error: 'Amount must be greater than zero' });
  }

  const result = db.prepare(
    'INSERT INTO expenses (title, amount, category, date) VALUES (?, ?, ?, ?)'
  ).run(title, amount, category, date);

  res.json({ id: result.lastInsertRowid, title, amount, category, date });
});

// Delete an expense
router.delete('/expenses/:id', (req, res) => {
  db.prepare('DELETE FROM expenses WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Get monthly summary by category
router.get('/summary', (req, res) => {
  const { month, year } = req.query;

  const summary = db.prepare(`
    SELECT category, ROUND(SUM(amount), 2) as total
    FROM expenses
    WHERE strftime('%m', date) = ? AND strftime('%Y', date) = ?
    GROUP BY category
    ORDER BY total DESC
  `).all(month, year);

  const grandTotal = summary.reduce((sum, row) => sum + row.total, 0);

  res.json({ summary, grandTotal: Math.round(grandTotal * 100) / 100 });
});

module.exports = router;