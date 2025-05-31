const { conn } = require('../config/connectionMysql');


async function _execute(dql, params) {
    try {
        const [rows, result]  = await conn.execute(dql, params);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
};


const userModel = {
    _adminRol : 'ADMIN',
    _validRoles: { admin: 'ADMIN' },
    getAll: async () => {
        const  rows = await  _execute('SELECT BIN_TO_UUID(id) as  `id`, `email`, `rol`  FROM `users` GROUP BY `id`, `email`, `rol` ', []);
        let users = []; 
        rows.forEach(function (row) {
            users.push(row);
        });
        return users;
    },
    getOne: async (user) => {
        const rows = await  _execute('SELECT  BIN_TO_UUID(id) as  `id`, `email`, `rol`   FROM `users` WHERE  `id` =  BIN_TO_UUID(?)', [user.id]);
        return rows[0];
    },
    update(user) {
        const rows = _execute('UPDATE  `users`  SET  `email` = :userEmail , `password` = :userPassword , `rol` = :userRol  WHERE `id` = :userId', {
            userEmail: user.email,
            userPassword: user.password,
            userRol: user.rol,
            userId: user.id
        });
        return rows[0];
    },
    add(user) {
        let newUser = {
            userEmail: user.email,
            userPassword: user.password,
            userRol: user.rol ?? userModel.ROL_ADMIN
        };
        const result =  _execute('INSERT INTO `users` ( `id`,  `name`,   `email`, `password`, `rol`) VALUES (UUID_TO_BIN(UUID()), :userEmail ,:userPassword, :userRol )', newUser);
        newUser.id = result.insertId;
        return newUser;  
    },
    delete(user) {
        const result = _execute('DELETE FROM `users` WHERE  `id` =  BIN_TO_UUID(:userId)', { userId: user.id });
        return result;
    },
    merge(userData){
        if(userData.name)
        this.name = userData.name;
        if(userData.email)
        this.name = userData.name;
        if(userData.password)
        this.password = userData.password;
        if(userData.rol)
        this.rol = userData.rol;
    }
}
module.exports = {
    userModel
}