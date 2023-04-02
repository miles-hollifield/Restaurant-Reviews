// Importing React and useState
import React, { useState } from "react";
// Importing RestaurantDataService
import RestaurantDataService from "../services/restaurant";
// Importing Link
import { Link } from "react-router-dom";

// AddReview component
const AddReview = props => {
  // Initialize the review state
  let initialReviewState = "";

  // Initialize editing to false
  let editing = false;

  // If review state exists and the current review is part of that state
  if (props.location.state && props.location.state.currentReview) {
    // Set editing to true
    editing = true;
    // Set the review state to the text of the current review
    initialReviewState = props.location.state.currentReview.text
  }

  // Create the review
  const [review, setReview] = useState(initialReviewState);
  // Create submitted state and set to false
  const [submitted, setSubmitted] = useState(false);

  // Updates the review state based on input of user
  const handleInputChange = event => {
    setReview(event.target.value);
  };

  // Saves the review
  const saveReview = () => {
    // Review data
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: props.match.params.id
    };

    // If editing is set to true
    if (editing) {
      // Add current review id to review data
      data.review_id = props.location.state.currentReview._id;
      // Call updateReview function
      RestaurantDataService.updateReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch (e => {
          console.log(e);
        });
    } else {
      // Call createReview function
      RestaurantDataService.createReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch (e => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      {/* If there is a user */}
      {props.user ? (
        <div className="submit-form">
          {/* If review is submitted */}
          {submitted ? (
            // Display success message
            <div>
              <h4>You submitted successfully!</h4>
              <Link to={"/restaurants/" + props.match.params.id} className="btn btn-success">
                Back to Restaurant
              </Link>
            </div>
          // Else if review is not submitted
          ) : (
            <div>
              {/* Display form */}
              <div className="form-group">
                {/* Show either Edit Review or Create Review */}
                <label htmlFor="description">{ editing ? "Edit" : "Create" } Review</label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                />
              </div>
              {/* Submit button */}
              <button onClick={saveReview} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      // Else if no user, ask to log in
      ) : (
        <div>
          Please log in.
        </div>
      )}
    </div>
  );
};

export default AddReview;