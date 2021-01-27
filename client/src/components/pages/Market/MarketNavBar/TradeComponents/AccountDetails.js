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
        totalValue: this.props.totalValue,
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
                            <label className="AccountDetails-label">Cash:</label>
                            <div className="AccountDetails-info">{this.props.cash}</div>
                        </div>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">{"Shares of "+this.props.stockSymbol+":"}</label>
                            <div className="AccountDetails-info">{this.props.shares}</div>
                        </div>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">{"Total Value of "+this.props.stockSymbol+":"}</label>
                            <div className="AccountDetails-info">{this.props.shareValue}</div>
                        </div>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">{"Percentage allocation of "+this.props.stockSymbol+":"}</label>
                            <div className="AccountDetails-info">{this.props.percentage}</div>
                        </div>
                    </div>
   
                    <hr className="AccountDetails-line"></hr>

                    <div className="AccountDetails-afterContainer">
                        <h2 className="AccountDetails-after">Account Details (After):</h2>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">Cash:</label>
                            <div className="AccountDetails-info">{this.props.cashAfter}</div>
                        </div>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">{"Shares of "+this.props.stockSymbol+":"}</label>
                            <div className="AccountDetails-info">{this.props.sharesAfter}</div>
                        </div>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">{"Total Value of "+this.props.stockSymbol+":"}</label>
                            <div className="AccountDetails-info">{this.props.shareValueAfter}</div>
                        </div>
                        <div className="AccountDetails-item">
                            <label className="AccountDetails-label">{"Percentage allocation of "+this.props.stockSymbol+":"}</label>
                            <div className="AccountDetails-info">{this.props.percentageAfter}</div>
                        </div>
                    </div>
                    
                </div>
            </>
        );
    }
}

export default AccountDetails;