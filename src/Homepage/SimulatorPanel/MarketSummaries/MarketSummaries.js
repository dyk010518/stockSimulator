import { useState } from 'react';
import MarketSummary1 from './MarketSummary1/MarketSummary1.js'
import MarketSummary2 from './MarketSummary2/MarketSummary2.js'
import MarketSummary3 from './MarketSummary3/MarketSummary3.js'
import MarketSummary4 from './MarketSummary4/MarketSummary4.js'
import './MarketSummaries.css';
import React, { Component } from "react";

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
					<MarketSummary1 />
					<MarketSummary2 />
					<MarketSummary3 />
					<MarketSummary4 />
				</div>
			</div>
		);
	}
}

export default MarketSummaries;
