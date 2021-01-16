import { useState } from 'react';
import './MarketSummaries.css';
import React, { Component } from "react";
import '../../../buttonStyles.css';
import {Link} from '@reach/router';
import Market from '../../../Pages/Market/Market.js'

class MarketSummaries extends Component {
	// makes props available in this component
	constructor(props) {
		super(props);
		this.state = {
			marketNumber: "None"
		}
	}

	updateMarket = (num) => {
		this.setState({
			marketNumber: num
		}, () => {
		console.log(this.state.marketNumber)})
	}

	getMarket = () =>{
		return this.state.marketNumber
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
				<Link to="/Game" class="marketButton" ><button onClick={()=>{
					this.updateMarket("One")
					
				}}>Market 1</button></Link>
				<Link to="/Game" class="marketButton" marketNumber="Two">Market 2</Link>
				<Link to="/Game" class="marketButton" marketNumber="Three">Market 3</Link>
				<Link to="/Game" class="marketButton" marketNumber="Four">Market 4</Link>
				</div>
			</div>
		);
	}
}

export default MarketSummaries;
