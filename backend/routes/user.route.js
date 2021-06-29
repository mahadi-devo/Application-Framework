const express = require('express');
const router = express.Router();

const { addUser, updateUser, getUser, getAllUser, removeUser } = require('../controllers/user.controller');

router.get('/', getAllUser);
router.get('/:id', getUser);
router.post('/', addUser);
router.put('/', updateUser);
router.delete('/', removeUser);

module.exports = router;