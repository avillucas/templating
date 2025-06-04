const userRepository = require("../../../services/userService");

const listUser = async (req, res) => {
  const users = await userRepository.getAll();
  res.json({ message: "Los usuarios fueron encontrados", data: users });
};
const editUser = async (req, res) => {
  let user = req.body;
  user.id = req.params.userId;
  const userUpdated = await userRepository.update(user);
  if (!userUpdated) {
    throw Error("The pet could not be updated");
  }
  res.json({ message: "La usuarios fue agregada", data: user });
};
const showUser = async (req, res) => {
  const user = await userRepository.getOne(req.params.userId);
  res.json({ message: "Los usuarios fue encontrada", data: user });
};
const addUser = async (req, res) => {
  const user = await userRepository.add(req.body, {});
  if (!user) {
    throw Error("The user could not be created");
  }
  res.json({ message: "El usuario fue agregado", data: user });
};
const deleteUser = async (req, res) => {
  const deleted = await userRepository.deleteUser(req.params.userId);
  if (!deleted) {
    throw Error("The pet could not be deleted");
  }
  res.json({ message: "La  fue elimnado" });
};
module.exports = {
  listUser,
  editUser,
  showUser,
  addUser,
  deleteUser,
};
