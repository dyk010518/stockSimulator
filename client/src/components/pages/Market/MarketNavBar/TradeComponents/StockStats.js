import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import './StockStats.css'


class StockStats extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
    }

    state = {
        stockSymbol: "PFE",
        stockPrice: 123.45,
        stockMarketCap: "420.69B",
        stockEPS: 12.32,
        stockPE: 10.10,
        stockDivYield: "7.77%",
        stock52High: 177.77,
        stock52Low: 100.00,
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        return (
            <>
                <div className="StockStats-container">
                    <h2 className="StockStats-header">{"Stock Symbol: " + this.state.stockSymbol}</h2>

                    <div className="StockStats-item">
                        <label className="StockStats-label">Price per share:</label>
                        <div className="StockStats-info">{this.state.stockPrice}</div>
                    </div>

                    <div className="StockStats-item">
                        <label className="StockStats-label">Market Capitalization:</label>
                        <div className="StockStats-info">{this.state.stockMarketCap}</div>
                    </div>

                    <div className="StockStats-item">
                        <label className="StockStats-label">Basic EPS:</label>
                        <div className="StockStats-info">{this.state.stockEPS}</div>
                    </div>

                    <div className="StockStats-item">
                        <label className="StockStats-label">Price/Earning (TTM):</label>
                        <div className="StockStats-info">{this.state.stockPE}</div>
                    </div>

                    <div className="StockStats-item">
                        <label className="StockStats-label">Dividend Yield:</label>
                        <div className="StockStats-info">{this.state.stockDivYield}</div>
                    </div>

                    <div className="StockStats-item">
                        <label className="StockStats-label">52-week High:</label>
                        <div className="StockStats-info">{this.state.stock52High}</div>
                    </div>

                    <div className="StockStats-item">
                        <label className="StockStats-label">52-week Low:</label>
                        <div className="StockStats-info">{this.state.stock52Low}</div>
                    </div>
                </div>
                
            </>
        );
    }
}

export default StockStats;