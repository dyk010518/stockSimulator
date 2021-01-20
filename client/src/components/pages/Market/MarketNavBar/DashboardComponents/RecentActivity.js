import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import './RecentActivity.css';


class RecentActivity extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
        this.state = {
            boughts: ["PFE", "AAPL"],
            buypr: ["50", "20"],
            solds: ["AAPL", "PFE"],
            sellpr: ["30", "80"],
        }
    }

    componentDidMount() {
        //get stock data
    }

    getInfoStr = (names, prices) => {
        let ans = "";
        for (let i = 0; i < names.length; i++) {
            ans += (names[i] + " ($" + prices[i] + ")")
            if (!(i === names.length - 1)) {
                ans += (", ")
            }
        }
        return ans
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        let bought = this.state.boughts;
        let buyp = this.state.buypr;
        let sold = this.state.solds;
        let sellp = this.state.sellpr;
        let boughtInfo = this.getInfoStr(bought, buyp);
        let soldInfo = this.getInfoStr(sold, sellp)
        return (
            <>
                <div className="RecentActivity-container">
                    <h2 className="RecentActivity-header">{this.props.username + "'s Recent Activity"}</h2>

                    <div className="RecentActivity-item">
                        <label className="RecentActivity-label">
                            Recently Bought:
                        </label>
                        <div className="RecentActivity-info">
                            {boughtInfo}
                        </div>
                    </div>

                    <div className="RecentActivity-item">
                        <label className="RecentActivity-label">
                            Recently Sold:
                        </label>
                        <div className="RecentActivity-info">
                            {soldInfo}
                        </div>
                    </div>

                </div>

            </>
        );
    }
}

export default RecentActivity;