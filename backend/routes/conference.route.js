const express = require("express");
const router = express.Router();
const {
  add,
  update,
  get,
  getConference,
} = require("../controllers/conference.controller");
const {
  authorize,
  roleAuthorization,
} = require("../middleware/auth.middleware");

router.get("/", get);
router.get("/:id", getConference);
router.post("/", authorize, roleAuthorization("editor", "admin"), add);
router.put("/:id", authorize, roleAuthorization("editor", "admin"), update);

module.exports = router;
