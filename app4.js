const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

app.use(bodyParser.json());

const pool = mysql.createPool({
	  host: 'localhost',
	  user: '',
	  password: '',
	  database: 'users'
});
app.post('/users', async (req, res) => {
	  const data = req.body;
	  let conn;
	  try {
		      conn = await pool.getConnection();
		  	if (!conn) {
				throw new Error('failed to connect to the databae');}
		      const result = await conn.query('INSERT INTO table (username, password) VALUES (?, ?)', [data.username, data.password]);
		      res.send(result);
		    } catch (error) {
			        console.log(error);
			        res.send(error);
			      } finally {
				          if (conn) return conn.end();
				        }
});

app.listen(3000, () => {
	  console.log('Server listening on port 3000');
});
