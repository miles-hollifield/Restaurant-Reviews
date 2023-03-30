// Importing React, useState, and useEffect
import React, {useState, useEffect} from "react";
// Importing RestaurantDataService
import RestaurantDataService from "../services/restaurant"
// Importing Link
import {Link} from "react-router-dom";

const RestaurantsList = props => {
    // Keeping track of what users are searching for 
    const [restaurants, setRestaurants] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchZip, setSearchZip] = useState("");
    const [searchCuisine, setSearchCuisine] = useState("");
    const [cuisines, setCuisines] = useState(["All Cuisines"]);

    // Tells React to do call these methods after render
    useEffect(() => {
        retrieveRestaurants();
        retrieveCuisines();
    }, []);

    // Function to search by name
    const onChangeSearchName = e => {
        // value of the search box
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    // Function to search by zip code
    const onChangeSearchZip = e => {
        // value of the search box
        const searchZip = e.target.value;
        setSearchZip(searchZip);
    };

    // Function to search by cuisine
    const onChangeSearchCuisine = e => {
        // value of the search box
        const searchCuisine = e.target.value;
        setSearchCuisine(searchCuisine);
    }

    // retrieveRestaurants() function return all restaurants and sends to restaurants state
    const retrieveRestaurants = () => {
        RestaurantDataService.getAll()
            .then(response => {
                console.log(response.data);
                setRestaurants(response.data.restaurants);
            })
            .catch(e => {
                console.log(e);
            });
    };

    // retrieveCuisines() method return all cuisines and sends to cuisines state
    const retrieveCuisines = () => {
        RestaurantDataService.getCuisines()
            .then(response => {
                console.log(response.data);
                setCuisines(["All Cuisines"].concat(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    };

    // Refreshes list of restaurants
    const refreshList = () => {
        retrieveRestaurants();
    }

    // Function to find something
    const find = (query, by) => {
        RestaurantDataService.find(query, by)
            .then(response => {
                console.log(response.data);
                setRestaurants(response.data.restaurants);
            })
            .catch(e => {
                console.log(e);
            });
    };

    // Find restaurant by name
    const findByName = () => {
        find(searchName, "name");
    };

    // Find restaurant by zip code
    const findByZip = () => {
        find(searchZip, "zipcode");
    };

    // Find by cuisine
    const findByCuisine = () => {
        if (searchCuisine === "All Cuisines") {
            refreshList();
        } else {
            find(searchCuisine, "cuisine");
        }
    };

    return (
        <div>
            <div className="row pb-1">
                {/* Input group */}
                <div className="input-group col-lg-4">
                    {/* Search by name */}
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    {/* Find by name onclick button */}
                    <div className="input-group-append">
                        <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByName}
                        >
                        Search
                        </button>
                    </div>
                </div>
                {/* Input group */}
                <div className="input-group col-lg-4">
                    {/* Search by zip code */}
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by zip"
                        value={searchZip}
                        onChange={onChangeSearchZip}
                    />
                    {/* Find by zip onclick button */}
                    <div className="input-group-append">
                        <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByZip}
                        >
                        Search
                        </button>
                    </div>
                </div>
                {/* Input group */}
                <div className="input-group col-lg-4">
                    {/* Search by cuisine */}
                    <select onChange={onChangeSearchCuisine}>
                        {/* Map through cuisines array */}
                        {cuisines.map(cuisine => {
                        return (
                            <option value={cuisine}> {cuisine.substr(0, 20)} </option>
                        )
                        })}
                    </select>
                    {/* Find by cuisine onclick button */}
                    <div className="input-group-append">
                        <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByCuisine}
                        >
                        Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                {/* Map through restaurants array */}
                {restaurants.map((restaurant) => {
                    // Address of restaurants
                    const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
                    return (
                        // Restaurant cards
                        <div className="col-lg-4 pb-1">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <p className="card-text">
                                        <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                                        <strong>Address: </strong>{address}
                                    </p>
                                    <div className="row">
                                        {/* View Reviews link */}
                                        <Link to={"/restaurants/"+restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                            View Reviews
                                        </Link>
                                        {/* Google maps link of address */}
                                        <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RestaurantsList;
