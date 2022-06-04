const mysql = require('mysql2');
//const mysql = require('mysql');

/* create connection and export it */
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB,
});

module.exports = { pool };