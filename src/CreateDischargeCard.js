import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React, { Component } from "react";
import firebase from "./Firebase";
import "firebase/firestore";
import "./stylesheets/CreateDischargeCard.css";
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
import ReactToPrint from "react-to-print";
import PrintDischargeCard from "./PrintDischargeCard";
const db = firebase.firestore();

class CreateDischargeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSnackbarOpen: false,
      snackbarMessage: "",
      id: "",
      patientName: "",
      age: "",
      gender: "male",
      sonOf: "",
      doctor: "",
      diagnosis: "",
      admissionDate: Date.parse(new Date().toLocaleDateString()),
      dischargeDate: Date.parse(new Date().toLocaleDateString()),
      clinicalNote: "",
      operationsNote: "",
      treatmentGiven: "",
      treatmentAdvised: "",
      conditionOnDischarge: "",
      followUp: "",
    };
  }
  componentDidMount = () => {
    this.setId();
  };
  setId = () => {
    let id;
    db.collection("DischargeCard")
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
      db.collection("DischargeCard")
        .doc()
        .set({
          id: this.state.id,
          patientName: this.state.patientName,
          age: this.state.age,
          gender: this.state.gender,
          sonOf: this.state.sonOf,
          doctor: this.state.doctor,
          diagnosis: this.state.diagnosis,
          admissionDate: this.state.admissionDate,
          dischargeDate: this.state.dischargeDate,
          clinicalNote: this.state.clinicalNote,
          operationsNote: this.state.operationsNote,
          treatmentGiven: this.state.treatmentGiven,
          treatmentAdvised: this.state.treatmentAdvised,
          conditionOnDischarge: this.state.conditionOnDischarge,
          followUp: this.state.followUp,
        })
        .then(() => {
          document.querySelector(".CreateDischargeCard-Hidden").click();
          this.setState(() => {
            return {
              patientName: "",
              age: "",
              gender: "male",
              sonOf: "",
              doctor: "",
              diagnosis: "",
              admissionDate: Date.parse(new Date().toLocaleDateString()),
              dischargeDate: Date.parse(new Date().toLocaleDateString()),
              clinicalNote: "",
              operationsNote: "",
              treatmentGiven: "",
              treatmentAdvised: "",
              conditionOnDischarge: "",
              followUp: "",
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

  render = () => {
    return (
      <div className="CreateDischargeCard">
        <Typography variant={isBrowser ? "h1" : "h3"}>
          Create Discharge Card
        </Typography>
        <form
          autoComplete="off"
          className="CreateIndoorRegister-Form"
          onSubmit={this.handleFormSubmit}
        >
          <TextField label="ID" type="number" disabled value={this.state.id} />
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
            label="S/o, D/o, W/o"
            name="sonOf"
            required
            value={this.state.sonOf}
            onChange={this.handleInputChange}
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
            label="Doctor's Name"
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
          <TextField
            label="Clinical Note"
            name="clinicalNote"
            multiline
            value={this.state.clinicalNote}
            onChange={this.handleInputChange}
          />
          <TextField
            label="Operations Note / Clinical History"
            name="operationsNote"
            multiline
            value={this.state.operationsNote}
            onChange={this.handleInputChange}
          />
          <TextField
            label="Treatment Given"
            name="treatmentGiven"
            multiline
            value={this.state.treatmentGiven}
            onChange={this.handleInputChange}
          />
          <TextField
            label="Treatment Advised"
            name="treatmentAdvised"
            multiline
            value={this.state.treatmentAdvised}
            onChange={this.handleInputChange}
          />
          <TextField
            label="Condition on Discharge"
            name="conditionOnDischarge"
            value={this.state.conditionOnDischarge}
            onChange={this.handleInputChange}
          />
          <TextField
            label="Follow up"
            name="followUp"
            value={this.state.followUp}
            onChange={this.handleInputChange}
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
                className="CreateDischargeCard-Hidden"
                style={{ display: "none" }}
              ></button>
            );
          }}
          content={() => this.componentRef}
        />
        <div style={{ display: "none" }}>
          <PrintDischargeCard
            ref={(el) => (this.componentRef = el)}
            state={JSON.parse(JSON.stringify(this.state))}
          />
        </div>
      </div>
    );
  };
}

export default CreateDischargeCard;
