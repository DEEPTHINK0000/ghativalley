const express = require("express");
const router = express.Router();

const controller = require("../controllers/OrderController");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.use(auth);

router.get("/", controller.getOrders);

router.get("/:id", controller.getOrder);

router.post("/", role("customer"), controller.createOrder);

router.put(
  "/:id",
  role("chef", "manager", "admin"),
  controller.updateOrder
);

router.patch(
  "/:id",
  role("chef", "manager", "admin"),
  controller.updateOrder
);

router.post(
  "/:id/cancel",
  role("customer"),
  controller.cancelOrder
);

module.exports = router;