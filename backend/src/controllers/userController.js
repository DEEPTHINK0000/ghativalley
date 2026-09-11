const db = require("../config/database");
const bcrypt = require("bcryptjs");

exports.getUsers = (req, res) => {
  const users = db
    .prepare(`
      SELECT id, name, email, phone, role, created_at
      FROM users
      ORDER BY id DESC
    `)
    .all();

  res.json({
    success: true,
    users,
  });
};

exports.getUser = (req, res) => {
  const user = db
    .prepare(`
      SELECT id, name, email, phone, role, created_at
      FROM users
      WHERE id = ?
    `)
    .get(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.json({
    success: true,
    user,
  });
};

exports.createUser = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    role = "customer",
  } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Required fields missing",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = db
      .prepare(`
        INSERT INTO users
        (name, email, password, phone, role)
        VALUES (?, ?, ?, ?, ?)
      `)
      .run(
        name,
        email,
        hashedPassword,
        phone || null,
        role
      );

    res.status(201).json({
      success: true,
      message: "User created",
      id: result.lastInsertRowid,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to create user",
    });
  }
};

exports.updateUser = (req, res) => {
  const {
    name,
    phone,
    role,
  } = req.body;

  const result = db
    .prepare(`
      UPDATE users
      SET name = COALESCE(?, name),
          phone = COALESCE(?, phone),
          role = COALESCE(?, role)
      WHERE id = ?
    `)
    .run(
      name,
      phone,
      role,
      req.params.id
    );

  if (!result.changes) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.json({
    success: true,
    message: "User updated",
  });
};

exports.deleteUser = (req, res) => {
  const result = db
    .prepare("DELETE FROM users WHERE id = ?")
    .run(req.params.id);

  if (!result.changes) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.json({
    success: true,
    message: "User deleted",
  });
};