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
				<Link to="/MarketOne" class="marketButton" onClick={this.marketOneSelect}>Market 1</Link>
				<Link to="/MarketTwo" class="marketButton" onClick={this.marketTwoSelect}>Market 2</Link>
				<Link to="/MarketThree" class="marketButton" onClick={this.marketThreeSelect}>Market 3</Link>
				<Link to="/MarketFour" class="marketButton" onClick={this.marketFourSelect}>Market 4</Link>
				</div>
			</div>
		);
	}
}

export default MarketSummaries;
