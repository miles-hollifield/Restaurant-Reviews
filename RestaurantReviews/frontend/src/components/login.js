// Importing React and useState
import React, { useState } from "react";

// Login component
const Login = props => {

  // Initialize user state
  const initialUserState = {
    name: "",
    id: ""
  };

  // Create the user
  const [user, setUser] = useState(initialUserState);

  // Updates the user state based on input from the user
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  // Logs user into program
  const login = () => {
    // Login function from App.js
    props.login(user);
    // Updates URL for user
    props.history.push('/');
  }

  return (
    <div className="submit-form">
      <div>
        {/* Username input field */}
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>
        {/* ID input field */}
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input 
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>
        {/* Login button */}
        <button onClick={login} className="btn btn-success">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;