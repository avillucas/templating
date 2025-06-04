module.exports = {
  loginForm: async (req, res) => {
    res.render("login.ejs", { title: "Login" });
  },
  registerForm: async (req, res) => {
    res.render("register.ejs", { title: "Register" });
  },
  login: async (req, res) => {
      return res.status(302).redirect("/");
  },
  register: async (req, res) => {
      return res.status(302).redirect("/login");
  },
  logout: async (req, res) => {
    //@todo logout
    return res.status(302).redirect("/login");
  },
};
