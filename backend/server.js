const express = require('express');
const app = express();
const mysql = require('mysql');
let data={};

app.use(express.json());
app.set('view engine', 'ejs');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'rehab',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

app.listen(3002, () => console.log('server started'));

app.get('/submit', function (req, res) {
  res.render('output', { data: [{}] });
});

app.post('/submit', (req, res) => {
  console.log('hii', req.body);
  data = req.body;
  console.log(data.lenth);
  console.log('form submitted');

  const sqlQuery = 'insert into patients(name,id,year,place,Center,treatment_period,sobriety_period,reason,relapse) values(?,?,?,?,?,?,?,?,?) ;';

  // Execute the query
  
  connection.query(sqlQuery,[data.name,data.id,data.year,data.place,data.center,data.tperiod_value,data.speriod_value,data.reason,data.relapse_value], (error, results) => {
    if (error) {
      console.error('Error executing SQL query: ' + error.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Display the results
    console.log('Records :', results);
  });
  const selectQuery = 'SELECT * FROM patients';
  connection.query(selectQuery, (error, selectResults) => {
    if (error) {
      console.error('Error executing SQL select query: ' + error.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log(selectResults);
});

  res.json('Form submitted successfully'); // Send a response to the client
});
