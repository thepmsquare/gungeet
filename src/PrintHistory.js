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
} from "@material-ui/core";
import firebase from "./Firebase";
import "firebase/firestore";
import { isBrowser } from "react-device-detect";
import "./stylesheets/PrintHistory.css";
const db = firebase.firestore();
class PrintHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipdResults: [],
      opdResults: [],
    };
  }
  componentDidMount = () => {
    this.displayResults();
  };
  displayResults = () => {
    const ipdResults = [];
    const opdResults = [];
    db.collection("IPD")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          ipdResults.push(doc.data());
        });
        this.setState(() => {
          return {
            ipdResults,
          };
        });
      });
    db.collection("OPD")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          opdResults.push(doc.data());
        });
        this.setState(() => {
          return {
            opdResults,
          };
        });
      });
  };

  render = () => {
    return (
      <div className="PrintHistory">
        <div>
          <Typography variant={isBrowser ? "h1" : "h3"}>IPD Bills</Typography>
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
                {this.state.ipdResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{result.id}</TableCell>
                    <TableCell>
                      {new Date(result.billDate).toLocaleDateString("en-IN")}
                    </TableCell>
                    <TableCell>{result.patientName}</TableCell>
                    <TableCell>
                      {new Date(result.admissionDate).toLocaleDateString(
                        "en-IN"
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(result.dischargeDate).toLocaleDateString(
                        "en-IN"
                      )}
                    </TableCell>
                    <TableCell>{result.total}</TableCell>
                    <TableCell>{result.paid}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <Typography variant={isBrowser ? "h1" : "h3"}>OPD Bills</Typography>
          <TableContainer component={Paper} className="ViewOPD-Table">
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Bill Number</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Charge For</TableCell>
                  <TableCell>Amount (₹)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.opdResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{result.id}</TableCell>
                    <TableCell>
                      {new Date(result.date).toLocaleDateString("en-IN")}
                    </TableCell>
                    <TableCell>{result.receivedFrom}</TableCell>
                    <TableCell>{result.chargesFor}</TableCell>
                    <TableCell>{result.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  };
}

export default PrintHistory;
