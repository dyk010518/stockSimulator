import './Homepage.css';
import React, { Component } from "react";
import TopBar from './TopBar/TopBar.js';
import ScoreboardPanel from './ScoreboardPanel/ScoreboardPanel.js';
import '../../../utilities.css';
import SimulatorPanel from './SimulatorPanel/SimulatorPanel.js';
import GoogleLogin, { GoogleLogout } from "react-google-login";
import bull from '../../../bull.png';

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
      <div>
        <div className="Homepage-basics" className="background">
        <TopBar
          handleLogin={this.props.handleLogin}
          handleLogout={this.props.handleLogout}
          userId={this.props.userId}
          username = {this.props.username}
        />
        <div className="Homepage-flexRow">
          <div className="Homepage-width">
            <SimulatorPanel setMarketNum={this.props.setMarketNum} />
          </div>
          {/*<div className="Homepage-width">
            <ScoreboardPanel totalAccount={this.props.totalAccount}/>
          </div>*/}
          
          </div>
        </div>
      </div>
      
      
      // </div>
    );
  }

}

export default Homepage;

