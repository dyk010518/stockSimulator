import React, { Component } from "react";
import "../../../buttonStyles.css";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import MarketNavBar from "./MarketNavBar";
import BuySell from "./TradeComponents/BuySell.js";
import AccountDetails from "./TradeComponents/AccountDetails.js";
import StockStats from "./TradeComponents/StockStats.js";
import "./MarketTrade.css";
import { get, post, dayToMonth, dayToQuarter, dayToYear, roundPrice } from '../../../../utilities.js';

const marketOneStocks = "\nCHEESE\nCOOP\nSTORE\nCELL\nGROCE\nSOLAR\nOIL\nINSUR\nBANK\nHINSUR\nBAID\nSTICKY\nVACC\nHOME\nHOOD\nCOMP\nSOFT\nPHONE\nCAR\nSHIP"

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

  componentDidMount() {
    let theMarket = "";
    if (this.props.marketName === "One") {
      theMarket = "1";
    } else if (this.props.marketName === "Two") {
      theMarket = "2";
    } else if (this.props.marketName === "Three") {
      theMarket = "3";
    } else if (this.props.marketName === "Four") {
      theMarket = "4";
    }
    this.setState({
      marketNumber: theMarket,
    })
    get("/api/getdate", { id: this.props.id }).then((dateObj) => {
      let tempDay;
      if (this.props.marketName === "One") {
        tempDay = dateObj.one
      } else if (this.props.marketName === "Two") {
        tempDay = dateObj.two
      } else if (this.props.marketName === "Three") {
        tempDay = dateObj.three
      } else if (this.props.marketName === "Four") {
        tempDay = dateObj.four
      }
      this.setState({
        stockDay: tempDay,
      }, () => {

      })
    })
  }

  update = (symbol, ttype, amt) => {
    //sets vars based off of entered values
    get("/api/getdate", { id: this.props.id }).then((dateObj) => {
      let tempDay;
      if (this.props.marketName === "One") {
        tempDay = dateObj.one
      } else if (this.props.marketName === "Two") {
        tempDay = dateObj.two
      } else if (this.props.marketName === "Three") {
        tempDay = dateObj.three
      } else if (this.props.marketName === "Four") {
        tempDay = dateObj.four
      }
      this.setState({
        stockDay: tempDay,
      }, () => {
        this.setState({
          stockSymbol: symbol,
          transaction: ttype,
          quantity: amt,
        }, () => {
          //updates price
          get("/api/getPriceData", {
            symbol: this.state.stockSymbol.toUpperCase(),
            day: this.state.stockDay,
            number: this.state.marketNumber
          }).then((stockObj) => {
            if (!(stockObj.obj)) {
              this.setState({
                stockSymbol: "",
                stockPrice: "",
                yearHigh: "",
                yearLow: "",
                stockEPS: "",
              }, () => {
                alert("Please insert a valid stock symbol: " + marketOneStocks);
              })
            } else {
              this.setState({
                stockPrice: Math.round(parseFloat(stockObj.obj.stockPrice) * 100) / 100,
                yearHigh: stockObj.obj.yearHigh,
                yearLow: stockObj.obj.yearLow,
              }, () => {
                //updates eps
                get("/api/getEPSData", {
                  symbol: this.state.stockSymbol.toUpperCase(),
                  year: this.state.stockYear,
                  number: this.state.marketNumber
                }).then((EPSObj) => {
                  this.setState({
                    stockEPS: EPSObj.stockEPS,
                  }, () => {
                    //update other stats!
                  })
                })
              })
            }
          })
        })
      })
    })

  }

  trade = (symbol, quantity, price, day, type) => {
    let totalCost = parseInt(quantity) * parseFloat(roundPrice(price))
    if (type === "buy") {
      if (this.props.cash < totalCost) {
        alert("Not enough money.\nYou need $" + roundPrice((totalCost - parseFloat(this.props.cash)).toString()) + " more to complete the transaction.")
      } else {
        post('/api/buyStock', {
          id: this.props.id,
          symbol: symbol,
          amt: quantity,
          bp: price,
          day: day,
          mn: this.state.marketNumber,
        }).then((stockObj) => {
          this.props.updateCash()
          alert("Successfully bought " + stockObj.quantity + " " + stockObj.stockName + " stocks!\nCheck your portfolio to see how you're doing!")
        })
      }
    } else if (type === "sell") {
      get('/api/getBoughtStocks', {
        id: this.props.id,
        symbol: symbol,
      }).then((StockObj) => {
        let userAmt;
        if (StockObj) {
          userAmt = parseInt(StockObj.quantity)
        } else {
          userAmt = 0;
        }
        console.log("reached")
        if (userAmt < quantity) {
          alert("You don't have enough stocks.\nYou need " + (parseInt(quantity) - userAmt).toString() + " more.")
        } else {
          post('/api/sellStock', {
            id: this.props.id,
            symbol: symbol,
            amt: quantity,
            bp: price,
            mn: this.state.marketNumber,
          }).then((stockObj) => {
            console.log(stockObj)
            this.props.updateCash()
            alert("Successfully sold " + quantity + " " + symbol + " stocks!\nCheck your portfolio to see how you're doing!")
          })
        }
      })
    }
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
          updateCash={this.props.updateCash}
        />
        <div className="MarketTrade-row">
          <div className="MarketTrade-column">
            <BuySell
              updateFunc={this.update.bind(this)}
              tradeFunc={this.trade}
              day={this.state.stockDay}
              id={this.props.id}
              cash={this.props.cash}
              marketNumber={this.state.marketNumber}
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
