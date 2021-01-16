import './MarketSummary3.css';
import React, { Component } from "react";
import '../../../../clickButton.css';

class MarketSummary3 extends Component {
	// makes props available in this component
	constructor(props) {
		super(props);
	}

	marketThreeSelect = () => {
		alert("market 3 selected!")
	};

	// required method: whatever is returned defines what
	// shows up on screen
	render() {
		return (
			<>
				<button class="buttonClass" onClick={this.marketThreeSelect}>Market 3</button>
			</>
		);
	}
}

export default MarketSummary3;
