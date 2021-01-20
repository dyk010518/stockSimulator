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
          <h2 className="StockPortfolio-header"> Stock Portfolio </h2>
          <div className="StockPortfolio-resultHeader">
            <div className="StockPortfolio-resultDesctiption"> Symbol</div>
            <div className="StockPortfolio-resultDesctiption"> Last Price</div>
            <div className="StockPortfolio-resultDesctiption"> $ Today's Gain/Loss</div>
            <div className="StockPortfolio-resultDesctiption"> % Today's Gain/Loss</div>
            <div className="StockPortfolio-resultDesctiption"> $ Total Gain/Loss</div>
            <div className="StockPortfolio-resultDesctiption"> % Total Gain/Loss</div>
            <div className="StockPortfolio-resultDesctiption"> Current Value</div>
            <div className="StockPortfolio-resultDesctiption"> % of Account</div>
            <div className="StockPortfolio-resultDesctiption"> Quantity</div>
            <div className="StockPortfolio-resultDesctiption"> Cost Basis Per Share</div>
            <div className="StockPortfolio-resultDesctiption"> Cost Basis</div>
          </div>
        </div>
      </>
    );
  }
}

export default StockPortfolio;
