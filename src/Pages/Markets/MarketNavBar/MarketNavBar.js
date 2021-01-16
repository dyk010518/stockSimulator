import './MarketNavBar.css';
import React, { Component } from "react";
import '../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import Dashboard from './Dashboard.js';
import Portfolio from './Portfolio.js';
import StockResearch from './StockResearch.js';
import Trade from './Trade.js';

class MarketNavBar extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        return (
            <>
                <header className="MNavBar-header">
                    <div className ="allButtons">
                    <div className="section">
                        <Dashboard />
                    </div>
                    <div className="section">
                        |
                    </div>
                    <div className="section">
                        <Portfolio />
                    </div>
                    <div className="section">
                        |
                    </div>
                    <div className="section">
                        <StockResearch />
                    </div >
                    <div className="section">
                        |
                    </div>
                    <div className="section">
                        <Trade />
                    </div>
                    </div>
                </header>
            </>
        );
    }
}

export default MarketNavBar;