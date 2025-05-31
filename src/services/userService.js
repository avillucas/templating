const bcrypt = require("bcryptjs");
const userModel = require('../models/userModel');

function _sanitize(data) {
    const user = {
        name: data.name.trim(),
        email: data.email.trim(),
        password: bcrypt.hash(data.password.trim(), 8),
        rol: data.rol.trim()
    };
    return user
};

function _validate(data) {
    if (!data.name) {
        throw new Error('The name is not set');
    }
    if (!data.email) {
        throw new Error('The email is not set');
    }
    if (!data.password) {
        throw new Error('The password is not set');
    }
    data.rol = data.rol ?? userModel._adminRol;
    return _sanitize(data);
};

const getAll = async () => {
    return userModel.getAll();
};
const getOne = async (userId) => {
    return userModel.getOne({ id: userId });
};
const save = (data) => {
    const user = _validate(data);
    if (user.id) {
        userModel.update(user);
    } else {
        userModel.add(user);
    }
    delete user.password;
    return user;
}
const erase = (userId) => {
    return userModel.delete({ id: userId });
};
const getByEmailPassword = (email, password) => {
    const passwordHash = hashPassword(password);
    return userModel.getOne({ email, passwordHash });
}
module.exports = {
    getAll,
    getOne,
    save,
    erase,
    getByEmailPassword,
}