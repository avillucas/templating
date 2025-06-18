const bcrypt = require("bcryptjs");
const { User ,__userRol} = require("../models/userModel");

async function _sanitize(data) {
  const user = {
    name: data.name.trim(),
    email: data.email.trim(),
    password: await hashPassword(data.password.trim()),
    rol:  data.rol ? data.rol.trim(): __userRol,
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
  data.rol = data.rol ?? __userRol;
  return await _sanitize(data);
}

const getAll = async () => {
  return await User.find({ });
};
const getOne = async (userId) => {
  return await User.findOne({id: userId});
};

const add = async (userData) => {
  userData = await _validate(userData);
  console.log(userData);
  const user = await User.create(userData);
  return user;
};

const update = async (userData) => {
  userData = _validate(userData);
  const user = await User.findOne({id: userData.id});
  await user.update(userData);
  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findOne({id: userId});
  user.destroy();
};

const getByEmailPassword = async (email, password) => {
  const user = await User. User.findOne({ email });
  if (user) {
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
  }
};

const getByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return user;
  }
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  deleteUser,
  getByEmail,
  getByEmailPassword,
};
