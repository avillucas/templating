const express = require('express');
const router = express.Router();

const {
    listPets,
    editPetForm,
    editPet,
    showPet,
    addPetForm,
    addPet,
    deletePet
} = require('../controllers/petsController');


router.get('/', listPets);
router.get('/:petId', showPet);
router.get('/edit/:petId', editPetForm);
router.post('/edit/:petId', editPet);
router.get('/add', addPetForm);
router.post('/add', addPet);
router.delete('/delete/:petId', deletePet);

module.exports = router;