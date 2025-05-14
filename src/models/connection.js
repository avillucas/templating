require('dotenv').config()
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'templating-mariadb',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'gdp',
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders:true,
});

pool.getConnection((error, connection) => {
  if (error) {
    console.log("Hubo un error de conexión", error);
    return;
  }
  connection.config.namedPlaceholders = true;
  console.log('connected as id ' + connection.threadId);
  connection.release();
});

module.exports = {
  conn: pool.promise()
}