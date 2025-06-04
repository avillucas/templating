import { SignJWT, jwtVerify } from "jose";
const secret = new TextEncoder().encode(
  process.env.JWT_PRIVATE_KEY ?? "asd132546"
);

export async function registerJWT(payload) {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
  return jwt;
}

export async function verifyJWT(token) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}
