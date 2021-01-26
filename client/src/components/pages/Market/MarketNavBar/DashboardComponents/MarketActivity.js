import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import './MarketActivity.css';


class MarketActivity extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
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
                        <div className="MarketActivity-info">{this.props.gainStockName ? this.props.gainStockName + " (+" + this.props.gainStockPercent + "%)" : undefined}</div>
                    </div>

                    <div className="MarketActivity-item">
                        <label className="MarketActivity-label">
                            Biggest Loss:
                        </label>
                        <div className="MarketActivity-info">{this.props.lossStockName ? this.props.lossStockName + " (-" + this.props.lossStockPercent + "%)" : undefined}</div>
                    </div>
                    
                </div>
            </>
        );
    }
}

export default MarketActivity;