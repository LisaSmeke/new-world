//get the client
const mysql = require('mysql');

//connect to database
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

con.query('SELECT code from country', (err, res) => {
  if (err) throw err;
  console.log('Data received from new_world DB');
  console.log(res);
});

/* What is the capital of country X ? (Accept X from user)*/
con.query(`SELECT capital FROM country WHERE name ='Mexico'`, (err, res) => {
  if (err) throw err;
  console.log(res);
});

/*List all the languages spoken in the region Y (Accept Y from user)*/

/*Find the number of cities in which language Z is spoken (Accept Z from user)*/

/*List all the continents with the number of languages spoken in each continent*/
