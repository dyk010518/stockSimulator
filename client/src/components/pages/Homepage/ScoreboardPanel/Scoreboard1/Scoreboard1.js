import './Scoreboard1.css'
import { useState } from 'react';
import React, { Component } from "react";

class Scoreboard1 extends Component {
	// makes props available in this component
	constructor(props) {
		super(props);
		this.state = {
			userId1: undefined,
			userId2: undefined,
			userId3: undefined,
			userName1: undefined,
			userName2: undefined,
			userName3: undefined,
			total1: undefined,
			total2: undefined,
			total3: undefined,
		}
	}

	clickHandler = () => {
		console.log("fill me pls")
	};

	componentDidMount = () => {

	}

	// required method: whatever is returned defines what
	// shows up on screen
	render() {
		return (
			<div>
				<div onClick={this.clickHandler} className = "Scoreboard1-basics">
				<div className="Scoreboard1-resultHeader">
                    <div className="Scoreboard1-resultDesctiption"> Rank</div>
                    <div className="Scoreboard1-resultDesctiption"> Player ID</div>
                    <div className="Scoreboard1-resultDesctiption"> Total Account Value</div>

					<div className="Scoreboard1-resultDesctiption"> Rank</div>
                    <div className="Scoreboard1-resultDesctiption"> Player ID</div>
                    <div className="Scoreboard1-resultDesctiption"> Total Account Value</div>
                </div>

				
				</div>
				
			</div>
		);
	}
}

export default Scoreboard1;
