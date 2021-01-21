import './MarketNavBar.css';
import React, { Component } from "react";
import '../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link , Redirect } from '@reach/router';
import MarketDashboard from './MarketDashboard.js';
import MarketPortfolio from './MarketPortfolio.js';
import MarketResearch from './MarketResearch.js';
import MarketTrade from './MarketTrade.js';
import {get, post} from '../../../../utilities.js';

const routes = [{ link: "/", text: "Home" }, { link: "/Game/Dashboard", text: "Dashboard" },
{ link: "/Game/Portfolio", text: "Portfolio" }, { link: "/Game/Research", text: "Stock Research" },
{ link: "/Game/Trade", text: "Trade" }];

class MarketNavBar extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      dayOne: undefined,
      dayTwo: undefined,
      dayThree: undefined,
      dayFour: undefined,
      exist: true,
    }
  }

  componentDidMount() {
    get("/api/getdate", { id: this.props.id }).then((dateObj) => {
      if (dateObj){
        this.setState({
          dayOne: dateObj.one,
          dayTwo: dateObj.two,
          dayThree: dateObj.three,
          dayFour: dateObj.four,
          exist: true,
        }, () => {
          console.log("market dates received")
        })
      } else {
        this.setState({
          exist: false,
        }, () => {
          console.log("not existent")
        })
      }
      
    }).catch((err) => {
      this.setState({
        exist: false,
      }, () => {
        console.log("not existent")
      })
    });
  }
  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    let bar = "|";
    let showText = this.props.username + "'s balance: $" + this.props.cash;
    let day = undefined;
    if (this.props.marketName === "One"){
      day = this.state.dayOne
    } else if (this.props.marketName === "Two") {
      day = this.state.dayTwo
    } else if (this.props.marketName === "Three") {
      day = this.state.dayThree
    } else if (this.props.marketName === "Four") {
      day = this.state.dayFour
    } 
    if (!(this.state.exist)){
      return <Redirect to={"/"} noThrow/>
    }
    let titleText = "Market " + this.props.marketName + ": Day " + day;
    return (
      <>
        <header className="MNavBar-header">
          <div className="allButtons">
            {
              routes.map((route, index, array) => (
                <>
                  <div className="section">
                    <Link to={route.link} className="rm_decor">
                      <button className="top-align">{route.text}</button>
                    </Link>
                  </div>
                  <div className="bar">
                    {(index < 4) ? bar : null}
                  </div>
                </>
              ))
            }
          </div>
          <div className="title">
            {titleText}
          </div>
          <div className="balance">
            {showText}
          </div>
        </header>
      </>
    );
  }
}

export default MarketNavBar;