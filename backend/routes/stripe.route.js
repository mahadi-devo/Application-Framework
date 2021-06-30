const express = require('express');
const router = express.Router();
const { pay } = require('../controllers/stripe.controller');

router.post('/', pay);

module.exports = router;
