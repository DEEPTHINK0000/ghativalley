const db = require("../config/database");

function updateAvailability(id) {
  const item = db
    .prepare(`
      SELECT quantity, minimum_quantity
      FROM inventory
      WHERE id = ?
    `)
    .get(id);

  if (!item) return;

  const available =
    item.quantity > item.minimum_quantity ? 1 : 0;

  db.prepare(`
    UPDATE inventory
    SET available = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(available, id);
}

exports.getInventory = (req, res) => {
  const inventory = db
    .prepare(`
      SELECT *
      FROM inventory
      ORDER BY name
    `)
    .all();

  res.json({
    success: true,
    inventory,
  });
};

exports.createItem = (req, res) => {
  const {
    name,
    category,
    quantity = 0,
    unit,
    minimum_quantity = 0,
  } = req.body;

  const result = db
    .prepare(`
      INSERT INTO inventory
      (name, category, quantity, unit, minimum_quantity)
      VALUES (?, ?, ?, ?, ?)
    `)
    .run(
      name,
      category || null,
      quantity,
      unit || null,
      minimum_quantity
    );

  updateAvailability(result.lastInsertRowid);

  res.status(201).json({
    success: true,
    message: "Inventory item created",
    id: result.lastInsertRowid,
  });
};

exports.updateItem = (req, res) => {
  const {
    name,
    category,
    quantity,
    unit,
    minimum_quantity,
  } = req.body;

  const result = db
    .prepare(`
      UPDATE inventory
      SET name = COALESCE(?, name),
          category = COALESCE(?, category),
          quantity = COALESCE(?, quantity),
          unit = COALESCE(?, unit),
          minimum_quantity =
            COALESCE(?, minimum_quantity),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `)
    .run(
      name,
      category,
      quantity,
      unit,
      minimum_quantity,
      req.params.id
    );

  if (!result.changes) {
    return res.status(404).json({
      success: false,
      message: "Inventory item not found",
    });
  }

  updateAvailability(req.params.id);

  res.json({
    success: true,
    message: "Inventory updated",
  });
};

exports.updateStock = (req, res) => {
  const { quantity } = req.body;

  const result = db
    .prepare(`
      UPDATE inventory
      SET quantity = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `)
    .run(
      quantity,
      req.params.id
    );

  if (!result.changes) {
    return res.status(404).json({
      success: false,
      message: "Inventory item not found",
    });
  }

  updateAvailability(req.params.id);

  res.json({
    success: true,
    message: "Stock updated",
  });
};

exports.deleteItem = (req, res) => {
  const result = db
    .prepare(`
      DELETE FROM inventory
      WHERE id = ?
    `)
    .run(req.params.id);

  if (!result.changes) {
    return res.status(404).json({
      success: false,
      message: "Inventory item not found",
    });
  }

  res.json({
    success: true,
    message: "Inventory item deleted",
  });
};