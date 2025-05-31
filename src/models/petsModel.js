const { _execute } = require('../config/connectionMysql');

const model = {
    _validBreeds: { cat: 'Cat', dog: 'Dog' },
    _validSizes: { small: 'Small', medium: 'Medium', large: 'Largo' },
    getAll: async () => {
        const  rows = await  _execute('SELECT `id`, `name`, `age`, `breed`, `type` , `size`  FROM `pets` GROUP BY `id`, `name`, `age`, `breed`, `type` ', []);
        let pets = []; 
        rows.forEach(function (row) {
            pets.push(row);
        });
        return pets;
    },
    getOne: async (pet) => {
        const rows = await  _execute('SELECT  `id`, `name`, `age`, `breed`, `type` , `size`  FROM `pets` WHERE `id` = ?', [pet.id]);
        console.log(rows, pet.id);
        return rows[0];
    },
    update(pet) {
        const rows = _execute('UPDATE  `pets`  SET  `name` = :petName , `age` = :petAge , `breed` = :petBreed , `type`  = :petType , `size` = :petSize   WHERE `id` = :petId', {
            petName: pet.name,
            petAge: pet.age,
            petBreed: pet.breed,
            petType: pet.type,
            petSize: pet.size,
            petId: pet.id
        });
        return rows[0];
    },
    add(pet) {
        let newPet = {
            petName: pet.name,
            petAge: pet.age,
            petBreed: pet.breed,
            petType: pet.type,
            petSize: pet.size,
        };
        const result =  _execute('INSERT INTO `pets` (  `name`, `age`, `breed`, `type` , `size`) VALUES (:petName ,:petAge ,:petBreed ,:petType ,:petSize )', newPet);
        newPet.id = result.insertId;
        return newPet;  
    },
    delete(pet) {
        const result = _execute('DELETE FROM `pets` WHERE `id` = :petId', { petId: pet.id });
        return result;
    }
}
module.exports = {
    petModel: model
}