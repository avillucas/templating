const { userModel } = require('../models/userModel');   
//import bcrypt from "bcryptjs";

function _sanitize(data) {
    const user = {
        name: data.name.trim(),
        email: data.email.trim(),
        password: hashPassword(data.password.trim()),
        rol: data.rol.trim()
    };
    return data;
};

async function hashPassword(password) {
    return await bcrypt.hash(password, 8);
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
    if (!userModel.hasOwnProperty(data.type)) {
        throw new Error('The type is not valid one ');
    }
    data.rol = data.rol ?? userModel._adminRol;
    return _sanitize(data);
};

module.exports = {
    getAll: async () => {
        return userModel.getAll();
    },
    getOne: async (userId) => {
        return userModel.getOne({ id: userId });
    },
    save(data) {
        const user = _validate(data);
        if (user.id) {
            userModel.update(user);
        } else {
            userModel.add(user);
        }
        return user;
    },
    delete(userId) {
        return userModel.delete({ id: userId });
    },
    getByEmailPassword(email, password) {
        const passwordHash = hashPassword(password);
        return userModel.getOne({ email, passwordHash });
    }
}