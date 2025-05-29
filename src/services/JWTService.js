import { jwtVerify, SignJWT } from "jose";

module.exports = {
    auth: async function (guid) {
        const jwtConstructor = new SignJWT({ guid });
        const encoder = new TextEncoder();
        const jwt = await jwtConstructor
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        return jwt;
    },
    verify: function (authorizationHeader) {
         const encoder = new TextEncoder();
        return jwtVerify(
            authorizationHeader,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
    }

}

