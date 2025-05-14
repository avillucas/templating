const { conn } = require('./connection');

async function _execute(dql, params) {
    try {
        const [result, fields] = await conn.execute(dql, params);
        console.log(result, fields);
        return result;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
};
const model = {
    _validBreeds: { cat: 'Gato', dog: 'Perro' },
    _validSizes: { small: 'Chico', medium: 'Mediano', large: 'Grande' },
    getAll: async () => {
        return _execute('SELECT `id`, `name`, `age`, `breed`, `type`  FROM `pets` GROUP BY `id`, `name`, `age`, `breed`, `type` ', []);
    },
    getOne: async (pet) => {
        const rows = _execute('SELECT  `id`, `name`, `age`, `breed`, `type`  FROM `pets` WHERE `id` = ?', [pet.id]);
        return rows[0];
    },
    update(pet) {
        const rows = _execute('UPDATE  `pets`  SET  `name` = :petName , `age` = :petAge , `breed` = :petBreed , `type`  = :petType   WHERE `id` = :petId', {
            petName: pet.name,
            petAge: pet.age,
            petBreed: pet.breed,
            petType: pet.type,
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
        };
        const result = _execute('INSERT INTO `pets` (  `name`, `age`, `breed`, `type` ) VALUES (:petName ,:petAge ,:petBreed ,:petType )', newPet);
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