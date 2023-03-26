// Importing React
import React from "react";
// Importing Switch, Route, Link
import { Switch, Route, Link } from "react-router-dom";
// Importing Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

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
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {/* Restaurant Reviews Brand link */}
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
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
