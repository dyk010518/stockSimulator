import './Homepage.css';
import React, { Component } from "react";
import TopBar from './TopBar/TopBar'
import ScoreboardPanel from './ScoreboardPanel/ScoreboardPanel.js';
import utilities from '../utilities.css'
import SimulatorPanel from './SimulatorPanel/SimulatorPanel.js';

class Homepage extends Component {

  constructor(props) {
    super(props);
  }

  // const text = props.text;
  // const url = props.url;
  render() {
    return (
      <div className="Homepage-basics">
        <TopBar />
        <div className="Homepage-flexRow">
          <div className="Homepage-width">
            <SimulatorPanel/>
          </div>
          <div className="Homepage-width">
            <ScoreboardPanel/>
          </div>
        </div>
      </div>
    );
  }

}

export default Homepage;