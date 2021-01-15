import './TopBar.css';
import React, { Component } from "react";

class TopBar extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
  }

  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      <header className="TopBar-header">
        Stock Simulator
      </header>
    );
  }
}

export default TopBar;