/** Restaurant routes file */
// Import Express
import express from "express";
// Import RestaurantsCtrl
import RestaurantsCtrl from "./restaurants.controller.js";

// Access to Express router
const router = express.Router();

// Example route
//router.route("/").get((req, res) => res.send("hello world"));

// Use RestaurantsCtrl file for route
router.route("/").get(RestaurantsCtrl.apiGetRestaurants)

// Export route
export default router;
