const express = require("express");
const router = express.Router();
const {
  authorize,
  roleAuthorization,
} = require("../middleware/auth.middleware");
const {
  add,
  get,
  update,
  del,
  getAllWorkshops,
  updateWorkshopStatus,
} = require("../controllers/workshop.controller");

router.post("/", add);
router.get("/", get);
router.get(
  "/all",
  authorize,
  roleAuthorization("admin", "reviewer"),
  getAllWorkshops
);
router.put(
  "/updateStatus",
  authorize,
  roleAuthorization("admin", "reviewer"),
  updateWorkshopStatus
);
router.put("/:id", update);
router.delete("/:id", del);

module.exports = router;
