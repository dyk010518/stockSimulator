import './Market.css';
import React, { Component } from "react";
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import MarketNavBar from './MarketNavBar/MarketNavBar.js';
import '../../utilities.css'
import './Market.css'

class Market extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMarket: this.props.marketName,
    }
  }


  // const text = props.text;
  // const url = props.url;
  render() {

    let errorMsg = "Go back to the homepage you hacker! There isn't a market selected! >:(";
    let history = "";
    if (this.state.currentMarket !== undefined) {
      if (this.state.currentMarket === "One") {
        history = "DON'T BUY AIG!!!!!!!";
      }
      else if (this.state.currentMarket === "Two") {
        history = "*Market Two History Here*";
      }
      else if (this.state.currentMarket === "Three") {
        history = "*Market Three History Here*";
      }
      else if (this.state.currentMarket === "Four") {
        history = "*Market Four History Here*";
      }
    }

    return (
      <div>
        {/* <MarketNavBar /> */}
        <h1 className="Market-number">
          {this.state.currentMarket !== undefined ? "Market " + this.state.currentMarket : errorMsg}
        </h1>
        <p className="Market-summary">
          {history}
        </p>
        <div className="center">
          <Link to="/Game/Dashboard" className="rm_decor"><button className="Market-button">Start</button></Link>

        </div>


      </div>
    );
  }
}

export default Market;