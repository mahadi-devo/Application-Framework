const express = require('express');
const router = express.Router();
const {
  add,
  update,
  get,
  getConference,
  getPending,
  conferenceConfirmation,
} = require('../controllers/conference.controller');

router.get('/', get);
router.get('/pending', getPending);
router.get('/:id', getConference);
router.post('/', add);
router.put('/confirmation/:id', conferenceConfirmation);
router.put('/:id', update);

module.exports = router;
