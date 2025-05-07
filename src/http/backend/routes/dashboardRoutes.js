const express = require('express');
const router = express.Router();

const { dashboard } = require('../controllers/dashboarControler');
router.get('', dashboard);

module.exports = router;