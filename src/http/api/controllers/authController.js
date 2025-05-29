const userRepository = require('../../../services/userService');
const JWTService = require('../../../services/authService');

module.exports = {
    profile: async (req, res) => {
       // const user = userRepository.find((user) => user.id === payload.id);
        //@todo Throw exception
        //if (!user) return res.sendStatus(401);
        delete user.password;
        return res.send(user);
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        const user = userRepository.getByEmailPassword(email, password);
        if(!user){
            throw new Error('The user does not exist')
        }
        const jwt = JWTService.auth(user.id);
        return res.send({ jwt });
    }
}