const express = require('express');
const router = express.Router();
const { add } = require('../controllers/payment.controller');
const {
  authorize,
  roleAuthorization,
} = require('../middleware/auth.middleware');

router.post('/', authorize, roleAuthorization('attendee', 'researcher'), add);

module.exports = router;
