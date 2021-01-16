import './Market.css';
import React, { Component } from "react";
import { Router } from '@reach/router';
import {Link} from '@reach/router';
import MarketNavBar from './MarketNavBar/MarketNavBar.js';

class Market extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMarket: this.props.marketName,
    }
  }

  updateMarket = (num) => {
		this.setState({
			marketNumber: num
		}, () => {
		console.log(this.state.marketNumber)})
	}

  // const text = props.text;
  // const url = props.url;
  render() {

    
    return (
      <div>
        <MarketNavBar />
        {console.log(this.state.currentMarket)}
        {this.state.currentMarket}
        
      </div>
    );
  }
}

export default Market;