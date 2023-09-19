const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'database3.lcn.com',
    user: 'seasidekidsc',
    password: 'BzPMdK}O]XMY',
    database: 'LN005633_seasidekidsc'
})
try {
    connection.connect();
    console.log('DB Connected Successfully');
} catch (error) {
    console.log(error.message)
}

module.exports = connection;