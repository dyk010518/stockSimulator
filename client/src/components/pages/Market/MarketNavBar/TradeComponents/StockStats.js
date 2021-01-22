import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import './StockStats.css';
import info from '../info.png';
import { get, post} from '../../../../../utilities.js';


class StockStats extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
    }

    state = {
        stockSymbol: this.props.stockSymbol,
        stockPrice: 123.45,
        stockMarketCap: "420.69B",
        stockEPS: 12.32,
        stockPE: 10.10,
        stockDivYield: "7.77%",
        stock52High: 177.77,
        stock52Low: 100.00,
    }

    
    componentDidMount() {
        document.getElementById("PPSbutton").addEventListener("click", function() {
            alert("Price Per Share is the amount of money that one stock share costs.")
        });
        document.getElementById("MarketCapButton").addEventListener("click", function() {
            alert("Market Capitalization is how big a company is in total.\nIt's calucated with the formula: Market Cap = (# of outstanding shares)*(Price Per Share)")
        });
        document.getElementById("EPSButton").addEventListener("click", function() {
            alert("Basic EPS is how much earning a share of company made for the past 12 months.\nIt's calculated with the formula: Basic EPS = (Company's Net Income)/(# of outstanding shares)")
        });
        document.getElementById("PEButton").addEventListener("click", function() {
            alert("Price/Earnings ratio shows how expensive a share of stock is relative to is income (TTM stand for \"trailing twelve months\").\nIt's calculated with the formula: P/E = (Price Per Share)/(EPS)")
        });
        document.getElementById("DivButton").addEventListener("click", function() {
            alert("Divident Yield is how much a company pays out to its shareholders relative to is share price.\nIt's calculated with the formula: Divident Yield = (Annual Divident)/(Price Per Share)")
        });
        document.getElementById("52HButton").addEventListener("click", function() {
            alert("52-week High is the highest Price Per Share recorded for a company during the last 52 weeks.")
        });
        document.getElementById("52LButton").addEventListener("click", function() {
            alert("52-week Low is the lowest Price Per Share recorded for a company during the last 52 weeks.")
        });

    }

    componentDidUpdate() {
        get('/api/specificstock', { stockSymbol: this.props.stockSymbol}).then((stockObj) => {
            console.log(stockObj);
        });
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        let space = " "
        
        return (
            <>
                <div className="StockStats-container">
                    <h2 className="StockStats-header">{"Stock Symbol: " + this.props.stockSymbol}</h2>

                    <div className="StockStats-item">
                        <label className="StockStats-label">
                            <button id="PPSbutton" class="equalbutton">
                                <img src={info} width={"15px"} height={"15px"}/>
                            </button>
                            {space}Price per share:
                        </label>
                        <div className="StockStats-info">{this.state.stockPrice}</div>
                    </div>

                    <div className="StockStats-item">
                        <label className="StockStats-label">
                            <button id="MarketCapButton" class="equalbutton">
                                <img src={info} width={"15px"} height={"15px"}/>
                            </button>
                            {space}Market Capitalization:
                        </label>
                        <div className="StockStats-info">{this.state.stockMarketCap}</div>
                    </div>

                    <div className="StockStats-item">
                        <label className="StockStats-label">
                            <button id="EPSButton" class="equalbutton">
                                <img src={info} width={"15px"} height={"15px"}/>
                            </button>
                            {space}Basic EPS:
                        </label>
                        <div className="StockStats-info">{this.state.stockEPS}</div>
                    </div>

                    <div className="StockStats-item">
                        <label className="StockStats-label">
                            <button id="PEButton" class="equalbutton">
                                <img src={info} width={"15px"} height={"15px"}/>
                            </button>
                            {space}Price/Earning (TTM):
                        </label>
                        <div className="StockStats-info">{this.state.stockPE}</div>
                    </div>

                    <div className="StockStats-item">
                        <label className="StockStats-label">
                            <button id="DivButton" class="equalbutton">
                                <img src={info} width={"15px"} height={"15px"}/>
                            </button>
                            {space}Dividend Yield:
                        </label>
                        <div className="StockStats-info">{this.state.stockDivYield}</div>
                    </div>

                    <div className="StockStats-item">
                        <label className="StockStats-label">
                            <button id="52HButton" class="equalbutton">
                                <img src={info} width={"15px"} height={"15px"}/>
                            </button>
                            {space}52-week High:
                        </label>
                        <div className="StockStats-info">{this.state.stock52High}</div>
                    </div>

                    <div className="StockStats-item">
                        <label className="StockStats-label">
                            <button id="52LButton" class="equalbutton">
                                <img src={info} width={"15px"} height={"15px"}/>
                            </button>
                            {space}52-week Low:
                        </label>
                        <div className="StockStats-info">{this.state.stock52Low}</div>
                    </div>
                </div>
                
            </>
        );
    }
}

export default StockStats;