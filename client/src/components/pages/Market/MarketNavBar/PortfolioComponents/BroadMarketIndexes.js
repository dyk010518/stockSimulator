import React, { Component } from "react";
import "../../../../buttonStyles.css";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import "./BroadMarketIndexes.css";

class BroadMarketIndexes extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
  }

  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      <>
        <div className="BroadMarketIndexes-container">BroadMarketIndexes</div>
      </>
    );
  }
}

export default BroadMarketIndexes;
