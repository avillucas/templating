const express = require('express');
const router = express.Router();

const {
    listPets,
    editPetForm,
    editPet,
    showPet,
    addPetForm,
    _addPet,
    _deletePet
} = require('../controllers/petsController');


router.get('/', listPets);
router.get('/:petId', showPet);
router.get('/edit/:petId', editPetForm);
router.get('/add', addPetForm);
router.put('/:petId', editPet);
router.post('/', _addPet);
router.delete('/:petId', _deletePet);

module.exports = router;