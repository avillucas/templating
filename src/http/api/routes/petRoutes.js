const express = require('express');
const router = express.Router();

const {
    listPets,
    editPet,
    showPet,
    addPet,
    deletePet
} = require('../controllers/petsController');
router.get('/', listPets);
router.get('/:petId', showPet);
router.post('/:petId', editPet);
router.post('/', addPet);
router.delete('/:petId', deletePet);

module.exports = router;