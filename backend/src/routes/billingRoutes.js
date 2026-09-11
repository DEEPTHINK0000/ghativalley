const express = require("express");
const router = express.Router();

const controller = require("../controllers/billingController");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.use(auth);

router.get(
  "/",
  role("manager", "admin"),
  controller.getBills
);

router.get(
  "/:id",
  controller.getBill
);

router.post(
  "/",
  role("manager", "admin"),
  controller.generateBill
);

router.put(
  "/:id",
  role("manager", "admin"),
  controller.updateBill
);

router.patch(
  "/:id",
  role("manager", "admin"),
  controller.updateBill
);

module.exports = router;