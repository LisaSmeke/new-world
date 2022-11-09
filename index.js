const express = require('express');
const app = express();
const port = 8384;

//get the client
const mysql = require('mysql2');

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

// 1. What is the capital of country X ?
// Accept X from user
con.execute(`SELECT @countryX := 'Poland';`);

con.execute(
  `SELECT country.Name AS country, city.name AS capital
FROM new_world.country
INNER JOIN city
ON country.Capital = city.ID
WHERE country.Name = @countryX;`,
  (err, res) => {
    if (err) throw err;
    console.log(`Selected country's capital:`);
    console.log(res);
  },
);

// 2. List all the languages spoken in the region Y
// Accept Y from user
let region = con.execute(`SELECT @regionY := 'Middle East';`);

con.execute(
  `SELECT DISTINCT Language
FROM new_world.country
INNER JOIN countrylanguage
ON country.code = countrylanguage.CountryCode
WHERE country.region = @regionY;`,
  (err, res) => {
    if (err) throw err;
    console.log(`Languages spoken in selected region`);
    console.log(res);
  },
);

// 3. Find the number of cities in which language Z is spoken
// Accept Z from user

con.execute(`SELECT @languageZ := 'Norwegian';`);

con.execute(
  `SELECT COUNT(countrylanguage.CountryCode) AS Cities
FROM new_world.city
INNER JOIN countrylanguage
ON city.CountryCode = countrylanguage.CountryCode
WHERE countrylanguage.language = @languageZ;`,
  (err, res) => {
    if (err) throw err;
    console.log('Number of cities where selected language is spoken:');
    console.log(res);
  },
);

// 4. List all the continents with the number of languages spoken in each continent
con.execute(
  `SELECT DISTINCT Continent
FROM new_world.country
INNER JOIN countrylanguage
ON country.Code = countrylanguage.CountryCode`,
  (err, res) => {
    if (err) throw err;
    console.log('Data received from new_world db');
    console.log(res);
  },
);

app.listen(port, () => console.log(`Server started on port: ${port}`));
