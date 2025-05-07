const fs = require('fs');
var path = require('path');
const readJson = fs.readFileSync(path.join(__dirname, '../data/pets.json'));
module.exports = {
    getAll: async () => {
        return JSON.parse(readJson);
    },
    getOne: async (petId) => {
        const pets = JSON.parse(readJson);
        if (!pets[petId]) {
            throw new Error('The pet do not exists');
        }
        return pets[petId];
    },
    update(petId, data) {
        let pet = this.getOne(petId);
        this.validate(data);
        this.save(data,pet);
    },
    save(data, pet = null) {
        if (!pet) {
            let pet = {};
        }
        if (data.nombre) {
            pet.nombre = data.nombre;
        }
        if (data.edad) {
            pet.edad = data.edad;
        }
        if (data.size) {
            pet.size = data.size;
        }
        if (data.raza) {
            pet.edad = data.raza;
        }
        if (data.tipo) {
            pet.tipo = data.tipo;
        }
        //@todo save en el json  
        return pet;
    },
    validate(data) {
        if (!data.nombre) {
            throw new Error('The name is not set');
        }
        if (!data.edad) {
            throw new Error('The edad is not set');
        }
        //@todo agregar ENUMS 
        if (!data.size) {
            throw new Error('The size is not set');
        }
        //@todo agregar ENUMS 
        if (!data.raza) {
            throw new Error('The raza is not set');
        }
        //@todo agregar ENUMS 
        if (!data.tipo) {
            throw new Error('The tipo is not set');
        }
    },
    sanitize(data) {
        //@todo Completar
        return data;
    },
    delete(petId){
        //@todo salvar en el archivo 
        delete pets[petId];
    }
}