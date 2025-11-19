require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const paragraphRoutes = require("./src/routes/paragraphRoutes");

const app = express();

// =======================
// CONNECT TO MONGODB
// =======================
connectDB();

// =======================
// CORS CONFIG
// =======================

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://192.168.29.158:3000",
  "https://sattakingsup.com", // your LAN frontend
  // add your deployed frontend origins here, for example:
  // "https://upsatta.in",
  // "https://www.upsatta.in",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (like curl, Postman) with no origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn("CORS blocked for origin:", origin);
      return callback(new Error("Not allowed by CORS: " + origin));
    },
    // Set this to true only if you are using cookies / auth headers
    credentials: false,
  })
);

// Handle preflight OPTIONS requests
app.options("*", cors());

// =======================
// MIDDLEWARES
// =======================
app.use(express.json());

// =======================
// ROUTES
// =======================

// Paragraph APIs
app.use("/api/paragraphs", paragraphRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Text Paragraph API is running",
    endpoints: {
      create: "POST   /api/paragraphs",
      getAll: "GET    /api/paragraphs",
      getOne: "GET    /api/paragraphs/:id",
      update: "PUT    /api/paragraphs/:id",
      delete: "DELETE /api/paragraphs/:id",
    },
  });
});

// =======================
// GLOBAL ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
