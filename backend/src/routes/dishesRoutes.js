
const express = require("express");

const {
  getAllDishes,
  getDishesByCategory,
  getDishByName,
  searchDishes,
} = require("../controllers/dishesController");

const router = express.Router();

// GET /api/dishes
router.get("/", getAllDishes);

// GET /api/dishes/search?q=chicken
router.get("/search", searchDishes);

// GET /api/dishes/category/:category
router.get("/category/:category", getDishesByCategory);

// GET /api/dishes/:category/:name
router.get("/:category/:name", getDishByName);

module.exports = router;
