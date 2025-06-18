const { Pet,_validSizes,_validBreeds } = require("../models/petsModel");

function _sanitize(data) {
  const pet = {
    name: data.name.trim(),
    age: parseInt(data.age),
    size: data.size,
    breed: data.breed.trim(),
    type: data.type.trim(),
  };
  return data;
}
function _validate(data) {
  if (!data.name) {
    throw new Error("The name is not set");
  }
  if (!data.age) {
    throw new Error("The edad is not set");
  }
  if (!data.size) {
    throw new Error("The size is not set");
  }
  if (!_validSizes.hasOwnProperty(data.size)) {
    throw new Error("The size is not valid one ");
  }
  if (!data.breed) {
    throw new Error("The breed is not set");
  }
  if (!_validBreeds.hasOwnProperty(data.type)) {
    throw new Error("The type is not valid one ");
  }
  return _sanitize(data);
}

const getAll = async () => {
  return await Pet.findAll({ raw: true });
};
const getOne = async (petId) => {
  return await Pet.findOne({ where: { id:petId }, raw: true });
};

const update = async (petData) => {
  petData = _validate(petData);
  const pet = await Pet.findByPk(petData.id);
  await pet.update(petData);
  return pet;
};

const add = async (petData) => {
  petData = _validate(petData);
  const pet = await Pet.create(petData);
  return pet;
};

const deletePet = async (petId) => {
  const pet = await Pet.findByPk(petId);
  pet.destroy();
};

module.exports = {
  getAll,
  getOne,
  update,
  add,
  deletePet,
};
