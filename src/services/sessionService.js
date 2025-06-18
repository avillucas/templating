const bcrypt = require("bcryptjs");
const userService = require("../services/userService");

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
  let user = await userService.getByEmail(email.email);
  if (!user) {
    throw new Error("Ya existe ese email");
  }
  const newUser = await userService.add({ email, password, name });
  delete newUser.password;
  return newUser;
};

const sessionLogin = async (req, res) => {
  const { email, password } = req.body;
  let user = await userService.getByEmail( email );
  if (!user) {
    throw new Error("Email invalido");
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Credenciales inválidas");
  }
  delete user.password;
  req.session.save((err) => {
    if (err) {
      throw new Error("No se pudo iniciar sesión");
    }
    req.session.user = user;
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
