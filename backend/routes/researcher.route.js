const express = require("express");
const {
  updateResearchStatus,
} = require("../controllers/researcher.controller");
const { roleAuthorization } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/auth.middleware");
const router = express.Router();

const {
  add,
  get,
  update,
  del,
  getAllResearches,
} = require("../controllers/researcher.controller");

router.post("/", add);
router.get("/", get);
router.get(
  "/all",
  authorize,
  roleAuthorization("admin", "reviewer"),
  getAllResearches
);
router.put(
  "/updateStatus",
  authorize,
  roleAuthorization("admin", "reviewer"),
  updateResearchStatus
);
router.put("/:id", authorize, roleAuthorization("user"), update);
router.delete("/:id", authorize, roleAuthorization("user"), del);

module.exports = router;
