const express  = require('express');
const mysql  = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
const pool = mysql.createPool({
	host:'localhost',
	user:'',
	password:'',
	database:'users'
});
app.use(bodyParser.json());
const port =3000

//let prop2 = password.property ||

app.post('/users',async (req,res) => {
	const data = req.body;
	try {
		const conn = await pool.getConnection();
		const result = await conn.query('INSERT INTO backup (username,password) VALUES(?,?)',[data.username,data.password]);
	res.send('Solicitud POST recibida');
} catch (error) {
	console.log(error);
	res.send(error);
} finally {
	if (conn) return conn.end();
}
}
);
//app.get('/users', (req, res) => {
//	res.json(users);
//})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
