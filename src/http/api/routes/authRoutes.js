
const express = require('express');
const router = express.Router();

const JWTAuthMiddleware = require('../../../middleware/JWTAuthMiddleware');
const {
    login,
    profile,
    register
} = require('../controllers/authController');
//Login con email y password
router.post("/register",register);
router.post("/login",login);
router.get("/profile", JWTAuthMiddleware, profile  );
module.exports = router;