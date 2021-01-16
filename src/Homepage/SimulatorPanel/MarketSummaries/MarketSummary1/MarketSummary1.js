import './MarketSummary1.css';
import React, { Component } from "react";
import '../../../../buttonStyles.css';


class MarketSummary1 extends Component {
	// makes props available in this component
	constructor(props) {
		super(props);
	}

	marketOneSelect = () => {
		alert("market 1 selected!")
	};

	// required method: whatever is returned defines what
	// shows up on screen
	render() {
		return (
			<>
				<button class="marketButton" onClick={this.marketOneSelect}>Market 1</button>
			</>
		);
	}
}

export default MarketSummary1;
