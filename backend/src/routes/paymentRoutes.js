const express = require("express");
const router = express.Router();

const controller = require("../controllers/paymentController");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.use(auth);

router.post(
  "/",
  role("customer", "manager", "admin"),
  controller.createPayment
);

router.get(
  "/",
  role("manager", "admin"),
  controller.getPayments
);

module.exports = router;