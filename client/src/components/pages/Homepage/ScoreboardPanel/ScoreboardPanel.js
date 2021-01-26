import './ScoreboardPanel.css'
import { useState } from 'react';
import React, { Component } from "react";
import Scoreboard1 from './Scoreboard1/Scoreboard1.js'
import Scoreboard2 from './Scoreboard2/Scoreboard2.js'
import Scoreboard3 from './Scoreboard3/Scoreboard3.js'
import Scoreboard4 from './Scoreboard4/Scoreboard4.js'


class Scoreboard extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
  }

  clickHandler = function () {
    console.log("fill me pls")
  };

  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      <div className="ScoreboardPanel-flexColumn">
        <p className="ScoreboardPanel-head">
          Scoreboard
        </p>
        <div className="ScoreboardPanel-grid">
          <Scoreboard1 totalAccount={this.props.totalAccount}/>
          {/* <Scoreboard2 />
          <Scoreboard3 />
          <Scoreboard4 /> */}
        </div>
      </div>
    );
  }
}

export default Scoreboard;
