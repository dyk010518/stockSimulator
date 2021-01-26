import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Homepage from "./pages/Homepage/Homepage.js";
import Market from "./pages/Market/Market.js";
import MarketDashboard from "./pages/Market/MarketNavBar/MarketDashboard.js";
import MarketPortfolio from "./pages/Market/MarketNavBar/MarketPortfolio.js";
import MarketResearch from "./pages/Market/MarketNavBar/MarketResearch.js";
import MarketTrade from "./pages/Market/MarketNavBar/MarketTrade.js";
import MarketImport from "./pages/Market/MarketNavBar/MarketImport.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post, roundPrice } from "../utilities.js";



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
      totalValue: undefined,
      username: undefined,
      cashOne: undefined,
      cashTwo: undefined,
      cashThree: undefined,
      cashFour: undefined,
      day: undefined,
      gainStockName: undefined,
      gainStockPercent: undefined,
      lossStockName: undefined,
      lossStockPercent: undefined,
      YourPerf: undefined,
      SAPP: undefined,
    };
  }
  categories = {
    consumerD: ["CAKE", "COOP", "STORE"],
    consumerS: ["CELL", "GROCE"],
    EandU: ["SOLAR", "OIL"],
    Fin: ["INSUR", "BANK"],
    Health: ["HINSUR", "BAID"],
    Industrial: ["STICKY", "VACC"],
    RealE: ["HOME", "HOOD"],
    Tech: ["COMP", "SOFT", "PHONE"],
    Transport: ["CAR", "SHIP"],
  }
  names = [
    "CHEESE",
    "COOP",
    "STORE",
    "CELL",
    "GROCE",
    "SOLAR",
    "OIL",
    "INSUR",
    "BANK",
    "HINSUR",
    "BAID",
    "STICKY",
    "VACC",
    "HOME",
    "HOOD",
    "COMP",
    "SOFT",
    "PHONE",
    "CAR",
    "SHIP"]
  namesList = "\nCHEESE\nCOOP\nSTORE\nCELL\nGROCE\nSOLAR\nOIL\nINSUR\nBANK\nHINSUR\nBAID\nSTICKY\nVACC\nHOME\nHOOD\nCOMP\nSOFT\nPHONE\nCAR\nSHIP"

  updateDay = (updateVal) => {
    this.setState({
      day: updateVal,
    }, () => {
      if (this.state.day !== 1) {
        let tempNumber;
        if (this.state.marketName === "One"){
          tempNumber = "1"
        } else if (this.state.marketName === "Two") {
          tempNumber = "2"
        } else if (this.state.marketName === "Three") {
          tempNumber = "3"
        } else if (this.state.marketName === "Four") {
          tempNumber = "4"
        }
        get("/api/getStocksForTheDay", {
          day: this.state.day,
          number: tempNumber,
        }).then((returnObj) => {
          let tempGain = (Math.round(parseFloat(returnObj.bgp) * 10000) / 10000).toString()
          let tempLoss = (Math.round(parseFloat(returnObj.blp) * 10000) / 10000).toString()
          get("/api/graphData", {
            id: this.state.userId,
            number: tempNumber,
            day: this.state.day,
          }).then((graphReturnObj) => {
            this.setState({
              gainStockName: returnObj.bgn.toString(),
              gainStockPercent: tempGain,
              lossStockName: returnObj.bln.toString(),
              lossStockPercent: tempLoss,
              YourPerf: graphReturnObj.YP,
              SAPP: graphReturnObj.SPP,
            }, () => {
              console.log("graph day gain loss set")
            })
          })
        })
      }
    })
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
    this.setState(
      {
        marketName: name,
        cash: tcash,
      },
      () => {
        console.log("marketName set");
      }
    );
  };

  //update cash & total value
  updateCash = () => {
    if (this.state.userId) {
      get("/api/getCash", { id: this.state.userId }).then((userObj) => {
        let tcash;
        if (this.state.marketName === "One") {
          tcash = (Math.round(parseFloat(userObj.cashOne) * 100) / 100).toString()
        } else if (this.state.marketName === "Two") {
          tcash = (Math.round(parseFloat(userObj.cashOne) * 100) / 100).toString()
        } else if (this.state.marketName === "Three") {
          tcash = (Math.round(parseFloat(userObj.cashOne) * 100) / 100).toString()
        } else if (this.state.marketName === "Four") {
          tcash = (Math.round(parseFloat(userObj.cashOne) * 100) / 100).toString()
        }
        this.setState({ cash: tcash }, () => { this.updateTotalValue() })
      })
    }
  }

  updateTotalValue = () => {
    if (this.state.userId) {
      let totalStocks = 0;
      get('/api/boughtstocks', { id: this.state.userId }).then((boughtStockObjs) => {
        for (let i = 0; i < boughtStockObjs.length; i++) {
          if (boughtStockObjs[i].quantity === 0) {
            continue
          }
          totalStocks += parseFloat(boughtStockObjs[i].quantity) * parseFloat(boughtStockObjs[i].costBasis);
        }
        totalStocks += parseFloat(this.state.cash);
        this.setState({
          totalValue: roundPrice(totalStocks).toString(),
        }, () => { console.log("total value and cash updated") })
      });
    }
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState(
          {
            userId: user._id,
            googleid: user.googleid,
            username: user.name,
            cashOne: user.cashOne,
            cashTwo: user.cashTwo,
            cashThree: user.cashThree,
            cashFour: user.cashFour,
          },
          () => {
            console.log("state set")
          }
        );
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
      }),
        () => { };
      post("/api/recentactivities", { id: this.state.userId });
      post("/api/marketdate", { id: this.state.userId });
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
          <Homepage
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
            setMarketNum={this.setMarketNum}
            username={this.state.username}
          />
          <Market path="/Game" marketName={this.state.marketName} />
          <MarketDashboard
            path="/Game/Dashboard"
            username={this.state.username}
            cash={this.state.cash}
            marketName={this.state.marketName}
            id={this.state.userId}
            updateCash={this.updateCash}
            day={this.state.day}
            updateDay={this.updateDay}
            gainStockName= {this.state.gainStockName}
            gainStockPercent= {this.state.gainStockPercent}
            lossStockName= {this.state.lossStockName}
            lossStockPercent= {this.state.lossStockPercent}
          />
          <MarketPortfolio
            path="/Game/Portfolio"
            username={this.state.username}
            cash={this.state.cash}
            totalValue={this.state.totalValue}
            marketName={this.state.marketName}
            id={this.state.userId}
            updateCash={this.updateCash}
            day={this.state.day}
            updateDay={this.updateDay}
          />
          <MarketResearch
            path="/Game/Research"
            username={this.state.username}
            cash={this.state.cash}
            marketName={this.state.marketName}
            id={this.state.userId}
            updateCash={this.updateCash}
            categories={this.categories}
            day={this.state.day}
            updateDay={this.updateDay}
          />
          <MarketTrade
            path="/Game/Trade"
            username={this.state.username}
            cash={this.state.cash}
            totalValue={this.state.totalValue}
            marketName={this.state.marketName}
            id={this.state.userId}
            updateCash={this.updateCash}
            names={this.names}
            namesList={this.namesList}
            day={this.state.day}
            updateDay={this.updateDay}
          />
          {/*
          <MarketImport
            path="/Game/Import"
            username={this.state.username}
            cash={this.state.cash}
            marketName={this.state.marketName}
            id={this.state.userId}
            updateCash={this.updateCash}
            updateDay={this.updateDay}
            day={this.state.day}
          />
          */}
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
