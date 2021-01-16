import { useState } from 'react';
import './MarketSummaries.css';
import React, { Component } from "react";
import '../../../buttonStyles.css';
import {Link} from '@reach/router';

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
				<Link to="/Game" class="marketButton" marketNumber="One">Market 1</Link>
				<Link to="/Game" class="marketButton" marketNumber="Two">Market 2</Link>
				<Link to="/Game" class="marketButton" marketNumber="Three">Market 3</Link>
				<Link to="/Game" class="marketButton" marketNumber="Four">Market 4</Link>
				</div>
			</div>
		);
	}
}

export default MarketSummaries;
