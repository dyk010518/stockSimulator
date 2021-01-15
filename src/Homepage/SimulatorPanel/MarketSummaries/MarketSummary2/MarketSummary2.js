import './MarketSummary2.css';
import React, { Component } from "react";

class MarketSummary2 extends Component {
	// makes props available in this component
	constructor(props) {
		super(props);
	}

	clickHandler = () => {
		console.log("fill me pls")
	};

	// required method: whatever is returned defines what
	// shows up on screen
	render() {
		return (
			<div>
				<div onClick={this.clickHandler}>
					Market Summary2
			</div>
			</div>
		);
	}
}

export default MarketSummary2;
