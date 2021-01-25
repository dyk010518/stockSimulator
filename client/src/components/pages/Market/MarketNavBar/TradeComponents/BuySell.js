import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import './BuySell.css'
import { cold } from "react-hot-loader";
import { get, post } from "../../../../../utilities.js"


class BuySell extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
        this.state = ({
            
        })
    }

    componentDidMount() {
        
        document.getElementById("seeStats").addEventListener("click", () => {
            this.updateStatus();
        });
        document.getElementById("trade").addEventListener("click", () => {
            this.props.updateButton(true)
            this.trade();
        });

    }

    updateStatus = () => {
        let stockSymbol = document.getElementById("stockSymbol").value;
        let transactionType = document.getElementById("transaction").value;
        let quantity = Number(document.getElementById("quantity").value);
        this.props.updateFunc(stockSymbol, transactionType, quantity);
    }

    trade = () => {
        let stockSymbol = document.getElementById("stockSymbol").value.toUpperCase();
        let transactionType = document.getElementById("transaction").value;
        if (!(transactionType === "buy" || transactionType === "sell")) {
            alert("Invalid transaction type, please try again")
            this.props.updateButton(false)
        } else {
            let quantity = Number(document.getElementById("quantity").value);
            if (quantity < 1 || (!(quantity))) {
                alert("Invalid quantity")
                this.props.updateButton(false)
            } else if (!(this.props.names.includes(stockSymbol))){ 
                alert("Invalid stock code.\nValid Codes:" + this.props.codes)
                this.props.updateButton(false)
            } else {
                console.log(stockSymbol + " " + this.props.day + " " + this.props.marketNumber)
                get("/api/getPriceData", {
                    symbol: stockSymbol,
                    day: this.props.day,
                    number: this.props.marketNumber,
                }).then((priceObj) => {
                    if (!(priceObj.obj)) {
                        alert("Stock not found, please try again")
                        this.props.updateButton(false)
                    } else {
                        this.props.tradeFunc(stockSymbol, quantity, priceObj.obj.stockPrice, this.props.day, transactionType)
                    }
                })
            }
        }
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        console.log()
        return (
            <>
                <div className="BuySell-container">
                    <h2 className="BuySell-header">
                        Trade
                    </h2>

                    <div className="BuySell-item">
                        <label for="symbol" className="BuySell-label">Stock Symbol:</label>
                        <input type="text" id="stockSymbol" className="BuySell-stockSymbol" />
                    </div>

                    <div className="BuySell-item">
                        <label for="transaction" className="BuySell-label">Transaction:</label>
                        <select name="transaction" id="transaction" className="BuySell-select">
                            <option value="buy">buy</option>
                            <option value="sell">sell</option>
                        </select>
                    </div>

                    <div className="BuySell-item">
                        <label for="quantity" className="BuySell-label">Quantity:</label>
                        <input type="text" id="quantity" name="quantity" className="BuySell-quantity" />
                    </div>

                    <div className="BuySell-item">
                        <label for="quantity" className="BuySell-label">Total Price:</label>
                        <div className="BuySell-info">{this.props.totalCost}</div>
                    </div>

                    <div className="BuySell-buttons">
                        <button id="seeStats" className="BuySell-seeStats">
                            See Stats
                        </button>

                        <button id="trade" className="BuySell-trade" disabled={this.props.buttonOff}>
                            Trade
                        </button>
                    </div>

                </div>
            </>
        );
    }
}

export default BuySell;