const mysql = require('mysql');

const db = mysql.createConnection({
    host: '10.34.130.254',
    user: 'bsnlvm',
    password: 'bsnl@123',
    database: 'ipScanDb',
    timezone: 'IST' // Set timezone to IST
});

module.exports = db;