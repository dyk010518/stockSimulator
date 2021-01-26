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
        let gainStockName;
        let gainStockPercent;
        let lossStockName;
        let lossStockPercent;
        let theMarket = "";
        if (this.props.marketName === "One") {
            theMarket = "1";
        } else if (this.props.marketName === "Two") {
            theMarket = "2";
        } else if (this.props.marketName === "Three") {
            theMarket = "3";
        } else if (this.props.marketName === "Four") {
            theMarket = "4";
        }
        this.setState({
            marketNumber: theMarket,
        })
        if (this.props.id) {
            get("/api/getdate", { id: this.props.id }).then((dateObj) => {
                let tempDay;
                if (this.props.marketName === "One") {
                    tempDay = dateObj.one
                } else if (this.props.marketName === "Two") {
                    tempDay = dateObj.two
                } else if (this.props.marketName === "Three") {
                    tempDay = dateObj.three
                } else if (this.props.marketName === "Four") {
                    tempDay = dateObj.four
                }
                this.setState({
                    stockDay: tempDay,
                }, () => {
                    if (tempDay !== 1) {
                        get("/api/getStocksForTheDay", {
                            day: this.state.stockDay,
                            number: this.state.marketNumber,
                        }).then((returnObj) => {
                            this.setState({
                                gainStockName: roundPrice(returnObj.bgn).toString(),
                                gainStockPercent: roundPrice(returnObj.bgp).toString(),
                                lossStockName: roundPrice(returnObj.bln).toString(),
                                lossStockPercent: roundPrice(returnObj.blp).toString(),
                            }, () => {
                                console.log("gain loss set")
                            })
                        })
                    }
                })
            })
        }

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
                />
                <Graph />
                <div className="MarketDashboard-row">
                    <MarketActivity
                        gainStockName={this.state.gainStockName}
                        gainStockPercent={this.state.gainStockPercent}
                        lossStockName={this.state.lossStockName}
                        lossStockPercent={this.state.lossStockPercent}
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