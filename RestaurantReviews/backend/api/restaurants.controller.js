/** Restaurants controller */
//Import RestaurantsDAO
import RestaurantDAO from "../dao/restaurantsDAO.js";

// Restaurant Controller class
export default class RestaurantsController {
    // Returns the restaurants from the api
    static async apiGetRestaurants(req, res, next) {
        // If restaurantsPerPage exists in url, then convert to integer value.
        // If does not exist, set to default 20.
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20;
        // If page exists in url, then convert to integer value.
        // If does not exist, set to default 0.
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        // Initialize filters object
        let filters = {};
        // If query string is cuisine
        if (req.query.cuisine) {
            filters.cuisine = req.query.cuisine;
            // If query string is zipcode
        } else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode;
            // If query string is name
        } else if (req.query.name) {
            filters.name = req.query.name;
        }

        // Call getRestaurants method to return restaurantsList and totalNumRestaurants and store in const
        const {restaurantsList, totalNumRestaurants} = await RestaurantDAO.getRestaurants({
            filters,
            page,
            restaurantsPerPage
        });

        // Create and send response when api url is called
        let response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalNumRestaurants
        }
        res.json(response);
    }

    // static async apiGetRestaurantsById(req, res, next) {
    //     try {
    //         let id = req.params.id || {};
    //         let restaurant = await RestaurantDAO.apiGetRestaurantsById(id);
    //         if (!restaurant) {
    //             res.status(404).json({ error: "Not found" });
    //             return;
    //         }
    //         res.json(restaurant);
    //     } catch (e) {
    //         console.log(`api, ${e}`);
    //         res.status(500).json({ error: e});
    //     }
    // }

    // static async apiGetRestaurantCuisines(req, res, next) {
    //     try {
    //         let cuisine = await RestaurantDAO.getCuisines();
    //         res.json(cuisines);
    //     } catch (e) {
    //         console.log(`api, ${e}`);
    //         res.status(500).json({ error: e});
    //     }
    // }
}