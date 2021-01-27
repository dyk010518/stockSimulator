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
				<p className="MarketPanel-head">
					Market:
        		</p>
				<div className="MarketPanel-grid">

          {
            marketTypes.map((marketNumber) => (
              <Link to="/Game" className="marketButton" >
                <button onClick={()=>{
					console.log("hit")
					this.props.setMarketNum(marketNumber)
					}}>
                  Market {marketNumber}
                </button>
              </Link>
            ))
          }
          	<p>Many more to come! Check for updates!</p>

				</div>
			</div>
		);
	}
}

export default MarketSummaries;
