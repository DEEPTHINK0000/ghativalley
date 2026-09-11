const db = require("../config/database");

exports.createOrder = (req, res) => {
  const {
    items,
    table_id,
    room_id,
  } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Order items are required",
    });
  }

  const transaction = db.transaction(() => {
    let total = 0;

    const orderItems = [];

    for (const item of items) {
      const dish = db
        .prepare(`
          SELECT *
          FROM menu
          WHERE id = ? AND available = 1
        `)
        .get(item.menu_id);

      if (!dish) {
        throw new Error(
          `Dish ${item.menu_id} is unavailable`
        );
      }

      const quantity = Number(item.quantity) || 1;

      total += dish.price * quantity;

      orderItems.push({
        menu_id: dish.id,
        quantity,
        price: dish.price,
      });
    }

    const order = db
      .prepare(`
        INSERT INTO orders
        (user_id, table_id, room_id, status, total_amount)
        VALUES (?, ?, ?, ?, ?)
      `)
      .run(
        req.user.id,
        table_id || null,
        room_id || null,
        "pending",
        total
      );

    const orderId = order.lastInsertRowid;

    const insertItem = db.prepare(`
      INSERT INTO order_items
      (order_id, menu_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `);

    for (const item of orderItems) {
      insertItem.run(
        orderId,
        item.menu_id,
        item.quantity,
        item.price
      );
    }

    return orderId;
  });

  try {
    const orderId = transaction();

    res.status(201).json({
      success: true,
      message: "Order placed",
      order_id: orderId,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOrders = (req, res) => {
  let orders;

  if (req.user.role === "customer") {
    orders = db
      .prepare(`
        SELECT *
        FROM orders
        WHERE user_id = ?
        ORDER BY id DESC
      `)
      .all(req.user.id);
  } else {
    orders = db
      .prepare(`
        SELECT *
        FROM orders
        ORDER BY id DESC
      `)
      .all();
  }

  res.json({
    success: true,
    orders,
  });
};

exports.getOrder = (req, res) => {
  const order = db
    .prepare(`
      SELECT *
      FROM orders
      WHERE id = ?
    `)
    .get(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  const items = db
    .prepare(`
      SELECT
        oi.*,
        m.name,
        m.category
      FROM order_items oi
      JOIN menu m ON m.id = oi.menu_id
      WHERE oi.order_id = ?
    `)
    .all(req.params.id);

  res.json({
    success: true,
    order,
    items,
  });
};

exports.updateOrder = (req, res) => {
  const { status } = req.body;

  const allowedStatuses = [
    "pending",
    "approved",
    "rejected",
    "cooking",
    "cooked",
    "completed",
    "cancel_requested",
    "cancelled",
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid order status",
    });
  }

  const result = db
    .prepare(`
      UPDATE orders
      SET status = ?
      WHERE id = ?
    `)
    .run(status, req.params.id);

  if (!result.changes) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  res.json({
    success: true,
    message: "Order status updated",
  });
};

exports.cancelOrder = (req, res) => {
  const result = db
    .prepare(`
      UPDATE orders
      SET status = 'cancel_requested'
      WHERE id = ?
      AND user_id = ?
      AND status = 'pending'
    `)
    .run(
      req.params.id,
      req.user.id
    );

  if (!result.changes) {
    return res.status(400).json({
      success: false,
      message: "Order cannot be cancelled",
    });
  }

  res.json({
    success: true,
    message: "Cancellation requested",
  });
};