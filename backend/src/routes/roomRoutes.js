const express = require("express");
const router = express.Router();

const controller = require("../controllers/roomController");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.use(auth);

router.get("/", controller.getRooms);

router.post(
  "/",
  role("admin"),
  controller.createRoom
);

router.put(
  "/:id",
  role("manager", "admin"),
  controller.updateRoom
);

router.patch(
  "/:id",
  role("manager", "admin"),
  controller.updateRoom
);

router.patch(
  "/:id/reserve",
  role("manager", "admin"),
  controller.reserve
);

router.patch(
  "/:id/check-in",
  role("manager", "admin"),
  controller.checkIn
);

router.patch(
  "/:id/check-out",
  role("manager", "admin"),
  controller.checkOut
);

router.patch(
  "/:id/clean",
  role("manager", "admin"),
  controller.clean
);

module.exports = router;