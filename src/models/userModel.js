const { _execute } = require('../config/connectionMysql');


const _adminRol = 'ADMIN';
const _validRoles = { admin: _adminRol };
const getAll = async () => {
    const rows = await _execute('SELECT   `id`, `email`, `rol`  FROM `users` GROUP BY `id`, `email`, `rol` ', []);
    let users = [];
    rows.forEach(function (row) {
        users.push(row);
    });
    return users;
};
const getOne = async (user) => {
    const rows = await _execute('SELECT  `id`, `email`, `rol`   FROM `users` WHERE  `id` =  ?', [user.id]);
    return rows[0];
};
const update = (user) => {
    const rows = _execute('UPDATE  `users`  SET  `email` = :userEmail , `password` = :userPassword , `rol` = :userRol  WHERE `id` = :userId', {
        userEmail: user.email,
        userPassword: user.password,
        userRol: user.rol,
        userId: user.id
    });
    return rows[0];
};
const add = (user) => {
    let newUser = {
        userEmail: user.email,
        userPassword: user.password,
        userRol: user.rol ?? userModel.ROL_ADMIN
    };
    const result = _execute('INSERT INTO `users` ( `id`,  `name`,   `email`, `password`, `rol`) VALUES  NULL, :userEmail ,:userPassword, :userRol )', newUser);
    newUser.id = result.insertId;
    return newUser;
};
const erase = (user) => {
    const result = _execute('DELETE FROM `users` WHERE  `id` =  :userId', { userId: user.id });
    return result;
};
const merge = (userData) => {
    if (userData.name)
        this.name = userData.name;
    if (userData.email)
        this.name = userData.name;
    if (userData.password)
        this.password = userData.password;
    if (userData.rol)
        this.rol = userData.rol;
};


module.exports = {
    _adminRol,
    _validRoles,
    getAll,
    getOne,
    update,
    add,
    erase,
    merge
};