import React, { Component } from "react";
import {
  TextField,
  Button,
  Snackbar,
  IconButton,
  Paper,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "./stylesheets/Login.css";
import firebase from "./Firebase";
import "firebase/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInputValue: "",
      passwordInputValue: "",
      error: false,
      errorMessage: "",
    };
  }
  handleInputChange = (e) => {
    const name = e.target.getAttribute("name");
    const value = e.target.value;
    this.setState(() => {
      return { [name]: value };
    });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.emailInputValue,
        this.state.passwordInputValue
      )
      .then((e) => {
        this.props.handleUserLogin();
      })
      .catch((error) => {
        this.setState(() => {
          return {
            error: true,
            errorMessage: error.message,
          };
        });
      });
  };
  handleSnackbarClose = () => {
    this.setState(() => {
      return {
        error: false,
        errorMessage: "",
      };
    });
  };
  render = () => {
    return (
      <div className="Login">
        <Paper elevation={3} className="Login-FormContainer">
          <form
            autoComplete="off"
            className="Login-Form"
            onSubmit={this.handleFormSubmit}
          >
            <TextField
              label="E-mail"
              required
              type="email"
              name="emailInputValue"
              value={this.state.emailInputValue}
              onChange={this.handleInputChange}
            />
            <TextField
              label="Password"
              required
              type="password"
              name="passwordInputValue"
              value={this.state.passwordInputValue}
              onChange={this.handleInputChange}
            />
            <Button color="primary" type="submit">
              Login
            </Button>
          </form>
        </Paper>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.error}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
          message={this.state.errorMessage}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleSnackbarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    );
  };
}

export default Login;
