const mysql = require('mysql2')
const pool = mysql.createPool({
    host     : '192.168.1.1',
    user     : 'user',
    password : '********',
    database : 'chipgo'
});

module.exports = pool;


