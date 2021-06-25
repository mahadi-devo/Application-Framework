const express = require('express');
const router = express.Router();

const { add } = require('../controllers/researcher.controller');

router.post('/', add);

module.exports = router;
