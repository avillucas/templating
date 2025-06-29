const session = require("express-session");
const MongoStore = require("connect-mongo");

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET ?? 'asdasd132132asdasd',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_CONNECTION ?? 'mongodb://mongo:27017/gdp' }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 1,
    httpOnly: true,
    secure: false,
    path: "/",
  },
});


const auth = async (req, res, next) => {
  if (req.session && req.session.user) return next();

  if (!req.originalUrl.startsWith("/login")) {
    res.status(302).redirect("/login");
    return;
  }
  return next();
};

function userState(req, res, next) {
  //res.locals.user = req.session.user || null;
  next();
}
module.exports = {
  auth,
  sessionMiddleware,
  userState,
};
