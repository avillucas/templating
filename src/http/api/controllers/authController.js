const userRepository = require('../../../services/userService');
const JWTService = require('../../../services/JWTService');

const profile = async (req, res) => {
    const user = userRepository.getOne(req.user.id);
    delete user.password;
    return res.send(user);
};
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = userRepository.getByEmailPassword(email, password);
    if (!user) {
        throw new Error('The user does not exist')
    }
    const jwt = JWTService.JWTLogin(user.id);
    return res.send({ jwt });
};
const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = userRepository.save({ name, email, password });
    if (!user) {
        throw new Error('The user could not be created')
    }
    delete user.password;
    const jwt = JWTService.JWTLogin(user.id);
    return res.send({ jwt });
};

module.exports = {
    profile,
    login,
    register
}