
const JWTAuthMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization?.startsWith("Bearer ")) {
        throw new Error('Header was not sent');
    }
    const { verifyJWT } = await import("../config/jwt.mjs");
    const token = authHeader.split(" ")[1];
    const { payload } = verifyJWT(token);
    if (!payload) {
        throw new Error('Invalid Token');
    }
    req.user = payload;
    next(req, res);
}

module.exports =  JWTAuthMiddleware;