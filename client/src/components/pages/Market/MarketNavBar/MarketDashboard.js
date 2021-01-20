import React, { Component } from "react";
import '../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import MarketNavBar from './MarketNavBar';
import Graph from './DashboardComponents/Graph.js';
import RecentActivity from './DashboardComponents/RecentActivity.js';
import MarketActivity from './DashboardComponents/MarketActivity.js';
import './MarketDashboard.css';

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
                <MarketNavBar cash={this.props.cash} username={this.props.username} marketName={this.props.marketName}/>
                <Graph />
                <div className="MarketDashboard-row">
                    <MarketActivity />
                    <RecentActivity username={this.props.username} googleid={this.props.googleid}/>
                </div>
            </>
        );
    }
}

export default MarketDashboard;