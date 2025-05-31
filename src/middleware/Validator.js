const { validationResult } = require('express-validator');

const validateInput = (req, res, next) => {
    const error = validationResult(req);
    if (!errors.empty()) {
        res.status(400).send({ errors: errors.array() });
    }
    next(req, res);
};

module.exports = validateInput;
