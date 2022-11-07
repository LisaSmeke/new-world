const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sqlpswd',
  database: 'new_world',
});
con.connect((err) => {
  if (err) throw err;
  console.log('Connection established');
});

con.query('SELECT code from country', (err, columns) => {
  if (err) throw err;
  console.log('Data received from new_world DB');
  console.log(columns);
});
