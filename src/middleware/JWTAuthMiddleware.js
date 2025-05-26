const express = require('express');
const userRepository = require('../services/userService');
import { jwtVerify } from "jose";
const app = express();

function JWTAuthMiddleware(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new Error('Header was not sent');
    }
    const encoder = new TextEncoder();
    const { payload } = jwtVerify(
        authorization,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    const user = userRepository.find((user) => user.id === payload.id);
    if (!user) {
        throw new Error('User does not exists');
    }
    delete user.password;
    next(req, res);
}
module.exports = {
    JWTAuthMiddleware
};