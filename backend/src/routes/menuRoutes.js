const express = require("express");
const router = express.Router();

const controller = require("../controllers/menuController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get("/", controller.getMenu);

router.get("/:id", controller.getDish);

router.post(
  "/",
  auth,
  role("admin"),
  controller.createDish
);

router.put(
  "/:id",
  auth,
  role("admin"),
  controller.updateDish
);

router.patch(
  "/:id",
  auth,
  role("admin"),
  controller.updateDish
);

router.delete(
  "/:id",
  auth,
  role("admin"),
  controller.deleteDish
);

module.exports = router;