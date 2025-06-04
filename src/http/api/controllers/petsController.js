const petRepository = require("../../../services/petService");

const listPets = async (req, res) => {
  const pets = await petRepository.getAll();
  res.json({ message: "La mascotas fueron encontradas", data: pets });
};
const editPet = async (req, res) => {
  let pet = req.body;
  pet.id = req.params.petId;
  const petUpdated = await petRepository.update(pet);
  if (!petUpdated) {
    throw Error("The pet could not be updated");
  }
  res.json({ message: "La mascota fue agregada", data: pet });
};
const showPet = async (req, res) => {
  const pet = await petRepository.getOne(req.params.petId);
  if (!pet) {
    throw Error("The pet does not exist");
  }
  res.json({ message: "La mascota fue encontrada", data: pet });
};
const addPet = async (req, res) => {
  const pet = petRepository.add(req.body, {});
  if (!pet) {
    throw Error("The pet could not be created");
  }
  res.json({ message: "La mascota fue agregada", data: pet });
};
const deletePet = async (req, res) => {
  const deleted = await petRepository.deletePet(req.params.petId);
  if (!deleted) {
    throw Error("The pet could not be deleted");
  }
  res.json({ message: "La  fue eliminada" });
};

module.exports = {
  listPets,
  editPet,
  showPet,
  addPet,
  deletePet,
};
