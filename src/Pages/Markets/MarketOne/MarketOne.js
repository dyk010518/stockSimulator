import './MarketOne.css';
import React, { Component } from "react";
import { Router } from '@reach/router';
import {Link} from '@reach/router'
import MarketNavBar from '../MarketNavBar/MarketNavBar.js';

class MarketOne extends Component {

  constructor(props) {
    super(props);
  }

  // const text = props.text;
  // const url = props.url;
  render() {
    return (
      <div>
        <MarketNavBar />
      </div>
    );
  }
}

export default MarketOne;