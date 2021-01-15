import utilities from '../../utilities.js'
import './SimulatorPanel.css'
import Instruction from './Instruction/Instruction.js'
import MarketSummaries from './MarketSummaries/MarketSummaries.js';
import React, { Component } from "react";

class SimulatorPanel extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
  }

  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      <div className="SimulatorPanel-flexColumn">
        <Instruction />
        <MarketSummaries />
      </div>
    )
  }
}

export default SimulatorPanel;
