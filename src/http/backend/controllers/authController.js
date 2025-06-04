const {
  sessionRegister,
  sessionLogin,
  sessionLogout,
} = require("../../../services/sessionService");

module.exports = {
  loginForm: async (req, res) => {
    res.render("auth/login.ejs", { title: "Login", emptyLayout: true });
  },
  registerForm: async (req, res) => {
    res.render("auth/register.ejs", { title: "Register", emptyLayout: true });
  },
  logout: async (req, res) => {
    await sessionLogout(req, res);
    return res.status(302).redirect("/login");
  },
  login: async (req, res) => {
    try {
      await sessionLogin(req, res);
    } catch (error) {
     res.render("auth/login.ejs", { title: "Login", emptyLayout: true, message: error });
    }
  },
  register: async (req, res) => {
    await sessionRegister(req, res);
     res.render("auth/login.ejs", { title: "Login", emptyLayout: true, message: "Usuario creado " });
  },
};
