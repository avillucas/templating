const { conn } = require('./connection');
const model = {
    _validBreeds: {cat:'Gato',dog:'Perro'},
    _validSizes: {small:'Chico',medium:'Mediano',large:'Grande'},
    _execute: async (dql, params) => {
        try {
            const [result, fields] = await connection.execute(dql, params);
            console.log(result, fields);
            return result;
        } catch (error) {
            throw error;
        } finally {
            conn.releaseConnection();
        }
    },
    getAll: async () => {
        return this._execute('SELECT `id`, `name`, `age`, `breed`, `type`  FROM `pets` GROUP BY `id`, `name`, `age`, `breed`, `type` ', []);
    },
    getOne: async (pet) => {
        const rows = this._execute('SELECT  `id`, `name`, `age`, `breed`, `type`  FROM `pets` WHERE `id` = ?', [pet.id]);
        return rows[0];
    },
    update(pet) {
        const rows = this._execute('UPDATE  `pets`  SET  `name` = :petName , `age` = :petAge , `breed` = :petBreed , `type`  = :petType  FROM WHERE `id` = :petId', {
            petName: pet.name,
            petAge: pet.age,
            petBreed: pet.breed,
            petType: pet.type,
            petId: pet.id
        });
        console.result()
        return rows[0];
    },
    add(pet) {
        const rows = this._execute('INSERT INTO `pets` (  `name`, `age`, `breed`, `type` ) VALUES (:petName ,:petAge ,:petBreed ,:petType )', {
            petName: pet.name,
            petAge: pet.age,
            petBreed: pet.breed,
            petType: pet.type,
            petId: pet.id
        });
    },
    delete(pet) {
        const result = this._execute('DELETE FROM `pets` WHERE `id` = :petId', { petId: pet.id });
        return result;
    }
}
module.exports = {
    model
}