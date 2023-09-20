const mysql = require('mysql');
require('dotenv').config(); // Load environment variables from .env

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

try {
     connection.connect();
    console.log('DB Connected Successfully');
} catch (error) {
    console.log(error.message);
}

module.exports = connection;
