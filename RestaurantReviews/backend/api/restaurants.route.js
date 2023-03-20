/** Restaurant routes file */
// Import Express
import express from "express";

// Access to Express router
const router = express.Router();

// Example route
router.route("/").get((req, res) => res.send("hello world"));

// Export route
export default router;
