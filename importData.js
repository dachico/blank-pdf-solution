const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dachi',
    password: '5555',
    database: 'users_list'
});

connection.connect();

fs.createReadStream('MOCK_DATA.csv').pipe(csv()).on('data', (row) => {
    const {id, first_name, last_name, email} = row;
    const query = 'INSERT INTO dummy_users (id, first_name, last_name, email) VALUES (?, ?, ?, ?)';
    connection.query(query, [id,first_name, last_name, email], (err) => {
        if (err) throw err;
    });
})
    .on('end', () => {
        console.log('CSV file successfully processed');
        connection.end();
    })
