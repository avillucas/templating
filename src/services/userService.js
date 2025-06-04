const userModel = require("../models/userModel");

const bcrypt = require("bcryptjs");
async function _sanitize(data) {
  const user = {
    name: data.name.trim(),
    email: data.email.trim(),
    password: await hashPassword(data.password.trim()),
    rol: data.rol.trim(),
  };
  return user;
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function _validate(data) {
  if (!data.name) {
    throw new Error("The name is not set");
  }
  if (!data.email) {
    throw new Error("The email is not set");
  }
  if (!data.password) {
    throw new Error("The password is not set");
  }
  data.rol = data.rol ?? userModel._adminRol;
  return await _sanitize(data);
}

const getAll = async () => {
  return userModel.getAll();
};
const getOne = async (userId) => {
  return userModel.getOne({ id: userId });
};

const update = (userData) => {
  userData = _validate(userData);
  const user = petModel.update(userData);
  return user;
};

const add = (userData) => {
  userData = _validate(userData);
  const user = petModel.add(userData);
  return user;
};

const deleteUser = (userId) => {
  return userModel.deleteUser({ userId });
};
const getByEmailPassword = async (email, password) => {
  const user = await userModel.getByEmail(email);
  if (user) {
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
  }
};
module.exports = {
  getAll,
  getOne,
  add,
  update,
  deleteUser,
  getByEmailPassword,
};
