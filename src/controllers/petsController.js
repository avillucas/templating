const model = require('../models/petsModel');
module.exports = {
    listPets: async (req, res) => {
        const pets = await model.getAll(req.params.petId)
        res.render('pets/list', { 'pets': pets, 'title': 'Dashboard' });
    },
    editPetForm: async (req, res) => {
        const pet = await model.getOne(req.params.petId);
        res.render('pets/editForm', { 'pet': pet, 'title': 'Editar mascota' });
    },
    editPet: async (req, res) => {
        model.save(req.params.petId, bodyParser.json())
        return res.status(302).redirect('/pets');
    },
    addPetForm: async (req, res) => {
        res.render('pets/addForm.ejs', { 'title': 'Agregar Mascota' });
    },
    addPet: async (req, res) => {
        model.save(bodyParser.json(), {})
        return res.status(302).redirect('/pets');
    },
    showPet: async (req, res) => {
        const pet = await model.getOne(req.params.petId)
        res.render('pets/show.ejs', { 'pet': pet, 'title': 'Ver Mascota' });
    },
    deletePet: async (req, res) => {
        const pet = await model.delete(req.params.petId);
        return res.status(302).redirect('/pets');
    }
}