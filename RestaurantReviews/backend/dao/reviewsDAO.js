/** Data Access Object for reviews */
// Import mongodb
import mongodb from "mongodb";
// MongoDB ObjectId const reference used to convert string to a MongoDB ObjectId
const ObjectId = mongodb.ObjectId;

// Initialize reviews object
let reviews;

// ReviewsDAO class
export default class ReviewsDAO{
    // Initially connect to database; called as soon as server starts
    static async injectDB(conn) {
        // If reviews is filled, then return.
        if (reviews) {
            return;
        }
        // If not filled, fill with reference to the database
        try {
            // Wait for connection to RESTREVIEWS_NS database; get reviews collection;
            // reviews collection will automatically be created if doesn't already exist
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
            // If cannot connect, send error message
        } catch (e) {
            console.error(
                `Unable to establish collection handles in userDAO: ${e}`
            );
        }
    }

    // Method to add review
    static async addReview(restaurantId, user, review, date) {
        // Attempt to add review into the reviews collection
        try {
            // Review document object
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                // Create ObjectId from restaurantId
                restaurant_id: new ObjectId(restaurantId)
            };
            // Insert to reviews collection
            return await reviews.insertOne(reviewDoc);
            // If failed, throw error message
        } catch (e) {
            console.error(`Unable to post review: ${e}`);
            return { error: e };
        }
    }

    // Method to update review
    static async updateReview(reviewId, userId, text, date) {
        // Attempt to update specified review in the reviews collection
        try {
            // Create and send response to update
            const updateResponse = await reviews.updateOne(
                // Makes sure userId and reviewId are correct
                // Only want to update review if review was created by same user who wants to update
                { user_id: userId, _id: new ObjectId(reviewId)},
                // Set new text and new date
                { $set: { text: text, date: date } }
            );
            return updateResponse;
            // If failed, throw error message
        } catch (e) {
            console.error(`Unable to update review: ${e}`);
            return { error: e };
        }
    }

    // Method to delete review
    static async deleteReview(reviewId, userId) {
        // Attempt to delete specified review in the reviews collection
        try {
            // Create and send response to delete
            const deleteResponse = await reviews.deleteOne({
                // Makes sure userId and reviewId are correct
                // Only want to delete review if review was created by same user who wants to delete
                _id: new ObjectId(reviewId),
                user_id: userId
            });
            return deleteResponse;
            // If failed, throw error message
        } catch (e) {
            console.error(`Unable to delete review: ${e}`);
            return { error: e };
        }
    }
}