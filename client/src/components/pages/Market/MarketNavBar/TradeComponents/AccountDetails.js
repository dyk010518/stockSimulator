import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import './AccountDetails.css'


class AccountDetails extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
    }

    state = {  
        stockSymbol: "PFE",
        totalValueBefore: 10000.00,
        totalValueAfter: 10000.00,
        cashBefore: 10000.00,
        cashAfter: 6000.00,
        sharesBefore:0,
        sharesAfter:100,
        stockValueBefore: 0.00,
        stockValueAfter: 12345.00,
        percentageBefore: "0%",
        percentageAfter: "10%",
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        return (
            <>
                <div className="AccountDetails-container">
                    <div className="AccountDetails-beforeContainer">
                        <h2 className="AccountDetails-before">Account Details (Before):</h2>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">Total Account Value:</label>
                            <div className="AccountDetails-info">{this.state.totalValueBefore}</div>
                        </div>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">Cash:</label>
                            <div className="AccountDetails-info">{this.state.cashBefore}</div>
                        </div>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">{"Shares of "+this.state.stockSymbol+":"}</label>
                            <div className="AccountDetails-info">{this.state.sharesBefore}</div>
                        </div>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">{"Total Value of "+this.state.stockSymbol+":"}</label>
                            <div className="AccountDetails-info">{this.state.stockValueBefore}</div>
                        </div>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">{"Percentage allocation of "+this.state.stockSymbol+":"}</label>
                            <div className="AccountDetails-info">{this.state.percentageBefore}</div>
                        </div>
                    </div>
   
                    <hr className="AccountDetails-line"></hr>

                    <div className="AccountDetails-afterContainer">
                        <h2 className="AccountDetails-after">Account Details (After):</h2>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">Total Value:</label>
                            <div className="AccountDetails-info">{this.state.totalValueAfter}</div>
                        </div>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">Cash:</label>
                            <div className="AccountDetails-info">{this.state.cashAfter}</div>
                        </div>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">{"Shares of "+this.state.stockSymbol+":"}</label>
                            <div className="AccountDetails-info">{this.state.sharesAfter}</div>
                        </div>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">{"Total Value of "+this.state.stockSymbol+":"}</label>
                            <div className="AccountDetails-info">{this.state.stockValueAfter}</div>
                        </div>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">{"Percentage allocation of "+this.state.stockSymbol+":"}</label>
                            <div className="AccountDetails-info">{this.state.percentageAfter}</div>
                        </div>
                    </div>
                    
                </div>
            </>
        );
    }
}

export default AccountDetails;