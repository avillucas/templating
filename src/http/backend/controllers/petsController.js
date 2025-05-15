const petRepository = require('../../../services/petService');
module.exports = {
    listPets: async (req, res) => {
        const pets = await petRepository.getAll(req.params.petId);
console.log(pets[0]);

        res.render('pets/list', { 'pets': pets, 'title': 'Pets' });
        },
    editPetForm: async (req, res) => {
        const pet = await petRepository.getOne(req.params.petId);

        console.info(pet);
        res.render('pets/editForm', { 'pet': pet, 'title': 'Editar mascota' });
    },
    editPet: async (req, res) => {
        model.save(req.params.petId, bodyParser.json())
        return res.status(302).redirect('/pets');
    },
    addPetForm: async (req, res) => {
        res.render('pets/addForm.ejs', { 'title': 'Agregar Mascota' });
    },
    showPet: async (req, res) => {
        const pet = await petRepository.getOne(req.params.petId)
        res.render('pets/show.ejs', { 'pet': pet, 'title': 'Ver Mascota' });
    },
    _addPet: async (req, res) => {
        model.save(bodyParser.json(), {})
        return res.status(302).redirect('/pets');
    },
   
    _deletePet: async (req, res) => {
        const pet = await model.delete(req.params.petId);
        return res.status(302).redirect('/pets');
    }
}