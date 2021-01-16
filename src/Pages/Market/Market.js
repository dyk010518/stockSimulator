import './Market.css';
import React, { Component } from "react";
import { Router } from '@reach/router';
import {Link} from '@reach/router'
import MarketNavBar from './MarketNavBar/MarketNavBar.js';

class MarketOne extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentView: "test",
    }
  }

  // const text = props.text;
  // const url = props.url;
  render() {

    
    return (
      <div>
        
        {this.state.currentView}
        
      </div>
    );
  }
}

export default MarketOne;