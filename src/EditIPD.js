import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React, { Component } from "react";
import "./stylesheets/EditIPD.css";
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
import PrintIPD from "./PrintIPD";
const db = firebase.firestore();

class EditIPD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormVisible: false,
      searchID: "",
      billDate: "",
      admissionDate: "",
      dischargeDate: "",
      id: "",
      patientName: "",
      isSnackbarOpen: false,
      snackbarMessage: "",
      total: "",
      totalInWords: "",
      paid: "",
      1: {
        price: "",
        days: "",
        total: 0,
      },
      2: {
        price: "",
        days: "",
        total: 0,
      },
      3: {
        A: {
          text: "",
          price: 0,
        },
        B: {
          text: "",
          price: 0,
        },
        C: {
          text: "",
          price: 0,
        },
      },
      4: {
        price: "",
        days: "",
        total: 0,
      },
      5: {
        price: 0,
      },
      6: {
        price: "",
        days: "",
        total: 0,
      },
      7: {
        A: {
          text: "",
          price: 0,
        },
        B: {
          text: "",
          price: 0,
        },
      },
      8: {
        A: {
          text: "",
          price: 0,
        },
        B: {
          text: "",
          price: 0,
        },
      },
      9: {
        A: {
          text: "",
          price: 0,
        },
      },
      10: {
        price: 0,
      },
      11: {
        price: "",
        days: "",
        total: 0,
      },
      12: {
        price: 0,
      },
      13: {
        price: 0,
      },
      14: {
        price: 0,
      },
      15: {
        price: "",
        days: "",
        total: 0,
      },
      16: {
        price: 0,
      },
      17: {
        price: 0,
      },
      18: {
        price: "",
        days: "",
        total: 0,
      },
      19: {
        price: "",
        days: "",
        total: 0,
      },
      20: {
        price: "",
        days: "",
        total: 0,
      },
      21: {
        price: 0,
      },
      22: {
        price: 0,
      },
      23: {
        price: 0,
      },
    };
  }
  handleSnackbarClose = () => {
    this.setState(() => {
      return { isSnackbarOpen: false, snackbarMessage: "" };
    });
  };
  handleBillDateChange = (billDate) => {
    billDate = Date.parse(billDate);
    this.setState(() => {
      return {
        billDate,
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
  handleInputChange = (e) => {
    let name = e.target.getAttribute("name");
    let value = e.target.value;
    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };
  handleInputChangeObject = (e) => {
    let name = e.target.getAttribute("name").split("-")[0];
    let feild = e.target.getAttribute("name").split("-")[1];
    let value = e.target.value;
    this.setState((curState) => {
      let curStateCopy = JSON.parse(JSON.stringify(curState));
      curStateCopy[name][feild] = value;
      let total = curStateCopy[name].price * curStateCopy[name].days;
      if (total) {
        curStateCopy[name].total = total;
      } else {
        curStateCopy[name].total = 0;
      }
      return {
        [name]: curStateCopy[name],
      };
    });
  };
  handleInputChangeObject2 = (e) => {
    let name = e.target.getAttribute("name").split("-")[0];
    let feild = e.target.getAttribute("name").split("-")[1];
    let feild2 = e.target.getAttribute("name").split("-")[2];
    let value = e.target.value;
    this.setState((curState) => {
      let curStateCopy = JSON.parse(JSON.stringify(curState));
      curStateCopy[name][feild][feild2] = value;
      return {
        [name]: curStateCopy[name],
      };
    });
  };
  handleCalculate = () => {
    this.setState((curState) => {
      let total = 0;
      total += isNaN(parseInt(curState[1].total))
        ? 0
        : parseInt(curState[1].total);
      total += isNaN(parseInt(curState[2].total))
        ? 0
        : parseInt(curState[2].total);
      total += isNaN(parseInt(curState[3].A.price))
        ? 0
        : parseInt(curState[3].A.price);
      total += isNaN(parseInt(curState[3].B.price))
        ? 0
        : parseInt(curState[3].B.price);

      total += isNaN(parseInt(curState[3].C.price))
        ? 0
        : parseInt(curState[3].C.price);

      total += isNaN(parseInt(curState[4].total))
        ? 0
        : parseInt(curState[4].total);

      total += isNaN(parseInt(curState[5].price))
        ? 0
        : parseInt(curState[5].price);

      total += isNaN(parseInt(curState[6].total))
        ? 0
        : parseInt(curState[6].total);

      total += isNaN(parseInt(curState[7].A.price))
        ? 0
        : parseInt(curState[7].A.price);

      total += isNaN(parseInt(curState[7].B.price))
        ? 0
        : parseInt(curState[7].B.price);

      total += isNaN(parseInt(curState[8].A.price))
        ? 0
        : parseInt(curState[8].A.price);

      total += isNaN(parseInt(curState[8].B.price))
        ? 0
        : parseInt(curState[8].B.price);

      total += isNaN(parseInt(curState[9].A.price))
        ? 0
        : parseInt(curState[9].A.price);

      total += isNaN(parseInt(curState[10].price))
        ? 0
        : parseInt(curState[10].price);

      total += isNaN(parseInt(curState[11].total))
        ? 0
        : parseInt(curState[11].total);

      total += isNaN(parseInt(curState[12].price))
        ? 0
        : parseInt(curState[12].price);

      total += isNaN(parseInt(curState[13].price))
        ? 0
        : parseInt(curState[13].price);

      total += isNaN(parseInt(curState[14].price))
        ? 0
        : parseInt(curState[14].price);

      total += isNaN(parseInt(curState[15].total))
        ? 0
        : parseInt(curState[15].total);

      total += isNaN(parseInt(curState[16].price))
        ? 0
        : parseInt(curState[16].price);

      total += isNaN(parseInt(curState[17].price))
        ? 0
        : parseInt(curState[17].price);

      total += isNaN(parseInt(curState[18].total))
        ? 0
        : parseInt(curState[18].total);

      total += isNaN(parseInt(curState[19].total))
        ? 0
        : parseInt(curState[19].total);

      total += isNaN(parseInt(curState[20].total))
        ? 0
        : parseInt(curState[20].total);

      total += isNaN(parseInt(curState[21].price))
        ? 0
        : parseInt(curState[21].price);

      total += isNaN(parseInt(curState[22].price))
        ? 0
        : parseInt(curState[22].price);

      total += isNaN(parseInt(curState[23].price))
        ? 0
        : parseInt(curState[23].price);

      return {
        total,
        totalInWords: numberToText.convertToText(parseInt(total), {
          language: "en-in",
        }),
      };
    });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.billDate &&
      this.state.admissionDate &&
      this.state.dischargeDate
    ) {
      if (this.state.admissionDate > this.state.dischargeDate) {
        this.setState(() => {
          return {
            isSnackbarOpen: true,
            snackbarMessage: "Invalid Date Format",
          };
        });
      } else {
        db.collection("IPD")
          .where("id", "==", this.state.id)
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              doc.ref
                .update({
                  id: this.state.id,
                  billDate: this.state.billDate,
                  admissionDate: this.state.admissionDate,
                  dischargeDate: this.state.dischargeDate,
                  patientName: this.state.patientName,
                  total: this.state.total,
                  totalInWords: this.state.totalInWords,
                  paid: this.state.paid,
                  1: this.state[1],
                  2: this.state[2],
                  3: this.state[3],
                  4: this.state[4],
                  5: this.state[5],
                  6: this.state[6],
                  7: this.state[7],
                  8: this.state[8],
                  9: this.state[9],
                  10: this.state[10],
                  11: this.state[11],
                  12: this.state[12],
                  13: this.state[13],
                  14: this.state[14],
                  15: this.state[15],
                  16: this.state[16],
                  17: this.state[17],
                  18: this.state[18],
                  19: this.state[19],
                  20: this.state[20],
                  21: this.state[21],
                  22: this.state[22],
                  23: this.state[23],
                })
                .then(() => {
                  document.querySelector(".EditIPD-Hidden").click();
                  this.setState(() => {
                    return {
                      billDate: "",
                      admissionDate: "",
                      dischargeDate: "",
                      patientName: "",
                      total: "",
                      totalInWords: "",
                      paid: "",
                      1: {
                        price: "",
                        days: "",
                        total: 0,
                      },
                      2: {
                        price: "",
                        days: "",
                        total: 0,
                      },
                      3: {
                        A: {
                          text: "",
                          price: 0,
                        },
                        B: {
                          text: "",
                          price: 0,
                        },
                        C: {
                          text: "",
                          price: 0,
                        },
                      },
                      4: {
                        price: "",
                        days: "",
                        total: 0,
                      },
                      5: {
                        price: 0,
                      },
                      6: {
                        price: "",
                        days: "",
                        total: 0,
                      },
                      7: {
                        A: {
                          text: "",
                          price: 0,
                        },
                        B: {
                          text: "",
                          price: 0,
                        },
                      },
                      8: {
                        A: {
                          text: "",
                          price: 0,
                        },
                        B: {
                          text: "",
                          price: 0,
                        },
                      },
                      9: {
                        A: {
                          text: "",
                          price: 0,
                        },
                      },
                      10: {
                        price: 0,
                      },
                      11: {
                        price: "",
                        days: "",
                        total: 0,
                      },
                      12: {
                        price: 0,
                      },
                      13: {
                        price: 0,
                      },
                      14: {
                        price: 0,
                      },
                      15: {
                        price: "",
                        days: "",
                        total: 0,
                      },
                      16: {
                        price: 0,
                      },
                      17: {
                        price: 0,
                      },
                      18: {
                        price: "",
                        days: "",
                        total: 0,
                      },
                      19: {
                        price: "",
                        days: "",
                        total: 0,
                      },
                      20: {
                        price: "",
                        days: "",
                        total: 0,
                      },
                      21: {
                        price: 0,
                      },
                      22: {
                        price: 0,
                      },
                      23: {
                        price: 0,
                      },
                      isSnackbarOpen: true,
                      snackbarMessage: "Saved Successfully",
                      isFormVisible: false,
                    };
                  });
                });
            });
          });
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
  handleSearchSubmit = (e) => {
    e.preventDefault();
    const results = [];
    db.collection("IPD")
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
              billDate: "",
              admissionDate: "",
              dischargeDate: "",
              id: "",
              patientName: "",
              total: "",
              totalInWords: "",
              paid: "",
              1: {
                price: "",
                days: "",
                total: 0,
              },
              2: {
                price: "",
                days: "",
                total: 0,
              },
              3: {
                A: {
                  text: "",
                  price: 0,
                },
                B: {
                  text: "",
                  price: 0,
                },
                C: {
                  text: "",
                  price: 0,
                },
              },
              4: {
                price: "",
                days: "",
                total: 0,
              },
              5: {
                price: 0,
              },
              6: {
                price: "",
                days: "",
                total: 0,
              },
              7: {
                A: {
                  text: "",
                  price: 0,
                },
                B: {
                  text: "",
                  price: 0,
                },
              },
              8: {
                A: {
                  text: "",
                  price: 0,
                },
                B: {
                  text: "",
                  price: 0,
                },
              },
              9: {
                A: {
                  text: "",
                  price: 0,
                },
              },
              10: {
                price: 0,
              },
              11: {
                price: "",
                days: "",
                total: 0,
              },
              12: {
                price: 0,
              },
              13: {
                price: 0,
              },
              14: {
                price: 0,
              },
              15: {
                price: "",
                days: "",
                total: 0,
              },
              16: {
                price: 0,
              },
              17: {
                price: 0,
              },
              18: {
                price: "",
                days: "",
                total: 0,
              },
              19: {
                price: "",
                days: "",
                total: 0,
              },
              20: {
                price: "",
                days: "",
                total: 0,
              },
              21: {
                price: 0,
              },
              22: {
                price: 0,
              },
              23: {
                price: 0,
              },
            };
          });
        } else {
          this.setState(() => {
            return {
              isFormVisible: true,
              billDate: results[0].billDate,
              admissionDate: results[0].admissionDate,
              dischargeDate: results[0].dischargeDate,
              id: results[0].id,
              patientName: results[0].patientName,
              paid: results[0].paid,
              1: results[0][1],
              2: results[0][2],
              3: results[0][3],
              4: results[0][4],
              5: results[0][5],
              6: results[0][6],
              7: results[0][7],
              8: results[0][8],
              9: results[0][9],
              10: results[0][10],
              11: results[0][11],
              12: results[0][12],
              13: results[0][13],
              14: results[0][14],
              15: results[0][15],
              16: results[0][16],
              17: results[0][17],
              18: results[0][18],
              19: results[0][19],
              20: results[0][20],
              21: results[0][21],
              22: results[0][22],
              23: results[0][23],
            };
          });
        }
      });
  };
  render = () => {
    return (
      <div className="EditIPD">
        <Typography variant={isBrowser ? "h1" : "h3"}>Edit IPD Bill</Typography>
        <form
          autoComplete="off"
          className="EditIPD-SearchFrom"
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
            onSubmit={this.handleFormSubmit}
            className="EditIPD-Form"
          >
            <Divider />
            <TextField
              label="Bill Number"
              type="number"
              disabled
              value={this.state.id}
            />
            <TextField
              label="Patient name"
              name="patientName"
              value={this.state.patientName}
              onChange={this.handleInputChange}
              required
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                label="Bill Date"
                value={this.state.billDate}
                onChange={this.handleBillDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change bill date",
                }}
                required
              />
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
            <Divider />
            <div className="EditIPD-FormDiv1">
              <Typography>1. Bed Charges</Typography>
              <TextField
                label="₹"
                name="1-price"
                value={this.state[1].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Days"
                name="1-days"
                value={this.state[1].days}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Total"
                value={this.state[1].total}
                type="number"
                disabled
              />
            </div>
            <div className="EditIPD-FormDiv1">
              <Typography>2. Dr Charges</Typography>
              <TextField
                label="₹"
                name="2-price"
                value={this.state[2].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Days"
                name="2-days"
                value={this.state[2].days}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Total"
                value={this.state[2].total}
                type="number"
                disabled
              />
            </div>
            <div className="EditIPD-FormDiv2">
              <Typography>3. Visiting Charges</Typography>
              <TextField
                label="A"
                name="3-A-text"
                value={this.state[3].A.text}
                onChange={this.handleInputChangeObject2}
              />
              <TextField
                label="₹"
                name="3-A-price"
                value={this.state[3].A.price}
                onChange={this.handleInputChangeObject2}
                type="number"
              />
              <span></span>
              <TextField
                label="B"
                name="3-B-text"
                value={this.state[3].B.text}
                onChange={this.handleInputChangeObject2}
              />
              <TextField
                label="₹"
                name="3-B-price"
                value={this.state[3].B.price}
                onChange={this.handleInputChangeObject2}
                type="number"
              />
              <span></span>
              <TextField
                label="C"
                name="3-C-text"
                value={this.state[3].C.text}
                onChange={this.handleInputChangeObject2}
              />
              <TextField
                label="₹"
                name="3-C-price"
                value={this.state[3].C.price}
                onChange={this.handleInputChangeObject2}
                type="number"
              />
            </div>
            <div className="EditIPD-FormDiv1">
              <Typography>4. Nursing Charges</Typography>
              <TextField
                label="₹"
                name="4-price"
                value={this.state[4].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Days"
                name="4-days"
                value={this.state[4].days}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Total"
                value={this.state[4].total}
                type="number"
                disabled
              />
            </div>
            <div className="EditIPD-FormDiv3">
              <Typography>5. Pathology Charges</Typography>
              <TextField
                label="₹"
                name="5-price"
                value={this.state[5].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
            </div>
            <div className="EditIPD-FormDiv1">
              <Typography>6. I. V. Charges /Inj. Prick</Typography>
              <TextField
                label="₹"
                name="6-price"
                value={this.state[6].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Days"
                name="6-days"
                value={this.state[6].days}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Total"
                value={this.state[6].total}
                type="number"
                disabled
              />
            </div>
            <div className="EditIPD-FormDiv2">
              <Typography>7. Surgeons Charges</Typography>
              <TextField
                label="A"
                name="7-A-text"
                value={this.state[7].A.text}
                onChange={this.handleInputChangeObject2}
              />
              <TextField
                label="₹"
                name="7-A-price"
                value={this.state[7].A.price}
                onChange={this.handleInputChangeObject2}
                type="number"
              />
              <span></span>
              <TextField
                label="B"
                name="7-B-text"
                value={this.state[7].B.text}
                onChange={this.handleInputChangeObject2}
              />
              <TextField
                label="₹"
                name="7-B-price"
                value={this.state[7].B.price}
                onChange={this.handleInputChangeObject2}
                type="number"
              />
            </div>
            <div className="EditIPD-FormDiv2">
              <Typography>8. Assistant Charges</Typography>
              <TextField
                label="A"
                name="8-A-text"
                value={this.state[8].A.text}
                onChange={this.handleInputChangeObject2}
              />
              <TextField
                label="₹"
                name="8-A-price"
                value={this.state[8].A.price}
                onChange={this.handleInputChangeObject2}
                type="number"
              />
              <span></span>
              <TextField
                label="B"
                name="8-B-text"
                value={this.state[8].B.text}
                onChange={this.handleInputChangeObject2}
              />
              <TextField
                label="₹"
                name="8-B-price"
                value={this.state[8].B.price}
                onChange={this.handleInputChangeObject2}
                type="number"
              />
            </div>
            <div className="EditIPD-FormDiv2">
              <Typography>9. Anaesthetic Charges</Typography>
              <TextField
                label="A"
                name="9-A-text"
                value={this.state[9].A.text}
                onChange={this.handleInputChangeObject2}
              />
              <TextField
                label="₹"
                name="9-A-price"
                value={this.state[9].A.price}
                onChange={this.handleInputChangeObject2}
                type="number"
              />
            </div>
            <div className="EditIPD-FormDiv3">
              <Typography>10. OT Charges</Typography>
              <TextField
                label="₹"
                name="10-price"
                value={this.state[10].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
            </div>
            <div className="EditIPD-FormDiv1">
              <Typography>11. Dressing Charges</Typography>
              <TextField
                label="₹"
                name="11-price"
                value={this.state[11].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Days"
                name="11-days"
                value={this.state[11].days}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Total"
                value={this.state[11].total}
                type="number"
                disabled
              />
            </div>
            <div className="EditIPD-FormDiv3">
              <Typography>12. Enema Charges</Typography>
              <TextField
                label="₹"
                name="12-price"
                value={this.state[12].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
            </div>
            <div className="EditIPD-FormDiv3">
              <Typography>13. Catheterisation Charges</Typography>
              <TextField
                label="₹"
                name="13-price"
                value={this.state[13].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
            </div>
            <div className="EditIPD-FormDiv3">
              <Typography>14. RT Charges</Typography>
              <TextField
                label="₹"
                name="14-price"
                value={this.state[14].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
            </div>
            <div className="EditIPD-FormDiv1">
              <Typography>15. Oxygen Charges</Typography>
              <TextField
                label="₹"
                name="15-price"
                value={this.state[15].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Days"
                name="15-days"
                value={this.state[15].days}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Total"
                value={this.state[15].total}
                type="number"
                disabled
              />
            </div>
            <div className="EditIPD-FormDiv3">
              <Typography>16. ECG</Typography>
              <TextField
                label="₹"
                name="16-price"
                value={this.state[16].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
            </div>
            <div className="EditIPD-FormDiv3">
              <Typography>17. Medicine used in Emergency</Typography>
              <TextField
                label="₹"
                name="17-price"
                value={this.state[17].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
            </div>
            <div className="EditIPD-FormDiv1">
              <Typography>18. Nebulization</Typography>
              <TextField
                label="₹"
                name="18-price"
                value={this.state[18].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Days"
                name="18-days"
                value={this.state[18].days}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Total"
                value={this.state[18].total}
                type="number"
                disabled
              />
            </div>
            <div className="EditIPD-FormDiv1">
              <Typography>19. Monitor</Typography>
              <TextField
                label="₹"
                name="19-price"
                value={this.state[19].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Days"
                name="19-days"
                value={this.state[19].days}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Total"
                value={this.state[19].total}
                type="number"
                disabled
              />
            </div>
            <div className="EditIPD-FormDiv1">
              <Typography>20. RSB & US Charges</Typography>
              <TextField
                label="₹"
                name="20-price"
                value={this.state[20].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Days"
                name="20-days"
                value={this.state[20].days}
                onChange={this.handleInputChangeObject}
                type="number"
              />
              <TextField
                label="Total"
                value={this.state[20].total}
                type="number"
                disabled
              />
            </div>
            <div className="EditIPD-FormDiv3">
              <Typography>21. Tapping Charges</Typography>
              <TextField
                label="₹"
                name="21-price"
                value={this.state[21].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
            </div>
            <div className="EditIPD-FormDiv3">
              <Typography>22. B. M. W. Charges</Typography>
              <TextField
                label="₹"
                name="22-price"
                value={this.state[22].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
            </div>
            <div className="EditIPD-FormDiv3">
              <Typography>23. Others</Typography>
              <TextField
                label="₹"
                name="23-price"
                value={this.state[23].price}
                onChange={this.handleInputChangeObject}
                type="number"
              />
            </div>
            <Divider />
            <Button onClick={this.handleCalculate}>Calculate</Button>
            <TextField
              label="Total ₹"
              type="number"
              disabled
              required
              value={this.state.total}
            />
            <TextField
              label="Total ₹ (in Words)"
              disabled
              required
              value={this.state.totalInWords}
            />
            <TextField
              label="Paid"
              value={this.state.paid}
              onChange={this.handleInputChange}
              name="paid"
              type="number"
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
        <ReactToPrint
          trigger={() => {
            return (
              <button
                className="EditIPD-Hidden"
                style={{ display: "none" }}
              ></button>
            );
          }}
          content={() => this.componentRef}
        />
        <div style={{ display: "none" }}>
          <PrintIPD
            ref={(el) => (this.componentRef = el)}
            state={JSON.parse(JSON.stringify(this.state))}
          />
        </div>
      </div>
    );
  };
}

export default EditIPD;
