import './MarketSummary2.css';
import React, { Component } from "react";

class MarketSummary2 extends Component {
	// makes props available in this component
	constructor(props) {
		super(props);
	}

	marketTwoSelect = () => {
		alert("market 2 selected!")
	};

	// required method: whatever is returned defines what
	// shows up on screen
	render() {
		return (
			<>
			<button className="marketTwo" onClick={this.marketTwoSelect}>Market 2</button>
			</>
		);
	}
}

export default MarketSummary2;
