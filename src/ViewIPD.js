// Date Picker.
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
//
import React, { Component } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import firebase from "./Firebase";
import "firebase/firestore";
import "./stylesheets/ViewIPD.css";
import { isBrowser } from "react-device-detect";
const db = firebase.firestore();
class ViewIPD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: Date.parse(new Date().toLocaleDateString()),
      toDate: Date.parse(new Date().toLocaleDateString()),
      isSnackbarOpen: false,
      snackbarMessage: "",
      results: [],
    };
  }
  handleFromDateChange = (date) => {
    this.setState(() => {
      return { fromDate: Date.parse(date) };
    });
  };
  handleToDateChange = (date) => {
    this.setState(() => {
      return { toDate: Date.parse(date) };
    });
  };
  handleSnackbarClose = () => {
    this.setState(() => {
      return { isSnackbarOpen: false, snackbarMessage: "" };
    });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.fromDate && this.state.toDate) {
      if (this.state.fromDate > this.state.toDate) {
        this.setState((curState) => {
          return {
            fromDate: curState.toDate,
            toDate: curState.fromDate,
          };
        }, this.displayResults);
      } else {
        this.displayResults();
      }
    } else {
      this.setState(() => {
        return {
          isSnackbarOpen: true,
          snackbarMessage: "Invalid Date Format",
        };
      });
    }
  };
  displayResults = () => {
    const results = [];
    db.collection("IPD")
      .where("billDate", "<=", this.state.toDate)
      .where("billDate", ">=", this.state.fromDate)
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
              results: [],
            };
          });
        } else {
          this.setState(() => {
            return {
              results,
            };
          });
        }
      });
  };
  render = () => {
    return (
      <div className="ViewIPD">
        <Typography variant={isBrowser ? "h1" : "h3"}>View IPD Bill</Typography>
        <form className="ViewIPD-Form" onSubmit={this.handleFormSubmit}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              label="From Date"
              value={this.state.fromDate}
              onChange={this.handleFromDateChange}
              KeyboardButtonProps={{
                "aria-label": "change from date",
              }}
              required
            />
            <KeyboardDatePicker
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              label="To Date"
              value={this.state.toDate}
              onChange={this.handleToDateChange}
              KeyboardButtonProps={{
                "aria-label": "change to date",
              }}
              required
            />
          </MuiPickersUtilsProvider>
          <Button type="submit">View</Button>
        </form>
        <TableContainer component={Paper} className="ViewIPD-Table">
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Bill Number</TableCell>
                <TableCell>Bill Date</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Admission Date</TableCell>
                <TableCell>Discharge Date</TableCell>
                <TableCell>Total Amount (₹)</TableCell>
                <TableCell>Paid Amount (₹)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>{result.id}</TableCell>
                  <TableCell>
                    {new Date(result.billDate).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell>{result.patientName}</TableCell>
                  <TableCell>
                    {new Date(result.admissionDate).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell>
                    {new Date(result.dischargeDate).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell>{result.total}</TableCell>
                  <TableCell>{result.paid}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
      </div>
    );
  };
}

export default ViewIPD;
