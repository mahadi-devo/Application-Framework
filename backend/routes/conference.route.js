const express = require('express');
const router = express.Router();
const {
  add,
  update,
  get,
  getConference,
} = require('../controllers/conference.controller');

router.get('/', get);
router.get('/:id', getConference);
router.post('/', add);
router.put('/:id', update);

module.exports = router;
