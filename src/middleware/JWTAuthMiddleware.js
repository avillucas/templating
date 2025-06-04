const JWTAuthMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization?.startsWith("Bearer ")) {
    throw new Error("Header was not sent");
  }
  const { verifyJWT } = await import("../config/jwt.mjs");
  const token = authorization.split(" ")[1];
  let payload = await verifyJWT(token);
  if (!payload) {
    throw new Error("Invalid Token");
  }
  delete payload.iat;
  delete payload.exp;
  req.user = payload;

  next();
};

module.exports = JWTAuthMiddleware;
