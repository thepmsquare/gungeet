import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React, { Component } from "react";
import firebase from "./Firebase";
import "firebase/firestore";
import "./stylesheets/CreateOPD.css";
import {
  Typography,
  TextField,
  Button,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { isBrowser } from "react-device-detect";
import numberToText from "number-to-text";
import "number-to-text/converters/en-in";
import ReactToPrint from "react-to-print";
import PrintOPD from "./PrintOPD";
const db = firebase.firestore();

class CreateOPD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Date.parse(new Date().toLocaleDateString()),
      id: "",
      receivedFrom: "",
      chargesFor: "",
      price: "",
      priceInWords: "",
      isSnackbarOpen: false,
      snackbarMessage: "",
    };
  }
  componentDidMount = () => {
    this.setId();
  };
  setId = () => {
    let id;
    db.collection("OPD")
      .orderBy("id", "desc")
      .limit(1)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          id = doc.data().id + 1;
        });
        if (!id) {
          id = 1;
        }
        this.setState(() => {
          return { id };
        });
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
  handleFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.date) {
      db.collection("OPD")
        .doc()
        .set({
          id: this.state.id,
          date: this.state.date,
          receivedFrom: this.state.receivedFrom,
          chargesFor: this.state.chargesFor,
          price: this.state.price,
          priceInWords: this.state.priceInWords,
        })
        .then(() => {
          document.querySelector(".CreateOPD-Hidden").click();
          this.setState(() => {
            return {
              date: Date.parse(new Date().toLocaleDateString()),
              receivedFrom: "",
              chargesFor: "",
              price: "",
              priceInWords: "",
              isSnackbarOpen: true,
              snackbarMessage: "Saved Successfully",
            };
          }, this.setId);
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
  handleSnackbarClose = () => {
    this.setState(() => {
      return { isSnackbarOpen: false, snackbarMessage: "" };
    });
  };
  render = () => {
    return (
      <div className="CreateOPD">
        <Typography variant={isBrowser ? "h1" : "h3"}>New OPD Bill</Typography>
        <form
          autoComplete="off"
          className="CreateOPD-Form"
          onSubmit={this.handleFormSubmit}
        >
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
                className="CreateOPD-Hidden"
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

export default CreateOPD;
