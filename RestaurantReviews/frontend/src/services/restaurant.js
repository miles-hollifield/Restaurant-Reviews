import http from "../http-common";

// RestaurantDataService class for functions that add to base URL
class RestaurantDataService {
    // getAll function with default page of 0
    getAll(page = 0) {
        return http.get(`restaurants?page=${page}`);
    }

    // get function takes in id as parameter
    get(id) {
        return http.get(`restaurant?id=${id}`);
    }

    // find function based on query, name, and page
    find(query, by = "name", page = 0) {
        return http.get(`restaurants?${by}=${query}&page=${page}`);
    }

    // createReview function to create a new review
    createReview(data) {
        return http.post("restaurants/review-new", data);
    }

    // updateReview function to update a review
    updateReview(data) {
        return http.put("restaurants/review-edit", data);
    }

    // deleteReview function to delete a review
    deleteReview(id, userId) {
        return http.delete(`restaurants/review-delete?id=${id}`, {data:{user_id: userId}});
    }

    // getCuisines function to return cuisines
    getCuisines(id) {
        return http.get(`restaurants/cuisines`);
    }
}

// Export the class
export default new RestaurantDataService();