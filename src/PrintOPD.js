import React, { Component } from "react";
import "./stylesheets/PrintOPD.css";

class PrintOPD extends Component {
  render = () => {
    const {
      id,
      date,
      receivedFrom,
      chargesFor,
      price,
      priceInWords,
    } = this.props.state;
    return (
      <div className="PrintOPD">
        <h2>Dr. Dodwani's</h2>
        <h1>GUN-GEET HOSPITAL & POLYCLINIC</h1>
        <p>A/823, R. NO. 1645, Gandhi Road,</p>
        <p>Opp. Kuldevi Mata Mandir,</p>
        <p>Ulhasnagar - 421005. Tel. :,</p>
        <p>2534733 / 2520733 / 2520592</p>
        <hr />
        <div>
          <div>Bill No. {id}</div>
          <div>Date {date}</div>
          <div>Received From</div>
          <div>{receivedFrom}</div>
          <div>Charges For</div>
          <div>{chargesFor}</div>
          <div>Rupees</div>
          <div>{priceInWords}</div>
          <div>Rupees</div>
          <div>{price}</div>
        </div>
        <div>
          <p> </p>
          <p>Signature</p>
        </div>
      </div>
    );
  };
}
export default PrintOPD;
