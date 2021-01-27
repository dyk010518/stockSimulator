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
      buttonOff1: false,
      buttonOff2: false,
      buttonOff3: false,
      reset: false,
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
                if (this.props.marketName === "One") {
                  sendToParent = this.state.dayOne
                } else if (this.props.marketName === "Two") {
                  sendToParent = this.state.dayTwo
                } else if (this.props.marketName === "Three") {
                  sendToParent = this.state.dayThree
                } else if (this.props.marketName === "Four") {
                  sendToParent = this.state.dayFour
                }
                this.props.updateDay(sendToParent, false)
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
        if ((parseInt(this.state.dayOne) + 1) > 2500) {
          alert("You can't go to more than 2500 days! Click reset if you wish to start the simulator again (and lose your current progress).")
        } else {
          this.updateButton2(true);
          this.updateButton1(true);
          this.updateButtonSingleDay(true);
          this.goToNextDay();
          setTimeout(() => {
            this.updateButton1(false)
            this.updateButton2(false)
            this.updateButtonSingleDay(false)
          }, 3000)
        }

      });
      document.getElementById("nextMonth").addEventListener("click", () => {
        if ((parseInt(this.state.dayOne) + 20) > 2500) {
          alert("You can't go to more than 2500 days! Click reset if you wish to start the simulator again (and lose your current progress).")
        } else {
          this.updateButton2(true);
          this.updateButton1(true);
          this.updateButtonSingleDay(true);
          alert("Please don't press any other buttons for the next 5 seconds!");
          for (let i = 0; i < 20; i++) {
            this.goToNextDay(i);
          }
          
          setTimeout(() => {
            this.updateButton1(false)
            this.updateButton2(false)
            this.updateButtonSingleDay(false)
          }, 5000);
          
        }
      });

      document.getElementById("nextQuarter").addEventListener("click", () => {
        if ((parseInt(this.state.dayOne) + 20) > 2500) {
          alert("You can't go to more than 2500 days! Click reset if you wish to start the simulator again (and lose your current progress).")
        } else {
          this.updateButton2(true);
          this.updateButton1(true);
          this.updateButtonSingleDay(true);
          for (let i = 0; i < 1500; i++) {
            this.goToNextDay(i);
          }
          alert("Please don't press any other buttons for the next 20 seconds!");
          setTimeout(() => {
            this.updateButton1(false)
            this.updateButton2(false)
            this.updateButtonSingleDay(false)
          }, 20000);
        }
      });

      document.getElementById("reset").addEventListener("click", () => {
        if (confirm("Are you sure you want to reset all of your progress so far?")) {
          this.resetUser();
        } else {
          null;
        }
      });
    }
  }

  resetUser = () => {
    alert("Your total account value was: " + this.props.totalValue.toString())
    post('/api/resetTotalValues', {
      id: this.props.id,
    }).then(() => {
      console.log("total val reset")
      post('/api/resetCash', {
        id: this.props.id,
      }).then(() => {
        console.log("cash reset")
        post('/api/resetDate', {
          id: this.props.id,
        }).then(() => {
          console.log("date reset")
          //delete Bought Stocks
          //delete Recent Activities

          //after resetting/deleting everything. redirects the user to the home page
          
          //Also Ronald, when you can implement this resetting functionality, you can also make it so that when the user's day >2500, they have to click reset button
          get('/api/deleteBoughtStocks', {
            id: this.props.id,
          }).then(() => {
            console.log("bs reset")
            this.setState({
              reset: true
            }, () => {
              console.log("reset complete")
            })
          })
        })
      });
    });

  }

  updateButton1 = (condition) => {
    this.setState({
      buttonOff1: condition,
    }, () => {
      console.log("button changed")
    })
  }

  updateButton2 = (condition) => {
    this.setState({
      buttonOff2: condition,
    }, () => {
      console.log("button changed")
    })
  }

  updateButtonSingleDay = (condition) => {
    this.setState({
      buttonOff3: condition,
    }, () => {
      console.log("button changed")
    })
  }

  goToNextDay = (num) => {
    let tempDay;
    console.log("Loading");
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
        if (this.props.marketName === "One") {
          sendToParent = dayObj.one
        } else if (this.props.marketName === "Two") {
          sendToParent = dayObj.two
        } else if (this.props.marketName === "Three") {
          sendToParent = dayObj.three
        } else if (this.props.marketName === "Four") {
          sendToParent = dayObj.four
        }
        this.props.updateDay(sendToParent, true);
        if (num === 19) {
          //console.log("num is 19")
          //this.updateButton2(false);
        }
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
    if (this.state.reset){
      alert("Returning to homescreen...");
      return <Redirect to={"/"} noThrow />;
    }
    if (!this.props.id) {
      alert("Please Login to Play Simple Stock Simulator");
      return <Redirect to={"/"} noThrow />;
    }
    let titleText;
    if (day) {
      titleText = "Market " + this.props.marketName + ": Day " + day + "/2500";
    } else {
      titleText = "Market " + this.props.marketName + ": Day " + "/2500";
    }
    let nextButton = "Next Day =>";
    let nextMonth = "Next Month =>";
    let nextQuarter = "Next Quarter =>";
    let reset = "Reset";
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
            <button id="nextDay" className="nextButton" disabled={this.state.buttonOff3}>
              {nextButton}
            </button>
            <button id="nextMonth" className="nextMonthButton" disabled={this.state.buttonOff1}>
              {nextMonth}
            </button>
            <button id="nextQuarter" className="nextQuarterButton" disabled={this.state.buttonOff2}>
              {nextQuarter}
            </button>
            <button id="reset" className="reset">
              {reset}
            </button>
          </div>
        </header>
      </>
    );
  }
}

export default MarketNavBar;
