
const express = require("express");

const {
  getAllDishes,
  getDishesByCategory,
  getDishByName,
  searchDishes,
} = require("../controllers/dishesControllerold");

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


// http://localhost:5000/api/dishes
// http://localhost:5000/api/dishes/search?q=chicken
// http://localhost:5000/api/dishes/category/Beverages
// http://localhost:5000/api/dishes/category/Chicken%20Gravy
// http://localhost:5000/api/dishes/Chicken%20Gravy/Butter%20Chicken%20Boneless