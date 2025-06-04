const express = require('express');
const router = express.Router();

const {
    listPets,
    editPetForm,
    _editPet,
    showPet,
    addPetForm,
    _addPet,
    _deletePet
} = require('../controllers/petsController');


router.get('/', listPets);
router.get('/add', addPetForm);
router.get('/:petId', showPet);
router.get('/edit/:petId', editPetForm);
router.put('/:petId', _editPet);
router.post('/', _addPet);
router.delete('/:petId', _deletePet);

module.exports = router;