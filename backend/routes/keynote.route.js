const express = require('express');
const router = express.Router();
const {
  add,
  update,
  remove,
  getKeynotes,
} = require('../controllers/keynote.controller');

router.post('/', add);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/:id', getKeynotes);

module.exports = router;
