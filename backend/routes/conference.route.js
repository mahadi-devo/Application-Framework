const express = require('express');
const router = express.Router();
const {
  add,
  update,
  get,
  getConference,
  getPending,
} = require('../controllers/conference.controller');

router.get('/', get);
router.get('/pending', getPending);
router.get('/:id', getConference);
router.post('/', add);
router.put('/:id', update);

module.exports = router;
