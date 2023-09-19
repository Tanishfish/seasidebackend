const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // port:4321
})
try {
    connection.connect();
    console.log('DB Connected Successfully');
} catch (error) {
    console.log(error.message)
}

module.exports = connection;