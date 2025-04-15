const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const conn = require('./db');

const app = express();

// ✅ Use dynamic port for Railway
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Show form page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, phone } = req.body;

  const sql = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';
  conn.query(sql, [name, email, phone], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('<h2>Something went wrong!</h2><a href="/">Go back</a>');
    }
    res.send('<h2>Form submitted successfully!</h2><a href="/">Go back</a>');
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
