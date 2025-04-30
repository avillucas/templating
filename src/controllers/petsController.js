const fs = require('fs');
const readJson = fs.readFileSync('../data/pets.json');
let pets = JSON.parse(readJson);
console.log('pets:', pets);
module.exports = {
    listPets: async (req, res) => {
        res.render('pets/list', { 'pets': pets, 'title': 'Dashboard' });
    },
    editPetForm: async (req, res) => {
        const id = req.params['id'];
        const pet = pets[id];
        res.render('pets/editform', { 'pet': pet, 'title': 'Editar mascota' });
    },
    editPet: async (req, res) => {
        const id = req.params['id'];
        const data = bodyParser.json();
        pets[id] = {
            'name': data.name,
            //etc
        };
        return res.status(302).redirect('/pets');
    },
    addPetForm: async (req, res) => {
        res.render('pets/addform', { 'title': 'Agregar Mascota' });
    },
    addPet: async (req, res) => {
        const data = bodyParser.json();
        pets.push({
            'name': data.name,
            //etc
        })
        return res.status(302).redirect('/pets');
    },
    showPet: async (req, res) => {
        const id = req.params['id'];
        const pet = pets[id];
        res.render('pets/show', { 'pet': pet, 'title': 'Ver Mascota' });
    },
    deletePet: async (req, res) => {
        const id = req.params['id'];
        delete pets[id];
        return res.status(302).redirect('/pets');
    }
}