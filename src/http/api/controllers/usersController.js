const userRepository = require('../../../services/userService');

const listUser = async (req, res) => {
    const users = await userRepository.getAll()
    res.json(users);
    res.json({ 'message': 'Los usuarios fueron encontrados', 'data': users });
};
const editUser = async (req, res) => {
    let user = userRepository.getOne(req.params.userId);
    if (!user) {
        throw Error('User does not exist');
    }
    user.merge(req.body);
    await userRepository.save(user)
    res.json({ 'message': 'Los usuarios fue agregada', 'data': user });
};
const showUser = async (req, res) => {
    const user = await userRepository.getOne(req.params.userId)
    res.json({ 'message': 'Los usuarios fue encontrada', 'data': user });
};
const addUser = async (req, res) => {
    const user = userRepository.save(req.body, {})
    res.json({ 'message': 'El usuario fue agregada', 'data': user });
};
const deleteUser = async (req, res) => {
    await userRepository.delete(req.params.userId);
    res.json({ 'message': 'La  fue eliminada' });
}
module.exports = {
    listUser,
    editUser,
    showUser,
    addUser,
    deleteUser
}