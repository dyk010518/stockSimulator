import React, { Component } from "react";
import '../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import MarketNavBar from './MarketNavBar';
import Graph from './DashboardComponents/Graph.js';
import RecentActivity from './DashboardComponents/RecentActivity.js';
import MarketActivity from './DashboardComponents/MarketActivity.js';
import './MarketDashboard.css';
import { get, post, roundPrice } from "../../../../utilities.js"

class MarketDashboard extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
        this.state = {
            marketNumber: undefined,
            stockDay: undefined,
            gainStockName: undefined,
            gainStockPercent: undefined,
            lossStockName: undefined,
            lossStockPercent: undefined,
        }

    }

    componentDidMount() {
        
    }

    
    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        return (
            <>
                <MarketNavBar
                    cash={this.props.cash}
                    username={this.props.username}
                    marketName={this.props.marketName}
                    id={this.props.id}
                    updateCash={this.props.updateCash}
                    updateDay={this.props.updateDay}
                    updateTotalValue={this.props.updateTotalValue}
                />
                <Graph 
                    YP={this.props.YP}
                    SPP={this.props.SPP}
                />
                <div className="MarketDashboard-row">
                    <MarketActivity
                        gainStockName={this.props.gainStockName}
                        gainStockPercent={this.props.gainStockPercent}
                        lossStockName={this.props.lossStockName}
                        lossStockPercent={this.props.lossStockPercent}
                    />
                    <RecentActivity
                        username={this.props.username}
                        id={this.props.id}
                    />
                </div>
            </>
        );
    }
}

export default MarketDashboard;