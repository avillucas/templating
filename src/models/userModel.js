const { conn } = require("../config/connectionMysql");

async function _execute(dql, params) {
  try {
    const [rows, result] = await conn.query(dql, params);
    if (rows.insertId) {
      params.id = rows.insertId;
      return params;
    }
    return rows;
  } catch (error) {
    throw error;
  } finally {
    conn.releaseConnection();
  }
}

const _adminRol = "ADMIN";
const _validRoles = { admin: _adminRol };
const getAll = async () => {
  const [rows, fields] = await conn.query(
    "SELECT   `id`,  `name`, `email`, `rol`  FROM `users` GROUP BY `id`, `email`, `rol` "
  );
  return rows ?? [];
};
const getByEmail = async (email) => {
  const [rows, fields] = await conn.query(
    'SELECT  `id`,  `name`, `email`, `rol`,  `password`  FROM `users` WHERE  `email` LIKE  "?"',
    [email]
  );
  console.log('rows',rows);
  return rows[0] || null;
};
const getOne = async (user) => {
  const [rows, fields] = await conn.query(
    "SELECT  `id`,  `name`, `email`, `rol`   FROM `users` WHERE  `id` =  ?",
    [user.id]
  );
  return rows[0] || null;
};
const update = async (userData) => {
  const rows = await _execute(
    "UPDATE  `users`  SET  `email` = :userEmail , `password` = :userPassword , `name` = :userName ,  `rol` = :userRol  WHERE `id` = :userId",
    {
      userEmail: userData.email,
      userName: userData.name,
      userPassword: userData.password,
      userRol: userData.rol,
      userId: userData.id,
    }
  );
  return result && result.affectedRows;
};
const add = async (user) => {
  const newUser = await _execute(
    "INSERT INTO `users` ( `id`,  `name`,   `email`, `password`, `rol`) VALUES  (NULL, :userName, :userEmail ,:userPassword, :userRol )",
    {
      userEmail: user.email,
      userName: user.name,
      userPassword: user.password,
      userRol: user.rol ?? userModel.ROL_ADMIN,
    }
  );
  return newUser;
};
const deleteUser = async (id) => {
  const result = await _execute("DELETE FROM `users` WHERE  `id` =  :userId", {
    userId: id,
  });
  return result && result.affectedRows;
};
const merge = (userData) => {
  if (userData.name) this.name = userData.name;
  if (userData.email) this.name = userData.name;
  if (userData.password) this.password = userData.password;
  if (userData.rol) this.rol = userData.rol;
};

module.exports = {
  _adminRol,
  _validRoles,
  getAll,
  getOne,
  getByEmail,
  update,
  add,
  deleteUser,
  merge,
};
