import React, { Component } from "react";
import '../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import MarketNavBar from './MarketNavBar';
import BuySell from './TradeComponents/BuySell.js';
import AccountDetails from './TradeComponents/AccountDetails.js';
import StockStats from './TradeComponents/StockStats.js';

class MarketTrade extends Component {
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
                <AccountDetails />
                <BuySell />
                <StockStats />
            </>
        );
    }
}

export default MarketTrade;