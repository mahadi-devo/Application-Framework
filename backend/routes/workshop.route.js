const express = require('express');
const router = express.Router();

const { add } = require('../controllers/workshop.controller');

router.post('/', add);

module.exports = router;
