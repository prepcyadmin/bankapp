const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',       // use your MySQL password
  database: 'bankapp' // make sure to create this DB manually
});

connection.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected!");
});

module.exports = connection;
