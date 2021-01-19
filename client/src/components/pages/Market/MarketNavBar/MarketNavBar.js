import './MarketNavBar.css';
import React, { Component } from "react";
import '../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import MarketDashboard from './MarketDashboard.js';
import MarketPortfolio from './MarketPortfolio.js';
import MarketResearch from './MarketResearch.js';
import MarketTrade from './MarketTrade.js';

const routes = [{link: "/", text: "Home"},{link: "/Game/Dashboard", text: "Dashboard"},
{link: "/Game/Portfolio", text: "Portfolio"}, {link: "/Game/Research", text: "Stock Research"}, 
{link: "/Game/Trade", text: "Trade"}];

class MarketNavBar extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        let bar = "|";
        let showText = this.props.username + "'s balance: $" + this.props.cash;

        return (
            

            <>
                <header className="MNavBar-header">
                    <div className ="allButtons">
                      {
                        routes.map((route, index, array) => (
                          <>
                            <div className="section">
                                <Link to={route.link} className="rm_decor">
                                  <button className="top-align">{route.text}</button>
                                </Link>
                            </div>
                            <div className="bar">
                                {(index<4) ? bar : null}
                            </div>
                          </>
                        ))
                      }
                    </div>
                    <div className = "balance">
                      {showText}
                    </div>
                </header>
            </>
        );
    }
}

export default MarketNavBar;