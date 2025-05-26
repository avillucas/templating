
const express = require('express');
const router = express.Router();

const {
    login,
    profile
} = require('../controllers/authController');
//Login con email y password
router.post("/login",login);
router.get("/profile",JWTA, profile  );
module.exports = router;