const express = require('express');
const { roleAuthorization } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/auth.middleware');
const router = express.Router();

const {
  add,
  get,
  update,
  del,
} = require('../controllers/researcher.controller');

router.post('/', authorize, roleAuthorization('researcher'), add);
router.get('/', authorize, roleAuthorization('researcher'), get);
// router.get("/all", authorize, roleAuthorization("admin", "researcher"), get);
// router.put(
//   "/updateStatus",
//   authorize,
//   roleAuthorization("admin", "researcher"),
//   update
// );
router.put('/:id', authorize, roleAuthorization('researcher', 'admin'), update);
router.delete('/:id', authorize, roleAuthorization('researcher', 'admin'), del);

module.exports = router;
