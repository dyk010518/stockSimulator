import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage/Homepage'
import React, { Component } from "react";
import { Router } from '@reach/router';
import NotFound from './Pages/NotFound.js';
import Market from './Pages/Market/Market.js';
import MarketDashboard from './Pages/Market/MarketNavBar/MarketDashboard.js';
import MarketPortfolio from './Pages/Market/MarketNavBar/MarketPortfolio.js';
import MarketResearch from './Pages/Market/MarketNavBar/MarketResearch.js';
import MarketTrade from './Pages/Market/MarketNavBar/MarketTrade.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      marketName: undefined
    }
    
  }

  setMarketNum = (name) => {
    this.setState({
      marketName: name,
    })
  }

  // const text = props.text;
  // const url = props.url;
  render() {
    return (
      <div>
        <Router>
          <Homepage path="/" marketName = {this.state.marketName} setMarketNum = {this.setMarketNum}/>
          <Market path="/Game" marketName = {this.state.marketName}/>
          <MarketDashboard path="/Game/Dashboard"/>
          <MarketPortfolio path="/Game/Portfolio"/>
          <MarketResearch path="/Game/Research"/>
          <MarketTrade path="/Game/Trade"/>
          <NotFound default />
        </Router>
      </div>
    );
  }
}

export default App;
