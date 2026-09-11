const db = require("../config/database");

exports.getOrders = (req, res) => {
  const orders = db
    .prepare(`
      SELECT
        o.*,
        u.name AS customer_name
      FROM orders o
      JOIN users u ON u.id = o.user_id
      WHERE o.status IN
      ('pending', 'approved', 'cancel_requested', 'cooking')
      ORDER BY o.id ASC
    `)
    .all();

  res.json({
    success: true,
    orders,
  });
};

exports.approveOrder = (req, res) => {
  const result = db
    .prepare(`
      UPDATE orders
      SET status = 'approved'
      WHERE id = ?
      AND status = 'pending'
    `)
    .run(req.params.id);

  if (!result.changes) {
    return res.status(400).json({
      success: false,
      message: "Order cannot be approved",
    });
  }

  res.json({
    success: true,
    message: "Order approved",
  });
};

exports.rejectOrder = (req, res) => {
  const result = db
    .prepare(`
      UPDATE orders
      SET status = 'rejected'
      WHERE id = ?
      AND status IN ('pending', 'cancel_requested')
    `)
    .run(req.params.id);

  if (!result.changes) {
    return res.status(400).json({
      success: false,
      message: "Order cannot be rejected",
    });
  }

  res.json({
    success: true,
    message: "Order rejected",
  });
};

exports.cookOrder = (req, res) => {
  const result = db
    .prepare(`
      UPDATE orders
      SET status = 'cooking'
      WHERE id = ?
      AND status = 'approved'
    `)
    .run(req.params.id);

  if (!result.changes) {
    return res.status(400).json({
      success: false,
      message: "Order cannot start cooking",
    });
  }

  res.json({
    success: true,
    message: "Cooking started",
  });
};

exports.completeOrder = (req, res) => {
  const result = db
    .prepare(`
      UPDATE orders
      SET status = 'cooked'
      WHERE id = ?
      AND status = 'cooking'
    `)
    .run(req.params.id);

  if (!result.changes) {
    return res.status(400).json({
      success: false,
      message: "Order cannot be completed",
    });
  }

  res.json({
    success: true,
    message: "Food marked as cooked",
  });
};

exports.cancelOrder = (req, res) => {
  const result = db
    .prepare(`
      UPDATE orders
      SET status = 'cancelled'
      WHERE id = ?
      AND status = 'cancel_requested'
    `)
    .run(req.params.id);

  if (!result.changes) {
    return res.status(400).json({
      success: false,
      message: "Cancellation cannot be approved",
    });
  }

  res.json({
    success: true,
    message: "Order cancelled",
  });
};