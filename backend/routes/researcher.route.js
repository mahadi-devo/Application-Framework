const express = require('express');
const router = express.Router();

const {
  add,
  get,
  update,
  del,
} = require('../controllers/researcher.controller');

router.post('/', add);
router.get('/', get);
router.put('/:id', update);
router.delete('/:id', del);

module.exports = router;
