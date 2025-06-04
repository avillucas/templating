require('dotenv').config()

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('gdp', 'root', 'password', {
  host: 'mariadb',
  dialect:'mariadb'
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = {
  conn: pool.promise()
}