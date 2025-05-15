const petRepository = require('../../../services/petService');
module.exports = {
    listPets: async (req, res) => {
        const pets = await petRepository.getAll(req.params.petId);
        res.render('pets/list', { 'pets': pets, 'title': 'Pets' });
    },
    editPetForm: async (req, res) => {
        const pet = await petRepository.getOne(req.params.petId);
        res.render('pets/editForm', { 'pet': pet, 'title': 'Editar mascota' });
    },
    addPetForm: async (req, res) => {
        res.render('pets/addForm.ejs', { 'title': 'Agregar Mascota' });
    },
    showPet: async (req, res) => {
        const pet = await petRepository.getOne(req.params.petId)
        res.render('pets/show.ejs', { 'pet': pet, 'title': 'Ver Mascota' });
    },
    _addPet: async (req, res) => {
        console.log(req);
        await petRepository.save(req.body)
        return res.status(302).redirect('/pets');
    },
    _editPet: async (req, res) => {
        let pet = req.body;
        pet.id = req.params.petId;
        await petRepository.save(pet)
        return res.status(302).redirect('/pets');
    },
    _deletePet: async (req, res) => {
        const pet = await model.delete(req.params.petId);
        return res.status(302).redirect('/pets');
    }
}