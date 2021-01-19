import React, { Component } from "react";
import '../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import MarketNavBar from './MarketNavBar';
import StockPortfolio from './PortfolioComponents/StockPortfolio.js';
import BroadMarketIndexes from './PortfolioComponents/BroadMarketIndexes.js';

class MarketPortfolio extends Component {
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
                <StockPortfolio />
                <BroadMarketIndexes />
            </>
        );
    }
}

export default MarketPortfolio;