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
const {
  authorize,
  roleAuthorization,
} = require("../middleware/auth.middleware");

router.get("/", get);
router.get('/pending', authorize, roleAuthorization("editor", "admin"), getPending);
router.get("/:id", getConference);
router.post("/", authorize, roleAuthorization("editor", "admin"), add);
router.put('/confirmation', authorize, roleAuthorization("editor", "admin"), conferenceConfirmation);
router.put("/:id", authorize, roleAuthorization("editor", "admin"), update);
module.exports = router;
