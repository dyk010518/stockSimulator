import './Homepage.css';
import React, { Component } from "react";
import TopBar from './TopBar/TopBar.js';
import ScoreboardPanel from './ScoreboardPanel/ScoreboardPanel.js';
import '../../../utilities.css';
import SimulatorPanel from './SimulatorPanel/SimulatorPanel.js';
import GoogleLogin, { GoogleLogout } from "react-google-login";


//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "861706660529-ij4qla5vskuqqfa90lqog4366eol4tch.apps.googleusercontent.com";


class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  // const text = props.text;
  // const url = props.url;
  render() {
    return (
      <div className="Homepage-basics">
        <TopBar
          handleLogin={this.props.handleLogin}
          handleLogout={this.props.handleLogout}
          userId={this.props.userId}
        />
        <div className="Homepage-flexRow">
          <div className="Homepage-width">
            <SimulatorPanel marketName={this.setMarketNum} setMarketNum={this.props.setMarketNum} />
          </div>
          <div className="Homepage-width">
            <ScoreboardPanel />
          </div>
        </div>
      </div>
    );
  }

}

export default Homepage;