import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware (optional but useful)
app.use(express.json());

// Endpoint
app.get("/", (req, res) => {
  res.send("Hello world! Here is the bookmark manager backend side");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// npm i express dotenv
// npm i nodemon --save-dev