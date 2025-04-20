const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'example',
  database: process.env.DB_NAME || 'appdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/', (req, res) => {
  res.send(`
    <form method="POST" action="/add">
      <input name="name" placeholder="名前"/>
      <button type="submit">送信</button>
    </form>
  `);
});

app.post('/add', (req, res) => {
  const name = req.body.name;
  pool.query('INSERT INTO users (name) VALUES (?)', [name], (err) => {
    if (err) return res.send('エラー: ' + err.message);
    res.send('登録しました！');
  });
});

app.listen(3000, () => console.log('http://localhost:3000'));