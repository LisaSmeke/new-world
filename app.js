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

// 1. What is the capital of country X ? (Accept X from user)
con.execute(
  `SELECT country.Name AS country, city.name AS capital, Capital, ID
FROM new_world.country
INNER JOIN city
ON country.Capital = city.ID
WHERE country.Name = 'Sweden';`,
  (err, res) => {
    if (err) throw err;
    console.log('Capital received from new_world db');
    console.log(res);
  },
);

// 2. List all the languages spoken in the region Y (Accept Y from user)
con.execute(
  `SELECT DISTINCT Language
FROM new_world.country
INNER JOIN countrylanguage
ON country.code = countrylanguage.CountryCode
WHERE country.region = 'Southern Europe';`,
  (err, res) => {
    if (err) throw err;
    console.log('Region languages received from new_world db');
    console.log(res);
  },
);

// 3. Find the number of cities in which language Z is spoken (Accept Z from user)
con.execute(
  `SELECT COUNT(countrylanguage.CountryCode)
FROM new_world.city
INNER JOIN countrylanguage
ON city.CountryCode = countrylanguage.CountryCode
WHERE countrylanguage.language = 'Russian';`,
  (err, res) => {
    if (err) throw err;
    console.log('Data received from new_world db');
    console.log(res);
  },
);

/*List all the continents with the number of languages spoken in each continent*/
// 1st, list all continents:
//SELECT continent from country
// then, for each continent, get country codes
// then, form country codes, get language
// check how many different language values per continent
//
