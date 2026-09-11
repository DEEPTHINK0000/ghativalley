const express = require("express");
const router = express.Router();

const controller = require("../controllers/tableController");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.use(auth);

router.get("/", controller.getTables);

router.post(
  "/",
  role("admin"),
  controller.createTable
);

router.put(
  "/:id",
  role("manager", "admin"),
  controller.updateTable
);

router.patch(
  "/:id",
  role("manager", "admin"),
  controller.updateTable
);

router.patch(
  "/:id/allocate",
  role("manager", "admin"),
  controller.allocate
);

router.patch(
  "/:id/release",
  role("manager", "admin"),
  controller.release
);

module.exports = router;