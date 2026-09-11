const db = require("../config/database");

exports.getRooms = (req, res) => {
  const rooms = db
    .prepare(`
      SELECT *
      FROM rooms
      ORDER BY room_number
    `)
    .all();

  res.json({
    success: true,
    rooms,
  });
};

exports.createRoom = (req, res) => {
  const {
    room_number,
    room_type,
    price,
  } = req.body;

  const result = db
    .prepare(`
      INSERT INTO rooms
      (room_number, room_type, price)
      VALUES (?, ?, ?)
    `)
    .run(
      room_number,
      room_type,
      price
    );

  res.status(201).json({
    success: true,
    message: "Room created",
    id: result.lastInsertRowid,
  });
};

exports.updateRoom = (req, res) => {
  const {
    room_type,
    price,
    status,
  } = req.body;

  const result = db
    .prepare(`
      UPDATE rooms
      SET room_type = COALESCE(?, room_type),
          price = COALESCE(?, price),
          status = COALESCE(?, status)
      WHERE id = ?
    `)
    .run(
      room_type,
      price,
      status,
      req.params.id
    );

  if (!result.changes) {
    return res.status(404).json({
      success: false,
      message: "Room not found",
    });
  }

  res.json({
    success: true,
    message: "Room updated",
  });
};

exports.checkIn = (req, res) => {
  const result = db
    .prepare(`
      UPDATE rooms
      SET status = 'occupied'
      WHERE id = ?
      AND status = 'reserved'
    `)
    .run(req.params.id);

  if (!result.changes) {
    return res.status(400).json({
      success: false,
      message: "Room must be reserved before check-in",
    });
  }

  res.json({
    success: true,
    message: "Check-in successful",
  });
};

exports.checkOut = (req, res) => {
  const result = db
    .prepare(`
      UPDATE rooms
      SET status = 'cleaning'
      WHERE id = ?
      AND status = 'occupied'
    `)
    .run(req.params.id);

  if (!result.changes) {
    return res.status(400).json({
      success: false,
      message: "Room is not occupied",
    });
  }

  res.json({
    success: true,
    message: "Check-out successful",
  });
};

exports.reserve = (req, res) => {
  const result = db
    .prepare(`
      UPDATE rooms
      SET status = 'reserved'
      WHERE id = ?
      AND status = 'available'
    `)
    .run(req.params.id);

  if (!result.changes) {
    return res.status(400).json({
      success: false,
      message: "Room is not available",
    });
  }

  res.json({
    success: true,
    message: "Room reserved",
  });
};

exports.clean = (req, res) => {
  const result = db
    .prepare(`
      UPDATE rooms
      SET status = 'available'
      WHERE id = ?
      AND status = 'cleaning'
    `)
    .run(req.params.id);

  if (!result.changes) {
    return res.status(400).json({
      success: false,
      message: "Room is not in cleaning state",
    });
  }

  res.json({
    success: true,
    message: "Room is available",
  });
};