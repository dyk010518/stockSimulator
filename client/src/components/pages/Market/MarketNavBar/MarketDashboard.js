import React, { Component } from "react";
import '../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import MarketNavBar from './MarketNavBar';
import Graph from './DashboardComponents/Graph.js';
import RecentActivity from './DashboardComponents/RecentActivity.js'

class MarketDashboard extends Component {
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
                <Graph />
                <RecentActivity />
            </>
        );
    }
}

export default MarketDashboard;