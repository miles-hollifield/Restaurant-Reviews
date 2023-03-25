/** Reviews controller */
// Import reviewsDAO
import ReviewsDAO from "../dao/reviewsDAO.js";

// Reviews Controller class
export default class ReviewsController {
    // Method that posts review
    static async apiPostReview(req, res, next) {
        try {
            // Get restaurant_id from body of the request
            const restaurantId = req.body.restaurant_id;
            // Get review text from body of the request
            const review = req.body.text;
            // Get name and user_id from body of the request
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            };
            // Date object
            const date = new Date();

            // Create and send response to ReviewsDAO
            const ReviewResponse = await ReviewsDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date
            );
            // If worked, status is success
            res.json({ status: "success" });
            // If failed, throw error message
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Method that updates review
    static async apiUpdateReview(req, res, next) {
        try {
            // Get review_id from body of the request
            const reviewId = req.body.review_id;
            // Get review text from body of the request
            const text = req.body.text;
            // Date object
            const date = new Date();

            // Create and send response to ReviewsDAO
            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                // Make sure same user who made review is same as user who wants to update
                req.body.user_id,
                text,
                date
            )
            
            // Check for error in reviewResponse
            var { error } = reviewResponse;
            // If error, throw message
            if (error) {
                res.status(400).json({ error });
            }

            // If modified count is 0, then review was not updated; throw error message
            if (reviewResponse.modifiedCount == 0) {
                throw new Error(
                    "Unable to update review - user may not be original poster"
                )
            }

            // If worked, status is success
            res.json({ status: "success" });
            // If failed, throw error message
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Method that deletes review
    static async apiDeleteReview(req, res, next) {
        try {
            // Get review id from query of the request
            const reviewId = req.query.id;
            // Get user id from body of the request
            const userId = req.body.user_id;
            console.log(reviewId);
            // Create and send response to ReviewsDAO
            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId
            );
            // If worked, status is success
            res.json({ status: "success" });
            // If failed, throw error message
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
