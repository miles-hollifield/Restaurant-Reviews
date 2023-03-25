/** Data Access Object to provide access to restaurants data from API  */
// Import mongodb
import mongodb from "mongodb";
// MongoDB ObjectId const reference used to convert string to a MongoDB ObjectId
const ObjectId = mongodb.ObjectId;
// Stores reference to our database
let restaurants;

// Export RestaurantDAO class
export default class RestaurantDAO {
  // Initially connect to database; called as soon as server starts
  static async injectDB(conn) {
  // If restaurants is filled, return
    if (restaurants) {
      return;
    }
    // If not filled, fill with reference to the database
    try {
      // Wait for connection to RESTREVIEWS_NS database; get restaurants collection
      restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants");
      // If cannot connect, send error message
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in retaurantsDAO: ${e}`
      );
    }
  }

  // getRestaurants fuction to get list of all restaurants in database
  static async getRestaurants({
    // Filter based on name, cuisine, or zipcode
    filters = null,
    // Page number desired
    page = 0,
    // Restaurants per page desired
    restaurantsPerPage = 20,
  } = {}) {
    // Search query
    let query;
    // If filters is filled
    if (filters) {
      // If name filter, set query for name search
      if ("name" in filters) {
        query = { $text: { $search: filters["name"]}};
        // If cuisine filter, set query for cuisine search
      } else if ("cuisine" in filters) {
        query = {"cuisine": { $eq: filters["cuisine"]}};
        // If zipcode filter, set query for zipcode search
      } else if ("zipcode" in filters) {
        query = {"address.zipcode": { $eq: filters["zipcode"]}};
      }
    }

    let cursor;
    try {
      // Find all restaurants from query and set to cursor
      cursor = await restaurants.find(query);
      // If error, throw message
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return {restaurantsList: [], totalNumRestaurants: 0};
    }

    // If no error, limit restaurantsPerPage and skip to specific page of results
    const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page);

    try {
      // Set restaurants list to array
      const restaurantsList = await displayCursor.toArray();
      // Get total number of restaurants by counting documents in query
      const totalNumRestaurants = await restaurants.countDocuments(query);

      // Return restaurants list array with total number of restaurants
      return {restaurantsList, totalNumRestaurants};
      // If error, throw message
    } catch (e) {
      console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
      // return empty array and set totalNumRestaurants to 0
      return {restaurantsList: [], totalNumRestaurants: 0};
    }
  }

  // Get reviews from reviews collection and put them into restaurants collection
  static async getRestaurantById(id) {
    // Attempt to match reviews and restaurants collections together from restaurant ID
    try {
      // Creating aggregation pipeline to help match reviews and restaurants collections together
      const pipeline = [
        {
          // Matching ID of a certain restaurant
          $match: {
            _id: new ObjectId(id)
          }
        },
        {
          // Lookup reviews to add to result
          $lookup: {
            // From reviews collection
            from: "reviews",
            let: {
              id: "$_id"
            },
            // Creating pipeline
            pipeline: [
              {
                // Find all reviews that match restaurant ID
                $match: {
                  $expr: {
                    $eq: ["$restaurant_id", "$$id"]
                  }
                }
              },
              {
                // Sort by date
                $sort: {
                  date: -1
                }
              }
            ],
            // Set to reviews field
            as: "reviews"
          }
        },
        {
          // Adding field called reviews to the results
          $addFields: {
            reviews: "$reviews",
          }
        }
      ];
      // Return the restaurant with all reviews connected to it from the aggregated pipeline of restaurants
      return await restaurants.aggregate(pipeline).next();
      // If failed, throw error message
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`);
    }
  }

  // Return each distinct cuisine from restaurants collection
  static async getCuisines() {
    // Initialize empty cuisines object
    let cuisines = [];
    // Attempt to fill cuisines object from restaurants collection
    try {
      // Store distinct cuisines from restaurants into cuisines object
      cuisines = await restaurants.distinct("cuisine");
      return cuisines;
      // If failed, throw error message
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`);
      return cuisines;
    }
  }
}
