import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import React, { Component } from "react";
import "./stylesheets/EditOPD.css";
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  IconButton,
  Divider,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { isBrowser } from "react-device-detect";
import numberToText from "number-to-text";
import "number-to-text/converters/en-in";
import firebase from "./Firebase";
import "firebase/firestore";
import ReactToPrint from "react-to-print";
import PrintOPD from "./PrintOPD";
const db = firebase.firestore();

class EditOPD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      id: "",
      receivedFrom: "",
      chargesFor: "",
      price: "",
      priceInWords: "",
      isFormVisible: false,
      searchID: "",
      isSnackbarOpen: false,
      snackbarMessage: "",
    };
  }
  handleSnackbarClose = () => {
    this.setState(() => {
      return { isSnackbarOpen: false, snackbarMessage: "" };
    });
  };
  handleDateChange = (date) => {
    date = Date.parse(date);
    this.setState(() => {
      return {
        date,
      };
    });
  };
  handleInputChange = (e) => {
    let name = e.target.getAttribute("name");
    let value = e.target.value;
    let priceInWords;
    if (name === "price") {
      priceInWords = numberToText.convertToText(parseInt(value), {
        language: "en-in",
      });
      this.setState(() => {
        return {
          [name]: value,
          priceInWords,
        };
      });
    } else {
      this.setState(() => {
        return {
          [name]: value,
        };
      });
    }
  };
  handleSearchSubmit = (e) => {
    e.preventDefault();
    const results = [];
    db.collection("OPD")
      .where("id", "==", parseInt(this.state.searchID))
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          results.push(doc.data());
        });
        if (results.length === 0) {
          this.setState(() => {
            return {
              isSnackbarOpen: true,
              snackbarMessage: "No Results Found",
              isFormVisible: false,
              date: "",
              id: "",
              receivedFrom: "",
              chargesFor: "",
              price: "",
              priceInWords: "",
            };
          });
        } else {
          this.setState(() => {
            return {
              isFormVisible: true,
              id: results[0].id,
              date: results[0].date,
              receivedFrom: results[0].receivedFrom,
              chargesFor: results[0].chargesFor,
              price: results[0].price,
              priceInWords: results[0].priceInWords,
            };
          });
        }
      });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.date) {
      db.collection("OPD")
        .where("id", "==", this.state.id)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            doc.ref
              .update({
                id: this.state.id,
                date: this.state.date,
                receivedFrom: this.state.receivedFrom,
                chargesFor: this.state.chargesFor,
                price: this.state.price,
                priceInWords: this.state.priceInWords,
              })
              .then(() => {
                document.querySelector(".EditOPD-Hidden").click();
                this.setState(() => {
                  return {
                    date: "",
                    receivedFrom: "",
                    chargesFor: "",
                    price: "",
                    priceInWords: "",
                    isFormVisible: false,
                    isSnackbarOpen: true,
                    snackbarMessage: "Saved Successfully",
                  };
                });
              });
          });
        });
    } else {
      this.setState(() => {
        return {
          isSnackbarOpen: true,
          snackbarMessage: "Invalid Date Format",
        };
      });
    }
  };
  render = () => {
    return (
      <div className="EditOPD">
        <Typography variant={isBrowser ? "h1" : "h3"}>Edit OPD Bill</Typography>
        <form
          autoComplete="off"
          className="EditOPD-SearchFrom"
          onSubmit={this.handleSearchSubmit}
        >
          <TextField
            label="Bill Number"
            type="number"
            value={this.state.searchID}
            name="searchID"
            onChange={this.handleInputChange}
            required
          />
          <Button type="submit">Search</Button>
        </form>
        {this.state.isFormVisible && (
          <form
            autoComplete="off"
            className="EditOPD-From"
            onSubmit={this.handleFormSubmit}
          >
            <Divider />
            <TextField
              label="Bill Number"
              type="number"
              disabled
              value={this.state.id}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                label="Date"
                value={this.state.date}
                onChange={this.handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                required
              />
            </MuiPickersUtilsProvider>
            <TextField
              label="Received from"
              name="receivedFrom"
              value={this.state.receivedFrom}
              onChange={this.handleInputChange}
              required
            />
            <TextField
              label="Charges for"
              name="chargesFor"
              value={this.state.chargesFor}
              onChange={this.handleInputChange}
              required
            />
            <TextField
              label="₹"
              type="number"
              name="price"
              value={this.state.price}
              onChange={this.handleInputChange}
              required
            />
            <TextField
              label="₹ in words"
              value={this.state.priceInWords}
              disabled
            />
            <Button type="submit">Save & Print</Button>
          </form>
        )}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.isSnackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
          message={this.state.snackbarMessage}
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
        <ReactToPrint
          trigger={() => {
            return (
              <button
                className="EditOPD-Hidden"
                style={{ display: "none" }}
              ></button>
            );
          }}
          content={() => this.componentRef}
        />
        <div style={{ display: "none" }}>
          <PrintOPD
            ref={(el) => (this.componentRef = el)}
            state={JSON.parse(JSON.stringify(this.state))}
          />
        </div>
      </div>
    );
  };
}

export default EditOPD;
