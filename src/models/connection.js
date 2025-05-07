require('dotenv').config()
const mysql = require('mysql2');
const pool = mysql.createPool({
    host : process.env.MYSQL_HOST || 'localhost',
    user : process.env.MYSQL_USER || 'root',
    password : process.env.MYSQL_PASSWORD || '',
    database : process.env.MYSQL_DATABASE || 'database',
    port : process.env.MYSQL_PORT || 3306,
    waitForConnections:true, 
    connectionLimit: 10,
    queueLimit: 0
});
module.exports = {
    conn: pool.promise()
}