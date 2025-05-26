const userRepository = require('../../../services/userService');
import { jwtVerify, SignJWT } from "jose";


module.exports = {
    login: async (req, res) => {
      

            const user = userRepository.find((user) => user.id === payload.id);
            if (!user) return res.sendStatus(401);
            delete user.password;
            return res.send(user);
       
    },
    profile: async (req, res) => {
        const { email, password } = req.body;
        try {
            const { guid } = authByEmailPwd(email, password);
            const jwtConstructor = new SignJWT({ guid });
            const encoder = new TextEncoder();
            const jwt = await jwtConstructor
                .setProtectedHeader({ alg: "HS256", typ: "JWT" })
                .setIssuedAt()
                .setExpirationTime("1h")
                .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
            return res.send({ jwt });
        } catch (err) {
            return res.sendStatus(401);
        }
    }
}




