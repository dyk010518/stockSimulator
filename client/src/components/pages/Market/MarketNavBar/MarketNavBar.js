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
        return (
            <>
                <header className="MNavBar-header">
                    <div className ="allButtons">
                      {
                        routes.map((route) => (
                          <>
                            <div className="section">
                                <Link to={route.link} className="rm_decor">{route.text}</Link>
                            </div>
                            <div className="section">
                                |
                            </div>
                          </>
                          ))
                      }
                    </div>
                </header>
            </>
        );
    }
}

export default MarketNavBar;