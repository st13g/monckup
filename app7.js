const express = require('express');
const app = express();

const users = [
  { id: 1, name: 'Alice', password: 'alice123' },
  { id: 2, name: 'Bob', password: 'bob123' },
  { id: 3, name: 'Charlie', password: 'charlie123' }
];

app.get('/users', (req, res) => {
  res.send(users);
});

app.post('/users', (req, res,next) => {
try {
  const newUser = req.body;
  users.push(newUser);
  res.send(newUser);
}catch (error) {
	  next(error);
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
