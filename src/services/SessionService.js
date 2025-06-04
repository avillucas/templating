const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const register = async (req) => {
  const { email, password, confirmPassword, name } = req.body;

  if (!isValidEmail(email)) {
    throw new Error("Email inválido");
  }
  if (!name) {
    throw new Error("El campo nombre es requerido");
  }
  if (!isValidPassword(password)) {
    throw new Error(
      "La contraseña debe tener al menos 8 caracteres, una letra y un número"
    );
  }
  if (password !== confirmPassword) {
    throw new Error("Las contraseñas ingresadas deben ser iguales");
  }
  let user = await userModel.getByEmail(email);
  if (!user) {
    throw new Error("Ya existe ese email");
  }
  const hashed = await bcrypt.hash(password, 10);
  const newUser = await userModel.add({ email, password: hashed, name });
  delete newUser.password;
  return newUser;
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.getByEmail({ email });
  if (!user) {
    throw new Error( "Credenciales inválidas");
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error( "Credenciales inválidas", );
  }
  delete user.password;
  req.session.save((err) => {
    if (err) {
      throw new Error( "No se pudo iniciar sesión");
    }
    req.session.user = userResponse;
    return res.redirect("/dashboard");
  });
};

const logout = (req, res) => {
  if (!req.session) return;

  req.session.destroy((err) => {
    if (err) {
      throw new Error( "No se pudo cerrar sesión");
    }
    res.clearCookie("connect.sid");
    return res.redirect("auth/login");
  });
};

module.exports = {
  register,
  login,
  logout,
};
