import { useState } from 'react';
import './MarketSummaries.css';
import React, { Component } from "react";
import '../../../../buttonStyles.css';
import {Link} from '@reach/router';
import Market from '../../../Market/Market.js'
import App from '../../../../App.js';

const marketTypes = ["One", "Two", "Three", "Four"];

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
					Markets
        		</p>
				<div className="MarketPanel-grid">

          {
            marketTypes.map((marketNumber) => (
              <Link to="/Game" class="marketButton" >
                <button onClick={()=>{this.props.setMarketNum(marketNumber)}}>
                  Market {marketNumber}
                </button>
              </Link>
            ))
          }

				</div>
			</div>
		);
	}
}

export default MarketSummaries;