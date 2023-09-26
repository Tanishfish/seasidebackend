const mysql = require('mysql');
require('dotenv').config(); // Load environment variables from .env

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'seaside'
});

try {
     connection.connect();
    console.log('DB Connected Successfully');
} catch (error) {
    console.log(error.message);
}

module.exports = connection;
