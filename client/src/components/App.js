import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Homepage from './Pages/Homepage/Homepage.js';
import Market from './Pages/Market/Market.js';
import MarketDashboard from './Pages/Market/MarketNavBar/MarketDashboard.js';
import MarketPortfolio from './Pages/Market/MarketNavBar/MarketPortfolio.js';
import MarketResearch from './Pages/Market/MarketNavBar/MarketResearch.js';
import MarketTrade from './Pages/Market/MarketNavBar/MarketTrade.js';

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities.js";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      marketName: undefined,
      username: undefined,
    };
  }

  setMarketNum = (name) => {
    this.setState({
      marketName: name,
    })
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ 
        userId: user._id,
        username: res.profileObj.name
      });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ 
      userId: undefined,
      username: undefined
    });
    post("/api/logout");
  };

  render() {
    return (
      <>
        <Router>
          <Homepage path="/" 
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId} 
            marketName={this.state.marketName} 
            setMarketNum={this.setMarketNum} 
            username = {this.state.username}
          />
          <Market path="/Game" marketName={this.state.marketName} />
          <MarketDashboard path="/Game/Dashboard" />
          <MarketPortfolio path="/Game/Portfolio" />
          <MarketResearch path="/Game/Research" />
          <MarketTrade path="/Game/Trade" />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
