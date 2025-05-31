const express = require("express");
const router = express.Router();

const {
    listUser,
    editUser,
    showUser,
    addUser,
    deleteUser
} = require('../controllers/usersController');


router.get('/', listUser);
router.get('/:userId', showUser);
router.put('/:userId', editUser);
router.post('/', addUser);
router.delete('/:userId', deleteUser);

module.exports = router;