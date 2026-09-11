const db = require("../config/database");

exports.generateBill = (req, res) => {
  const order = db
    .prepare(`
      SELECT *
      FROM orders
      WHERE id = ?
    `)
    .get(req.body.order_id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  const existing = db
    .prepare(`
      SELECT *
      FROM bills
      WHERE order_id = ?
    `)
    .get(order.id);

  if (existing) {
    return res.json({
      success: true,
      bill: existing,
    });
  }

  const subtotal = order.total_amount;
  const tax = subtotal * 0.05;
  const discount = Number(req.body.discount) || 0;
  const total = subtotal + tax - discount;

  const result = db
    .prepare(`
      INSERT INTO bills
      (order_id, subtotal, tax, discount, total, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    .run(
      order.id,
      subtotal,
      tax,
      discount,
      total,
      "unpaid"
    );

  const bill = db
    .prepare("SELECT * FROM bills WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json({
    success: true,
    message: "Bill generated",
    bill,
  });
};

exports.getBills = (req, res) => {
  const bills = db
    .prepare(`
      SELECT *
      FROM bills
      ORDER BY id DESC
    `)
    .all();

  res.json({
    success: true,
    bills,
  });
};

exports.getBill = (req, res) => {
  const bill = db
    .prepare(`
      SELECT *
      FROM bills
      WHERE id = ?
    `)
    .get(req.params.id);

  if (!bill) {
    return res.status(404).json({
      success: false,
      message: "Bill not found",
    });
  }

  res.json({
    success: true,
    bill,
  });
};

exports.updateBill = (req, res) => {
  const {
    discount,
    status,
  } = req.body;

  const bill = db
    .prepare("SELECT * FROM bills WHERE id = ?")
    .get(req.params.id);

  if (!bill) {
    return res.status(404).json({
      success: false,
      message: "Bill not found",
    });
  }

  const newDiscount =
    discount !== undefined
      ? Number(discount)
      : bill.discount;

  const newTotal =
    bill.subtotal +
    bill.tax -
    newDiscount;

  db.prepare(`
    UPDATE bills
    SET discount = ?,
        total = ?,
        status = COALESCE(?, status)
    WHERE id = ?
  `).run(
    newDiscount,
    newTotal,
    status,
    req.params.id
  );

  res.json({
    success: true,
    message: "Bill updated",
  });
};