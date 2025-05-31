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
router.get('/:PetId', showPet);
router.put('/:PetId', editPet);
router.post('/', addPet);
router.delete('/:PetId', deletePet);

module.exports = router;