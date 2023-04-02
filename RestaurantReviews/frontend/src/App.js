// Importing React
import React from "react";
// Importing Switch, Route, Link
import { Switch, Route, Link } from "react-router-dom";
// Importing Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line no-unused-vars
import bootstrap from 'bootstrap';

// Importing AddReview
import AddReview from "./components/add-review";
// Importing Restaurant
import Restaurant from "./components/restaurants";
// Importing RestaurantsList
import RestaurantsList from "./components/restaurants-list";
// Importing Login
import Login from "./components/login";

function App() {
  // Initializing a State variable
  const [user, setUser] = React.useState(null);

  // Login function
  async function login(user = null) {
    setUser(user);
  }

  // Logout function
  async function logout() {
    setUser(null);
  }

  return (
    <div>
      {/* Nav Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Restaurant Reviews Brand link */}
          <a href="/restaurants" className="navbar-brand">
            Restaurant Reviews
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <div className="navbar-nav mr-auto">
                {/* Restaurants link */}
                <li className="nav-item">
                  <Link to={"/restaurants"} className="nav-link">
                    Restaurants
                  </Link>
                </li>
                {/* Login/Logout link */}
                <li className="nav-item">
                  {/* If user is logged in, show logout user */}
                  { user ? (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a onClick={logout} className="nav-link" style={{cursor: 'pointer'}}>
                      Logout {user.name}
                    </a>
                    // Else, show login 
                  ) : (
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  )}
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-3">
        {/* Switch between routes */}
        <Switch>
          {/* Loads RestaurantsList */}
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
          {/* Loads AddReview component for user */}
          <Route 
            path="/restaurants/:id/review" 
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          {/* Loads Restaurants component for user */}
          <Route
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
            )}
          />
          {/* Loads Login component for user */}
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />

        </Switch>
      </div>
    </div>
  );
}

export default App;
