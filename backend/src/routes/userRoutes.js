const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get(
  "/",
  auth,
  role("admin", "manager"),
  controller.getUsers
);

router.get(
  "/:id",
  auth,
  controller.getUser
);

router.post(
  "/",
  auth,
  role("admin"),
  controller.createUser
);

router.put(
  "/:id",
  auth,
  role("admin", "manager"),
  controller.updateUser
);

router.delete(
  "/:id",
  auth,
  role("admin"),
  controller.deleteUser
);

module.exports = router;