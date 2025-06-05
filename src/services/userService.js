const bcrypt = require("bcryptjs");
const { User } = require("../models/userModel");

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
    return await User.findAll({ raw: true });
};
const getOne = async (userId) => {
  return await User.findOne({ where: {userId }, raw: true });
};


const add = async  (userData) => {
  userData = _validate(userData);
  const user = await User.create(userData);
  return user;
};

const update = async (userData) => {
  userData = _validate(userData);
  const user = await User.findByPk(userData.id);
  await user.update(userData );
  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findByPk(userData.id);
  user.destroy();

};

const getByEmailPassword = async (email, password) => {
  const user =  await User.findOne({ where: {email }, raw: true });
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