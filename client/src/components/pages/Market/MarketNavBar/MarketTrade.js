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
      marketNumber: "",
      stockSymbol: "",
      transaction: "buy",
      quantity: -1,
      stockDay: "",
      stockPrice: "",
      yearHigh: "",
      yearLow: "",
    });
  }

  update = (infoList) => {
    this.setState({
      stockSymbol: infoList[0],
      transaction: infoList[1],
      quantity: infoList[2],
    }, () => {
      this.getDay();
    })
  }

  getDay = () => {
    if(this.props.marketName === "One"){
      get("/api/getdate", { id: this.props.id }).then((dateObj) => {
        this.setState({
          stockDay: dateObj.one,
        }, () => this.setMarketNum())
      })
    }else if(this.props.marketName === "Two"){
      get("/api/getdate", { id: this.props.id }).then((dateObj) => {
        this.setState({
          stockDay: dateObj.two,
        }, () => this.setMarketNum())
      })
    }else if(this.props.marketName === "Three"){
      get("/api/getdate", { id: this.props.id }).then((dateObj) => {
        this.setState({
          stockDay: dateObj.three,
        }, () => this.setMarketNum())
      })
    }else if(this.props.marketName === "Four"){
      get("/api/getdate", { id: this.props.id }).then((dateObj) => {
        this.setState({
          stockDay: dateObj.four,
        }, () => this.setMarketNum())
      })
    }
  }

  setMarketNum = () => {
    let theMarket = "";
    if(this.props.marketName === "One"){
      theMarket = "1";
    }else if(this.props.marketName === "Two"){
      theMarket = "2";
    }else if(this.props.marketName === "Three"){
      theMarket = "3";
    }else if(this.props.marketName === "Four"){
      theMarket = "4";
    }
    this.setState({
      marketNumber: theMarket,
    }, () => this.updatePrice())
  }

  updatePrice = () => {
    // get("/api/getPriceData", {
    //   stockSymbol: this.state.stockSymbol, 
    //   day: this.stateDay, 
    //   marketNumber: this.state.marketNumber}
    // ).then((stockObj) => {
    //   this.setState({
    //     stockPrice: stockObj.stockPrice,
    //   })
    // })
    let theSymbol = this.state.stockSymbol.toUpperCase();
    let theDay = this.state.stockDay;
    let theMarket = this.state.marketNumber;

    get("/api/getPriceData", { symbol: theSymbol, day: theDay, number: theMarket}).then((stockObj) => {
      if(stockObj.obj){
        this.setState({
          stockPrice: stockObj.obj.stockPrice,
          yearHigh: stockObj.obj.yearHigh,
          yearLow: stockObj.obj.yearLow,
        })
      }else{
        this.setState({
          stockSymbol: "",
        }, () => {
          alert("Please insert a valid stock symbol");
        })
      }
    })

    
  }


  // getStockStats = (symbol) =>{
  //   get('/api/specificstock', { stockSymbol: symbol}).then((stockObj) => {
  //     this.setState({
  //         stockData: stockObj,
  //         stockPrice: stockObj.stockPrice,
  //     })
  // });
  // }


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
              yearHigh={this.state.yearHigh}
              yearLow={this.state.yearLow}
            />
          </div>
          <AccountDetails />
        </div>
      </>
    );
  }
}

export default MarketTrade;
