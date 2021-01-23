import React, { Component } from "react";
import "../../../buttonStyles.css";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import MarketNavBar from "./MarketNavBar";
import BuySell from "./TradeComponents/BuySell.js";
import AccountDetails from "./TradeComponents/AccountDetails.js";
import StockStats from "./TradeComponents/StockStats.js";
import "./MarketTrade.css";
import { get, post} from '../../../../utilities.js';


class MarketTrade extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = ({
      stockData: {},
      stockSymbol: "",
      transaction: "buy",
      quantity: -1,
      stockPrice: 0,
    });
  }

  update = (infoList) => {
    this.setState({
      stockSymbol: infoList[0],
      transaction: infoList[1],
      quantity: infoList[2],
    }, () => {
      //this.getStockStats(this.state.stockSymbol);
    })
  }

  getStockStats = (symbol) =>{
    get('/api/specificstock', { stockSymbol: symbol}).then((stockObj) => {
      this.setState({
          stockData: stockObj,
          stockPrice: stockObj.stockPrice,
      })
  });
  }


  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      <>
        <MarketNavBar
          cash={this.props.cash}
          username={this.props.username}
          marketName={this.props.marketName}
          id={this.props.id}
        />
        <div className="MarketTrade-row">
          <div className="MarketTrade-column">
            <BuySell 
              data={this.update.bind(this)}
            />
            <StockStats 
              stockSymbol={this.state.stockSymbol}
              stockPrice={this.state.stockPrice}
            />
          </div>
          <AccountDetails />
        </div>
      </>
    );
  }
}

export default MarketTrade;
