import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage/Homepage'
import React, { Component } from "react";

class App extends Component {

  constructor(props) {
    super(props);
  }

  // const text = props.text;
  // const url = props.url;
  render() {
    return (
      <div>
        <Homepage />
      </div>
    );
  }
}

export default App;
