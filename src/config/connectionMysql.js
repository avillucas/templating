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
  namedPlaceholders: true
});

pool.getConnection((error, connection) => {
  if (error) {
    throw Error(error);
  }
  connection.config.namedPlaceholders = true;
  connection.release();
});


const _execute = async (dql, params) => {
  try {
    const conn = pool.promise();
    const [rows, result] = await conn.execute(dql, params);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    conn.releaseConnection();
  }
};
module.exports = {
  _execute
}