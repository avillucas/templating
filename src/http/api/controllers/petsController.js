const petRepository = require('../../../services/petService');
module.exports = {
    listPets: async (req, res) => {
        const pets = await petRepository.getAll(req.params.petId)
        res.json(pets);
    },
    
    editPet: async (req, res) => {
        model.save(req.params.petId, bodyParser.json())
        res.json(pets);
    },
   
    showPet: async (req, res) => {
        const pet = await petRepository.getOne(req.params.petId)
        res.render('pets/show.ejs', { 'pet': pet, 'title': 'Ver Mascota' });
    },
    addPet: async (req, res) => {
        petRepository.save(bodyParser.json(), {})
        return res.status(302).redirect('/pets');
    },
   
    deletePet: async (req, res) => {
        const pet = await petRepository.delete(req.params.petId);
        return res.status(302).redirect('/pets');
    }
}