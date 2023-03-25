/** Restaurant routes file */
// Import Express
import express from "express";
// Import RestaurantsCtrl
import RestaurantsCtrl from "./restaurants.controller.js";
import ReviewsCtrl from "./reviews.controller.js";

// Access to Express router
const router = express.Router();

// Example route
//router.route("/").get((req, res) => res.send("hello world"));

// Use RestaurantsCtrl file for restaurants api route
router.route("/").get(RestaurantsCtrl.apiGetRestaurants);
// ID route based on restaurant ID
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById);
// Cuisines route based on restaurant cuisines
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)

// Use ReviewsCtrl file for reviews route
router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview);

// Export route
export default router;
