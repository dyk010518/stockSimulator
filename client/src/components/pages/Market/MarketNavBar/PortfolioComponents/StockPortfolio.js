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

  state = {
    stocks: [
      {
        stockSymbol: "PFE",
        lastPrice: 10000.0,
        todayDollarChange: 10000.0,
        todayPercentChange: 56.5,
        totalDollarChange: 112300.0,
        totalPercentChange: 156.5,
        currentValue: 12459071,
        accountPercent: 47,
        quantity: 1208,
        costBasisPS: 1234,
        costBasis: 1084,
      },
    ],
  };

  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      <>
        <div className="StockPortfolio-container">
          <h2 className="StockPortfolio-header"> Stock Portfolio </h2>
          <thead>
            <tr>
              <th className="StockPortfolio-resultDesctiption"> Symbol</th>
              <th className="StockPortfolio-resultDesctiption"> Last Price</th>
              <th className="StockPortfolio-resultDesctiption"> $ Today's Gain/Loss</th>
              <th className="StockPortfolio-resultDesctiption"> % Today's Gain/Loss</th>
              <th className="StockPortfolio-resultDesctiption"> $ Total Gain/Loss</th>
              <th className="StockPortfolio-resultDesctiption"> % Total Gain/Loss</th>
              <th className="StockPortfolio-resultDesctiption"> Current Value</th>
              <th className="StockPortfolio-resultDesctiption"> % of Account</th>
              <th className="StockPortfolio-resultDesctiption"> Quantity</th>
              <th className="StockPortfolio-resultDesctiption"> Cost Basis Per Share</th>
              <th className="StockPortfolio-resultDesctiption"> Cost Basis</th>
            </tr>
          </thead>
          <tbody>
            {this.state.stocks.map((stock) => (
              <tr>
                <td className="StockPortfolio-resultDesctiption"> {stock.stockSymbol} </td>
                <td className="StockPortfolio-resultDesctiption"> {stock.lastPrice} </td>
                <td className="StockPortfolio-resultDesctiption"> {stock.todayDollarChange} </td>
                <td className="StockPortfolio-resultDesctiption"> {stock.todayPercentChange} </td>
                <td className="StockPortfolio-resultDesctiption"> {stock.totalDollarChange} </td>
                <td className="StockPortfolio-resultDesctiption"> {stock.totalPercentChange} </td>
                <td className="StockPortfolio-resultDesctiption"> {stock.currentValue} </td>
                <td className="StockPortfolio-resultDesctiption"> {stock.accountPercent} </td>
                <td className="StockPortfolio-resultDesctiption"> {stock.quantity} </td>
                <td className="StockPortfolio-resultDesctiption"> {stock.costBasisPS} </td>
                <td className="StockPortfolio-resultDesctiption"> {stock.costBasis} </td>
              </tr>
            ))}
          </tbody>
        </div>
      </>
    );
  }
}

export default StockPortfolio;
