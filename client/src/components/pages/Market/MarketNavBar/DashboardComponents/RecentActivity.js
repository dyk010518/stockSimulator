import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import './RecentActivity.css';
import { get, post } from '../../../../../utilities.js'


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

        if (this.props.id) {
            get("/api/getRA", { id: this.props.id }).then((activityObj) => {

                this.setState({
                    boughts: activityObj.bought.split(","),
                    buypr: activityObj.bPrice.split(","),
                    solds: activityObj.sold.split(","),
                    sellpr: activityObj.sPrice.split(","),
                }, () => {
                    console.log("got recent activities from database")
                })
            });
        }
    }

    getInfoStr = (names, prices) => {
        
        if (!(names[0] === "")) {
            let ans = "";
            for (let i = 0; i < names.length; i++) {
                ans += (names[i] + " ($" + prices[i] + ")")
                if (!(i === names.length - 1)) {
                    ans += (", ")
                }
            }
            return ans
        } else {
            return "No recent activity! Get to work trading!"
        }
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        let boughtInfo = this.getInfoStr(this.state.boughts, this.state.buypr);
        let soldInfo = this.getInfoStr(this.state.solds, this.state.sellpr)
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