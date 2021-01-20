import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Homepage from './pages/Homepage/Homepage.js';
import Market from './pages/Market/Market.js';
import MarketDashboard from './pages/Market/MarketNavBar/MarketDashboard.js';
import MarketPortfolio from './pages/Market/MarketNavBar/MarketPortfolio.js';
import MarketResearch from './pages/Market/MarketNavBar/MarketResearch.js';
import MarketTrade from './pages/Market/MarketNavBar/MarketTrade.js';

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
      googleid: undefined,
      marketName: undefined,
      username: undefined,
      cashOne: undefined,
      cashTwo: undefined,
      cashThree: undefined,
      cashFour: undefined,
    };
  }

  setMarketNum = (name) => {
    let tcash = undefined;
    if (name === "One") {
      tcash = this.state.cashOne;
    } else if (name === "Two") {
      tcash = this.state.cashTwo;
    } else if (name === "Three") {
      tcash = this.state.cashThree;
    } else if (name === "Four") {
      tcash = this.state.cashFour;
    }
    this.setState({
      marketName: name,
      cash: tcash,
    }, () => {
      console.log("marketName set")
    })
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({
          userId: user._id,
          googleid: user.googleid,
          username: user.name,
          cashOne: user.cashOne,
          cashTwo: user.cashTwo,
          cashThree: user.cashThree,
          cashFour: user.cashFour,
        }, () => {
          console.log("state set")
        });

      }
    });

  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({
        userId: user._id,
        googleid: user.googleid,
        username: res.profileObj.name,
        cashOne: user.cashOne,
        cashTwo: user.cashTwo,
        cashThree: user.cashThree,
        cashFour: user.cashFour,
      });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({
      userId: undefined,
      googleid: undefined,
      username: undefined,
      cashOne: undefined,
      cashTwo: undefined,
      cashThree: undefined,
      cashFour: undefined,
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
            setMarketNum={this.setMarketNum}
            username={this.state.username}
          />
          <Market path="/Game"
            marketName={this.state.marketName}
          />
          <MarketDashboard path="/Game/Dashboard"
            username={this.state.username}
            cash={this.state.cash}
            marketName={this.state.marketName}
            googleid={this.state.googleid}
          />
          <MarketPortfolio path="/Game/Portfolio"
            username={this.state.username}
            cash={this.state.cash}
            marketName={this.state.marketName}
          />
          <MarketResearch path="/Game/Research"
            username={this.state.username}
            cash={this.state.cash}
            marketName={this.state.marketName}
          />
          <MarketTrade path="/Game/Trade"
            username={this.state.username}
            cash={this.state.cash}
            marketName={this.state.marketName}
          />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
