const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const sessionRegister = async (req) => {
  const { email, password, confirmPassword, name } = req.body;

  if (!isValidEmail(email)) {
    throw new Error("Email inválido");
  }
  if (!name) {
    throw new Error("El campo nombre es requerido");
  }

  if (password !== confirmPassword) {
    throw new Error("Las contraseñas ingresadas deben ser iguales");
  }
  let user = await userModel.getByEmail(email);
  if (!user) {
    throw new Error("Ya existe ese email");
  }
  const newUser = await userModel.add({ email, password, name });
  delete newUser.password;
  return newUser;
};

const sessionLogin = async (req, res) => {
  const { email, password } = req.body;
console.log(email,password);
  let user = await userModel.getByEmail({ email });
  if (!user) {
    throw new Error("Credenciales inválidas a");
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Credenciales inválidas b");
  }
  delete user.password;
  req.session.save((err) => {
    if (err) {
      throw new Error("No se pudo iniciar sesión");
    }
    req.session.user = userResponse;
    return res.redirect("/");
  });
};

const sessionLogout = (req, res) => {
  if (!req.session) return;

  req.session.destroy((err) => {
    if (err) {
      throw new Error("No se pudo cerrar sesión");
    }
    res.clearCookie("connect.sid");
    return res.redirect("auth/login");
  });
};

module.exports = {
  sessionRegister,
  sessionLogin,
  sessionLogout,
};
