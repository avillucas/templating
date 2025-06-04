const { conn } = require("../config/connectionMysql");

async function _execute(dql, params) {
  try {
    const [rows, result] = await conn.query(dql, params);
    if (rows.insertId) {
      params.id = rows.insertId;
      return params;
    }
    return rows;
  } catch (error) {
    throw error;
  } finally {
    conn.releaseConnection();
  }
}
const model = {
  _validBreeds: { cat: "Cat", dog: "Dog" },
  _validSizes: { small: "Small", medium: "Medium", large: "Largo" },
  getAll: async () => {
    const rows = await _execute(
      "SELECT `id`, `name`, `age`, `breed`, `type` , `size`  FROM `pets` GROUP BY `id`, `name`, `age`, `breed`, `type` ",
      []
    );
    let pets = [];
    rows.forEach(function (row) {
      pets.push(row);
    });
    return pets;
  },
  getOne: async (pet) => {
    const rows = await _execute(
      "SELECT  `id`, `name`, `age`, `breed`, `type` , `size`  FROM `pets` WHERE `id` = ?",
      [pet.id]
    );
    return rows[0];
  },
  update: async (petData) => {
    const result = await _execute(
      "UPDATE  `pets`  SET  `name` = :petName , `age` = :petAge , `breed` = :petBreed , `type`  = :petType , `size` = :petSize   WHERE `id` = :petId",
      {
        petName: petData.name,
        petAge: petData.age,
        petBreed: petData.breed,
        petType: petData.type,
        petSize: petData.size,
        petId: petData.id,
      }
    );
    return result && result.affectedRows;
  },
  add(pet) {
    let newPet = {
      petName: pet.name,
      petAge: pet.age,
      petBreed: pet.breed,
      petType: pet.type,
      petSize: pet.size,
    };
    const result = _execute(
      "INSERT INTO `pets` (  `name`, `age`, `breed`, `type` , `size`) VALUES (:petName ,:petAge ,:petBreed ,:petType ,:petSize )",
      newPet
    );
    newPet.id = result.insertId;
    return newPet;
  },
  async delete(id) {
    const result = await _execute("DELETE FROM `pets` WHERE `id` = :petId", {
      petId: id,
    });
    return result && result.affectedRows;
  },
};
module.exports = {
  petModel: model,
};
