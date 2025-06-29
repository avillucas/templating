const {
  add,
  update,
  getByEmailPassword,
  getOne,
} = require("../../../services/userService");
const { JWTLogin } = require("../../../services/JWTService");

const profile = async (req, res) => {
  const user = getOne(req.user.id);
  delete user.password;
  return res.send(user);
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getByEmailPassword(email, password);
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const token = await JWTLogin(user);
  return res.send({ token, user });
};
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await add({ name, email, password });
  if (!user) {
    throw new Error("The user could not be created");
  }
  delete user.password;
  const token = await JWTLogin(user.id);
  return res.send({ token , user});
};

module.exports = {
  profile,
  login,
  register,
};
