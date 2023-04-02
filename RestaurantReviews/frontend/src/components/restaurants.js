// Importing React
import React, { useState, useEffect } from "react";
// Importing RestaurantDataService
import RestaurantDataService from "../services/restaurant";
// Importing Link
import { Link } from "react-router-dom";

const Restaurant = props => {
    // Initiating the restaurant state
    const initialRestaurantState = {
        id: null,
        name: "",
        address: {},
        cuisine: "",
        reviews: []
    };
    // Create the restaurant
    const [restaurant, setRestaurant] = useState(initialRestaurantState);

    const getRestaurant = id => {
        // Get restaurant id
        RestaurantDataService.get(id)
            .then(response => {
                // Sets restaurant
                setRestaurant(response.data);
                console.log(response.data);
            })
            // Log error
            .catch(e => {
                console.log(e);
            });
    };

    // Called when component first renders
    useEffect(() => {
        // Only called if id is updated
        getRestaurant(props.match.params.id)
    }, [props.match.params.id]);

    const deleteReview = (reviewId, index) => {
        // Delete restaurant review
        RestaurantDataService.deleteReview(reviewId, props.user.id)
            .then(response => {
                // Sets restaurant to previous state before review
                setRestaurant((prevState) => {
                    // Splices the review at index from the restaurant
                    prevState.reviews.splice(index, 1);
                    return({
                        ...prevState
                    });
                });
            })
            // Log error
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {/* If there is a restaurant, display restaurant */}
            {restaurant ? (
                <div>
                    {/* Restaurant name */}
                    <h5>{restaurant.name}</h5>
                    <p>
                        {/* Restaurant cuisine */}
                        <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                        {/* Restaurant address */}
                        <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
                    </p>
                    {/* Add Review button */}
                    <Link to={"/restaurants/" + props.match.params.id + "/review"} className="btn btn-primary">
                        Add Review
                    </Link>
                    <h4> Reviews </h4>
                    <div className="row">
                        {/* If the restaurant has reviews, display reviews*/}
                        {restaurant.reviews.length > 0 ? (
                            // Map over all reviews for restaurant
                            restaurant.reviews.map((review, index) => {
                                // For each review, display in card form
                                return (
                                    <div className="col-lg-4 pb-1" key={index}>
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="card-text">
                                                    {review.text}<br/>
                                                    {/* Name of user who left review */}
                                                    <strong>User: </strong>{review.name}<br/>
                                                    {/* Date of the review */}
                                                    <strong>Date: </strong>{review.date}
                                                </p>
                                                {/**
                                                 * Checks if there is a user logged in.
                                                 * If there is, and the user id is the same as the review's user id,
                                                 * then, Delete Review button and Edit Review button is displayed.
                                                */}
                                                {props.user && props.user.id === review.user_id &&
                                                    <div className="row">
                                                        {/* Delete Button */}
                                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                        <a onClick={() => deleteReview(review.user_id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                                                        {/* Edit Button */}
                                                        <Link to={{
                                                            pathname: "/restaurants/" + props.match.params.id + "/review",
                                                            // Passes in state of current review into the fields for editing
                                                            state: {
                                                                currentReview: review
                                                            }
                                                        }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        // Else, no review is displayed    
                        ) : (
                            <div className="col-sm-4">
                                <p>No reviews yet.</p>
                            </div>
                        )}

                    </div>

                </div>
            // Else, no restaurant is displayed    
            ) : (
                <div>
                    <br/>
                    <p>No restaurant selected.</p>
                </div>
            )}
        </div>
    );
};

export default Restaurant;