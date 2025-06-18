require('dotenv').config()

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME ?? 'gdp',
  process.env.DB_USER ?? 'root',
  process.env.DB_PASS ?? 'password',
  {
    host: process.env.DB_HOST ?? 'templating-mariadb',
    port: process.env.DB_PORT ?? 3306,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelize.authenticate()
  .then(() => console.log(`Connection working: ${process.env.DB_HOST}`))
  .catch(err => console.error('Connection error:', err));

module.exports = sequelize;