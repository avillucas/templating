const { validationResult } = require('express-validator');
module.exports = {
    validateInput: function (req, res, next) {
        const error = validationResult(req);
        if (!errors.empty()) {
            res.status(400).send({ errors: errors.array() });
        }
        next(req, res);
    }
};
