import React, { Component } from "react";
import "../../../../buttonStyles.css";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import "./StockPortfolio.css";
import { get } from "../../../../../utilities";

class StockPortfolio extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      stockDay: undefined,
      stocks: [],
      userCash: {
        cashValue: undefined,
        accountTotal: undefined,
        cashPercentage: undefined,
      },
    }
  }


  componentDidMount = () => {
    this.updateUserInfo();
    this.updateUserPositions();
  }

  updateUserInfo = () => {
    let cashPercentages = (parseFloat(this.props.cash) / parseFloat(this.props.totalValue));
    cashPercentages = (Math.round(parseFloat(cashPercentages) * 10000) / 100).toString();

    this.setState({
      userCash: {
        cashValue: this.props.cash,
        accountTotal: this.props.totalValue,
        cashPercentage: cashPercentages,
      }
    })
  }

  updateUserPositions = () => {
    if (this.props.id) {
      let theStocks = [];
      let theObject = {};
      
      get('/api/getdate', {id: this.props.id }).then((dateObj) => {
        let tempDay = dateObj.one;
        this.setState({
          stockDay: tempDay,
        }, () => {
          get('/api/boughtstocks', { id: this.props.id }).then((boughtStockObjs) => {
            for (let i = 0; i < boughtStockObjs.length; i++) {
              get("/api/getPriceData", {
                symbol: boughtStockObjs[i].stockName,
                day: tempDay,
                // below is hard-coded market number
                number: "1",
              }).then((stockObj) => {    
                let priceChange = 0;
                let yesterdayPrice = 1;
                get("/api/getPriceData", {
                  symbol: boughtStockObjs[i].stockName,
                  day: tempDay-1,
                  // below is hard-coded market number
                  number: "1",
                }).then((yesterStock) => {   
                  if(yesterStock.obj !== undefined){
                    if((stockObj.obj.stockPrice !== boughtStockObjs[i].costBasis)){
                      let rawChange = parseFloat(stockObj.obj.stockPrice) - parseFloat(yesterStock.obj.stockPrice)
                      priceChange = (Math.round(parseFloat(rawChange) * 100) / 100);
                      yesterdayPrice = (Math.round(parseFloat(yesterStock.obj.stockPrice) * 100) / 100);
                    }
                  }
                  let thePrice = (Math.round(parseFloat(stockObj.obj.stockPrice) * 100) / 100);
                  let theQuantity = (Math.round(parseFloat(boughtStockObjs[i].quantity) * 100) / 100);
                  let theCostBasis = (Math.round(parseFloat(boughtStockObjs[i].costBasis) * 100) / 100);
                  
                  let todayDollor = (Math.round(parseFloat(priceChange*theQuantity) * 100) / 100);
                  let todayPercent = priceChange/yesterdayPrice;
                  todayPercent = (Math.round(parseFloat(todayPercent) * 10000) / 100);

                  let currentVal = (Math.round(parseFloat(thePrice*theQuantity) * 100) / 100);

                  let stockPercentage = (parseFloat(thePrice*theQuantity) / parseFloat(this.props.totalValue));
                  stockPercentage = (Math.round(parseFloat(stockPercentage) * 10000) / 100);

                  let totalCostBasis = (Math.round(parseFloat(theQuantity*theCostBasis) * 100) / 100);

                  let totalDollor = (Math.round(parseFloat((currentVal-totalCostBasis)) * 100) / 100);
                  let totalPercent = (Math.round(parseFloat(totalDollor/totalCostBasis) * 10000) / 100);



                  theObject = {
                    stockSymbol: boughtStockObjs[i].stockName,
                    lastPrice: "$" + thePrice.toString(),
                    todayDollarChange: "$" + todayDollor.toString(),
                    todayPercentChange: todayPercent.toString() + "%",
                    totalDollarChange: "$" + totalDollor,
                    totalPercentChange: totalPercent + "%",
                    currentValue: "$" + currentVal.toString(),
                    accountPercent: stockPercentage.toString() + "%",
                    quantity: theQuantity.toString(),
                    costBasisPS: "$" + theCostBasis.toString(),
                    costBasis: "$" + totalCostBasis.toString(),
                  }      
                  theStocks.push(theObject);
                  this.setState({
                    stocks: theStocks,
                  });
                })

                
              })
            }

              
          });
            
        })
      })
      // .then(() => {
      //   this.setState({
      //     stocks: theStocks,
      //   });
      // })

      
    }
  }


  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    let space = " "    
    console.log(this.state.stocks.length);
    return (
      <>
        {}
        <div className="StockPortfolio-container">
          <h2 className="StockPortfolio-header"> Stock Portfolio </h2>
          <div className="StockPortfolio-results">
            <thead>
              <tr>
                <th className="StockPortfolio-resultDesctiption"> Sybmol</th>
                <th className="StockPortfolio-resultDesctiption"> Last Price</th>
                <th className="StockPortfolio-resultDesctiption"> $ Today's Gain/Loss</th>
                <th className="StockPortfolio-resultDesctiption"> % Today's Gain/Loss</th>
                <th className="StockPortfolio-resultDesctiption"> $ Total Gain/Loss</th>
                <th className="StockPortfolio-resultDesctiption"> % Total Gain/Loss</th>
                <th className="StockPortfolio-resultDesctiption"> Current Value</th>
                <th className="StockPortfolio-resultDesctiption"> % of Account</th>
                <th className="StockPortfolio-resultDesctiption"> Quantity</th>
                <th className="StockPortfolio-resultDesctiption"> Cost Basis Per Share</th>
                <th className="StockPortfolio-resultDesctiption"> Cost Basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="StockPortfolio-resultDesctiption"> Cash</td>
                <td className="StockPortfolio-resultDesctiption">  </td>
                <td className="StockPortfolio-resultDesctiption">  </td>
                <td className="StockPortfolio-resultDesctiption">  </td>
                <td className="StockPortfolio-resultDesctiption">  </td>
                <td className="StockPortfolio-resultDesctiption">  </td>
                <td className="StockPortfolio-resultDesctiption"> {this.state.userCash.cashValue} </td>
                <td className="StockPortfolio-resultDesctiption"> {this.state.userCash.cashPercentage + "%"}</td>
                <td className="StockPortfolio-resultDesctiption">  </td>
                <td className="StockPortfolio-resultDesctiption">  </td>
                <td className="StockPortfolio-resultDesctiption">  </td>
              </tr>
            </tbody>
            <tbody>
              {this.state.stocks.map((stock) => (
                <>
                  <tr>
                    <td className="StockPortfolio-resultDesctiption"> {stock.stockSymbol}</td>
                    <td className="StockPortfolio-resultDesctiption"> {stock.lastPrice} </td>
                    <td className="StockPortfolio-resultDesctiption"> {stock.todayDollarChange} </td>
                    <td className="StockPortfolio-resultDesctiption"> {stock.todayPercentChange} </td>
                    <td className="StockPortfolio-resultDesctiption"> {stock.totalDollarChange} </td>
                    <td className="StockPortfolio-resultDesctiption"> {stock.totalPercentChange} </td>
                    <td className="StockPortfolio-resultDesctiption"> {stock.currentValue} </td>
                    <td className="StockPortfolio-resultDesctiption"> {stock.accountPercent} </td>
                    <td className="StockPortfolio-resultDesctiption"> {stock.quantity} </td>
                    <td className="StockPortfolio-resultDesctiption"> {stock.costBasisPS} </td>
                    <td className="StockPortfolio-resultDesctiption"> {stock.costBasis} </td>
                  </tr>
                </>
              ))}
            </tbody>

          </div>
        </div>
      </>
    );
  }
}

export default StockPortfolio;
