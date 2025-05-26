const express = require('express');
const router = express.Router();

const {
    list,
    edit,
    show,
    add,
    erase
} = require('../controllers/usersController');


router.get('/', list);
router.get('/:userId', show);
router.put('/:userId', edit);
router.post('/', add);
router.delete('/:userId', erase);

module.exports = router;