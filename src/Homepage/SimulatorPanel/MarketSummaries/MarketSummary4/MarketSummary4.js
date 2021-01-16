import './MarketSummary4.css';
import React, { Component } from "react";
import '../../../../clickButton.css';

class MarketSummary4 extends Component {
	// makes props available in this component
	constructor(props) {
		super(props);
	}

	marketFourSelect = () => {
		alert("market 4 selected!")
	};

	// required method: whatever is returned defines what
	// shows up on screen
	render() {
		return (
			<>
				<button class="buttonClass" onClick={this.marketFourSelect}>Market 4</button>
			</>
		);
	}
}

export default MarketSummary4;
