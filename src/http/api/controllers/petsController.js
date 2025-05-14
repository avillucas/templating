const bodyParser = require('body-parser');
const petRepository = require('../../../services/petService');
module.exports = {
    listPets: async (req, res) => {
        const pets = await petRepository.getAll(req.params.petId)
        res.json(pets);
    },
    editPet: async (req, res) => {
        let pet= req.body;
        pet.id = req.params.petId;
        await petRepository.save(pet)
        res.json(pet);
    },
    showPet: async (req, res) => {
        const pet = await petRepository.getOne(req.params.petId)
        res.json(pet); 
    },
    addPet: async (req, res) => {
        const pet = petRepository.save(req.body, {})
        res.json(pet);
    },
    deletePet: async (req, res) => {
        const pet = await petRepository.delete(req.params.petId);
        res.json(pet);
    }
}