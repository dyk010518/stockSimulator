import './Market.css';
import React, { Component } from "react";
import { Router } from '@reach/router';
import {Link} from '@reach/router';
import MarketNavBar from './MarketNavBar/MarketNavBar.js';
import '../../utilities.css'
import './Market.css'

class Market extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMarket: this.props.marketName,
    }
  }


  // const text = props.text;
  // const url = props.url;
  render() {

    
    return (
      <div>
        {/* <MarketNavBar /> */}
        <p className = "Market-timrframeSummary">
          {this.state.currentMarket}
        </p>
        <Link to="/Game/Dashboard"><button className = "Market-button" onClick={()=>{
					
				}}>Start</button></Link>
        {/* {console.log(this.state.currentMarket)}
        {this.state.currentMarket} */}
        
      </div>
    );
  }
}

export default Market;