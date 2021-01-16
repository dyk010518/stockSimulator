import './MarketSummary1.css';
import React, { Component } from "react";
import '../../../../buttonStyles.css';


class MarketSummary1 extends Component {
	// makes props available in this component
	constructor(props) {
		super(props);
		this.state = {
			stockPrices: {},
		}
	}

	componentDidMount(){
		//get request to api
		/*
		get(API URL FOR STOCK PRICES).then((stockPObj) => {
			this.setState({
				stockPrices: stockPObj
			})
		});
		*/
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
