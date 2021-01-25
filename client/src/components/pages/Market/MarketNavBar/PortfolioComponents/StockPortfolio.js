import React, { Component } from "react";
import "../../../../buttonStyles.css";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import "./StockPortfolio.css";
import { get } from "../../../../../utilities";

class StockPortfolio extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
  }

  state = {
    userCash: {
      cashValue: undefined,
      accountTotal: undefined,
    },
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

  componentDidMount = () => {
    this.updateUserInfo();
    this.updateUserPositions();
  }

  updateUserInfo = () => {
    this.props.updateCash();
    this.setState({
      userCash: {
        cashValue: this.props.cash,
        accountTotal: this.props.accountTotal,
      }
    })
  }

  updateUserPositions = () => {
    if(this.props.id){
      // get('/api/boughtstocks', { id: this.props.id}).then((boughtStockObjs)=>{
      //   console.log(boughtStockObjs[0])
      // });
    }
  }


  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    let space = " "
    return (
      <>
        <div className="StockPortfolio-container">
          <h2 className="StockPortfolio-header"> Stock Portfolio </h2>
          <div className="StockPortfolio-results">
            <thead>
              <tr>
                <th className="StockPortfolio-resultDesctiption"> Sybmol</th>
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
                <tr>
                  <td className="StockPortfolio-resultDesctiption"> Cash</td>
                  <td className="StockPortfolio-resultDesctiption">  </td>
                  <td className="StockPortfolio-resultDesctiption">  </td>
                  <td className="StockPortfolio-resultDesctiption">  </td>
                  <td className="StockPortfolio-resultDesctiption">  </td>
                  <td className="StockPortfolio-resultDesctiption">  </td>
                  <td className="StockPortfolio-resultDesctiption"> {this.state.userCash.cashValue} </td>
                  <td className="StockPortfolio-resultDesctiption">  </td>
                  <td className="StockPortfolio-resultDesctiption">  </td>
                  <td className="StockPortfolio-resultDesctiption">  </td>
                  <td className="StockPortfolio-resultDesctiption">  </td>
                </tr>
            </tbody>
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
        </div>
      </>
    );
  }
}

export default StockPortfolio;
