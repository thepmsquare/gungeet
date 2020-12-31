import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React, { Component } from "react";
import firebase from "./Firebase";
import "firebase/firestore";
import "./stylesheets/EditIndoorRegister.css";
import {
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { isBrowser } from "react-device-detect";
const db = firebase.firestore();

class EditIndoorRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSnackbarOpen: false,
      snackbarMessage: "",
      searchID: "",
      isFormVisible: false,
      id: "",
      patientName: "",
      age: "",
      gender: "male",
      address: "",
      contactNumber: "",
      doctor: "",
      diagnosis: "",
      admissionDate: "",
      dischargeDate: "",
      amount: "",
    };
  }
  handleSnackbarClose = () => {
    this.setState(() => {
      return { isSnackbarOpen: false, snackbarMessage: "" };
    });
  };
  handleInputChange = (e) => {
    let name = e.target.getAttribute("name");
    let value = e.target.value;
    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };
  handleAdmissionDateChange = (admissionDate) => {
    admissionDate = Date.parse(admissionDate);
    this.setState(() => {
      return {
        admissionDate,
      };
    });
  };
  handleDischargeDateChange = (dischargeDate) => {
    dischargeDate = Date.parse(dischargeDate);
    this.setState(() => {
      return {
        dischargeDate,
      };
    });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.admissionDate &&
      this.state.dischargeDate &&
      this.state.admissionDate <= this.state.dischargeDate
    ) {
      db.collection("IndoorRegister")
        .where("id", "==", this.state.id)
        .get()
        .then((docs) => {
          docs.forEach((doc) =>
            doc.ref
              .update({
                id: this.state.id,
                patientName: this.state.patientName,
                age: this.state.age,
                gender: this.state.gender,
                address: this.state.address,
                contactNumber: this.state.contactNumber,
                doctor: this.state.doctor,
                diagnosis: this.state.diagnosis,
                admissionDate: this.state.admissionDate,
                dischargeDate: this.state.dischargeDate,
                amount: this.state.amount,
              })
              .then(() => {
                this.setState(() => {
                  return {
                    patientName: "",
                    age: "",
                    gender: "male",
                    address: "",
                    contactNumber: "",
                    doctor: "",
                    diagnosis: "",
                    admissionDate: "",
                    dischargeDate: "",
                    amount: "",
                    isFormVisible: false,
                    isSnackbarOpen: true,
                    snackbarMessage: "Saved Successfully",
                  };
                });
              })
          );
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
  handleSearchSubmit = (e) => {
    e.preventDefault();
    const results = [];
    db.collection("IndoorRegister")
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

              id: "",
              patientName: "",
              age: "",
              gender: "male",
              address: "",
              contactNumber: "",
              doctor: "",
              diagnosis: "",
              admissionDate: "",
              dischargeDate: "",
              amount: "",
            };
          });
        } else {
          this.setState(() => {
            return {
              isFormVisible: true,
              id: results[0].id,
              patientName: results[0].patientName,
              age: results[0].age,
              gender: results[0].gender,
              address: results[0].address,
              contactNumber: results[0].contactNumber,
              doctor: results[0].doctor,
              diagnosis: results[0].diagnosis,
              admissionDate: results[0].admissionDate,
              dischargeDate: results[0].dischargeDate,
              amount: results[0].amount,
            };
          });
        }
      });
  };
  render = () => {
    return (
      <div className="EditIndoorRegister">
        <Typography variant={isBrowser ? "h1" : "h3"}>
          Edit Indoor Register
        </Typography>
        <form
          autoComplete="off"
          className="EditIndoorRegister-SearchFrom"
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
            className="EditIndoorRegister-Form"
            onSubmit={this.handleFormSubmit}
          >
            <TextField
              label="Registration Number"
              type="number"
              disabled
              value={this.state.id}
            />
            <TextField
              label="Patient Name"
              name="patientName"
              required
              value={this.state.patientName}
              onChange={this.handleInputChange}
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              required
              value={this.state.age}
              onChange={this.handleInputChange}
            />
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={this.state.gender}
              onChange={this.handleInputChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
            <TextField
              label="Address"
              required
              name="address"
              multiline
              value={this.state.address}
              onChange={this.handleInputChange}
            />
            <TextField
              label="Contact Number"
              name="contactNumber"
              value={this.state.contactNumber}
              onChange={this.handleInputChange}
              required
            />
            <TextField
              label="Doctor"
              name="doctor"
              value={this.state.doctor}
              onChange={this.handleInputChange}
              required
            />
            <TextField
              label="Diagnosis"
              name="diagnosis"
              value={this.state.diagnosis}
              onChange={this.handleInputChange}
              required
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                label="Admission Date"
                value={this.state.admissionDate}
                onChange={this.handleAdmissionDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change admission date",
                }}
                required
              />
              <KeyboardDatePicker
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                label="Discharge Date"
                value={this.state.dischargeDate}
                onChange={this.handleDischargeDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change discharge date",
                }}
                required
              />
            </MuiPickersUtilsProvider>
            <TextField
              label="Bill Amount"
              type="number"
              name="amount"
              value={this.state.amount}
              onChange={this.handleInputChange}
              required
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
      </div>
    );
  };
}

export default EditIndoorRegister;
