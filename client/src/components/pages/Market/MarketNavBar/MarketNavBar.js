import "./MarketNavBar.css";
import React, { Component } from "react";
import "../../../buttonStyles.css";
import { Router } from "@reach/router";
import { Link, Redirect } from "@reach/router";
import MarketDashboard from "./MarketDashboard.js";
import MarketPortfolio from "./MarketPortfolio.js";
import MarketResearch from "./MarketResearch.js";
import MarketTrade from "./MarketTrade.js";

import { get, post } from "../../../../utilities.js";

const routes = [
  { link: "/", text: "Home" },
  { link: "/Game/Dashboard", text: "Dashboard" },
  { link: "/Game/Portfolio", text: "Portfolio" },
  { link: "/Game/Research", text: "Stock Research" },
  { link: "/Game/Trade", text: "Trade" },
  /*
  { link: "/Game/Import", text: "Import" },
  */
];

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
    };
  }

  componentDidMount() {
    if (this.props.id) {
      this.props.updateCash()
      get("/api/getdate", { id: this.props.id })
        .then((dateObj) => {
          if (dateObj) {
            this.setState(
              {
                dayOne: dateObj.one,
                dayTwo: dateObj.two,
                dayThree: dateObj.three,
                dayFour: dateObj.four,
                exist: true,
              },
              () => {
                let sendToParent;
                if (this.props.marketName === "One"){
                  sendToParent = this.state.dayOne
                } else if (this.props.marketName === "Two") {
                  sendToParent = this.state.dayTwo
                } else if (this.props.marketName === "Three") {
                  sendToParent = this.state.dayThree
                } else if (this.props.marketName === "Four") {
                  sendToParent = this.state.dayFour
                }
                this.props.updateDay(sendToParent)
                console.log("market dates received");
              }
            );
          } else {
            this.setState(
              {
                exist: false,
              },
              () => {
                console.log("not existent");
              }
            );
          }
        })
        .catch((err) => {
          this.setState(
            {
              exist: false,
            },
            () => {
              console.log("not existent");
            }
          );
        });
      document.getElementById("nextDay").addEventListener("click", () => {
        this.goToNextDay();
      });
    }
  }

  goToNextDay = () => {
    let tempDay;
    if (this.props.marketName === "One") {
      tempDay = parseInt(this.state.dayOne) + 1;
      tempDay = tempDay.toString();
      this.setState(
        {
          dayOne: tempDay,
        },
        () => { }
      );
    } else if (this.props.marketName === "Two") {
      tempDay = parseInt(this.state.dayTwo) + 1;
      tempDay = tempDay.toString();
      this.setState(
        {
          dayTwo: tempDay,
        },
        () => { }
      );
    } else if (this.props.marketName === "Three") {
      tempDay = parseInt(this.state.dayThree) + 1;
      tempDay = tempDay.toString();
      this.setState(
        {
          dayThree: tempDay,
        },
        () => { }
      );
    } else if (this.props.marketName === "Four") {
      tempDay = parseInt(this.state.dayFour) + 1;
      tempDay = tempDay.toString();
      this.setState(
        {
          dayFour: tempDay,
        },
        () => { }
      );
    }
    post("/api/nextday", { id: this.props.id, marketName: this.props.marketName, newDate: tempDay })
      .then((dayObj) => {
        console.log([dayObj.one, dayObj.two, dayObj.three, dayObj.four]);
        let sendToParent;
        if (this.props.marketName === "One"){
          sendToParent = dayObj.one
        } else if (this.props.marketName === "Two") {
          sendToParent = dayObj.two
        } else if (this.props.marketName === "Three") {
          sendToParent = dayObj.three
        } else if (this.props.marketName === "Four") {
          sendToParent = dayObj.four
        }
        this.props.updateDay(sendToParent)
        
      })
      .catch((err) => console.log(err));
  };

  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    let bar = "|";
    let showText = this.props.username + "'s balance: $" + this.props.cash;
    let day = undefined;
    if (this.props.marketName === "One") {
      day = this.state.dayOne;
    } else if (this.props.marketName === "Two") {
      day = this.state.dayTwo;
    } else if (this.props.marketName === "Three") {
      day = this.state.dayThree;
    } else if (this.props.marketName === "Four") {
      day = this.state.dayFour;
    }
    if (!this.props.id) {
      alert("Please Login to Play Simple Stock Simulator");
      return <Redirect to={"/"} noThrow />;
    }
    let titleText;
    if (day) {
      titleText = "Market " + this.props.marketName + ": Day " + day;
    } else {
      titleText = "Market " + this.props.marketName + ": Day ";
    }
    let nextButton = "Next Day =>";
    return (
      <>
        <header className="MNavBar-header1">
          <div className="title">{titleText}</div>
          <div className="balance">{showText}</div>
        </header>

        <header className="MNavBar-header2">
          <div className="allButtons">
            {routes.map((route, index, array) => (
              <>
                <div className="section">
                  <Link to={route.link} className="rm_decor">
                    <button className="top-align">{route.text}</button>
                  </Link>
                </div>
                <div className="bar">{index < routes.length - 1 ? bar : null}</div>
              </>
            ))}
          </div>
          <div className="nextContainer">
            <button id="nextDay" className="nextButton">
              {nextButton}
            </button>
          </div>
        </header>
      </>
    );
  }
}

export default MarketNavBar;
