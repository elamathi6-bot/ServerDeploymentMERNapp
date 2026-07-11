/**
 * server.js
 * ----------
 * Entry point of the backend application.
 */

// Import packages
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// --------------------------------------------------
// GLOBAL MIDDLEWARE
// --------------------------------------------------

// Enable CORS
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON
app.use(express.json());

// --------------------------------------------------
// IMPORT ROUTES
// --------------------------------------------------

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

// --------------------------------------------------
// HOME ROUTE
// --------------------------------------------------

app.get("/", (req, res) => {
  res.send("✅ Server is running successfully!");
});

// --------------------------------------------------
// API ROUTES
// --------------------------------------------------

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// --------------------------------------------------
// DATABASE CONNECTION
// --------------------------------------------------

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// --------------------------------------------------
// START SERVER
// --------------------------------------------------

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
