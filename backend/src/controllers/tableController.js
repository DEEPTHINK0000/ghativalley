const db = require("../config/database");

exports.getTables = (req, res) => {
  const tables = db
    .prepare(`
      SELECT *
      FROM tables
      ORDER BY table_number
    `)
    .all();

  res.json({
    success: true,
    tables,
  });
};

exports.createTable = (req, res) => {
  const {
    table_number,
    capacity,
  } = req.body;

  const result = db
    .prepare(`
      INSERT INTO tables
      (table_number, capacity)
      VALUES (?, ?)
    `)
    .run(
      table_number,
      capacity || 2
    );

  res.status(201).json({
    success: true,
    message: "Table created",
    id: result.lastInsertRowid,
  });
};

exports.updateTable = (req, res) => {
  const {
    capacity,
    status,
  } = req.body;

  const result = db
    .prepare(`
      UPDATE tables
      SET capacity = COALESCE(?, capacity),
          status = COALESCE(?, status)
      WHERE id = ?
    `)
    .run(
      capacity,
      status,
      req.params.id
    );

  if (!result.changes) {
    return res.status(404).json({
      success: false,
      message: "Table not found",
    });
  }

  res.json({
    success: true,
    message: "Table updated",
  });
};

exports.allocate = (req, res) => {
  const result = db
    .prepare(`
      UPDATE tables
      SET status = 'occupied'
      WHERE id = ?
      AND status = 'available'
    `)
    .run(req.params.id);

  if (!result.changes) {
    return res.status(400).json({
      success: false,
      message: "Table is not available",
    });
  }

  res.json({
    success: true,
    message: "Table allocated",
  });
};

exports.release = (req, res) => {
  const result = db
    .prepare(`
      UPDATE tables
      SET status = 'available'
      WHERE id = ?
    `)
    .run(req.params.id);

  if (!result.changes) {
    return res.status(404).json({
      success: false,
      message: "Table not found",
    });
  }

  res.json({
    success: true,
    message: "Table released",
  });
};