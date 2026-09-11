const express = require("express");
const router = express.Router();

const controller = require("../controllers/inventoryController");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.use(auth);

router.get(
  "/",
  role("chef", "manager", "admin"),
  controller.getInventory
);

router.post(
  "/",
  role("admin", "manager"),
  controller.createItem
);

router.put(
  "/:id",
  role("admin", "manager"),
  controller.updateItem
);

router.patch(
  "/:id",
  role("admin", "manager"),
  controller.updateItem
);

router.patch(
  "/:id/stock",
  role("chef", "manager", "admin"),
  controller.updateStock
);

router.delete(
  "/:id",
  role("admin"),
  controller.deleteItem
);

module.exports = router;