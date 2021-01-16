import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage/Homepage'
import React, { Component } from "react";
import { Router } from '@reach/router';
import NotFound from './Pages/NotFound.js';
import MarketOne from './Pages/Markets/MarketOne/MarketOne.js';

class App extends Component {

  constructor(props) {
    super(props);
  }

  // const text = props.text;
  // const url = props.url;
  render() {
    return (
      <div>
        <Router>
          <Homepage path="/"/>
          <MarketOne path="/MarketOne"/>
          <NotFound default />
        </Router>
      </div>
    );
  }
}

export default App;
