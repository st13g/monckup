const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');

const connection =mysql.createConnection({
	host:'localhost',
	user:'gatito',
	password:'gatito',
	database:'users',
});

connection.connect();


const users = [
  { id: 1, name: 'Alice', password: 'alice123' },
  { id: 2, name: 'Bob', password: 'bob123' },
  { id: 3, name: 'Charlie', password: 'charlie123' }
];

app.get('/users', (req, res) => {
  res.send(users);
});

app.use(bodyParser.json());

app.post('/users', (req, res) => {
  const newUser = req.body;
  connection.query(
	  'INSERT INTO users (date, city, name , hostname, user, ip,os, type, status) VALUES (NOW(),?,?,?,?,?,?,?,?)',
	  [newUser.city,newUser.name,newUser.hostname,newUser.user,newUser.ip,newUser.os,newUser.type,newUser.status],
	  (error, results) => {
		  if (error) throw error;
		  res.send(newUser);
	  }
  );
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
