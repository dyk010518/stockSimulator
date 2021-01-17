import './Title.css';
import React, { Component } from "react";

class Title extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
  }

  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      <>
      <h1 className="title" >Stock Simulator</h1>
      </>
    );
  }
}

export default Title;