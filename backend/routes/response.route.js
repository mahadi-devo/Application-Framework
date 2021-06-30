const { response } = require('express');
const express = require('express');
const router = express.Router();
const attendeeEmailConfirmation = require('../utills/attendeePaymentConfirmation');

router.post('/', async (req, res) => {
  console.log(req.body);
  const { email, subject, textBody, htmlBody } = req.body;
  await attendeeEmailConfirmation(email, subject, textBody, htmlBody);
  res.status(200).json({ success: true });
});

module.exports = router;
