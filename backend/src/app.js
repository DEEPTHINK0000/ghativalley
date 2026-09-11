
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { WebSocketServer } = require("ws");

const app = express();

/* =========================================================
   CONFIGURATION
========================================================= */

const PORT = process.env.PORT || 5000;

/* =========================================================
   DATABASE
========================================================= */

// Initialize SQLite database
require("./config/database");

/* =========================================================
   CORS
========================================================= */

const allowedOrigins = [
  "http://localhost:3000",

  // Production frontend
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an Origin header
      // Example: Postman / server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS blocked:", origin);

      return callback(
        new Error(`CORS blocked for origin: ${origin}`)
      );
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
  })
);

/* =========================================================
   BODY PARSER
========================================================= */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* =========================================================
   REQUEST LOGGER
========================================================= */

app.use((req, res, next) => {
  console.log("------------------------------------------");
  console.log("Request received");
  console.log("Method :", req.method);
  console.log("URL    :", req.originalUrl);
  console.log("Origin :", req.headers.origin || "none");
  console.log("------------------------------------------");

  next();
});

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Ghati Valley Backend API is running",
    version: "1.0.0",
    environment:
      process.env.NODE_ENV || "development",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    service: "Ghati Valley API",
  });
});

/* =========================================================
   AUTHENTICATION
========================================================= */

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

/* =========================================================
   USERS
========================================================= */

app.use(
  "/api/users",
  require("./routes/userRoutes")
);

/* =========================================================
   MENU / DISHES
========================================================= */

app.use(
  "/api/menu",
  require("./routes/menuRoutes")
);

/*
   Optional legacy dishes route.

   If you still have:
   routes/dishesRoutes.js

   you can temporarily keep:

   app.use(
     "/api/dishes",
     require("./routes/dishesRoutes")
   );

   Once /api/menu is working, this can be removed.
*/

/* =========================================================
   ORDERS
========================================================= */

app.use(
  "/api/orders",
  require("./routes/orderRoutes")
);

/* =========================================================
   KITCHEN
========================================================= */

app.use(
  "/api/kitchen",
  require("./routes/kitchenRoutes")
);

/* =========================================================
   BILLING
========================================================= */

app.use(
  "/api/bills",
  require("./routes/billingRoutes")
);

/* =========================================================
   PAYMENTS
========================================================= */

app.use(
  "/api/payments",
  require("./routes/paymentRoutes")
);

/* =========================================================
   ROOMS
========================================================= */

app.use(
  "/api/rooms",
  require("./routes/roomRoutes")
);

/* =========================================================
   TABLES
========================================================= */

app.use(
  "/api/tables",
  require("./routes/tableRoutes")
);

/* =========================================================
   INVENTORY
========================================================= */

app.use(
  "/api/inventory",
  require("./routes/inventoryRoutes")
);

/* =========================================================
   404 HANDLER
========================================================= */

app.use((req, res) => {
  console.log(
    "❌ Route not found:",
    req.originalUrl
  );

  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    path: req.originalUrl,
  });
});

/* =========================================================
   GLOBAL ERROR HANDLER
========================================================= */

app.use((err, req, res, next) => {
  console.error("❌ SERVER ERROR:");
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message:
      err.message || "Internal server error",
  });
});

/* =========================================================
   HTTP SERVER
========================================================= */

const server = http.createServer(app);

/* =========================================================
   WEBSOCKET SERVER
========================================================= */

const wss = new WebSocketServer({
  server,
  path: "/ws",
});

wss.on("connection", (socket) => {
  console.log("🔌 WebSocket client connected");

  // Send connection confirmation
  socket.send(
    JSON.stringify({
      type: "CONNECTED",
      message:
        "Ghati Valley live notification connected",
    })
  );

  socket.on("message", (message) => {
    try {
      const data = JSON.parse(
        message.toString()
      );

      console.log(
        "📩 WebSocket message:",
        data
      );
    } catch (error) {
      console.log(
        "❌ Invalid WebSocket message"
      );
    }
  });

  socket.on("close", () => {
    console.log(
      "🔌 WebSocket client disconnected"
    );
  });

  socket.on("error", (error) => {
    console.error(
      "WebSocket error:",
      error.message
    );
  });
});

/* =========================================================
   BROADCAST FUNCTION
========================================================= */

function broadcast(data) {
  const message = JSON.stringify(data);

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
}

/* =========================================================
   START SERVER
========================================================= */

server.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log("");
    console.log(
      "=========================================="
    );
    console.log(
      "       GHATI VALLEY BACKEND"
    );
    console.log(
      "=========================================="
    );

    console.log(
      `Environment : ${
        process.env.NODE_ENV ||
        "development"
      }`
    );

    console.log(
      `Port        : ${PORT}`
    );

    console.log(
      `REST API    : http://localhost:${PORT}`
    );

    console.log(
      `Health      : http://localhost:${PORT}/api/health`
    );

    console.log(
      `Menu        : http://localhost:${PORT}/api/menu`
    );

    console.log(
      `WebSocket   : ws://localhost:${PORT}/ws`
    );

    console.log(
      "=========================================="
    );

    console.log(
      "✅ Server started successfully"
    );

    console.log(
      "=========================================="
    );
  }
);

/* =========================================================
   EXPORT
========================================================= */

module.exports = {
  app,
  server,
  wss,
  broadcast,
};

