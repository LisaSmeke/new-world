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
WHERE country.Name = 'Mexico';`,
  (err, res) => {
    if (err) throw err;
    console.log('Data received from new_world db');
    console.log(res);
  },
);

/*List all the languages spoken in the region Y (Accept Y from user)*/
// 1st, SELECT country.code WHERE region = Y/Middle East
// then, SELECT countrylanguage.language WHERE countrylanguage.countrycode = (country codes that resulted from above)
// country.code in country.region; language in countrycode

/*Find the number of cities in which language Z is spoken (Accept Z from user)*/
// Z/Spanish
// first find countries (country codes) where language is Z/Spanish:
// countrylanguage.countrycode WHERE countrylanguage.language = 'Z/Spanish'
// then, check which cities have those country codes:
// city.countrycode = (country codes that resulted from above)
// convert result to number

/*List all the continents with the number of languages spoken in each continent*/
// 1st, list all continents:
//SELECT continent from country
// then, for each continent, get country codes
// then, form country codes, get language
// check how many different language values per continent
//
