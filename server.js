const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dachi',
    password: '5555',
    database: 'users_list'
});

connection.connect();

app.use(express.static(__dirname));

app.get('/api/users', (req,res) => {
    connection.query('SELECT * FROM dummy_users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
})