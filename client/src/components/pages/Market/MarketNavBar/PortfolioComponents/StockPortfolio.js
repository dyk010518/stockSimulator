import React, { Component } from "react";
import "../../../../buttonStyles.css";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import "./StockPortfolio.css";

class StockPortfolio extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
  }

  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      <>
        <div className="StockPortfolio-container">
          <h1> StockPortfolio </h1>
          <ul>
            <li>User’s Stock Portfolio:</li>
            <li>User’s total stock valuation:</li>
            <li>Percentage Allocation: 2 shares of Tim’s Damn Group</li>
            <li>
              (Valuation: 2*420.69) Each stock’s cost basis Each stock’s gains/loss (both dollar
              amount and percentage)
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default StockPortfolio;
