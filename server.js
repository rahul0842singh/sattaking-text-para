require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const paragraphRoutes = require("./src/routes/paragraphRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
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
      delete: "DELETE /api/paragraphs/:id"
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
