const JWTLogin = async (user) => {
  const { registerJWT } = await import("../config/jwt.mjs");
  return await registerJWT({
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  });
};
const JWTVerify = async (authorizationHeader) => {
  const { verifyJWT } = await import("../config/jwt.mjs");
  return await verifyJWT({
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  });
};

module.exports = {
  JWTVerify,
  JWTLogin
}

