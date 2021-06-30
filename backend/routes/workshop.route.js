const express = require('express');
const router = express.Router();
const {
  authorize,
  roleAuthorization,
} = require('../middleware/auth.middleware');
const {
  add,
  get,
  update,
  del,
  getAllWorkshops,
  updateWorkshopStatus,
} = require('../controllers/workshop.controller');

router.post('/', authorize, roleAuthorization('workshopConductor'), add);
router.get('/', authorize, roleAuthorization('workshopConductor'), get);
router.get(
  '/all',
  authorize,
  roleAuthorization('admin', 'reviewer'),
  getAllWorkshops
);
router.put(
  '/updateStatus',
  authorize,
  roleAuthorization('admin', 'reviewer'),
  updateWorkshopStatus
);
router.put('/:id', authorize, roleAuthorization('workshopConductor'), update);
router.delete('/:id', authorize, roleAuthorization('workshopConductor'), del);

module.exports = router;
