const session = require("express-session");

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET ?? 12346578,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 1,
    httpOnly: true,
    secure: false,
    path: "/",
  },
});
const sessionAuthMiddleware = async (req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user || null;
    return next();
  }
  throw new Error("No autenticado");
};

module.exports = {
  sessionMiddleware,
  sessionAuthMiddleware,
};
