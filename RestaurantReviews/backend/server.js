// Imports
import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

// Express app initialize
const app = express();

// Middleware that Express is going to use
// Cors Module
app.use(cors());
// Server can accept and read .json in body of request
app.use(express.json());

// Specify initial routes and store in restaurants file
app.use("/api/v1/restaurants", restaurants);
// If anyone goes to route that does not exist, return 404 error page
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

// Export app as a module
export default app;
