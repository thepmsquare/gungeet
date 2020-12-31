import React, { Component } from "react";
import firebase from "./Firebase";
import Login from "./Login";
import Home from "./Home";
import "./stylesheets/App.css";
import { Switch, Route, Redirect } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: "",
    };
  }
  componentDidMount = () => {
    this.checkLogin();
  };
  checkLogin = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState(() => {
          return { isLoggedIn: true };
        });
      } else {
        // No one logged in
      }
    });
  };
  handleUserLogin = () => {
    this.setState(() => {
      return {
        isLoggedIn: true,
      };
    });
  };
  handleUserLogout = () => {
    this.setState(() => {
      return {
        isLoggedIn: false,
      };
    });
  };
  render = () => {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login">
            {this.state.isLoggedIn ? (
              <Redirect
                to={{
                  pathname: "/",
                }}
              />
            ) : (
              <Login handleUserLogin={this.handleUserLogin} />
            )}
          </Route>
          <Route exact path="/">
            {this.state.isLoggedIn ? (
              <Home handleUserLogout={this.handleUserLogout} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                }}
              />
            )}
          </Route>
        </Switch>
      </div>
    );
  };
}

export default App;
