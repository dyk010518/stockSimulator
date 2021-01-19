import React, { Component } from "react";
import '../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import MarketNavBar from './MarketNavBar';
import StockList from './ResearchComponents/StockList.js';
import StockScreener from './ResearchComponents/StockScreener.js';
import StockSymbolSearch from './ResearchComponents/StockSymbolSearch.js';
import "./MarketResearch.css"

class MarketResearch extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        return (
            <>
                <MarketNavBar />
                <div className="MarketResearch-row">
                    <div className="MarketResearch-column">
                        <StockSymbolSearch />
                        <StockScreener />
                    </div>
                    <StockList />
                </div>
            </>
        );
    }
}

export default MarketResearch;