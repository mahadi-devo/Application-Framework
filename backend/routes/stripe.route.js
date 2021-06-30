const express = require("express");
const router = express.Router();
const { pay, researchPay } = require("../controllers/stripe.controller");

router.post("/", pay);
router.post("/researchPay", researchPay);

module.exports = router;
