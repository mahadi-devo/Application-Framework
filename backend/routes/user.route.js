const express = require("express");
const router = express.Router();

const {
  addUser,
  updateUser,
  getUser,
  getAllUser,
  removeUser,
  getAllTypes,
  getUserCount,
} = require("../controllers/user.controller");
const {
  authorize,
  roleAuthorization,
} = require("../middleware/auth.middleware");

router.get("/", authorize, roleAuthorization("admin"), getAllUser);
router.get("/types", getAllTypes);
router.get("/count/:type", getUserCount);
router.get("/:id", getUser);
router.post("/", addUser);
router.put("/", updateUser);
router.delete("/", removeUser);

module.exports = router;
