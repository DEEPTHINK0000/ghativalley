const express = require("express");
const cors = require("cors");

const dishesRoutes = require("./routes/dishesRoutes");

const app = express();

/*
|--------------------------------------------------------------------------
| Configuration
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",

  // Add your Vercel frontend URL here
  // Example:
  // "https://ghativalley.vercel.app",
];

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // (Postman, browser tools, server-to-server requests)
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

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
  })
);

/*
|--------------------------------------------------------------------------
| Body Parser
|--------------------------------------------------------------------------
*/

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/*
|--------------------------------------------------------------------------
| Request Debugging
|--------------------------------------------------------------------------
*/

app.use((req, res, next) => {
  console.log("------------------------------------------");
  console.log("Request received");
  console.log("Method :", req.method);
  console.log("URL    :", req.originalUrl);
  console.log("Origin :", req.headers.origin);
  console.log("------------------------------------------");

  next();
});

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  console.log("✅ Health check");

  res.status(200).json({
    success: true,
    message: "Ghati Valley Backend API is running",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

/*
|--------------------------------------------------------------------------
| Dishes API
|--------------------------------------------------------------------------
*/

app.use("/api/dishes", dishesRoutes);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
  console.log("❌ Route not found:", req.originalUrl);

  res.status(404).json({
    success: false,
    message: "API route not found",
    path: req.originalUrl,
  });
});

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {
  console.error("❌ SERVER ERROR:");
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

app.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("------------------------------------------");
  console.log(" Ghati Valley Backend");
  console.log("------------------------------------------");
  console.log(` Environment : ${process.env.NODE_ENV || "development"}`);
  console.log(` Port        : ${PORT}`);
  console.log(` Server      : http://0.0.0.0:${PORT}`);
  console.log(` Dishes      : http://0.0.0.0:${PORT}/api/dishes`);
  console.log("------------------------------------------");
  console.log("✅ Server started successfully");
  console.log("------------------------------------------");
});














// const express = require("express");
// const cors = require("cors");

// const dishesRoutes = require("./routes/dishesRoutes");

// const app = express();

// /*
// |--------------------------------------------------------------------------
// | Middleware
// |--------------------------------------------------------------------------
// */

// // Enable CORS
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credentials: true,
//   })
// );

// // Parse JSON request body
// app.use(express.json());

// // Parse URL encoded data
// app.use(express.urlencoded({ extended: true }));

// /*
// |--------------------------------------------------------------------------
// | Health Check
// |--------------------------------------------------------------------------
// */

// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Ghati Valley Backend API is running",
//     version: "1.0.0",
//   });
// });

// /*
// |--------------------------------------------------------------------------
// | API Routes
// |--------------------------------------------------------------------------
// */

// app.use("/api/dishes", dishesRoutes);

// /*
// |--------------------------------------------------------------------------
// | 404 Handler
// |--------------------------------------------------------------------------
// */

// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "API route not found",
//     path: req.originalUrl,
//   });
// });

// /*
// |--------------------------------------------------------------------------
// | Global Error Handler
// |--------------------------------------------------------------------------
// */

// app.use((err, req, res, next) => {
//   console.error("Server Error:", err);

//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || "Internal server error",
//   });
// });

// /*
// |--------------------------------------------------------------------------
// | Server
// |--------------------------------------------------------------------------
// */

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log("------------------------------------------");
//   console.log(" Ghati Valley Backend");
//   console.log("------------------------------------------");
//   console.log(` Server: http://localhost:${PORT}`);
//   console.log(` Dishes: http://localhost:${PORT}/api/dishes`);
//   console.log("------------------------------------------");
// });

