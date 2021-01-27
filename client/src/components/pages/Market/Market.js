import './Market.css';
import React, { Component } from "react";
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import MarketNavBar from './MarketNavBar/MarketNavBar.js';
import utilities from '../../../utilities.js'
import './Market.css'
import party from "../../../party.png" 

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
    //const party = require("../../../party.png");
    let errorMsg = "Go back to the homepage you hacker! There isn't a market selected! >:(";
    let history = "";
    let cash = undefined;
    if (this.state.currentMarket !== undefined) {
      if (this.state.currentMarket === "One") {
        history = "OOF! People are starting to take out lots of loans from banks. How lovely of them buying houses, paying for leisure, and enjoying their life.  Money is in the air. But watch out because many of them are taking out loans they can’t even afford paying back! Take this into consideration when you invest.";
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
          <img src= {party} class="center"/>
        <p className="Market-summary">
          {history}
        </p>
        <div className="center2">
          <Link to="/Game/Dashboard" className="rm_decor"><button className="Market-button">Start</button></Link>

        </div>


      </div>
    );
  }
}

export default Market;