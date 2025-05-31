const userRepository = require('../services/userService');
const JWTService = require('../services/JWTService');

module.exports = {
    JWTAuthMiddleware: function (req, res, next) {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new Error('Header was not sent');
        }
        const { payload } = JWTService.verify();
        const user = userRepository.getOne(payload.id);
        if (!user) {
            throw new Error('User does not exists');
        }
        delete user.password;
        next(req, res);
    }
};