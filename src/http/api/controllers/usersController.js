const userRepository = require('../../../services/userService');
module.exports = {
    list: async (req, res) => {
        const users = await userRepository.getAll()
        res.json(users);
        res.json({'message' :'Los usuarios fueron encontrados','data':users});
    },
    edit: async (req, res) => {
        let user= req.body;
        user.id = req.params.userId;
        await userRepository.save(user)
        res.json({'message' :'Los usuarios fue agregada','data':user});
    },
    show: async (req, res) => {
        const user = await userRepository.getOne(req.params.userId)
        res.json({'message' :'Los usuarios fue encontrada','data':user});
    },
    add: async (req, res) => {
        const user = userRepository.save(req.body, {})
        res.json({'message' :'El usuario fue agregada','data':user});
    },
    erase: async (req, res) => {
        await userRepository.delete(req.params.userId);
        res.json({'message' :'La  fue eliminada'});
    }
}