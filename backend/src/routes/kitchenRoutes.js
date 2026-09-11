const express = require("express");
const router = express.Router();

const controller = require("../controllers/kitchenController");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.use(auth);
router.use(role("chef", "manager", "admin"));

router.get(
  "/orders",
  controller.getOrders
);

router.patch(
  "/orders/:id/approve",
  controller.approveOrder
);

router.patch(
  "/orders/:id/reject",
  controller.rejectOrder
);

router.patch(
  "/orders/:id/cook",
  controller.cookOrder
);

router.patch(
  "/orders/:id/cooked",
  controller.completeOrder
);

router.patch(
  "/orders/:id/cancel",
  controller.cancelOrder
);

module.exports = router;