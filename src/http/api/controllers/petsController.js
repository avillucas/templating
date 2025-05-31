const petRepository = require('../../../services/petService');

const listPets = async (req, res) => {
    const pets = await petRepository.getAll()
    res.json(pets);
    res.json({ 'message': 'La mascotas fueron encontradas', 'data': pets });
};
const editPet = async (req, res) => {
    let pet = req.body;
    pet.id = req.params.petId;
    await petRepository.save(pet)
    res.json({ 'message': 'La mascota fue agregada', 'data': pet });
};
const showPet = async (req, res) => {
    const pet = await petRepository.getOne(req.params.petId)
    res.json({ 'message': 'La mascota fue encontrada', 'data': pet });
};
const addPet = async (req, res) => {
    const pet = petRepository.save(req.body, {})
    res.json({ 'message': 'La mascota fue agregada', 'data': pet });
};
const deletePet = async (req, res) => {
    await petRepository.delete(req.params.petId);
    res.json({ 'message': 'La  fue eliminada' });
}

module.exports = {
    listPets,
    editPet,
    showPet,
    addPet,
    deletePet
}