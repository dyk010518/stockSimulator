import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import './MarketActivity.css';


class MarketActivity extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
        this.state = {
            gainStockName: undefined,
            gainStockPercent: undefined,
            lossStockName: undefined,
            lossStockPercent: undefined,
        }
    }

    componentDidMount(){
        //get stock data
        this.setState({
            gainStockName: "PFE",
            gainStockPercent: "50",
            lossStockName: "AAPL",
            lossStockPercent: "20"
        }, () => {
            console.log("market activity")
        })
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        return (
            <>
                <div className="MarketActivity-container">
                    <h2 className="MarketActivity-header">Market Activity</h2>

                    <div className="MarketActivity-item">
                        <label className="MarketActivity-label">
                            Biggest Gain:
                        </label>
                        <div className="MarketActivity-info">{this.state.gainStockName + " (+" + this.state.gainStockPercent + "%)"}</div>
                    </div>

                    <div className="MarketActivity-item">
                        <label className="MarketActivity-label">
                            Biggest Loss:
                        </label>
                        <div className="MarketActivity-info">{this.state.lossStockName + " (-" + this.state.lossStockPercent + "%)"}</div>
                    </div>
                    
                </div>
            </>
        );
    }
}

export default MarketActivity;