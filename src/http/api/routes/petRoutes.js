const express = require('express');
const router = express.Router();

const {
    list,
    edit,
    show,
    add,
    erase
} = require('../controllers/petsController');


router.get('/', list);
router.get('/:PetId', show);
router.put('/:PetId', edit);
router.post('/', add);
router.delete('/:PetId', erase);

module.exports = router;