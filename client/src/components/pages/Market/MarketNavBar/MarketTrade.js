import React, { Component } from "react";
import "../../../buttonStyles.css";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import MarketNavBar from "./MarketNavBar";
import BuySell from "./TradeComponents/BuySell.js";
import AccountDetails from "./TradeComponents/AccountDetails.js";
import StockStats from "./TradeComponents/StockStats.js";
import "./MarketTrade.css";
import { get, post, dayToMonth, dayToQuarter, dayToYear} from '../../../../utilities.js';


class MarketTrade extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = ({
      marketNumber: "",
      stockSymbol: "",
      transaction: "buy",
      quantity: -1,
      stockDay: "",
      stockMonth: "",
      stockQuarter: "",
      stockYear: "",
      stockPrice: "",
      yearHigh: "",
      yearLow: "",
      stockEPS: "",
    });
  }

  update = (infoList) => {
    this.setState({
      stockSymbol: infoList[0],
      transaction: infoList[1],
      quantity: infoList[2],
    }, () => {
      this.getTime();
    })
  }

  getTime = () => {
    if(this.props.marketName === "One"){
      get("/api/getdate", { id: this.props.id }).then((dateObj) => {
        this.setState({
          stockDay: dateObj.one,
          stockMonth: dayToMonth(dateObj.one),
          stockQuarter: dayToQuarter(dateObj.one),
          stockYear: dayToYear(dateObj.one),
        }, () => this.setMarketNum())
      })
    }else if(this.props.marketName === "Two"){
      get("/api/getdate", { id: this.props.id }).then((dateObj) => {
        this.setState({
          stockDay: dateObj.two,
          stockMonth: dayToMonth(dateObj.two),
          stockQuarter: dayToQuarter(dateObj.two),
          stockYear: dayToYear(dateObj.two),
        }, () => this.setMarketNum())
      })
    }else if(this.props.marketName === "Three"){
      get("/api/getdate", { id: this.props.id }).then((dateObj) => {
        this.setState({
          stockDay: dateObj.three,
          stockMonth: dayToMonth(dateObj.three),
          stockQuarter: dayToQuarter(dateObj.three),
          stockYear: dayToYear(dateObj.three),
        }, () => this.setMarketNum())
      })
    }else if(this.props.marketName === "Four"){
      get("/api/getdate", { id: this.props.id }).then((dateObj) => {
        this.setState({
          stockDay: dateObj.four,
          stockMonth: dayToMonth(dateObj.four),
          stockQuarter: dayToQuarter(dateObj.four),
          stockYear: dayToYear(dateObj.four),
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
    let theDay = this.state.stockDay;

    get("/api/getPriceData", { symbol: this.state.stockSymbol.toUpperCase(), day: theDay, number: this.state.marketNumber}).then((stockObj) => {
      if(stockObj.obj){
        this.setState({
          stockPrice: stockObj.obj.stockPrice,
          yearHigh: stockObj.obj.yearHigh,
          yearLow: stockObj.obj.yearLow,
        }, () => {
          this.updateEPS();
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

  updateEPS = () => {
    get("/api/getEPSData", { symbol: this.state.stockSymbol.toUpperCase(), year: this.state.stockYear, number: this.state.marketNumber }).then((EPSObj) => {
      this.setState({
        stockEPS: EPSObj.stockEPS,
      })
    })
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
              yearHigh={this.state.yearHigh}
              yearLow={this.state.yearLow}
              stockEPS={this.state.stockEPS}
            />
          </div>
          <AccountDetails />
        </div>
      </>
    );
  }
}

export default MarketTrade;
