const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myformdb'
});

conn.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

module.exports = conn;
