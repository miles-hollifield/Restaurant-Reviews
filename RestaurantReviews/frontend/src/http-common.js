/* http helper file */
// Import Axios library
import axios from "axios";

export default axios.create({
    // Base URL for backend server
    baseURL: "http://localhost:5000/api/v1/restaurants",
    // Set headers
    headers: {
        "Content-type": "application/json"
    }
});
