const fs = require("fs");
const path = require("path");

const dishesPath = path.join(
  __dirname,
  "../models/dishes.json"
);

function loadDishes() {
  const file = fs.readFileSync(dishesPath, "utf-8");
  return JSON.parse(file);
}

/*
|--------------------------------------------------------------------------
| Normalize complete JSON menu
|--------------------------------------------------------------------------
|
| Converts:
|
| category.items[]
|
| into a frontend-friendly structure:
|
| {
|   id,
|   name,
|   category,
|   price,
|   half_price,
|   full_price,
|   unit,
|   description,
|   variants,
|   available
| }
|
*/

function mapMenu(dishes) {
  let id = 1;

  return dishes.categories.flatMap((category) =>
    category.items.map((item) => ({
      id: id++,

      name: item.name,

      category: category.category_name,

      price: item.price ?? null,

      half_price: item.half_price ?? null,

      full_price: item.full_price ?? null,

      unit: item.unit ?? null,

      description: item.description ?? "",

      variants: item.variants ?? [],

      available: true,
    }))
  );
}


/*
|--------------------------------------------------------------------------
| GET ALL DISHES
|--------------------------------------------------------------------------
| GET /api/dishes
|--------------------------------------------------------------------------
*/

function getAllDishes(req, res) {
  try {
    const dishes = loadDishes();

    const menu = mapMenu(dishes);

    res.status(200).json({
      success: true,

      currency: dishes.currency,

      currency_symbol: dishes.currency_symbol,

      total_categories: dishes.categories.length,

      total_dishes: menu.length,

      categories: dishes.categories,

      menu,
    });

  } catch (error) {
    console.error("Error loading dishes:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load dishes",
    });
  }
}


/*
|--------------------------------------------------------------------------
| GET DISHES BY CATEGORY
|--------------------------------------------------------------------------
| GET /api/dishes/category/:category
|--------------------------------------------------------------------------
*/

function getDishesByCategory(req, res) {
  try {
    const dishes = loadDishes();

    const categoryName =
      decodeURIComponent(req.params.category)
        .trim()
        .toLowerCase();

    const category = dishes.categories.find(
      (item) =>
        item.category_name
          .trim()
          .toLowerCase() === categoryName
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    let id = 1;

    const items = category.items.map((item) => ({
      id: id++,

      name: item.name,

      category: category.category_name,

      price: item.price ?? null,

      half_price: item.half_price ?? null,

      full_price: item.full_price ?? null,

      unit: item.unit ?? null,

      description: item.description ?? "",

      variants: item.variants ?? [],

      available: true,
    }));

    res.status(200).json({
      success: true,

      currency: dishes.currency,

      currency_symbol: dishes.currency_symbol,

      category: category.category_name,

      count: items.length,

      items,
    });

  } catch (error) {
    console.error(
      "Error loading category:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to load category",
    });
  }
}


/*
|--------------------------------------------------------------------------
| GET SINGLE DISH
|--------------------------------------------------------------------------
| GET /api/dishes/:category/:name
|--------------------------------------------------------------------------
*/

function getDishByName(req, res) {
  try {
    const dishes = loadDishes();

    const categoryName =
      decodeURIComponent(req.params.category)
        .trim()
        .toLowerCase();

    const dishName =
      decodeURIComponent(req.params.name)
        .trim()
        .toLowerCase();

    const category = dishes.categories.find(
      (item) =>
        item.category_name
          .trim()
          .toLowerCase() === categoryName
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const item = category.items.find(
      (dish) =>
        dish.name
          .trim()
          .toLowerCase() === dishName
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    const result = {
      id: category.items.indexOf(item) + 1,

      name: item.name,

      category: category.category_name,

      price: item.price ?? null,

      half_price: item.half_price ?? null,

      full_price: item.full_price ?? null,

      unit: item.unit ?? null,

      description: item.description ?? "",

      variants: item.variants ?? [],

      available: true,
    };

    res.status(200).json({
      success: true,

      currency: dishes.currency,

      currency_symbol: dishes.currency_symbol,

      item: result,
    });

  } catch (error) {
    console.error(
      "Error loading dish:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to load dish",
    });
  }
}


/*
|--------------------------------------------------------------------------
| SEARCH DISHES
|--------------------------------------------------------------------------
| GET /api/dishes/search?q=chicken
|--------------------------------------------------------------------------
*/

function searchDishes(req, res) {
  try {
    const dishes = loadDishes();

    const query = String(
      req.query.q || ""
    )
      .trim()
      .toLowerCase();

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const menu = mapMenu(dishes);

    const results = menu.filter((dish) => {
      const searchText = [
        dish.name,
        dish.category,
        dish.description,
        ...dish.variants,
      ]
        .join(" ")
        .toLowerCase();

      return searchText.includes(query);
    });

    res.status(200).json({
      success: true,

      currency: dishes.currency,

      currency_symbol: dishes.currency_symbol,

      query,

      count: results.length,

      items: results,
    });

  } catch (error) {
    console.error(
      "Error searching dishes:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to search dishes",
    });
  }
}


module.exports = {
  getAllDishes,
  getDishesByCategory,
  getDishByName,
  searchDishes,
};