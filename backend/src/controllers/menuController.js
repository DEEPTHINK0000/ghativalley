const db = require("../config/database");

exports.getMenu = (req, res) => {
  const menu = db
    .prepare(`
      SELECT *
      FROM menu
      ORDER BY category, name
    `)
    .all();

  res.json({
    success: true,
    menu,
  });
};

exports.getDish = (req, res) => {
  const dish = db
    .prepare("SELECT * FROM menu WHERE id = ?")
    .get(req.params.id);

  if (!dish) {
    return res.status(404).json({
      success: false,
      message: "Dish not found",
    });
  }

  res.json({
    success: true,
    dish,
  });
};

exports.createDish = (req, res) => {
  const {
    name,
    category,
    description,
    price,
    image,
    available = 1,
  } = req.body;

  if (!name || !category || price === undefined) {
    return res.status(400).json({
      success: false,
      message: "Name, category and price are required",
    });
  }

  const result = db
    .prepare(`
      INSERT INTO menu
      (name, category, description, price, image, available)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    .run(
      name,
      category,
      description || null,
      price,
      image || null,
      available
    );

  res.status(201).json({
    success: true,
    message: "Dish created",
    id: result.lastInsertRowid,
  });
};

exports.updateDish = (req, res) => {
  const {
    name,
    category,
    description,
    price,
    image,
    available,
  } = req.body;

  const result = db
    .prepare(`
      UPDATE menu
      SET name = COALESCE(?, name),
          category = COALESCE(?, category),
          description = COALESCE(?, description),
          price = COALESCE(?, price),
          image = COALESCE(?, image),
          available = COALESCE(?, available)
      WHERE id = ?
    `)
    .run(
      name,
      category,
      description,
      price,
      image,
      available,
      req.params.id
    );

  if (!result.changes) {
    return res.status(404).json({
      success: false,
      message: "Dish not found",
    });
  }

  res.json({
    success: true,
    message: "Dish updated",
  });
};

exports.deleteDish = (req, res) => {
  const result = db
    .prepare("DELETE FROM menu WHERE id = ?")
    .run(req.params.id);

  if (!result.changes) {
    return res.status(404).json({
      success: false,
      message: "Dish not found",
    });
  }

  res.json({
    success: true,
    message: "Dish deleted",
  });
};