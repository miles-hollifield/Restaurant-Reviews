/** Connect to the database and start the server */
// Imports
import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";
// Load in .env variables to configure
dotenv.config();
// Access to Mongo Client from MongoDB
const MongoClient = mongodb.MongoClient;

// Set port number
const port = process.env.PORT || 8000;

// Connect to the database
MongoClient.connect(
    // Database URI
    process.env.RESTREVIEWS_DB_URI,
    {
        // Only 50 people can connect at a time
        maxPoolSize: 50,
        // After 2500ms, request will time out
        wtimeoutMS: 2500,
        // New connection string parser set to true
        useNewUrlParser: true,
    }
    )
    // Catch errors
    .catch((err) => {
        // Log the error
        console.error(err.stack);
        // Exit the process
        process.exit(1);
    })
    // After connecting
    .then(async (client) => {
        // Call injectDB from RestaurantsDAO and ReviewsDAO, passing in client
        // Able to reference restaurants collection from database
        await RestaurantDAO.injectDB(client);
        // Able to reference reviews collection from database
        await ReviewsDAO.injectDB(client);
        // Start web server
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        });
    });
