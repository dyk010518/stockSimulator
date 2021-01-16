import './MarketNavBar.css';
import React, { Component } from "react";
import '../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import MarketDashboard from './MarketDashboard.js';
import MarketPortfolio from './MarketPortfolio.js';
import MarketResearch from './MarketResearch.js';
import MarketTrade from './MarketTrade.js';

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
                        <MarketDashboard />
                    </div>
                    <div className="section">
                        |
                    </div>
                    <div className="section">
                        <MarketPortfolio />
                    </div>
                    <div className="section">
                        |
                    </div>
                    <div className="section">
                        <MarketResearch />
                    </div >
                    <div className="section">
                        |
                    </div>
                    <div className="section">
                        <MarketTrade />
                    </div>
                    </div>
                </header>
            </>
        );
    }
}

export default MarketNavBar;