import { useState } from 'react';
import './MarketSummaries.css';
import React, { Component } from "react";
import '../../../../buttonStyles.css';
import {Link} from '@reach/router';
import Market from '../../../Market/Market.js'
import App from '../../../../App.js';

const marketTypes = ["One"];

class MarketSummaries extends Component {
	// makes props available in this component
	constructor(props) {
		super(props);
	}


	// required method: whatever is returned defines what
	// shows up on screen
	render() {
		return (
			<div className="MarketPanel-flexColumn">
				<p></p>
				<p></p>
				<p></p>
				<p></p>
				<p></p>

				<p className="MarketPanel-head">
        		</p>
				<div className="MarketPanel-grid">

          {
            marketTypes.map((marketNumber) => (
              <Link to="/Game" className="marketButton" >

                <button className="MarketPanel-start" onClick={()=>{
					console.log("hit")
					this.props.setMarketNum(marketNumber)
					}}>
                  Click Here to Start
                </button>
              </Link>
            ))
          }
          	<h1>Many more to come! Check for updates!</h1>
          	<h3 class = "border">WARNING: If the log in doesnt work or the market day doesnt show on the screen, close the tab and reopen it!</h3>
				</div>
			</div>
		);
	}
}

export default MarketSummaries;
