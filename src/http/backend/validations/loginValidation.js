const { body } = require('express-validator');

module.exports = {
    loginValidations: [
        body('email')
            .isEmail()
            .withMessage('Ingrese una dieccion de email valida'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('La contraseña debe tener al menos 6 caracteres'),
    ]
}

//@todo crear rutas y demas app.post('login', loginValidations, validateInput, Logincontroller.checkLogin)