const db = require("../config/database");

exports.createPayment = (req, res) => {
  const {
    bill_id,
    amount,
    payment_method,
    transaction_id,
  } = req.body;

  const bill = db
    .prepare("SELECT * FROM bills WHERE id = ?")
    .get(bill_id);

  if (!bill) {
    return res.status(404).json({
      success: false,
      message: "Bill not found",
    });
  }

  const result = db
    .prepare(`
      INSERT INTO payments
      (bill_id, amount, payment_method, transaction_id, status)
      VALUES (?, ?, ?, ?, ?)
    `)
    .run(
      bill_id,
      amount,
      payment_method,
      transaction_id || null,
      "completed"
    );

  db.prepare(`
    UPDATE bills
    SET status = 'paid'
    WHERE id = ?
  `).run(bill_id);

  res.status(201).json({
    success: true,
    message: "Payment recorded",
    payment_id: result.lastInsertRowid,
  });
};

exports.getPayments = (req, res) => {
  const payments = db
    .prepare(`
      SELECT *
      FROM payments
      ORDER BY id DESC
    `)
    .all();

  res.json({
    success: true,
    payments,
  });
};