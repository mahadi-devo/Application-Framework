const express = require("express");
const { roleAuthorization } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/auth.middleware");
const router = express.Router();

const {
  add,
  get,
  update,
  del,
} = require("../controllers/researcher.controller");

router.post("/", add);
router.get("/", get);
// router.get("/all", authorize, roleAuthorization("admin", "researcher"), get);
// router.put(
//   "/updateStatus",
//   authorize,
//   roleAuthorization("admin", "researcher"),
//   update
// );
router.put("/:id", authorize, roleAuthorization("user"), update);
router.delete("/:id", authorize, roleAuthorization("user"), del);

module.exports = router;
