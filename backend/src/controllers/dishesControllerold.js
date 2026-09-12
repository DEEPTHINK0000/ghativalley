
const dishes = require("../models/dishes.json");

/**
 * Get all dishes
 * GET /api/dishes
 */
const getAllDishes = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Dishes fetched successfully",

      currency: dishes.currency,
      currency_symbol: dishes.currency_symbol,

      total_categories: dishes.categories.length,

      total_items: dishes.categories.reduce(
        (total, category) => total + category.items.length,
        0
      ),

      categories: dishes.categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dishes",
      error: error.message,
    });
  }
};

/**
 * Get dish by category and item name
 * GET /api/dishes/:category/:name
 */
const getDishByName = (req, res) => {
  try {
    const categoryName = decodeURIComponent(
      req.params.category
    ).toLowerCase();

    const dishName = decodeURIComponent(
      req.params.name
    ).toLowerCase();

    const category = dishes.categories.find(
      (category) =>
        category.category_name.toLowerCase() === categoryName
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const dish = category.items.find(
      (item) => item.name.toLowerCase() === dishName
    );

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    res.status(200).json({
      success: true,
      currency: dishes.currency,
      currency_symbol: dishes.currency_symbol,

      category: category.category_name,

      data: dish,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dish",
      error: error.message,
    });
  }
};

/**
 * Get dishes by category
 * GET /api/dishes/category/:category
 */
const getDishesByCategory = (req, res) => {
  try {
    const categoryName = decodeURIComponent(
      req.params.category
    ).toLowerCase();

    const category = dishes.categories.find(
      (category) =>
        category.category_name.toLowerCase() === categoryName
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category dishes fetched successfully",

      currency: dishes.currency,
      currency_symbol: dishes.currency_symbol,

      category: category.category_name,

      total: category.items.length,

      data: category.items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch category dishes",
      error: error.message,
    });
  }
};

/**
 * Search dishes
 * GET /api/dishes/search?q=chicken
 */
const searchDishes = (req, res) => {
  try {
    const search = String(req.query.q || "")
      .trim()
      .toLowerCase();

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const results = [];

    dishes.categories.forEach((category) => {
      category.items.forEach((item) => {
        const nameMatch = item.name
          .toLowerCase()
          .includes(search);

        const descriptionMatch = item.description
          ?.toLowerCase()
          .includes(search);

        if (nameMatch || descriptionMatch) {
          results.push({
            category: category.category_name,
            ...item,
          });
        }
      });
    });

    res.status(200).json({
      success: true,
      message: "Search completed successfully",

      currency: dishes.currency,
      currency_symbol: dishes.currency_symbol,

      search: search,

      total: results.length,

      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to search dishes",
      error: error.message,
    });
  }
};

module.exports = {
  getAllDishes,
  getDishesByCategory,
  getDishByName,
  searchDishes,
};

