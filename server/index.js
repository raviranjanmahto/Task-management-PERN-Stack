require("dotenv").config();
const express = require("express");
const path = require("path");
const pool = require("./config/db");
const AppError = require("./utils/appError");
const taskRoute = require("./routes/taskRoutes");
const errorGlobalMiddleware = require("./middlewares/errorMiddleware");

const app = express();

app.use(express.json({ limit: "10kb" }));

// Define the directory where your static files are located
const staticDir = path.join(__dirname, "dist"); // Assuming your static files are in a 'dist' directory

// Use the express.static middleware to serve static files
app.use(express.static(staticDir));

// ROUTES
app.use("/api/v1/tasks", taskRoute);

// Serve the main HTML file for any client-side route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.all("*", (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
);

app.use(errorGlobalMiddleware);

const PORT = process.env.PORT || 7009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
