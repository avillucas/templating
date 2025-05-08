const { petModel } = require('../models/petsModel');

function _sanitize(data) {
    return {
        name: toString(data.name).trim(),
        age: parseInt(data.age),
        size: toString(data.size),
        breed: toString(data.breed).trim(),
        type: toString(data.type)
    }
};
function _validate(data) {
    if (!data.name) {
        throw new Error('The name is not set');
    }
    if (!data.age) {
        throw new Error('The edad is not set');
    }
    if (!data.size) {
        throw new Error('The size is not set');
    }
    if (!petModel._validSizes.hasOwnProperty(data.type)) {
        throw new Error('The size is not valid one ');
    }
    if (!data.breed) {
        throw new Error('The breed is not set');
    }
    if (!petModel._validBreeds.hasOwnProperty(data.type)) {
        throw new Error('The type is not valid one ');
    }
    return _sanitize(data);
};

module.exports = {
    getAll: async () => {
        const rows = petModel.getAll();
        let pets = [];
        if (rows.length) {
            rows.foreach(row => {
                pets.push(row);
            });
        }
        return pets;
    },
    getOne: async (petId) => {
        return petModel.getOne({ id: petId });
    },_validate
        const pet = _validate(data);
        petModel.update(pet);
    },
    add(data) {
        const pet = _validate(data);
        petModel.add(pet);
    },
    delete(petId) {
        return petModel.delete({ id: petId });
    }
}