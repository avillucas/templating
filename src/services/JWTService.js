const JWTLogin = async (user) => {
  const { registerJWT } = await import("../config/jwt.mjs");
  const jwt = await registerJWT({
    id: user.id,
    email: user.email,
    role: user.rol,
  });
  return jwt;
};
const JWTVerify = async (token) => {
  const { verifyJWT } = await import("../config/jwt.mjs");
  const jwt = await verifyJWT(token);
  return jwt;
};

module.exports = {
  JWTVerify,
  JWTLogin,
};
