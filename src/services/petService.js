const { petModel } = require("../models/petsModel");

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
  if (!petModel._validSizes.hasOwnProperty(data.size)) {
    throw new Error("The size is not valid one ");
  }
  if (!data.breed) {
    throw new Error("The breed is not set");
  }
  if (!petModel._validBreeds.hasOwnProperty(data.type)) {
    throw new Error("The type is not valid one ");
  }
  return _sanitize(data);
}

const getAll = async () => {
  return petModel.getAll();
};
const getOne = async (petId) => {
  return petModel.getOne({ id: petId });
};
const save = (data) => {
  const pet = _validate(data);
  if (pet.id) {
    petModel.update(pet);
  } else {
    petModel.add(pet);
  }
  return pet;
};
const deletePet = (petId) => {
  return petModel.delete({ id: petId });
};

module.exports = {
  getAll,
  getOne,
  save,
  deletePet,
};
